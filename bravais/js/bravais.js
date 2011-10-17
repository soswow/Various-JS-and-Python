"use strict";
if(!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) == '[object Array]';
  };
}

var BRAVAIS = {};
(function(){
  function overload() {
    var methods = Array.prototype.slice.call(arguments),
      distrFirstArray = typeof methods[methods.length - 1] == "boolean"?methods.pop():false;

    return function(){
      var args = arguments;
      if(distrFirstArray && args.length == 1){
        if(Array.isArray(args[0])){
          args = args[0];
        } else {
          throw "In one-argument case it should be an Array";
        }
      }

      for(var i in methods){
        if(methods[i].length == args.length){
          return methods[i].apply(null, args);
        }
      }
      throw "Unsupported number of arguments";
    }
  }

  var point = overload(
      function(x, y) {
        return {x:x, y:y};
      },
      function (x, y, z) {
        return {x:x, y:y, z:z};
      },
      true
  );

  BRAVAIS = {
    options:{
      nMax:1,
      vectors: null, //point
      angels:null
    },
    doPoint: point,
    createParticle: function(point, value){
      return {point:point, value:value};
    },
    parseData: function(rawData){
      return rawData.split(/[\r|\n]+/).map(function(rawLine){
        var lineData = rawLine.split(/\s+/).map(parseFloat);
        var value = lineData.shift();
        return BRAVAIS.createParticle(point(lineData), value);
      });
    }
  };
}());