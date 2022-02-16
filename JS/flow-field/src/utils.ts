import { NdArray } from "ndarray";
import P5, { Vector } from "p5";

const bilinearInterpolation = (p5: P5, Q11: number, Q21: number, Q12: number, Q22: number, xportion: number, yportion: number) => {
    // https://en.wikipedia.org/wiki/Bilinear_interpolation
    const xy1 = p5.lerp(Q11, Q21, xportion);
    const xy2 = p5.lerp(Q12, Q22, xportion);
    return p5.lerp(xy1, xy2, yportion);
}

export const getVectorValue = (p5: P5, point: Vector, vectorField: NdArray<Vector[]>, cellSize: number) => {
    // Simple way
    // const vx = Math.floor(point.x / settings.cellSize);
    // const vy = Math.floor(point.y / settings.cellSize);
    // const cellVector = vectorField.get(vx, vy);
    const [width, height] = vectorField.shape;
    const vx = point.x / cellSize;
    const vy = point.y / cellSize;
    const vxlow = Math.floor(vx);
    const vylow = Math.floor(vy);
    let vxhigh = Math.ceil(vx);
    let vyhigh = Math.ceil(vy);
    if(vxhigh >= width){
        vxhigh = vxlow;
    }
    if(vyhigh >= height){
        vyhigh = vylow;
    }
    const vxperc = vx - vxlow;
    const vyperc = vy - vylow;
    const topleft = vectorField.get(vxlow, vylow);
    const topright = vectorField.get(vxhigh, vylow) || topleft;
    const bottomleft = vectorField.get(vxlow, vyhigh) || topleft;
    const bottomright = vectorField.get(vxhigh, vyhigh) || topright;
    
    const xValue = bilinearInterpolation(p5, topleft.x, topright.x, bottomleft.x, bottomright.x, vxperc, vyperc);
    const yValue = bilinearInterpolation(p5, topleft.y, topright.y, bottomleft.y, bottomright.y, vxperc, vyperc);
    return p5.createVector(xValue, yValue);
};