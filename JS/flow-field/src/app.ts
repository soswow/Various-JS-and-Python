import P5, { Vector, Color } from "p5";
import "./styles.scss";
import * as dat from 'dat.gui';
import { makeNoise3D } from "open-simplex-noise";
import simplexNoiseFast from './simplexNoiseFast';
import ndarray from 'ndarray';
import Particle from "./Particle";
import PoissonDistribution from "./PoissonDistribution";
import p5 from "p5";
import * as CanvasCapture from 'canvas-capture';

let params = new URLSearchParams(location.search);
const isSuperHD = params.has('superHD');

const WIDTH = isSuperHD ? 1920 : 600;
const HEIGHT = isSuperHD ? 1080 : 600;

// Creating the sketch itself
const sketch = (p5: P5) => {
    const gui = new dat.GUI();
    const settings = {
        noiseZoom: isSuperHD ? 0.002 : 0.0042,
        noiseChangeSpeed: 0.0025,
        cellSize: 24,
        showColors: false,
        showArrows: false,
        fullRangeRescale: false,
        noisyDirectionBias: true,
        noisyMagnitude: true,
        showParticles: true,
        windForce: 0.006,
        minDistance: 6,
        valueIncreaseTime: isSuperHD ? 100 : 50,
        valueDecreseTime: isSuperHD ? 100 : 60,
        maxValue: 70,
        maxLineWidth: 5,
        darkMode: true,
        hue: true,
        hueBrightness: 180,
    };
    let liveDebugDiv;
    let t = 0.02;
    const noise3D = simplexNoiseFast(Date.now()).noise3D;
    const noise2D = simplexNoiseFast(Date.now()).noise2D;
    let particles: Particle[] = [];
    // var capturer = new CCapture( { 
    //     format: 'webm',
    //     timeLimit: 5,
    // } );
    let canvas: p5.Renderer;

    const drawArrow = (base: Vector, vec: Vector, myColor: Color, strokeSize: number = 1) => {
        p5.push();
        p5.stroke(myColor);
        p5.strokeWeight(strokeSize);
        p5.fill(myColor);
        p5.translate(base.x, base.y);
        p5.line(0, 0, vec.x, vec.y);
        p5.rotate(vec.heading());
        let arrowSize = 3;
        p5.translate(vec.mag() - arrowSize, 0);
        p5.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
        p5.pop();
    }

    // The sketch setup method 
    p5.setup = () => {
        resetPixelDensity();

        const vectorFieldFolder = gui.addFolder('Vector field');
        vectorFieldFolder.add(settings, 'noiseZoom', 0, 0.07);
        vectorFieldFolder.add(settings, 'noiseChangeSpeed', 0, 0.1);
        const cellSizeController = vectorFieldFolder.add(settings, 'cellSize', 1, 50, 2);
        cellSizeController.onChange((newValue: number) => {
            if (p5.width % newValue !== 0) {
                cellSizeController.setValue(newValue + 1);
            }
        });
        vectorFieldFolder.add(settings, 'showColors');
        vectorFieldFolder.add(settings, 'showArrows');
        vectorFieldFolder.add(settings, 'fullRangeRescale');
        vectorFieldFolder.add(settings, 'noisyDirectionBias');
        vectorFieldFolder.add(settings, 'noisyMagnitude');

        const particlesFolder = gui.addFolder('Particles');
        particlesFolder.add(settings, 'showParticles').onFinishChange(resetPixelDensity);
        particlesFolder.add(settings, 'windForce', 0.0001, 0.05);
        particlesFolder.add(settings, 'minDistance', 2, 40).onFinishChange(resetParticles);
        particlesFolder.add(settings, 'valueIncreaseTime', 2, 300).onFinishChange(resetParticles);;
        particlesFolder.add(settings, 'valueDecreseTime', 2, 300).onFinishChange(resetParticles);;
        particlesFolder.add(settings, 'maxValue', 2, 255);
        particlesFolder.add(settings, 'maxLineWidth', 0.1, 25);
        particlesFolder.add(settings, 'darkMode');
        particlesFolder.add(settings, 'hue');
        particlesFolder.add(settings, 'hueBrightness', 2, 255, 1);


        // Creating and positioning the canvas
        canvas = p5.createCanvas(WIDTH, HEIGHT, p5.P2D);
        canvas.parent("app");

        CanvasCapture.init(canvas.elt, {
            showRecDot: true,
        });
        CanvasCapture.bindKeyToVideoRecord('v', {
            format: 'webm', // Options are optional, more info below.
            name: 'myVideo',
            quality: 0.9,
        });

        // Configuring the canvas
        if(settings.darkMode){
            p5.background("black");
        }else{
            p5.background("white");
        }
        

        liveDebugDiv = p5.createDiv('this is some text');
        liveDebugDiv.style('font-size', '16px');
        liveDebugDiv.position(10, 10);

        resetParticles();

        // p5.noLoop();
    };

    const resetPixelDensity = () => {
        if (settings.showParticles) {
            p5.pixelDensity(1)
        } else {
            p5.pixelDensity();
        }
    }

    const resetParticles = () => {
        const poissonDistribution = new PoissonDistribution(p5, settings.minDistance);
        poissonDistribution.init();
        poissonDistribution.fill();
        particles = poissonDistribution.points(settings.valueIncreaseTime, settings.valueDecreseTime);
    }

    // The sketch draw method
    p5.draw = () => {
        const noiseMatrixHeight = p5.floor(p5.height / settings.cellSize);
        const noiseMatrixWidth = p5.floor(p5.width / settings.cellSize);
        const noiseMatrix = ndarray(new Float32Array(noiseMatrixHeight * noiseMatrixWidth * 2), [noiseMatrixWidth, noiseMatrixHeight, 2]);
        let maxValue = 0;
        let minValue = 1;
        for (let x = 0; x < noiseMatrixWidth; x += 1) {
            for (let y = 0; y < noiseMatrixHeight; y += 1) {
                const angleValue = (noise3D(x * settings.cellSize * settings.noiseZoom, y * settings.cellSize * settings.noiseZoom, t) + 1) / 2;
                const magValue = (noise3D(x * settings.cellSize * settings.noiseZoom, y * settings.cellSize * settings.noiseZoom, t + 42) + 1) / 2;

                if (maxValue < angleValue) {
                    maxValue = angleValue;
                }
                if (minValue > angleValue) {
                    minValue = angleValue;
                }
                noiseMatrix.set(x, y, 0, angleValue);
                noiseMatrix.set(x, y, 1, magValue);
            }
        }

        if (settings.fullRangeRescale) {
            for (let x = 0; x < noiseMatrixWidth; x += 1) {
                for (let y = 0; y < noiseMatrixHeight; y += 1) {
                    const oldValue = noiseMatrix.get(x, y, 0);
                    const newValue = p5.map(oldValue, minValue, maxValue, 0, 1);
                    noiseMatrix.set(x, y, 0, newValue);
                }
            }
        }

        if (settings.showColors) {
            p5.loadPixels();
            for (let my = 0; my < noiseMatrixHeight; my += 1) {
                for (let mx = 0; mx < noiseMatrixWidth; mx += 1) {
                    const value = noiseMatrix.get(mx, my, 0) * 255;
                    const x = mx * settings.cellSize;
                    const y = my * settings.cellSize;
                    for (let jy = y; jy < y + settings.cellSize; jy++) {
                        for (let jx = x; jx < x + settings.cellSize; jx++) {
                            const index = (p5.width * jy + jx) * 4;
                            p5.pixels[index] = value;
                            p5.pixels[index + 1] = value;
                            p5.pixels[index + 2] = value;
                            p5.pixels[index + 3] = 255;
                        }
                    }
                }
            }
            p5.updatePixels();
        } else {
            if (settings.showParticles) {
                if (settings.darkMode) {
                    p5.background(0, 0, 0, 10);
                } else {
                    p5.background(255, 255, 255, 10);
                }
            } else {
                p5.background('white');
            }
        }

        const vectorFeild = ndarray(new Array<Vector>(noiseMatrixHeight * noiseMatrixWidth), [noiseMatrixWidth, noiseMatrixHeight]);

        for (let mx = 0; mx < noiseMatrixWidth; mx += 1) {
            for (let my = 0; my < noiseMatrixHeight; my += 1) {
                const angleValue = noiseMatrix.get(mx, my, 0) * p5.TWO_PI;
                const magValue = settings.noisyMagnitude ? noiseMatrix.get(mx, my, 1) : 0.5;
                const arrowLength = magValue * settings.cellSize;
                const vector = p5.createVector(0, arrowLength);
                if (settings.noisyDirectionBias) {
                    const directionBias = (noise2D(0, t) + 1) / 2 * p5.TWO_PI;
                    vector.setHeading(angleValue + directionBias);
                } else {
                    vector.setHeading(angleValue);
                }
                vectorFeild.set(mx, my, vector.copy().mult(settings.windForce) as any);


                const x = mx * settings.cellSize + settings.cellSize / 2;
                const y = my * settings.cellSize + settings.cellSize / 2;

                if (settings.showArrows) {
                    const arrowThickness = settings.noisyMagnitude ? p5.map(magValue, 0, 1, 0.5, 2.5) : 1;
                    drawArrow(p5.createVector(x, y), vector, p5.color('black'), arrowThickness);
                }
            }
        }


        if (settings.showParticles) {
            particles.forEach(p => {
                p.follow(vectorFeild, settings.cellSize);
                p.update();
                p.drawLine(
                    settings.maxValue,
                    settings.maxLineWidth,
                    settings.hue,
                    settings.darkMode,
                    settings.hueBrightness
                );
                p.edges();
            });
        }

        liveDebugDiv.html(JSON.stringify({
            FPS: p5.floor(p5.frameRate()),
        }, null, 2));
        t += settings.noiseChangeSpeed;

        if (CanvasCapture.isRecording()) {
            CanvasCapture.recordFrame();
        }
    };
};

new P5(sketch);

var observer = new PerformanceObserver(function (list) {
    var perfEntries = list.getEntries();
    console.log('long task');
});
// register observer for long task notifications
observer.observe({ entryTypes: ["longtask"] });