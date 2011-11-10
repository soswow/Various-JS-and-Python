$(function(){
  test("doVectors", function(){
    deepEqual(BRAVAIS.doPointVector([1,2,3]).object, {x:1, y:2, z:3});
    deepEqual(BRAVAIS.doPointVector(1,2,3).object, {x:1, y:2, z:3});
    deepEqual(BRAVAIS.doPointVector(1,2).object, {x:1, y:2});
    deepEqual(BRAVAIS.doDisplaceVector(1,2,3).object, {ax:1, ay:2, az:3});
    deepEqual(BRAVAIS.doAnglesVector(10,20,30).object, {a:10, b:20, c:30});
  });

  test("parseData", function(){
    var rawData = "-1 0.5 0.1 0.2\n1 0.6 0.2 0.3\r1 0.7 0.3 0.4\n\r-1 0.8 0.4 0.5";
    deepEqual(BRAVAIS.parseData(rawData).map(function(vec){return vec.object;}), [
      {point:{x:0.5,y:0.1,z:0.2}, value:-1},
      {point:{x:0.6,y:0.2,z:0.3}, value:1},
      {point:{x:0.7,y:0.3,z:0.4}, value:1},
      {point:{x:0.8,y:0.4,z:0.5}, value:-1}
    ]);
  });


  test("generator", function(){
    function f(init, displace, testResult, nMax){
      var origParseData = BRAVAIS.parseData;
      BRAVAIS.parseData = function(){
        return init;
      };
      BRAVAIS.options.n_max = nMax;
      BRAVAIS.options.displaceVector = BRAVAIS.doDisplaceVector(displace);
      var result = BRAVAIS.generateParticles();
      deepEqual(result, testResult);
      BRAVAIS.parseData = origParseData;
    }

    f([{value:1,point:{x:0,y:0,z:0}}],
      [1,1,1],
      [
        BRAVAIS.doParticle(BRAVAIS.doPointVector(0,0,0), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(0,0,1), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(0,1,0), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(0,1,1), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(1,0,0), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(1,0,1), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(1,1,0), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(1,1,1), 1)
      ], 1);

    f([{value:1,point:{x:0.5,y:0.5,z:0.5}}],
      [1,1,1],
      [
        BRAVAIS.doParticle(BRAVAIS.doPointVector(0.5,0.5,0.5), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(0.5,0.5,1.5), 1 ),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(0.5,1.5,0.5), 1 ),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(0.5,1.5,1.5),1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(1.5,0.5,0.5),1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(1.5,0.5,1.5),1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(1.5,1.5,0.5),1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(1.5,1.5,1.5),1)
      ], 1);

    f([{value:1,point:{x:0,y:0,z:0}}],
      [1,1,1],
      [
        BRAVAIS.doParticle(BRAVAIS.doPointVector(0,0,0), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(0,0,1), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(0,0,2), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(0,1,0), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(0,1,1), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(0,1,2), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(0,2,0), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(0,2,1), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(0,2,2), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(1,0,0), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(1,0,1), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(1,0,2), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(1,1,0), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(1,1,1), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(1,1,2), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(1,2,0), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(1,2,1), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(1,2,2), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(2,0,0), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(2,0,1), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(2,0,2), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(2,1,0), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(2,1,1), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(2,1,2), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(2,2,0), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(2,2,1), 1),
        BRAVAIS.doParticle(BRAVAIS.doPointVector(2,2,2), 1)
      ], 2);
  });

});