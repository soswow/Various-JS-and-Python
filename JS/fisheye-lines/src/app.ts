import p5, { 
    Vector, Color,
} from "p5";
import type {default as P5} from 'p5';
import "./styles.scss";

const WIDTH = 600;
const HEIGHT = 600;

const sketch = (p5: P5) => {
    let canvas: p5.Renderer;
    
    p5.setup = () => {
        canvas = p5.createCanvas(WIDTH, HEIGHT, p5.P2D);
        canvas.parent("app");  
        p5.loop();
    }

    p5.draw = () => {
        p5.stroke(255);
        p5.point(p5.mouseX, p5.mouseY);
    }
    
}
new p5(sketch);