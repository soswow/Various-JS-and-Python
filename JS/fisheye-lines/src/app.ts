import P5 from "p5";
import * as dat from 'dat.gui';
import initSVG from 'p5.js-svg'
import "./styles.scss";
import { 
    circleWithTwoPointsAndDistance,
    circleWithThreePoints,
    sideFromTheLine,
 } from "./geometry-utils";
import { RawLine, Settings, VanishingPointPair } from "./types";
import { Segment } from "./segment";

let params = new URLSearchParams(location.search);
const isSVG = params.has('SVG');
if (isSVG) {
    initSVG(P5)
}
const WIDTH = 1200;
const HEIGHT = 800;
// const HEIGHT = WIDTH / (9/16);

const sketch = (p5: P5) => {
    let canvas: P5.Renderer;
    const gui = new dat.GUI();
    let isExporting: boolean = false;
    let vanishingPointPairs: VanishingPointPair[];
    let rawLine: RawLine;
    let segments: Segment[];

    const settings: Settings = {
        verticalOffset: 0,
        verticalGridSize: 22,
        verticalUpDownShift: 0,
        verticalRightLeftShift: 0,
        horizontalOffset: -5,
        horizontalGridSize: 26,
        horizontalUpDownShift: 0,
        horizontalRightLeftShift: 0,
        centralGridSize: 32,
        type: '5 point',
        debug1: 0,
        debug2: 0,
        presets: {
            'Room corner': () => {
                settings.verticalOffset = 262;
                settings.verticalGridSize = 28;
                settings.verticalUpDownShift = -280;
                settings.verticalRightLeftShift = 0;

                settings.horizontalOffset = 189;
                settings.horizontalGridSize = 26;
                settings.horizontalUpDownShift = -140;
                settings.horizontalRightLeftShift = 225;

                settings.type = '3 point';
            },
            'Normal room': () => {
                settings.verticalOffset = 0;
                settings.verticalGridSize = 22;
                settings.verticalUpDownShift = 0;
                settings.verticalRightLeftShift = 0;

                settings.horizontalOffset = -5;
                settings.horizontalGridSize = 26;
                settings.horizontalUpDownShift = -70;
                settings.horizontalRightLeftShift = 0;

                settings.type = '5 point';
            },
            'No top VP room': () => {
                settings.verticalOffset = 330;
                settings.verticalGridSize = 32;
                settings.verticalUpDownShift = -315;
                settings.verticalRightLeftShift = 0;

                settings.horizontalOffset = 274;
                settings.horizontalGridSize = 32;
                settings.horizontalUpDownShift = -140;
                settings.horizontalRightLeftShift = 0;

                settings.type = '5 point';
            }
        },
        export: () => {
            isExporting = true;
            p5.noLoop();
            p5.draw()
            p5.save();
            isExporting = false;
            p5.loop();
        }
    };

    const findSpaceCenter = () => {
        return p5.createVector(
            p5.min(vanishingPointPairs[0].p1.x, vanishingPointPairs[0].p2.x) + p5.abs(vanishingPointPairs[0].p1.x - vanishingPointPairs[0].p2.x) / 2,
            p5.min(vanishingPointPairs[1].p1.y, vanishingPointPairs[1].p2.y) + p5.abs(vanishingPointPairs[1].p1.y - vanishingPointPairs[1].p2.y) / 2
        );
    }


    p5.mousePressed = () => {
        rawLine = [p5.createVector(p5.mouseX, p5.mouseY)];
    }

    p5.mouseDragged = () => {
        rawLine.push(p5.createVector(p5.mouseX, p5.mouseY));
    }

    p5.mouseReleased = () => {
        if (rawLine.length > 5) {
            const spaceCenter = findSpaceCenter();
            segments.push(Segment.findSegment(rawLine, vanishingPointPairs, spaceCenter));
            
            rawLine = [];
        }
    }

    p5.setup = () => {
        canvas = p5.createCanvas(WIDTH, HEIGHT, (p5 as any).SVG);
        canvas.parent("app");
        p5.loop();
        rawLine = [];
        segments = [];
        const vertical = gui.addFolder('Vertical VPs');
        const horizontal = gui.addFolder('Horizontal VPs');
        const central = gui.addFolder('Central VP');
        gui.add(settings, 'type', ['5 point', '3 point']);
        const presets = gui.addFolder('presets');
        vertical.add(settings, 'verticalOffset', -50, +500);
        horizontal.add(settings, 'horizontalOffset', -50, +500);
        vertical.add(settings, 'verticalGridSize', 7, 41, 2);
        horizontal.add(settings, 'horizontalGridSize', 7, 41, 2);
        vertical.add(settings, 'verticalUpDownShift', -HEIGHT * 2, HEIGHT * 2, 5);
        vertical.add(settings, 'verticalRightLeftShift', -WIDTH * 2, WIDTH * 2, 5);
        horizontal.add(settings, 'horizontalUpDownShift', -HEIGHT * 2, HEIGHT * 2, 5);
        horizontal.add(settings, 'horizontalRightLeftShift', -WIDTH * 2, WIDTH * 2, 5);
        central.add(settings, 'centralGridSize', 5, 52, 4);
        Object.keys(settings.presets).forEach(key => presets.add(settings.presets, key).onFinishChange(() => gui.updateDisplay()))
        gui.add(settings, 'export');
        gui.add(settings, 'debug1', undefined, undefined, 0.01);
        gui.add(settings, 'debug2', undefined, undefined, 0.01);
    }

    p5.draw = () => {
        p5.background(127, isExporting ? 0 : 255);
        p5.noFill();

        vanishingPointPairs = [
            {
                p1: p5.createVector(WIDTH / 2 + settings.verticalRightLeftShift, -settings.verticalOffset + settings.verticalUpDownShift),
                p2: p5.createVector(WIDTH / 2 + settings.verticalRightLeftShift, HEIGHT + settings.verticalOffset + settings.verticalUpDownShift)
            },
        ]

        if (settings.type === '5 point') {
            vanishingPointPairs.push({
                p1: p5.createVector(-settings.horizontalOffset + settings.horizontalRightLeftShift, HEIGHT / 2 + settings.horizontalUpDownShift),
                p2: p5.createVector(WIDTH + settings.horizontalOffset + settings.horizontalRightLeftShift, HEIGHT / 2 + settings.horizontalUpDownShift)
            });
        } else {
            vanishingPointPairs.push({
                p1: p5.createVector(-settings.horizontalOffset + settings.horizontalRightLeftShift, HEIGHT / 2 + settings.horizontalUpDownShift),
                p2: p5.createVector(WIDTH + settings.horizontalOffset + settings.horizontalRightLeftShift, HEIGHT / 2 + settings.horizontalUpDownShift)
            });
            vanishingPointPairs.push({
                p1: p5.createVector(-settings.horizontalOffset - settings.horizontalRightLeftShift, HEIGHT / 2 + settings.horizontalUpDownShift),
                p2: p5.createVector(WIDTH + settings.horizontalOffset - settings.horizontalRightLeftShift, HEIGHT / 2 + settings.horizontalUpDownShift)
            });
        }

        const mouseVec = p5.createVector(p5.mouseX, p5.mouseY);

        vanishingPointPairs.forEach((vpPair, i) => {
            if (vpPair.p1 && vpPair.p2) {
                let color = p5.color(`hsl(${((i * 360) / 4) + 10}, 100%, 50%)`);
                color.setAlpha(255);
                p5.stroke(color);


                if (!isExporting) {
                    const side = sideFromTheLine(vpPair.p1, vpPair.p2, mouseVec);
                    const { center, radius, angleStart, angleStop } = circleWithThreePoints(vpPair.p1.copy(), vpPair.p2.copy(), mouseVec.copy());

                    p5.strokeWeight(2);
                    p5.arc(center.x, center.y, radius * 2, radius * 2, side > 0 ? angleStart : angleStop, side > 0 ? angleStop : angleStart);
                }

                p5.strokeWeight(1);
                color = p5.color(`hsl(${((i * 360) / 4) + 10}, 100%, 50%)`);
                color.setAlpha(150);
                p5.stroke(color);
                const mainDistance = vpPair.p1.dist(vpPair.p2) * 2;
                const gridSize = i == 0 ? settings.verticalGridSize : settings.horizontalGridSize;
                for (let i = -gridSize; i < gridSize; i++) {
                    if (i !== 0) {
                        const distance = (mainDistance / 2) / gridSize * i;
                        const { center, radius, angleStart, angleStop } = circleWithTwoPointsAndDistance(vpPair.p1, vpPair.p2, distance);
                        p5.arc(center.x, center.y, radius * 2, radius * 2, distance > 0 ? angleStart : angleStop, distance > 0 ? angleStop : angleStart)
                    }
                }
            }
        });

        const spaceCenter = findSpaceCenter()

        if (settings.type === '5 point') {
            const color = p5.color(`hsl(200, 100%, 50%)`);
            for (let angle = 0; angle < p5.TWO_PI; angle += p5.TWO_PI / settings.centralGridSize) {
                const v = p5.createVector(10000, 0).setHeading(angle).add(spaceCenter);
                p5.strokeWeight(1);
                color.setAlpha(150);
                p5.stroke(color);
                p5.line(spaceCenter.x, spaceCenter.y, v.x, v.y);
            }

            p5.strokeWeight(2);
            color.setAlpha(255);
            p5.stroke(color);

            if (!isExporting) {
                const mouseAngle = p5.createVector(10000, 0).angleBetween(mouseVec.copy().sub(spaceCenter))
                const mouseVector = p5.createVector(10000, 0).setHeading(mouseAngle).add(spaceCenter);
                p5.line(spaceCenter.x, spaceCenter.y, mouseVector.x, mouseVector.y);
            }
        }

        p5.strokeWeight(1);
        p5.stroke(0);
        p5.line(spaceCenter.x, 0, spaceCenter.x, HEIGHT);
        p5.line(0, spaceCenter.y, WIDTH, spaceCenter.y);

        const rawLineColor = p5.color(255, 255, 255, 100)
        p5.stroke(rawLineColor);
        p5.point(p5.mouseX, p5.mouseY);

        const allSegments = [...segments];

        if (rawLine.length > 5) {
            allSegments.push(Segment.findSegment(rawLine, vanishingPointPairs, spaceCenter));
        }

        allSegments.forEach(segment => segment.draw(p5));
    }
}
new P5(sketch);