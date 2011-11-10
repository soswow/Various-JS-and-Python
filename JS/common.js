function Vector(varNames, values){
  var that = this;
  varNames.slice(0, values.length).forEach(function(varName, i){
    that[varName] = values[i];
  });

  Object.defineProperty(this, 'object', {
    get: function(){
      var map = {};
      for(var key in this){
        var val = this[key];
        map[key] = val.object || val;
      }
      return map;
    }
  });
  Object.defineProperty(this, 'keys', { value: varNames });
  Object.defineProperty(this, 'values', { value: values });
}

function vectorConstructor(){
  var varNames = Array.prototype.slice.call(arguments);
  return function(){
    var values = Array.prototype.slice.call(arguments);
    if(Array.isArray(values[0])){
      values = values[0];
    }
    return new Vector(varNames, values);
  }
}

Array.prototype.sum = function() {
  var sum = 0;
  this.forEach(function(k) {
    sum += k;
  });
  return sum;
};