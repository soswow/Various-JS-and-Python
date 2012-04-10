var alignQueue, allignImage, async, backUpPicture, folder, fs, fullPath, hdrQueue, makeHdr, path, readShFile, spawn, unless_error, util;

spawn = require('child_process').spawn;

fs = require('fs.extra');

path = require('path');

async = require('async');

util = require('util');

require('./expansions.js');

if (process.argv.length < 3) throw "Folder should be specified!";

folder = process.argv[2];

fs.readdir(folder, function(err, files) {
  return unless_error(err, function() {
    var file, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = files.length; _i < _len; _i++) {
      file = files[_i];
      if (file.endsWith('.SH')) {
        _results.push(fs.readFile(fullPath(file), 'utf8', readShFile));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  });
});

alignQueue = async.queue(function(image, cb) {
  return allignImage(imgs, cb);
}, 4);

hdrQueue = async.queue(function(images, cb) {
  return alignQueue.push(images, function(err) {
    return unless_error(err, function() {
      return makeHdr(images, cb);
    });
  });
}, 4);

readShFile = function(err, content) {
  return unless_error(err, function() {
    var backUpFuncs, line, token, _i, _len, _ref, _results;
    _ref = content.lines;
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
                  return backUpPicture(fullPath(token), cb);
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
  var backUpName, backupFolder, doingCopy;
  backupFolder = fullPath('backup');
  backUpName = "" + backupFolder + "/" + file;
  console.log("Checking backup folder");
  fs.stat(backupFolder, function(err, stats) {
    if (err) fs.mkdirSync(backupFolder);
    return doingCopy();
  });
  return doingCopy = function() {
    console.log("doing copy");
    return fs.copy(file, backUpName, function(err) {
      return unless_error(err, function() {
        return cb(err, file);
      });
    });
  };
};

allignImage = function(image) {
  return cb();
};

makeHdr = function(img, cb) {
  return cb();
};

fullPath = function(filename) {
  return path.join(folder, filename);
};

unless_error = function(err, func) {
  if (!err) {
    return func.apply(this);
  } else {
    return console.error(err);
  }
};
