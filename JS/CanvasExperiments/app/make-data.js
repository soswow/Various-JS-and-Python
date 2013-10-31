onmessage = function (oEvent) {
  var max = oEvent.data;
  var data = new Uint8ClampedArray(max.h * max.w * 4);
  for (var j = 0; j < max.h * max.w * 4; data[j++] = Math.round(Math.random() * 255));
  postMessage(data);
};
