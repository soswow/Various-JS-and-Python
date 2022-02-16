import ndarray from "ndarray";
import P5, { Vector, Color } from "p5";
import { getVectorValue } from "./utils";

let params = new URLSearchParams(location.search);
const isSuperHD = params.has('superHD');

export default class Particle {
    position: Vector;
    private velocity: Vector;
    private acceleration: Vector;
    private prevPosition: Vector;
    private originalPosition: Vector;
    private frictionForce: Vector;

    age: number;

    constructor(private p5: P5, 
        public valueIncreaseTime = 40,
        public valueDecreseTime = 60,
        position?: Vector
    ) {
        if (position) {
            this.position = position;
        } else {
            this.position = p5.createVector(p5.random() * p5.width, p5.random() * p5.height)
        }
        this.prevPosition = this.position.copy();
        this.originalPosition = this.position.copy();
        this.velocity = p5.createVector(0, 0);
        this.acceleration = p5.createVector(0, 0);
        this.frictionForce = p5.createVector(0, 0.02);
        
        this.valueIncreaseTime += this.p5.random(-valueIncreaseTime * 0.30, valueIncreaseTime * 0.30);
        this.valueDecreseTime += this.p5.random(-valueDecreseTime * 0.30, valueDecreseTime * 0.30);

        // this.isDead = false;
        this.age = 0;
    }

    update() {
        this.velocity.add(this.acceleration);
        this.frictionForce.setHeading(this.velocity.heading())
        this.velocity.sub(this.frictionForce);
        this.prevPosition.set(this.position.x, this.position.y);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.age += 1;
    }

    follow(fieldVectors: ndarray.NdArray<Vector[]>, cellSize: number) {
        const fieldVector = getVectorValue(this.p5, this.position, fieldVectors, cellSize);
        
        this.applyForce(fieldVector);
    }

    applyForce(force: Vector) {
        this.acceleration.add(force);
    }

    drawPoint() {
        this.p5.stroke(this.p5.map(this.age, 0, 60, 255, 0, true));
        this.p5.strokeWeight(2);
        this.p5.point(this.position.x, this.position.y);
    }

    drawLine(
        maxValue = 100,
        maxLineWidth = 5,
        changeHue = true,
        darkMode = true,
        hueBrightness = 150
    ) {
        let colorValue = maxValue;
        let lineWidth = maxLineWidth;

        if (this.age < this.valueIncreaseTime) {
            colorValue = this.p5.map(this.age, 0, this.valueIncreaseTime, 0, maxValue, true);
            lineWidth = this.p5.map(this.age, 0, this.valueIncreaseTime, 0.1, maxLineWidth, true);
        }
        if (this.age > this.valueIncreaseTime) {
            colorValue = this.p5.map(this.age, this.valueIncreaseTime, this.valueIncreaseTime + this.valueDecreseTime, maxValue, 0, true);
            lineWidth = this.p5.map(this.age, this.valueIncreaseTime, this.valueIncreaseTime + this.valueDecreseTime, maxLineWidth, 0.1, true);
        }

        this.p5.push();
        let hue = 0;
        if (changeHue) {
            this.p5.colorMode(this.p5.HSB, 255);
            // const speed = this.p5.dist(this.prevPosition.x, this.prevPosition.y, this.position.x, this.position.y);
            hue = this.p5.map(this.velocity.mag(), 0, isSuperHD ? 10 : 7, 0, 255);
            this.p5.stroke(hue, hueBrightness, hueBrightness, colorValue);
        } else if (darkMode) {
            this.p5.stroke(255, 255, 255, colorValue);
        } else {
            this.p5.stroke(0, 0, 0, colorValue);
        }

        this.p5.strokeCap(this.p5.SQUARE)
        this.p5.strokeWeight(lineWidth);
        this.p5.line(this.position.x, this.position.y, this.prevPosition.x, this.prevPosition.y);
        this.p5.pop();

        if (this.age >= this.valueIncreaseTime + this.valueDecreseTime) {
            this.reset();
        }
    }

    reset() {
        this.position.set(this.originalPosition.x, this.originalPosition.y);
        this.velocity.set(0, 0);
        this.acceleration.set(0, 0);
        this.age = 0;
    }

    edges() {
        const { x, y } = this.position;
        if (x < 0 || y < 0 || x > this.p5.width || y > this.p5.height) {
            this.reset();
        }
    }

}