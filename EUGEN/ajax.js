function byId(id){
  return document.getElementById(id);
}

function init(){
  var inputObj = byId("input"),
      outputObj = byId("output"),
      growSizeObj = byId("growSize"),
      button = byId("calculate");

  function parseInput(rawText){
    var rows = rawText.split(/\n/).map(function(line){
      return line.split(/,\s*/).map(parseFloat);
    }),
        toRad = function(deg){ return deg * Math.PI / 180;},
        firstTwoRows = rows.shift().concat(rows.shift().map(toRad)),
        cellParams = vectorConstructor("a","b","c", "alpha","beta","gama")(firstTwoRows),
        tolerance = rows.shift(),
        ions = rows.map(vectorConstructor("x","y","z","value"));
    
    ions = ions.map(function(ion){
      ion.x *= cellParams.a;
      ion.y *= cellParams.b;
      ion.z *= cellParams.c;
      return ion;
    });
    
    return {
      ions: ions,
      refIndex: 0,
      cellParams: cellParams,
      tolerance:tolerance
    };
  }

  button.addEventListener("click", function(){
    var rawInput = inputObj.value,
        input = parseInput(rawInput);

    outputObj.innerHTML = EUGEN.countEes(input.ions, input.refIndex, input.cellParams, growSizeObj.value);
  });
}

document.addEventListener("DOMContentLoaded", init);