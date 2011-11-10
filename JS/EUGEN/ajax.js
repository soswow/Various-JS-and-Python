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
        input = parseInput(rawInput),
        growSize = parseInt(growSizeObj.value, 10),
        results = EUGEN.countEes(input.ions, input.refIndex, input.cellParams, growSize);

    outputObj.innerHTML = results.map(function(row){
      row[3] = ["<div class='debug'><span>Show Debug</span><br/><table><tr>",

        row[3].map(function(row){
          row[0] = "x: " + row[0].x + "  y: " + row[0].y + "  z: " + row[0].z;
          return ["<td>", row.join("</td><td>"), "</td>"].join("");
        }).join("</tr><tr>"),

        "</tr></table></div>"].join("");

      return row.join("\t");
    }).join("<br/>");
  });

  $(".debug span").live('click', function(){
    $(this).parents(".debug").find("table").toggle();
  });
}

document.addEventListener("DOMContentLoaded", init);