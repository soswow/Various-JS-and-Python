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
        toRad = function(deg){ return deg * Math.PI / 180;},
        alpha = toRad(angles.alpha), beta = toRad(angles.beta), gamma = toRad(angles.gamma),
        cos = Math.cos, sin = Math.sin, sqrt = Math.sqrt,
        cy = c * (cos(alpha) - cos(beta) * cos(gamma)) / sin (gamma);
    return {
      a: utils.point(a,0,0),
      b: utils.point(
        b * cos(gamma),
        b * sin(gamma),
        0
      ),
      c: utils.point(
        c * cos(beta),
        cy,
        c * sqrt(sin(beta) - utils.square(cy/c))
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
    flatCrystal: function(crystal){
      var result = [];
      crystal.forEach(function(lattice){
        lattice.lattice.forEach(function(ion){
          result.push(ion);
        });
      });
      return result;
    },

    parseInput: function (rawText, configRows){
      configRows = configRows || [
        ['sides', ["a","b","c"]],
        ['angles', ["alpha","beta","gamma"]]
      ];
      var rows = rawText.split(/\n/).map(function(line){
        return line.split(/,\s*/).map(parseFloat);
      }), result = {};

      configRows.forEach(function(configRow, i){
        result[configRow[0]] = vectorConstructor.apply(null, configRow[1])(rows[i])
      });
      var ionVector = vectorConstructor("x","y","z","value");
      result.ions = rows.slice(Object.keys(configRows).length).map(ionVector);
      return result;
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

    calcYAKUB: function(ions, refIonIndex, L, alpha, rm){
      rm *= L;
      var pow = Math.pow,
        sum = function (arr){
          var acum = 0;
          arr.forEach(function(el){acum+=el;});
          return acum;
        },
        leftSumFunc = function(ion){
          return (3 * pow(ion.value,2)) / (4 * rm);
        },
        rightPermFunc = function(ion, index){
          if(index == refIonIndex){
            return 0;
          }else{
            var dist = utils.distance(ion, refIon);
            if(dist < rm){
              var distByRm = dist / rm,
                left = (ion.value * refIon.value) / dist,
                right = 1 + distByRm * (pow(distByRm,2) - 3) / 2;
              
              return left * right;
            } else {
              return 0;
            }
          }
        };

      var refIon = ions[refIonIndex];
//      var leftPart = -1 * sum(ions.map(leftSumFunc));
      var leftPart = -1 * leftSumFunc(refIon);
      var rightPart = sum(ions.map(rightPermFunc));

      console.log(leftPart, rightPart); 
      
      return 1389.355 * 2 * (leftPart + rightPart / 2);
    },

    calcFUKUDA: function(){
      var rootOfPI = Math.sqrt(CONST.PI),
        pow = Math.pow,
        erfc = function(x){
          if (-1.5 < x && x < 1.5){
            return (rootOfPI - 2 * x + (2 / 3 * pow(x, 3)) - (pow(x,5) / 5) +
              (pow(x, 7) / 21) - (pow(x, 9) / 108) + (pow(x,11) / 660)) / rootOfPI;
          } else if (x <= -1.5){
            return -2;
          }else{
            return 0;
          }
        },
        V = function (r){
          return erfc(alpha * r) / r;
        },
        F = function (r){
          return (erfc(r * alpha) / pow(r,2)) +
            (2 * alpha) / rootOfPI * Math.exp(-pow(alpha,2) * pow(r,2)) / r;
        },
        Vrm = V(rm),
        Frm = F(rm);

    },
    
    forTests:{
      getXYZComponents:getXYZComponents,
      pointFromToIntCompinatorMap:pointFromToIntCombinatorMap
    }
  };
})();