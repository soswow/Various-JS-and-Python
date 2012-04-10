spawn = require('child_process').spawn
fs = require 'fs.extra'
path = require 'path'
async = require 'async'
util = require 'util'
require './expansions.js'

if process.argv.length < 3
  throw "Folder should be specified!"

folder = process.argv[2]
fs.readdir folder, (err, files) ->
  unless_error err, ->
    for file in files
      if file.endsWith '.SH'
        fs.readFile fullPath(file), 'utf8', readShFile

alignQueue = async.queue (image, cb) ->
  allignImage imgs, cb
, 4

hdrQueue = async.queue (images, cb) ->
  alignQueue.push images, (err) ->
    unless_error err, ->
      makeHdr images, cb
, 4

readShFile = (err, content) ->
  unless_error err, ->
    for line in content.lines
      if line.startsWith "enfuse"
        backUpFuncs =
          for token in line.split /\s/ when token.startsWith "IMG"
            do (token) ->
              (cb) ->
                backUpPicture fullPath(token), cb

        async.parallel backUpFuncs, (err, files) ->
          unless_error err, ->
            console.log "Backup done. #{files}"
#            hdrQueue.push [files], (err) ->
#              unless_error err, ->
#                console.log "Done with #{files}"

backUpPicture = (file, cb) ->
  backupFolder = fullPath 'backup'
  backUpName = "#{backupFolder}/#{file}"
  console.log "Checking backup folder"
  fs.stat backupFolder, (err, stats) ->
    if err
      fs.mkdirSync backupFolder
    doingCopy()

  doingCopy = ->
    console.log "doing copy"
    fs.copy file, backUpName, (err) ->
      unless_error err, -> cb(err, file)

allignImage = (image) ->
  #TODO
  cb()

makeHdr = (img, cb) ->
  #TODO
  cb()


fullPath = (filename) -> path.join folder, filename

unless_error = (err, func) ->
  unless err
    func.apply this
  else
    console.error err

