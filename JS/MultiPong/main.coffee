TWOPI = Math.PI * 2

game = null

socket = io.connect  'http://localhost:8080'

$ ->
  game = new Game()


class Game
  constructor: ->
    socket.on  'connect', =>

      console.log 'connection event'

      socket.on  'constants', (@const) =>
        console.log 'constants event'
        for key, value of @const
          Game[key] = value

        @canvas = new Canvas(this)

        name = prompt("Specify your name or leave blank to not participate.")
        if name
          socket.emit  'addNewUser', name, (name) ->
            $("#name").text(name)
          @canvas.el.bind  "mousemove", (e) =>
            socket.emit  'userMoves', e.offsetX

      socket.on  'stateUpdate', (@state) =>
        @canvas.repaint() if @canvas


class Canvas
  constructor: (@game) ->
    @prepare()

  prepare: ->
    @el = $('#canvas')
    @el.attr 'width', Game.DIAMETER
    @el.attr 'height', Game.DIAMETER
    @context = @el[0]?.getContext? '2d'

  repaint: ->
    requestAnimFrame =>
      @state = @game.state
      @clearAll()
      @drawState()

  clearAll: ->
    @el.attr 'width', Game.DIAMETER

  drawState: ->
    @drawArena()
    @drawBall()

  drawArena: ->
    for [start, end], i in @state.arena.solidWalls
      @context.lineWidth = Game.WALL_THICK
      @context.beginPath()
      @context.moveTo start.x, start.y
      @context.lineTo end.x, end.y
      @context.closePath()
      @context.stroke()
    @context.lineWidth = 1

  drawBall: ->
    @context.fillStyle = 'red'
    @context.beginPath()
    [x,y] = [@state.ball.pos.x, @state.ball.pos.y]
    @context.moveTo x, y
    @context.arc x, y, Game.BALL_SIZE, 0, TWOPI, true
    @context.closePath()
    @context.fill()
    @context.fillStyle = 'black'