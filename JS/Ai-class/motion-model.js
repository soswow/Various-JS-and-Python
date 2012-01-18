function motionPredict(input){
  var x = input.initX || 0,
    y=input.initY || 0,
    tetha=input.tetha || 0,
    v = input.v,
    dt = input.dt,
    omega = input.omega,
    T = input.T;

  for (var i=0; i<T/dt; i++){
    x = x + v * dt * Math.cos(tetha);
    y = y + v * dt * Math.sin(tetha);
    tetha = tetha + omega * dt;
    console.log(x, y, tetha*180/Math.PI);
  }

  return {x:x, y:y, tetha:tetha, tetha_degr:tetha*180/Math.PI};
}