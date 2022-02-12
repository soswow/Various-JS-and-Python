const W = 900;
const H = 600;

const setupCanvas = (canvasId, canvasWith, canvasHeight) => {
  const canvasEl = document.getElementById(canvasId);
  const dpr = window.devicePixelRatio || 1;
  const ctx = canvasEl.getContext('2d');
  canvasEl.width = canvasWith * 2;
  canvasEl.height = canvasHeight * 2;
  canvasEl.style.width = `${canvasWith}px`;
  canvasEl.style.height = `${canvasHeight}px`;
  ctx.scale(dpr, dpr);
  return ctx;
};

const setupSvg = (svgId, svgWith, svgHeight) => {
  const svg = document.getElementById('svg');
  svg.width = svgWith;
  svg.height = svgHeight;
  svg.style.width = `${svgWith}px`;
  svg.style.height = `${svgHeight}px`;
  svg.setAttribute('viewBox',`0 0 ${svgWith} ${svgHeight}`);
  svg.classList.add('show');
  return svg;
};

const ctx = setupCanvas('canvas', W, H);
const svg = setupSvg('svg', W, H);

const addCircle = (svg, x, y, r) => {
  const circle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  circle.setAttribute('cx', x);
  circle.setAttribute('cy', y);
  circle.setAttribute('r', r);
  svg.appendChild(circle);

  return circle;
};


const circle = addCircle(svg, 50, 50, 20);
  circle.addEventListener('mousedown', console.log);
