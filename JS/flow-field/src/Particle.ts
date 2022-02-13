import ndarray from "ndarray";
import P5, { Vector, Color } from "p5";

export default class Particle {
    position: Vector;
    private velocity: Vector;
    private acceleration: Vector;
    private prevPosition: Vector;
    private originalPosition: Vector;
    age: number;
    // isDead: boolean;

    constructor(private p5: P5, position?: Vector) {
        if (position) {
            this.position = position;
        } else {
            this.position = p5.createVector(p5.random() * p5.width, p5.random() * p5.height)
        }
        this.prevPosition = this.position.copy();
        this.originalPosition = this.position.copy();
        this.velocity = p5.createVector(0, 0);
        this.acceleration = p5.createVector(0, 0);
        // this.isDead = false;
        this.age = 0;
    }

    update(){
        this.velocity.add(this.acceleration);
        this.prevPosition.set(this.position.x, this.position.y);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.age += 1;
    }

    follow(fieldVectors: ndarray.NdArray<ndarray.Data<Vector>>, cellSize: number) {
        const x = this.p5.floor(this.position.x / cellSize);
        const y = this.p5.floor(this.position.y / cellSize);
        const fieldVector = fieldVectors.get(x, y);
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

    drawLine(valueIncreaseTime=40, valueDecreseTime=60, maxValue=100, maxLineWidth=5) {
        let colorValue = maxValue;
        let lineWidth = maxLineWidth;
        if(this.age < valueIncreaseTime){
            colorValue = this.p5.map(this.age, 0, valueIncreaseTime, 0, maxValue, true);
            lineWidth = this.p5.map(this.age, 0, valueIncreaseTime, 0.1, maxLineWidth, true);
        }
        if(this.age > valueIncreaseTime) {
            colorValue = this.p5.map(this.age, valueIncreaseTime, valueIncreaseTime + valueDecreseTime, maxValue, 0, true);
            lineWidth = this.p5.map(this.age, valueIncreaseTime, valueIncreaseTime + valueDecreseTime, maxLineWidth, 0.1, true);
        }
        
        this.p5.stroke(0,0,0,colorValue);
        this.p5.strokeCap(this.p5.SQUARE)
        this.p5.strokeWeight(lineWidth);
        this.p5.line(this.position.x, this.position.y, this.prevPosition.x, this.prevPosition.y);
        
    }

    edges() {
        const {x,y} = this.position;
        if(x < 0 || y < 0 || x > this.p5.width || y > this.p5.height){
            this.position.set(this.originalPosition.x, this.originalPosition.y);
            this.velocity.set(0,0);
            this.acceleration.set(0,0);
            // console.log(this.age);
            this.age = 0;
        }
    }

}