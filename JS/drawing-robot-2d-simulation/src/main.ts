import * as Matter from 'matter-js';

const {
  Engine, Render, World, Bodies, Body, Composites, Constraint, Mouse, MouseConstraint
} = Matter;

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 800,
    height: 600,
    showAngleIndicator: true
  }
});

const arm = Bodies.rectangle(200, 200, 200, 50);

const constraint = Constraint.create({
  pointA: {x: 300, y: 100},
  bodyB: arm,
  pointB: {x: 100, y: 0}
});


const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [constraint, arm, ground]);

var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  });

World.add(engine.world, mouseConstraint);

render.mouse = mouse;

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
