# Generated on 2013-08-14 using generator-webapp 0.2.7
"use strict"
LIVERELOAD_PORT = 35729
lrSnippet = require("connect-livereload")(port: LIVERELOAD_PORT)
mountFolder = (connect, dir) ->
  connect.static require("path").resolve(dir)


# # Globbing
# for performance reasons we're only matching one level down:
# 'test/spec/{,*/}*.js'
# use this if you want to recursively match all subfolders:
# 'test/spec/**/*.js'
module.exports = (grunt) ->

  # load all grunt tasks
  require("matchdep").filterDev("grunt-*").forEach grunt.loadNpmTasks

  # configurable paths
  yeomanConfig =
    app: "app"
    dist: "dist"

  grunt.initConfig
    yeoman: yeomanConfig
    watch:
      coffee:
        files: ["<%= yeoman.app %>/scripts/{,*/}*.coffee"]
        tasks: ["coffee:dist"]

      coffeeTest:
        files: ["test/spec/{,*/}*.coffee"]
        tasks: ["coffee:test"]

      compass:
        files: ["<%= yeoman.app %>/styles/{,*/}*.{scss,sass}"]
        tasks: ["compass:server"]

      styles:
        files: ["<%= yeoman.app %>/styles/{,*/}*.css"]
        tasks: ["copy:styles"]

      livereload:
        options:
          livereload: LIVERELOAD_PORT

        files: [
          "<%= yeoman.app %>/*.html"
          ".tmp/styles/{,*/}*.css"
          "{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js"
          "<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}"
        ]

    connect:
      options:
        port: 9000

        # change this to '0.0.0.0' to access the server from outside
        hostname: "localhost"

      livereload:
        options:
          middleware: (connect) ->
            [
              lrSnippet
              mountFolder(connect, ".tmp")
              mountFolder(connect, yeomanConfig.app)
            ]

      test:
        options:
          port: 9001
          middleware: (connect) ->
            [
              mountFolder(connect, ".tmp")
              mountFolder(connect, yeomanConfig.app)
            ]

      dist:
        options:
          middleware: (connect) ->
            [mountFolder(connect, yeomanConfig.dist)]

    open:
      server:
        path: "http://localhost:<%= connect.options.port %>"

    clean:
      dist:
        files: [
          dot: true
          src: [
            ".tmp"
            "<%= yeoman.dist %>/*"
            "!<%= yeoman.dist %>/.git*"
          ]
        ]

      server: ".tmp"

    jshint:
      options:
        jshintrc: ".jshintrc"

      all: [
        "Gruntfile.js"
        "<%= yeoman.app %>/scripts/{,*/}*.js"
        "!<%= yeoman.app %>/scripts/vendor/*"
        "test/spec/{,*/}*.js"
      ]

    mocha:
      all:
        options:
          run: true
          urls: ["http://localhost:<%= connect.options.port %>/index.html"]

    karma:
      unit:
        configFile: 'karma.conf.coffee'

    casperjs:
      files: ['test/casperjs/**/*.coffee']

    coffee:
      dist:
        files: [
          expand: true
          cwd: "<%= yeoman.app %>/scripts"
          src: "{,*/}*.coffee"
          dest: ".tmp/scripts"
          ext: ".js"
        ]

      test:
        files: [
          expand: true
          cwd: "test"
          src: "{,*/}*.coffee"
          dest: ".tmp/test/"
          ext: ".js"
        ]

    compass:
      options:
        sassDir: "<%= yeoman.app %>/styles"
        cssDir: ".tmp/styles"
        generatedImagesDir: ".tmp/images/generated"
        imagesDir: "<%= yeoman.app %>/images"
        javascriptsDir: "<%= yeoman.app %>/scripts"
        fontsDir: "<%= yeoman.app %>/styles/fonts"
        importPath: "<%= yeoman.app %>/bower_components"
        httpImagesPath: "/images"
        httpGeneratedImagesPath: "/images/generated"
        httpFontsPath: "/styles/fonts"
        relativeAssets: false

      dist:
        options:
          generatedImagesDir: "<%= yeoman.dist %>/images/generated"

      server:
        options:
          debugInfo: true

    rev:
      dist:
        files:
          src: [
            "<%= yeoman.dist %>/scripts/{,*/}*.js"
            "<%= yeoman.dist %>/styles/{,*/}*.css"
            "<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}"
            "<%= yeoman.dist %>/styles/fonts/*"
          ]

    useminPrepare:
      options:
        dest: "<%= yeoman.dist %>"

      html: "<%= yeoman.app %>/index.html"

    usemin:
      options:
        dirs: ["<%= yeoman.dist %>"]

      html: ["<%= yeoman.dist %>/{,*/}*.html"]
      css: ["<%= yeoman.dist %>/styles/{,*/}*.css"]

    imagemin:
      dist:
        files: [
          expand: true
          cwd: "<%= yeoman.app %>/images"
          src: "{,*/}*.{png,jpg,jpeg}"
          dest: "<%= yeoman.dist %>/images"
        ]

    cssmin: {}

    htmlmin:
      dist:
        options: {}

        files: [
          expand: true
          cwd: "<%= yeoman.app %>"
          src: "*.html"
          dest: "<%= yeoman.dist %>"
        ]


    # Put files not handled in other tasks here
    copy:
      dist:
        files: [
          expand: true
          dot: true
          cwd: "<%= yeoman.app %>"
          dest: "<%= yeoman.dist %>"
          src: [
            "*.{ico,png,txt}"
            ".htaccess"
            "images/{,*/}*.{webp,gif}"
            "styles/font/*"
          ]
        ]

      fonts:
        files: [
          expand: true
          dot: true
          cwd: "<%= yeoman.app %>/bower_components/font-awesome"
          dest: "<%= yeoman.app %>/styles"
          src: [
            "font/*.*"
          ]
        ]

      styles:
        expand: true
        dot: true
        cwd: "<%= yeoman.app %>/styles"
        dest: ".tmp/styles/"
        src: "{,*/}*.css"

    concurrent:
      server: ["copy:fonts", "compass:dist", "coffee:dist", "copy:styles"]
      test: ["coffee", "compass", "copy:styles"]
      dist: ["coffee", "compass", "copy:fonts", "copy:styles", "imagemin", "htmlmin"]

  grunt.registerTask "server", (target) ->
    return grunt.task.run([
      "build"
      "open"
      "connect:dist:keepalive"])  if target is "dist"

    grunt.task.run [
      "clean:server"
      "concurrent:server"
      "connect:livereload"
      "open"
      "watch"
    ]

  grunt.registerTask "ui-test", [
    "clean:server"
    "concurrent:test"
    "connect:test"
    "casperjs"
  ]

#  grunt.registerTask "test-server", [
#    "clean:server"
#    "concurrent:test"
#    "connect:test"
#    "open"
#    "watch"
#  ]

  grunt.registerTask "build", [
    "clean:dist"
    "useminPrepare"
    "concurrent:dist"
    "concat"
    "cssmin"
    "uglify"
    "copy:dist"
    "rev"
    "usemin"
  ]

  grunt.registerTask "default", [
    "jshint"
    "test"
    "build"
  ]