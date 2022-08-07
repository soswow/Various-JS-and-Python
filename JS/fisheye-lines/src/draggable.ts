import P5, { CURSOR_TYPE, Vector } from "p5";

export class Draggable {
    private isDragging: boolean;
    private setter: (p: Vector) => void;
    constructor(private p5: P5, private diameter: number, private pos: Vector) {
        this.isDragging = false;
    }

    public static isAnyDragging: boolean = false;
    public static hoveredDraggable: Draggable | null = null;

    init(setter?: (p: Vector) => void) {
        const currentMouseMoved = this.p5.mouseMoved;
        this.p5.mouseMoved = () => {
            currentMouseMoved && currentMouseMoved();
            this.mouseMoved();
        }

        const cuerrentMousePressed = this.p5.mousePressed;
        this.p5.mousePressed = () => {
            cuerrentMousePressed && cuerrentMousePressed();
            this.mousePressed();
        }

        const cuerrentMouseReleased = this.p5.mouseReleased;
        this.p5.mouseReleased = () => {
            cuerrentMouseReleased && cuerrentMouseReleased();
            this.mouseReleased();
        }

        const cuerrentMouseDragged = this.p5.mouseDragged;
        this.p5.mouseDragged = () => {
            cuerrentMouseDragged && cuerrentMouseDragged();
            this.mouseDragged();
        }

        this.setter = setter;
    }

    private mouseVector() {
        return this.p5.createVector(this.p5.mouseX, this.p5.mouseY)
    }

    private isInside() {
        return this.mouseVector().dist(this.pos) <= this.diameter / 2;
    }

    mousePressed() {
        if (this.isInside()) {
            this.isDragging = true;
            Draggable.isAnyDragging = true;
        }
    }

    mouseReleased() {
        if (this.isDragging) {
            this.isDragging = false;
            Draggable.isAnyDragging = false;
        }
    }

    mouseDragged() {
        if (this.isDragging) {
            this.pos = this.mouseVector()
            this.setter(this.pos);
        }
    }

    mouseMoved() {
        if (this.isInside() || this.isDragging) {
            Draggable.hoveredDraggable = this
            this.p5.cursor('grab');
        } else if (Draggable.hoveredDraggable === this) {
            Draggable.hoveredDraggable = null;
            this.p5.cursor('auto');
        }
    }

    updatePosition(newPos: Vector) {
        this.pos = newPos;
    }

    draw() {
        if (Draggable.hoveredDraggable === this) {
            this.p5.push();
            if (this.isDragging) {
                this.p5.fill(255, 200, 200);
            } else {
                this.p5.fill(255);
            }
            this.p5.noStroke();
            this.p5.circle(this.pos.x, this.pos.y, this.diameter);
            this.p5.pop();
        }
    }
}