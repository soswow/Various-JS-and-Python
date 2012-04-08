var async, backUpPicture, folder, fs, path, readShFile, spawn, unless_error, util;

spawn = require('child_process').spawn;

fs = require('fs.extra');

path = require('path');

async = require('async');

util = require('util');

if (process.argv.length < 3) throw "Folder should be specified!";

folder = process.argv[2];

fs.readdir(folder, function(err, files) {
  return unless_error(err, function() {
    var file, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = files.length; _i < _len; _i++) {
      file = files[_i];
      if (file.indexOf('.SH') !== -1) {
        _results.push(fs.readFile(path.join(folder, file), 'utf8', readShFile));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  });
});

readShFile = function(err, data) {
  return unless_error(err, function() {
    var backUpFuncs, line, token, _i, _len, _ref, _results;
    _ref = data.split(/\n/i);
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      line = _ref[_i];
      if (line.startsWith("enfuse")) {
        backUpFuncs = (function() {
          var _j, _len2, _ref2, _results2;
          _ref2 = line.split(/\s/);
          _results2 = [];
          for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            token = _ref2[_j];
            if (token.startsWith("IMG")) {
              _results2.push((function(token) {
                return function(cb) {
                  return backUpPicture(path.join(folder, token), cb);
                };
              })(token));
            }
          }
          return _results2;
        })();
        _results.push(async.parallel(backUpFuncs, function(err, files) {
          return unless_error(err, function() {
            return console.log("Backup done. " + files);
          });
        }));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  });
};

backUpPicture = function(file, cb) {
  var backUpName;
  backUpName = file.replace(/\.([^.]*)$/, '_backup.$1');
  return fs.copy(file, backUpName, function(err) {
    return unless_error(err, function() {
      return cb(err, file);
    });
  });
};

unless_error = function(err, func) {
  if (!err) {
    return func.apply(this);
  } else {
    return console.error(err);
  }
};

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
