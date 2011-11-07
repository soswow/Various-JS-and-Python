function doit(){
  var inputObj = document.getElementById('input');
  var input = inputObj.value;
  var outputObj = document.getElementById('output');

  function parseData(input) {
    return input.trim().split("\n").map(function(line){
      return line.replace(/"|-ga/g,"").trim().split("rääkis").map(function(item){
        return item.trim();
      });
    });
  }

  function getPeople(data){
    var people = [];
    data.forEach(function(pair){
      pair.forEach(function(man){
        if(people.indexOf(man) == -1){
          people.push(man);
        }
      });
    });
    return people;
  }

  function getData(input) {
    var pairs = parseData(input);
    var people = getPeople(pairs);
    var str = "*Vertices "+people.length;

    people.forEach(function(man, i){
      str += "<br/>" + (i+1) +" " + man;
    });
    str += "<br/>*Edges " + people.length;
    pairs.forEach(function(pair){
      str += "<br/>" + (people.indexOf(pair[0])+1) +" " + (people.indexOf(pair[1])+1);
    });
    return str;
  }

  outputObj.innerHTML = getData(input);
}