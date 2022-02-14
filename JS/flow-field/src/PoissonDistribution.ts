import p5, { Vector } from "p5";
import Particle from "./Particle";

export default class PoissonDistribution {
    r: number; // min distance
    k: number; // trying before quiting
    w: number; // size of a cell in a grid
    grid: (Vector | null)[];
    active: Vector[];
    cols: number;
    rows: number;

    constructor(private p5: p5, minDistance: number = 10) {
        this.r = minDistance;
        this.k = 30;
        this.w = this.r / p5.sqrt(2);
        this.grid = [];
        this.active = [];
        this.cols = this.p5.floor(this.p5.width / this.w);
        this.rows = this.p5.floor(this.p5.height / this.w);
    }

    init() {
        // STEP 0

        for (let i = 0; i < this.cols * this.rows; i++) {
            this.grid[i] = null;
        }

        // STEP 1
        const initPoint = this.p5.createVector(this.p5.random(this.p5.width), this.p5.random(this.p5.height));
        const initCol = this.p5.floor(initPoint.x / this.w);
        const initRow = this.p5.floor(initPoint.y / this.w);
        this.grid[initRow * this.cols + initCol] = initPoint;
        this.active.push(initPoint);
    }

    fill() {
        while (this.active.length > 0) {
            this.loop();
        }
    }

    points(valueIncreaseTime = 40, valueDecreseTime = 60,) {
        return this.grid.filter(vector => vector).map(vector => new Particle(this.p5, valueIncreaseTime, valueDecreseTime, vector.copy()));
    }

    loop() {
        if (this.active.length > 0) {
            const randomActivePointIndex = this.p5.floor(this.p5.random(this.active.length));
            const activePoint = this.active[randomActivePointIndex];
            let found = false;
            for (let n = 0; n < this.k; n++) {
                const sample = Vector.random2D();
                const mag = this.p5.random(this.r, this.r * 2);
                sample.setMag(mag);
                sample.add(activePoint);
                const sampleGridCol = this.p5.floor(sample.x / this.w);
                const sampleGridRow = this.p5.floor(sample.y / this.w);
                if (
                    !this.grid[sampleGridCol + sampleGridRow * this.cols] // Empty spot
                    && sampleGridCol < this.cols
                    && sampleGridRow < this.rows
                    && sampleGridRow >= 0
                    && sampleGridCol >= 0
                ) {
                    let ok = true;
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            const neighbor = this.grid[(sampleGridCol + i) + (sampleGridRow + j) * this.cols];
                            if (neighbor) {
                                const distance = Vector.dist(sample, neighbor);
                                if (distance < this.r) {
                                    ok = false;
                                }
                            }
                        }
                    }

                    if (ok) {
                        this.grid[sampleGridCol + this.cols * sampleGridRow] = sample;
                        this.active.push(sample);
                        found = true;
                    }
                }
            }
            if (!found) {
                this.active.splice(randomActivePointIndex, 1);
            }
            return found;
        }
        return false;
    }

    draw() {
        this.grid.forEach(p => {
            if (p) {
                this.p5.stroke(0);
                this.p5.strokeWeight(5);
                this.p5.point(p.x, p.y);
            }
        });
        this.active.forEach(p => {
            this.p5.stroke(0, 255, 255);
            this.p5.point(p.x, p.y);
        });
    }
}