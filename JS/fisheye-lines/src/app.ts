import P5, {
    Vector, Color,
} from "p5";
import * as dat from 'dat.gui';
import "./styles.scss";

const WIDTH = 1000;
const HEIGHT = 800;
// const HEIGHT = WIDTH / (9/16);

interface State {
    p1?: Vector;
    p2?: Vector;
}

interface Settings { 
    verticalOffset: 100,
    horizontalOffset: 100,
    verticalGridSize: 10,
    horizontalGridSize: 10,
    verticalUpDownShift: 0,
    verticalRightLeftShift: 0,
    horizontalUpDownShift: 0,
    horizontalRightLeftShift: 0,
    type: '4 point' | '3 point',
}

const sketch = (p5: P5) => {
    let canvas: P5.Renderer;
    const gui = new dat.GUI();

    const settings: Settings = {
        verticalOffset: 100,
        horizontalOffset: 100,
        verticalGridSize: 10,
        horizontalGridSize: 10,
        verticalUpDownShift: 0,
        verticalRightLeftShift: 0,
        horizontalUpDownShift: 0,
        horizontalRightLeftShift: 0,
        type: '4 point'
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

    const circleWithThreePoints = (p1: Vector, p2: Vector, distance: number) => {
        const [middle, perpLineEnd] = perpendicularMiddleVector(p1, p2, distance);

        const [middle2, perpLineEnd2] = perpendicularMiddleVector(p1, perpLineEnd, 10);

        const center = lineIntersection(middle, perpLineEnd, middle2, perpLineEnd2);
        const radius = center.dist(perpLineEnd);
        return { center, radius };
    }

    p5.setup = () => {
        canvas = p5.createCanvas(WIDTH, HEIGHT, p5.P2D);
        canvas.parent("app");
        p5.loop();
        const vertical = gui.addFolder('vertical');
        const horizontal = gui.addFolder('horizontal');
        gui.add(settings, 'type', ['4 point', '3 point']);
        vertical.add(settings, 'verticalOffset', -50, +500);
        horizontal.add(settings, 'horizontalOffset', -50, +500);
        vertical.add(settings, 'verticalGridSize', 7, 41, 2);
        horizontal.add(settings, 'horizontalGridSize', 7, 41, 2);
        vertical.add(settings, 'verticalUpDownShift', -HEIGHT * 2, HEIGHT * 2, 5);
        vertical.add(settings, 'verticalRightLeftShift', -WIDTH * 2, WIDTH * 2, 5);
        horizontal.add(settings, 'horizontalUpDownShift', -HEIGHT * 2, HEIGHT * 2, 5);
        horizontal.add(settings, 'horizontalRightLeftShift', -WIDTH * 2, WIDTH * 2, 5);
        
    }

    p5.draw = () => {
        p5.background(127, 127, 127);
        p5.noFill();

        states = [
            {
                p1: p5.createVector(WIDTH / 2 + settings.verticalRightLeftShift, -settings.verticalOffset + settings.verticalUpDownShift),
                p2: p5.createVector(WIDTH / 2+ settings.verticalRightLeftShift, HEIGHT + settings.verticalOffset + settings.verticalUpDownShift)
            },
        ]

        if(settings.type === '4 point'){
            states.push({
                p1: p5.createVector(-settings.horizontalOffset + settings.horizontalRightLeftShift , HEIGHT / 2 + settings.horizontalUpDownShift),
                p2: p5.createVector(WIDTH + settings.horizontalOffset+ settings.horizontalRightLeftShift, HEIGHT / 2 + settings.horizontalUpDownShift)
            });
        }else{
            states.push({
                p1: p5.createVector(-settings.horizontalOffset + settings.horizontalRightLeftShift , HEIGHT / 2 + settings.horizontalUpDownShift),
                p2: p5.createVector(WIDTH + settings.horizontalOffset+ settings.horizontalRightLeftShift, HEIGHT / 2 + settings.horizontalUpDownShift)
            });
            states.push({
                p1: p5.createVector(-settings.horizontalOffset - settings.horizontalRightLeftShift , HEIGHT / 2 + settings.horizontalUpDownShift),
                p2: p5.createVector(WIDTH + settings.horizontalOffset - settings.horizontalRightLeftShift, HEIGHT / 2 + settings.horizontalUpDownShift)
            });
        }   

        states.forEach((state, i) => {
            if (state.p1 && state.p2) {
                let color = p5.color(`hsl(${((i * 360) / 4) + 10}, 100%, 50%)`);
                color.setAlpha(255);
                p5.stroke(color);

                const distance = p5.abs(
                    (state.p2.x - state.p1.x) * (state.p1.y - p5.mouseY) - (state.p1.x - p5.mouseX) * (state.p2.y - state.p1.y)
                ) / p5.sqrt(
                    p5.sq(state.p2.x - state.p1.x) + p5.sq(state.p2.y - state.p1.y)
                )
                const side = sideFromTheLine(state.p1, state.p2, p5.createVector(p5.mouseX, p5.mouseY));
                const { center, radius } = circleWithThreePoints(state.p1, state.p2, distance * Math.sign(side));

                p5.strokeWeight(2);
                p5.circle(center.x, center.y, radius * 2);

                p5.strokeWeight(1);

                p5.stroke(0);
                p5.line(state.p1.x, state.p1.y, state.p2.x, state.p2.y);

                color = p5.color(`hsl(${((i * 360) / 4) + 10}, 100%, 50%)`);
                color.setAlpha(150);
                p5.stroke(color);
                const mainDistance = p5.createVector(state.p1.x, state.p1.y).dist(p5.createVector(state.p2.x, state.p2.y));
                const gridSize = i == 0 ? settings.verticalGridSize : settings.horizontalGridSize;
                for (let i = -gridSize; i < gridSize; i++) {
                    if (i !== 0) {
                        const { center, radius } = circleWithThreePoints(state.p1, state.p2, (mainDistance / 2) / gridSize * i);
                        p5.circle(center.x, center.y, radius * 2);
                    }
                }
            }
        });
        p5.stroke(255);
        p5.point(p5.mouseX, p5.mouseY);
    }


}
new P5(sketch);