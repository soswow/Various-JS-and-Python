DIAMETER = 500
RADIUS = DIAMETER / 2
WALL_THICK = 5
BALL_SIZE = 10 #diameter
SIDES = 4

xy = utils.xy

$ ->
  game = new Game()


class Game
  constructor: ->
    @state = new State()
    @canvas = new Canvas(this)
    @canvas.repaint()


class State
  constructor: ->
    @arena = new Arena(RADIUS, this)


class Arena
  constructor: (@radius, @state) ->
    @areaWalls = @updateAreaWalls()

  updateAreaWalls: ->
    @updateCorners()
    @areaWalls = ([@corners[i-1..i-1][0], corner] for corner, i in @corners)

  updateCorners: ->
    sidesNum = SIDES
    center = xy  @radius, @radius
    sectorAngle = 360 / sidesNum
    angle = 270 - sectorAngle / 2
    @corners =
      for sideIndex in [0..sidesNum-1]
        angle += sectorAngle
        utils.radialMove  center, @radius, angle


class Canvas
  constructor: (game) ->
    @state = game.state
    @prepare()

  prepare: ->
    @el = $('#canvas')
    @el.attr 'width', DIAMETER
    @el.attr 'height', DIAMETER
    context = @context = @el.get(0)?.getContext? '2d'

    thickness = WALL_THICK

    State::draw = ->
      @arena.draw()

    Arena::draw = ->
      for [start, end], i in @areaWalls
        context.lineWidth = thickness
        context.beginPath()
        context.moveTo start.x, start.y
        context.lineTo end.x, end.y
        context.closePath()
        context.stroke()
      context.lineWidth = 1

  repaint: ->
    @clearAll()
    @state.draw()

  clearAll: ->
    @el.attr 'width', DIAMETER

