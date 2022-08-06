import {
    Vector,
} from "p5";
import { CentralVPSegment, CurvedSegment, RawLine, VanishingPointPair } from "./types";


export const perpendicularMiddleVector = (p1: Vector, p2: Vector, distance: number = 100) => {
    const middle = new Vector(
        Math.min(p1.x, p2.x) + Math.abs(p1.x - p2.x) / 2,
        Math.min(p1.y, p2.y) + Math.abs(p1.y - p2.y) / 2
    );

    return [middle, new Vector(p1.x, p1.y).sub(p2.x, p2.y).rotate(Math.PI / 2).setMag(distance).add(middle)];
}

export const lineIntersection = ({ x: x1, y: y1 }: Vector, { x: x2, y: y2 }: Vector, { x: x3, y: y3 }: Vector, { x: x4, y: y4 }: Vector) => new Vector(
    ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)),
    ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)),
);

export const sideFromTheLine = ({ x: x1, y: y1 }: Vector, { x: x2, y: y2 }: Vector, { x: x, y: y }: Vector) => (x - x1) * (y2 - y1) - (y - y1) * (x2 - x1)

export const circleWithThreePoints = (p1: Vector, p2: Vector, p3: Vector) => {
    const originalP1 = p1.copy();
    const originalP2 = p2.copy();
    p2.x -= p1.x; p2.y -= p1.y; p3.x -= p1.x; p3.y -= p1.y;

    const Z1 = p2.x * p2.x + p2.y * p2.y;
    const Z2 = p3.x * p3.x + p3.y * p3.y;
    const D = 2 * (p2.x * p3.y - p3.x * p2.y);

    const Xc = (Z1 * p3.y - Z2 * p2.y) / D + p1.x;
    const Yc = (p2.x * Z2 - p3.x * Z1) / D + p1.y;
    const center = new Vector(Xc, Yc);

    const radius = center.copy().dist(originalP1);
    const angleStart = new Vector(100, 0).angleBetween(originalP1.copy().sub(center));
    const angleStop = new Vector(100, 0).angleBetween(originalP2.copy().sub(center));

    return { center, radius, angleStart, angleStop };
}

export const circleWithTwoPointsAndDistance = (p1: Vector, p2: Vector, distance: number, debug: boolean = false) => {
    // middle - point between p1 and p2
    // perpLineEnd is point on the end of perpendicular line going from `middle`
    const [middle, perpLineEnd] = perpendicularMiddleVector(p1, p2, distance);

    // middle2 - point between p1 and `perpLineEnd`
    // perpLineEnd2 - end of perpendicular line going from middle2
    const [middle2, perpLineEnd2] = perpendicularMiddleVector(p1, perpLineEnd, 100);

    // Point of intersection between second perp. line and first perpendicular line
    const center = lineIntersection(middle, perpLineEnd, middle2, perpLineEnd2);

    const radius = center.dist(perpLineEnd);

    const angleStart = new Vector(100, 0).angleBetween(p1.copy().sub(center));
    const angleStop = new Vector(100, 0).angleBetween(p2.copy().sub(center));


    return { center, radius, angleStart, angleStop };
}

export const matchedCurvedSegmentByTwoPoints = (vpPair: VanishingPointPair, p1: Vector, p2: Vector) => {
    const { center: center1, radius: radius1 } = circleWithThreePoints(vpPair.p1.copy(), vpPair.p2.copy(), p1.copy());
    const { center: center2, radius: radius2 } = circleWithThreePoints(vpPair.p1.copy(), vpPair.p2.copy(), p2.copy());
    const averageCenter = center1.copy().add(center2).div(2);
    const averageDiameter = radius1 + radius2;

    const p1Angle = new Vector(10000, 0).angleBetween(p1.copy().sub(averageCenter));
    const p2Angle = new Vector(10000, 0).angleBetween(p2.copy().sub(averageCenter));

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

export const findMatchingCurvedSegment = (rawLine: RawLine, vanishingPointPairs: VanishingPointPair[]): CurvedSegment => {
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

export const findCentralVPMatch = (spaceCenter: Vector, rawLine: RawLine): CentralVPSegment | null => {
    const p1 = rawLine[0];
    const p2 = rawLine[rawLine.length - 1];

    const p1Angle = new Vector(10000, 0).angleBetween(p1.copy().sub(spaceCenter));
    const p2Angle = new Vector(10000, 0).angleBetween(p2.copy().sub(spaceCenter));

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