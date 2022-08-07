import P5, {
    Vector,
} from "p5";
import { Draggable } from "./draggable";
import { matchedCurvedSegmentByTwoPoints } from "./geometry-utils";
import { RawLine, VanishingPointPair } from "./types";

export abstract class Segment {

    constructor(protected p5: P5) {
    }

    static findSegment(p5: P5, rawLine: RawLine, vanishingPointPairs: VanishingPointPair[], spaceCenter?: Vector) {
        const centralSegment = spaceCenter && RadialSegment.findRadialSegment(p5, rawLine, spaceCenter);
        if (centralSegment) {
            return centralSegment
        } else {
            return CurvedSegment.findCurvedSegment(p5, rawLine, vanishingPointPairs);
        }
    }

    abstract getP1(): Vector;

    abstract getP2(): Vector;

    abstract draw(): void;
}

export class RadialSegment extends Segment {

    private draggableP1: Draggable;
    private draggableP2: Draggable;

    constructor(
        p5: P5,
        private center: Vector,
        private angle: number,
        private startDistance: number,
        private finishDistance: number,
    ) {
        super(p5);
        
        this.draggableP1 = new Draggable(p5, 20, this.getP1());
        this.draggableP1.init(this.setP1);
        
        this.draggableP2 = new Draggable(p5, 20, this.getP2());
        this.draggableP2.init(this.setP2);
    }

    static findRadialSegment(p5: P5, rawLine: RawLine, spaceCenter: Vector): RadialSegment | null {
        const p1 = rawLine[0];
        const p2 = rawLine[rawLine.length - 1];

        const p1Angle = new Vector(10000, 0).angleBetween(p1.copy().sub(spaceCenter));
        const p2Angle = new Vector(10000, 0).angleBetween(p2.copy().sub(spaceCenter));

        if (Math.abs(p1Angle - p2Angle) < 0.08) {
            const angle = (p1Angle + p2Angle) / 2;
            return new RadialSegment(
                p5,
                spaceCenter,
                angle,
                spaceCenter.dist(p1),
                spaceCenter.dist(p2),
            );
        } else {
            return null;
        }
    }

    private setP1 = (p1: Vector) => {
        this.angle = new Vector(10000, 0).angleBetween(p1.copy().sub(this.center));
        this.startDistance = this.center.dist(p1);
        this.draggableP2.updatePosition(this.getP2());
    }

    private setP2 = (p2: Vector) => {
        this.angle = new Vector(10000, 0).angleBetween(p2.copy().sub(this.center));
        this.finishDistance = this.center.dist(p2);
        this.draggableP1.updatePosition(this.getP1());
    }

    getP1(): Vector {
        return new Vector(this.startDistance, 0).setHeading(this.angle).add(this.center);
    }

    getP2(): Vector {
        return new Vector(this.finishDistance, 0).setHeading(this.angle).add(this.center);
    }

    draw(): void {
        const p1 = this.getP1();
        const p2 = this.getP2();
        this.p5.push();
        this.p5.stroke(255);
        this.p5.strokeWeight(2);
        this.p5.line(p1.x, p1.y, p2.x, p2.y);
        this.p5.pop();
        this.draggableP1.draw();
        this.draggableP2.draw();
    }
}

export class CurvedSegment extends Segment {

    private draggableP1: Draggable;
    private draggableP2: Draggable;

    constructor(
        p5: P5,
        private vp: VanishingPointPair,
        private center: Vector,
        private diameter: number,
        private startAngle: number,
        private finishAngle: number,
    ) {
        super(p5);

        this.draggableP1 = new Draggable(p5, 20, this.getP1());
        this.draggableP1.init(this.setP1);
        
        this.draggableP2 = new Draggable(p5, 20, this.getP2());
        this.draggableP2.init(this.setP2);
    }

    static findCurvedSegment(p5: P5, rawLine: RawLine, vanishingPointPairs: VanishingPointPair[]) {
        const p1 = rawLine[0];
        const p2 = rawLine[rawLine.length - 1];

        const result = vanishingPointPairs.reduce<[CurvedSegment | null, number]>(([curvedSegment, lastError], vp) => {
            const { center, diameter, startAngle, finishAngle } = matchedCurvedSegmentByTwoPoints(vp, p1, p2);
            const avgDistance = rawLine.reduce((sum, rawPoint) => sum + rawPoint.dist(center), 0) / rawLine.length;

            const error = Math.abs(diameter - avgDistance * 2);
            if (curvedSegment === null || error < lastError) {
                return [new CurvedSegment(p5, vp, center, diameter, startAngle, finishAngle), error];
            } else {
                return [curvedSegment, error];
            }
        }, [null, 0]);

        return result[0];
    }

    private setP1 = (p1: Vector) => {
        const { center, diameter, startAngle, finishAngle } = matchedCurvedSegmentByTwoPoints(this.vp, p1, this.getP2());
        this.center = center;
        this.diameter = diameter;
        this.startAngle = startAngle;
        this.finishAngle = finishAngle;
        this.draggableP2.updatePosition(this.getP2());
    }

    private setP2 = (p2: Vector) => {
        const { center, diameter, startAngle, finishAngle } = matchedCurvedSegmentByTwoPoints(this.vp, this.getP1(), p2);
        this.center = center;
        this.diameter = diameter;
        this.startAngle = startAngle;
        this.finishAngle = finishAngle;
        this.draggableP1.updatePosition(this.getP1());
    }


    getP1(): Vector {
        return new Vector(this.diameter/2, 0).setHeading(this.startAngle).add(this.center);
    }

    getP2(): Vector {
        return new Vector(this.diameter/2, 0).setHeading(this.finishAngle).add(this.center);
    }

    draw(): void {
        this.p5.push();
        this.p5.stroke(255);
        this.p5.strokeWeight(2);
        this.p5.arc(
            this.center.x,
            this.center.y,
            this.diameter,
            this.diameter,
            this.startAngle,
            this.finishAngle
        );
        this.p5.pop();
        this.draggableP1.draw();
        this.draggableP2.draw();
    }
}
