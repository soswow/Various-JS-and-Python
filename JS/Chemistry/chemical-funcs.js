var chemicalFuncs = (function(){
  var CONST = {
    e0: 8.854187817e-12 * 10e10,
    e: 1.602176565e-19,
    Na: 6.0221415e23,
    convertFactor: 10e17,
    PI: Math.PI
  },
  utils = (function(){
    var that;
    return that = {
      roundToZero: function (num){
        return that.roundTo(num, 10e10);
      },
      roundTo: function (num, to){
        return Math.round(num * to) / to;
      },
      square: function(a) {
        return Math.pow(a, 2);
      },
      point: vectorConstructor("x","y","z","value"),
      lattice: vectorConstructor("x", "y", "z", "lattice"),
      distance: function(a, b){
        return Math.sqrt(
          this.square(a.x - b.x) +
          this.square(a.y - b.y) +
          this.square(a.z - b.z)
        );
      }
    }
  })();

  /**
   * //TODO
   * 
   * @param sides
   * @param angles
   */
  var getXYZComponents = function(sides, angles){
    var a = sides.a, b = sides.b, c = sides.c,
        alpha = angles.alpha, beta = angles.beta, gamma = angles.gamma,
        cos = Math.cos, sin = Math.sin, sqrt = Math.sqrt,
        rtz = utils.roundToZero,
        cy = rtz(c * (cos(alpha) - cos(beta) * cos(gamma)) / sin (gamma) );
    return {
      a: utils.point(a,0,0),
      b: utils.point(
        rtz(b * cos(gamma)),
        rtz(b * sin(gamma)),
        0
      ),
      c: utils.point(
        rtz(c * cos(beta)),
        cy,
        rtz(c * sqrt(rtz(sin(beta)) - utils.square(cy/c)))
      )
    };
  };
  
  /**
   * //TODO
   * 
   * @param rangeMin
   * @param rangeMax
   * @param func
   */
  var pointFromToIntCombinatorMap = function(rangeVal, func){
    var arr = [];
    var range = [0];
    for(var i=1; i <= rangeVal; i++){
      range.push(i);
      range.push(-i);
    }
    range.forEach(function(x){
      range.forEach(function(y){
        range.forEach(function(z){
          arr.push(func(x, y, z));
        });
      });
    });
    return arr;
  };

  return {
    /**
     * Input: a,b,c, angles,unit cell, expand range
     *
     * @param unitCell Defines side sizes, angles and list of ions
     * @param expandRate
     * @returns expanded ions set made out of unit cell expanded in all direction
     */
    buildCrystal: function(unitCell, expandRate){
      var sides = unitCell.sides,
          angles = unitCell.angles,
          ions = unitCell.ions;

      var shiftComps = getXYZComponents(sides, angles);
      return pointFromToIntCombinatorMap(expandRate, function(latX, latY, latZ){
        return utils.lattice(latX, latY, latZ, ions.map(function(ion){
          return utils.point(
            utils.roundToZero(ion.x + latX * shiftComps.a.x + latY * shiftComps.b.x + latZ * shiftComps.c.x),
            utils.roundToZero(ion.y + latY * shiftComps.b.y + latZ * shiftComps.c.y),
            utils.roundToZero(ion.z + latZ * shiftComps.c.z),
            ion.value);
        }));
      });
    },

    /**
     * Find closest ions to the plane from one side.
     *
     * @param ions list of ions
     * @param twoPointsVector Directed "Vector" defined with two points:
     *  - first defines where the plane is go through
     *  - second define line, perpendicular to the plane. also it define side
     *    of the place where points should be taken.
     * @returns list of found ions, defined with it's index in input ions list.
     */
    getClosestIonsToPlane: function(ions, twoPointsVector){
      
    },

    /**
     * Calculates ??? constant using ??? (EUGEN)
     *
     * @param ions  list of points
     * @param refIonIndex reference ion (by Index)
     * @returns valid constant value
     */
    calcEUGEN: function(ions, refIonIndex){

    },

    calcYAKUB: function(){

    },

    calcFUKUDA: function(){
    },
    
    forTests:{
      getXYZComponents:getXYZComponents,
      pointFromToIntCompinatorMap:pointFromToIntCombinatorMap
    }
  };
})();