function Ziggurat(seed) {
  seed = arguments.length
    ? seed
    : new Date().getTime();

  let jsr = 123456789;

  const wn = new Array(128);
  const fn = new Array(128);
  const kn = new Array(128);

  const RNOR = () => {
    const hz = SHR3();
    const iz = hz & 127;
    return (Math.abs(hz) < kn[iz]) ? hz * wn[iz] : nfix(hz, iz);
  };

  this.nextGaussian = function(){
    return RNOR();
  };

  const nfix = (hz, iz) => {
    const r = 3.442619855899;
    const r1 = 1.0 / r;
    let x;
    let y;
    while(true){
      x = hz * wn[iz];
      if( iz === 0 ){
        x = (-Math.log(UNI()) * r1);
        y = -Math.log(UNI());
        while( y + y < x * x){
          x = (-Math.log(UNI()) * r1);
          y = -Math.log(UNI());
        }
        return ( hz > 0 ) ? r+x : -r-x;
      }

      if( fn[iz] + UNI() * (fn[iz-1] - fn[iz]) < Math.exp(-0.5 * x * x) ){
        return x;
      }
      hz = SHR3();
      iz = hz & 127;

      if( Math.abs(hz) < kn[iz]){
        return (hz * wn[iz]);
      }
    }
  };

  const SHR3 = () => {
    let jz = jsr;
    let jzr = jsr;
    jzr ^= (jzr << 13);
    jzr ^= (jzr >>> 17);
    jzr ^= (jzr << 5);
    jsr = jzr;
    return (jz+jzr) | 0;
  };

  const UNI = () => 0.5 * (1 + SHR3() / -Math.pow(2,31));

  function zigset(seed) {
    // seed generator based on current time
    jsr ^= seed;

    const m1 = 2147483648.0;
    let dn = 3.442619855899;
    let tn = dn;
    const vn = 9.91256303526217e-3;

    const q = vn / Math.exp(-0.5 * dn * dn);
    kn[0] = Math.floor((dn/q)*m1);
    kn[1] = 0;

    wn[0] = q / m1;
    wn[127] = dn / m1;

    fn[0] = 1.0;
    fn[127] = Math.exp(-0.5 * dn * dn);

    for(let i = 126; i >= 1; i--){
      dn = Math.sqrt(-2.0 * Math.log( vn / dn + Math.exp( -0.5 * dn * dn)));
      kn[i+1] = Math.floor((dn/tn)*m1);
      tn = dn;
      fn[i] = Math.exp(-0.5 * dn * dn);
      wn[i] = dn / m1;
    }
  }

  zigset(seed);
}