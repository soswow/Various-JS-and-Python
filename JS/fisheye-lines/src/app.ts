import P5, {
    Vector, Color,
} from "p5";
import * as dat from 'dat.gui';
import initSVG from 'p5.js-svg'
import "./styles.scss";
import { getAutomaticTypeDirectiveNames } from "typescript";

let params = new URLSearchParams(location.search);
const isSVG = params.has('SVG');
if (isSVG) {
    initSVG(P5)
}
const WIDTH = 1200;
const HEIGHT = 800;
// const HEIGHT = WIDTH / (9/16);

interface VanishingPointPair {
    p1?: Vector;
    p2?: Vector;
}

interface Settings {
    verticalOffset: number,
    horizontalOffset: number,
    verticalGridSize: number,
    horizontalGridSize: number,
    verticalUpDownShift: number,
    verticalRightLeftShift: number,
    horizontalUpDownShift: number,
    horizontalRightLeftShift: number,
    centralGridSize: number;
    type: '5 point' | '3 point',
    presets: Record<string, Function>;
    export: Function,
    debug1: number,
    debug2: number,
}

type RawLine = Vector[];

interface CurvedSegment {
    center: Vector;
    diameter: number;
    startAngle: number;
    finishAngle: number;
    vpPair: VanishingPointPair;
    p1: Vector;
    p2: Vector;
}

interface CentralVPSegment {
    center: Vector;
    angle: number;
    startDistance: number;
    finishDistance: number;
}

const sketch = (p5: P5) => {
    let canvas: P5.Renderer;
    const gui = new dat.GUI();
    let isExporting: boolean = false;
    let vanishingPointPairs: VanishingPointPair[];
    let rawLine: RawLine;
    let curvedSegments: CurvedSegment[];
    let centralSegments: CentralVPSegment[];

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

    const perpendicularMiddleVector = (p1: Vector, p2: Vector, distance: number = 100) => {
        const middle = p5.createVector(
            p5.min(p1.x, p2.x) + p5.abs(p1.x - p2.x) / 2,
            p5.min(p1.y, p2.y) + p5.abs(p1.y - p2.y) / 2
        );
        return [middle, p5.createVector(p1.x, p1.y).sub(p2.x, p2.y).rotate(p5.HALF_PI).setMag(distance).add(middle)];
    }

    const lineIntersection = ({ x: x1, y: y1 }: Vector, { x: x2, y: y2 }: Vector, { x: x3, y: y3 }: Vector, { x: x4, y: y4 }: Vector) => p5.createVector(
        ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)),
        ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)),
    );

    const sideFromTheLine = ({ x: x1, y: y1 }: Vector, { x: x2, y: y2 }: Vector, { x: x, y: y }: Vector) => (x - x1) * (y2 - y1) - (y - y1) * (x2 - x1)


    const circleWithThreePoints = (p1: Vector, p2: Vector, p3: Vector) => {
        const originalP1 = p1.copy();
        const originalP2 = p2.copy();
        p2.x -= p1.x; p2.y -= p1.y; p3.x -= p1.x; p3.y -= p1.y;

        const Z1 = p2.x * p2.x + p2.y * p2.y;
        const Z2 = p3.x * p3.x + p3.y * p3.y;
        const D = 2 * (p2.x * p3.y - p3.x * p2.y);

        const Xc = (Z1 * p3.y - Z2 * p2.y) / D + p1.x;
        const Yc = (p2.x * Z2 - p3.x * Z1) / D + p1.y;
        const center = p5.createVector(Xc, Yc);

        const radius = center.copy().dist(originalP1);
        const angleStart = p5.createVector(100, 0).angleBetween(originalP1.copy().sub(center));
        const angleStop = p5.createVector(100, 0).angleBetween(originalP2.copy().sub(center));

        return { center, radius, angleStart, angleStop };
    }

    const circleWithTwoPointsAndDistance = (p1: Vector, p2: Vector, distance: number, debug: boolean = false) => {
        // middle - point between p1 and p2
        // perpLineEnd is point on the end of perpendicular line going from `middle`
        const [middle, perpLineEnd] = perpendicularMiddleVector(p1, p2, distance);

        // middle2 - point between p1 and `perpLineEnd`
        // perpLineEnd2 - end of perpendicular line going from middle2
        const [middle2, perpLineEnd2] = perpendicularMiddleVector(p1, perpLineEnd, 100);

        // Point of intersection between second perp. line and first perpendicular line
        const center = lineIntersection(middle, perpLineEnd, middle2, perpLineEnd2);

        const radius = center.dist(perpLineEnd);
        if (debug) {
            p5.push();
            p5.stroke(0);
            p5.strokeWeight(1);
            p5.line(middle.x, middle.y, perpLineEnd.x, perpLineEnd.y);
            p5.line(middle2.x, middle2.y, center.x, center.y);
            p5.stroke(255);
            p5.line(p1.x, p1.y, center.x, center.y);
            p5.line(p2.x, p2.y, center.x, center.y);
            p5.pop();
        }

        const angleStart = p5.createVector(100, 0).angleBetween(p1.copy().sub(center));
        const angleStop = p5.createVector(100, 0).angleBetween(p2.copy().sub(center));


        return { center, radius, angleStart, angleStop };
    }

    const matchedCurvedSegmentByTwoPoints = (vpPair: VanishingPointPair, p1: Vector, p2: Vector) => {
        const { center: center1, radius: radius1 } = circleWithThreePoints(vpPair.p1.copy(), vpPair.p2.copy(), p1.copy());
        const { center: center2, radius: radius2 } = circleWithThreePoints(vpPair.p1.copy(), vpPair.p2.copy(), p2.copy());
        const averageCenter = center1.copy().add(center2).div(2);
        const averageDiameter = radius1 + radius2;

        const p1Angle = p5.createVector(10000, 0).angleBetween(p1.copy().sub(averageCenter));
        const p2Angle = p5.createVector(10000, 0).angleBetween(p2.copy().sub(averageCenter));

        const side = sideFromTheLine(vpPair.p1, vpPair.p2, p1);
        const startAngle = side > 0
            ? (p2Angle > p1Angle ? p1Angle : p2Angle) :
            Math.sign(p1Angle) === Math.sign(p2Angle) ? (p1Angle < p2Angle ? p1Angle : p2Angle) : (p1Angle > p2Angle ? p1Angle : p2Angle)

        const finishAngle = side > 0
            ? (p2Angle < p1Angle ? p1Angle : p2Angle) :
            Math.sign(p1Angle) === Math.sign(p2Angle) ? (p1Angle < p2Angle ? p2Angle : p1Angle) : (p1Angle > p2Angle ? p2Angle : p1Angle);

        return {
            diameter: averageDiameter,
            center: averageCenter,
            startAngle,
            finishAngle
        }
    }

    const findMatchingCurvedSegment = (rawLine: RawLine): CurvedSegment => {
        const p1 = rawLine[0];
        const p2 = rawLine[rawLine.length - 1];

        const result = vanishingPointPairs.reduce<CurvedSegment & { error: number } | null>((solution, vpPair) => {
            const { center, diameter, startAngle, finishAngle } = matchedCurvedSegmentByTwoPoints(vpPair, p1, p2);
            const avgDistance = rawLine.reduce((sum, rawPoint) => sum + rawPoint.dist(center), 0) / rawLine.length;

            const error = Math.abs(diameter - avgDistance * 2);
            if (solution === null || error < solution.error) {
                return { center, diameter, startAngle, finishAngle, vpPair, error, p1, p2 };
            } else {
                return solution;
            }
        }, null);

        return result;
    }

    const findCentralVPMatch = (spaceCenter: Vector, rawLine: RawLine): CentralVPSegment | null => {
        const p1 = rawLine[0];
        const p2 = rawLine[rawLine.length - 1];

        const p1Angle = p5.createVector(10000, 0).angleBetween(p1.copy().sub(spaceCenter));
        const p2Angle = p5.createVector(10000, 0).angleBetween(p2.copy().sub(spaceCenter));

        if (Math.abs(p1Angle - p2Angle) < 0.08) {
            const angle = (p1Angle + p2Angle) / 2;
            return {
                center: spaceCenter,
                angle,
                startDistance: spaceCenter.dist(p1),
                finishDistance: spaceCenter.dist(p2),
            }
        } else {
            return null;
        }
    }

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
            const centralSegment = findCentralVPMatch(spaceCenter, rawLine);
            if (centralSegment) {
                centralSegments.push(centralSegment)
            } else {
                curvedSegments.push(findMatchingCurvedSegment(rawLine));
            }
            rawLine = [];
        }
    }

    p5.setup = () => {
        canvas = p5.createCanvas(WIDTH, HEIGHT, (p5 as any).SVG);
        canvas.parent("app");
        p5.loop();
        rawLine = [];
        curvedSegments = [];
        centralSegments = [];
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

        // p5.noFill();
        // p5.beginShape();
        // rawLine.forEach(({ x, y }) => p5.vertex(x, y));
        // p5.endShape();

        const allCurvedSegments = [...curvedSegments];
        const allCentralSegments = [...centralSegments];

        if (rawLine.length > 5) {
            
            const centralSegment = findCentralVPMatch(spaceCenter, rawLine);
            if (centralSegment) {
                allCentralSegments.push(centralSegment)
            }else{
                allCurvedSegments.push(findMatchingCurvedSegment(rawLine));
            }
        }

        allCurvedSegments.forEach(({ p1, p2, center, diameter, startAngle, finishAngle }) => {
            p5.push();
            p5.stroke(255);
            p5.strokeWeight(2);
            p5.arc(
                center.x,
                center.y,
                diameter,
                diameter,
                startAngle,
                finishAngle
            );
            p5.pop();
        });

        allCentralSegments.forEach(({angle, center, startDistance, finishDistance}) => {
            const p1 = p5.createVector(startDistance, 0).setHeading(angle).add(center);
            const p2 = p5.createVector(finishDistance, 0).setHeading(angle).add(center);
            p5.push();
            p5.stroke(255);
            p5.strokeWeight(2);
            p5.line(p1.x, p1.y, p2.x, p2.y);
            p5.pop();
        })
    }


}
new P5(sketch);