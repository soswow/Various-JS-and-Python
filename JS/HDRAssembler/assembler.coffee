spawn = require('child_process').spawn
fs = require 'fs.extra'
path = require 'path'
async = require 'async'
util = require 'util'

if process.argv.length < 3
  throw "Folder should be specified!"

folder = process.argv[2]
fs.readdir folder, (err, files) ->
  unless_error err, ->
    for file in files
      unless file.indexOf('.SH') is -1
        fs.readFile path.join(folder, file), 'utf8', readShFile

readShFile = (err, data) ->
  unless_error err, ->
    for line in data.split /\n/i
      if line.startsWith "enfuse"
        backUpFuncs =
          for token in line.split /\s/ when token.startsWith "IMG"
            do (token) ->
              (cb) ->
                backUpPicture path.join(folder, token), cb

        async.parallel backUpFuncs, (err, files) ->
          unless_error err, ->
            console.log "Backup done. #{files}"
            #TODO Do other thing with files

backUpPicture = (file, cb) ->
  backUpName = file.replace(/\.([^.]*)$/, '_backup.$1')
  fs.copy file, backUpName, (err) ->
    unless_error err, -> cb(err, file)


unless_error = (err, func) ->
  unless err
    func.apply this
  else
    console.error err

unless String.prototype.startsWith
  String.prototype.startsWith = (thing) ->
    @.indexOf(thing) is 0

throw "error in startsWith" unless "SOME_DO".startsWith("SOME")
throw "error in startsWith" if "SOME_DO".startsWith("DO")

unless String.prototype.endsWith
  String.prototype.endsWith = (thing) ->
    @.indexOf(thing) is (@.length - thing.length)

throw "error in endsWith" unless "SOME_DO".endsWith("DO")
throw "error in endsWith" if "SOME_DO".endsWith("SOME")