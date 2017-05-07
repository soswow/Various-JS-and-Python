var layer_defs = [];

// Input is 84x84x4 (width, height, depth)
layer_defs.push({ type: 'input', out_sx: 84, out_sy: 84, out_depth: 4 });
// Conv 16 8x8 kernels, stride 4
layer_defs.push({ type: 'conv', sx: 8, filters: 16, stride: 4, activation: 'relu' });
// rectifier nonlinearity

// Conv 32 4x4  kernels, stride 2
layer_defs.push({ type: 'conv', sx: 4, filters: 32, stride: 2, activation: 'relu' });

// FC with 256 rectifier unit
layer_defs.push({ type: 'fc', num_neurons: 256, activation: 'relu' });

// FC liners with N number of outputs. for N actions
layer_defs.push({ type: 'softmax', num_classes: 2 });

// create a net out of it
var net1 = new convnetjs.Net();
net1.makeLayers(layer_defs);