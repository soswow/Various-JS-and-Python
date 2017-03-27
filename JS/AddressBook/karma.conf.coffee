# Karma configuration
# http:#karma-runner.github.io/0.10/config/configuration-file.html

module.exports = (config) ->
  config.set
    # base path, that will be used to resolve files and exclude
    basePath: ''

    # testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine']

    # list of files / patterns to load in the browser
    files: [
      'app/bower_components/jquery/jquery.js'
      'app/bower_components/underscore/underscore.js'
      'app/bower_components/underscore.string/lib/underscore.string.js'
      'app/bower_components/backbone/backbone.js'
      'app/bower_components/Backbone.localStorage/backbone.localStorage.js'
      'app/bower_components/bootstrap-select/bootstrap-select.js'
      'app/bower_components/jasmine-underscore/lib/jasmine-underscore.js'
      'app/scripts/vendor/bootstrap/alert.js'
      'app/scripts/memory-storage.coffee'
      'app/scripts/boot.coffee'
      'app/scripts/models.coffee'
      'test/spec/*.coffee'
    ]

    # list of files / patterns to exclude
    exclude: []

    # web server port
    port: 8080

    # level of logging
    # possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO

    # enable / disable watching file and executing tests whenever any file changes
    autoWatch: true

    # Start these browsers, currently available:
    # - Chrome
    # - ChromeCanary
    # - Firefox
    # - Opera
    # - Safari (only Mac)
    # - PhantomJS
    # - IE (only Windows)
    browsers: ['Chrome']

    preprocessors: {
      '**/*.coffee': 'coffee'
    }

    # Continuous Integration mode
    # if true, it capture browsers, run tests and exit
    singleRun: false
