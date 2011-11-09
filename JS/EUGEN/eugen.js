var EUGEN = {};
(function(){
  var e = 8.85418782e-12, sqrt = Math.sqrt,
  square = function(a) {
    return Math.pow(a, 2);
  },
  distance = function(a,b){
    return sqrt(square(a.x - b.x) + square(a.y - b.y) + square(a.z - b.z));
  },
    point = vectorConstructor("x","y","z");

  function getXYZComponents(a, b, c, alpha, beta, gama){
    var cos = Math.cos, sin = Math.sin,
        cy = c * (cos(alpha) - cos(beta) * cos(gama)) / sin (gama);
    return {
        a: point(a,a,a),
        b: point(b * cos(gama), b * sin(gama), 0),
        c: point(c * cos(beta), cy, c * sqrt(square(sin(beta)) - square(cy/c)))
      };
  }

  function fractToOrtCoordinates(a, b, c, alpha, beta, gama){
    var comps = getXYZComponents(a,b,c,alpha,beta,gama),
      x = a + comps.b.x + comps.c.x,
      y = comps.b.y + comps.c.y,
      z = comps.b.z + comps.c.z;

    return point(x,y,z);
  }



  function unitCellContribute(ions, refIndex){
    var e2 = square(e), refIon = ions[refIndex];
    return ions.map(function(ion){
      return ion.value * refIon.value * e2/ distance(ion, refIon);
    });
  }

  function combinatorMap(rangeMin, rangeMax, func){
    var arr = [];
    for(var x = rangeMin; x<rangeMax+1; x++){
      for(var y = rangeMin; y<rangeMax+1; y++){
        for(var z = rangeMin; z<rangeMax+1; z++){
          arr.push(func(x,y,z));
        }
      }
    }
    return arr;
  }

  EUGEN.countEes = function(ions, refIndex, cellParams, expRange){
    var refIon = ions[refIndex],
        x1 = refIon.x, y1 = refIon.y, z1 = refIon.z,
        a = cellParams.a, b = cellParams.b, c = cellParams.c,
        alpha = cellParams.alpha, beta = cellParams.beta, gama = cellParams.gama,
        comps = getXYZComponents(a,b,c,alpha,beta,gama);
    
    return combinatorMap(-expRange, expRange, function(j, k, l){
      return ions.map(function(ion, index){
        var res =  sqrt(square(x1 - ion.x - j * a - k * comps.b.x - l * comps.c.x) +
          square(y1 - ion.y - k * comps.b.y - l * comps.c.y) +
          square(z1 - ion.z - l * comps.c.z));
//        console.log(j, k, l, index, ion, res);
        return res;
        }).sum();
      
      }).sum();
  }
  
}());

