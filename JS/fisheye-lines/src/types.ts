import {
    Vector,
} from "p5";

export interface VanishingPointPair {
    p1?: Vector;
    p2?: Vector;
}

export interface Settings {
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
    export: Function,
    debug1: number,
    debug2: number,
}

export type RawLine = Vector[];

export interface CurvedSegment {
    center: Vector;
    diameter: number;
    startAngle: number;
    finishAngle: number;
    vpPair: VanishingPointPair;
    p1: Vector;
    p2: Vector;
}

export interface CentralVPSegment {
    center: Vector;
    angle: number;
    startDistance: number;
    finishDistance: number;
}