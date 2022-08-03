import P5, {
    Vector, Color,
} from "p5";
import * as dat from 'dat.gui';
import "./styles.scss";

const WIDTH = 1200;
const HEIGHT = 800;
// const HEIGHT = WIDTH / (9/16);

interface State {
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
}

const sketch = (p5: P5) => {
    let canvas: P5.Renderer;
    const gui = new dat.GUI();

    const settings: Settings = {
        verticalOffset: 0,
        verticalGridSize: 22,
        verticalUpDownShift: 0,
        verticalRightLeftShift: 0,
        horizontalOffset: -5,
        horizontalGridSize: 26,
        horizontalUpDownShift: -70,
        horizontalRightLeftShift: 0,
        centralGridSize: 32,
        type: '5 point',
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
        }
    };

    let states: State[];
    // p5.mouseClicked = () => {
    //     console.log('click!');
    //     if (states.length === 0) {
    //         states.push({});
    //     };
    //     const state = states[states.length-1];
    //     if(!state.firstPoint) {
    //         state.firstPoint = new Vector(p5.mouseX, p5.mouseY);
    //     }else if(!state.secondPoint){
    //         state.secondPoint = new Vector(p5.mouseX, p5.mouseY);
    //         states.push({})
    //     }
    // }

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

        // let angleShift = p5.createVector(p1.x, p1.y).sub(center).angleBetween()
        // let angle = p5.createVector(p1.x, p1.y).sub(center).angleBetween(center.copy().sub(p2));
        const angleStart = p5.createVector(100, 0).angleBetween(p1.copy().sub(center));
        const angleStop = p5.createVector(100, 0).angleBetween(p2.copy().sub(center));

        // .copy().sub(p1).angleBetween(middle.copy().sub(perpLineEnd));
        // if(distance < 0){
        //     angle = p5.PI - angle;
        // }

        return { center, radius, angleStart, angleStop };
    }

    p5.setup = () => {
        canvas = p5.createCanvas(WIDTH, HEIGHT, p5.P2D);
        canvas.parent("app");
        p5.loop();
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
    }

    p5.draw = () => {
        p5.background(127, 127, 127);
        p5.noFill();

        states = [
            {
                p1: p5.createVector(WIDTH / 2 + settings.verticalRightLeftShift, -settings.verticalOffset + settings.verticalUpDownShift),
                p2: p5.createVector(WIDTH / 2 + settings.verticalRightLeftShift, HEIGHT + settings.verticalOffset + settings.verticalUpDownShift)
            },
        ]

        if (settings.type === '5 point') {
            states.push({
                p1: p5.createVector(-settings.horizontalOffset + settings.horizontalRightLeftShift, HEIGHT / 2 + settings.horizontalUpDownShift),
                p2: p5.createVector(WIDTH + settings.horizontalOffset + settings.horizontalRightLeftShift, HEIGHT / 2 + settings.horizontalUpDownShift)
            });
        } else {
            states.push({
                p1: p5.createVector(-settings.horizontalOffset + settings.horizontalRightLeftShift, HEIGHT / 2 + settings.horizontalUpDownShift),
                p2: p5.createVector(WIDTH + settings.horizontalOffset + settings.horizontalRightLeftShift, HEIGHT / 2 + settings.horizontalUpDownShift)
            });
            states.push({
                p1: p5.createVector(-settings.horizontalOffset - settings.horizontalRightLeftShift, HEIGHT / 2 + settings.horizontalUpDownShift),
                p2: p5.createVector(WIDTH + settings.horizontalOffset - settings.horizontalRightLeftShift, HEIGHT / 2 + settings.horizontalUpDownShift)
            });
        }

        const mouseVec = p5.createVector(p5.mouseX, p5.mouseY);

        states.forEach((state, i) => {
            if (state.p1 && state.p2) {
                let color = p5.color(`hsl(${((i * 360) / 4) + 10}, 100%, 50%)`);
                color.setAlpha(255);
                p5.stroke(color);


                const side = sideFromTheLine(state.p1, state.p2, mouseVec);
                const { center, radius, angleStart, angleStop } = circleWithThreePoints(state.p1.copy(), state.p2.copy(), mouseVec.copy());

                p5.strokeWeight(2);
                p5.arc(center.x, center.y, radius * 2, radius * 2, side > 0 ? angleStart : angleStop, side > 0 ? angleStop : angleStart);

                p5.strokeWeight(1);
                color = p5.color(`hsl(${((i * 360) / 4) + 10}, 100%, 50%)`);
                color.setAlpha(150);
                p5.stroke(color);
                const mainDistance = state.p1.dist(state.p2) * 2;
                const gridSize = i == 0 ? settings.verticalGridSize : settings.horizontalGridSize;
                for (let i = -gridSize; i < gridSize; i++) {
                    if (i !== 0) {
                        const distance = (mainDistance / 2) / gridSize * i;
                        const { center, radius, angleStart, angleStop } = circleWithTwoPointsAndDistance(state.p1, state.p2, distance);
                        p5.arc(center.x, center.y, radius * 2, radius * 2, distance > 0 ? angleStart : angleStop, distance > 0 ? angleStop : angleStart)
                    }
                }
            }
        });

        const middle = p5.createVector(
            p5.min(states[0].p1.x, states[0].p2.x) + p5.abs(states[0].p1.x - states[0].p2.x) / 2,
            p5.min(states[1].p1.y, states[1].p2.y) + p5.abs(states[1].p1.y - states[1].p2.y) / 2
        );

        if (settings.type === '5 point') {
            const color = p5.color(`hsl(200, 100%, 50%)`);
            for (let angle = 0; angle < p5.TWO_PI; angle += p5.TWO_PI / settings.centralGridSize) {
                const v = p5.createVector(10000, 0).setHeading(angle).add(middle);
                p5.strokeWeight(1);
                color.setAlpha(150);
                p5.stroke(color);
                p5.line(middle.x, middle.y, v.x, v.y);
            }

            p5.strokeWeight(2);
            color.setAlpha(255);
            p5.stroke(color);

            const mouseAngle = p5.createVector(10000, 0).angleBetween(mouseVec.copy().sub(middle))
            const mouseVector = p5.createVector(10000, 0).setHeading(mouseAngle).add(middle);
            p5.line(middle.x, middle.y, mouseVector.x, mouseVector.y);
        }
        p5.strokeWeight(1);
        p5.stroke(0);
        p5.line(middle.x, 0, middle.x, HEIGHT);
        p5.line(0, middle.y, WIDTH, middle.y);

        p5.stroke(255);
        p5.point(p5.mouseX, p5.mouseY);
    }


}
new P5(sketch);