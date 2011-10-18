$(function(){
  function setOptions() {
    BRAVAIS.options.n_max = parseInt($("[name=nmax]").val(), 10);
    BRAVAIS.options.displaceVector = BRAVAIS.doDisplaceVector(
        parseFloat($("[name=ax]").val(), 10),
        parseFloat($("[name=ay]").val(), 10),
        parseFloat($("[name=az]").val(), 10)
    );
    BRAVAIS.options.angelsVector = BRAVAIS.doAnglesVector(
        parseFloat($("[name=alpha]").val(), 10),
        parseFloat($("[name=beta]").val(), 10),
        parseFloat($("[name=gamma]").val(), 10)
    );
  }
  
  var button = $("#translate");
  button.click(function(){
    setOptions();
    var result = BRAVAIS.generateParticles($("#from").val());
    $("#to").val(result.map(function(p){
      return [p.value, p.point.x, p.point.y, p.point.z].join(" ")+"\n";
    }));
  });
});