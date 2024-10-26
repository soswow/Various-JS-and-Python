import P5, { Vector, Color } from "p5";
import "./styles.scss";
import * as dat from 'dat.gui';
import ndarray, { NdArray } from 'ndarray';
import p5 from "p5";
import gemm from 'ndarray-gemm';
import ops from 'ndarray-ops';

let params = new URLSearchParams(location.search);
const isSuperHD = params.has('superHD');

const WIDTH = isSuperHD ? 1920 : 600;
const HEIGHT = isSuperHD ? 1080 : 600;

const { cos, sin } = Math;

// Creating the sketch itself
const sketch = (p5: P5) => {
    const gui = new dat.GUI();
    const settings = {
        angleZ: 250,
        angleX: 146,
        angleY: 118,
        scale: 208,
        distance: 2,
        isPerspective: false,
    };

    let liveDebugDiv;

    let canvas: p5.Renderer;

    const points: p5.Vector[] = [];


    // The sketch setup method 
    p5.setup = () => {
        resetPixelDensity();

        const angles = gui.addFolder('Angles');
        angles.open();
        angles.add(settings, 'angleZ', 0, 360, 1);
        angles.add(settings, 'angleX', 0, 360, 1);
        angles.add(settings, 'angleY', 0, 360, 1);

        const other = gui.addFolder('Other');
        other.open();
        other.add(settings, 'scale', 20, 1000, 1);
        other.add(settings, 'distance', 0, 10, 0.1);
        other.add(settings, 'isPerspective');

        // Creating and positioning the canvas
        canvas = p5.createCanvas(WIDTH, HEIGHT, p5.P2D);
        canvas.parent("app");

        // Configuring the canvas
        liveDebugDiv = p5.createDiv('this is some text');
        liveDebugDiv.style('font-size', '16px');
        liveDebugDiv.style('white-space', 'pre-wrap');
        liveDebugDiv.position(10, 10);

        points.push(...[
            //              x, y, z
            p5.createVector(0, 0, 0), // origin
            p5.createVector(1, 0, 0), // x direction
            p5.createVector(1, 1, 0),
            p5.createVector(0, 1, 0), // y direction

            p5.createVector(0, 0, 1), // z direction
            p5.createVector(1, 0, 1),
            p5.createVector(1, 1, 1),
            p5.createVector(0, 1, 1),
        ])

        p5.loop();
    };

    const resetPixelDensity = () => {
        p5.pixelDensity();
    }

    const ndToVec = ({ data: [x, y, z = 0] }: NdArray<Float32Array>) => p5.createVector(x, y, z);
    const vecToNd = ({ x, y, z = 0 }: p5.Vector) => ndarray(new Float32Array([x, y, z]), [3, 1]);


    const getRotationMatX = (rad: number) => ndarray(new Float32Array(
        [
            1, 0, 0,
            0, cos(rad), -sin(rad),
            0, sin(rad), cos(rad)
        ]
    ), [3, 3]);

    const getRotationMatY = (rad: number) => ndarray(new Float32Array(
        [
            cos(rad), 0, sin(rad),
            0, 1, 0,
            -sin(rad), 0, cos(rad)
        ]
    ), [3, 3]);

    const getRotationMatZ = (rad: number) => ndarray(new Float32Array(
        [
            cos(rad), -sin(rad), 0,
            sin(rad), cos(rad), 0,
            0, 0, 1
        ]
    ), [3, 3]);


    // The sketch draw method
    p5.draw = () => {
        p5.clear();
        
        const rotationMatY = getRotationMatY(p5.radians(settings.angleY));
        const rotationMatX = getRotationMatX(p5.radians(settings.angleX));
        const rotationMatZ = getRotationMatZ(p5.radians(settings.angleZ));
        const translationVector = ndarray(new Float32Array([WIDTH/2, HEIGHT/2, 0]), [3, 1]);
        
        const zs = [];
        const mappedPoints = points.map(point => {
            const pointVector = vecToNd(point);
            
            const rotated = ndarray(new Float32Array([...pointVector.data]), pointVector.shape);
            gemm(rotated, rotationMatY, ndarray(new Float32Array([...rotated.data]), rotated.shape))
            gemm(rotated, rotationMatX, ndarray(new Float32Array([...rotated.data]), rotated.shape))
            gemm(rotated, rotationMatZ, ndarray(new Float32Array([...rotated.data]), rotated.shape))
            
            zs.push(ndToVec(rotated).z);
            let z = 1;
            if(settings.isPerspective){
                const distance = settings.distance;
                z = 1 / (distance - ndToVec(rotated).z)
            }
            const projectionMat = ndarray(new Float32Array(
                [
                    z, 0, 0,
                    0, z, 0,
                    0, 0, 0
                ]
            ), [3, 3]);

            const projected2d = ndarray(new Float32Array([0, 0, 0]), [3, 1]);
            
            gemm(projected2d, projectionMat, rotated)
            ops.mulseq(projected2d, settings.scale);
            ops.addeq(projected2d, translationVector);

            return ndToVec(projected2d);
        });

        p5.strokeWeight(1);
        const [p0, p1, p2, p3, p4, p_5, p6, p7] = mappedPoints;

        // Red X
        p5.stroke(255, 50, 50, 255);
        p5.line(p0.x, p0.y, p1.x, p1.y);

        // Green Y 
        p5.stroke(50, 255, 50, 255);
        p5.line(p0.x, p0.y, p3.x, p3.y);
        const vectorY = p5.createVector(p3.x - p0.x, p3.y - p0.y);
        const perpVector = vectorY.rotate(p5.radians(90)).normalize().mult(100);

        p5.stroke(255, 200, 200, 255);
        p5.line(p0.x, p0.y, p0.x + perpVector.x, p0.y + perpVector.y);

        // Blue Z
        p5.stroke(50, 50, 255, 255);
        p5.line(p0.x, p0.y, p4.x, p4.y);

        // Other
        p5.stroke(150, 150, 150, 255);
        p5.line(p2.x, p2.y, p1.x, p1.y);
        p5.line(p2.x, p2.y, p3.x, p3.y);
        p5.line(p7.x, p7.y, p3.x, p3.y);
        p5.line(p7.x, p7.y, p4.x, p4.y);
        p5.line(p7.x, p7.y, p6.x, p6.y);
        p5.line(p6.x, p6.y, p2.x, p2.y);
        p5.line(p6.x, p6.y, p_5.x, p_5.y);
        p5.line(p_5.x, p_5.y, p4.x, p4.y);
        p5.line(p_5.x, p_5.y, p1.x, p1.y);      

        p5.strokeWeight(5);
        mappedPoints.forEach((point, i) => {
            if (i === 0) {
                p5.stroke(255, 255, 255, 255);
            } else if (i === 1) {
                p5.stroke(255, 50, 50, 255);
            } else if (i === 3) {
                p5.stroke(50, 255, 50, 255);
            } else if (i === 4) {
                p5.stroke(50, 50, 255, 255);
            } else {
                p5.stroke(0, 0, 0, 255);
            }
            p5.point(point.x, point.y);
        });

        
        
        liveDebugDiv.html(JSON.stringify({
            FPS: p5.floor(p5.frameRate()),
            zs: zs
        }, null, 2));
    };
};

new P5(sketch);