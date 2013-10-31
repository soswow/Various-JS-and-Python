var $ = function(arg){ return document.querySelector(arg); };
var el = $("#canvas");
var ctx = el.getContext("2d");

var max = {
  w: el.width,
  h: el.height
};

var cellSize = 4;

//drawCell = function(x,y){
//  ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
//};

//var clearCell = function(x,y){
//  ctx.clearRect(x*cellSize, y*cellSize, cellSize, cellSize);
//};

//clear = function(){
//    el.width = max.w
//};

var $log = document.getElementById("span");
var buffer = [], i, j, k=0;

//for (i = 0; i < 100; i++) {
//  buffer.push(ctx.createImageData(max.w, max.h));
//  for (j = 0; j < max.h * max.w * 4; buffer[i].data[j++] = Math.round(Math.random() * 155 + i));
//}

//console.time("Create buffer");
//var workers = [];
//var workersNum = 4;
var num = 100;
//for (i = 0; i < workersNum; i++) {
//  workers.push(new Worker("make-data.js"));
//  workers[i].onmessage = function (oEvent) {
//    console.log('hello');
//    var imageData = ctx.createImageData(max.w, max.h);
//    imageData.data.set(oEvent.data);
//    buffer.push(imageData);
//    if (buffer.length == num) {
//      console.timeEnd("Create buffer");
//    }
//  };
//}

//for (i = 0; i < num; i++) {
//  var data = new Uint8ClampedArray(max.h * max.w * 4);
//  for (j = 0; j < max.h * max.w * 4; data[j++] = Math.round(Math.random() * 255));
//  var imageData = ctx.createImageData(max.w, max.h);
//  imageData.data.set(data);
//  buffer.push(imageData);
//  workers[i % workersNum].postMessage(max);
//}
//console.timeEnd("Create buffer");


//var imageData = canvas.getContext('2d').createImageData(width, height);
//imageData.data.set(myData);

//var imageData = ctx.createImageData(max.w, max.h);
var stop = false;
var drawNewImage = function(){
//  var data = new Uint8ClampedArray(max.h * max.w * 4);
  var imageData = ctx.createImageData(max.w, max.h);
  for (j = 0; j < max.h * max.w * 4; imageData.data[j++] = Math.round(Math.random() * 255));
  ctx.putImageData(imageData, 0, 0, 0, 0, max.w, max.h);
};

step = function () {
  console.timeStamp("Step Start");
//    var imageData = ctx.createImageData(max.w, max.h);
//    for (i = 0; i < max.h * max.w * 4; imageData.data[i++] = Math.round(Math.random() * 255)) {}
//  if(k>=buffer.length) k=0;
  drawNewImage();
//  $log.innerText = k;
  console.timeStamp("Before next frame");
  if (!stop) {
    requestAnimationFrame(step);
  }
  console.timeStamp("Step End");
};
//step();

$("#start").addEventListener('click', function(){
  stop = false;
  step();
});
$("#stop").addEventListener('click', function(){
  stop = true;
});
