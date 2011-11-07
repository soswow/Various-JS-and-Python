
Array.prototype.sum = function() {
  if(Array.isArray(this[0])){
    var sumMatrix = null;
    this.forEach(function(col){

      if(sumMatrix){
        sumMatrix = sumMatrix.plus(col);
      }else{
        sumMatrix = col;
      }
    });
    return sumMatrix;
  }else{
    var sum = 0;
    this.forEach(function(k) {
      sum += k;
    });
    return sum;
  }
};

Array.prototype.product = function(arr) {
  var prod = 0;
  this.forEach(function(k, i) {
    prod += k * arr[i];
  });
  return prod;
};

function square(x) {
  return x * x
}

function findW1(Xs, Ys) {
  var M = Xs.length;
  return (M * Xs.product(Ys) - Xs.sum() * Ys.sum()) /
      (M * Xs.map(square).sum() - square(Xs.sum()));
}

function findW0(Xs, Ys) {
  var M = Xs.length;
  return 1 / M * Ys.sum() - findW1(Xs, Ys) / M * Xs.sum();
}

function findF(Xs, Ys) {
  var w0 = findW0(Xs, Ys), w1 = findW1(Xs, Ys);
  return function(x) {
    return w0 + w1 * x;
  }
}

//Usage:
//a = findF([2,4,6,8], [2,5,5,8]);
//a(2); //-> 2.3
//a(4); //-> 4.1
//a(6); //-> 5.9
//a(8); //-> 7.7


function gauss_mean(Xs) {
  var M = Xs.length;
  return 1 / M * Xs.sum();
}
function gauss_sigma_r(Xs) {
  var M = Xs.length, mean = gauss_mean(Xs);
  return 1 / M * Xs.map(
      function(x) {
        return square(x - mean);
      }).sum();
}

//Usage
//var Xs = [3,4,5,6,7];
//gauss_mean(Xs); //-> 5
//gauss_sigma_r(Xs); //-> 2

Array.prototype.map2d = function(f){
  return this.map(function(row,i){
    return row.map(function(el,j){
      return f(el, i, j);
    });
  });
};

Array.prototype.some_operation = function(obj, func){
  if(Array.isArray(obj)){
    if(this.dim().equals(obj.dim())){
      if(this.dim().rows > 0){
        return this.map2d(function(el, i, j){
          return func(el, obj[i][j]);
        });
      }else{
        return this.map(function(el, i){
          return func(el, obj[i]);
        });
      }
    }else{
      throw "Both array dimensions should be equal."
    }
  }else{
    if(this.dim().rows > 0){
      return this.map2d(function(el){
        return func(el, obj);
      });
    }else{
      return this.map(function(el){
        return func(el, obj);
      });
    }
  }
};
Array.prototype.minus = function(obj){
  return this.some_operation(obj, function(a,b){
    return a-b;
  });
};
Array.prototype.plus = function(obj){
  return this.some_operation(obj, function(a,b){
    return a+b;
  });
};
Array.prototype.divide = function(obj){
  return this.some_operation(obj, function(a,b){
    return a / b;
  });
};

Array.prototype.column = function(i){
  return this.map(function(row){
    return row[i];
  });
};

Array.prototype.multiply = function(obj){
  if(Array.isArray(obj)){
    return this.map(function(row){
      return obj.transpose().map(function(column){
        return row.product(column);
      });
    });
  }
};

Array.prototype.dim = function(){
  var obj = {
    equals: function(input){
      return this.rows === input.rows && this.cols === input.cols;
    }
  };
  if(Array.isArray(this[0])){
    obj.rows = this.length;
    obj.cols = this[0].length;
  }else{
    obj.rows = 0;
    obj.cols = this.length;
  }
  return obj;
};

Array.prototype.transpose = function(){
  var result = [], arr = this;
  if(this.dim().rows == 0){
    arr = [arr];
  }
  arr.forEach(function(row, i){
    row.forEach(function(el, j){
      if(!result[j]){
        result[j] = [];
      }
      result[j][i] = el;
    });
  });
  return result;
};

function gauss_mean_2d(X){
  return X.transpose().map(function(row){
    return gauss_mean(row);
  });
}

function gauss_sigma_2d(X) {
  var M = X.length,
      mean = gauss_mean_2d(X);
  return X.map(function(row){
    var minMean = row.minus(mean);
    return minMean.transpose().multiply(minMean);
  }).sum().divide(M);
}