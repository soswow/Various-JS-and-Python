$(function(){
  test("doPoint", function(){
    deepEqual(BRAVAIS.doPoint([1,2,3]), {x:1, y:2, z:3});
    deepEqual(BRAVAIS.doPoint(1,2,3), {x:1, y:2, z:3});
  });

  test("parseData", function(){
    var rawData = "-1 0.5 0.1 0.2\n1 0.6 0.2 0.3\r1 0.7 0.3 0.4\n\r-1 0.8 0.4 0.5";
    deepEqual(BRAVAIS.parseData(rawData), [
      {point:{x:0.5,y:0.1,z:0.2}, value:-1},
      {point:{x:0.6,y:0.2,z:0.3}, value:1},
      {point:{x:0.7,y:0.3,z:0.4}, value:1},
      {point:{x:0.8,y:0.4,z:0.5}, value:-1}
    ]);
  });

});