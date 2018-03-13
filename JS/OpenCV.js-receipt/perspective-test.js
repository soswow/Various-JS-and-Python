const gui = new dat.GUI();

const renderStages = {original: 0, gray: 5, blurred: 10, binary: 15, contours: 20, contentParts: 25};

class App {
  constructor(videoElement, outputCanvasElementId, inputCanvasElementId) {
    this.videoElement = videoElement;
    this.outCanvasElementId = outputCanvasElementId;
    this.inCanvasElement = document.getElementById(inputCanvasElementId);

    this.isStreaming = false;
    this.stream = null;
    this.height = 0;
    this.width = 0;
    this.videoCapture = null;
    this.src = null;
    this.dstC1 = null;
    this.dstC2 = null;
    this.dstC3 = null;
    this.dstC3_out = null;
    this.dstC4 = null;
    this.planesC3Vector = null;
    this.RGBA_COLORS = [];

    this.settings = {
      equalizeHist: false,
      renderStage: renderStages.contentParts,
      binaryStage: 'adaptiveThreshold',
      thresholdType: cv.THRESH_BINARY,
      imageSource: 'images/IMG_20180226_212741.jpg',
      blur: 2,
      contourThreshold1: 75,
      contourThreshold2: 200,
      simpleThresholdLevel: 127,
      grayColorSpace: cv.COLOR_RGB2GRAY,
      grayChannelNumber: 0,
      showSegments: false,
      circlesAlpha: 0.5,
      minAreaIncluded: 10,
      maxAreaIncluded: 300,
    };
    this.prevSettings = {};
  }

  hasSettingsChanged() {
    return JSON.stringify(this.settings) !== JSON.stringify(this.prevSettings);
  }

  run() {
    for(let i=0; i<100; i++) {
      this.RGBA_COLORS.push(this.randomRGBAColor);
    }
    this.bindedProcessFrame = this.processFrame.bind(this);
    requestAnimationFrame(this.bindedProcessFrame);
  }

  startCamera() {
    return new Promise((resolve, reject) => {
      const qvga = {width: {exact: 320}, height: {exact: 240}};
      const vga = {width: {exact: 640}, height: {exact: 480}};
      const resolution = window.innerWidth < 640 ? qvga : vga;

      if (this.isStreaming) { return; }

      navigator.mediaDevices
        .getUserMedia({video: resolution, audio: false})
        .then((s) => {
          this.stream = s;
          this.videoElement.srcObject = s;
          this.videoElement.play();
        })
        .catch(reject);

      this.videoElement.addEventListener("canplay", () => {
        if (!this.isStreaming) {
          this.height = this.videoElement.videoHeight;
          this.width = this.videoElement.videoWidth;
          this.videoElement.setAttribute("width", this.width);
          this.videoElement.setAttribute("height", this.height);
          this.videoCapture = new cv.VideoCapture(this.videoElement);
          // const inMat = cv.matFromArray(4, 2, cv.CV_32FC1, [50, 50, this.width - 50, 50, this.width - 200, this.height - 50, 200, this.height - 50]);
          // const outMat = cv.matFromArray(4, 2, cv.CV_32FC1, [50, 50, this.width - 50, 50, this.width - 50, this.height - 50, 50, this.height - 50]);
          // this.perspectiveTransMatrix = cv.getPerspectiveTransform(inMat,outMat);
          // console.log(this.perspectiveTransMatrix);
          this.resetMats();
          this.isStreaming = true;
          resolve();
        }
      }, false);
    });
  }

  resetMats() {
    if (this.src !== null && !this.src.isDeleted()) { this.src.delete() }
    if (this.dstC1 !== null && !this.dstC1.isDeleted()) { this.dstC1.delete() }
    if (this.dstC3 !== null && !this.dstC3.isDeleted()) { this.dstC3.delete() }
    if (this.dstC4 !== null && !this.dstC4.isDeleted()) { this.dstC4.delete() }
    if (this.planesC3Vector !== null && !this.planesC3Vector.isDeleted()) { this.planesC3Vector.delete() }

    this.src = new cv.Mat(this.height, this.width, cv.CV_8UC4);
    this.dstC1 = new cv.Mat(this.height, this.width, cv.CV_8UC1);
    this.dstC3 = new cv.Mat(this.height, this.width, cv.CV_8UC3);
    this.dstC4 = new cv.Mat(this.height, this.width, cv.CV_8UC4);
    this.planesC3Vector = new cv.MatVector();
  }

  getAdjustedSize(img) {
    const {width, height} = img;
    const MAX = 800;
    if (width > MAX || height > MAX) {
      if ( width > height) {
        return {width: MAX, height: (MAX * height) / width};
      } else {
        return {width: (MAX * width) / height, height: MAX};
      }
    }else {
      return {width, height};
    }
  }

  loadImage(url) {
    return new Promise((resolve) => {
      const ctx = this.inCanvasElement.getContext('2d');
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const {width, height} = this.getAdjustedSize(img);
        this.height = height;
        this.width = width;
        this.inCanvasElement.width = width;
        this.inCanvasElement.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        this.resetMats();
        resolve(ctx.getImageData(0, 0, width, height));
      };
      img.src = url;
    });
  };

  readFrameData() {
    const imageSource = this.settings.imageSource;
    if (imageSource === 'WEBCAM') {
      if(imageSource !== this.prevImageName){
        this.startCamera();
      }
      if (this.isStreaming) {
        this.videoCapture.read(this.src);
        return true;
      }
      this.prevImageName = imageSource;
    } else {
      const needToUpdateSourceMat = this.prevImageName !== imageSource;
      if (this.prevImageName === 'WEBCAM') {
        this.videoElement.removeEventListener('canplay', null);
        this.videoElement.pause();
        this.stream = null;
        this.videoElement.srcObject = null;
        this.isStreaming = false;
      }
      if (needToUpdateSourceMat) {
        // this.settings.minAreaIncluded = 0;
        // this.settings.maxAreaIncluded = 0;
        this.loadImage(imageSource).then(imgData => {
          this.src = cv.matFromImageData(imgData);
          this.renderFrame();
        });
        this.prevImageName = imageSource;
      }
    }
  }

  get randomRGBAColor() {
    return [Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255), 255]
  }

  renderFrame() {
    const stage = +this.settings.renderStage;
    if (stage === renderStages.original) {
      this.dstC4.delete();
      this.dstC4 = this.src.clone();
    } else {
      if (stage >= renderStages.gray) {
        // const red = new cv.Mat(this.height, this.width, cv.CV_8UC1);

        cv.cvtColor(this.src, this.dstC3, cv.COLOR_RGBA2RGB);
        const toColorSpace = +this.settings.grayColorSpace;
        const pickedChannel = +this.settings.grayChannelNumber;
        if (toColorSpace === cv.COLOR_RGB2GRAY) {
          cv.cvtColor(this.dstC3, this.dstC1, cv.COLOR_RGB2GRAY);
        } else {
          cv.cvtColor(this.dstC3, this.dstC3, toColorSpace);
          cv.split(this.dstC3, this.planesC3Vector);
          this.dstC1.delete();
          this.dstC1 = this.planesC3Vector.get(pickedChannel).clone();
        }
      }

      if (stage >= renderStages.blurred) {
        cv.GaussianBlur(this.dstC1, this.dstC1, {
          height: this.settings.blur + 1,
          width: this.settings.blur + 1
        }, 0, 0, cv.BORDER_DEFAULT);
        if (this.settings.equalizeHist) {
          cv.equalizeHist(this.dstC1, this.dstC1);
        }
      }

      if (stage >= renderStages.binary) {

        if (this.settings.binaryStage === 'contour') {
          cv.Canny(this.dstC1, this.dstC1, this.settings.contourThreshold1, this.settings.contourThreshold2);
        } else if(this.settings.binaryStage === 'adaptiveThreshold') {
          const C = 10;
          const THRESHOLD_MAX = 255;
          const block_size = 25;
          cv.adaptiveThreshold(this.dstC1, this.dstC1, THRESHOLD_MAX,
            cv.ADAPTIVE_THRESH_GAUSSIAN_C, +this.settings.thresholdType, block_size, C);
        } else if(this.settings.binaryStage === 'simpleThreshold') {
          cv.threshold(this.dstC1, this.dstC1, this.settings.simpleThresholdLevel, 255, +this.settings.thresholdType);
        }
      }

      cv.cvtColor(this.dstC1, this.dstC4, cv.COLOR_GRAY2RGBA);

      let contours;
      if (stage >= renderStages.contours) {
        contours = new cv.MatVector();
        const hierarchy = new cv.Mat();
        cv.findContours(this.dstC1, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE, new cv.Point());
        hierarchy.delete();

        if (stage === renderStages.contours){
          for (let i = 0; i < contours.size(); i++) {
            cv.drawContours(this.dstC4, contours, i, this.RGBA_COLORS[i % this.RGBA_COLORS.length], 3);
          }

          contours.delete();
        }
      }

      if (stage >= renderStages.contentParts) {
        let areas = [];
        for (let i = 0; i < contours.size(); i++) {
          const rect =cv.boundingRect(contours.get(i));
          const area = cv.contourArea(contours.get(i), false);
          const x = rect.x + rect.width/2;
          const y = rect.y + rect.height/2;
          areas.push({x, y, area, index: i});
        }

        areas.sort(({area: area1}, {area: area2}) => area1 - area2);

        // const minIndex = Math.round(areas.length * 0.1);
        // const maxIndex = Math.round(areas.length * 0.9);
        //
        // if (this.settings.minAreaIncluded === 0 && this.settings.maxAreaIncluded === 0) {
          gui.__folders.contentParts.__controllers[2].__min = areas[0].area;
          gui.__folders.contentParts.__controllers[2].__max = areas[areas.length-10].area;
          gui.__folders.contentParts.__controllers[3].__min = areas[0].area;
          gui.__folders.contentParts.__controllers[3].__max = areas[areas.length-10].area;
          // this.settings.minAreaIncluded = areas[minIndex].area;
          // this.settings.maxAreaIncluded = areas[maxIndex].area;
          gui.__folders.contentParts.__controllers[2].updateDisplay();
          gui.__folders.contentParts.__controllers[3].updateDisplay();
        // }

        const overlay = new cv.Mat(this.height, this.width, cv.CV_8UC4, new cv.Scalar(255, 255, 255, 255));

        for (let i = 0; i < areas.length; i++) {
          const { x, y, area } = areas[i];
          if (area >= this.settings.minAreaIncluded && area <= this.settings.maxAreaIncluded) {
            if (this.settings.showSegments) {
              cv.drawContours(overlay, contours, i, this.RGBA_COLORS[i % this.RGBA_COLORS.length], 3);
            } else {
              cv.circle(overlay, { x, y }, Math.sqrt(area / Math.PI), [255, 0, 0, 255], -1);
            }
          }
        }
        // this.dstC4 = overlay.clone();
        cv.addWeighted(overlay, this.settings.circlesAlpha, this.dstC4, 1 - this.settings.circlesAlpha, 0, this.dstC4);

        contours.delete();
        overlay.delete();
      }
    }
    // cv.warpPerspective(this.src, this.dstC4, this.perspectiveTransMatrix, new cv.Size(this.width, this.height));
    cv.imshow(this.outCanvasElementId, this.dstC4);
    // cv.imshow(this.outCanvasElementId, this.dstC1);
  }

  processFrame() {
    if (this.hasSettingsChanged() || this.settings.imageSource === 'WEBCAM'){
      this.readFrameData();
      if ( this.src ) {
        this.renderFrame();
        this.prevSettings = {...this.settings};
      }
    }
    requestAnimationFrame(this.bindedProcessFrame);
  }
}

const videoElement = document.getElementById('video');
const app = new App(videoElement, 'canvasOutput', 'canvasInput');
app.run();

const grayFolder = gui.addFolder('gray');
grayFolder.add(app.settings, 'grayColorSpace', {
  COLOR_RGB2GRAY: cv.COLOR_RGB2GRAY,
  COLOR_RGB2XYZ: cv.COLOR_RGB2XYZ,
  COLOR_RGB2YCrCb: cv.COLOR_RGB2YCrCb,
  COLOR_RGB2HSV: cv.COLOR_RGB2HSV,
  COLOR_RGB2Lab: cv.COLOR_RGB2Lab,
  COLOR_RGB2Luv: cv.COLOR_RGB2Luv,
  COLOR_RGB2HLS: cv.COLOR_RGB2HLS,
  COLOR_RGB2YUV: cv.COLOR_RGB2YUV
});
grayFolder.add(app.settings, 'grayChannelNumber', [0, 1, 2]);

gui.add(app.settings, 'blur').min(0).max(10).step(2);
gui.add(app.settings, 'equalizeHist');

gui.add(app.settings, 'binaryStage', ['contour', 'adaptiveThreshold', 'simpleThreshold']);

const thresholdFolder = gui.addFolder('threshold');
thresholdFolder.add(app.settings, 'thresholdType', {
  THRESH_BINARY: cv.THRESH_BINARY,
  THRESH_BINARY_INV: cv.THRESH_BINARY_INV,
  THRESH_TRUNC: cv.THRESH_TRUNC,
  THRESH_TOZERO: cv.THRESH_TOZERO,
  THRESH_TOZERO_INV: cv.THRESH_TOZERO_INV,
  THRESH_MASK: cv.THRESH_MASK,
  THRESH_OTSU: cv.THRESH_OTSU,
  THRESH_TRIANGLE: cv.THRESH_TRIANGLE
});
thresholdFolder.add(app.settings, 'simpleThresholdLevel', 0, 255);

const contourFolder = gui.addFolder('contour');
contourFolder.add(app.settings, 'contourThreshold1').min(0).max(250).step(1);
contourFolder.add(app.settings, 'contourThreshold2').min(0).max(250).step(1);

const contentPartsFolder = gui.addFolder('contentParts');
contentPartsFolder.add(app.settings, 'showSegments');
contentPartsFolder.add(app.settings, 'circlesAlpha', 0, 1).step(0.01);
contentPartsFolder.add(app.settings, 'minAreaIncluded', 0, 1).step(1);
contentPartsFolder.add(app.settings, 'maxAreaIncluded', 0, 1).step(1);

gui.add(app.settings, 'renderStage', renderStages);
gui.add(app.settings, 'imageSource', [
  'WEBCAM',
  'images/IMG_20180227_125726.jpg',
  'images/IMG_20180226_212741.jpg',
  'images/IMG_20180226_212747.jpg',
  'images/IMG_20180226_212805.jpg',
  'images/IMG_20180226_212908.jpg',
  'images/IMG_20180226_212919.jpg',
  'images/IMG_20180226_213005.jpg',
  'images/IMG_20180226_213010.jpg',
  'images/IMG_20180226_213034.jpg',
  'images/IMG_20180226_213053.jpg',
  'images/IMG_20180226_213114.jpg',
  'images/IMG_20180226_213125.jpg',
  'images/IMG_20180227_125631.jpg',
  'images/IMG_20180227_125726.jpg',
  'images/IMG_20180301_191122.jpg',
  'images/IMG_20180301_191148.jpg',
  'images/IMG_20180301_191200.jpg',
  'images/IMG_20180302_104542.jpg',
  'images/IMG_20180302_110406.jpg',
  'images/IMG_20180302_111131.jpg',
  'images/IMG_20180302_114002.jpg',
  'images/09-DD_receipts-2.jpg',
  'images/health_receipt_target.jpg',
  'images/photo35.jpg'
]);