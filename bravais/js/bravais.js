"use strict";

var BRAVAIS = {};
(function(){

  var that;
  BRAVAIS = that = {
    options:{
      n_max:1,
      displaceVector: null,
      angelsVector: null
    },
    doDisplaceVector: vectorConstructor('ax', 'ay', 'az'), //('a¹','a²','a³')
    doPointVector: vectorConstructor('x', 'y', 'z'),
    doAnglesVector: vectorConstructor('a', 'b', 'c'), //('ɑ','β','ɣ')
    doParticle: vectorConstructor('point', 'value'),
    generateParticles: function(rawData){
      var n_max = that.options.n_max,
          result = [];
      that.parseData(rawData).forEach(function(particle){
        var origPoint = particle.point, point,
            displaceVector = that.options.displaceVector;
        for(var xn = 0; xn < n_max+1; xn++){
          for(var yn = 0; yn < n_max+1; yn++){
            for(var zn = 0; zn < n_max+1; zn++){
              point = that.doPointVector( origPoint.x + xn * displaceVector.ax,
                                          origPoint.y + yn * displaceVector.ay,
                                          origPoint.z + zn * displaceVector.az);
              result.push(that.doParticle(point, particle.value));
            }
          }
        }
      });
      return result;
    },
    parseData: function(rawData){
      return rawData.split(/[\r|\n]+/).map(function(rawLine){
        var lineData = rawLine.split(/\s+/).map(parseFloat);
        var value = lineData.shift();
        return that.doParticle(that.doPointVector(lineData), value);
      });
    }
  };
}());