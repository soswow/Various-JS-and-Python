$ = (arg) -> document.querySelector arg

el = $("#canvas")
ctx = el.getContext("2d")
max =
  w: window.innerWidth
  h: 100
console.log max
el.width = max.w
el.height = max.h

window.addEventListener 'resize', ->
  max =
    w: window.innerWidth
    h: 100
  el.width = max.w
  el.height = max.h


$log = document.getElementById("span")
buffer = []
i = undefined
j = undefined
k = 0

#for (i = 0; i < 100; i++) {
#  buffer.push(ctx.createImageData(max.w, max.h));
#  for (j = 0; j < max.h * max.w * 4; buffer[i].data[j++] = Math.round(Math.random() * 155 + i));
#}

#console.time("Create buffer");
#var workers = [];
#var workersNum = 4;
num = 100

#for (i = 0; i < workersNum; i++) {
#  workers.push(new Worker("make-data.js"));
#  workers[i].onmessage = function (oEvent) {
#    console.log('hello');
#    var imageData = ctx.createImageData(max.w, max.h);
#    imageData.data.set(oEvent.data);
#    buffer.push(imageData);
#    if (buffer.length == num) {
#      console.timeEnd("Create buffer");
#    }
#  };
#}

#for (i = 0; i < num; i++) {
#  var data = new Uint8ClampedArray(max.h * max.w * 4);
#  for (j = 0; j < max.h * max.w * 4; data[j++] = Math.round(Math.random() * 255));
#  var imageData = ctx.createImageData(max.w, max.h);
#  imageData.data.set(data);
#  buffer.push(imageData);
#  workers[i % workersNum].postMessage(max);
#}
#console.timeEnd("Create buffer");

#var imageData = canvas.getContext('2d').createImageData(width, height);
#imageData.data.set(myData);

#var imageData = ctx.createImageData(max.w, max.h);
stop = false
drawNewImage = ->
  #  var data = new Uint8ClampedArray(max.h * max.w * 4);
  lines = 2
  iData = ctx.getImageData(0,lines,max.w, max.h-1)
  imageData = ctx.createImageData(max.w, max.h)
  j = 0
  while j < (max.h-lines) * max.w * 4
    imageData.data[j++] = iData.data[j]
    imageData.data[j++] = iData.data[j]
    imageData.data[j++] = iData.data[j]
    imageData.data[j] = 1

  while j < max.h * max.w * 4
    imageData.data[j++] = Math.round(Math.random() * 255)
  ctx.putImageData imageData, 0, 0, 0, 0, max.w, max.h

step = ->
  console.timeStamp "Step Start"

  drawNewImage()

  console.timeStamp "Before next frame"
  requestAnimationFrame step  unless stop
  console.timeStamp "Step End"


#step();
$("#start").addEventListener "click", ->
  stop = false
  step()

$("#stop").addEventListener "click", ->
  stop = true
