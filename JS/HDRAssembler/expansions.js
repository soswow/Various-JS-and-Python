(function() {

  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(thing) {
      return this.indexOf(thing) === 0;
    };
  }

  if (!"SOME_DO".startsWith("SOME")) throw "error in startsWith";

  if ("SOME_DO".startsWith("DO")) throw "error in startsWith";

  if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(thing) {
      return this.indexOf(thing) === (this.length - thing.length);
    };
  }

  if (!"SOME_DO".endsWith("DO")) throw "error in endsWith";

  if ("SOME_DO".endsWith("SOME")) throw "error in endsWith";

  if (!String.prototype.lines) {
    Object.defineProperty(String.prototype, 'lines', {
      get: function() {
        return this.split(/\n/);
      }
    });
  }

  if ("Something\nis\nhere".lines.length !== 3) throw "error in endsWith";

}).call(this);
