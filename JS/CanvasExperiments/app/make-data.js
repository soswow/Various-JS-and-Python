onmessage = function (oEvent) {
//  postMessage("Hi " + oEvent.data);
//  var ctx = oEvent.data;
//  var imageData = ctx.createImageData(max.w, max.h);
  var max = oEvent.data;
  var data = new Uint8ClampedArray();
  for (var j = 0; j < max.h * max.w * 4; data[j++] = Math.round(Math.random() * 155));
  postMessage(data);
};
