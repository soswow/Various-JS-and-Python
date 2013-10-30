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
var buffer = [], i;
var imageData = ctx.createImageData(max.w, max.h);
var stop = false;
step = function () {
  requestAnimationFrame(function () {
//    var imageData = ctx.createImageData(max.w, max.h);
    for (i = 0; i < max.h * max.w * 4; imageData.data[i++] = Math.round(Math.random() * 255)) {}
    ctx.putImageData(imageData, 0, 0, 0, 0, max.w, max.h);
    imageData.length = 0;
    if (!stop) {
      setTimeout(step, 5);
    }
//    buffer.push(imageData);
//    j+=1;
//    if(j==100){
//      buffer = [];
//      j = 0;
//    }
  });
};
//step();

$("#start").addEventListener('click', function(){
  stop = false;
  step();
});
$("#stop").addEventListener('click', function(){
  stop = true;
});
