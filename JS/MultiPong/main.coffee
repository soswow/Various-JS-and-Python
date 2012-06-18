TWOPI = Math.PI * 2

game = null

socket = io.connect()

xy = utils.xy

$ ->
  game = new Game()
  joinObj = $("#join")
  quiteObj = $("#quite")
  nameObj = $("#name")

  joinObj.bind  "click", ->
    name = prompt("Specify your name or leave blank to not participate.")
    if name
      socket.emit  'addNewUser', name, ({name:name, side:side}) ->
        nameObj.text("#{name} side=#{side}")
        game.name = name
        game.side = side

      game.canvas.el.bind  "mousemove", (e) =>
        pos = e.offsetX or (e.pageX - utils.findPos(game.canvas.el[0]).x)
        socket.emit  'userMoves', pos
    $(this).attr 'disabled', 'disable'
    quiteObj.removeAttr 'disabled'

  quiteObj.bind  'click', ->
    socket.emit  'user disconnect'
    $(this).attr 'disabled', 'disable'
    joinObj.removeAttr 'disabled'
    nameObj.text("")


class Game
  constructor: ->
    @side = 0
    socket.on  'connect', =>
      socket.on  'constants', (@const) =>
        for key, value of @const
          Game[key] = value
        @canvas = new Canvas(this)

      socket.on  'stateUpdate', (@state) =>
        @canvas.repaint() if @canvas

      @initSounds()

  initSounds: ->
    playingAudio = 0
    soundsObj = $("#sounds")
    audioObj = $("audio")
    socket.on  'kick!', ->
      if soundsObj.attr "checked"
        if playingAudio + 1 > audioObj.length
          playingAudio = 0
        audioObj.get(playingAudio).play()
        playingAudio += 1


class Canvas
  constructor: (@game) ->
    @prepare()
    @prevIsFinished = true
    done = false

  rotate: (point) ->
    ownSide = @game.side
    totalSides = @game.state.players.length
    radius = Game.DIAMETER / 2
    centerPoint = xy  radius, radius
    segmentAngle = 360 / totalSides
    angle = -1 * ownSide * segmentAngle

    return utils.radialOriginMove  centerPoint, point, angle, @done

  prepare: ->
    @el = $('#canvas')
    @el.attr 'width', Game.DIAMETER
    @el.attr 'height', Game.DIAMETER
    @context = @el[0]?.getContext? '2d'

  repaint: ->
    if @prevIsFinished
      @prevIsFinished = false
      requestAnimFrame =>
        @state = @game.state
        @clearAll()
        @drawState()
        @prevIsFinished = true

  clearAll: ->
    @el.attr 'width', Game.DIAMETER

  drawState: ->
    @drawArena()
    @drawBall()

  drawArena: ->
    for [start, end], i in @state.arena.solidWalls
      start = @rotate  start
      end = @rotate  end
      @context.lineWidth = Game.WALL_THICK
      @context.beginPath()
      @context.moveTo start.x, start.y
      @context.lineTo end.x, end.y
      @context.closePath()
      @context.stroke()
    @done = true
    @context.lineWidth = 1

  drawBall: ->
    @context.fillStyle = 'red'
    @context.beginPath()
    pos = @rotate  @state.ball.pos
    [x,y] = [pos.x, pos.y]
    @context.moveTo x, y
    @context.arc x, y, Game.BALL_SIZE, 0, TWOPI, true
    @context.closePath()
    @context.fill()
    @context.fillStyle = 'black'