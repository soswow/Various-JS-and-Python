const fs = require('fs');
const leftPad = require('left-pad');
const argv = require('yargs').argv;

const index = argv.index || 10;

const srcIndexStr = leftPad(index, 4, '0');
const fileName = `output_${srcIndexStr}.gcode`;
console.log(`Reading ${fileName}`);
const content = fs.readFileSync(fileName, 'utf-8');
const lines = content.split('\n');

const w = 490; //mm
const h = 640; //mm
const drawingSpeed = 500;
const penOut = "S80 (pen up)\n";
const penIn = "S83 (pen down)\n";

const sqrt = Math.sqrt;
const pow = Math.pow;

const params = {};
params.a0 = sqrt(pow(w/2, 2) + pow(h, 2));
params.b0 = params.a0;

console.log(`h: ${h}`);
console.log(`w: ${w}`);
console.log(`a0, b0: ${params.a0}`);

const convertXYtoAB = (data) => {
  // Invert Xs and Ys not to have mirrored image.
  const x = data.X;
  const y = data.Y;

  const y2 = h - y;
  const x2 = w/2 - x;
  const aAbs = Math.sqrt(Math.pow(y2, 2) + Math.pow(x2, 2));
  const bAbs = Math.sqrt(Math.pow(y2, 2) + Math.pow(w - x2, 2));

  data.Y = params.a0 - aAbs;
  data.X = params.b0 - bAbs;
};

const parseCGodeValues = (str) => {
  const result = {};
  str.split(' ').forEach((word, i) => {
    const key = word[0];
    const value = word.substr(1);
    result[key] = i === 0 ? value : parseFloat(value);
  });
  return result;
}

const newContent = lines.map((line) => {
  const isLinearMotionCommand = line.startsWith('G00') || line.startsWith('G01');
  if (isLinearMotionCommand) {
    const data = parseCGodeValues(line);

    if (data.F > 0) {
      data.F = drawingSpeed;
    }

    let prependCommand = '';
    if (data.Z > 0) {
      data.Z = 1;
      prependCommand = penOut;
    } else if (line.endsWith('(Penetrate)')){
      prependCommand = penIn;
    }

    if (data.X !== undefined && data.Y !== undefined) {
      convertXYtoAB(data);
    }
    if (data.X !== undefined || data.Y !== undefined || data.Z !== undefined) {
      line = Object.keys(data).map((key) => `${key}${data[key]}`).join(' ');
    }

    line = prependCommand + line;
  }
  return line;
}).join('\n');
const outFileName = `output_${srcIndexStr}_ab_system.gcode`;
console.log(`Writing ${outFileName}`);
fs.writeFileSync(outFileName, newContent);
console.log('All good. Done.');
