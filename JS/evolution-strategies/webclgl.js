// FILL ARRAYS A AND B
var _length = 512 * 512;
var arrayA = [];
var arrayB = [];
for(var n = 0; n < _length; n++) {
    var randA = Math.random()/2.0;
    var randB = Math.random()/2.0;
    arrayA.push(randA);
    arrayB.push(randB);
}

var gpu = new GPU();
// Create the GPU accelerated function from a kernel
// function that computes a single element in the
// 512 x 512 matrix (2D array). The kernel function
// is run in a parallel manner in the GPU resulting
// in very fast computations! (...sometimes)
var mat_mult = gpu.createKernel(function(A, B) {
    return A[this.thread.x] + B[this.thread.y];
}).dimensions([3, 3]);

// Perform matrix multiplication on 2 matrices of size 512 x 512
var C = mat_mult(, [4,5,6]);
console.log(C);