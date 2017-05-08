window.requestAnimFrame = (function() {
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60); //60 fps simulation
    };
})();

$(function() {

  function animLoop(render) {
    var running, lastFrame = +new Date;

    function loop(now) {
      // stop the loop if render returned false
      if (running !== false) {
        window.requestAnimFrame(loop);
        running = render(now - lastFrame);
        lastFrame = now;
      }
    }

    loop(lastFrame);
  }

  var log = function(msg) {
//    console.log(msg);
  };

  function animVal(obj, goalVal, options) {
    log("animVal()");
    options = options || {
      easingFunc:null,
      duration:null,
      formatOutputValueFunc:null,
      formatInputValueFunc:null,
      writeValueFunc:null,
      readValueFunc:null,
      incrementFunc:null};

    var easingFunc = (options.easingFunc && $.easing[options.easingFunc]) ||
      $.easing["easeOutCirc"] ||
      $.easing.linear,
      duration = options.duration || 1000,
      formatOutputValueFunc = options.formatOutputValueFunc || function(val) {
        return val;
      },
      formatInputValueFunc = options.formatInputValueFunc || function(val) {
        return parseFloat(val);
      },
      incrementFunc = options.incrementFunc || function(a, b) {
        return a + b;
      },
      objIsInput = obj.is(":input"),
      writeValueFunc = options.writeValueFunc || (function() {
        if (objIsInput) {
          return function(obj, val) {
            obj.val(val);
          }
        } else {
          return function(obj, val) {
            obj.html(val);
          }
        }
      })(),
      readValueFunc = options.readValueFunc || (function() {
        if (objIsInput) {
          return function(obj) {
            return obj.val();
          }
        } else {
          return function(obj) {
            return obj.html();
          }
        }
      })(),
      startValue = formatInputValueFunc(readValueFunc(obj)),
      startTime = +Date.now();

    if (obj.data("animValStatus") == "running") {
      log("Something already is running. Trying to stop.");
      obj.data("animValStatus", "stop!");
      animLoop(function() {
        log("Waiting for stop.");
        if (obj.data("animValStatus") == "stopped") {
          log("Oh! Now it stopped. Starting again.");
          startMainLoop();
          return false;
        }
      });
    } else {
      log("Cool. Start right away!");
      startMainLoop();
    }

    function startMainLoop() {
      log("Starting main loop. Goal: " + goalVal);
      obj.data("animValStatus", "running");
      animLoop(function() {
        var now = (new Date()).getTime(),
          totalTLeft = now - startTime,
          state = totalTLeft / duration,
          pos = easingFunc(state, totalTLeft, 0, 1, duration),
          newValue = incrementFunc(startValue, (goalVal - startValue) * pos),
          objectStatus = obj.data("animValStatus") || "stopped",
          toStop = false;

        writeValueFunc(obj, formatOutputValueFunc(newValue));
        toStop = objectStatus == "stop!";
        if (toStop) {
          log("OOps. Somebody tries to stop us.");
        }
        if (totalTLeft >= duration) {
          writeValueFunc(obj, formatOutputValueFunc(goalVal));
          toStop = true;
        }
        if (toStop) {
          log("Ok. Now we stopping");
          obj.data("animValStatus", "stopped");
          return false;
        }
      });
    }
  }


  var obj = $(".animateData");
  obj.val($.format.number(parseFloat(obj.val()), "+#,##0.00"));
  var direction = "plus";

  $("#doIt").click(function() {
    if (direction == 'plus') {
      var dest = 140000;
      direction = 'minus';
    } else {
      direction = 'plus';
      var dest = 120000;
    }

    animVal(obj, dest, {
      duration:2000,
      readValueFunc: function(obj) {
        return obj.val().replace(",", "");
      },
      formatOutputValueFunc: function(val) {
        return $.format.number(val, "+#,##0.00");
      }
    });
  });

  $("#test").click(function() {
    $("#root").animate({height:"+=100"}, {duration:'slow', easing:'linear'});
  });
});