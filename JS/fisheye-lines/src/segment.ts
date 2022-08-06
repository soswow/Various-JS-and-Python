import P5, {
    Vector,
} from "p5";
import { matchedCurvedSegmentByTwoPoints } from "./geometry-utils";
import { RawLine, VanishingPointPair } from "./types";

export abstract class Segment {

    static findSegment(rawLine: RawLine, vanishingPointPairs: VanishingPointPair[], spaceCenter?: Vector) {
        const centralSegment = spaceCenter && RadialSegment.findRadialSegment(rawLine, spaceCenter);
        if (centralSegment) {
            return centralSegment
        } else {
            return CurvedSegment.findCurvedSegment(rawLine, vanishingPointPairs);
        }
    }

    abstract getP1(): Vector;

    abstract getP2(): Vector;

    abstract draw(p5: P5): void;
}

export class RadialSegment extends Segment {

    constructor(
        private center: Vector,
        private angle: number,
        private startDistance: number,
        private finishDistance: number,
    ) {
        super();
    }

    static findRadialSegment(rawLine: RawLine, spaceCenter: Vector): RadialSegment | null {
        const p1 = rawLine[0];
        const p2 = rawLine[rawLine.length - 1];

        const p1Angle = new Vector(10000, 0).angleBetween(p1.copy().sub(spaceCenter));
        const p2Angle = new Vector(10000, 0).angleBetween(p2.copy().sub(spaceCenter));

        if (Math.abs(p1Angle - p2Angle) < 0.08) {
            const angle = (p1Angle + p2Angle) / 2;
            return new RadialSegment(
                spaceCenter,
                angle,
                spaceCenter.dist(p1),
                spaceCenter.dist(p2),
            );
        } else {
            return null;
        }
    }

    getP1(): Vector {
        return new Vector(this.startDistance, 0).setHeading(this.angle).add(this.center);
    }

    getP2(): Vector {
        return new Vector(this.finishDistance, 0).setHeading(this.angle).add(this.center);
    }

    draw(p5: P5): void {
        const p1 = this.getP1();
        const p2 = this.getP2();
        p5.push();
        p5.stroke(255);
        p5.strokeWeight(2);
        p5.line(p1.x, p1.y, p2.x, p2.y);
        p5.pop();
    }
}

export class CurvedSegment extends Segment {

    constructor(
        private vp: VanishingPointPair,
        private center: Vector,
        private diameter: number,
        private startAngle: number,
        private finishAngle: number,
    ) {
        super();
    }

    static findCurvedSegment(rawLine: RawLine, vanishingPointPairs: VanishingPointPair[]) {
        const p1 = rawLine[0];
        const p2 = rawLine[rawLine.length - 1];

        const result = vanishingPointPairs.reduce<[CurvedSegment | null, number]>(([curvedSegment, lastError], vp) => {
            const { center, diameter, startAngle, finishAngle } = matchedCurvedSegmentByTwoPoints(vp, p1, p2);
            const avgDistance = rawLine.reduce((sum, rawPoint) => sum + rawPoint.dist(center), 0) / rawLine.length;

            const error = Math.abs(diameter - avgDistance * 2);
            if (curvedSegment === null || error < lastError) {
                return [new CurvedSegment(vp, center, diameter, startAngle, finishAngle), error];
            } else {
                return [curvedSegment, error];
            }
        }, [null, 0]);

        return result[0];
    }

    getP1(): Vector {
        return new Vector(this.diameter/2, 0).setHeading(this.startAngle).add(this.center);
    }

    getP2(): Vector {
        return new Vector(this.diameter/2, 0).setHeading(this.finishAngle).add(this.center);
    }

    draw(p5: P5): void {
        p5.push();
        p5.stroke(255);
        p5.strokeWeight(2);
        p5.arc(
            this.center.x,
            this.center.y,
            this.diameter,
            this.diameter,
            this.startAngle,
            this.finishAngle
        );
        p5.pop();
    }
}
