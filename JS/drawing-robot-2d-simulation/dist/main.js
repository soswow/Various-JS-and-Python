/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/matter-js/build/matter.js":
/*!************************************************!*\
  !*** ./node_modules/matter-js/build/matter.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;/**
* matter-js 0.14.2 by @liabru 2018-06-11
* http://brm.io/matter-js/
* License MIT
*/

/**
 * The MIT License (MIT)
 * 
 * Copyright (c) Liam Brummitt and contributors.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return require(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
/**
* The `Matter.Body` module contains methods for creating and manipulating body models.
* A `Matter.Body` is a rigid body that can be simulated by a `Matter.Engine`.
* Factories for commonly used body configurations (such as rectangles, circles and other polygons) can be found in the module `Matter.Bodies`.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).

* @class Body
*/

var Body = {};

module.exports = Body;

var Vertices = _dereq_('../geometry/Vertices');
var Vector = _dereq_('../geometry/Vector');
var Sleeping = _dereq_('../core/Sleeping');
var Render = _dereq_('../render/Render');
var Common = _dereq_('../core/Common');
var Bounds = _dereq_('../geometry/Bounds');
var Axes = _dereq_('../geometry/Axes');

(function() {

    Body._inertiaScale = 4;
    Body._nextCollidingGroupId = 1;
    Body._nextNonCollidingGroupId = -1;
    Body._nextCategory = 0x0001;

    /**
     * Creates a new rigid body model. The options parameter is an object that specifies any properties you wish to override the defaults.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * Vertices must be specified in clockwise order.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {} options
     * @return {body} body
     */
    Body.create = function(options) {
        var defaults = {
            id: Common.nextId(),
            type: 'body',
            label: 'Body',
            parts: [],
            plugin: {},
            angle: 0,
            vertices: Vertices.fromPath('L 0 0 L 40 0 L 40 40 L 0 40'),
            position: { x: 0, y: 0 },
            force: { x: 0, y: 0 },
            torque: 0,
            positionImpulse: { x: 0, y: 0 },
            constraintImpulse: { x: 0, y: 0, angle: 0 },
            totalContacts: 0,
            speed: 0,
            angularSpeed: 0,
            velocity: { x: 0, y: 0 },
            angularVelocity: 0,
            isSensor: false,
            isStatic: false,
            isSleeping: false,
            motion: 0,
            sleepThreshold: 60,
            density: 0.001,
            restitution: 0,
            friction: 0.1,
            frictionStatic: 0.5,
            frictionAir: 0.01,
            collisionFilter: {
                category: 0x0001,
                mask: 0xFFFFFFFF,
                group: 0
            },
            slop: 0.05,
            timeScale: 1,
            render: {
                visible: true,
                opacity: 1,
                sprite: {
                    xScale: 1,
                    yScale: 1,
                    xOffset: 0,
                    yOffset: 0
                },
                lineWidth: 0
            }
        };

        var body = Common.extend(defaults, options);

        _initProperties(body, options);

        return body;
    };

    /**
     * Returns the next unique group index for which bodies will collide.
     * If `isNonColliding` is `true`, returns the next unique group index for which bodies will _not_ collide.
     * See `body.collisionFilter` for more information.
     * @method nextGroup
     * @param {bool} [isNonColliding=false]
     * @return {Number} Unique group index
     */
    Body.nextGroup = function(isNonColliding) {
        if (isNonColliding)
            return Body._nextNonCollidingGroupId--;

        return Body._nextCollidingGroupId++;
    };

    /**
     * Returns the next unique category bitfield (starting after the initial default category `0x0001`).
     * There are 32 available. See `body.collisionFilter` for more information.
     * @method nextCategory
     * @return {Number} Unique category bitfield
     */
    Body.nextCategory = function() {
        Body._nextCategory = Body._nextCategory << 1;
        return Body._nextCategory;
    };

    /**
     * Initialises body properties.
     * @method _initProperties
     * @private
     * @param {body} body
     * @param {} [options]
     */
    var _initProperties = function(body, options) {
        options = options || {};

        // init required properties (order is important)
        Body.set(body, {
            bounds: body.bounds || Bounds.create(body.vertices),
            positionPrev: body.positionPrev || Vector.clone(body.position),
            anglePrev: body.anglePrev || body.angle,
            vertices: body.vertices,
            parts: body.parts || [body],
            isStatic: body.isStatic,
            isSleeping: body.isSleeping,
            parent: body.parent || body
        });

        Vertices.rotate(body.vertices, body.angle, body.position);
        Axes.rotate(body.axes, body.angle);
        Bounds.update(body.bounds, body.vertices, body.velocity);

        // allow options to override the automatically calculated properties
        Body.set(body, {
            axes: options.axes || body.axes,
            area: options.area || body.area,
            mass: options.mass || body.mass,
            inertia: options.inertia || body.inertia
        });

        // render properties
        var defaultFillStyle = (body.isStatic ? '#2e2b44' : Common.choose(['#006BA6', '#0496FF', '#FFBC42', '#D81159', '#8F2D56'])),
            defaultStrokeStyle = '#000';
        body.render.fillStyle = body.render.fillStyle || defaultFillStyle;
        body.render.strokeStyle = body.render.strokeStyle || defaultStrokeStyle;
        body.render.sprite.xOffset += -(body.bounds.min.x - body.position.x) / (body.bounds.max.x - body.bounds.min.x);
        body.render.sprite.yOffset += -(body.bounds.min.y - body.position.y) / (body.bounds.max.y - body.bounds.min.y);
    };

    /**
     * Given a property and a value (or map of), sets the property(s) on the body, using the appropriate setter functions if they exist.
     * Prefer to use the actual setter functions in performance critical situations.
     * @method set
     * @param {body} body
     * @param {} settings A property name (or map of properties and values) to set on the body.
     * @param {} value The value to set if `settings` is a single property name.
     */
    Body.set = function(body, settings, value) {
        var property;

        if (typeof settings === 'string') {
            property = settings;
            settings = {};
            settings[property] = value;
        }

        for (property in settings) {
            value = settings[property];

            if (!settings.hasOwnProperty(property))
                continue;

            switch (property) {

            case 'isStatic':
                Body.setStatic(body, value);
                break;
            case 'isSleeping':
                Sleeping.set(body, value);
                break;
            case 'mass':
                Body.setMass(body, value);
                break;
            case 'density':
                Body.setDensity(body, value);
                break;
            case 'inertia':
                Body.setInertia(body, value);
                break;
            case 'vertices':
                Body.setVertices(body, value);
                break;
            case 'position':
                Body.setPosition(body, value);
                break;
            case 'angle':
                Body.setAngle(body, value);
                break;
            case 'velocity':
                Body.setVelocity(body, value);
                break;
            case 'angularVelocity':
                Body.setAngularVelocity(body, value);
                break;
            case 'parts':
                Body.setParts(body, value);
                break;
            default:
                body[property] = value;

            }
        }
    };

    /**
     * Sets the body as static, including isStatic flag and setting mass and inertia to Infinity.
     * @method setStatic
     * @param {body} body
     * @param {bool} isStatic
     */
    Body.setStatic = function(body, isStatic) {
        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];
            part.isStatic = isStatic;

            if (isStatic) {
                part._original = {
                    restitution: part.restitution,
                    friction: part.friction,
                    mass: part.mass,
                    inertia: part.inertia,
                    density: part.density,
                    inverseMass: part.inverseMass,
                    inverseInertia: part.inverseInertia
                };

                part.restitution = 0;
                part.friction = 1;
                part.mass = part.inertia = part.density = Infinity;
                part.inverseMass = part.inverseInertia = 0;

                part.positionPrev.x = part.position.x;
                part.positionPrev.y = part.position.y;
                part.anglePrev = part.angle;
                part.angularVelocity = 0;
                part.speed = 0;
                part.angularSpeed = 0;
                part.motion = 0;
            } else if (part._original) {
                part.restitution = part._original.restitution;
                part.friction = part._original.friction;
                part.mass = part._original.mass;
                part.inertia = part._original.inertia;
                part.density = part._original.density;
                part.inverseMass = part._original.inverseMass;
                part.inverseInertia = part._original.inverseInertia;

                delete part._original;
            }
        }
    };

    /**
     * Sets the mass of the body. Inverse mass, density and inertia are automatically updated to reflect the change.
     * @method setMass
     * @param {body} body
     * @param {number} mass
     */
    Body.setMass = function(body, mass) {
        var moment = body.inertia / (body.mass / 6);
        body.inertia = moment * (mass / 6);
        body.inverseInertia = 1 / body.inertia;

        body.mass = mass;
        body.inverseMass = 1 / body.mass;
        body.density = body.mass / body.area;
    };

    /**
     * Sets the density of the body. Mass and inertia are automatically updated to reflect the change.
     * @method setDensity
     * @param {body} body
     * @param {number} density
     */
    Body.setDensity = function(body, density) {
        Body.setMass(body, density * body.area);
        body.density = density;
    };

    /**
     * Sets the moment of inertia (i.e. second moment of area) of the body of the body. 
     * Inverse inertia is automatically updated to reflect the change. Mass is not changed.
     * @method setInertia
     * @param {body} body
     * @param {number} inertia
     */
    Body.setInertia = function(body, inertia) {
        body.inertia = inertia;
        body.inverseInertia = 1 / body.inertia;
    };

    /**
     * Sets the body's vertices and updates body properties accordingly, including inertia, area and mass (with respect to `body.density`).
     * Vertices will be automatically transformed to be orientated around their centre of mass as the origin.
     * They are then automatically translated to world space based on `body.position`.
     *
     * The `vertices` argument should be passed as an array of `Matter.Vector` points (or a `Matter.Vertices` array).
     * Vertices must form a convex hull, concave hulls are not supported.
     *
     * @method setVertices
     * @param {body} body
     * @param {vector[]} vertices
     */
    Body.setVertices = function(body, vertices) {
        // change vertices
        if (vertices[0].body === body) {
            body.vertices = vertices;
        } else {
            body.vertices = Vertices.create(vertices, body);
        }

        // update properties
        body.axes = Axes.fromVertices(body.vertices);
        body.area = Vertices.area(body.vertices);
        Body.setMass(body, body.density * body.area);

        // orient vertices around the centre of mass at origin (0, 0)
        var centre = Vertices.centre(body.vertices);
        Vertices.translate(body.vertices, centre, -1);

        // update inertia while vertices are at origin (0, 0)
        Body.setInertia(body, Body._inertiaScale * Vertices.inertia(body.vertices, body.mass));

        // update geometry
        Vertices.translate(body.vertices, body.position);
        Bounds.update(body.bounds, body.vertices, body.velocity);
    };

    /**
     * Sets the parts of the `body` and updates mass, inertia and centroid.
     * Each part will have its parent set to `body`.
     * By default the convex hull will be automatically computed and set on `body`, unless `autoHull` is set to `false.`
     * Note that this method will ensure that the first part in `body.parts` will always be the `body`.
     * @method setParts
     * @param {body} body
     * @param [body] parts
     * @param {bool} [autoHull=true]
     */
    Body.setParts = function(body, parts, autoHull) {
        var i;

        // add all the parts, ensuring that the first part is always the parent body
        parts = parts.slice(0);
        body.parts.length = 0;
        body.parts.push(body);
        body.parent = body;

        for (i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (part !== body) {
                part.parent = body;
                body.parts.push(part);
            }
        }

        if (body.parts.length === 1)
            return;

        autoHull = typeof autoHull !== 'undefined' ? autoHull : true;

        // find the convex hull of all parts to set on the parent body
        if (autoHull) {
            var vertices = [];
            for (i = 0; i < parts.length; i++) {
                vertices = vertices.concat(parts[i].vertices);
            }

            Vertices.clockwiseSort(vertices);

            var hull = Vertices.hull(vertices),
                hullCentre = Vertices.centre(hull);

            Body.setVertices(body, hull);
            Vertices.translate(body.vertices, hullCentre);
        }

        // sum the properties of all compound parts of the parent body
        var total = Body._totalProperties(body);

        body.area = total.area;
        body.parent = body;
        body.position.x = total.centre.x;
        body.position.y = total.centre.y;
        body.positionPrev.x = total.centre.x;
        body.positionPrev.y = total.centre.y;

        Body.setMass(body, total.mass);
        Body.setInertia(body, total.inertia);
        Body.setPosition(body, total.centre);
    };

    /**
     * Sets the position of the body instantly. Velocity, angle, force etc. are unchanged.
     * @method setPosition
     * @param {body} body
     * @param {vector} position
     */
    Body.setPosition = function(body, position) {
        var delta = Vector.sub(position, body.position);
        body.positionPrev.x += delta.x;
        body.positionPrev.y += delta.y;

        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];
            part.position.x += delta.x;
            part.position.y += delta.y;
            Vertices.translate(part.vertices, delta);
            Bounds.update(part.bounds, part.vertices, body.velocity);
        }
    };

    /**
     * Sets the angle of the body instantly. Angular velocity, position, force etc. are unchanged.
     * @method setAngle
     * @param {body} body
     * @param {number} angle
     */
    Body.setAngle = function(body, angle) {
        var delta = angle - body.angle;
        body.anglePrev += delta;

        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];
            part.angle += delta;
            Vertices.rotate(part.vertices, delta, body.position);
            Axes.rotate(part.axes, delta);
            Bounds.update(part.bounds, part.vertices, body.velocity);
            if (i > 0) {
                Vector.rotateAbout(part.position, delta, body.position, part.position);
            }
        }
    };

    /**
     * Sets the linear velocity of the body instantly. Position, angle, force etc. are unchanged. See also `Body.applyForce`.
     * @method setVelocity
     * @param {body} body
     * @param {vector} velocity
     */
    Body.setVelocity = function(body, velocity) {
        body.positionPrev.x = body.position.x - velocity.x;
        body.positionPrev.y = body.position.y - velocity.y;
        body.velocity.x = velocity.x;
        body.velocity.y = velocity.y;
        body.speed = Vector.magnitude(body.velocity);
    };

    /**
     * Sets the angular velocity of the body instantly. Position, angle, force etc. are unchanged. See also `Body.applyForce`.
     * @method setAngularVelocity
     * @param {body} body
     * @param {number} velocity
     */
    Body.setAngularVelocity = function(body, velocity) {
        body.anglePrev = body.angle - velocity;
        body.angularVelocity = velocity;
        body.angularSpeed = Math.abs(body.angularVelocity);
    };

    /**
     * Moves a body by a given vector relative to its current position, without imparting any velocity.
     * @method translate
     * @param {body} body
     * @param {vector} translation
     */
    Body.translate = function(body, translation) {
        Body.setPosition(body, Vector.add(body.position, translation));
    };

    /**
     * Rotates a body by a given angle relative to its current angle, without imparting any angular velocity.
     * @method rotate
     * @param {body} body
     * @param {number} rotation
     * @param {vector} [point]
     */
    Body.rotate = function(body, rotation, point) {
        if (!point) {
            Body.setAngle(body, body.angle + rotation);
        } else {
            var cos = Math.cos(rotation),
                sin = Math.sin(rotation),
                dx = body.position.x - point.x,
                dy = body.position.y - point.y;
                
            Body.setPosition(body, {
                x: point.x + (dx * cos - dy * sin),
                y: point.y + (dx * sin + dy * cos)
            });

            Body.setAngle(body, body.angle + rotation);
        }
    };

    /**
     * Scales the body, including updating physical properties (mass, area, axes, inertia), from a world-space point (default is body centre).
     * @method scale
     * @param {body} body
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {vector} [point]
     */
    Body.scale = function(body, scaleX, scaleY, point) {
        var totalArea = 0,
            totalInertia = 0;

        point = point || body.position;

        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];

            // scale vertices
            Vertices.scale(part.vertices, scaleX, scaleY, point);

            // update properties
            part.axes = Axes.fromVertices(part.vertices);
            part.area = Vertices.area(part.vertices);
            Body.setMass(part, body.density * part.area);

            // update inertia (requires vertices to be at origin)
            Vertices.translate(part.vertices, { x: -part.position.x, y: -part.position.y });
            Body.setInertia(part, Body._inertiaScale * Vertices.inertia(part.vertices, part.mass));
            Vertices.translate(part.vertices, { x: part.position.x, y: part.position.y });

            if (i > 0) {
                totalArea += part.area;
                totalInertia += part.inertia;
            }

            // scale position
            part.position.x = point.x + (part.position.x - point.x) * scaleX;
            part.position.y = point.y + (part.position.y - point.y) * scaleY;

            // update bounds
            Bounds.update(part.bounds, part.vertices, body.velocity);
        }

        // handle parent body
        if (body.parts.length > 1) {
            body.area = totalArea;

            if (!body.isStatic) {
                Body.setMass(body, body.density * totalArea);
                Body.setInertia(body, totalInertia);
            }
        }

        // handle circles
        if (body.circleRadius) { 
            if (scaleX === scaleY) {
                body.circleRadius *= scaleX;
            } else {
                // body is no longer a circle
                body.circleRadius = null;
            }
        }
    };

    /**
     * Performs a simulation step for the given `body`, including updating position and angle using Verlet integration.
     * @method update
     * @param {body} body
     * @param {number} deltaTime
     * @param {number} timeScale
     * @param {number} correction
     */
    Body.update = function(body, deltaTime, timeScale, correction) {
        var deltaTimeSquared = Math.pow(deltaTime * timeScale * body.timeScale, 2);

        // from the previous step
        var frictionAir = 1 - body.frictionAir * timeScale * body.timeScale,
            velocityPrevX = body.position.x - body.positionPrev.x,
            velocityPrevY = body.position.y - body.positionPrev.y;

        // update velocity with Verlet integration
        body.velocity.x = (velocityPrevX * frictionAir * correction) + (body.force.x / body.mass) * deltaTimeSquared;
        body.velocity.y = (velocityPrevY * frictionAir * correction) + (body.force.y / body.mass) * deltaTimeSquared;

        body.positionPrev.x = body.position.x;
        body.positionPrev.y = body.position.y;
        body.position.x += body.velocity.x;
        body.position.y += body.velocity.y;

        // update angular velocity with Verlet integration
        body.angularVelocity = ((body.angle - body.anglePrev) * frictionAir * correction) + (body.torque / body.inertia) * deltaTimeSquared;
        body.anglePrev = body.angle;
        body.angle += body.angularVelocity;

        // track speed and acceleration
        body.speed = Vector.magnitude(body.velocity);
        body.angularSpeed = Math.abs(body.angularVelocity);

        // transform the body geometry
        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];

            Vertices.translate(part.vertices, body.velocity);
            
            if (i > 0) {
                part.position.x += body.velocity.x;
                part.position.y += body.velocity.y;
            }

            if (body.angularVelocity !== 0) {
                Vertices.rotate(part.vertices, body.angularVelocity, body.position);
                Axes.rotate(part.axes, body.angularVelocity);
                if (i > 0) {
                    Vector.rotateAbout(part.position, body.angularVelocity, body.position, part.position);
                }
            }

            Bounds.update(part.bounds, part.vertices, body.velocity);
        }
    };

    /**
     * Applies a force to a body from a given world-space position, including resulting torque.
     * @method applyForce
     * @param {body} body
     * @param {vector} position
     * @param {vector} force
     */
    Body.applyForce = function(body, position, force) {
        body.force.x += force.x;
        body.force.y += force.y;
        var offset = { x: position.x - body.position.x, y: position.y - body.position.y };
        body.torque += offset.x * force.y - offset.y * force.x;
    };

    /**
     * Returns the sums of the properties of all compound parts of the parent body.
     * @method _totalProperties
     * @private
     * @param {body} body
     * @return {}
     */
    Body._totalProperties = function(body) {
        // from equations at:
        // https://ecourses.ou.edu/cgi-bin/ebook.cgi?doc=&topic=st&chap_sec=07.2&page=theory
        // http://output.to/sideway/default.asp?qno=121100087

        var properties = {
            mass: 0,
            area: 0,
            inertia: 0,
            centre: { x: 0, y: 0 }
        };

        // sum the properties of all compound parts of the parent body
        for (var i = body.parts.length === 1 ? 0 : 1; i < body.parts.length; i++) {
            var part = body.parts[i],
                mass = part.mass !== Infinity ? part.mass : 1;

            properties.mass += mass;
            properties.area += part.area;
            properties.inertia += part.inertia;
            properties.centre = Vector.add(properties.centre, Vector.mult(part.position, mass));
        }

        properties.centre = Vector.div(properties.centre, properties.mass);

        return properties;
    };

    /*
    *
    *  Events Documentation
    *
    */

    /**
    * Fired when a body starts sleeping (where `this` is the body).
    *
    * @event sleepStart
    * @this {body} The body that has started sleeping
    * @param {} event An event object
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when a body ends sleeping (where `this` is the body).
    *
    * @event sleepEnd
    * @this {body} The body that has ended sleeping
    * @param {} event An event object
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * An integer `Number` uniquely identifying number generated in `Body.create` by `Common.nextId`.
     *
     * @property id
     * @type number
     */

    /**
     * A `String` denoting the type of object.
     *
     * @property type
     * @type string
     * @default "body"
     * @readOnly
     */

    /**
     * An arbitrary `String` name to help the user identify and manage bodies.
     *
     * @property label
     * @type string
     * @default "Body"
     */

    /**
     * An array of bodies that make up this body. 
     * The first body in the array must always be a self reference to the current body instance.
     * All bodies in the `parts` array together form a single rigid compound body.
     * Parts are allowed to overlap, have gaps or holes or even form concave bodies.
     * Parts themselves should never be added to a `World`, only the parent body should be.
     * Use `Body.setParts` when setting parts to ensure correct updates of all properties.
     *
     * @property parts
     * @type body[]
     */

    /**
     * An object reserved for storing plugin-specific properties.
     *
     * @property plugin
     * @type {}
     */

    /**
     * A self reference if the body is _not_ a part of another body.
     * Otherwise this is a reference to the body that this is a part of.
     * See `body.parts`.
     *
     * @property parent
     * @type body
     */

    /**
     * A `Number` specifying the angle of the body, in radians.
     *
     * @property angle
     * @type number
     * @default 0
     */

    /**
     * An array of `Vector` objects that specify the convex hull of the rigid body.
     * These should be provided about the origin `(0, 0)`. E.g.
     *
     *     [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]
     *
     * When passed via `Body.create`, the vertices are translated relative to `body.position` (i.e. world-space, and constantly updated by `Body.update` during simulation).
     * The `Vector` objects are also augmented with additional properties required for efficient collision detection. 
     *
     * Other properties such as `inertia` and `bounds` are automatically calculated from the passed vertices (unless provided via `options`).
     * Concave hulls are not currently supported. The module `Matter.Vertices` contains useful methods for working with vertices.
     *
     * @property vertices
     * @type vector[]
     */

    /**
     * A `Vector` that specifies the current world-space position of the body.
     *
     * @property position
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Vector` that specifies the force to apply in the current step. It is zeroed after every `Body.update`. See also `Body.applyForce`.
     *
     * @property force
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Number` that specifies the torque (turning force) to apply in the current step. It is zeroed after every `Body.update`.
     *
     * @property torque
     * @type number
     * @default 0
     */

    /**
     * A `Number` that _measures_ the current speed of the body after the last `Body.update`. It is read-only and always positive (it's the magnitude of `body.velocity`).
     *
     * @readOnly
     * @property speed
     * @type number
     * @default 0
     */

    /**
     * A `Number` that _measures_ the current angular speed of the body after the last `Body.update`. It is read-only and always positive (it's the magnitude of `body.angularVelocity`).
     *
     * @readOnly
     * @property angularSpeed
     * @type number
     * @default 0
     */

    /**
     * A `Vector` that _measures_ the current velocity of the body after the last `Body.update`. It is read-only. 
     * If you need to modify a body's velocity directly, you should either apply a force or simply change the body's `position` (as the engine uses position-Verlet integration).
     *
     * @readOnly
     * @property velocity
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Number` that _measures_ the current angular velocity of the body after the last `Body.update`. It is read-only. 
     * If you need to modify a body's angular velocity directly, you should apply a torque or simply change the body's `angle` (as the engine uses position-Verlet integration).
     *
     * @readOnly
     * @property angularVelocity
     * @type number
     * @default 0
     */

    /**
     * A flag that indicates whether a body is considered static. A static body can never change position or angle and is completely fixed.
     * If you need to set a body as static after its creation, you should use `Body.setStatic` as this requires more than just setting this flag.
     *
     * @property isStatic
     * @type boolean
     * @default false
     */

    /**
     * A flag that indicates whether a body is a sensor. Sensor triggers collision events, but doesn't react with colliding body physically.
     *
     * @property isSensor
     * @type boolean
     * @default false
     */

    /**
     * A flag that indicates whether the body is considered sleeping. A sleeping body acts similar to a static body, except it is only temporary and can be awoken.
     * If you need to set a body as sleeping, you should use `Sleeping.set` as this requires more than just setting this flag.
     *
     * @property isSleeping
     * @type boolean
     * @default false
     */

    /**
     * A `Number` that _measures_ the amount of movement a body currently has (a combination of `speed` and `angularSpeed`). It is read-only and always positive.
     * It is used and updated by the `Matter.Sleeping` module during simulation to decide if a body has come to rest.
     *
     * @readOnly
     * @property motion
     * @type number
     * @default 0
     */

    /**
     * A `Number` that defines the number of updates in which this body must have near-zero velocity before it is set as sleeping by the `Matter.Sleeping` module (if sleeping is enabled by the engine).
     *
     * @property sleepThreshold
     * @type number
     * @default 60
     */

    /**
     * A `Number` that defines the density of the body, that is its mass per unit area.
     * If you pass the density via `Body.create` the `mass` property is automatically calculated for you based on the size (area) of the object.
     * This is generally preferable to simply setting mass and allows for more intuitive definition of materials (e.g. rock has a higher density than wood).
     *
     * @property density
     * @type number
     * @default 0.001
     */

    /**
     * A `Number` that defines the mass of the body, although it may be more appropriate to specify the `density` property instead.
     * If you modify this value, you must also modify the `body.inverseMass` property (`1 / mass`).
     *
     * @property mass
     * @type number
     */

    /**
     * A `Number` that defines the inverse mass of the body (`1 / mass`).
     * If you modify this value, you must also modify the `body.mass` property.
     *
     * @property inverseMass
     * @type number
     */

    /**
     * A `Number` that defines the moment of inertia (i.e. second moment of area) of the body.
     * It is automatically calculated from the given convex hull (`vertices` array) and density in `Body.create`.
     * If you modify this value, you must also modify the `body.inverseInertia` property (`1 / inertia`).
     *
     * @property inertia
     * @type number
     */

    /**
     * A `Number` that defines the inverse moment of inertia of the body (`1 / inertia`).
     * If you modify this value, you must also modify the `body.inertia` property.
     *
     * @property inverseInertia
     * @type number
     */

    /**
     * A `Number` that defines the restitution (elasticity) of the body. The value is always positive and is in the range `(0, 1)`.
     * A value of `0` means collisions may be perfectly inelastic and no bouncing may occur. 
     * A value of `0.8` means the body may bounce back with approximately 80% of its kinetic energy.
     * Note that collision response is based on _pairs_ of bodies, and that `restitution` values are _combined_ with the following formula:
     *
     *     Math.max(bodyA.restitution, bodyB.restitution)
     *
     * @property restitution
     * @type number
     * @default 0
     */

    /**
     * A `Number` that defines the friction of the body. The value is always positive and is in the range `(0, 1)`.
     * A value of `0` means that the body may slide indefinitely.
     * A value of `1` means the body may come to a stop almost instantly after a force is applied.
     *
     * The effects of the value may be non-linear. 
     * High values may be unstable depending on the body.
     * The engine uses a Coulomb friction model including static and kinetic friction.
     * Note that collision response is based on _pairs_ of bodies, and that `friction` values are _combined_ with the following formula:
     *
     *     Math.min(bodyA.friction, bodyB.friction)
     *
     * @property friction
     * @type number
     * @default 0.1
     */

    /**
     * A `Number` that defines the static friction of the body (in the Coulomb friction model). 
     * A value of `0` means the body will never 'stick' when it is nearly stationary and only dynamic `friction` is used.
     * The higher the value (e.g. `10`), the more force it will take to initially get the body moving when nearly stationary.
     * This value is multiplied with the `friction` property to make it easier to change `friction` and maintain an appropriate amount of static friction.
     *
     * @property frictionStatic
     * @type number
     * @default 0.5
     */

    /**
     * A `Number` that defines the air friction of the body (air resistance). 
     * A value of `0` means the body will never slow as it moves through space.
     * The higher the value, the faster a body slows when moving through space.
     * The effects of the value are non-linear. 
     *
     * @property frictionAir
     * @type number
     * @default 0.01
     */

    /**
     * An `Object` that specifies the collision filtering properties of this body.
     *
     * Collisions between two bodies will obey the following rules:
     * - If the two bodies have the same non-zero value of `collisionFilter.group`,
     *   they will always collide if the value is positive, and they will never collide
     *   if the value is negative.
     * - If the two bodies have different values of `collisionFilter.group` or if one
     *   (or both) of the bodies has a value of 0, then the category/mask rules apply as follows:
     *
     * Each body belongs to a collision category, given by `collisionFilter.category`. This
     * value is used as a bit field and the category should have only one bit set, meaning that
     * the value of this property is a power of two in the range [1, 2^31]. Thus, there are 32
     * different collision categories available.
     *
     * Each body also defines a collision bitmask, given by `collisionFilter.mask` which specifies
     * the categories it collides with (the value is the bitwise AND value of all these categories).
     *
     * Using the category/mask rules, two bodies `A` and `B` collide if each includes the other's
     * category in its mask, i.e. `(categoryA & maskB) !== 0` and `(categoryB & maskA) !== 0`
     * are both true.
     *
     * @property collisionFilter
     * @type object
     */

    /**
     * An Integer `Number`, that specifies the collision group this body belongs to.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.group
     * @type object
     * @default 0
     */

    /**
     * A bit field that specifies the collision category this body belongs to.
     * The category value should have only one bit set, for example `0x0001`.
     * This means there are up to 32 unique collision categories available.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.category
     * @type object
     * @default 1
     */

    /**
     * A bit mask that specifies the collision categories this body may collide with.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.mask
     * @type object
     * @default -1
     */

    /**
     * A `Number` that specifies a tolerance on how far a body is allowed to 'sink' or rotate into other bodies.
     * Avoid changing this value unless you understand the purpose of `slop` in physics engines.
     * The default should generally suffice, although very large bodies may require larger values for stable stacking.
     *
     * @property slop
     * @type number
     * @default 0.05
     */

    /**
     * A `Number` that allows per-body time scaling, e.g. a force-field where bodies inside are in slow-motion, while others are at full speed.
     *
     * @property timeScale
     * @type number
     * @default 1
     */

    /**
     * An `Object` that defines the rendering properties to be consumed by the module `Matter.Render`.
     *
     * @property render
     * @type object
     */

    /**
     * A flag that indicates if the body should be rendered.
     *
     * @property render.visible
     * @type boolean
     * @default true
     */

    /**
     * Sets the opacity to use when rendering.
     *
     * @property render.opacity
     * @type number
     * @default 1
    */

    /**
     * An `Object` that defines the sprite properties to use when rendering, if any.
     *
     * @property render.sprite
     * @type object
     */

    /**
     * An `String` that defines the path to the image to use as the sprite texture, if any.
     *
     * @property render.sprite.texture
     * @type string
     */
     
    /**
     * A `Number` that defines the scaling in the x-axis for the sprite, if any.
     *
     * @property render.sprite.xScale
     * @type number
     * @default 1
     */

    /**
     * A `Number` that defines the scaling in the y-axis for the sprite, if any.
     *
     * @property render.sprite.yScale
     * @type number
     * @default 1
     */

     /**
      * A `Number` that defines the offset in the x-axis for the sprite (normalised by texture width).
      *
      * @property render.sprite.xOffset
      * @type number
      * @default 0
      */

     /**
      * A `Number` that defines the offset in the y-axis for the sprite (normalised by texture height).
      *
      * @property render.sprite.yOffset
      * @type number
      * @default 0
      */

    /**
     * A `Number` that defines the line width to use when rendering the body outline (if a sprite is not defined).
     * A value of `0` means no outline will be rendered.
     *
     * @property render.lineWidth
     * @type number
     * @default 0
     */

    /**
     * A `String` that defines the fill style to use when rendering the body (if a sprite is not defined).
     * It is the same as when using a canvas, so it accepts CSS style property values.
     *
     * @property render.fillStyle
     * @type string
     * @default a random colour
     */

    /**
     * A `String` that defines the stroke style to use when rendering the body outline (if a sprite is not defined).
     * It is the same as when using a canvas, so it accepts CSS style property values.
     *
     * @property render.strokeStyle
     * @type string
     * @default a random colour
     */

    /**
     * An array of unique axis vectors (edge normals) used for collision detection.
     * These are automatically calculated from the given convex hull (`vertices` array) in `Body.create`.
     * They are constantly updated by `Body.update` during the simulation.
     *
     * @property axes
     * @type vector[]
     */
     
    /**
     * A `Number` that _measures_ the area of the body's convex hull, calculated at creation by `Body.create`.
     *
     * @property area
     * @type string
     * @default 
     */

    /**
     * A `Bounds` object that defines the AABB region for the body.
     * It is automatically calculated from the given convex hull (`vertices` array) in `Body.create` and constantly updated by `Body.update` during simulation.
     *
     * @property bounds
     * @type bounds
     */

})();

},{"../core/Common":14,"../core/Sleeping":22,"../geometry/Axes":25,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29,"../render/Render":31}],2:[function(_dereq_,module,exports){
/**
* The `Matter.Composite` module contains methods for creating and manipulating composite bodies.
* A composite body is a collection of `Matter.Body`, `Matter.Constraint` and other `Matter.Composite`, therefore composites form a tree structure.
* It is important to use the functions in this module to modify composites, rather than directly modifying their properties.
* Note that the `Matter.World` object is also a type of `Matter.Composite` and as such all composite methods here can also operate on a `Matter.World`.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Composite
*/

var Composite = {};

module.exports = Composite;

var Events = _dereq_('../core/Events');
var Common = _dereq_('../core/Common');
var Bounds = _dereq_('../geometry/Bounds');
var Body = _dereq_('./Body');

(function() {

    /**
     * Creates a new composite. The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properites section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {} [options]
     * @return {composite} A new composite
     */
    Composite.create = function(options) {
        return Common.extend({ 
            id: Common.nextId(),
            type: 'composite',
            parent: null,
            isModified: false,
            bodies: [], 
            constraints: [], 
            composites: [],
            label: 'Composite',
            plugin: {}
        }, options);
    };

    /**
     * Sets the composite's `isModified` flag. 
     * If `updateParents` is true, all parents will be set (default: false).
     * If `updateChildren` is true, all children will be set (default: false).
     * @method setModified
     * @param {composite} composite
     * @param {boolean} isModified
     * @param {boolean} [updateParents=false]
     * @param {boolean} [updateChildren=false]
     */
    Composite.setModified = function(composite, isModified, updateParents, updateChildren) {
        composite.isModified = isModified;

        if (updateParents && composite.parent) {
            Composite.setModified(composite.parent, isModified, updateParents, updateChildren);
        }

        if (updateChildren) {
            for(var i = 0; i < composite.composites.length; i++) {
                var childComposite = composite.composites[i];
                Composite.setModified(childComposite, isModified, updateParents, updateChildren);
            }
        }
    };

    /**
     * Generic add function. Adds one or many body(s), constraint(s) or a composite(s) to the given composite.
     * Triggers `beforeAdd` and `afterAdd` events on the `composite`.
     * @method add
     * @param {composite} composite
     * @param {} object
     * @return {composite} The original composite with the objects added
     */
    Composite.add = function(composite, object) {
        var objects = [].concat(object);

        Events.trigger(composite, 'beforeAdd', { object: object });

        for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];

            switch (obj.type) {

            case 'body':
                // skip adding compound parts
                if (obj.parent !== obj) {
                    Common.warn('Composite.add: skipped adding a compound body part (you must add its parent instead)');
                    break;
                }

                Composite.addBody(composite, obj);
                break;
            case 'constraint':
                Composite.addConstraint(composite, obj);
                break;
            case 'composite':
                Composite.addComposite(composite, obj);
                break;
            case 'mouseConstraint':
                Composite.addConstraint(composite, obj.constraint);
                break;

            }
        }

        Events.trigger(composite, 'afterAdd', { object: object });

        return composite;
    };

    /**
     * Generic remove function. Removes one or many body(s), constraint(s) or a composite(s) to the given composite.
     * Optionally searching its children recursively.
     * Triggers `beforeRemove` and `afterRemove` events on the `composite`.
     * @method remove
     * @param {composite} composite
     * @param {} object
     * @param {boolean} [deep=false]
     * @return {composite} The original composite with the objects removed
     */
    Composite.remove = function(composite, object, deep) {
        var objects = [].concat(object);

        Events.trigger(composite, 'beforeRemove', { object: object });

        for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];

            switch (obj.type) {

            case 'body':
                Composite.removeBody(composite, obj, deep);
                break;
            case 'constraint':
                Composite.removeConstraint(composite, obj, deep);
                break;
            case 'composite':
                Composite.removeComposite(composite, obj, deep);
                break;
            case 'mouseConstraint':
                Composite.removeConstraint(composite, obj.constraint);
                break;

            }
        }

        Events.trigger(composite, 'afterRemove', { object: object });

        return composite;
    };

    /**
     * Adds a composite to the given composite.
     * @private
     * @method addComposite
     * @param {composite} compositeA
     * @param {composite} compositeB
     * @return {composite} The original compositeA with the objects from compositeB added
     */
    Composite.addComposite = function(compositeA, compositeB) {
        compositeA.composites.push(compositeB);
        compositeB.parent = compositeA;
        Composite.setModified(compositeA, true, true, false);
        return compositeA;
    };

    /**
     * Removes a composite from the given composite, and optionally searching its children recursively.
     * @private
     * @method removeComposite
     * @param {composite} compositeA
     * @param {composite} compositeB
     * @param {boolean} [deep=false]
     * @return {composite} The original compositeA with the composite removed
     */
    Composite.removeComposite = function(compositeA, compositeB, deep) {
        var position = Common.indexOf(compositeA.composites, compositeB);
        if (position !== -1) {
            Composite.removeCompositeAt(compositeA, position);
            Composite.setModified(compositeA, true, true, false);
        }

        if (deep) {
            for (var i = 0; i < compositeA.composites.length; i++){
                Composite.removeComposite(compositeA.composites[i], compositeB, true);
            }
        }

        return compositeA;
    };

    /**
     * Removes a composite from the given composite.
     * @private
     * @method removeCompositeAt
     * @param {composite} composite
     * @param {number} position
     * @return {composite} The original composite with the composite removed
     */
    Composite.removeCompositeAt = function(composite, position) {
        composite.composites.splice(position, 1);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Adds a body to the given composite.
     * @private
     * @method addBody
     * @param {composite} composite
     * @param {body} body
     * @return {composite} The original composite with the body added
     */
    Composite.addBody = function(composite, body) {
        composite.bodies.push(body);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Removes a body from the given composite, and optionally searching its children recursively.
     * @private
     * @method removeBody
     * @param {composite} composite
     * @param {body} body
     * @param {boolean} [deep=false]
     * @return {composite} The original composite with the body removed
     */
    Composite.removeBody = function(composite, body, deep) {
        var position = Common.indexOf(composite.bodies, body);
        if (position !== -1) {
            Composite.removeBodyAt(composite, position);
            Composite.setModified(composite, true, true, false);
        }

        if (deep) {
            for (var i = 0; i < composite.composites.length; i++){
                Composite.removeBody(composite.composites[i], body, true);
            }
        }

        return composite;
    };

    /**
     * Removes a body from the given composite.
     * @private
     * @method removeBodyAt
     * @param {composite} composite
     * @param {number} position
     * @return {composite} The original composite with the body removed
     */
    Composite.removeBodyAt = function(composite, position) {
        composite.bodies.splice(position, 1);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Adds a constraint to the given composite.
     * @private
     * @method addConstraint
     * @param {composite} composite
     * @param {constraint} constraint
     * @return {composite} The original composite with the constraint added
     */
    Composite.addConstraint = function(composite, constraint) {
        composite.constraints.push(constraint);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Removes a constraint from the given composite, and optionally searching its children recursively.
     * @private
     * @method removeConstraint
     * @param {composite} composite
     * @param {constraint} constraint
     * @param {boolean} [deep=false]
     * @return {composite} The original composite with the constraint removed
     */
    Composite.removeConstraint = function(composite, constraint, deep) {
        var position = Common.indexOf(composite.constraints, constraint);
        if (position !== -1) {
            Composite.removeConstraintAt(composite, position);
        }

        if (deep) {
            for (var i = 0; i < composite.composites.length; i++){
                Composite.removeConstraint(composite.composites[i], constraint, true);
            }
        }

        return composite;
    };

    /**
     * Removes a body from the given composite.
     * @private
     * @method removeConstraintAt
     * @param {composite} composite
     * @param {number} position
     * @return {composite} The original composite with the constraint removed
     */
    Composite.removeConstraintAt = function(composite, position) {
        composite.constraints.splice(position, 1);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Removes all bodies, constraints and composites from the given composite.
     * Optionally clearing its children recursively.
     * @method clear
     * @param {composite} composite
     * @param {boolean} keepStatic
     * @param {boolean} [deep=false]
     */
    Composite.clear = function(composite, keepStatic, deep) {
        if (deep) {
            for (var i = 0; i < composite.composites.length; i++){
                Composite.clear(composite.composites[i], keepStatic, true);
            }
        }
        
        if (keepStatic) {
            composite.bodies = composite.bodies.filter(function(body) { return body.isStatic; });
        } else {
            composite.bodies.length = 0;
        }

        composite.constraints.length = 0;
        composite.composites.length = 0;
        Composite.setModified(composite, true, true, false);

        return composite;
    };

    /**
     * Returns all bodies in the given composite, including all bodies in its children, recursively.
     * @method allBodies
     * @param {composite} composite
     * @return {body[]} All the bodies
     */
    Composite.allBodies = function(composite) {
        var bodies = [].concat(composite.bodies);

        for (var i = 0; i < composite.composites.length; i++)
            bodies = bodies.concat(Composite.allBodies(composite.composites[i]));

        return bodies;
    };

    /**
     * Returns all constraints in the given composite, including all constraints in its children, recursively.
     * @method allConstraints
     * @param {composite} composite
     * @return {constraint[]} All the constraints
     */
    Composite.allConstraints = function(composite) {
        var constraints = [].concat(composite.constraints);

        for (var i = 0; i < composite.composites.length; i++)
            constraints = constraints.concat(Composite.allConstraints(composite.composites[i]));

        return constraints;
    };

    /**
     * Returns all composites in the given composite, including all composites in its children, recursively.
     * @method allComposites
     * @param {composite} composite
     * @return {composite[]} All the composites
     */
    Composite.allComposites = function(composite) {
        var composites = [].concat(composite.composites);

        for (var i = 0; i < composite.composites.length; i++)
            composites = composites.concat(Composite.allComposites(composite.composites[i]));

        return composites;
    };

    /**
     * Searches the composite recursively for an object matching the type and id supplied, null if not found.
     * @method get
     * @param {composite} composite
     * @param {number} id
     * @param {string} type
     * @return {object} The requested object, if found
     */
    Composite.get = function(composite, id, type) {
        var objects,
            object;

        switch (type) {
        case 'body':
            objects = Composite.allBodies(composite);
            break;
        case 'constraint':
            objects = Composite.allConstraints(composite);
            break;
        case 'composite':
            objects = Composite.allComposites(composite).concat(composite);
            break;
        }

        if (!objects)
            return null;

        object = objects.filter(function(object) { 
            return object.id.toString() === id.toString(); 
        });

        return object.length === 0 ? null : object[0];
    };

    /**
     * Moves the given object(s) from compositeA to compositeB (equal to a remove followed by an add).
     * @method move
     * @param {compositeA} compositeA
     * @param {object[]} objects
     * @param {compositeB} compositeB
     * @return {composite} Returns compositeA
     */
    Composite.move = function(compositeA, objects, compositeB) {
        Composite.remove(compositeA, objects);
        Composite.add(compositeB, objects);
        return compositeA;
    };

    /**
     * Assigns new ids for all objects in the composite, recursively.
     * @method rebase
     * @param {composite} composite
     * @return {composite} Returns composite
     */
    Composite.rebase = function(composite) {
        var objects = Composite.allBodies(composite)
                        .concat(Composite.allConstraints(composite))
                        .concat(Composite.allComposites(composite));

        for (var i = 0; i < objects.length; i++) {
            objects[i].id = Common.nextId();
        }

        Composite.setModified(composite, true, true, false);

        return composite;
    };

    /**
     * Translates all children in the composite by a given vector relative to their current positions, 
     * without imparting any velocity.
     * @method translate
     * @param {composite} composite
     * @param {vector} translation
     * @param {bool} [recursive=true]
     */
    Composite.translate = function(composite, translation, recursive) {
        var bodies = recursive ? Composite.allBodies(composite) : composite.bodies;

        for (var i = 0; i < bodies.length; i++) {
            Body.translate(bodies[i], translation);
        }

        Composite.setModified(composite, true, true, false);

        return composite;
    };

    /**
     * Rotates all children in the composite by a given angle about the given point, without imparting any angular velocity.
     * @method rotate
     * @param {composite} composite
     * @param {number} rotation
     * @param {vector} point
     * @param {bool} [recursive=true]
     */
    Composite.rotate = function(composite, rotation, point, recursive) {
        var cos = Math.cos(rotation),
            sin = Math.sin(rotation),
            bodies = recursive ? Composite.allBodies(composite) : composite.bodies;

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                dx = body.position.x - point.x,
                dy = body.position.y - point.y;
                
            Body.setPosition(body, {
                x: point.x + (dx * cos - dy * sin),
                y: point.y + (dx * sin + dy * cos)
            });

            Body.rotate(body, rotation);
        }

        Composite.setModified(composite, true, true, false);

        return composite;
    };

    /**
     * Scales all children in the composite, including updating physical properties (mass, area, axes, inertia), from a world-space point.
     * @method scale
     * @param {composite} composite
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {vector} point
     * @param {bool} [recursive=true]
     */
    Composite.scale = function(composite, scaleX, scaleY, point, recursive) {
        var bodies = recursive ? Composite.allBodies(composite) : composite.bodies;

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                dx = body.position.x - point.x,
                dy = body.position.y - point.y;
                
            Body.setPosition(body, {
                x: point.x + dx * scaleX,
                y: point.y + dy * scaleY
            });

            Body.scale(body, scaleX, scaleY);
        }

        Composite.setModified(composite, true, true, false);

        return composite;
    };

    /**
     * Returns the union of the bounds of all of the composite's bodies.
     * @method bounds
     * @param {composite} composite The composite.
     * @returns {bounds} The composite bounds.
     */
    Composite.bounds = function(composite) {
        var bodies = Composite.allBodies(composite),
            vertices = [];

        for (var i = 0; i < bodies.length; i += 1) {
            var body = bodies[i];
            vertices.push(body.bounds.min, body.bounds.max);
        }

        return Bounds.create(vertices);
    };

    /*
    *
    *  Events Documentation
    *
    */

    /**
    * Fired when a call to `Composite.add` is made, before objects have been added.
    *
    * @event beforeAdd
    * @param {} event An event object
    * @param {} event.object The object(s) to be added (may be a single body, constraint, composite or a mixed array of these)
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when a call to `Composite.add` is made, after objects have been added.
    *
    * @event afterAdd
    * @param {} event An event object
    * @param {} event.object The object(s) that have been added (may be a single body, constraint, composite or a mixed array of these)
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when a call to `Composite.remove` is made, before objects have been removed.
    *
    * @event beforeRemove
    * @param {} event An event object
    * @param {} event.object The object(s) to be removed (may be a single body, constraint, composite or a mixed array of these)
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when a call to `Composite.remove` is made, after objects have been removed.
    *
    * @event afterRemove
    * @param {} event An event object
    * @param {} event.object The object(s) that have been removed (may be a single body, constraint, composite or a mixed array of these)
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * An integer `Number` uniquely identifying number generated in `Composite.create` by `Common.nextId`.
     *
     * @property id
     * @type number
     */

    /**
     * A `String` denoting the type of object.
     *
     * @property type
     * @type string
     * @default "composite"
     * @readOnly
     */

    /**
     * An arbitrary `String` name to help the user identify and manage composites.
     *
     * @property label
     * @type string
     * @default "Composite"
     */

    /**
     * A flag that specifies whether the composite has been modified during the current step.
     * Most `Matter.Composite` methods will automatically set this flag to `true` to inform the engine of changes to be handled.
     * If you need to change it manually, you should use the `Composite.setModified` method.
     *
     * @property isModified
     * @type boolean
     * @default false
     */

    /**
     * The `Composite` that is the parent of this composite. It is automatically managed by the `Matter.Composite` methods.
     *
     * @property parent
     * @type composite
     * @default null
     */

    /**
     * An array of `Body` that are _direct_ children of this composite.
     * To add or remove bodies you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
     * If you wish to recursively find all descendants, you should use the `Composite.allBodies` method.
     *
     * @property bodies
     * @type body[]
     * @default []
     */

    /**
     * An array of `Constraint` that are _direct_ children of this composite.
     * To add or remove constraints you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
     * If you wish to recursively find all descendants, you should use the `Composite.allConstraints` method.
     *
     * @property constraints
     * @type constraint[]
     * @default []
     */

    /**
     * An array of `Composite` that are _direct_ children of this composite.
     * To add or remove composites you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
     * If you wish to recursively find all descendants, you should use the `Composite.allComposites` method.
     *
     * @property composites
     * @type composite[]
     * @default []
     */

    /**
     * An object reserved for storing plugin-specific properties.
     *
     * @property plugin
     * @type {}
     */

})();

},{"../core/Common":14,"../core/Events":16,"../geometry/Bounds":26,"./Body":1}],3:[function(_dereq_,module,exports){
/**
* The `Matter.World` module contains methods for creating and manipulating the world composite.
* A `Matter.World` is a `Matter.Composite` body, which is a collection of `Matter.Body`, `Matter.Constraint` and other `Matter.Composite`.
* A `Matter.World` has a few additional properties including `gravity` and `bounds`.
* It is important to use the functions in the `Matter.Composite` module to modify the world composite, rather than directly modifying its properties.
* There are also a few methods here that alias those in `Matter.Composite` for easier readability.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class World
* @extends Composite
*/

var World = {};

module.exports = World;

var Composite = _dereq_('./Composite');
var Constraint = _dereq_('../constraint/Constraint');
var Common = _dereq_('../core/Common');

(function() {

    /**
     * Creates a new world composite. The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @constructor
     * @param {} options
     * @return {world} A new world
     */
    World.create = function(options) {
        var composite = Composite.create();

        var defaults = {
            label: 'World',
            gravity: {
                x: 0,
                y: 1,
                scale: 0.001
            },
            bounds: { 
                min: { x: -Infinity, y: -Infinity }, 
                max: { x: Infinity, y: Infinity } 
            }
        };
        
        return Common.extend(composite, defaults, options);
    };

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * The gravity to apply on the world.
     *
     * @property gravity
     * @type object
     */

    /**
     * The gravity x component.
     *
     * @property gravity.x
     * @type object
     * @default 0
     */

    /**
     * The gravity y component.
     *
     * @property gravity.y
     * @type object
     * @default 1
     */

    /**
     * The gravity scale factor.
     *
     * @property gravity.scale
     * @type object
     * @default 0.001
     */

    /**
     * A `Bounds` object that defines the world bounds for collision detection.
     *
     * @property bounds
     * @type bounds
     * @default { min: { x: -Infinity, y: -Infinity }, max: { x: Infinity, y: Infinity } }
     */

    // World is a Composite body
    // see src/module/Outro.js for these aliases:
    
    /**
     * An alias for Composite.add
     * @method add
     * @param {world} world
     * @param {} object
     * @return {composite} The original world with the objects added
     */

    /**
     * An alias for Composite.remove
     * @method remove
     * @param {world} world
     * @param {} object
     * @param {boolean} [deep=false]
     * @return {composite} The original world with the objects removed
     */

    /**
     * An alias for Composite.clear
     * @method clear
     * @param {world} world
     * @param {boolean} keepStatic
     */

    /**
     * An alias for Composite.addComposite
     * @method addComposite
     * @param {world} world
     * @param {composite} composite
     * @return {world} The original world with the objects from composite added
     */
    
     /**
      * An alias for Composite.addBody
      * @method addBody
      * @param {world} world
      * @param {body} body
      * @return {world} The original world with the body added
      */

     /**
      * An alias for Composite.addConstraint
      * @method addConstraint
      * @param {world} world
      * @param {constraint} constraint
      * @return {world} The original world with the constraint added
      */

})();

},{"../constraint/Constraint":12,"../core/Common":14,"./Composite":2}],4:[function(_dereq_,module,exports){
/**
* The `Matter.Contact` module contains methods for creating and manipulating collision contacts.
*
* @class Contact
*/

var Contact = {};

module.exports = Contact;

(function() {

    /**
     * Creates a new contact.
     * @method create
     * @param {vertex} vertex
     * @return {contact} A new contact
     */
    Contact.create = function(vertex) {
        return {
            id: Contact.id(vertex),
            vertex: vertex,
            normalImpulse: 0,
            tangentImpulse: 0
        };
    };
    
    /**
     * Generates a contact id.
     * @method id
     * @param {vertex} vertex
     * @return {string} Unique contactID
     */
    Contact.id = function(vertex) {
        return vertex.body.id + '_' + vertex.index;
    };

})();

},{}],5:[function(_dereq_,module,exports){
/**
* The `Matter.Detector` module contains methods for detecting collisions given a set of pairs.
*
* @class Detector
*/

// TODO: speculative contacts

var Detector = {};

module.exports = Detector;

var SAT = _dereq_('./SAT');
var Pair = _dereq_('./Pair');
var Bounds = _dereq_('../geometry/Bounds');

(function() {

    /**
     * Finds all collisions given a list of pairs.
     * @method collisions
     * @param {pair[]} broadphasePairs
     * @param {engine} engine
     * @return {array} collisions
     */
    Detector.collisions = function(broadphasePairs, engine) {
        var collisions = [],
            pairsTable = engine.pairs.table;

        
        for (var i = 0; i < broadphasePairs.length; i++) {
            var bodyA = broadphasePairs[i][0], 
                bodyB = broadphasePairs[i][1];

            if ((bodyA.isStatic || bodyA.isSleeping) && (bodyB.isStatic || bodyB.isSleeping))
                continue;
            
            if (!Detector.canCollide(bodyA.collisionFilter, bodyB.collisionFilter))
                continue;


            // mid phase
            if (Bounds.overlaps(bodyA.bounds, bodyB.bounds)) {
                for (var j = bodyA.parts.length > 1 ? 1 : 0; j < bodyA.parts.length; j++) {
                    var partA = bodyA.parts[j];

                    for (var k = bodyB.parts.length > 1 ? 1 : 0; k < bodyB.parts.length; k++) {
                        var partB = bodyB.parts[k];

                        if ((partA === bodyA && partB === bodyB) || Bounds.overlaps(partA.bounds, partB.bounds)) {
                            // find a previous collision we could reuse
                            var pairId = Pair.id(partA, partB),
                                pair = pairsTable[pairId],
                                previousCollision;

                            if (pair && pair.isActive) {
                                previousCollision = pair.collision;
                            } else {
                                previousCollision = null;
                            }

                            // narrow phase
                            var collision = SAT.collides(partA, partB, previousCollision);


                            if (collision.collided) {
                                collisions.push(collision);
                            }
                        }
                    }
                }
            }
        }

        return collisions;
    };

    /**
     * Returns `true` if both supplied collision filters will allow a collision to occur.
     * See `body.collisionFilter` for more information.
     * @method canCollide
     * @param {} filterA
     * @param {} filterB
     * @return {bool} `true` if collision can occur
     */
    Detector.canCollide = function(filterA, filterB) {
        if (filterA.group === filterB.group && filterA.group !== 0)
            return filterA.group > 0;

        return (filterA.mask & filterB.category) !== 0 && (filterB.mask & filterA.category) !== 0;
    };

})();

},{"../geometry/Bounds":26,"./Pair":7,"./SAT":11}],6:[function(_dereq_,module,exports){
/**
* The `Matter.Grid` module contains methods for creating and manipulating collision broadphase grid structures.
*
* @class Grid
*/

var Grid = {};

module.exports = Grid;

var Pair = _dereq_('./Pair');
var Detector = _dereq_('./Detector');
var Common = _dereq_('../core/Common');

(function() {

    /**
     * Creates a new grid.
     * @method create
     * @param {} options
     * @return {grid} A new grid
     */
    Grid.create = function(options) {
        var defaults = {
            controller: Grid,
            detector: Detector.collisions,
            buckets: {},
            pairs: {},
            pairsList: [],
            bucketWidth: 48,
            bucketHeight: 48
        };

        return Common.extend(defaults, options);
    };

    /**
     * The width of a single grid bucket.
     *
     * @property bucketWidth
     * @type number
     * @default 48
     */

    /**
     * The height of a single grid bucket.
     *
     * @property bucketHeight
     * @type number
     * @default 48
     */

    /**
     * Updates the grid.
     * @method update
     * @param {grid} grid
     * @param {body[]} bodies
     * @param {engine} engine
     * @param {boolean} forceUpdate
     */
    Grid.update = function(grid, bodies, engine, forceUpdate) {
        var i, col, row,
            world = engine.world,
            buckets = grid.buckets,
            bucket,
            bucketId,
            gridChanged = false;


        for (i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            if (body.isSleeping && !forceUpdate)
                continue;

            // don't update out of world bodies
            if (body.bounds.max.x < world.bounds.min.x || body.bounds.min.x > world.bounds.max.x
                || body.bounds.max.y < world.bounds.min.y || body.bounds.min.y > world.bounds.max.y)
                continue;

            var newRegion = Grid._getRegion(grid, body);

            // if the body has changed grid region
            if (!body.region || newRegion.id !== body.region.id || forceUpdate) {


                if (!body.region || forceUpdate)
                    body.region = newRegion;

                var union = Grid._regionUnion(newRegion, body.region);

                // update grid buckets affected by region change
                // iterate over the union of both regions
                for (col = union.startCol; col <= union.endCol; col++) {
                    for (row = union.startRow; row <= union.endRow; row++) {
                        bucketId = Grid._getBucketId(col, row);
                        bucket = buckets[bucketId];

                        var isInsideNewRegion = (col >= newRegion.startCol && col <= newRegion.endCol
                                                && row >= newRegion.startRow && row <= newRegion.endRow);

                        var isInsideOldRegion = (col >= body.region.startCol && col <= body.region.endCol
                                                && row >= body.region.startRow && row <= body.region.endRow);

                        // remove from old region buckets
                        if (!isInsideNewRegion && isInsideOldRegion) {
                            if (isInsideOldRegion) {
                                if (bucket)
                                    Grid._bucketRemoveBody(grid, bucket, body);
                            }
                        }

                        // add to new region buckets
                        if (body.region === newRegion || (isInsideNewRegion && !isInsideOldRegion) || forceUpdate) {
                            if (!bucket)
                                bucket = Grid._createBucket(buckets, bucketId);
                            Grid._bucketAddBody(grid, bucket, body);
                        }
                    }
                }

                // set the new region
                body.region = newRegion;

                // flag changes so we can update pairs
                gridChanged = true;
            }
        }

        // update pairs list only if pairs changed (i.e. a body changed region)
        if (gridChanged)
            grid.pairsList = Grid._createActivePairsList(grid);
    };

    /**
     * Clears the grid.
     * @method clear
     * @param {grid} grid
     */
    Grid.clear = function(grid) {
        grid.buckets = {};
        grid.pairs = {};
        grid.pairsList = [];
    };

    /**
     * Finds the union of two regions.
     * @method _regionUnion
     * @private
     * @param {} regionA
     * @param {} regionB
     * @return {} region
     */
    Grid._regionUnion = function(regionA, regionB) {
        var startCol = Math.min(regionA.startCol, regionB.startCol),
            endCol = Math.max(regionA.endCol, regionB.endCol),
            startRow = Math.min(regionA.startRow, regionB.startRow),
            endRow = Math.max(regionA.endRow, regionB.endRow);

        return Grid._createRegion(startCol, endCol, startRow, endRow);
    };

    /**
     * Gets the region a given body falls in for a given grid.
     * @method _getRegion
     * @private
     * @param {} grid
     * @param {} body
     * @return {} region
     */
    Grid._getRegion = function(grid, body) {
        var bounds = body.bounds,
            startCol = Math.floor(bounds.min.x / grid.bucketWidth),
            endCol = Math.floor(bounds.max.x / grid.bucketWidth),
            startRow = Math.floor(bounds.min.y / grid.bucketHeight),
            endRow = Math.floor(bounds.max.y / grid.bucketHeight);

        return Grid._createRegion(startCol, endCol, startRow, endRow);
    };

    /**
     * Creates a region.
     * @method _createRegion
     * @private
     * @param {} startCol
     * @param {} endCol
     * @param {} startRow
     * @param {} endRow
     * @return {} region
     */
    Grid._createRegion = function(startCol, endCol, startRow, endRow) {
        return { 
            id: startCol + ',' + endCol + ',' + startRow + ',' + endRow,
            startCol: startCol, 
            endCol: endCol, 
            startRow: startRow, 
            endRow: endRow 
        };
    };

    /**
     * Gets the bucket id at the given position.
     * @method _getBucketId
     * @private
     * @param {} column
     * @param {} row
     * @return {string} bucket id
     */
    Grid._getBucketId = function(column, row) {
        return 'C' + column + 'R' + row;
    };

    /**
     * Creates a bucket.
     * @method _createBucket
     * @private
     * @param {} buckets
     * @param {} bucketId
     * @return {} bucket
     */
    Grid._createBucket = function(buckets, bucketId) {
        var bucket = buckets[bucketId] = [];
        return bucket;
    };

    /**
     * Adds a body to a bucket.
     * @method _bucketAddBody
     * @private
     * @param {} grid
     * @param {} bucket
     * @param {} body
     */
    Grid._bucketAddBody = function(grid, bucket, body) {
        // add new pairs
        for (var i = 0; i < bucket.length; i++) {
            var bodyB = bucket[i];

            if (body.id === bodyB.id || (body.isStatic && bodyB.isStatic))
                continue;

            // keep track of the number of buckets the pair exists in
            // important for Grid.update to work
            var pairId = Pair.id(body, bodyB),
                pair = grid.pairs[pairId];

            if (pair) {
                pair[2] += 1;
            } else {
                grid.pairs[pairId] = [body, bodyB, 1];
            }
        }

        // add to bodies (after pairs, otherwise pairs with self)
        bucket.push(body);
    };

    /**
     * Removes a body from a bucket.
     * @method _bucketRemoveBody
     * @private
     * @param {} grid
     * @param {} bucket
     * @param {} body
     */
    Grid._bucketRemoveBody = function(grid, bucket, body) {
        // remove from bucket
        bucket.splice(Common.indexOf(bucket, body), 1);

        // update pair counts
        for (var i = 0; i < bucket.length; i++) {
            // keep track of the number of buckets the pair exists in
            // important for _createActivePairsList to work
            var bodyB = bucket[i],
                pairId = Pair.id(body, bodyB),
                pair = grid.pairs[pairId];

            if (pair)
                pair[2] -= 1;
        }
    };

    /**
     * Generates a list of the active pairs in the grid.
     * @method _createActivePairsList
     * @private
     * @param {} grid
     * @return [] pairs
     */
    Grid._createActivePairsList = function(grid) {
        var pairKeys,
            pair,
            pairs = [];

        // grid.pairs is used as a hashmap
        pairKeys = Common.keys(grid.pairs);

        // iterate over grid.pairs
        for (var k = 0; k < pairKeys.length; k++) {
            pair = grid.pairs[pairKeys[k]];

            // if pair exists in at least one bucket
            // it is a pair that needs further collision testing so push it
            if (pair[2] > 0) {
                pairs.push(pair);
            } else {
                delete grid.pairs[pairKeys[k]];
            }
        }

        return pairs;
    };
    
})();

},{"../core/Common":14,"./Detector":5,"./Pair":7}],7:[function(_dereq_,module,exports){
/**
* The `Matter.Pair` module contains methods for creating and manipulating collision pairs.
*
* @class Pair
*/

var Pair = {};

module.exports = Pair;

var Contact = _dereq_('./Contact');

(function() {
    
    /**
     * Creates a pair.
     * @method create
     * @param {collision} collision
     * @param {number} timestamp
     * @return {pair} A new pair
     */
    Pair.create = function(collision, timestamp) {
        var bodyA = collision.bodyA,
            bodyB = collision.bodyB,
            parentA = collision.parentA,
            parentB = collision.parentB;

        var pair = {
            id: Pair.id(bodyA, bodyB),
            bodyA: bodyA,
            bodyB: bodyB,
            contacts: {},
            activeContacts: [],
            separation: 0,
            isActive: true,
            isSensor: bodyA.isSensor || bodyB.isSensor,
            timeCreated: timestamp,
            timeUpdated: timestamp,
            inverseMass: parentA.inverseMass + parentB.inverseMass,
            friction: Math.min(parentA.friction, parentB.friction),
            frictionStatic: Math.max(parentA.frictionStatic, parentB.frictionStatic),
            restitution: Math.max(parentA.restitution, parentB.restitution),
            slop: Math.max(parentA.slop, parentB.slop)
        };

        Pair.update(pair, collision, timestamp);

        return pair;
    };

    /**
     * Updates a pair given a collision.
     * @method update
     * @param {pair} pair
     * @param {collision} collision
     * @param {number} timestamp
     */
    Pair.update = function(pair, collision, timestamp) {
        var contacts = pair.contacts,
            supports = collision.supports,
            activeContacts = pair.activeContacts,
            parentA = collision.parentA,
            parentB = collision.parentB;
        
        pair.collision = collision;
        pair.inverseMass = parentA.inverseMass + parentB.inverseMass;
        pair.friction = Math.min(parentA.friction, parentB.friction);
        pair.frictionStatic = Math.max(parentA.frictionStatic, parentB.frictionStatic);
        pair.restitution = Math.max(parentA.restitution, parentB.restitution);
        pair.slop = Math.max(parentA.slop, parentB.slop);
        activeContacts.length = 0;
        
        if (collision.collided) {
            for (var i = 0; i < supports.length; i++) {
                var support = supports[i],
                    contactId = Contact.id(support),
                    contact = contacts[contactId];

                if (contact) {
                    activeContacts.push(contact);
                } else {
                    activeContacts.push(contacts[contactId] = Contact.create(support));
                }
            }

            pair.separation = collision.depth;
            Pair.setActive(pair, true, timestamp);
        } else {
            if (pair.isActive === true)
                Pair.setActive(pair, false, timestamp);
        }
    };
    
    /**
     * Set a pair as active or inactive.
     * @method setActive
     * @param {pair} pair
     * @param {bool} isActive
     * @param {number} timestamp
     */
    Pair.setActive = function(pair, isActive, timestamp) {
        if (isActive) {
            pair.isActive = true;
            pair.timeUpdated = timestamp;
        } else {
            pair.isActive = false;
            pair.activeContacts.length = 0;
        }
    };

    /**
     * Get the id for the given pair.
     * @method id
     * @param {body} bodyA
     * @param {body} bodyB
     * @return {string} Unique pairId
     */
    Pair.id = function(bodyA, bodyB) {
        if (bodyA.id < bodyB.id) {
            return 'A' + bodyA.id + 'B' + bodyB.id;
        } else {
            return 'A' + bodyB.id + 'B' + bodyA.id;
        }
    };

})();

},{"./Contact":4}],8:[function(_dereq_,module,exports){
/**
* The `Matter.Pairs` module contains methods for creating and manipulating collision pair sets.
*
* @class Pairs
*/

var Pairs = {};

module.exports = Pairs;

var Pair = _dereq_('./Pair');
var Common = _dereq_('../core/Common');

(function() {
    
    Pairs._pairMaxIdleLife = 1000;

    /**
     * Creates a new pairs structure.
     * @method create
     * @param {object} options
     * @return {pairs} A new pairs structure
     */
    Pairs.create = function(options) {
        return Common.extend({ 
            table: {},
            list: [],
            collisionStart: [],
            collisionActive: [],
            collisionEnd: []
        }, options);
    };

    /**
     * Updates pairs given a list of collisions.
     * @method update
     * @param {object} pairs
     * @param {collision[]} collisions
     * @param {number} timestamp
     */
    Pairs.update = function(pairs, collisions, timestamp) {
        var pairsList = pairs.list,
            pairsTable = pairs.table,
            collisionStart = pairs.collisionStart,
            collisionEnd = pairs.collisionEnd,
            collisionActive = pairs.collisionActive,
            activePairIds = [],
            collision,
            pairId,
            pair,
            i;

        // clear collision state arrays, but maintain old reference
        collisionStart.length = 0;
        collisionEnd.length = 0;
        collisionActive.length = 0;

        for (i = 0; i < collisions.length; i++) {
            collision = collisions[i];

            if (collision.collided) {
                pairId = Pair.id(collision.bodyA, collision.bodyB);
                activePairIds.push(pairId);

                pair = pairsTable[pairId];
                
                if (pair) {
                    // pair already exists (but may or may not be active)
                    if (pair.isActive) {
                        // pair exists and is active
                        collisionActive.push(pair);
                    } else {
                        // pair exists but was inactive, so a collision has just started again
                        collisionStart.push(pair);
                    }

                    // update the pair
                    Pair.update(pair, collision, timestamp);
                } else {
                    // pair did not exist, create a new pair
                    pair = Pair.create(collision, timestamp);
                    pairsTable[pairId] = pair;

                    // push the new pair
                    collisionStart.push(pair);
                    pairsList.push(pair);
                }
            }
        }

        // deactivate previously active pairs that are now inactive
        for (i = 0; i < pairsList.length; i++) {
            pair = pairsList[i];
            if (pair.isActive && Common.indexOf(activePairIds, pair.id) === -1) {
                Pair.setActive(pair, false, timestamp);
                collisionEnd.push(pair);
            }
        }
    };
    
    /**
     * Finds and removes pairs that have been inactive for a set amount of time.
     * @method removeOld
     * @param {object} pairs
     * @param {number} timestamp
     */
    Pairs.removeOld = function(pairs, timestamp) {
        var pairsList = pairs.list,
            pairsTable = pairs.table,
            indexesToRemove = [],
            pair,
            collision,
            pairIndex,
            i;

        for (i = 0; i < pairsList.length; i++) {
            pair = pairsList[i];
            collision = pair.collision;
            
            // never remove sleeping pairs
            if (collision.bodyA.isSleeping || collision.bodyB.isSleeping) {
                pair.timeUpdated = timestamp;
                continue;
            }

            // if pair is inactive for too long, mark it to be removed
            if (timestamp - pair.timeUpdated > Pairs._pairMaxIdleLife) {
                indexesToRemove.push(i);
            }
        }

        // remove marked pairs
        for (i = 0; i < indexesToRemove.length; i++) {
            pairIndex = indexesToRemove[i] - i;
            pair = pairsList[pairIndex];
            delete pairsTable[pair.id];
            pairsList.splice(pairIndex, 1);
        }
    };

    /**
     * Clears the given pairs structure.
     * @method clear
     * @param {pairs} pairs
     * @return {pairs} pairs
     */
    Pairs.clear = function(pairs) {
        pairs.table = {};
        pairs.list.length = 0;
        pairs.collisionStart.length = 0;
        pairs.collisionActive.length = 0;
        pairs.collisionEnd.length = 0;
        return pairs;
    };

})();

},{"../core/Common":14,"./Pair":7}],9:[function(_dereq_,module,exports){
/**
* The `Matter.Query` module contains methods for performing collision queries.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Query
*/

var Query = {};

module.exports = Query;

var Vector = _dereq_('../geometry/Vector');
var SAT = _dereq_('./SAT');
var Bounds = _dereq_('../geometry/Bounds');
var Bodies = _dereq_('../factory/Bodies');
var Vertices = _dereq_('../geometry/Vertices');

(function() {

    /**
     * Returns a list of collisions between `body` and `bodies`.
     * @method collides
     * @param {body} body
     * @param {body[]} bodies
     * @return {object[]} Collisions
     */
    Query.collides = function(body, bodies) {
        var collisions = [];

        for (var i = 0; i < bodies.length; i++) {
            var bodyA = bodies[i];
            
            if (Bounds.overlaps(bodyA.bounds, body.bounds)) {
                for (var j = bodyA.parts.length === 1 ? 0 : 1; j < bodyA.parts.length; j++) {
                    var part = bodyA.parts[j];

                    if (Bounds.overlaps(part.bounds, body.bounds)) {
                        var collision = SAT.collides(part, body);

                        if (collision.collided) {
                            collisions.push(collision);
                            break;
                        }
                    }
                }
            }
        }

        return collisions;
    };

    /**
     * Casts a ray segment against a set of bodies and returns all collisions, ray width is optional. Intersection points are not provided.
     * @method ray
     * @param {body[]} bodies
     * @param {vector} startPoint
     * @param {vector} endPoint
     * @param {number} [rayWidth]
     * @return {object[]} Collisions
     */
    Query.ray = function(bodies, startPoint, endPoint, rayWidth) {
        rayWidth = rayWidth || 1e-100;

        var rayAngle = Vector.angle(startPoint, endPoint),
            rayLength = Vector.magnitude(Vector.sub(startPoint, endPoint)),
            rayX = (endPoint.x + startPoint.x) * 0.5,
            rayY = (endPoint.y + startPoint.y) * 0.5,
            ray = Bodies.rectangle(rayX, rayY, rayLength, rayWidth, { angle: rayAngle }),
            collisions = Query.collides(ray, bodies);

        for (var i = 0; i < collisions.length; i += 1) {
            var collision = collisions[i];
            collision.body = collision.bodyB = collision.bodyA;            
        }

        return collisions;
    };

    /**
     * Returns all bodies whose bounds are inside (or outside if set) the given set of bounds, from the given set of bodies.
     * @method region
     * @param {body[]} bodies
     * @param {bounds} bounds
     * @param {bool} [outside=false]
     * @return {body[]} The bodies matching the query
     */
    Query.region = function(bodies, bounds, outside) {
        var result = [];

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                overlaps = Bounds.overlaps(body.bounds, bounds);
            if ((overlaps && !outside) || (!overlaps && outside))
                result.push(body);
        }

        return result;
    };

    /**
     * Returns all bodies whose vertices contain the given point, from the given set of bodies.
     * @method point
     * @param {body[]} bodies
     * @param {vector} point
     * @return {body[]} The bodies matching the query
     */
    Query.point = function(bodies, point) {
        var result = [];

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];
            
            if (Bounds.contains(body.bounds, point)) {
                for (var j = body.parts.length === 1 ? 0 : 1; j < body.parts.length; j++) {
                    var part = body.parts[j];

                    if (Bounds.contains(part.bounds, point)
                        && Vertices.contains(part.vertices, point)) {
                        result.push(body);
                        break;
                    }
                }
            }
        }

        return result;
    };

})();

},{"../factory/Bodies":23,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29,"./SAT":11}],10:[function(_dereq_,module,exports){
/**
* The `Matter.Resolver` module contains methods for resolving collision pairs.
*
* @class Resolver
*/

var Resolver = {};

module.exports = Resolver;

var Vertices = _dereq_('../geometry/Vertices');
var Vector = _dereq_('../geometry/Vector');
var Common = _dereq_('../core/Common');
var Bounds = _dereq_('../geometry/Bounds');

(function() {

    Resolver._restingThresh = 4;
    Resolver._restingThreshTangent = 6;
    Resolver._positionDampen = 0.9;
    Resolver._positionWarming = 0.8;
    Resolver._frictionNormalMultiplier = 5;

    /**
     * Prepare pairs for position solving.
     * @method preSolvePosition
     * @param {pair[]} pairs
     */
    Resolver.preSolvePosition = function(pairs) {
        var i,
            pair,
            activeCount;

        // find total contacts on each body
        for (i = 0; i < pairs.length; i++) {
            pair = pairs[i];
            
            if (!pair.isActive)
                continue;
            
            activeCount = pair.activeContacts.length;
            pair.collision.parentA.totalContacts += activeCount;
            pair.collision.parentB.totalContacts += activeCount;
        }
    };

    /**
     * Find a solution for pair positions.
     * @method solvePosition
     * @param {pair[]} pairs
     * @param {number} timeScale
     */
    Resolver.solvePosition = function(pairs, timeScale) {
        var i,
            pair,
            collision,
            bodyA,
            bodyB,
            normal,
            bodyBtoA,
            contactShare,
            positionImpulse,
            contactCount = {},
            tempA = Vector._temp[0],
            tempB = Vector._temp[1],
            tempC = Vector._temp[2],
            tempD = Vector._temp[3];

        // find impulses required to resolve penetration
        for (i = 0; i < pairs.length; i++) {
            pair = pairs[i];
            
            if (!pair.isActive || pair.isSensor)
                continue;

            collision = pair.collision;
            bodyA = collision.parentA;
            bodyB = collision.parentB;
            normal = collision.normal;

            // get current separation between body edges involved in collision
            bodyBtoA = Vector.sub(Vector.add(bodyB.positionImpulse, bodyB.position, tempA), 
                                    Vector.add(bodyA.positionImpulse, 
                                        Vector.sub(bodyB.position, collision.penetration, tempB), tempC), tempD);

            pair.separation = Vector.dot(normal, bodyBtoA);
        }
        
        for (i = 0; i < pairs.length; i++) {
            pair = pairs[i];

            if (!pair.isActive || pair.isSensor)
                continue;
            
            collision = pair.collision;
            bodyA = collision.parentA;
            bodyB = collision.parentB;
            normal = collision.normal;
            positionImpulse = (pair.separation - pair.slop) * timeScale;

            if (bodyA.isStatic || bodyB.isStatic)
                positionImpulse *= 2;
            
            if (!(bodyA.isStatic || bodyA.isSleeping)) {
                contactShare = Resolver._positionDampen / bodyA.totalContacts;
                bodyA.positionImpulse.x += normal.x * positionImpulse * contactShare;
                bodyA.positionImpulse.y += normal.y * positionImpulse * contactShare;
            }

            if (!(bodyB.isStatic || bodyB.isSleeping)) {
                contactShare = Resolver._positionDampen / bodyB.totalContacts;
                bodyB.positionImpulse.x -= normal.x * positionImpulse * contactShare;
                bodyB.positionImpulse.y -= normal.y * positionImpulse * contactShare;
            }
        }
    };

    /**
     * Apply position resolution.
     * @method postSolvePosition
     * @param {body[]} bodies
     */
    Resolver.postSolvePosition = function(bodies) {
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            // reset contact count
            body.totalContacts = 0;

            if (body.positionImpulse.x !== 0 || body.positionImpulse.y !== 0) {
                // update body geometry
                for (var j = 0; j < body.parts.length; j++) {
                    var part = body.parts[j];
                    Vertices.translate(part.vertices, body.positionImpulse);
                    Bounds.update(part.bounds, part.vertices, body.velocity);
                    part.position.x += body.positionImpulse.x;
                    part.position.y += body.positionImpulse.y;
                }

                // move the body without changing velocity
                body.positionPrev.x += body.positionImpulse.x;
                body.positionPrev.y += body.positionImpulse.y;

                if (Vector.dot(body.positionImpulse, body.velocity) < 0) {
                    // reset cached impulse if the body has velocity along it
                    body.positionImpulse.x = 0;
                    body.positionImpulse.y = 0;
                } else {
                    // warm the next iteration
                    body.positionImpulse.x *= Resolver._positionWarming;
                    body.positionImpulse.y *= Resolver._positionWarming;
                }
            }
        }
    };

    /**
     * Prepare pairs for velocity solving.
     * @method preSolveVelocity
     * @param {pair[]} pairs
     */
    Resolver.preSolveVelocity = function(pairs) {
        var i,
            j,
            pair,
            contacts,
            collision,
            bodyA,
            bodyB,
            normal,
            tangent,
            contact,
            contactVertex,
            normalImpulse,
            tangentImpulse,
            offset,
            impulse = Vector._temp[0],
            tempA = Vector._temp[1];
        
        for (i = 0; i < pairs.length; i++) {
            pair = pairs[i];
            
            if (!pair.isActive || pair.isSensor)
                continue;
            
            contacts = pair.activeContacts;
            collision = pair.collision;
            bodyA = collision.parentA;
            bodyB = collision.parentB;
            normal = collision.normal;
            tangent = collision.tangent;

            // resolve each contact
            for (j = 0; j < contacts.length; j++) {
                contact = contacts[j];
                contactVertex = contact.vertex;
                normalImpulse = contact.normalImpulse;
                tangentImpulse = contact.tangentImpulse;

                if (normalImpulse !== 0 || tangentImpulse !== 0) {
                    // total impulse from contact
                    impulse.x = (normal.x * normalImpulse) + (tangent.x * tangentImpulse);
                    impulse.y = (normal.y * normalImpulse) + (tangent.y * tangentImpulse);
                    
                    // apply impulse from contact
                    if (!(bodyA.isStatic || bodyA.isSleeping)) {
                        offset = Vector.sub(contactVertex, bodyA.position, tempA);
                        bodyA.positionPrev.x += impulse.x * bodyA.inverseMass;
                        bodyA.positionPrev.y += impulse.y * bodyA.inverseMass;
                        bodyA.anglePrev += Vector.cross(offset, impulse) * bodyA.inverseInertia;
                    }

                    if (!(bodyB.isStatic || bodyB.isSleeping)) {
                        offset = Vector.sub(contactVertex, bodyB.position, tempA);
                        bodyB.positionPrev.x -= impulse.x * bodyB.inverseMass;
                        bodyB.positionPrev.y -= impulse.y * bodyB.inverseMass;
                        bodyB.anglePrev -= Vector.cross(offset, impulse) * bodyB.inverseInertia;
                    }
                }
            }
        }
    };

    /**
     * Find a solution for pair velocities.
     * @method solveVelocity
     * @param {pair[]} pairs
     * @param {number} timeScale
     */
    Resolver.solveVelocity = function(pairs, timeScale) {
        var timeScaleSquared = timeScale * timeScale,
            impulse = Vector._temp[0],
            tempA = Vector._temp[1],
            tempB = Vector._temp[2],
            tempC = Vector._temp[3],
            tempD = Vector._temp[4],
            tempE = Vector._temp[5];
        
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            
            if (!pair.isActive || pair.isSensor)
                continue;
            
            var collision = pair.collision,
                bodyA = collision.parentA,
                bodyB = collision.parentB,
                normal = collision.normal,
                tangent = collision.tangent,
                contacts = pair.activeContacts,
                contactShare = 1 / contacts.length;

            // update body velocities
            bodyA.velocity.x = bodyA.position.x - bodyA.positionPrev.x;
            bodyA.velocity.y = bodyA.position.y - bodyA.positionPrev.y;
            bodyB.velocity.x = bodyB.position.x - bodyB.positionPrev.x;
            bodyB.velocity.y = bodyB.position.y - bodyB.positionPrev.y;
            bodyA.angularVelocity = bodyA.angle - bodyA.anglePrev;
            bodyB.angularVelocity = bodyB.angle - bodyB.anglePrev;

            // resolve each contact
            for (var j = 0; j < contacts.length; j++) {
                var contact = contacts[j],
                    contactVertex = contact.vertex,
                    offsetA = Vector.sub(contactVertex, bodyA.position, tempA),
                    offsetB = Vector.sub(contactVertex, bodyB.position, tempB),
                    velocityPointA = Vector.add(bodyA.velocity, Vector.mult(Vector.perp(offsetA), bodyA.angularVelocity), tempC),
                    velocityPointB = Vector.add(bodyB.velocity, Vector.mult(Vector.perp(offsetB), bodyB.angularVelocity), tempD), 
                    relativeVelocity = Vector.sub(velocityPointA, velocityPointB, tempE),
                    normalVelocity = Vector.dot(normal, relativeVelocity);

                var tangentVelocity = Vector.dot(tangent, relativeVelocity),
                    tangentSpeed = Math.abs(tangentVelocity),
                    tangentVelocityDirection = Common.sign(tangentVelocity);

                // raw impulses
                var normalImpulse = (1 + pair.restitution) * normalVelocity,
                    normalForce = Common.clamp(pair.separation + normalVelocity, 0, 1) * Resolver._frictionNormalMultiplier;

                // coulomb friction
                var tangentImpulse = tangentVelocity,
                    maxFriction = Infinity;

                if (tangentSpeed > pair.friction * pair.frictionStatic * normalForce * timeScaleSquared) {
                    maxFriction = tangentSpeed;
                    tangentImpulse = Common.clamp(
                        pair.friction * tangentVelocityDirection * timeScaleSquared,
                        -maxFriction, maxFriction
                    );
                }

                // modify impulses accounting for mass, inertia and offset
                var oAcN = Vector.cross(offsetA, normal),
                    oBcN = Vector.cross(offsetB, normal),
                    share = contactShare / (bodyA.inverseMass + bodyB.inverseMass + bodyA.inverseInertia * oAcN * oAcN  + bodyB.inverseInertia * oBcN * oBcN);

                normalImpulse *= share;
                tangentImpulse *= share;

                // handle high velocity and resting collisions separately
                if (normalVelocity < 0 && normalVelocity * normalVelocity > Resolver._restingThresh * timeScaleSquared) {
                    // high normal velocity so clear cached contact normal impulse
                    contact.normalImpulse = 0;
                } else {
                    // solve resting collision constraints using Erin Catto's method (GDC08)
                    // impulse constraint tends to 0
                    var contactNormalImpulse = contact.normalImpulse;
                    contact.normalImpulse = Math.min(contact.normalImpulse + normalImpulse, 0);
                    normalImpulse = contact.normalImpulse - contactNormalImpulse;
                }

                // handle high velocity and resting collisions separately
                if (tangentVelocity * tangentVelocity > Resolver._restingThreshTangent * timeScaleSquared) {
                    // high tangent velocity so clear cached contact tangent impulse
                    contact.tangentImpulse = 0;
                } else {
                    // solve resting collision constraints using Erin Catto's method (GDC08)
                    // tangent impulse tends to -tangentSpeed or +tangentSpeed
                    var contactTangentImpulse = contact.tangentImpulse;
                    contact.tangentImpulse = Common.clamp(contact.tangentImpulse + tangentImpulse, -maxFriction, maxFriction);
                    tangentImpulse = contact.tangentImpulse - contactTangentImpulse;
                }

                // total impulse from contact
                impulse.x = (normal.x * normalImpulse) + (tangent.x * tangentImpulse);
                impulse.y = (normal.y * normalImpulse) + (tangent.y * tangentImpulse);
                
                // apply impulse from contact
                if (!(bodyA.isStatic || bodyA.isSleeping)) {
                    bodyA.positionPrev.x += impulse.x * bodyA.inverseMass;
                    bodyA.positionPrev.y += impulse.y * bodyA.inverseMass;
                    bodyA.anglePrev += Vector.cross(offsetA, impulse) * bodyA.inverseInertia;
                }

                if (!(bodyB.isStatic || bodyB.isSleeping)) {
                    bodyB.positionPrev.x -= impulse.x * bodyB.inverseMass;
                    bodyB.positionPrev.y -= impulse.y * bodyB.inverseMass;
                    bodyB.anglePrev -= Vector.cross(offsetB, impulse) * bodyB.inverseInertia;
                }
            }
        }
    };

})();

},{"../core/Common":14,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29}],11:[function(_dereq_,module,exports){
/**
* The `Matter.SAT` module contains methods for detecting collisions using the Separating Axis Theorem.
*
* @class SAT
*/

// TODO: true circles and curves

var SAT = {};

module.exports = SAT;

var Vertices = _dereq_('../geometry/Vertices');
var Vector = _dereq_('../geometry/Vector');

(function() {

    /**
     * Detect collision between two bodies using the Separating Axis Theorem.
     * @method collides
     * @param {body} bodyA
     * @param {body} bodyB
     * @param {collision} previousCollision
     * @return {collision} collision
     */
    SAT.collides = function(bodyA, bodyB, previousCollision) {
        var overlapAB,
            overlapBA, 
            minOverlap,
            collision,
            canReusePrevCol = false;

        if (previousCollision) {
            // estimate total motion
            var parentA = bodyA.parent,
                parentB = bodyB.parent,
                motion = parentA.speed * parentA.speed + parentA.angularSpeed * parentA.angularSpeed
                       + parentB.speed * parentB.speed + parentB.angularSpeed * parentB.angularSpeed;

            // we may be able to (partially) reuse collision result 
            // but only safe if collision was resting
            canReusePrevCol = previousCollision && previousCollision.collided && motion < 0.2;

            // reuse collision object
            collision = previousCollision;
        } else {
            collision = { collided: false, bodyA: bodyA, bodyB: bodyB };
        }

        if (previousCollision && canReusePrevCol) {
            // if we can reuse the collision result
            // we only need to test the previously found axis
            var axisBodyA = collision.axisBody,
                axisBodyB = axisBodyA === bodyA ? bodyB : bodyA,
                axes = [axisBodyA.axes[previousCollision.axisNumber]];

            minOverlap = SAT._overlapAxes(axisBodyA.vertices, axisBodyB.vertices, axes);
            collision.reused = true;

            if (minOverlap.overlap <= 0) {
                collision.collided = false;
                return collision;
            }
        } else {
            // if we can't reuse a result, perform a full SAT test

            overlapAB = SAT._overlapAxes(bodyA.vertices, bodyB.vertices, bodyA.axes);

            if (overlapAB.overlap <= 0) {
                collision.collided = false;
                return collision;
            }

            overlapBA = SAT._overlapAxes(bodyB.vertices, bodyA.vertices, bodyB.axes);

            if (overlapBA.overlap <= 0) {
                collision.collided = false;
                return collision;
            }

            if (overlapAB.overlap < overlapBA.overlap) {
                minOverlap = overlapAB;
                collision.axisBody = bodyA;
            } else {
                minOverlap = overlapBA;
                collision.axisBody = bodyB;
            }

            // important for reuse later
            collision.axisNumber = minOverlap.axisNumber;
        }

        collision.bodyA = bodyA.id < bodyB.id ? bodyA : bodyB;
        collision.bodyB = bodyA.id < bodyB.id ? bodyB : bodyA;
        collision.collided = true;
        collision.depth = minOverlap.overlap;
        collision.parentA = collision.bodyA.parent;
        collision.parentB = collision.bodyB.parent;
        
        bodyA = collision.bodyA;
        bodyB = collision.bodyB;

        // ensure normal is facing away from bodyA
        if (Vector.dot(minOverlap.axis, Vector.sub(bodyB.position, bodyA.position)) < 0) {
            collision.normal = {
                x: minOverlap.axis.x,
                y: minOverlap.axis.y
            };
        } else {
            collision.normal = {
                x: -minOverlap.axis.x,
                y: -minOverlap.axis.y
            };
        }

        collision.tangent = Vector.perp(collision.normal);

        collision.penetration = collision.penetration || {};
        collision.penetration.x = collision.normal.x * collision.depth;
        collision.penetration.y = collision.normal.y * collision.depth; 

        // find support points, there is always either exactly one or two
        var verticesB = SAT._findSupports(bodyA, bodyB, collision.normal),
            supports = [];

        // find the supports from bodyB that are inside bodyA
        if (Vertices.contains(bodyA.vertices, verticesB[0]))
            supports.push(verticesB[0]);

        if (Vertices.contains(bodyA.vertices, verticesB[1]))
            supports.push(verticesB[1]);

        // find the supports from bodyA that are inside bodyB
        if (supports.length < 2) {
            var verticesA = SAT._findSupports(bodyB, bodyA, Vector.neg(collision.normal));
                
            if (Vertices.contains(bodyB.vertices, verticesA[0]))
                supports.push(verticesA[0]);

            if (supports.length < 2 && Vertices.contains(bodyB.vertices, verticesA[1]))
                supports.push(verticesA[1]);
        }

        // account for the edge case of overlapping but no vertex containment
        if (supports.length < 1)
            supports = [verticesB[0]];
        
        collision.supports = supports;

        return collision;
    };

    /**
     * Find the overlap between two sets of vertices.
     * @method _overlapAxes
     * @private
     * @param {} verticesA
     * @param {} verticesB
     * @param {} axes
     * @return result
     */
    SAT._overlapAxes = function(verticesA, verticesB, axes) {
        var projectionA = Vector._temp[0], 
            projectionB = Vector._temp[1],
            result = { overlap: Number.MAX_VALUE },
            overlap,
            axis;

        for (var i = 0; i < axes.length; i++) {
            axis = axes[i];

            SAT._projectToAxis(projectionA, verticesA, axis);
            SAT._projectToAxis(projectionB, verticesB, axis);

            overlap = Math.min(projectionA.max - projectionB.min, projectionB.max - projectionA.min);

            if (overlap <= 0) {
                result.overlap = overlap;
                return result;
            }

            if (overlap < result.overlap) {
                result.overlap = overlap;
                result.axis = axis;
                result.axisNumber = i;
            }
        }

        return result;
    };

    /**
     * Projects vertices on an axis and returns an interval.
     * @method _projectToAxis
     * @private
     * @param {} projection
     * @param {} vertices
     * @param {} axis
     */
    SAT._projectToAxis = function(projection, vertices, axis) {
        var min = Vector.dot(vertices[0], axis),
            max = min;

        for (var i = 1; i < vertices.length; i += 1) {
            var dot = Vector.dot(vertices[i], axis);

            if (dot > max) { 
                max = dot; 
            } else if (dot < min) { 
                min = dot; 
            }
        }

        projection.min = min;
        projection.max = max;
    };
    
    /**
     * Finds supporting vertices given two bodies along a given direction using hill-climbing.
     * @method _findSupports
     * @private
     * @param {} bodyA
     * @param {} bodyB
     * @param {} normal
     * @return [vector]
     */
    SAT._findSupports = function(bodyA, bodyB, normal) {
        var nearestDistance = Number.MAX_VALUE,
            vertexToBody = Vector._temp[0],
            vertices = bodyB.vertices,
            bodyAPosition = bodyA.position,
            distance,
            vertex,
            vertexA,
            vertexB;

        // find closest vertex on bodyB
        for (var i = 0; i < vertices.length; i++) {
            vertex = vertices[i];
            vertexToBody.x = vertex.x - bodyAPosition.x;
            vertexToBody.y = vertex.y - bodyAPosition.y;
            distance = -Vector.dot(normal, vertexToBody);

            if (distance < nearestDistance) {
                nearestDistance = distance;
                vertexA = vertex;
            }
        }

        // find next closest vertex using the two connected to it
        var prevIndex = vertexA.index - 1 >= 0 ? vertexA.index - 1 : vertices.length - 1;
        vertex = vertices[prevIndex];
        vertexToBody.x = vertex.x - bodyAPosition.x;
        vertexToBody.y = vertex.y - bodyAPosition.y;
        nearestDistance = -Vector.dot(normal, vertexToBody);
        vertexB = vertex;

        var nextIndex = (vertexA.index + 1) % vertices.length;
        vertex = vertices[nextIndex];
        vertexToBody.x = vertex.x - bodyAPosition.x;
        vertexToBody.y = vertex.y - bodyAPosition.y;
        distance = -Vector.dot(normal, vertexToBody);
        if (distance < nearestDistance) {
            vertexB = vertex;
        }

        return [vertexA, vertexB];
    };

})();

},{"../geometry/Vector":28,"../geometry/Vertices":29}],12:[function(_dereq_,module,exports){
/**
* The `Matter.Constraint` module contains methods for creating and manipulating constraints.
* Constraints are used for specifying that a fixed distance must be maintained between two bodies (or a body and a fixed world-space position).
* The stiffness of constraints can be modified to create springs or elastic.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Constraint
*/

var Constraint = {};

module.exports = Constraint;

var Vertices = _dereq_('../geometry/Vertices');
var Vector = _dereq_('../geometry/Vector');
var Sleeping = _dereq_('../core/Sleeping');
var Bounds = _dereq_('../geometry/Bounds');
var Axes = _dereq_('../geometry/Axes');
var Common = _dereq_('../core/Common');

(function() {

    Constraint._warming = 0.4;
    Constraint._torqueDampen = 1;
    Constraint._minLength = 0.000001;

    /**
     * Creates a new constraint.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * To simulate a revolute constraint (or pin joint) set `length: 0` and a high `stiffness` value (e.g. `0.7` or above).
     * If the constraint is unstable, try lowering the `stiffness` value and / or increasing `engine.constraintIterations`.
     * For compound bodies, constraints must be applied to the parent body (not one of its parts).
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {} options
     * @return {constraint} constraint
     */
    Constraint.create = function(options) {
        var constraint = options;

        // if bodies defined but no points, use body centre
        if (constraint.bodyA && !constraint.pointA)
            constraint.pointA = { x: 0, y: 0 };
        if (constraint.bodyB && !constraint.pointB)
            constraint.pointB = { x: 0, y: 0 };

        // calculate static length using initial world space points
        var initialPointA = constraint.bodyA ? Vector.add(constraint.bodyA.position, constraint.pointA) : constraint.pointA,
            initialPointB = constraint.bodyB ? Vector.add(constraint.bodyB.position, constraint.pointB) : constraint.pointB,
            length = Vector.magnitude(Vector.sub(initialPointA, initialPointB));
    
        constraint.length = typeof constraint.length !== 'undefined' ? constraint.length : length;

        // option defaults
        constraint.id = constraint.id || Common.nextId();
        constraint.label = constraint.label || 'Constraint';
        constraint.type = 'constraint';
        constraint.stiffness = constraint.stiffness || (constraint.length > 0 ? 1 : 0.7);
        constraint.damping = constraint.damping || 0;
        constraint.angularStiffness = constraint.angularStiffness || 0;
        constraint.angleA = constraint.bodyA ? constraint.bodyA.angle : constraint.angleA;
        constraint.angleB = constraint.bodyB ? constraint.bodyB.angle : constraint.angleB;
        constraint.plugin = {};

        // render
        var render = {
            visible: true,
            lineWidth: 2,
            strokeStyle: '#ffffff',
            type: 'line',
            anchors: true
        };

        if (constraint.length === 0 && constraint.stiffness > 0.1) {
            render.type = 'pin';
            render.anchors = false;
        } else if (constraint.stiffness < 0.9) {
            render.type = 'spring';
        }

        constraint.render = Common.extend(render, constraint.render);

        return constraint;
    };

    /**
     * Prepares for solving by constraint warming.
     * @private
     * @method preSolveAll
     * @param {body[]} bodies
     */
    Constraint.preSolveAll = function(bodies) {
        for (var i = 0; i < bodies.length; i += 1) {
            var body = bodies[i],
                impulse = body.constraintImpulse;

            if (body.isStatic || (impulse.x === 0 && impulse.y === 0 && impulse.angle === 0)) {
                continue;
            }

            body.position.x += impulse.x;
            body.position.y += impulse.y;
            body.angle += impulse.angle;
        }
    };

    /**
     * Solves all constraints in a list of collisions.
     * @private
     * @method solveAll
     * @param {constraint[]} constraints
     * @param {number} timeScale
     */
    Constraint.solveAll = function(constraints, timeScale) {
        // Solve fixed constraints first.
        for (var i = 0; i < constraints.length; i += 1) {
            var constraint = constraints[i],
                fixedA = !constraint.bodyA || (constraint.bodyA && constraint.bodyA.isStatic),
                fixedB = !constraint.bodyB || (constraint.bodyB && constraint.bodyB.isStatic);

            if (fixedA || fixedB) {
                Constraint.solve(constraints[i], timeScale);
            }
        }

        // Solve free constraints last.
        for (i = 0; i < constraints.length; i += 1) {
            constraint = constraints[i];
            fixedA = !constraint.bodyA || (constraint.bodyA && constraint.bodyA.isStatic);
            fixedB = !constraint.bodyB || (constraint.bodyB && constraint.bodyB.isStatic);

            if (!fixedA && !fixedB) {
                Constraint.solve(constraints[i], timeScale);
            }
        }
    };

    /**
     * Solves a distance constraint with Gauss-Siedel method.
     * @private
     * @method solve
     * @param {constraint} constraint
     * @param {number} timeScale
     */
    Constraint.solve = function(constraint, timeScale) {
        var bodyA = constraint.bodyA,
            bodyB = constraint.bodyB,
            pointA = constraint.pointA,
            pointB = constraint.pointB;

        if (!bodyA && !bodyB)
            return;

        // update reference angle
        if (bodyA && !bodyA.isStatic) {
            Vector.rotate(pointA, bodyA.angle - constraint.angleA, pointA);
            constraint.angleA = bodyA.angle;
        }
        
        // update reference angle
        if (bodyB && !bodyB.isStatic) {
            Vector.rotate(pointB, bodyB.angle - constraint.angleB, pointB);
            constraint.angleB = bodyB.angle;
        }

        var pointAWorld = pointA,
            pointBWorld = pointB;

        if (bodyA) pointAWorld = Vector.add(bodyA.position, pointA);
        if (bodyB) pointBWorld = Vector.add(bodyB.position, pointB);

        if (!pointAWorld || !pointBWorld)
            return;

        var delta = Vector.sub(pointAWorld, pointBWorld),
            currentLength = Vector.magnitude(delta);

        // prevent singularity
        if (currentLength < Constraint._minLength) {
            currentLength = Constraint._minLength;
        }

        // solve distance constraint with Gauss-Siedel method
        var difference = (currentLength - constraint.length) / currentLength,
            stiffness = constraint.stiffness < 1 ? constraint.stiffness * timeScale : constraint.stiffness,
            force = Vector.mult(delta, difference * stiffness),
            massTotal = (bodyA ? bodyA.inverseMass : 0) + (bodyB ? bodyB.inverseMass : 0),
            inertiaTotal = (bodyA ? bodyA.inverseInertia : 0) + (bodyB ? bodyB.inverseInertia : 0),
            resistanceTotal = massTotal + inertiaTotal,
            torque,
            share,
            normal,
            normalVelocity,
            relativeVelocity;

        if (constraint.damping) {
            var zero = Vector.create();
            normal = Vector.div(delta, currentLength);

            relativeVelocity = Vector.sub(
                bodyB && Vector.sub(bodyB.position, bodyB.positionPrev) || zero,
                bodyA && Vector.sub(bodyA.position, bodyA.positionPrev) || zero
            );

            normalVelocity = Vector.dot(normal, relativeVelocity);
        }

        if (bodyA && !bodyA.isStatic) {
            share = bodyA.inverseMass / massTotal;

            // keep track of applied impulses for post solving
            bodyA.constraintImpulse.x -= force.x * share;
            bodyA.constraintImpulse.y -= force.y * share;

            // apply forces
            bodyA.position.x -= force.x * share;
            bodyA.position.y -= force.y * share;

            // apply damping
            if (constraint.damping) {
                bodyA.positionPrev.x -= constraint.damping * normal.x * normalVelocity * share;
                bodyA.positionPrev.y -= constraint.damping * normal.y * normalVelocity * share;
            }

            // apply torque
            torque = (Vector.cross(pointA, force) / resistanceTotal) * Constraint._torqueDampen * bodyA.inverseInertia * (1 - constraint.angularStiffness);
            bodyA.constraintImpulse.angle -= torque;
            bodyA.angle -= torque;
        }

        if (bodyB && !bodyB.isStatic) {
            share = bodyB.inverseMass / massTotal;

            // keep track of applied impulses for post solving
            bodyB.constraintImpulse.x += force.x * share;
            bodyB.constraintImpulse.y += force.y * share;
            
            // apply forces
            bodyB.position.x += force.x * share;
            bodyB.position.y += force.y * share;

            // apply damping
            if (constraint.damping) {
                bodyB.positionPrev.x += constraint.damping * normal.x * normalVelocity * share;
                bodyB.positionPrev.y += constraint.damping * normal.y * normalVelocity * share;
            }

            // apply torque
            torque = (Vector.cross(pointB, force) / resistanceTotal) * Constraint._torqueDampen * bodyB.inverseInertia * (1 - constraint.angularStiffness);
            bodyB.constraintImpulse.angle += torque;
            bodyB.angle += torque;
        }

    };

    /**
     * Performs body updates required after solving constraints.
     * @private
     * @method postSolveAll
     * @param {body[]} bodies
     */
    Constraint.postSolveAll = function(bodies) {
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                impulse = body.constraintImpulse;

            if (body.isStatic || (impulse.x === 0 && impulse.y === 0 && impulse.angle === 0)) {
                continue;
            }

            Sleeping.set(body, false);

            // update geometry and reset
            for (var j = 0; j < body.parts.length; j++) {
                var part = body.parts[j];
                
                Vertices.translate(part.vertices, impulse);

                if (j > 0) {
                    part.position.x += impulse.x;
                    part.position.y += impulse.y;
                }

                if (impulse.angle !== 0) {
                    Vertices.rotate(part.vertices, impulse.angle, body.position);
                    Axes.rotate(part.axes, impulse.angle);
                    if (j > 0) {
                        Vector.rotateAbout(part.position, impulse.angle, body.position, part.position);
                    }
                }

                Bounds.update(part.bounds, part.vertices, body.velocity);
            }

            // dampen the cached impulse for warming next step
            impulse.angle *= Constraint._warming;
            impulse.x *= Constraint._warming;
            impulse.y *= Constraint._warming;
        }
    };

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * An integer `Number` uniquely identifying number generated in `Composite.create` by `Common.nextId`.
     *
     * @property id
     * @type number
     */

    /**
     * A `String` denoting the type of object.
     *
     * @property type
     * @type string
     * @default "constraint"
     * @readOnly
     */

    /**
     * An arbitrary `String` name to help the user identify and manage bodies.
     *
     * @property label
     * @type string
     * @default "Constraint"
     */

    /**
     * An `Object` that defines the rendering properties to be consumed by the module `Matter.Render`.
     *
     * @property render
     * @type object
     */

    /**
     * A flag that indicates if the constraint should be rendered.
     *
     * @property render.visible
     * @type boolean
     * @default true
     */

    /**
     * A `Number` that defines the line width to use when rendering the constraint outline.
     * A value of `0` means no outline will be rendered.
     *
     * @property render.lineWidth
     * @type number
     * @default 2
     */

    /**
     * A `String` that defines the stroke style to use when rendering the constraint outline.
     * It is the same as when using a canvas, so it accepts CSS style property values.
     *
     * @property render.strokeStyle
     * @type string
     * @default a random colour
     */

    /**
     * A `String` that defines the constraint rendering type. 
     * The possible values are 'line', 'pin', 'spring'.
     * An appropriate render type will be automatically chosen unless one is given in options.
     *
     * @property render.type
     * @type string
     * @default 'line'
     */

    /**
     * A `Boolean` that defines if the constraint's anchor points should be rendered.
     *
     * @property render.anchors
     * @type boolean
     * @default true
     */

    /**
     * The first possible `Body` that this constraint is attached to.
     *
     * @property bodyA
     * @type body
     * @default null
     */

    /**
     * The second possible `Body` that this constraint is attached to.
     *
     * @property bodyB
     * @type body
     * @default null
     */

    /**
     * A `Vector` that specifies the offset of the constraint from center of the `constraint.bodyA` if defined, otherwise a world-space position.
     *
     * @property pointA
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Vector` that specifies the offset of the constraint from center of the `constraint.bodyB` if defined, otherwise a world-space position.
     *
     * @property pointB
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Number` that specifies the stiffness of the constraint, i.e. the rate at which it returns to its resting `constraint.length`.
     * A value of `1` means the constraint should be very stiff.
     * A value of `0.2` means the constraint acts like a soft spring.
     *
     * @property stiffness
     * @type number
     * @default 1
     */

    /**
     * A `Number` that specifies the damping of the constraint, 
     * i.e. the amount of resistance applied to each body based on their velocities to limit the amount of oscillation.
     * Damping will only be apparent when the constraint also has a very low `stiffness`.
     * A value of `0.1` means the constraint will apply heavy damping, resulting in little to no oscillation.
     * A value of `0` means the constraint will apply no damping.
     *
     * @property damping
     * @type number
     * @default 0
     */

    /**
     * A `Number` that specifies the target resting length of the constraint. 
     * It is calculated automatically in `Constraint.create` from initial positions of the `constraint.bodyA` and `constraint.bodyB`.
     *
     * @property length
     * @type number
     */

    /**
     * An object reserved for storing plugin-specific properties.
     *
     * @property plugin
     * @type {}
     */

})();

},{"../core/Common":14,"../core/Sleeping":22,"../geometry/Axes":25,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29}],13:[function(_dereq_,module,exports){
/**
* The `Matter.MouseConstraint` module contains methods for creating mouse constraints.
* Mouse constraints are used for allowing user interaction, providing the ability to move bodies via the mouse or touch.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class MouseConstraint
*/

var MouseConstraint = {};

module.exports = MouseConstraint;

var Vertices = _dereq_('../geometry/Vertices');
var Sleeping = _dereq_('../core/Sleeping');
var Mouse = _dereq_('../core/Mouse');
var Events = _dereq_('../core/Events');
var Detector = _dereq_('../collision/Detector');
var Constraint = _dereq_('./Constraint');
var Composite = _dereq_('../body/Composite');
var Common = _dereq_('../core/Common');
var Bounds = _dereq_('../geometry/Bounds');

(function() {

    /**
     * Creates a new mouse constraint.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {engine} engine
     * @param {} options
     * @return {MouseConstraint} A new MouseConstraint
     */
    MouseConstraint.create = function(engine, options) {
        var mouse = (engine ? engine.mouse : null) || (options ? options.mouse : null);

        if (!mouse) {
            if (engine && engine.render && engine.render.canvas) {
                mouse = Mouse.create(engine.render.canvas);
            } else if (options && options.element) {
                mouse = Mouse.create(options.element);
            } else {
                mouse = Mouse.create();
                Common.warn('MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected');
            }
        }

        var constraint = Constraint.create({ 
            label: 'Mouse Constraint',
            pointA: mouse.position,
            pointB: { x: 0, y: 0 },
            length: 0.01, 
            stiffness: 0.1,
            angularStiffness: 1,
            render: {
                strokeStyle: '#90EE90',
                lineWidth: 3
            }
        });

        var defaults = {
            type: 'mouseConstraint',
            mouse: mouse,
            element: null,
            body: null,
            constraint: constraint,
            collisionFilter: {
                category: 0x0001,
                mask: 0xFFFFFFFF,
                group: 0
            }
        };

        var mouseConstraint = Common.extend(defaults, options);

        Events.on(engine, 'beforeUpdate', function() {
            var allBodies = Composite.allBodies(engine.world);
            MouseConstraint.update(mouseConstraint, allBodies);
            MouseConstraint._triggerEvents(mouseConstraint);
        });

        return mouseConstraint;
    };

    /**
     * Updates the given mouse constraint.
     * @private
     * @method update
     * @param {MouseConstraint} mouseConstraint
     * @param {body[]} bodies
     */
    MouseConstraint.update = function(mouseConstraint, bodies) {
        var mouse = mouseConstraint.mouse,
            constraint = mouseConstraint.constraint,
            body = mouseConstraint.body;

        if (mouse.button === 0) {
            if (!constraint.bodyB) {
                for (var i = 0; i < bodies.length; i++) {
                    body = bodies[i];
                    if (Bounds.contains(body.bounds, mouse.position) 
                            && Detector.canCollide(body.collisionFilter, mouseConstraint.collisionFilter)) {
                        for (var j = body.parts.length > 1 ? 1 : 0; j < body.parts.length; j++) {
                            var part = body.parts[j];
                            if (Vertices.contains(part.vertices, mouse.position)) {
                                constraint.pointA = mouse.position;
                                constraint.bodyB = mouseConstraint.body = body;
                                constraint.pointB = { x: mouse.position.x - body.position.x, y: mouse.position.y - body.position.y };
                                constraint.angleB = body.angle;

                                Sleeping.set(body, false);
                                Events.trigger(mouseConstraint, 'startdrag', { mouse: mouse, body: body });

                                break;
                            }
                        }
                    }
                }
            } else {
                Sleeping.set(constraint.bodyB, false);
                constraint.pointA = mouse.position;
            }
        } else {
            constraint.bodyB = mouseConstraint.body = null;
            constraint.pointB = null;

            if (body)
                Events.trigger(mouseConstraint, 'enddrag', { mouse: mouse, body: body });
        }
    };

    /**
     * Triggers mouse constraint events.
     * @method _triggerEvents
     * @private
     * @param {mouse} mouseConstraint
     */
    MouseConstraint._triggerEvents = function(mouseConstraint) {
        var mouse = mouseConstraint.mouse,
            mouseEvents = mouse.sourceEvents;

        if (mouseEvents.mousemove)
            Events.trigger(mouseConstraint, 'mousemove', { mouse: mouse });

        if (mouseEvents.mousedown)
            Events.trigger(mouseConstraint, 'mousedown', { mouse: mouse });

        if (mouseEvents.mouseup)
            Events.trigger(mouseConstraint, 'mouseup', { mouse: mouse });

        // reset the mouse state ready for the next step
        Mouse.clearSourceEvents(mouse);
    };

    /*
    *
    *  Events Documentation
    *
    */

    /**
    * Fired when the mouse has moved (or a touch moves) during the last step
    *
    * @event mousemove
    * @param {} event An event object
    * @param {mouse} event.mouse The engine's mouse instance
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when the mouse is down (or a touch has started) during the last step
    *
    * @event mousedown
    * @param {} event An event object
    * @param {mouse} event.mouse The engine's mouse instance
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when the mouse is up (or a touch has ended) during the last step
    *
    * @event mouseup
    * @param {} event An event object
    * @param {mouse} event.mouse The engine's mouse instance
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when the user starts dragging a body
    *
    * @event startdrag
    * @param {} event An event object
    * @param {mouse} event.mouse The engine's mouse instance
    * @param {body} event.body The body being dragged
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when the user ends dragging a body
    *
    * @event enddrag
    * @param {} event An event object
    * @param {mouse} event.mouse The engine's mouse instance
    * @param {body} event.body The body that has stopped being dragged
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * A `String` denoting the type of object.
     *
     * @property type
     * @type string
     * @default "constraint"
     * @readOnly
     */

    /**
     * The `Mouse` instance in use. If not supplied in `MouseConstraint.create`, one will be created.
     *
     * @property mouse
     * @type mouse
     * @default mouse
     */

    /**
     * The `Body` that is currently being moved by the user, or `null` if no body.
     *
     * @property body
     * @type body
     * @default null
     */

    /**
     * The `Constraint` object that is used to move the body during interaction.
     *
     * @property constraint
     * @type constraint
     */

    /**
     * An `Object` that specifies the collision filter properties.
     * The collision filter allows the user to define which types of body this mouse constraint can interact with.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter
     * @type object
     */

})();

},{"../body/Composite":2,"../collision/Detector":5,"../core/Common":14,"../core/Events":16,"../core/Mouse":19,"../core/Sleeping":22,"../geometry/Bounds":26,"../geometry/Vertices":29,"./Constraint":12}],14:[function(_dereq_,module,exports){
(function (global){
/**
* The `Matter.Common` module contains utility functions that are common to all modules.
*
* @class Common
*/

var Common = {};

module.exports = Common;

(function() {

    Common._nextId = 0;
    Common._seed = 0;
    Common._nowStartTime = +(new Date());

    /**
     * Extends the object in the first argument using the object in the second argument.
     * @method extend
     * @param {} obj
     * @param {boolean} deep
     * @return {} obj extended
     */
    Common.extend = function(obj, deep) {
        var argsStart,
            args,
            deepClone;

        if (typeof deep === 'boolean') {
            argsStart = 2;
            deepClone = deep;
        } else {
            argsStart = 1;
            deepClone = true;
        }

        for (var i = argsStart; i < arguments.length; i++) {
            var source = arguments[i];

            if (source) {
                for (var prop in source) {
                    if (deepClone && source[prop] && source[prop].constructor === Object) {
                        if (!obj[prop] || obj[prop].constructor === Object) {
                            obj[prop] = obj[prop] || {};
                            Common.extend(obj[prop], deepClone, source[prop]);
                        } else {
                            obj[prop] = source[prop];
                        }
                    } else {
                        obj[prop] = source[prop];
                    }
                }
            }
        }
        
        return obj;
    };

    /**
     * Creates a new clone of the object, if deep is true references will also be cloned.
     * @method clone
     * @param {} obj
     * @param {bool} deep
     * @return {} obj cloned
     */
    Common.clone = function(obj, deep) {
        return Common.extend({}, deep, obj);
    };

    /**
     * Returns the list of keys for the given object.
     * @method keys
     * @param {} obj
     * @return {string[]} keys
     */
    Common.keys = function(obj) {
        if (Object.keys)
            return Object.keys(obj);

        // avoid hasOwnProperty for performance
        var keys = [];
        for (var key in obj)
            keys.push(key);
        return keys;
    };

    /**
     * Returns the list of values for the given object.
     * @method values
     * @param {} obj
     * @return {array} Array of the objects property values
     */
    Common.values = function(obj) {
        var values = [];
        
        if (Object.keys) {
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length; i++) {
                values.push(obj[keys[i]]);
            }
            return values;
        }
        
        // avoid hasOwnProperty for performance
        for (var key in obj)
            values.push(obj[key]);
        return values;
    };

    /**
     * Gets a value from `base` relative to the `path` string.
     * @method get
     * @param {} obj The base object
     * @param {string} path The path relative to `base`, e.g. 'Foo.Bar.baz'
     * @param {number} [begin] Path slice begin
     * @param {number} [end] Path slice end
     * @return {} The object at the given path
     */
    Common.get = function(obj, path, begin, end) {
        path = path.split('.').slice(begin, end);

        for (var i = 0; i < path.length; i += 1) {
            obj = obj[path[i]];
        }

        return obj;
    };

    /**
     * Sets a value on `base` relative to the given `path` string.
     * @method set
     * @param {} obj The base object
     * @param {string} path The path relative to `base`, e.g. 'Foo.Bar.baz'
     * @param {} val The value to set
     * @param {number} [begin] Path slice begin
     * @param {number} [end] Path slice end
     * @return {} Pass through `val` for chaining
     */
    Common.set = function(obj, path, val, begin, end) {
        var parts = path.split('.').slice(begin, end);
        Common.get(obj, path, 0, -1)[parts[parts.length - 1]] = val;
        return val;
    };

    /**
     * Shuffles the given array in-place.
     * The function uses a seeded random generator.
     * @method shuffle
     * @param {array} array
     * @return {array} array shuffled randomly
     */
    Common.shuffle = function(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Common.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    /**
     * Randomly chooses a value from a list with equal probability.
     * The function uses a seeded random generator.
     * @method choose
     * @param {array} choices
     * @return {object} A random choice object from the array
     */
    Common.choose = function(choices) {
        return choices[Math.floor(Common.random() * choices.length)];
    };

    /**
     * Returns true if the object is a HTMLElement, otherwise false.
     * @method isElement
     * @param {object} obj
     * @return {boolean} True if the object is a HTMLElement, otherwise false
     */
    Common.isElement = function(obj) {
        if (typeof HTMLElement !== 'undefined') {
            return obj instanceof HTMLElement;
        }

        return !!(obj && obj.nodeType && obj.nodeName);
    };

    /**
     * Returns true if the object is an array.
     * @method isArray
     * @param {object} obj
     * @return {boolean} True if the object is an array, otherwise false
     */
    Common.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    /**
     * Returns true if the object is a function.
     * @method isFunction
     * @param {object} obj
     * @return {boolean} True if the object is a function, otherwise false
     */
    Common.isFunction = function(obj) {
        return typeof obj === "function";
    };

    /**
     * Returns true if the object is a plain object.
     * @method isPlainObject
     * @param {object} obj
     * @return {boolean} True if the object is a plain object, otherwise false
     */
    Common.isPlainObject = function(obj) {
        return typeof obj === 'object' && obj.constructor === Object;
    };

    /**
     * Returns true if the object is a string.
     * @method isString
     * @param {object} obj
     * @return {boolean} True if the object is a string, otherwise false
     */
    Common.isString = function(obj) {
        return toString.call(obj) === '[object String]';
    };
    
    /**
     * Returns the given value clamped between a minimum and maximum value.
     * @method clamp
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @return {number} The value clamped between min and max inclusive
     */
    Common.clamp = function(value, min, max) {
        if (value < min)
            return min;
        if (value > max)
            return max;
        return value;
    };
    
    /**
     * Returns the sign of the given value.
     * @method sign
     * @param {number} value
     * @return {number} -1 if negative, +1 if 0 or positive
     */
    Common.sign = function(value) {
        return value < 0 ? -1 : 1;
    };
    
    /**
     * Returns the current timestamp since the time origin (e.g. from page load).
     * The result will be high-resolution including decimal places if available.
     * @method now
     * @return {number} the current timestamp
     */
    Common.now = function() {
        if (window.performance) {
            if (window.performance.now) {
                return window.performance.now();
            } else if (window.performance.webkitNow) {
                return window.performance.webkitNow();
            }
        }

        return (new Date()) - Common._nowStartTime;
    };
    
    /**
     * Returns a random value between a minimum and a maximum value inclusive.
     * The function uses a seeded random generator.
     * @method random
     * @param {number} min
     * @param {number} max
     * @return {number} A random number between min and max inclusive
     */
    Common.random = function(min, max) {
        min = (typeof min !== "undefined") ? min : 0;
        max = (typeof max !== "undefined") ? max : 1;
        return min + _seededRandom() * (max - min);
    };

    var _seededRandom = function() {
        // https://en.wikipedia.org/wiki/Linear_congruential_generator
        Common._seed = (Common._seed * 9301 + 49297) % 233280;
        return Common._seed / 233280;
    };

    /**
     * Converts a CSS hex colour string into an integer.
     * @method colorToNumber
     * @param {string} colorString
     * @return {number} An integer representing the CSS hex string
     */
    Common.colorToNumber = function(colorString) {
        colorString = colorString.replace('#','');

        if (colorString.length == 3) {
            colorString = colorString.charAt(0) + colorString.charAt(0)
                        + colorString.charAt(1) + colorString.charAt(1)
                        + colorString.charAt(2) + colorString.charAt(2);
        }

        return parseInt(colorString, 16);
    };

    /**
     * The console logging level to use, where each level includes all levels above and excludes the levels below.
     * The default level is 'debug' which shows all console messages.  
     *
     * Possible level values are:
     * - 0 = None
     * - 1 = Debug
     * - 2 = Info
     * - 3 = Warn
     * - 4 = Error
     * @property Common.logLevel
     * @type {Number}
     * @default 1
     */
    Common.logLevel = 1;

    /**
     * Shows a `console.log` message only if the current `Common.logLevel` allows it.
     * The message will be prefixed with 'matter-js' to make it easily identifiable.
     * @method log
     * @param ...objs {} The objects to log.
     */
    Common.log = function() {
        if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
            console.log.apply(console, ['matter-js:'].concat(Array.prototype.slice.call(arguments)));
        }
    };

    /**
     * Shows a `console.info` message only if the current `Common.logLevel` allows it.
     * The message will be prefixed with 'matter-js' to make it easily identifiable.
     * @method info
     * @param ...objs {} The objects to log.
     */
    Common.info = function() {
        if (console && Common.logLevel > 0 && Common.logLevel <= 2) {
            console.info.apply(console, ['matter-js:'].concat(Array.prototype.slice.call(arguments)));
        }
    };

    /**
     * Shows a `console.warn` message only if the current `Common.logLevel` allows it.
     * The message will be prefixed with 'matter-js' to make it easily identifiable.
     * @method warn
     * @param ...objs {} The objects to log.
     */
    Common.warn = function() {
        if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
            console.warn.apply(console, ['matter-js:'].concat(Array.prototype.slice.call(arguments)));
        }
    };

    /**
     * Returns the next unique sequential ID.
     * @method nextId
     * @return {Number} Unique sequential ID
     */
    Common.nextId = function() {
        return Common._nextId++;
    };

    /**
     * A cross browser compatible indexOf implementation.
     * @method indexOf
     * @param {array} haystack
     * @param {object} needle
     * @return {number} The position of needle in haystack, otherwise -1.
     */
    Common.indexOf = function(haystack, needle) {
        if (haystack.indexOf)
            return haystack.indexOf(needle);

        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i] === needle)
                return i;
        }

        return -1;
    };

    /**
     * A cross browser compatible array map implementation.
     * @method map
     * @param {array} list
     * @param {function} func
     * @return {array} Values from list transformed by func.
     */
    Common.map = function(list, func) {
        if (list.map) {
            return list.map(func);
        }

        var mapped = [];

        for (var i = 0; i < list.length; i += 1) {
            mapped.push(func(list[i]));
        }

        return mapped;
    };

    /**
     * Takes a directed graph and returns the partially ordered set of vertices in topological order.
     * Circular dependencies are allowed.
     * @method topologicalSort
     * @param {object} graph
     * @return {array} Partially ordered set of vertices in topological order.
     */
    Common.topologicalSort = function(graph) {
        // https://github.com/mgechev/javascript-algorithms
        // Copyright (c) Minko Gechev (MIT license)
        // Modifications: tidy formatting and naming
        var result = [],
            visited = [],
            temp = [];

        for (var node in graph) {
            if (!visited[node] && !temp[node]) {
                Common._topologicalSort(node, visited, temp, graph, result);
            }
        }

        return result;
    };

    Common._topologicalSort = function(node, visited, temp, graph, result) {
        var neighbors = graph[node] || [];
        temp[node] = true;

        for (var i = 0; i < neighbors.length; i += 1) {
            var neighbor = neighbors[i];

            if (temp[neighbor]) {
                // skip circular dependencies
                continue;
            }

            if (!visited[neighbor]) {
                Common._topologicalSort(neighbor, visited, temp, graph, result);
            }
        }

        temp[node] = false;
        visited[node] = true;

        result.push(node);
    };

    /**
     * Takes _n_ functions as arguments and returns a new function that calls them in order.
     * The arguments applied when calling the new function will also be applied to every function passed.
     * The value of `this` refers to the last value returned in the chain that was not `undefined`.
     * Therefore if a passed function does not return a value, the previously returned value is maintained.
     * After all passed functions have been called the new function returns the last returned value (if any).
     * If any of the passed functions are a chain, then the chain will be flattened.
     * @method chain
     * @param ...funcs {function} The functions to chain.
     * @return {function} A new function that calls the passed functions in order.
     */
    Common.chain = function() {
        var funcs = [];

        for (var i = 0; i < arguments.length; i += 1) {
            var func = arguments[i];

            if (func._chained) {
                // flatten already chained functions
                funcs.push.apply(funcs, func._chained);
            } else {
                funcs.push(func);
            }
        }

        var chain = function() {
            // https://github.com/GoogleChrome/devtools-docs/issues/53#issuecomment-51941358
            var lastResult,
                args = new Array(arguments.length);

            for (var i = 0, l = arguments.length; i < l; i++) {
                args[i] = arguments[i];
            }

            for (i = 0; i < funcs.length; i += 1) {
                var result = funcs[i].apply(lastResult, args);

                if (typeof result !== 'undefined') {
                    lastResult = result;
                }
            }

            return lastResult;
        };

        chain._chained = funcs;

        return chain;
    };

    /**
     * Chains a function to excute before the original function on the given `path` relative to `base`.
     * See also docs for `Common.chain`.
     * @method chainPathBefore
     * @param {} base The base object
     * @param {string} path The path relative to `base`
     * @param {function} func The function to chain before the original
     * @return {function} The chained function that replaced the original
     */
    Common.chainPathBefore = function(base, path, func) {
        return Common.set(base, path, Common.chain(
            func,
            Common.get(base, path)
        ));
    };

    /**
     * Chains a function to excute after the original function on the given `path` relative to `base`.
     * See also docs for `Common.chain`.
     * @method chainPathAfter
     * @param {} base The base object
     * @param {string} path The path relative to `base`
     * @param {function} func The function to chain after the original
     * @return {function} The chained function that replaced the original
     */
    Common.chainPathAfter = function(base, path, func) {
        return Common.set(base, path, Common.chain(
            Common.get(base, path),
            func
        ));
    };

    /**
     * Used to require external libraries outside of the bundle.
     * It first looks for the `globalName` on the environment's global namespace.
     * If the global is not found, it will fall back to using the standard `require` using the `moduleName`.
     * @private
     * @method _requireGlobal
     * @param {string} globalName The global module name
     * @param {string} moduleName The fallback CommonJS module name
     * @return {} The loaded module
     */
    Common._requireGlobal = function(globalName, moduleName) {
        var obj = (typeof window !== 'undefined' ? window[globalName] : typeof global !== 'undefined' ? global[globalName] : null);
        return obj || _dereq_(moduleName);
    };
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],15:[function(_dereq_,module,exports){
/**
* The `Matter.Engine` module contains methods for creating and manipulating engines.
* An engine is a controller that manages updating the simulation of the world.
* See `Matter.Runner` for an optional game loop utility.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Engine
*/

var Engine = {};

module.exports = Engine;

var World = _dereq_('../body/World');
var Sleeping = _dereq_('./Sleeping');
var Resolver = _dereq_('../collision/Resolver');
var Render = _dereq_('../render/Render');
var Pairs = _dereq_('../collision/Pairs');
var Metrics = _dereq_('./Metrics');
var Grid = _dereq_('../collision/Grid');
var Events = _dereq_('./Events');
var Composite = _dereq_('../body/Composite');
var Constraint = _dereq_('../constraint/Constraint');
var Common = _dereq_('./Common');
var Body = _dereq_('../body/Body');

(function() {

    /**
     * Creates a new engine. The options parameter is an object that specifies any properties you wish to override the defaults.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {object} [options]
     * @return {engine} engine
     */
    Engine.create = function(element, options) {
        // options may be passed as the first (and only) argument
        options = Common.isElement(element) ? options : element;
        element = Common.isElement(element) ? element : null;
        options = options || {};

        if (element || options.render) {
            Common.warn('Engine.create: engine.render is deprecated (see docs)');
        }

        var defaults = {
            positionIterations: 6,
            velocityIterations: 4,
            constraintIterations: 2,
            enableSleeping: false,
            events: [],
            plugin: {},
            timing: {
                timestamp: 0,
                timeScale: 1
            },
            broadphase: {
                controller: Grid
            }
        };

        var engine = Common.extend(defaults, options);

        // @deprecated
        if (element || engine.render) {
            var renderDefaults = {
                element: element,
                controller: Render
            };
            
            engine.render = Common.extend(renderDefaults, engine.render);
        }

        // @deprecated
        if (engine.render && engine.render.controller) {
            engine.render = engine.render.controller.create(engine.render);
        }

        // @deprecated
        if (engine.render) {
            engine.render.engine = engine;
        }

        engine.world = options.world || World.create(engine.world);
        engine.pairs = Pairs.create();
        engine.broadphase = engine.broadphase.controller.create(engine.broadphase);
        engine.metrics = engine.metrics || { extended: false };


        return engine;
    };

    /**
     * Moves the simulation forward in time by `delta` ms.
     * The `correction` argument is an optional `Number` that specifies the time correction factor to apply to the update.
     * This can help improve the accuracy of the simulation in cases where `delta` is changing between updates.
     * The value of `correction` is defined as `delta / lastDelta`, i.e. the percentage change of `delta` over the last step.
     * Therefore the value is always `1` (no correction) when `delta` constant (or when no correction is desired, which is the default).
     * See the paper on <a href="http://lonesock.net/article/verlet.html">Time Corrected Verlet</a> for more information.
     *
     * Triggers `beforeUpdate` and `afterUpdate` events.
     * Triggers `collisionStart`, `collisionActive` and `collisionEnd` events.
     * @method update
     * @param {engine} engine
     * @param {number} [delta=16.666]
     * @param {number} [correction=1]
     */
    Engine.update = function(engine, delta, correction) {
        delta = delta || 1000 / 60;
        correction = correction || 1;

        var world = engine.world,
            timing = engine.timing,
            broadphase = engine.broadphase,
            broadphasePairs = [],
            i;

        // increment timestamp
        timing.timestamp += delta * timing.timeScale;

        // create an event object
        var event = {
            timestamp: timing.timestamp
        };

        Events.trigger(engine, 'beforeUpdate', event);

        // get lists of all bodies and constraints, no matter what composites they are in
        var allBodies = Composite.allBodies(world),
            allConstraints = Composite.allConstraints(world);


        // if sleeping enabled, call the sleeping controller
        if (engine.enableSleeping)
            Sleeping.update(allBodies, timing.timeScale);

        // applies gravity to all bodies
        Engine._bodiesApplyGravity(allBodies, world.gravity);

        // update all body position and rotation by integration
        Engine._bodiesUpdate(allBodies, delta, timing.timeScale, correction, world.bounds);

        // update all constraints (first pass)
        Constraint.preSolveAll(allBodies);
        for (i = 0; i < engine.constraintIterations; i++) {
            Constraint.solveAll(allConstraints, timing.timeScale);
        }
        Constraint.postSolveAll(allBodies);

        // broadphase pass: find potential collision pairs
        if (broadphase.controller) {
            // if world is dirty, we must flush the whole grid
            if (world.isModified)
                broadphase.controller.clear(broadphase);

            // update the grid buckets based on current bodies
            broadphase.controller.update(broadphase, allBodies, engine, world.isModified);
            broadphasePairs = broadphase.pairsList;
        } else {
            // if no broadphase set, we just pass all bodies
            broadphasePairs = allBodies;
        }

        // clear all composite modified flags
        if (world.isModified) {
            Composite.setModified(world, false, false, true);
        }

        // narrowphase pass: find actual collisions, then create or update collision pairs
        var collisions = broadphase.detector(broadphasePairs, engine);

        // update collision pairs
        var pairs = engine.pairs,
            timestamp = timing.timestamp;
        Pairs.update(pairs, collisions, timestamp);
        Pairs.removeOld(pairs, timestamp);

        // wake up bodies involved in collisions
        if (engine.enableSleeping)
            Sleeping.afterCollisions(pairs.list, timing.timeScale);

        // trigger collision events
        if (pairs.collisionStart.length > 0)
            Events.trigger(engine, 'collisionStart', { pairs: pairs.collisionStart });

        // iteratively resolve position between collisions
        Resolver.preSolvePosition(pairs.list);
        for (i = 0; i < engine.positionIterations; i++) {
            Resolver.solvePosition(pairs.list, timing.timeScale);
        }
        Resolver.postSolvePosition(allBodies);

        // update all constraints (second pass)
        Constraint.preSolveAll(allBodies);
        for (i = 0; i < engine.constraintIterations; i++) {
            Constraint.solveAll(allConstraints, timing.timeScale);
        }
        Constraint.postSolveAll(allBodies);

        // iteratively resolve velocity between collisions
        Resolver.preSolveVelocity(pairs.list);
        for (i = 0; i < engine.velocityIterations; i++) {
            Resolver.solveVelocity(pairs.list, timing.timeScale);
        }

        // trigger collision events
        if (pairs.collisionActive.length > 0)
            Events.trigger(engine, 'collisionActive', { pairs: pairs.collisionActive });

        if (pairs.collisionEnd.length > 0)
            Events.trigger(engine, 'collisionEnd', { pairs: pairs.collisionEnd });


        // clear force buffers
        Engine._bodiesClearForces(allBodies);

        Events.trigger(engine, 'afterUpdate', event);

        return engine;
    };
    
    /**
     * Merges two engines by keeping the configuration of `engineA` but replacing the world with the one from `engineB`.
     * @method merge
     * @param {engine} engineA
     * @param {engine} engineB
     */
    Engine.merge = function(engineA, engineB) {
        Common.extend(engineA, engineB);
        
        if (engineB.world) {
            engineA.world = engineB.world;

            Engine.clear(engineA);

            var bodies = Composite.allBodies(engineA.world);

            for (var i = 0; i < bodies.length; i++) {
                var body = bodies[i];
                Sleeping.set(body, false);
                body.id = Common.nextId();
            }
        }
    };

    /**
     * Clears the engine including the world, pairs and broadphase.
     * @method clear
     * @param {engine} engine
     */
    Engine.clear = function(engine) {
        var world = engine.world;
        
        Pairs.clear(engine.pairs);

        var broadphase = engine.broadphase;
        if (broadphase.controller) {
            var bodies = Composite.allBodies(world);
            broadphase.controller.clear(broadphase);
            broadphase.controller.update(broadphase, bodies, engine, true);
        }
    };

    /**
     * Zeroes the `body.force` and `body.torque` force buffers.
     * @method _bodiesClearForces
     * @private
     * @param {body[]} bodies
     */
    Engine._bodiesClearForces = function(bodies) {
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            // reset force buffers
            body.force.x = 0;
            body.force.y = 0;
            body.torque = 0;
        }
    };

    /**
     * Applys a mass dependant force to all given bodies.
     * @method _bodiesApplyGravity
     * @private
     * @param {body[]} bodies
     * @param {vector} gravity
     */
    Engine._bodiesApplyGravity = function(bodies, gravity) {
        var gravityScale = typeof gravity.scale !== 'undefined' ? gravity.scale : 0.001;

        if ((gravity.x === 0 && gravity.y === 0) || gravityScale === 0) {
            return;
        }
        
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            if (body.isStatic || body.isSleeping)
                continue;

            // apply gravity
            body.force.y += body.mass * gravity.y * gravityScale;
            body.force.x += body.mass * gravity.x * gravityScale;
        }
    };

    /**
     * Applys `Body.update` to all given `bodies`.
     * @method _bodiesUpdate
     * @private
     * @param {body[]} bodies
     * @param {number} deltaTime 
     * The amount of time elapsed between updates
     * @param {number} timeScale
     * @param {number} correction 
     * The Verlet correction factor (deltaTime / lastDeltaTime)
     * @param {bounds} worldBounds
     */
    Engine._bodiesUpdate = function(bodies, deltaTime, timeScale, correction, worldBounds) {
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            if (body.isStatic || body.isSleeping)
                continue;

            Body.update(body, deltaTime, timeScale, correction);
        }
    };

    /**
     * An alias for `Runner.run`, see `Matter.Runner` for more information.
     * @method run
     * @param {engine} engine
     */

    /**
    * Fired just before an update
    *
    * @event beforeUpdate
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after engine update and all collision events
    *
    * @event afterUpdate
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after engine update, provides a list of all pairs that have started to collide in the current tick (if any)
    *
    * @event collisionStart
    * @param {} event An event object
    * @param {} event.pairs List of affected pairs
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after engine update, provides a list of all pairs that are colliding in the current tick (if any)
    *
    * @event collisionActive
    * @param {} event An event object
    * @param {} event.pairs List of affected pairs
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after engine update, provides a list of all pairs that have ended collision in the current tick (if any)
    *
    * @event collisionEnd
    * @param {} event An event object
    * @param {} event.pairs List of affected pairs
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * An integer `Number` that specifies the number of position iterations to perform each update.
     * The higher the value, the higher quality the simulation will be at the expense of performance.
     *
     * @property positionIterations
     * @type number
     * @default 6
     */

    /**
     * An integer `Number` that specifies the number of velocity iterations to perform each update.
     * The higher the value, the higher quality the simulation will be at the expense of performance.
     *
     * @property velocityIterations
     * @type number
     * @default 4
     */

    /**
     * An integer `Number` that specifies the number of constraint iterations to perform each update.
     * The higher the value, the higher quality the simulation will be at the expense of performance.
     * The default value of `2` is usually very adequate.
     *
     * @property constraintIterations
     * @type number
     * @default 2
     */

    /**
     * A flag that specifies whether the engine should allow sleeping via the `Matter.Sleeping` module.
     * Sleeping can improve stability and performance, but often at the expense of accuracy.
     *
     * @property enableSleeping
     * @type boolean
     * @default false
     */

    /**
     * An `Object` containing properties regarding the timing systems of the engine. 
     *
     * @property timing
     * @type object
     */

    /**
     * A `Number` that specifies the global scaling factor of time for all bodies.
     * A value of `0` freezes the simulation.
     * A value of `0.1` gives a slow-motion effect.
     * A value of `1.2` gives a speed-up effect.
     *
     * @property timing.timeScale
     * @type number
     * @default 1
     */

    /**
     * A `Number` that specifies the current simulation-time in milliseconds starting from `0`. 
     * It is incremented on every `Engine.update` by the given `delta` argument. 
     *
     * @property timing.timestamp
     * @type number
     * @default 0
     */

    /**
     * An instance of a `Render` controller. The default value is a `Matter.Render` instance created by `Engine.create`.
     * One may also develop a custom renderer module based on `Matter.Render` and pass an instance of it to `Engine.create` via `options.render`.
     *
     * A minimal custom renderer object must define at least three functions: `create`, `clear` and `world` (see `Matter.Render`).
     * It is also possible to instead pass the _module_ reference via `options.render.controller` and `Engine.create` will instantiate one for you.
     *
     * @property render
     * @type render
     * @deprecated see Demo.js for an example of creating a renderer
     * @default a Matter.Render instance
     */

    /**
     * An instance of a broadphase controller. The default value is a `Matter.Grid` instance created by `Engine.create`.
     *
     * @property broadphase
     * @type grid
     * @default a Matter.Grid instance
     */

    /**
     * A `World` composite object that will contain all simulated bodies and constraints.
     *
     * @property world
     * @type world
     * @default a Matter.World instance
     */

    /**
     * An object reserved for storing plugin-specific properties.
     *
     * @property plugin
     * @type {}
     */

})();

},{"../body/Body":1,"../body/Composite":2,"../body/World":3,"../collision/Grid":6,"../collision/Pairs":8,"../collision/Resolver":10,"../constraint/Constraint":12,"../render/Render":31,"./Common":14,"./Events":16,"./Metrics":18,"./Sleeping":22}],16:[function(_dereq_,module,exports){
/**
* The `Matter.Events` module contains methods to fire and listen to events on other objects.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Events
*/

var Events = {};

module.exports = Events;

var Common = _dereq_('./Common');

(function() {

    /**
     * Subscribes a callback function to the given object's `eventName`.
     * @method on
     * @param {} object
     * @param {string} eventNames
     * @param {function} callback
     */
    Events.on = function(object, eventNames, callback) {
        var names = eventNames.split(' '),
            name;

        for (var i = 0; i < names.length; i++) {
            name = names[i];
            object.events = object.events || {};
            object.events[name] = object.events[name] || [];
            object.events[name].push(callback);
        }

        return callback;
    };

    /**
     * Removes the given event callback. If no callback, clears all callbacks in `eventNames`. If no `eventNames`, clears all events.
     * @method off
     * @param {} object
     * @param {string} eventNames
     * @param {function} callback
     */
    Events.off = function(object, eventNames, callback) {
        if (!eventNames) {
            object.events = {};
            return;
        }

        // handle Events.off(object, callback)
        if (typeof eventNames === 'function') {
            callback = eventNames;
            eventNames = Common.keys(object.events).join(' ');
        }

        var names = eventNames.split(' ');

        for (var i = 0; i < names.length; i++) {
            var callbacks = object.events[names[i]],
                newCallbacks = [];

            if (callback && callbacks) {
                for (var j = 0; j < callbacks.length; j++) {
                    if (callbacks[j] !== callback)
                        newCallbacks.push(callbacks[j]);
                }
            }

            object.events[names[i]] = newCallbacks;
        }
    };

    /**
     * Fires all the callbacks subscribed to the given object's `eventName`, in the order they subscribed, if any.
     * @method trigger
     * @param {} object
     * @param {string} eventNames
     * @param {} event
     */
    Events.trigger = function(object, eventNames, event) {
        var names,
            name,
            callbacks,
            eventClone;

        if (object.events) {
            if (!event)
                event = {};

            names = eventNames.split(' ');

            for (var i = 0; i < names.length; i++) {
                name = names[i];
                callbacks = object.events[name];

                if (callbacks) {
                    eventClone = Common.clone(event, false);
                    eventClone.name = name;
                    eventClone.source = object;

                    for (var j = 0; j < callbacks.length; j++) {
                        callbacks[j].apply(object, [eventClone]);
                    }
                }
            }
        }
    };

})();

},{"./Common":14}],17:[function(_dereq_,module,exports){
/**
* The `Matter` module is the top level namespace. It also includes a function for installing plugins on top of the library.
*
* @class Matter
*/

var Matter = {};

module.exports = Matter;

var Plugin = _dereq_('./Plugin');
var Common = _dereq_('./Common');

(function() {

    /**
     * The library name.
     * @property name
     * @readOnly
     * @type {String}
     */
    Matter.name = 'matter-js';

    /**
     * The library version.
     * @property version
     * @readOnly
     * @type {String}
     */
    Matter.version = '0.14.2';

    /**
     * A list of plugin dependencies to be installed. These are normally set and installed through `Matter.use`.
     * Alternatively you may set `Matter.uses` manually and install them by calling `Plugin.use(Matter)`.
     * @property uses
     * @type {Array}
     */
    Matter.uses = [];

    /**
     * The plugins that have been installed through `Matter.Plugin.install`. Read only.
     * @property used
     * @readOnly
     * @type {Array}
     */
    Matter.used = [];

    /**
     * Installs the given plugins on the `Matter` namespace.
     * This is a short-hand for `Plugin.use`, see it for more information.
     * Call this function once at the start of your code, with all of the plugins you wish to install as arguments.
     * Avoid calling this function multiple times unless you intend to manually control installation order.
     * @method use
     * @param ...plugin {Function} The plugin(s) to install on `base` (multi-argument).
     */
    Matter.use = function() {
        Plugin.use(Matter, Array.prototype.slice.call(arguments));
    };

    /**
     * Chains a function to excute before the original function on the given `path` relative to `Matter`.
     * See also docs for `Common.chain`.
     * @method before
     * @param {string} path The path relative to `Matter`
     * @param {function} func The function to chain before the original
     * @return {function} The chained function that replaced the original
     */
    Matter.before = function(path, func) {
        path = path.replace(/^Matter./, '');
        return Common.chainPathBefore(Matter, path, func);
    };

    /**
     * Chains a function to excute after the original function on the given `path` relative to `Matter`.
     * See also docs for `Common.chain`.
     * @method after
     * @param {string} path The path relative to `Matter`
     * @param {function} func The function to chain after the original
     * @return {function} The chained function that replaced the original
     */
    Matter.after = function(path, func) {
        path = path.replace(/^Matter./, '');
        return Common.chainPathAfter(Matter, path, func);
    };

})();

},{"./Common":14,"./Plugin":20}],18:[function(_dereq_,module,exports){

},{"../body/Composite":2,"./Common":14}],19:[function(_dereq_,module,exports){
/**
* The `Matter.Mouse` module contains methods for creating and manipulating mouse inputs.
*
* @class Mouse
*/

var Mouse = {};

module.exports = Mouse;

var Common = _dereq_('../core/Common');

(function() {

    /**
     * Creates a mouse input.
     * @method create
     * @param {HTMLElement} element
     * @return {mouse} A new mouse
     */
    Mouse.create = function(element) {
        var mouse = {};

        if (!element) {
            Common.log('Mouse.create: element was undefined, defaulting to document.body', 'warn');
        }
        
        mouse.element = element || document.body;
        mouse.absolute = { x: 0, y: 0 };
        mouse.position = { x: 0, y: 0 };
        mouse.mousedownPosition = { x: 0, y: 0 };
        mouse.mouseupPosition = { x: 0, y: 0 };
        mouse.offset = { x: 0, y: 0 };
        mouse.scale = { x: 1, y: 1 };
        mouse.wheelDelta = 0;
        mouse.button = -1;
        mouse.pixelRatio = mouse.element.getAttribute('data-pixel-ratio') || 1;

        mouse.sourceEvents = {
            mousemove: null,
            mousedown: null,
            mouseup: null,
            mousewheel: null
        };
        
        mouse.mousemove = function(event) { 
            var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio),
                touches = event.changedTouches;

            if (touches) {
                mouse.button = 0;
                event.preventDefault();
            }

            mouse.absolute.x = position.x;
            mouse.absolute.y = position.y;
            mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
            mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
            mouse.sourceEvents.mousemove = event;
        };
        
        mouse.mousedown = function(event) {
            var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio),
                touches = event.changedTouches;

            if (touches) {
                mouse.button = 0;
                event.preventDefault();
            } else {
                mouse.button = event.button;
            }

            mouse.absolute.x = position.x;
            mouse.absolute.y = position.y;
            mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
            mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
            mouse.mousedownPosition.x = mouse.position.x;
            mouse.mousedownPosition.y = mouse.position.y;
            mouse.sourceEvents.mousedown = event;
        };
        
        mouse.mouseup = function(event) {
            var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio),
                touches = event.changedTouches;

            if (touches) {
                event.preventDefault();
            }
            
            mouse.button = -1;
            mouse.absolute.x = position.x;
            mouse.absolute.y = position.y;
            mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
            mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
            mouse.mouseupPosition.x = mouse.position.x;
            mouse.mouseupPosition.y = mouse.position.y;
            mouse.sourceEvents.mouseup = event;
        };

        mouse.mousewheel = function(event) {
            mouse.wheelDelta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
            event.preventDefault();
        };

        Mouse.setElement(mouse, mouse.element);

        return mouse;
    };

    /**
     * Sets the element the mouse is bound to (and relative to).
     * @method setElement
     * @param {mouse} mouse
     * @param {HTMLElement} element
     */
    Mouse.setElement = function(mouse, element) {
        mouse.element = element;

        element.addEventListener('mousemove', mouse.mousemove);
        element.addEventListener('mousedown', mouse.mousedown);
        element.addEventListener('mouseup', mouse.mouseup);
        
        element.addEventListener('mousewheel', mouse.mousewheel);
        element.addEventListener('DOMMouseScroll', mouse.mousewheel);

        element.addEventListener('touchmove', mouse.mousemove);
        element.addEventListener('touchstart', mouse.mousedown);
        element.addEventListener('touchend', mouse.mouseup);
    };

    /**
     * Clears all captured source events.
     * @method clearSourceEvents
     * @param {mouse} mouse
     */
    Mouse.clearSourceEvents = function(mouse) {
        mouse.sourceEvents.mousemove = null;
        mouse.sourceEvents.mousedown = null;
        mouse.sourceEvents.mouseup = null;
        mouse.sourceEvents.mousewheel = null;
        mouse.wheelDelta = 0;
    };

    /**
     * Sets the mouse position offset.
     * @method setOffset
     * @param {mouse} mouse
     * @param {vector} offset
     */
    Mouse.setOffset = function(mouse, offset) {
        mouse.offset.x = offset.x;
        mouse.offset.y = offset.y;
        mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
        mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
    };

    /**
     * Sets the mouse position scale.
     * @method setScale
     * @param {mouse} mouse
     * @param {vector} scale
     */
    Mouse.setScale = function(mouse, scale) {
        mouse.scale.x = scale.x;
        mouse.scale.y = scale.y;
        mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
        mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
    };
    
    /**
     * Gets the mouse position relative to an element given a screen pixel ratio.
     * @method _getRelativeMousePosition
     * @private
     * @param {} event
     * @param {} element
     * @param {number} pixelRatio
     * @return {}
     */
    Mouse._getRelativeMousePosition = function(event, element, pixelRatio) {
        var elementBounds = element.getBoundingClientRect(),
            rootNode = (document.documentElement || document.body.parentNode || document.body),
            scrollX = (window.pageXOffset !== undefined) ? window.pageXOffset : rootNode.scrollLeft,
            scrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : rootNode.scrollTop,
            touches = event.changedTouches,
            x, y;
        
        if (touches) {
            x = touches[0].pageX - elementBounds.left - scrollX;
            y = touches[0].pageY - elementBounds.top - scrollY;
        } else {
            x = event.pageX - elementBounds.left - scrollX;
            y = event.pageY - elementBounds.top - scrollY;
        }

        return { 
            x: x / (element.clientWidth / (element.width || element.clientWidth) * pixelRatio),
            y: y / (element.clientHeight / (element.height || element.clientHeight) * pixelRatio)
        };
    };

})();

},{"../core/Common":14}],20:[function(_dereq_,module,exports){
/**
* The `Matter.Plugin` module contains functions for registering and installing plugins on modules.
*
* @class Plugin
*/

var Plugin = {};

module.exports = Plugin;

var Common = _dereq_('./Common');

(function() {

    Plugin._registry = {};

    /**
     * Registers a plugin object so it can be resolved later by name.
     * @method register
     * @param plugin {} The plugin to register.
     * @return {object} The plugin.
     */
    Plugin.register = function(plugin) {
        if (!Plugin.isPlugin(plugin)) {
            Common.warn('Plugin.register:', Plugin.toString(plugin), 'does not implement all required fields.');
        }

        if (plugin.name in Plugin._registry) {
            var registered = Plugin._registry[plugin.name],
                pluginVersion = Plugin.versionParse(plugin.version).number,
                registeredVersion = Plugin.versionParse(registered.version).number;

            if (pluginVersion > registeredVersion) {
                Common.warn('Plugin.register:', Plugin.toString(registered), 'was upgraded to', Plugin.toString(plugin));
                Plugin._registry[plugin.name] = plugin;
            } else if (pluginVersion < registeredVersion) {
                Common.warn('Plugin.register:', Plugin.toString(registered), 'can not be downgraded to', Plugin.toString(plugin));
            } else if (plugin !== registered) {
                Common.warn('Plugin.register:', Plugin.toString(plugin), 'is already registered to different plugin object');
            }
        } else {
            Plugin._registry[plugin.name] = plugin;
        }

        return plugin;
    };

    /**
     * Resolves a dependency to a plugin object from the registry if it exists. 
     * The `dependency` may contain a version, but only the name matters when resolving.
     * @method resolve
     * @param dependency {string} The dependency.
     * @return {object} The plugin if resolved, otherwise `undefined`.
     */
    Plugin.resolve = function(dependency) {
        return Plugin._registry[Plugin.dependencyParse(dependency).name];
    };

    /**
     * Returns a pretty printed plugin name and version.
     * @method toString
     * @param plugin {} The plugin.
     * @return {string} Pretty printed plugin name and version.
     */
    Plugin.toString = function(plugin) {
        return typeof plugin === 'string' ? plugin : (plugin.name || 'anonymous') + '@' + (plugin.version || plugin.range || '0.0.0');
    };

    /**
     * Returns `true` if the object meets the minimum standard to be considered a plugin.
     * This means it must define the following properties:
     * - `name`
     * - `version`
     * - `install`
     * @method isPlugin
     * @param obj {} The obj to test.
     * @return {boolean} `true` if the object can be considered a plugin otherwise `false`.
     */
    Plugin.isPlugin = function(obj) {
        return obj && obj.name && obj.version && obj.install;
    };

    /**
     * Returns `true` if a plugin with the given `name` been installed on `module`.
     * @method isUsed
     * @param module {} The module.
     * @param name {string} The plugin name.
     * @return {boolean} `true` if a plugin with the given `name` been installed on `module`, otherwise `false`.
     */
    Plugin.isUsed = function(module, name) {
        return module.used.indexOf(name) > -1;
    };

    /**
     * Returns `true` if `plugin.for` is applicable to `module` by comparing against `module.name` and `module.version`.
     * If `plugin.for` is not specified then it is assumed to be applicable.
     * The value of `plugin.for` is a string of the format `'module-name'` or `'module-name@version'`.
     * @method isFor
     * @param plugin {} The plugin.
     * @param module {} The module.
     * @return {boolean} `true` if `plugin.for` is applicable to `module`, otherwise `false`.
     */
    Plugin.isFor = function(plugin, module) {
        var parsed = plugin.for && Plugin.dependencyParse(plugin.for);
        return !plugin.for || (module.name === parsed.name && Plugin.versionSatisfies(module.version, parsed.range));
    };

    /**
     * Installs the plugins by calling `plugin.install` on each plugin specified in `plugins` if passed, otherwise `module.uses`.
     * For installing plugins on `Matter` see the convenience function `Matter.use`.
     * Plugins may be specified either by their name or a reference to the plugin object.
     * Plugins themselves may specify further dependencies, but each plugin is installed only once.
     * Order is important, a topological sort is performed to find the best resulting order of installation.
     * This sorting attempts to satisfy every dependency's requested ordering, but may not be exact in all cases.
     * This function logs the resulting status of each dependency in the console, along with any warnings.
     * - A green tick ✅ indicates a dependency was resolved and installed.
     * - An orange diamond 🔶 indicates a dependency was resolved but a warning was thrown for it or one if its dependencies.
     * - A red cross ❌ indicates a dependency could not be resolved.
     * Avoid calling this function multiple times on the same module unless you intend to manually control installation order.
     * @method use
     * @param module {} The module install plugins on.
     * @param [plugins=module.uses] {} The plugins to install on module (optional, defaults to `module.uses`).
     */
    Plugin.use = function(module, plugins) {
        module.uses = (module.uses || []).concat(plugins || []);

        if (module.uses.length === 0) {
            Common.warn('Plugin.use:', Plugin.toString(module), 'does not specify any dependencies to install.');
            return;
        }

        var dependencies = Plugin.dependencies(module),
            sortedDependencies = Common.topologicalSort(dependencies),
            status = [];

        for (var i = 0; i < sortedDependencies.length; i += 1) {
            if (sortedDependencies[i] === module.name) {
                continue;
            }

            var plugin = Plugin.resolve(sortedDependencies[i]);

            if (!plugin) {
                status.push('❌ ' + sortedDependencies[i]);
                continue;
            }

            if (Plugin.isUsed(module, plugin.name)) {
                continue;
            }

            if (!Plugin.isFor(plugin, module)) {
                Common.warn('Plugin.use:', Plugin.toString(plugin), 'is for', plugin.for, 'but installed on', Plugin.toString(module) + '.');
                plugin._warned = true;
            }

            if (plugin.install) {
                plugin.install(module);
            } else {
                Common.warn('Plugin.use:', Plugin.toString(plugin), 'does not specify an install function.');
                plugin._warned = true;
            }

            if (plugin._warned) {
                status.push('🔶 ' + Plugin.toString(plugin));
                delete plugin._warned;
            } else {
                status.push('✅ ' + Plugin.toString(plugin));
            }

            module.used.push(plugin.name);
        }

        if (status.length > 0) {
            Common.info(status.join('  '));
        }
    };

    /**
     * Recursively finds all of a module's dependencies and returns a flat dependency graph.
     * @method dependencies
     * @param module {} The module.
     * @return {object} A dependency graph.
     */
    Plugin.dependencies = function(module, tracked) {
        var parsedBase = Plugin.dependencyParse(module),
            name = parsedBase.name;

        tracked = tracked || {};

        if (name in tracked) {
            return;
        }

        module = Plugin.resolve(module) || module;

        tracked[name] = Common.map(module.uses || [], function(dependency) {
            if (Plugin.isPlugin(dependency)) {
                Plugin.register(dependency);
            }

            var parsed = Plugin.dependencyParse(dependency),
                resolved = Plugin.resolve(dependency);

            if (resolved && !Plugin.versionSatisfies(resolved.version, parsed.range)) {
                Common.warn(
                    'Plugin.dependencies:', Plugin.toString(resolved), 'does not satisfy',
                    Plugin.toString(parsed), 'used by', Plugin.toString(parsedBase) + '.'
                );

                resolved._warned = true;
                module._warned = true;
            } else if (!resolved) {
                Common.warn(
                    'Plugin.dependencies:', Plugin.toString(dependency), 'used by',
                    Plugin.toString(parsedBase), 'could not be resolved.'
                );

                module._warned = true;
            }

            return parsed.name;
        });

        for (var i = 0; i < tracked[name].length; i += 1) {
            Plugin.dependencies(tracked[name][i], tracked);
        }

        return tracked;
    };

    /**
     * Parses a dependency string into its components.
     * The `dependency` is a string of the format `'module-name'` or `'module-name@version'`.
     * See documentation for `Plugin.versionParse` for a description of the format.
     * This function can also handle dependencies that are already resolved (e.g. a module object).
     * @method dependencyParse
     * @param dependency {string} The dependency of the format `'module-name'` or `'module-name@version'`.
     * @return {object} The dependency parsed into its components.
     */
    Plugin.dependencyParse = function(dependency) {
        if (Common.isString(dependency)) {
            var pattern = /^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?))?$/;

            if (!pattern.test(dependency)) {
                Common.warn('Plugin.dependencyParse:', dependency, 'is not a valid dependency string.');
            }

            return {
                name: dependency.split('@')[0],
                range: dependency.split('@')[1] || '*'
            };
        }

        return {
            name: dependency.name,
            range: dependency.range || dependency.version
        };
    };

    /**
     * Parses a version string into its components.  
     * Versions are strictly of the format `x.y.z` (as in [semver](http://semver.org/)).
     * Versions may optionally have a prerelease tag in the format `x.y.z-alpha`.
     * Ranges are a strict subset of [npm ranges](https://docs.npmjs.com/misc/semver#advanced-range-syntax).
     * Only the following range types are supported:
     * - Tilde ranges e.g. `~1.2.3`
     * - Caret ranges e.g. `^1.2.3`
     * - Exact version e.g. `1.2.3`
     * - Any version `*`
     * @method versionParse
     * @param range {string} The version string.
     * @return {object} The version range parsed into its components.
     */
    Plugin.versionParse = function(range) {
        var pattern = /^\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?$/;

        if (!pattern.test(range)) {
            Common.warn('Plugin.versionParse:', range, 'is not a valid version or range.');
        }

        var identifiers = range.split('-');
        range = identifiers[0];

        var isRange = isNaN(Number(range[0])),
            version = isRange ? range.substr(1) : range,
            parts = Common.map(version.split('.'), function(part) {
                return Number(part);
            });

        return {
            isRange: isRange,
            version: version,
            range: range,
            operator: isRange ? range[0] : '',
            parts: parts,
            prerelease: identifiers[1],
            number: parts[0] * 1e8 + parts[1] * 1e4 + parts[2]
        };
    };

    /**
     * Returns `true` if `version` satisfies the given `range`.
     * See documentation for `Plugin.versionParse` for a description of the format.
     * If a version or range is not specified, then any version (`*`) is assumed to satisfy.
     * @method versionSatisfies
     * @param version {string} The version string.
     * @param range {string} The range string.
     * @return {boolean} `true` if `version` satisfies `range`, otherwise `false`.
     */
    Plugin.versionSatisfies = function(version, range) {
        range = range || '*';

        var rangeParsed = Plugin.versionParse(range),
            rangeParts = rangeParsed.parts,
            versionParsed = Plugin.versionParse(version),
            versionParts = versionParsed.parts;

        if (rangeParsed.isRange) {
            if (rangeParsed.operator === '*' || version === '*') {
                return true;
            }

            if (rangeParsed.operator === '~') {
                return versionParts[0] === rangeParts[0] && versionParts[1] === rangeParts[1] && versionParts[2] >= rangeParts[2];
            }

            if (rangeParsed.operator === '^') {
                if (rangeParts[0] > 0) {
                    return versionParts[0] === rangeParts[0] && versionParsed.number >= rangeParsed.number;
                }

                if (rangeParts[1] > 0) {
                    return versionParts[1] === rangeParts[1] && versionParts[2] >= rangeParts[2];
                }

                return versionParts[2] === rangeParts[2];
            }
        }

        return version === range || version === '*';
    };

})();

},{"./Common":14}],21:[function(_dereq_,module,exports){
/**
* The `Matter.Runner` module is an optional utility which provides a game loop, 
* that handles continuously updating a `Matter.Engine` for you within a browser.
* It is intended for development and debugging purposes, but may also be suitable for simple games.
* If you are using your own game loop instead, then you do not need the `Matter.Runner` module.
* Instead just call `Engine.update(engine, delta)` in your own loop.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Runner
*/

var Runner = {};

module.exports = Runner;

var Events = _dereq_('./Events');
var Engine = _dereq_('./Engine');
var Common = _dereq_('./Common');

(function() {

    var _requestAnimationFrame,
        _cancelAnimationFrame;

    if (typeof window !== 'undefined') {
        _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
                                      || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
   
        _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame 
                                      || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
    }

    if (!_requestAnimationFrame) {
        var _frameTimeout;

        _requestAnimationFrame = function(callback){ 
            _frameTimeout = setTimeout(function() { 
                callback(Common.now()); 
            }, 1000 / 60);
        };

        _cancelAnimationFrame = function() {
            clearTimeout(_frameTimeout);
        };
    }

    /**
     * Creates a new Runner. The options parameter is an object that specifies any properties you wish to override the defaults.
     * @method create
     * @param {} options
     */
    Runner.create = function(options) {
        var defaults = {
            fps: 60,
            correction: 1,
            deltaSampleSize: 60,
            counterTimestamp: 0,
            frameCounter: 0,
            deltaHistory: [],
            timePrev: null,
            timeScalePrev: 1,
            frameRequestId: null,
            isFixed: false,
            enabled: true
        };

        var runner = Common.extend(defaults, options);

        runner.delta = runner.delta || 1000 / runner.fps;
        runner.deltaMin = runner.deltaMin || 1000 / runner.fps;
        runner.deltaMax = runner.deltaMax || 1000 / (runner.fps * 0.5);
        runner.fps = 1000 / runner.delta;

        return runner;
    };

    /**
     * Continuously ticks a `Matter.Engine` by calling `Runner.tick` on the `requestAnimationFrame` event.
     * @method run
     * @param {engine} engine
     */
    Runner.run = function(runner, engine) {
        // create runner if engine is first argument
        if (typeof runner.positionIterations !== 'undefined') {
            engine = runner;
            runner = Runner.create();
        }

        (function render(time){
            runner.frameRequestId = _requestAnimationFrame(render);

            if (time && runner.enabled) {
                Runner.tick(runner, engine, time);
            }
        })();

        return runner;
    };

    /**
     * A game loop utility that updates the engine and renderer by one step (a 'tick').
     * Features delta smoothing, time correction and fixed or dynamic timing.
     * Triggers `beforeTick`, `tick` and `afterTick` events on the engine.
     * Consider just `Engine.update(engine, delta)` if you're using your own loop.
     * @method tick
     * @param {runner} runner
     * @param {engine} engine
     * @param {number} time
     */
    Runner.tick = function(runner, engine, time) {
        var timing = engine.timing,
            correction = 1,
            delta;

        // create an event object
        var event = {
            timestamp: timing.timestamp
        };

        Events.trigger(runner, 'beforeTick', event);
        Events.trigger(engine, 'beforeTick', event); // @deprecated

        if (runner.isFixed) {
            // fixed timestep
            delta = runner.delta;
        } else {
            // dynamic timestep based on wall clock between calls
            delta = (time - runner.timePrev) || runner.delta;
            runner.timePrev = time;

            // optimistically filter delta over a few frames, to improve stability
            runner.deltaHistory.push(delta);
            runner.deltaHistory = runner.deltaHistory.slice(-runner.deltaSampleSize);
            delta = Math.min.apply(null, runner.deltaHistory);
            
            // limit delta
            delta = delta < runner.deltaMin ? runner.deltaMin : delta;
            delta = delta > runner.deltaMax ? runner.deltaMax : delta;

            // correction for delta
            correction = delta / runner.delta;

            // update engine timing object
            runner.delta = delta;
        }

        // time correction for time scaling
        if (runner.timeScalePrev !== 0)
            correction *= timing.timeScale / runner.timeScalePrev;

        if (timing.timeScale === 0)
            correction = 0;

        runner.timeScalePrev = timing.timeScale;
        runner.correction = correction;

        // fps counter
        runner.frameCounter += 1;
        if (time - runner.counterTimestamp >= 1000) {
            runner.fps = runner.frameCounter * ((time - runner.counterTimestamp) / 1000);
            runner.counterTimestamp = time;
            runner.frameCounter = 0;
        }

        Events.trigger(runner, 'tick', event);
        Events.trigger(engine, 'tick', event); // @deprecated

        // if world has been modified, clear the render scene graph
        if (engine.world.isModified 
            && engine.render
            && engine.render.controller
            && engine.render.controller.clear) {
            engine.render.controller.clear(engine.render); // @deprecated
        }

        // update
        Events.trigger(runner, 'beforeUpdate', event);
        Engine.update(engine, delta, correction);
        Events.trigger(runner, 'afterUpdate', event);

        // render
        // @deprecated
        if (engine.render && engine.render.controller) {
            Events.trigger(runner, 'beforeRender', event);
            Events.trigger(engine, 'beforeRender', event); // @deprecated

            engine.render.controller.world(engine.render);

            Events.trigger(runner, 'afterRender', event);
            Events.trigger(engine, 'afterRender', event); // @deprecated
        }

        Events.trigger(runner, 'afterTick', event);
        Events.trigger(engine, 'afterTick', event); // @deprecated
    };

    /**
     * Ends execution of `Runner.run` on the given `runner`, by canceling the animation frame request event loop.
     * If you wish to only temporarily pause the engine, see `engine.enabled` instead.
     * @method stop
     * @param {runner} runner
     */
    Runner.stop = function(runner) {
        _cancelAnimationFrame(runner.frameRequestId);
    };

    /**
     * Alias for `Runner.run`.
     * @method start
     * @param {runner} runner
     * @param {engine} engine
     */
    Runner.start = function(runner, engine) {
        Runner.run(runner, engine);
    };

    /*
    *
    *  Events Documentation
    *
    */

    /**
    * Fired at the start of a tick, before any updates to the engine or timing
    *
    * @event beforeTick
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after engine timing updated, but just before update
    *
    * @event tick
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired at the end of a tick, after engine update and after rendering
    *
    * @event afterTick
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired before update
    *
    * @event beforeUpdate
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after update
    *
    * @event afterUpdate
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired before rendering
    *
    * @event beforeRender
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    * @deprecated
    */

    /**
    * Fired after rendering
    *
    * @event afterRender
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    * @deprecated
    */

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * A flag that specifies whether the runner is running or not.
     *
     * @property enabled
     * @type boolean
     * @default true
     */

    /**
     * A `Boolean` that specifies if the runner should use a fixed timestep (otherwise it is variable).
     * If timing is fixed, then the apparent simulation speed will change depending on the frame rate (but behaviour will be deterministic).
     * If the timing is variable, then the apparent simulation speed will be constant (approximately, but at the cost of determininism).
     *
     * @property isFixed
     * @type boolean
     * @default false
     */

    /**
     * A `Number` that specifies the time step between updates in milliseconds.
     * If `engine.timing.isFixed` is set to `true`, then `delta` is fixed.
     * If it is `false`, then `delta` can dynamically change to maintain the correct apparent simulation speed.
     *
     * @property delta
     * @type number
     * @default 1000 / 60
     */

})();

},{"./Common":14,"./Engine":15,"./Events":16}],22:[function(_dereq_,module,exports){
/**
* The `Matter.Sleeping` module contains methods to manage the sleeping state of bodies.
*
* @class Sleeping
*/

var Sleeping = {};

module.exports = Sleeping;

var Events = _dereq_('./Events');

(function() {

    Sleeping._motionWakeThreshold = 0.18;
    Sleeping._motionSleepThreshold = 0.08;
    Sleeping._minBias = 0.9;

    /**
     * Puts bodies to sleep or wakes them up depending on their motion.
     * @method update
     * @param {body[]} bodies
     * @param {number} timeScale
     */
    Sleeping.update = function(bodies, timeScale) {
        var timeFactor = timeScale * timeScale * timeScale;

        // update bodies sleeping status
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                motion = body.speed * body.speed + body.angularSpeed * body.angularSpeed;

            // wake up bodies if they have a force applied
            if (body.force.x !== 0 || body.force.y !== 0) {
                Sleeping.set(body, false);
                continue;
            }

            var minMotion = Math.min(body.motion, motion),
                maxMotion = Math.max(body.motion, motion);
        
            // biased average motion estimation between frames
            body.motion = Sleeping._minBias * minMotion + (1 - Sleeping._minBias) * maxMotion;
            
            if (body.sleepThreshold > 0 && body.motion < Sleeping._motionSleepThreshold * timeFactor) {
                body.sleepCounter += 1;
                
                if (body.sleepCounter >= body.sleepThreshold)
                    Sleeping.set(body, true);
            } else if (body.sleepCounter > 0) {
                body.sleepCounter -= 1;
            }
        }
    };

    /**
     * Given a set of colliding pairs, wakes the sleeping bodies involved.
     * @method afterCollisions
     * @param {pair[]} pairs
     * @param {number} timeScale
     */
    Sleeping.afterCollisions = function(pairs, timeScale) {
        var timeFactor = timeScale * timeScale * timeScale;

        // wake up bodies involved in collisions
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            
            // don't wake inactive pairs
            if (!pair.isActive)
                continue;

            var collision = pair.collision,
                bodyA = collision.bodyA.parent, 
                bodyB = collision.bodyB.parent;
        
            // don't wake if at least one body is static
            if ((bodyA.isSleeping && bodyB.isSleeping) || bodyA.isStatic || bodyB.isStatic)
                continue;
        
            if (bodyA.isSleeping || bodyB.isSleeping) {
                var sleepingBody = (bodyA.isSleeping && !bodyA.isStatic) ? bodyA : bodyB,
                    movingBody = sleepingBody === bodyA ? bodyB : bodyA;

                if (!sleepingBody.isStatic && movingBody.motion > Sleeping._motionWakeThreshold * timeFactor) {
                    Sleeping.set(sleepingBody, false);
                }
            }
        }
    };
  
    /**
     * Set a body as sleeping or awake.
     * @method set
     * @param {body} body
     * @param {boolean} isSleeping
     */
    Sleeping.set = function(body, isSleeping) {
        var wasSleeping = body.isSleeping;

        if (isSleeping) {
            body.isSleeping = true;
            body.sleepCounter = body.sleepThreshold;

            body.positionImpulse.x = 0;
            body.positionImpulse.y = 0;

            body.positionPrev.x = body.position.x;
            body.positionPrev.y = body.position.y;

            body.anglePrev = body.angle;
            body.speed = 0;
            body.angularSpeed = 0;
            body.motion = 0;

            if (!wasSleeping) {
                Events.trigger(body, 'sleepStart');
            }
        } else {
            body.isSleeping = false;
            body.sleepCounter = 0;

            if (wasSleeping) {
                Events.trigger(body, 'sleepEnd');
            }
        }
    };

})();

},{"./Events":16}],23:[function(_dereq_,module,exports){
/**
* The `Matter.Bodies` module contains factory methods for creating rigid body models 
* with commonly used body configurations (such as rectangles, circles and other polygons).
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Bodies
*/

// TODO: true circle bodies

var Bodies = {};

module.exports = Bodies;

var Vertices = _dereq_('../geometry/Vertices');
var Common = _dereq_('../core/Common');
var Body = _dereq_('../body/Body');
var Bounds = _dereq_('../geometry/Bounds');
var Vector = _dereq_('../geometry/Vector');
var decomp;

(function() {

    /**
     * Creates a new rigid body model with a rectangle hull. 
     * The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method rectangle
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {object} [options]
     * @return {body} A new rectangle body
     */
    Bodies.rectangle = function(x, y, width, height, options) {
        options = options || {};

        var rectangle = { 
            label: 'Rectangle Body',
            position: { x: x, y: y },
            vertices: Vertices.fromPath('L 0 0 L ' + width + ' 0 L ' + width + ' ' + height + ' L 0 ' + height)
        };

        if (options.chamfer) {
            var chamfer = options.chamfer;
            rectangle.vertices = Vertices.chamfer(rectangle.vertices, chamfer.radius, 
                                    chamfer.quality, chamfer.qualityMin, chamfer.qualityMax);
            delete options.chamfer;
        }

        return Body.create(Common.extend({}, rectangle, options));
    };
    
    /**
     * Creates a new rigid body model with a trapezoid hull. 
     * The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method trapezoid
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} slope
     * @param {object} [options]
     * @return {body} A new trapezoid body
     */
    Bodies.trapezoid = function(x, y, width, height, slope, options) {
        options = options || {};

        slope *= 0.5;
        var roof = (1 - (slope * 2)) * width;
        
        var x1 = width * slope,
            x2 = x1 + roof,
            x3 = x2 + x1,
            verticesPath;

        if (slope < 0.5) {
            verticesPath = 'L 0 0 L ' + x1 + ' ' + (-height) + ' L ' + x2 + ' ' + (-height) + ' L ' + x3 + ' 0';
        } else {
            verticesPath = 'L 0 0 L ' + x2 + ' ' + (-height) + ' L ' + x3 + ' 0';
        }

        var trapezoid = { 
            label: 'Trapezoid Body',
            position: { x: x, y: y },
            vertices: Vertices.fromPath(verticesPath)
        };

        if (options.chamfer) {
            var chamfer = options.chamfer;
            trapezoid.vertices = Vertices.chamfer(trapezoid.vertices, chamfer.radius, 
                                    chamfer.quality, chamfer.qualityMin, chamfer.qualityMax);
            delete options.chamfer;
        }

        return Body.create(Common.extend({}, trapezoid, options));
    };

    /**
     * Creates a new rigid body model with a circle hull. 
     * The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method circle
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @param {object} [options]
     * @param {number} [maxSides]
     * @return {body} A new circle body
     */
    Bodies.circle = function(x, y, radius, options, maxSides) {
        options = options || {};

        var circle = {
            label: 'Circle Body',
            circleRadius: radius
        };
        
        // approximate circles with polygons until true circles implemented in SAT
        maxSides = maxSides || 25;
        var sides = Math.ceil(Math.max(10, Math.min(maxSides, radius)));

        // optimisation: always use even number of sides (half the number of unique axes)
        if (sides % 2 === 1)
            sides += 1;

        return Bodies.polygon(x, y, sides, radius, Common.extend({}, circle, options));
    };

    /**
     * Creates a new rigid body model with a regular polygon hull with the given number of sides. 
     * The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method polygon
     * @param {number} x
     * @param {number} y
     * @param {number} sides
     * @param {number} radius
     * @param {object} [options]
     * @return {body} A new regular polygon body
     */
    Bodies.polygon = function(x, y, sides, radius, options) {
        options = options || {};

        if (sides < 3)
            return Bodies.circle(x, y, radius, options);

        var theta = 2 * Math.PI / sides,
            path = '',
            offset = theta * 0.5;

        for (var i = 0; i < sides; i += 1) {
            var angle = offset + (i * theta),
                xx = Math.cos(angle) * radius,
                yy = Math.sin(angle) * radius;

            path += 'L ' + xx.toFixed(3) + ' ' + yy.toFixed(3) + ' ';
        }

        var polygon = { 
            label: 'Polygon Body',
            position: { x: x, y: y },
            vertices: Vertices.fromPath(path)
        };

        if (options.chamfer) {
            var chamfer = options.chamfer;
            polygon.vertices = Vertices.chamfer(polygon.vertices, chamfer.radius, 
                                    chamfer.quality, chamfer.qualityMin, chamfer.qualityMax);
            delete options.chamfer;
        }

        return Body.create(Common.extend({}, polygon, options));
    };

    /**
     * Creates a body using the supplied vertices (or an array containing multiple sets of vertices).
     * If the vertices are convex, they will pass through as supplied.
     * Otherwise if the vertices are concave, they will be decomposed if [poly-decomp.js](https://github.com/schteppe/poly-decomp.js) is available.
     * Note that this process is not guaranteed to support complex sets of vertices (e.g. those with holes may fail).
     * By default the decomposition will discard collinear edges (to improve performance).
     * It can also optionally discard any parts that have an area less than `minimumArea`.
     * If the vertices can not be decomposed, the result will fall back to using the convex hull.
     * The options parameter is an object that specifies any `Matter.Body` properties you wish to override the defaults.
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method fromVertices
     * @param {number} x
     * @param {number} y
     * @param [[vector]] vertexSets
     * @param {object} [options]
     * @param {bool} [flagInternal=false]
     * @param {number} [removeCollinear=0.01]
     * @param {number} [minimumArea=10]
     * @return {body}
     */
    Bodies.fromVertices = function(x, y, vertexSets, options, flagInternal, removeCollinear, minimumArea) {
        if (!decomp) {
            decomp = Common._requireGlobal('decomp', 'poly-decomp');
        }

        var body,
            parts,
            isConvex,
            vertices,
            i,
            j,
            k,
            v,
            z;

        options = options || {};
        parts = [];

        flagInternal = typeof flagInternal !== 'undefined' ? flagInternal : false;
        removeCollinear = typeof removeCollinear !== 'undefined' ? removeCollinear : 0.01;
        minimumArea = typeof minimumArea !== 'undefined' ? minimumArea : 10;

        if (!decomp) {
            Common.warn('Bodies.fromVertices: poly-decomp.js required. Could not decompose vertices. Fallback to convex hull.');
        }

        // ensure vertexSets is an array of arrays
        if (!Common.isArray(vertexSets[0])) {
            vertexSets = [vertexSets];
        }

        for (v = 0; v < vertexSets.length; v += 1) {
            vertices = vertexSets[v];
            isConvex = Vertices.isConvex(vertices);

            if (isConvex || !decomp) {
                if (isConvex) {
                    vertices = Vertices.clockwiseSort(vertices);
                } else {
                    // fallback to convex hull when decomposition is not possible
                    vertices = Vertices.hull(vertices);
                }

                parts.push({
                    position: { x: x, y: y },
                    vertices: vertices
                });
            } else {
                // initialise a decomposition
                var concave = vertices.map(function(vertex) {
                    return [vertex.x, vertex.y];
                });

                // vertices are concave and simple, we can decompose into parts
                decomp.makeCCW(concave);
                if (removeCollinear !== false)
                    decomp.removeCollinearPoints(concave, removeCollinear);

                // use the quick decomposition algorithm (Bayazit)
                var decomposed = decomp.quickDecomp(concave);

                // for each decomposed chunk
                for (i = 0; i < decomposed.length; i++) {
                    var chunk = decomposed[i];

                    // convert vertices into the correct structure
                    var chunkVertices = chunk.map(function(vertices) {
                        return {
                            x: vertices[0],
                            y: vertices[1]
                        };
                    });

                    // skip small chunks
                    if (minimumArea > 0 && Vertices.area(chunkVertices) < minimumArea)
                        continue;

                    // create a compound part
                    parts.push({
                        position: Vertices.centre(chunkVertices),
                        vertices: chunkVertices
                    });
                }
            }
        }

        // create body parts
        for (i = 0; i < parts.length; i++) {
            parts[i] = Body.create(Common.extend(parts[i], options));
        }

        // flag internal edges (coincident part edges)
        if (flagInternal) {
            var coincident_max_dist = 5;

            for (i = 0; i < parts.length; i++) {
                var partA = parts[i];

                for (j = i + 1; j < parts.length; j++) {
                    var partB = parts[j];

                    if (Bounds.overlaps(partA.bounds, partB.bounds)) {
                        var pav = partA.vertices,
                            pbv = partB.vertices;

                        // iterate vertices of both parts
                        for (k = 0; k < partA.vertices.length; k++) {
                            for (z = 0; z < partB.vertices.length; z++) {
                                // find distances between the vertices
                                var da = Vector.magnitudeSquared(Vector.sub(pav[(k + 1) % pav.length], pbv[z])),
                                    db = Vector.magnitudeSquared(Vector.sub(pav[k], pbv[(z + 1) % pbv.length]));

                                // if both vertices are very close, consider the edge concident (internal)
                                if (da < coincident_max_dist && db < coincident_max_dist) {
                                    pav[k].isInternal = true;
                                    pbv[z].isInternal = true;
                                }
                            }
                        }

                    }
                }
            }
        }

        if (parts.length > 1) {
            // create the parent body to be returned, that contains generated compound parts
            body = Body.create(Common.extend({ parts: parts.slice(0) }, options));
            Body.setPosition(body, { x: x, y: y });

            return body;
        } else {
            return parts[0];
        }
    };

})();

},{"../body/Body":1,"../core/Common":14,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29}],24:[function(_dereq_,module,exports){
/**
* The `Matter.Composites` module contains factory methods for creating composite bodies
* with commonly used configurations (such as stacks and chains).
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Composites
*/

var Composites = {};

module.exports = Composites;

var Composite = _dereq_('../body/Composite');
var Constraint = _dereq_('../constraint/Constraint');
var Common = _dereq_('../core/Common');
var Body = _dereq_('../body/Body');
var Bodies = _dereq_('./Bodies');

(function() {

    /**
     * Create a new composite containing bodies created in the callback in a grid arrangement.
     * This function uses the body's bounds to prevent overlaps.
     * @method stack
     * @param {number} xx
     * @param {number} yy
     * @param {number} columns
     * @param {number} rows
     * @param {number} columnGap
     * @param {number} rowGap
     * @param {function} callback
     * @return {composite} A new composite containing objects created in the callback
     */
    Composites.stack = function(xx, yy, columns, rows, columnGap, rowGap, callback) {
        var stack = Composite.create({ label: 'Stack' }),
            x = xx,
            y = yy,
            lastBody,
            i = 0;

        for (var row = 0; row < rows; row++) {
            var maxHeight = 0;
            
            for (var column = 0; column < columns; column++) {
                var body = callback(x, y, column, row, lastBody, i);
                    
                if (body) {
                    var bodyHeight = body.bounds.max.y - body.bounds.min.y,
                        bodyWidth = body.bounds.max.x - body.bounds.min.x; 

                    if (bodyHeight > maxHeight)
                        maxHeight = bodyHeight;
                    
                    Body.translate(body, { x: bodyWidth * 0.5, y: bodyHeight * 0.5 });

                    x = body.bounds.max.x + columnGap;

                    Composite.addBody(stack, body);
                    
                    lastBody = body;
                    i += 1;
                } else {
                    x += columnGap;
                }
            }
            
            y += maxHeight + rowGap;
            x = xx;
        }

        return stack;
    };
    
    /**
     * Chains all bodies in the given composite together using constraints.
     * @method chain
     * @param {composite} composite
     * @param {number} xOffsetA
     * @param {number} yOffsetA
     * @param {number} xOffsetB
     * @param {number} yOffsetB
     * @param {object} options
     * @return {composite} A new composite containing objects chained together with constraints
     */
    Composites.chain = function(composite, xOffsetA, yOffsetA, xOffsetB, yOffsetB, options) {
        var bodies = composite.bodies;
        
        for (var i = 1; i < bodies.length; i++) {
            var bodyA = bodies[i - 1],
                bodyB = bodies[i],
                bodyAHeight = bodyA.bounds.max.y - bodyA.bounds.min.y,
                bodyAWidth = bodyA.bounds.max.x - bodyA.bounds.min.x, 
                bodyBHeight = bodyB.bounds.max.y - bodyB.bounds.min.y,
                bodyBWidth = bodyB.bounds.max.x - bodyB.bounds.min.x;
        
            var defaults = {
                bodyA: bodyA,
                pointA: { x: bodyAWidth * xOffsetA, y: bodyAHeight * yOffsetA },
                bodyB: bodyB,
                pointB: { x: bodyBWidth * xOffsetB, y: bodyBHeight * yOffsetB }
            };
            
            var constraint = Common.extend(defaults, options);
        
            Composite.addConstraint(composite, Constraint.create(constraint));
        }

        composite.label += ' Chain';
        
        return composite;
    };

    /**
     * Connects bodies in the composite with constraints in a grid pattern, with optional cross braces.
     * @method mesh
     * @param {composite} composite
     * @param {number} columns
     * @param {number} rows
     * @param {boolean} crossBrace
     * @param {object} options
     * @return {composite} The composite containing objects meshed together with constraints
     */
    Composites.mesh = function(composite, columns, rows, crossBrace, options) {
        var bodies = composite.bodies,
            row,
            col,
            bodyA,
            bodyB,
            bodyC;
        
        for (row = 0; row < rows; row++) {
            for (col = 1; col < columns; col++) {
                bodyA = bodies[(col - 1) + (row * columns)];
                bodyB = bodies[col + (row * columns)];
                Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyA, bodyB: bodyB }, options)));
            }

            if (row > 0) {
                for (col = 0; col < columns; col++) {
                    bodyA = bodies[col + ((row - 1) * columns)];
                    bodyB = bodies[col + (row * columns)];
                    Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyA, bodyB: bodyB }, options)));

                    if (crossBrace && col > 0) {
                        bodyC = bodies[(col - 1) + ((row - 1) * columns)];
                        Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyC, bodyB: bodyB }, options)));
                    }

                    if (crossBrace && col < columns - 1) {
                        bodyC = bodies[(col + 1) + ((row - 1) * columns)];
                        Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyC, bodyB: bodyB }, options)));
                    }
                }
            }
        }

        composite.label += ' Mesh';
        
        return composite;
    };
    
    /**
     * Create a new composite containing bodies created in the callback in a pyramid arrangement.
     * This function uses the body's bounds to prevent overlaps.
     * @method pyramid
     * @param {number} xx
     * @param {number} yy
     * @param {number} columns
     * @param {number} rows
     * @param {number} columnGap
     * @param {number} rowGap
     * @param {function} callback
     * @return {composite} A new composite containing objects created in the callback
     */
    Composites.pyramid = function(xx, yy, columns, rows, columnGap, rowGap, callback) {
        return Composites.stack(xx, yy, columns, rows, columnGap, rowGap, function(x, y, column, row, lastBody, i) {
            var actualRows = Math.min(rows, Math.ceil(columns / 2)),
                lastBodyWidth = lastBody ? lastBody.bounds.max.x - lastBody.bounds.min.x : 0;
            
            if (row > actualRows)
                return;
            
            // reverse row order
            row = actualRows - row;
            
            var start = row,
                end = columns - 1 - row;

            if (column < start || column > end)
                return;
            
            // retroactively fix the first body's position, since width was unknown
            if (i === 1) {
                Body.translate(lastBody, { x: (column + (columns % 2 === 1 ? 1 : -1)) * lastBodyWidth, y: 0 });
            }

            var xOffset = lastBody ? column * lastBodyWidth : 0;
            
            return callback(xx + xOffset + column * columnGap, y, column, row, lastBody, i);
        });
    };

    /**
     * Creates a composite with a Newton's Cradle setup of bodies and constraints.
     * @method newtonsCradle
     * @param {number} xx
     * @param {number} yy
     * @param {number} number
     * @param {number} size
     * @param {number} length
     * @return {composite} A new composite newtonsCradle body
     */
    Composites.newtonsCradle = function(xx, yy, number, size, length) {
        var newtonsCradle = Composite.create({ label: 'Newtons Cradle' });

        for (var i = 0; i < number; i++) {
            var separation = 1.9,
                circle = Bodies.circle(xx + i * (size * separation), yy + length, size, 
                            { inertia: Infinity, restitution: 1, friction: 0, frictionAir: 0.0001, slop: 1 }),
                constraint = Constraint.create({ pointA: { x: xx + i * (size * separation), y: yy }, bodyB: circle });

            Composite.addBody(newtonsCradle, circle);
            Composite.addConstraint(newtonsCradle, constraint);
        }

        return newtonsCradle;
    };
    
    /**
     * Creates a composite with simple car setup of bodies and constraints.
     * @method car
     * @param {number} xx
     * @param {number} yy
     * @param {number} width
     * @param {number} height
     * @param {number} wheelSize
     * @return {composite} A new composite car body
     */
    Composites.car = function(xx, yy, width, height, wheelSize) {
        var group = Body.nextGroup(true),
            wheelBase = 20,
            wheelAOffset = -width * 0.5 + wheelBase,
            wheelBOffset = width * 0.5 - wheelBase,
            wheelYOffset = 0;
    
        var car = Composite.create({ label: 'Car' }),
            body = Bodies.rectangle(xx, yy, width, height, { 
                collisionFilter: {
                    group: group
                },
                chamfer: {
                    radius: height * 0.5
                },
                density: 0.0002
            });
    
        var wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, { 
            collisionFilter: {
                group: group
            },
            friction: 0.8
        });
                    
        var wheelB = Bodies.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, { 
            collisionFilter: {
                group: group
            },
            friction: 0.8
        });
                    
        var axelA = Constraint.create({
            bodyB: body,
            pointB: { x: wheelAOffset, y: wheelYOffset },
            bodyA: wheelA,
            stiffness: 1,
            length: 0
        });
                        
        var axelB = Constraint.create({
            bodyB: body,
            pointB: { x: wheelBOffset, y: wheelYOffset },
            bodyA: wheelB,
            stiffness: 1,
            length: 0
        });
        
        Composite.addBody(car, body);
        Composite.addBody(car, wheelA);
        Composite.addBody(car, wheelB);
        Composite.addConstraint(car, axelA);
        Composite.addConstraint(car, axelB);

        return car;
    };

    /**
     * Creates a simple soft body like object.
     * @method softBody
     * @param {number} xx
     * @param {number} yy
     * @param {number} columns
     * @param {number} rows
     * @param {number} columnGap
     * @param {number} rowGap
     * @param {boolean} crossBrace
     * @param {number} particleRadius
     * @param {} particleOptions
     * @param {} constraintOptions
     * @return {composite} A new composite softBody
     */
    Composites.softBody = function(xx, yy, columns, rows, columnGap, rowGap, crossBrace, particleRadius, particleOptions, constraintOptions) {
        particleOptions = Common.extend({ inertia: Infinity }, particleOptions);
        constraintOptions = Common.extend({ stiffness: 0.2, render: { type: 'line', anchors: false } }, constraintOptions);

        var softBody = Composites.stack(xx, yy, columns, rows, columnGap, rowGap, function(x, y) {
            return Bodies.circle(x, y, particleRadius, particleOptions);
        });

        Composites.mesh(softBody, columns, rows, crossBrace, constraintOptions);

        softBody.label = 'Soft Body';

        return softBody;
    };

})();

},{"../body/Body":1,"../body/Composite":2,"../constraint/Constraint":12,"../core/Common":14,"./Bodies":23}],25:[function(_dereq_,module,exports){
/**
* The `Matter.Axes` module contains methods for creating and manipulating sets of axes.
*
* @class Axes
*/

var Axes = {};

module.exports = Axes;

var Vector = _dereq_('../geometry/Vector');
var Common = _dereq_('../core/Common');

(function() {

    /**
     * Creates a new set of axes from the given vertices.
     * @method fromVertices
     * @param {vertices} vertices
     * @return {axes} A new axes from the given vertices
     */
    Axes.fromVertices = function(vertices) {
        var axes = {};

        // find the unique axes, using edge normal gradients
        for (var i = 0; i < vertices.length; i++) {
            var j = (i + 1) % vertices.length, 
                normal = Vector.normalise({ 
                    x: vertices[j].y - vertices[i].y, 
                    y: vertices[i].x - vertices[j].x
                }),
                gradient = (normal.y === 0) ? Infinity : (normal.x / normal.y);
            
            // limit precision
            gradient = gradient.toFixed(3).toString();
            axes[gradient] = normal;
        }

        return Common.values(axes);
    };

    /**
     * Rotates a set of axes by the given angle.
     * @method rotate
     * @param {axes} axes
     * @param {number} angle
     */
    Axes.rotate = function(axes, angle) {
        if (angle === 0)
            return;
        
        var cos = Math.cos(angle),
            sin = Math.sin(angle);

        for (var i = 0; i < axes.length; i++) {
            var axis = axes[i],
                xx;
            xx = axis.x * cos - axis.y * sin;
            axis.y = axis.x * sin + axis.y * cos;
            axis.x = xx;
        }
    };

})();

},{"../core/Common":14,"../geometry/Vector":28}],26:[function(_dereq_,module,exports){
/**
* The `Matter.Bounds` module contains methods for creating and manipulating axis-aligned bounding boxes (AABB).
*
* @class Bounds
*/

var Bounds = {};

module.exports = Bounds;

(function() {

    /**
     * Creates a new axis-aligned bounding box (AABB) for the given vertices.
     * @method create
     * @param {vertices} vertices
     * @return {bounds} A new bounds object
     */
    Bounds.create = function(vertices) {
        var bounds = { 
            min: { x: 0, y: 0 }, 
            max: { x: 0, y: 0 }
        };

        if (vertices)
            Bounds.update(bounds, vertices);
        
        return bounds;
    };

    /**
     * Updates bounds using the given vertices and extends the bounds given a velocity.
     * @method update
     * @param {bounds} bounds
     * @param {vertices} vertices
     * @param {vector} velocity
     */
    Bounds.update = function(bounds, vertices, velocity) {
        bounds.min.x = Infinity;
        bounds.max.x = -Infinity;
        bounds.min.y = Infinity;
        bounds.max.y = -Infinity;

        for (var i = 0; i < vertices.length; i++) {
            var vertex = vertices[i];
            if (vertex.x > bounds.max.x) bounds.max.x = vertex.x;
            if (vertex.x < bounds.min.x) bounds.min.x = vertex.x;
            if (vertex.y > bounds.max.y) bounds.max.y = vertex.y;
            if (vertex.y < bounds.min.y) bounds.min.y = vertex.y;
        }
        
        if (velocity) {
            if (velocity.x > 0) {
                bounds.max.x += velocity.x;
            } else {
                bounds.min.x += velocity.x;
            }
            
            if (velocity.y > 0) {
                bounds.max.y += velocity.y;
            } else {
                bounds.min.y += velocity.y;
            }
        }
    };

    /**
     * Returns true if the bounds contains the given point.
     * @method contains
     * @param {bounds} bounds
     * @param {vector} point
     * @return {boolean} True if the bounds contain the point, otherwise false
     */
    Bounds.contains = function(bounds, point) {
        return point.x >= bounds.min.x && point.x <= bounds.max.x 
               && point.y >= bounds.min.y && point.y <= bounds.max.y;
    };

    /**
     * Returns true if the two bounds intersect.
     * @method overlaps
     * @param {bounds} boundsA
     * @param {bounds} boundsB
     * @return {boolean} True if the bounds overlap, otherwise false
     */
    Bounds.overlaps = function(boundsA, boundsB) {
        return (boundsA.min.x <= boundsB.max.x && boundsA.max.x >= boundsB.min.x
                && boundsA.max.y >= boundsB.min.y && boundsA.min.y <= boundsB.max.y);
    };

    /**
     * Translates the bounds by the given vector.
     * @method translate
     * @param {bounds} bounds
     * @param {vector} vector
     */
    Bounds.translate = function(bounds, vector) {
        bounds.min.x += vector.x;
        bounds.max.x += vector.x;
        bounds.min.y += vector.y;
        bounds.max.y += vector.y;
    };

    /**
     * Shifts the bounds to the given position.
     * @method shift
     * @param {bounds} bounds
     * @param {vector} position
     */
    Bounds.shift = function(bounds, position) {
        var deltaX = bounds.max.x - bounds.min.x,
            deltaY = bounds.max.y - bounds.min.y;
            
        bounds.min.x = position.x;
        bounds.max.x = position.x + deltaX;
        bounds.min.y = position.y;
        bounds.max.y = position.y + deltaY;
    };
    
})();

},{}],27:[function(_dereq_,module,exports){
/**
* The `Matter.Svg` module contains methods for converting SVG images into an array of vector points.
*
* To use this module you also need the SVGPathSeg polyfill: https://github.com/progers/pathseg
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Svg
*/

var Svg = {};

module.exports = Svg;

var Bounds = _dereq_('../geometry/Bounds');
var Common = _dereq_('../core/Common');

(function() {

    /**
     * Converts an SVG path into an array of vector points.
     * If the input path forms a concave shape, you must decompose the result into convex parts before use.
     * See `Bodies.fromVertices` which provides support for this.
     * Note that this function is not guaranteed to support complex paths (such as those with holes).
     * You must load the `pathseg.js` polyfill on newer browsers.
     * @method pathToVertices
     * @param {SVGPathElement} path
     * @param {Number} [sampleLength=15]
     * @return {Vector[]} points
     */
    Svg.pathToVertices = function(path, sampleLength) {
        if (typeof window !== 'undefined' && !('SVGPathSeg' in window)) {
            Common.warn('Svg.pathToVertices: SVGPathSeg not defined, a polyfill is required.');
        }

        // https://github.com/wout/svg.topoly.js/blob/master/svg.topoly.js
        var i, il, total, point, segment, segments, 
            segmentsQueue, lastSegment, 
            lastPoint, segmentIndex, points = [],
            lx, ly, length = 0, x = 0, y = 0;

        sampleLength = sampleLength || 15;

        var addPoint = function(px, py, pathSegType) {
            // all odd-numbered path types are relative except PATHSEG_CLOSEPATH (1)
            var isRelative = pathSegType % 2 === 1 && pathSegType > 1;

            // when the last point doesn't equal the current point add the current point
            if (!lastPoint || px != lastPoint.x || py != lastPoint.y) {
                if (lastPoint && isRelative) {
                    lx = lastPoint.x;
                    ly = lastPoint.y;
                } else {
                    lx = 0;
                    ly = 0;
                }

                var point = {
                    x: lx + px,
                    y: ly + py
                };

                // set last point
                if (isRelative || !lastPoint) {
                    lastPoint = point;
                }

                points.push(point);

                x = lx + px;
                y = ly + py;
            }
        };

        var addSegmentPoint = function(segment) {
            var segType = segment.pathSegTypeAsLetter.toUpperCase();

            // skip path ends
            if (segType === 'Z') 
                return;

            // map segment to x and y
            switch (segType) {

            case 'M':
            case 'L':
            case 'T':
            case 'C':
            case 'S':
            case 'Q':
                x = segment.x;
                y = segment.y;
                break;
            case 'H':
                x = segment.x;
                break;
            case 'V':
                y = segment.y;
                break;
            }

            addPoint(x, y, segment.pathSegType);
        };

        // ensure path is absolute
        Svg._svgPathToAbsolute(path);

        // get total length
        total = path.getTotalLength();

        // queue segments
        segments = [];
        for (i = 0; i < path.pathSegList.numberOfItems; i += 1)
            segments.push(path.pathSegList.getItem(i));

        segmentsQueue = segments.concat();

        // sample through path
        while (length < total) {
            // get segment at position
            segmentIndex = path.getPathSegAtLength(length);
            segment = segments[segmentIndex];

            // new segment
            if (segment != lastSegment) {
                while (segmentsQueue.length && segmentsQueue[0] != segment)
                    addSegmentPoint(segmentsQueue.shift());

                lastSegment = segment;
            }

            // add points in between when curving
            // TODO: adaptive sampling
            switch (segment.pathSegTypeAsLetter.toUpperCase()) {

            case 'C':
            case 'T':
            case 'S':
            case 'Q':
            case 'A':
                point = path.getPointAtLength(length);
                addPoint(point.x, point.y, 0);
                break;

            }

            // increment by sample value
            length += sampleLength;
        }

        // add remaining segments not passed by sampling
        for (i = 0, il = segmentsQueue.length; i < il; ++i)
            addSegmentPoint(segmentsQueue[i]);

        return points;
    };

    Svg._svgPathToAbsolute = function(path) {
        // http://phrogz.net/convert-svg-path-to-all-absolute-commands
        // Copyright (c) Gavin Kistner
        // http://phrogz.net/js/_ReuseLicense.txt
        // Modifications: tidy formatting and naming
        var x0, y0, x1, y1, x2, y2, segs = path.pathSegList,
            x = 0, y = 0, len = segs.numberOfItems;

        for (var i = 0; i < len; ++i) {
            var seg = segs.getItem(i),
                segType = seg.pathSegTypeAsLetter;

            if (/[MLHVCSQTA]/.test(segType)) {
                if ('x' in seg) x = seg.x;
                if ('y' in seg) y = seg.y;
            } else {
                if ('x1' in seg) x1 = x + seg.x1;
                if ('x2' in seg) x2 = x + seg.x2;
                if ('y1' in seg) y1 = y + seg.y1;
                if ('y2' in seg) y2 = y + seg.y2;
                if ('x' in seg) x += seg.x;
                if ('y' in seg) y += seg.y;

                switch (segType) {

                case 'm':
                    segs.replaceItem(path.createSVGPathSegMovetoAbs(x, y), i);
                    break;
                case 'l':
                    segs.replaceItem(path.createSVGPathSegLinetoAbs(x, y), i);
                    break;
                case 'h':
                    segs.replaceItem(path.createSVGPathSegLinetoHorizontalAbs(x), i);
                    break;
                case 'v':
                    segs.replaceItem(path.createSVGPathSegLinetoVerticalAbs(y), i);
                    break;
                case 'c':
                    segs.replaceItem(path.createSVGPathSegCurvetoCubicAbs(x, y, x1, y1, x2, y2), i);
                    break;
                case 's':
                    segs.replaceItem(path.createSVGPathSegCurvetoCubicSmoothAbs(x, y, x2, y2), i);
                    break;
                case 'q':
                    segs.replaceItem(path.createSVGPathSegCurvetoQuadraticAbs(x, y, x1, y1), i);
                    break;
                case 't':
                    segs.replaceItem(path.createSVGPathSegCurvetoQuadraticSmoothAbs(x, y), i);
                    break;
                case 'a':
                    segs.replaceItem(path.createSVGPathSegArcAbs(x, y, seg.r1, seg.r2, seg.angle, seg.largeArcFlag, seg.sweepFlag), i);
                    break;
                case 'z':
                case 'Z':
                    x = x0;
                    y = y0;
                    break;

                }
            }

            if (segType == 'M' || segType == 'm') {
                x0 = x;
                y0 = y;
            }
        }
    };

})();
},{"../core/Common":14,"../geometry/Bounds":26}],28:[function(_dereq_,module,exports){
/**
* The `Matter.Vector` module contains methods for creating and manipulating vectors.
* Vectors are the basis of all the geometry related operations in the engine.
* A `Matter.Vector` object is of the form `{ x: 0, y: 0 }`.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Vector
*/

// TODO: consider params for reusing vector objects

var Vector = {};

module.exports = Vector;

(function() {

    /**
     * Creates a new vector.
     * @method create
     * @param {number} x
     * @param {number} y
     * @return {vector} A new vector
     */
    Vector.create = function(x, y) {
        return { x: x || 0, y: y || 0 };
    };

    /**
     * Returns a new vector with `x` and `y` copied from the given `vector`.
     * @method clone
     * @param {vector} vector
     * @return {vector} A new cloned vector
     */
    Vector.clone = function(vector) {
        return { x: vector.x, y: vector.y };
    };

    /**
     * Returns the magnitude (length) of a vector.
     * @method magnitude
     * @param {vector} vector
     * @return {number} The magnitude of the vector
     */
    Vector.magnitude = function(vector) {
        return Math.sqrt((vector.x * vector.x) + (vector.y * vector.y));
    };

    /**
     * Returns the magnitude (length) of a vector (therefore saving a `sqrt` operation).
     * @method magnitudeSquared
     * @param {vector} vector
     * @return {number} The squared magnitude of the vector
     */
    Vector.magnitudeSquared = function(vector) {
        return (vector.x * vector.x) + (vector.y * vector.y);
    };

    /**
     * Rotates the vector about (0, 0) by specified angle.
     * @method rotate
     * @param {vector} vector
     * @param {number} angle
     * @param {vector} [output]
     * @return {vector} The vector rotated about (0, 0)
     */
    Vector.rotate = function(vector, angle, output) {
        var cos = Math.cos(angle), sin = Math.sin(angle);
        if (!output) output = {};
        var x = vector.x * cos - vector.y * sin;
        output.y = vector.x * sin + vector.y * cos;
        output.x = x;
        return output;
    };

    /**
     * Rotates the vector about a specified point by specified angle.
     * @method rotateAbout
     * @param {vector} vector
     * @param {number} angle
     * @param {vector} point
     * @param {vector} [output]
     * @return {vector} A new vector rotated about the point
     */
    Vector.rotateAbout = function(vector, angle, point, output) {
        var cos = Math.cos(angle), sin = Math.sin(angle);
        if (!output) output = {};
        var x = point.x + ((vector.x - point.x) * cos - (vector.y - point.y) * sin);
        output.y = point.y + ((vector.x - point.x) * sin + (vector.y - point.y) * cos);
        output.x = x;
        return output;
    };

    /**
     * Normalises a vector (such that its magnitude is `1`).
     * @method normalise
     * @param {vector} vector
     * @return {vector} A new vector normalised
     */
    Vector.normalise = function(vector) {
        var magnitude = Vector.magnitude(vector);
        if (magnitude === 0)
            return { x: 0, y: 0 };
        return { x: vector.x / magnitude, y: vector.y / magnitude };
    };

    /**
     * Returns the dot-product of two vectors.
     * @method dot
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The dot product of the two vectors
     */
    Vector.dot = function(vectorA, vectorB) {
        return (vectorA.x * vectorB.x) + (vectorA.y * vectorB.y);
    };

    /**
     * Returns the cross-product of two vectors.
     * @method cross
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The cross product of the two vectors
     */
    Vector.cross = function(vectorA, vectorB) {
        return (vectorA.x * vectorB.y) - (vectorA.y * vectorB.x);
    };

    /**
     * Returns the cross-product of three vectors.
     * @method cross3
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @param {vector} vectorC
     * @return {number} The cross product of the three vectors
     */
    Vector.cross3 = function(vectorA, vectorB, vectorC) {
        return (vectorB.x - vectorA.x) * (vectorC.y - vectorA.y) - (vectorB.y - vectorA.y) * (vectorC.x - vectorA.x);
    };

    /**
     * Adds the two vectors.
     * @method add
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @param {vector} [output]
     * @return {vector} A new vector of vectorA and vectorB added
     */
    Vector.add = function(vectorA, vectorB, output) {
        if (!output) output = {};
        output.x = vectorA.x + vectorB.x;
        output.y = vectorA.y + vectorB.y;
        return output;
    };

    /**
     * Subtracts the two vectors.
     * @method sub
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @param {vector} [output]
     * @return {vector} A new vector of vectorA and vectorB subtracted
     */
    Vector.sub = function(vectorA, vectorB, output) {
        if (!output) output = {};
        output.x = vectorA.x - vectorB.x;
        output.y = vectorA.y - vectorB.y;
        return output;
    };

    /**
     * Multiplies a vector and a scalar.
     * @method mult
     * @param {vector} vector
     * @param {number} scalar
     * @return {vector} A new vector multiplied by scalar
     */
    Vector.mult = function(vector, scalar) {
        return { x: vector.x * scalar, y: vector.y * scalar };
    };

    /**
     * Divides a vector and a scalar.
     * @method div
     * @param {vector} vector
     * @param {number} scalar
     * @return {vector} A new vector divided by scalar
     */
    Vector.div = function(vector, scalar) {
        return { x: vector.x / scalar, y: vector.y / scalar };
    };

    /**
     * Returns the perpendicular vector. Set `negate` to true for the perpendicular in the opposite direction.
     * @method perp
     * @param {vector} vector
     * @param {bool} [negate=false]
     * @return {vector} The perpendicular vector
     */
    Vector.perp = function(vector, negate) {
        negate = negate === true ? -1 : 1;
        return { x: negate * -vector.y, y: negate * vector.x };
    };

    /**
     * Negates both components of a vector such that it points in the opposite direction.
     * @method neg
     * @param {vector} vector
     * @return {vector} The negated vector
     */
    Vector.neg = function(vector) {
        return { x: -vector.x, y: -vector.y };
    };

    /**
     * Returns the angle between the vector `vectorB - vectorA` and the x-axis in radians.
     * @method angle
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The angle in radians
     */
    Vector.angle = function(vectorA, vectorB) {
        return Math.atan2(vectorB.y - vectorA.y, vectorB.x - vectorA.x);
    };

    /**
     * Temporary vector pool (not thread-safe).
     * @property _temp
     * @type {vector[]}
     * @private
     */
    Vector._temp = [
        Vector.create(), Vector.create(), 
        Vector.create(), Vector.create(), 
        Vector.create(), Vector.create()
    ];

})();
},{}],29:[function(_dereq_,module,exports){
/**
* The `Matter.Vertices` module contains methods for creating and manipulating sets of vertices.
* A set of vertices is an array of `Matter.Vector` with additional indexing properties inserted by `Vertices.create`.
* A `Matter.Body` maintains a set of vertices to represent the shape of the object (its convex hull).
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Vertices
*/

var Vertices = {};

module.exports = Vertices;

var Vector = _dereq_('../geometry/Vector');
var Common = _dereq_('../core/Common');

(function() {

    /**
     * Creates a new set of `Matter.Body` compatible vertices.
     * The `points` argument accepts an array of `Matter.Vector` points orientated around the origin `(0, 0)`, for example:
     *
     *     [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]
     *
     * The `Vertices.create` method returns a new array of vertices, which are similar to Matter.Vector objects,
     * but with some additional references required for efficient collision detection routines.
     *
     * Vertices must be specified in clockwise order.
     *
     * Note that the `body` argument is not optional, a `Matter.Body` reference must be provided.
     *
     * @method create
     * @param {vector[]} points
     * @param {body} body
     */
    Vertices.create = function(points, body) {
        var vertices = [];

        for (var i = 0; i < points.length; i++) {
            var point = points[i],
                vertex = {
                    x: point.x,
                    y: point.y,
                    index: i,
                    body: body,
                    isInternal: false
                };

            vertices.push(vertex);
        }

        return vertices;
    };

    /**
     * Parses a string containing ordered x y pairs separated by spaces (and optionally commas), 
     * into a `Matter.Vertices` object for the given `Matter.Body`.
     * For parsing SVG paths, see `Svg.pathToVertices`.
     * @method fromPath
     * @param {string} path
     * @param {body} body
     * @return {vertices} vertices
     */
    Vertices.fromPath = function(path, body) {
        var pathPattern = /L?\s*([\-\d\.e]+)[\s,]*([\-\d\.e]+)*/ig,
            points = [];

        path.replace(pathPattern, function(match, x, y) {
            points.push({ x: parseFloat(x), y: parseFloat(y) });
        });

        return Vertices.create(points, body);
    };

    /**
     * Returns the centre (centroid) of the set of vertices.
     * @method centre
     * @param {vertices} vertices
     * @return {vector} The centre point
     */
    Vertices.centre = function(vertices) {
        var area = Vertices.area(vertices, true),
            centre = { x: 0, y: 0 },
            cross,
            temp,
            j;

        for (var i = 0; i < vertices.length; i++) {
            j = (i + 1) % vertices.length;
            cross = Vector.cross(vertices[i], vertices[j]);
            temp = Vector.mult(Vector.add(vertices[i], vertices[j]), cross);
            centre = Vector.add(centre, temp);
        }

        return Vector.div(centre, 6 * area);
    };

    /**
     * Returns the average (mean) of the set of vertices.
     * @method mean
     * @param {vertices} vertices
     * @return {vector} The average point
     */
    Vertices.mean = function(vertices) {
        var average = { x: 0, y: 0 };

        for (var i = 0; i < vertices.length; i++) {
            average.x += vertices[i].x;
            average.y += vertices[i].y;
        }

        return Vector.div(average, vertices.length);
    };

    /**
     * Returns the area of the set of vertices.
     * @method area
     * @param {vertices} vertices
     * @param {bool} signed
     * @return {number} The area
     */
    Vertices.area = function(vertices, signed) {
        var area = 0,
            j = vertices.length - 1;

        for (var i = 0; i < vertices.length; i++) {
            area += (vertices[j].x - vertices[i].x) * (vertices[j].y + vertices[i].y);
            j = i;
        }

        if (signed)
            return area / 2;

        return Math.abs(area) / 2;
    };

    /**
     * Returns the moment of inertia (second moment of area) of the set of vertices given the total mass.
     * @method inertia
     * @param {vertices} vertices
     * @param {number} mass
     * @return {number} The polygon's moment of inertia
     */
    Vertices.inertia = function(vertices, mass) {
        var numerator = 0,
            denominator = 0,
            v = vertices,
            cross,
            j;

        // find the polygon's moment of inertia, using second moment of area
        // from equations at http://www.physicsforums.com/showthread.php?t=25293
        for (var n = 0; n < v.length; n++) {
            j = (n + 1) % v.length;
            cross = Math.abs(Vector.cross(v[j], v[n]));
            numerator += cross * (Vector.dot(v[j], v[j]) + Vector.dot(v[j], v[n]) + Vector.dot(v[n], v[n]));
            denominator += cross;
        }

        return (mass / 6) * (numerator / denominator);
    };

    /**
     * Translates the set of vertices in-place.
     * @method translate
     * @param {vertices} vertices
     * @param {vector} vector
     * @param {number} scalar
     */
    Vertices.translate = function(vertices, vector, scalar) {
        var i;
        if (scalar) {
            for (i = 0; i < vertices.length; i++) {
                vertices[i].x += vector.x * scalar;
                vertices[i].y += vector.y * scalar;
            }
        } else {
            for (i = 0; i < vertices.length; i++) {
                vertices[i].x += vector.x;
                vertices[i].y += vector.y;
            }
        }

        return vertices;
    };

    /**
     * Rotates the set of vertices in-place.
     * @method rotate
     * @param {vertices} vertices
     * @param {number} angle
     * @param {vector} point
     */
    Vertices.rotate = function(vertices, angle, point) {
        if (angle === 0)
            return;

        var cos = Math.cos(angle),
            sin = Math.sin(angle);

        for (var i = 0; i < vertices.length; i++) {
            var vertice = vertices[i],
                dx = vertice.x - point.x,
                dy = vertice.y - point.y;
                
            vertice.x = point.x + (dx * cos - dy * sin);
            vertice.y = point.y + (dx * sin + dy * cos);
        }

        return vertices;
    };

    /**
     * Returns `true` if the `point` is inside the set of `vertices`.
     * @method contains
     * @param {vertices} vertices
     * @param {vector} point
     * @return {boolean} True if the vertices contains point, otherwise false
     */
    Vertices.contains = function(vertices, point) {
        for (var i = 0; i < vertices.length; i++) {
            var vertice = vertices[i],
                nextVertice = vertices[(i + 1) % vertices.length];
            if ((point.x - vertice.x) * (nextVertice.y - vertice.y) + (point.y - vertice.y) * (vertice.x - nextVertice.x) > 0) {
                return false;
            }
        }

        return true;
    };

    /**
     * Scales the vertices from a point (default is centre) in-place.
     * @method scale
     * @param {vertices} vertices
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {vector} point
     */
    Vertices.scale = function(vertices, scaleX, scaleY, point) {
        if (scaleX === 1 && scaleY === 1)
            return vertices;

        point = point || Vertices.centre(vertices);

        var vertex,
            delta;

        for (var i = 0; i < vertices.length; i++) {
            vertex = vertices[i];
            delta = Vector.sub(vertex, point);
            vertices[i].x = point.x + delta.x * scaleX;
            vertices[i].y = point.y + delta.y * scaleY;
        }

        return vertices;
    };

    /**
     * Chamfers a set of vertices by giving them rounded corners, returns a new set of vertices.
     * The radius parameter is a single number or an array to specify the radius for each vertex.
     * @method chamfer
     * @param {vertices} vertices
     * @param {number[]} radius
     * @param {number} quality
     * @param {number} qualityMin
     * @param {number} qualityMax
     */
    Vertices.chamfer = function(vertices, radius, quality, qualityMin, qualityMax) {
        if (typeof radius === 'number') {
            radius = [radius];
        } else {
            radius = radius || [8];
        }

        // quality defaults to -1, which is auto
        quality = (typeof quality !== 'undefined') ? quality : -1;
        qualityMin = qualityMin || 2;
        qualityMax = qualityMax || 14;

        var newVertices = [];

        for (var i = 0; i < vertices.length; i++) {
            var prevVertex = vertices[i - 1 >= 0 ? i - 1 : vertices.length - 1],
                vertex = vertices[i],
                nextVertex = vertices[(i + 1) % vertices.length],
                currentRadius = radius[i < radius.length ? i : radius.length - 1];

            if (currentRadius === 0) {
                newVertices.push(vertex);
                continue;
            }

            var prevNormal = Vector.normalise({ 
                x: vertex.y - prevVertex.y, 
                y: prevVertex.x - vertex.x
            });

            var nextNormal = Vector.normalise({ 
                x: nextVertex.y - vertex.y, 
                y: vertex.x - nextVertex.x
            });

            var diagonalRadius = Math.sqrt(2 * Math.pow(currentRadius, 2)),
                radiusVector = Vector.mult(Common.clone(prevNormal), currentRadius),
                midNormal = Vector.normalise(Vector.mult(Vector.add(prevNormal, nextNormal), 0.5)),
                scaledVertex = Vector.sub(vertex, Vector.mult(midNormal, diagonalRadius));

            var precision = quality;

            if (quality === -1) {
                // automatically decide precision
                precision = Math.pow(currentRadius, 0.32) * 1.75;
            }

            precision = Common.clamp(precision, qualityMin, qualityMax);

            // use an even value for precision, more likely to reduce axes by using symmetry
            if (precision % 2 === 1)
                precision += 1;

            var alpha = Math.acos(Vector.dot(prevNormal, nextNormal)),
                theta = alpha / precision;

            for (var j = 0; j < precision; j++) {
                newVertices.push(Vector.add(Vector.rotate(radiusVector, theta * j), scaledVertex));
            }
        }

        return newVertices;
    };

    /**
     * Sorts the input vertices into clockwise order in place.
     * @method clockwiseSort
     * @param {vertices} vertices
     * @return {vertices} vertices
     */
    Vertices.clockwiseSort = function(vertices) {
        var centre = Vertices.mean(vertices);

        vertices.sort(function(vertexA, vertexB) {
            return Vector.angle(centre, vertexA) - Vector.angle(centre, vertexB);
        });

        return vertices;
    };

    /**
     * Returns true if the vertices form a convex shape (vertices must be in clockwise order).
     * @method isConvex
     * @param {vertices} vertices
     * @return {bool} `true` if the `vertices` are convex, `false` if not (or `null` if not computable).
     */
    Vertices.isConvex = function(vertices) {
        // http://paulbourke.net/geometry/polygonmesh/
        // Copyright (c) Paul Bourke (use permitted)

        var flag = 0,
            n = vertices.length,
            i,
            j,
            k,
            z;

        if (n < 3)
            return null;

        for (i = 0; i < n; i++) {
            j = (i + 1) % n;
            k = (i + 2) % n;
            z = (vertices[j].x - vertices[i].x) * (vertices[k].y - vertices[j].y);
            z -= (vertices[j].y - vertices[i].y) * (vertices[k].x - vertices[j].x);

            if (z < 0) {
                flag |= 1;
            } else if (z > 0) {
                flag |= 2;
            }

            if (flag === 3) {
                return false;
            }
        }

        if (flag !== 0){
            return true;
        } else {
            return null;
        }
    };

    /**
     * Returns the convex hull of the input vertices as a new array of points.
     * @method hull
     * @param {vertices} vertices
     * @return [vertex] vertices
     */
    Vertices.hull = function(vertices) {
        // http://geomalgorithms.com/a10-_hull-1.html

        var upper = [],
            lower = [], 
            vertex,
            i;

        // sort vertices on x-axis (y-axis for ties)
        vertices = vertices.slice(0);
        vertices.sort(function(vertexA, vertexB) {
            var dx = vertexA.x - vertexB.x;
            return dx !== 0 ? dx : vertexA.y - vertexB.y;
        });

        // build lower hull
        for (i = 0; i < vertices.length; i += 1) {
            vertex = vertices[i];

            while (lower.length >= 2 
                   && Vector.cross3(lower[lower.length - 2], lower[lower.length - 1], vertex) <= 0) {
                lower.pop();
            }

            lower.push(vertex);
        }

        // build upper hull
        for (i = vertices.length - 1; i >= 0; i -= 1) {
            vertex = vertices[i];

            while (upper.length >= 2 
                   && Vector.cross3(upper[upper.length - 2], upper[upper.length - 1], vertex) <= 0) {
                upper.pop();
            }

            upper.push(vertex);
        }

        // concatenation of the lower and upper hulls gives the convex hull
        // omit last points because they are repeated at the beginning of the other list
        upper.pop();
        lower.pop();

        return upper.concat(lower);
    };

})();

},{"../core/Common":14,"../geometry/Vector":28}],30:[function(_dereq_,module,exports){
var Matter = module.exports = _dereq_('../core/Matter');

Matter.Body = _dereq_('../body/Body');
Matter.Composite = _dereq_('../body/Composite');
Matter.World = _dereq_('../body/World');

Matter.Contact = _dereq_('../collision/Contact');
Matter.Detector = _dereq_('../collision/Detector');
Matter.Grid = _dereq_('../collision/Grid');
Matter.Pairs = _dereq_('../collision/Pairs');
Matter.Pair = _dereq_('../collision/Pair');
Matter.Query = _dereq_('../collision/Query');
Matter.Resolver = _dereq_('../collision/Resolver');
Matter.SAT = _dereq_('../collision/SAT');

Matter.Constraint = _dereq_('../constraint/Constraint');
Matter.MouseConstraint = _dereq_('../constraint/MouseConstraint');

Matter.Common = _dereq_('../core/Common');
Matter.Engine = _dereq_('../core/Engine');
Matter.Events = _dereq_('../core/Events');
Matter.Mouse = _dereq_('../core/Mouse');
Matter.Runner = _dereq_('../core/Runner');
Matter.Sleeping = _dereq_('../core/Sleeping');
Matter.Plugin = _dereq_('../core/Plugin');


Matter.Bodies = _dereq_('../factory/Bodies');
Matter.Composites = _dereq_('../factory/Composites');

Matter.Axes = _dereq_('../geometry/Axes');
Matter.Bounds = _dereq_('../geometry/Bounds');
Matter.Svg = _dereq_('../geometry/Svg');
Matter.Vector = _dereq_('../geometry/Vector');
Matter.Vertices = _dereq_('../geometry/Vertices');

Matter.Render = _dereq_('../render/Render');
Matter.RenderPixi = _dereq_('../render/RenderPixi');

// aliases

Matter.World.add = Matter.Composite.add;
Matter.World.remove = Matter.Composite.remove;
Matter.World.addComposite = Matter.Composite.addComposite;
Matter.World.addBody = Matter.Composite.addBody;
Matter.World.addConstraint = Matter.Composite.addConstraint;
Matter.World.clear = Matter.Composite.clear;
Matter.Engine.run = Matter.Runner.run;

},{"../body/Body":1,"../body/Composite":2,"../body/World":3,"../collision/Contact":4,"../collision/Detector":5,"../collision/Grid":6,"../collision/Pair":7,"../collision/Pairs":8,"../collision/Query":9,"../collision/Resolver":10,"../collision/SAT":11,"../constraint/Constraint":12,"../constraint/MouseConstraint":13,"../core/Common":14,"../core/Engine":15,"../core/Events":16,"../core/Matter":17,"../core/Metrics":18,"../core/Mouse":19,"../core/Plugin":20,"../core/Runner":21,"../core/Sleeping":22,"../factory/Bodies":23,"../factory/Composites":24,"../geometry/Axes":25,"../geometry/Bounds":26,"../geometry/Svg":27,"../geometry/Vector":28,"../geometry/Vertices":29,"../render/Render":31,"../render/RenderPixi":32}],31:[function(_dereq_,module,exports){
/**
* The `Matter.Render` module is a simple HTML5 canvas based renderer for visualising instances of `Matter.Engine`.
* It is intended for development and debugging purposes, but may also be suitable for simple games.
* It includes a number of drawing options including wireframe, vector with support for sprites and viewports.
*
* @class Render
*/

var Render = {};

module.exports = Render;

var Common = _dereq_('../core/Common');
var Composite = _dereq_('../body/Composite');
var Bounds = _dereq_('../geometry/Bounds');
var Events = _dereq_('../core/Events');
var Grid = _dereq_('../collision/Grid');
var Vector = _dereq_('../geometry/Vector');
var Mouse = _dereq_('../core/Mouse');

(function() {

    var _requestAnimationFrame,
        _cancelAnimationFrame;

    if (typeof window !== 'undefined') {
        _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
                                      || window.mozRequestAnimationFrame || window.msRequestAnimationFrame
                                      || function(callback){ window.setTimeout(function() { callback(Common.now()); }, 1000 / 60); };

        _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame
                                      || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
    }

    /**
     * Creates a new renderer. The options parameter is an object that specifies any properties you wish to override the defaults.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {object} [options]
     * @return {render} A new renderer
     */
    Render.create = function(options) {
        var defaults = {
            controller: Render,
            engine: null,
            element: null,
            canvas: null,
            mouse: null,
            frameRequestId: null,
            options: {
                width: 800,
                height: 600,
                pixelRatio: 1,
                background: '#18181d',
                wireframeBackground: '#0f0f13',
                hasBounds: !!options.bounds,
                enabled: true,
                wireframes: true,
                showSleeping: true,
                showDebug: false,
                showBroadphase: false,
                showBounds: false,
                showVelocity: false,
                showCollisions: false,
                showSeparations: false,
                showAxes: false,
                showPositions: false,
                showAngleIndicator: false,
                showIds: false,
                showShadows: false,
                showVertexNumbers: false,
                showConvexHulls: false,
                showInternalEdges: false,
                showMousePosition: false
            }
        };

        var render = Common.extend(defaults, options);

        if (render.canvas) {
            render.canvas.width = render.options.width || render.canvas.width;
            render.canvas.height = render.options.height || render.canvas.height;
        }

        render.mouse = options.mouse;
        render.engine = options.engine;
        render.canvas = render.canvas || _createCanvas(render.options.width, render.options.height);
        render.context = render.canvas.getContext('2d');
        render.textures = {};

        render.bounds = render.bounds || {
            min: {
                x: 0,
                y: 0
            },
            max: {
                x: render.canvas.width,
                y: render.canvas.height
            }
        };

        if (render.options.pixelRatio !== 1) {
            Render.setPixelRatio(render, render.options.pixelRatio);
        }

        if (Common.isElement(render.element)) {
            render.element.appendChild(render.canvas);
        } else if (!render.canvas.parentNode) {
            Common.log('Render.create: options.element was undefined, render.canvas was created but not appended', 'warn');
        }

        return render;
    };

    /**
     * Continuously updates the render canvas on the `requestAnimationFrame` event.
     * @method run
     * @param {render} render
     */
    Render.run = function(render) {
        (function loop(time){
            render.frameRequestId = _requestAnimationFrame(loop);
            Render.world(render);
        })();
    };

    /**
     * Ends execution of `Render.run` on the given `render`, by canceling the animation frame request event loop.
     * @method stop
     * @param {render} render
     */
    Render.stop = function(render) {
        _cancelAnimationFrame(render.frameRequestId);
    };

    /**
     * Sets the pixel ratio of the renderer and updates the canvas.
     * To automatically detect the correct ratio, pass the string `'auto'` for `pixelRatio`.
     * @method setPixelRatio
     * @param {render} render
     * @param {number} pixelRatio
     */
    Render.setPixelRatio = function(render, pixelRatio) {
        var options = render.options,
            canvas = render.canvas;

        if (pixelRatio === 'auto') {
            pixelRatio = _getPixelRatio(canvas);
        }

        options.pixelRatio = pixelRatio;
        canvas.setAttribute('data-pixel-ratio', pixelRatio);
        canvas.width = options.width * pixelRatio;
        canvas.height = options.height * pixelRatio;
        canvas.style.width = options.width + 'px';
        canvas.style.height = options.height + 'px';
        render.context.scale(pixelRatio, pixelRatio);
    };

    /**
     * Positions and sizes the viewport around the given object bounds.
     * Objects must have at least one of the following properties:
     * - `object.bounds`
     * - `object.position`
     * - `object.min` and `object.max`
     * - `object.x` and `object.y`
     * @method lookAt
     * @param {render} render
     * @param {object[]} objects
     * @param {vector} [padding]
     * @param {bool} [center=true]
     */
    Render.lookAt = function(render, objects, padding, center) {
        center = typeof center !== 'undefined' ? center : true;
        objects = Common.isArray(objects) ? objects : [objects];
        padding = padding || {
            x: 0,
            y: 0
        };

        // find bounds of all objects
        var bounds = {
            min: { x: Infinity, y: Infinity },
            max: { x: -Infinity, y: -Infinity }
        };

        for (var i = 0; i < objects.length; i += 1) {
            var object = objects[i],
                min = object.bounds ? object.bounds.min : (object.min || object.position || object),
                max = object.bounds ? object.bounds.max : (object.max || object.position || object);

            if (min && max) {
                if (min.x < bounds.min.x)
                    bounds.min.x = min.x;

                if (max.x > bounds.max.x)
                    bounds.max.x = max.x;

                if (min.y < bounds.min.y)
                    bounds.min.y = min.y;

                if (max.y > bounds.max.y)
                    bounds.max.y = max.y;
            }
        }

        // find ratios
        var width = (bounds.max.x - bounds.min.x) + 2 * padding.x,
            height = (bounds.max.y - bounds.min.y) + 2 * padding.y,
            viewHeight = render.canvas.height,
            viewWidth = render.canvas.width,
            outerRatio = viewWidth / viewHeight,
            innerRatio = width / height,
            scaleX = 1,
            scaleY = 1;

        // find scale factor
        if (innerRatio > outerRatio) {
            scaleY = innerRatio / outerRatio;
        } else {
            scaleX = outerRatio / innerRatio;
        }

        // enable bounds
        render.options.hasBounds = true;

        // position and size
        render.bounds.min.x = bounds.min.x;
        render.bounds.max.x = bounds.min.x + width * scaleX;
        render.bounds.min.y = bounds.min.y;
        render.bounds.max.y = bounds.min.y + height * scaleY;

        // center
        if (center) {
            render.bounds.min.x += width * 0.5 - (width * scaleX) * 0.5;
            render.bounds.max.x += width * 0.5 - (width * scaleX) * 0.5;
            render.bounds.min.y += height * 0.5 - (height * scaleY) * 0.5;
            render.bounds.max.y += height * 0.5 - (height * scaleY) * 0.5;
        }

        // padding
        render.bounds.min.x -= padding.x;
        render.bounds.max.x -= padding.x;
        render.bounds.min.y -= padding.y;
        render.bounds.max.y -= padding.y;

        // update mouse
        if (render.mouse) {
            Mouse.setScale(render.mouse, {
                x: (render.bounds.max.x - render.bounds.min.x) / render.canvas.width,
                y: (render.bounds.max.y - render.bounds.min.y) / render.canvas.height
            });

            Mouse.setOffset(render.mouse, render.bounds.min);
        }
    };

    /**
     * Applies viewport transforms based on `render.bounds` to a render context.
     * @method startViewTransform
     * @param {render} render
     */
    Render.startViewTransform = function(render) {
        var boundsWidth = render.bounds.max.x - render.bounds.min.x,
            boundsHeight = render.bounds.max.y - render.bounds.min.y,
            boundsScaleX = boundsWidth / render.options.width,
            boundsScaleY = boundsHeight / render.options.height;

        render.context.scale(1 / boundsScaleX, 1 / boundsScaleY);
        render.context.translate(-render.bounds.min.x, -render.bounds.min.y);
    };

    /**
     * Resets all transforms on the render context.
     * @method endViewTransform
     * @param {render} render
     */
    Render.endViewTransform = function(render) {
        render.context.setTransform(render.options.pixelRatio, 0, 0, render.options.pixelRatio, 0, 0);
    };

    /**
     * Renders the given `engine`'s `Matter.World` object.
     * This is the entry point for all rendering and should be called every time the scene changes.
     * @method world
     * @param {render} render
     */
    Render.world = function(render) {
        var engine = render.engine,
            world = engine.world,
            canvas = render.canvas,
            context = render.context,
            options = render.options,
            allBodies = Composite.allBodies(world),
            allConstraints = Composite.allConstraints(world),
            background = options.wireframes ? options.wireframeBackground : options.background,
            bodies = [],
            constraints = [],
            i;

        var event = {
            timestamp: engine.timing.timestamp
        };

        Events.trigger(render, 'beforeRender', event);

        // apply background if it has changed
        if (render.currentBackground !== background)
            _applyBackground(render, background);

        // clear the canvas with a transparent fill, to allow the canvas background to show
        context.globalCompositeOperation = 'source-in';
        context.fillStyle = "transparent";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.globalCompositeOperation = 'source-over';

        // handle bounds
        if (options.hasBounds) {
            // filter out bodies that are not in view
            for (i = 0; i < allBodies.length; i++) {
                var body = allBodies[i];
                if (Bounds.overlaps(body.bounds, render.bounds))
                    bodies.push(body);
            }

            // filter out constraints that are not in view
            for (i = 0; i < allConstraints.length; i++) {
                var constraint = allConstraints[i],
                    bodyA = constraint.bodyA,
                    bodyB = constraint.bodyB,
                    pointAWorld = constraint.pointA,
                    pointBWorld = constraint.pointB;

                if (bodyA) pointAWorld = Vector.add(bodyA.position, constraint.pointA);
                if (bodyB) pointBWorld = Vector.add(bodyB.position, constraint.pointB);

                if (!pointAWorld || !pointBWorld)
                    continue;

                if (Bounds.contains(render.bounds, pointAWorld) || Bounds.contains(render.bounds, pointBWorld))
                    constraints.push(constraint);
            }

            // transform the view
            Render.startViewTransform(render);

            // update mouse
            if (render.mouse) {
                Mouse.setScale(render.mouse, {
                    x: (render.bounds.max.x - render.bounds.min.x) / render.canvas.width,
                    y: (render.bounds.max.y - render.bounds.min.y) / render.canvas.height
                });

                Mouse.setOffset(render.mouse, render.bounds.min);
            }
        } else {
            constraints = allConstraints;
            bodies = allBodies;
        }

        if (!options.wireframes || (engine.enableSleeping && options.showSleeping)) {
            // fully featured rendering of bodies
            Render.bodies(render, bodies, context);
        } else {
            if (options.showConvexHulls)
                Render.bodyConvexHulls(render, bodies, context);

            // optimised method for wireframes only
            Render.bodyWireframes(render, bodies, context);
        }

        if (options.showBounds)
            Render.bodyBounds(render, bodies, context);

        if (options.showAxes || options.showAngleIndicator)
            Render.bodyAxes(render, bodies, context);

        if (options.showPositions)
            Render.bodyPositions(render, bodies, context);

        if (options.showVelocity)
            Render.bodyVelocity(render, bodies, context);

        if (options.showIds)
            Render.bodyIds(render, bodies, context);

        if (options.showSeparations)
            Render.separations(render, engine.pairs.list, context);

        if (options.showCollisions)
            Render.collisions(render, engine.pairs.list, context);

        if (options.showVertexNumbers)
            Render.vertexNumbers(render, bodies, context);

        if (options.showMousePosition)
            Render.mousePosition(render, render.mouse, context);

        Render.constraints(constraints, context);

        if (options.showBroadphase && engine.broadphase.controller === Grid)
            Render.grid(render, engine.broadphase, context);

        if (options.showDebug)
            Render.debug(render, context);

        if (options.hasBounds) {
            // revert view transforms
            Render.endViewTransform(render);
        }

        Events.trigger(render, 'afterRender', event);
    };

    /**
     * Description
     * @private
     * @method debug
     * @param {render} render
     * @param {RenderingContext} context
     */
    Render.debug = function(render, context) {
        var c = context,
            engine = render.engine,
            world = engine.world,
            metrics = engine.metrics,
            options = render.options,
            bodies = Composite.allBodies(world),
            space = "    ";

        if (engine.timing.timestamp - (render.debugTimestamp || 0) >= 500) {
            var text = "";

            if (metrics.timing) {
                text += "fps: " + Math.round(metrics.timing.fps) + space;
            }


            render.debugString = text;
            render.debugTimestamp = engine.timing.timestamp;
        }

        if (render.debugString) {
            c.font = "12px Arial";

            if (options.wireframes) {
                c.fillStyle = 'rgba(255,255,255,0.5)';
            } else {
                c.fillStyle = 'rgba(0,0,0,0.5)';
            }

            var split = render.debugString.split('\n');

            for (var i = 0; i < split.length; i++) {
                c.fillText(split[i], 50, 50 + i * 18);
            }
        }
    };

    /**
     * Description
     * @private
     * @method constraints
     * @param {constraint[]} constraints
     * @param {RenderingContext} context
     */
    Render.constraints = function(constraints, context) {
        var c = context;

        for (var i = 0; i < constraints.length; i++) {
            var constraint = constraints[i];

            if (!constraint.render.visible || !constraint.pointA || !constraint.pointB)
                continue;

            var bodyA = constraint.bodyA,
                bodyB = constraint.bodyB,
                start,
                end;

            if (bodyA) {
                start = Vector.add(bodyA.position, constraint.pointA);
            } else {
                start = constraint.pointA;
            }

            if (constraint.render.type === 'pin') {
                c.beginPath();
                c.arc(start.x, start.y, 3, 0, 2 * Math.PI);
                c.closePath();
            } else {
                if (bodyB) {
                    end = Vector.add(bodyB.position, constraint.pointB);
                } else {
                    end = constraint.pointB;
                }

                c.beginPath();
                c.moveTo(start.x, start.y);

                if (constraint.render.type === 'spring') {
                    var delta = Vector.sub(end, start),
                        normal = Vector.perp(Vector.normalise(delta)),
                        coils = Math.ceil(Common.clamp(constraint.length / 5, 12, 20)),
                        offset;

                    for (var j = 1; j < coils; j += 1) {
                        offset = j % 2 === 0 ? 1 : -1;

                        c.lineTo(
                            start.x + delta.x * (j / coils) + normal.x * offset * 4,
                            start.y + delta.y * (j / coils) + normal.y * offset * 4
                        );
                    }
                }

                c.lineTo(end.x, end.y);
            }

            if (constraint.render.lineWidth) {
                c.lineWidth = constraint.render.lineWidth;
                c.strokeStyle = constraint.render.strokeStyle;
                c.stroke();
            }

            if (constraint.render.anchors) {
                c.fillStyle = constraint.render.strokeStyle;
                c.beginPath();
                c.arc(start.x, start.y, 3, 0, 2 * Math.PI);
                c.arc(end.x, end.y, 3, 0, 2 * Math.PI);
                c.closePath();
                c.fill();
            }
        }
    };

    /**
     * Description
     * @private
     * @method bodyShadows
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodyShadows = function(render, bodies, context) {
        var c = context,
            engine = render.engine;

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            if (!body.render.visible)
                continue;

            if (body.circleRadius) {
                c.beginPath();
                c.arc(body.position.x, body.position.y, body.circleRadius, 0, 2 * Math.PI);
                c.closePath();
            } else {
                c.beginPath();
                c.moveTo(body.vertices[0].x, body.vertices[0].y);
                for (var j = 1; j < body.vertices.length; j++) {
                    c.lineTo(body.vertices[j].x, body.vertices[j].y);
                }
                c.closePath();
            }

            var distanceX = body.position.x - render.options.width * 0.5,
                distanceY = body.position.y - render.options.height * 0.2,
                distance = Math.abs(distanceX) + Math.abs(distanceY);

            c.shadowColor = 'rgba(0,0,0,0.15)';
            c.shadowOffsetX = 0.05 * distanceX;
            c.shadowOffsetY = 0.05 * distanceY;
            c.shadowBlur = 1 + 12 * Math.min(1, distance / 1000);

            c.fill();

            c.shadowColor = null;
            c.shadowOffsetX = null;
            c.shadowOffsetY = null;
            c.shadowBlur = null;
        }
    };

    /**
     * Description
     * @private
     * @method bodies
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodies = function(render, bodies, context) {
        var c = context,
            engine = render.engine,
            options = render.options,
            showInternalEdges = options.showInternalEdges || !options.wireframes,
            body,
            part,
            i,
            k;

        for (i = 0; i < bodies.length; i++) {
            body = bodies[i];

            if (!body.render.visible)
                continue;

            // handle compound parts
            for (k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
                part = body.parts[k];

                if (!part.render.visible)
                    continue;

                if (options.showSleeping && body.isSleeping) {
                    c.globalAlpha = 0.5 * part.render.opacity;
                } else if (part.render.opacity !== 1) {
                    c.globalAlpha = part.render.opacity;
                }

                if (part.render.sprite && part.render.sprite.texture && !options.wireframes) {
                    // part sprite
                    var sprite = part.render.sprite,
                        texture = _getTexture(render, sprite.texture);

                    c.translate(part.position.x, part.position.y);
                    c.rotate(part.angle);

                    c.drawImage(
                        texture,
                        texture.width * -sprite.xOffset * sprite.xScale,
                        texture.height * -sprite.yOffset * sprite.yScale,
                        texture.width * sprite.xScale,
                        texture.height * sprite.yScale
                    );

                    // revert translation, hopefully faster than save / restore
                    c.rotate(-part.angle);
                    c.translate(-part.position.x, -part.position.y);
                } else {
                    // part polygon
                    if (part.circleRadius) {
                        c.beginPath();
                        c.arc(part.position.x, part.position.y, part.circleRadius, 0, 2 * Math.PI);
                    } else {
                        c.beginPath();
                        c.moveTo(part.vertices[0].x, part.vertices[0].y);

                        for (var j = 1; j < part.vertices.length; j++) {
                            if (!part.vertices[j - 1].isInternal || showInternalEdges) {
                                c.lineTo(part.vertices[j].x, part.vertices[j].y);
                            } else {
                                c.moveTo(part.vertices[j].x, part.vertices[j].y);
                            }

                            if (part.vertices[j].isInternal && !showInternalEdges) {
                                c.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
                            }
                        }

                        c.lineTo(part.vertices[0].x, part.vertices[0].y);
                        c.closePath();
                    }

                    if (!options.wireframes) {
                        c.fillStyle = part.render.fillStyle;

                        if (part.render.lineWidth) {
                            c.lineWidth = part.render.lineWidth;
                            c.strokeStyle = part.render.strokeStyle;
                            c.stroke();
                        }

                        c.fill();
                    } else {
                        c.lineWidth = 1;
                        c.strokeStyle = '#bbb';
                        c.stroke();
                    }
                }

                c.globalAlpha = 1;
            }
        }
    };

    /**
     * Optimised method for drawing body wireframes in one pass
     * @private
     * @method bodyWireframes
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodyWireframes = function(render, bodies, context) {
        var c = context,
            showInternalEdges = render.options.showInternalEdges,
            body,
            part,
            i,
            j,
            k;

        c.beginPath();

        // render all bodies
        for (i = 0; i < bodies.length; i++) {
            body = bodies[i];

            if (!body.render.visible)
                continue;

            // handle compound parts
            for (k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
                part = body.parts[k];

                c.moveTo(part.vertices[0].x, part.vertices[0].y);

                for (j = 1; j < part.vertices.length; j++) {
                    if (!part.vertices[j - 1].isInternal || showInternalEdges) {
                        c.lineTo(part.vertices[j].x, part.vertices[j].y);
                    } else {
                        c.moveTo(part.vertices[j].x, part.vertices[j].y);
                    }

                    if (part.vertices[j].isInternal && !showInternalEdges) {
                        c.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
                    }
                }

                c.lineTo(part.vertices[0].x, part.vertices[0].y);
            }
        }

        c.lineWidth = 1;
        c.strokeStyle = '#bbb';
        c.stroke();
    };

    /**
     * Optimised method for drawing body convex hull wireframes in one pass
     * @private
     * @method bodyConvexHulls
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodyConvexHulls = function(render, bodies, context) {
        var c = context,
            body,
            part,
            i,
            j,
            k;

        c.beginPath();

        // render convex hulls
        for (i = 0; i < bodies.length; i++) {
            body = bodies[i];

            if (!body.render.visible || body.parts.length === 1)
                continue;

            c.moveTo(body.vertices[0].x, body.vertices[0].y);

            for (j = 1; j < body.vertices.length; j++) {
                c.lineTo(body.vertices[j].x, body.vertices[j].y);
            }

            c.lineTo(body.vertices[0].x, body.vertices[0].y);
        }

        c.lineWidth = 1;
        c.strokeStyle = 'rgba(255,255,255,0.2)';
        c.stroke();
    };

    /**
     * Renders body vertex numbers.
     * @private
     * @method vertexNumbers
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.vertexNumbers = function(render, bodies, context) {
        var c = context,
            i,
            j,
            k;

        for (i = 0; i < bodies.length; i++) {
            var parts = bodies[i].parts;
            for (k = parts.length > 1 ? 1 : 0; k < parts.length; k++) {
                var part = parts[k];
                for (j = 0; j < part.vertices.length; j++) {
                    c.fillStyle = 'rgba(255,255,255,0.2)';
                    c.fillText(i + '_' + j, part.position.x + (part.vertices[j].x - part.position.x) * 0.8, part.position.y + (part.vertices[j].y - part.position.y) * 0.8);
                }
            }
        }
    };

    /**
     * Renders mouse position.
     * @private
     * @method mousePosition
     * @param {render} render
     * @param {mouse} mouse
     * @param {RenderingContext} context
     */
    Render.mousePosition = function(render, mouse, context) {
        var c = context;
        c.fillStyle = 'rgba(255,255,255,0.8)';
        c.fillText(mouse.position.x + '  ' + mouse.position.y, mouse.position.x + 5, mouse.position.y - 5);
    };

    /**
     * Draws body bounds
     * @private
     * @method bodyBounds
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodyBounds = function(render, bodies, context) {
        var c = context,
            engine = render.engine,
            options = render.options;

        c.beginPath();

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            if (body.render.visible) {
                var parts = bodies[i].parts;
                for (var j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                    var part = parts[j];
                    c.rect(part.bounds.min.x, part.bounds.min.y, part.bounds.max.x - part.bounds.min.x, part.bounds.max.y - part.bounds.min.y);
                }
            }
        }

        if (options.wireframes) {
            c.strokeStyle = 'rgba(255,255,255,0.08)';
        } else {
            c.strokeStyle = 'rgba(0,0,0,0.1)';
        }

        c.lineWidth = 1;
        c.stroke();
    };

    /**
     * Draws body angle indicators and axes
     * @private
     * @method bodyAxes
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodyAxes = function(render, bodies, context) {
        var c = context,
            engine = render.engine,
            options = render.options,
            part,
            i,
            j,
            k;

        c.beginPath();

        for (i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                parts = body.parts;

            if (!body.render.visible)
                continue;

            if (options.showAxes) {
                // render all axes
                for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                    part = parts[j];
                    for (k = 0; k < part.axes.length; k++) {
                        var axis = part.axes[k];
                        c.moveTo(part.position.x, part.position.y);
                        c.lineTo(part.position.x + axis.x * 20, part.position.y + axis.y * 20);
                    }
                }
            } else {
                for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                    part = parts[j];
                    for (k = 0; k < part.axes.length; k++) {
                        // render a single axis indicator
                        c.moveTo(part.position.x, part.position.y);
                        c.lineTo((part.vertices[0].x + part.vertices[part.vertices.length-1].x) / 2,
                                 (part.vertices[0].y + part.vertices[part.vertices.length-1].y) / 2);
                    }
                }
            }
        }

        if (options.wireframes) {
            c.strokeStyle = 'indianred';
            c.lineWidth = 1;
        } else {
            c.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            c.globalCompositeOperation = 'overlay';
            c.lineWidth = 2;
        }

        c.stroke();
        c.globalCompositeOperation = 'source-over';
    };

    /**
     * Draws body positions
     * @private
     * @method bodyPositions
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodyPositions = function(render, bodies, context) {
        var c = context,
            engine = render.engine,
            options = render.options,
            body,
            part,
            i,
            k;

        c.beginPath();

        // render current positions
        for (i = 0; i < bodies.length; i++) {
            body = bodies[i];

            if (!body.render.visible)
                continue;

            // handle compound parts
            for (k = 0; k < body.parts.length; k++) {
                part = body.parts[k];
                c.arc(part.position.x, part.position.y, 3, 0, 2 * Math.PI, false);
                c.closePath();
            }
        }

        if (options.wireframes) {
            c.fillStyle = 'indianred';
        } else {
            c.fillStyle = 'rgba(0,0,0,0.5)';
        }
        c.fill();

        c.beginPath();

        // render previous positions
        for (i = 0; i < bodies.length; i++) {
            body = bodies[i];
            if (body.render.visible) {
                c.arc(body.positionPrev.x, body.positionPrev.y, 2, 0, 2 * Math.PI, false);
                c.closePath();
            }
        }

        c.fillStyle = 'rgba(255,165,0,0.8)';
        c.fill();
    };

    /**
     * Draws body velocity
     * @private
     * @method bodyVelocity
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodyVelocity = function(render, bodies, context) {
        var c = context;

        c.beginPath();

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            if (!body.render.visible)
                continue;

            c.moveTo(body.position.x, body.position.y);
            c.lineTo(body.position.x + (body.position.x - body.positionPrev.x) * 2, body.position.y + (body.position.y - body.positionPrev.y) * 2);
        }

        c.lineWidth = 3;
        c.strokeStyle = 'cornflowerblue';
        c.stroke();
    };

    /**
     * Draws body ids
     * @private
     * @method bodyIds
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodyIds = function(render, bodies, context) {
        var c = context,
            i,
            j;

        for (i = 0; i < bodies.length; i++) {
            if (!bodies[i].render.visible)
                continue;

            var parts = bodies[i].parts;
            for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                var part = parts[j];
                c.font = "12px Arial";
                c.fillStyle = 'rgba(255,255,255,0.5)';
                c.fillText(part.id, part.position.x + 10, part.position.y - 10);
            }
        }
    };

    /**
     * Description
     * @private
     * @method collisions
     * @param {render} render
     * @param {pair[]} pairs
     * @param {RenderingContext} context
     */
    Render.collisions = function(render, pairs, context) {
        var c = context,
            options = render.options,
            pair,
            collision,
            corrected,
            bodyA,
            bodyB,
            i,
            j;

        c.beginPath();

        // render collision positions
        for (i = 0; i < pairs.length; i++) {
            pair = pairs[i];

            if (!pair.isActive)
                continue;

            collision = pair.collision;
            for (j = 0; j < pair.activeContacts.length; j++) {
                var contact = pair.activeContacts[j],
                    vertex = contact.vertex;
                c.rect(vertex.x - 1.5, vertex.y - 1.5, 3.5, 3.5);
            }
        }

        if (options.wireframes) {
            c.fillStyle = 'rgba(255,255,255,0.7)';
        } else {
            c.fillStyle = 'orange';
        }
        c.fill();

        c.beginPath();

        // render collision normals
        for (i = 0; i < pairs.length; i++) {
            pair = pairs[i];

            if (!pair.isActive)
                continue;

            collision = pair.collision;

            if (pair.activeContacts.length > 0) {
                var normalPosX = pair.activeContacts[0].vertex.x,
                    normalPosY = pair.activeContacts[0].vertex.y;

                if (pair.activeContacts.length === 2) {
                    normalPosX = (pair.activeContacts[0].vertex.x + pair.activeContacts[1].vertex.x) / 2;
                    normalPosY = (pair.activeContacts[0].vertex.y + pair.activeContacts[1].vertex.y) / 2;
                }

                if (collision.bodyB === collision.supports[0].body || collision.bodyA.isStatic === true) {
                    c.moveTo(normalPosX - collision.normal.x * 8, normalPosY - collision.normal.y * 8);
                } else {
                    c.moveTo(normalPosX + collision.normal.x * 8, normalPosY + collision.normal.y * 8);
                }

                c.lineTo(normalPosX, normalPosY);
            }
        }

        if (options.wireframes) {
            c.strokeStyle = 'rgba(255,165,0,0.7)';
        } else {
            c.strokeStyle = 'orange';
        }

        c.lineWidth = 1;
        c.stroke();
    };

    /**
     * Description
     * @private
     * @method separations
     * @param {render} render
     * @param {pair[]} pairs
     * @param {RenderingContext} context
     */
    Render.separations = function(render, pairs, context) {
        var c = context,
            options = render.options,
            pair,
            collision,
            corrected,
            bodyA,
            bodyB,
            i,
            j;

        c.beginPath();

        // render separations
        for (i = 0; i < pairs.length; i++) {
            pair = pairs[i];

            if (!pair.isActive)
                continue;

            collision = pair.collision;
            bodyA = collision.bodyA;
            bodyB = collision.bodyB;

            var k = 1;

            if (!bodyB.isStatic && !bodyA.isStatic) k = 0.5;
            if (bodyB.isStatic) k = 0;

            c.moveTo(bodyB.position.x, bodyB.position.y);
            c.lineTo(bodyB.position.x - collision.penetration.x * k, bodyB.position.y - collision.penetration.y * k);

            k = 1;

            if (!bodyB.isStatic && !bodyA.isStatic) k = 0.5;
            if (bodyA.isStatic) k = 0;

            c.moveTo(bodyA.position.x, bodyA.position.y);
            c.lineTo(bodyA.position.x + collision.penetration.x * k, bodyA.position.y + collision.penetration.y * k);
        }

        if (options.wireframes) {
            c.strokeStyle = 'rgba(255,165,0,0.5)';
        } else {
            c.strokeStyle = 'orange';
        }
        c.stroke();
    };

    /**
     * Description
     * @private
     * @method grid
     * @param {render} render
     * @param {grid} grid
     * @param {RenderingContext} context
     */
    Render.grid = function(render, grid, context) {
        var c = context,
            options = render.options;

        if (options.wireframes) {
            c.strokeStyle = 'rgba(255,180,0,0.1)';
        } else {
            c.strokeStyle = 'rgba(255,180,0,0.5)';
        }

        c.beginPath();

        var bucketKeys = Common.keys(grid.buckets);

        for (var i = 0; i < bucketKeys.length; i++) {
            var bucketId = bucketKeys[i];

            if (grid.buckets[bucketId].length < 2)
                continue;

            var region = bucketId.split(/C|R/);
            c.rect(0.5 + parseInt(region[1], 10) * grid.bucketWidth,
                    0.5 + parseInt(region[2], 10) * grid.bucketHeight,
                    grid.bucketWidth,
                    grid.bucketHeight);
        }

        c.lineWidth = 1;
        c.stroke();
    };

    /**
     * Description
     * @private
     * @method inspector
     * @param {inspector} inspector
     * @param {RenderingContext} context
     */
    Render.inspector = function(inspector, context) {
        var engine = inspector.engine,
            selected = inspector.selected,
            render = inspector.render,
            options = render.options,
            bounds;

        if (options.hasBounds) {
            var boundsWidth = render.bounds.max.x - render.bounds.min.x,
                boundsHeight = render.bounds.max.y - render.bounds.min.y,
                boundsScaleX = boundsWidth / render.options.width,
                boundsScaleY = boundsHeight / render.options.height;

            context.scale(1 / boundsScaleX, 1 / boundsScaleY);
            context.translate(-render.bounds.min.x, -render.bounds.min.y);
        }

        for (var i = 0; i < selected.length; i++) {
            var item = selected[i].data;

            context.translate(0.5, 0.5);
            context.lineWidth = 1;
            context.strokeStyle = 'rgba(255,165,0,0.9)';
            context.setLineDash([1,2]);

            switch (item.type) {

            case 'body':

                // render body selections
                bounds = item.bounds;
                context.beginPath();
                context.rect(Math.floor(bounds.min.x - 3), Math.floor(bounds.min.y - 3),
                             Math.floor(bounds.max.x - bounds.min.x + 6), Math.floor(bounds.max.y - bounds.min.y + 6));
                context.closePath();
                context.stroke();

                break;

            case 'constraint':

                // render constraint selections
                var point = item.pointA;
                if (item.bodyA)
                    point = item.pointB;
                context.beginPath();
                context.arc(point.x, point.y, 10, 0, 2 * Math.PI);
                context.closePath();
                context.stroke();

                break;

            }

            context.setLineDash([]);
            context.translate(-0.5, -0.5);
        }

        // render selection region
        if (inspector.selectStart !== null) {
            context.translate(0.5, 0.5);
            context.lineWidth = 1;
            context.strokeStyle = 'rgba(255,165,0,0.6)';
            context.fillStyle = 'rgba(255,165,0,0.1)';
            bounds = inspector.selectBounds;
            context.beginPath();
            context.rect(Math.floor(bounds.min.x), Math.floor(bounds.min.y),
                         Math.floor(bounds.max.x - bounds.min.x), Math.floor(bounds.max.y - bounds.min.y));
            context.closePath();
            context.stroke();
            context.fill();
            context.translate(-0.5, -0.5);
        }

        if (options.hasBounds)
            context.setTransform(1, 0, 0, 1, 0, 0);
    };

    /**
     * Description
     * @method _createCanvas
     * @private
     * @param {} width
     * @param {} height
     * @return canvas
     */
    var _createCanvas = function(width, height) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.oncontextmenu = function() { return false; };
        canvas.onselectstart = function() { return false; };
        return canvas;
    };

    /**
     * Gets the pixel ratio of the canvas.
     * @method _getPixelRatio
     * @private
     * @param {HTMLElement} canvas
     * @return {Number} pixel ratio
     */
    var _getPixelRatio = function(canvas) {
        var context = canvas.getContext('2d'),
            devicePixelRatio = window.devicePixelRatio || 1,
            backingStorePixelRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio
                                      || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio
                                      || context.backingStorePixelRatio || 1;

        return devicePixelRatio / backingStorePixelRatio;
    };

    /**
     * Gets the requested texture (an Image) via its path
     * @method _getTexture
     * @private
     * @param {render} render
     * @param {string} imagePath
     * @return {Image} texture
     */
    var _getTexture = function(render, imagePath) {
        var image = render.textures[imagePath];

        if (image)
            return image;

        image = render.textures[imagePath] = new Image();
        image.src = imagePath;

        return image;
    };

    /**
     * Applies the background to the canvas using CSS.
     * @method applyBackground
     * @private
     * @param {render} render
     * @param {string} background
     */
    var _applyBackground = function(render, background) {
        var cssBackground = background;

        if (/(jpg|gif|png)$/.test(background))
            cssBackground = 'url(' + background + ')';

        render.canvas.style.background = cssBackground;
        render.canvas.style.backgroundSize = "contain";
        render.currentBackground = background;
    };

    /*
    *
    *  Events Documentation
    *
    */

    /**
    * Fired before rendering
    *
    * @event beforeRender
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after rendering
    *
    * @event afterRender
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * A back-reference to the `Matter.Render` module.
     *
     * @property controller
     * @type render
     */

    /**
     * A reference to the `Matter.Engine` instance to be used.
     *
     * @property engine
     * @type engine
     */

    /**
     * A reference to the element where the canvas is to be inserted (if `render.canvas` has not been specified)
     *
     * @property element
     * @type HTMLElement
     * @default null
     */

    /**
     * The canvas element to render to. If not specified, one will be created if `render.element` has been specified.
     *
     * @property canvas
     * @type HTMLCanvasElement
     * @default null
     */

    /**
     * The configuration options of the renderer.
     *
     * @property options
     * @type {}
     */

    /**
     * The target width in pixels of the `render.canvas` to be created.
     *
     * @property options.width
     * @type number
     * @default 800
     */

    /**
     * The target height in pixels of the `render.canvas` to be created.
     *
     * @property options.height
     * @type number
     * @default 600
     */

    /**
     * A flag that specifies if `render.bounds` should be used when rendering.
     *
     * @property options.hasBounds
     * @type boolean
     * @default false
     */

    /**
     * A `Bounds` object that specifies the drawing view region.
     * Rendering will be automatically transformed and scaled to fit within the canvas size (`render.options.width` and `render.options.height`).
     * This allows for creating views that can pan or zoom around the scene.
     * You must also set `render.options.hasBounds` to `true` to enable bounded rendering.
     *
     * @property bounds
     * @type bounds
     */

    /**
     * The 2d rendering context from the `render.canvas` element.
     *
     * @property context
     * @type CanvasRenderingContext2D
     */

    /**
     * The sprite texture cache.
     *
     * @property textures
     * @type {}
     */

})();

},{"../body/Composite":2,"../collision/Grid":6,"../core/Common":14,"../core/Events":16,"../core/Mouse":19,"../geometry/Bounds":26,"../geometry/Vector":28}],32:[function(_dereq_,module,exports){
/**
* The `Matter.RenderPixi` module is an example renderer using pixi.js.
* See also `Matter.Render` for a canvas based renderer.
*
* @class RenderPixi
* @deprecated the Matter.RenderPixi module will soon be removed from the Matter.js core.
* It will likely be moved to its own repository (but maintenance will be limited).
*/

var RenderPixi = {};

module.exports = RenderPixi;

var Bounds = _dereq_('../geometry/Bounds');
var Composite = _dereq_('../body/Composite');
var Common = _dereq_('../core/Common');
var Events = _dereq_('../core/Events');
var Vector = _dereq_('../geometry/Vector');

(function() {

    var _requestAnimationFrame,
        _cancelAnimationFrame;

    if (typeof window !== 'undefined') {
        _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
                                      || window.mozRequestAnimationFrame || window.msRequestAnimationFrame 
                                      || function(callback){ window.setTimeout(function() { callback(Common.now()); }, 1000 / 60); };
   
        _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame 
                                      || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
    }
    
    /**
     * Creates a new Pixi.js WebGL renderer
     * @method create
     * @param {object} options
     * @return {RenderPixi} A new renderer
     * @deprecated
     */
    RenderPixi.create = function(options) {
        Common.warn('RenderPixi.create: Matter.RenderPixi is deprecated (see docs)');

        var defaults = {
            controller: RenderPixi,
            engine: null,
            element: null,
            frameRequestId: null,
            canvas: null,
            renderer: null,
            container: null,
            spriteContainer: null,
            pixiOptions: null,
            options: {
                width: 800,
                height: 600,
                background: '#fafafa',
                wireframeBackground: '#222',
                hasBounds: false,
                enabled: true,
                wireframes: true,
                showSleeping: true,
                showDebug: false,
                showBroadphase: false,
                showBounds: false,
                showVelocity: false,
                showCollisions: false,
                showAxes: false,
                showPositions: false,
                showAngleIndicator: false,
                showIds: false,
                showShadows: false
            }
        };

        var render = Common.extend(defaults, options),
            transparent = !render.options.wireframes && render.options.background === 'transparent';

        // init pixi
        render.pixiOptions = render.pixiOptions || {
            view: render.canvas,
            transparent: transparent,
            antialias: true,
            backgroundColor: options.background
        };

        render.mouse = options.mouse;
        render.engine = options.engine;
        render.renderer = render.renderer || new PIXI.WebGLRenderer(render.options.width, render.options.height, render.pixiOptions);
        render.container = render.container || new PIXI.Container();
        render.spriteContainer = render.spriteContainer || new PIXI.Container();
        render.canvas = render.canvas || render.renderer.view;
        render.bounds = render.bounds || { 
            min: {
                x: 0,
                y: 0
            }, 
            max: { 
                x: render.options.width,
                y: render.options.height
            }
        };

        // event listeners
        Events.on(render.engine, 'beforeUpdate', function() {
            RenderPixi.clear(render);
        });

        // caches
        render.textures = {};
        render.sprites = {};
        render.primitives = {};

        // use a sprite batch for performance
        render.container.addChild(render.spriteContainer);

        // insert canvas
        if (Common.isElement(render.element)) {
            render.element.appendChild(render.canvas);
        } else {
            Common.warn('No "render.element" passed, "render.canvas" was not inserted into document.');
        }

        // prevent menus on canvas
        render.canvas.oncontextmenu = function() { return false; };
        render.canvas.onselectstart = function() { return false; };

        return render;
    };

    /**
     * Continuously updates the render canvas on the `requestAnimationFrame` event.
     * @method run
     * @param {render} render
     * @deprecated
     */
    RenderPixi.run = function(render) {
        (function loop(time){
            render.frameRequestId = _requestAnimationFrame(loop);
            RenderPixi.world(render);
        })();
    };

    /**
     * Ends execution of `Render.run` on the given `render`, by canceling the animation frame request event loop.
     * @method stop
     * @param {render} render
     * @deprecated
     */
    RenderPixi.stop = function(render) {
        _cancelAnimationFrame(render.frameRequestId);
    };

    /**
     * Clears the scene graph
     * @method clear
     * @param {RenderPixi} render
     * @deprecated
     */
    RenderPixi.clear = function(render) {
        var container = render.container,
            spriteContainer = render.spriteContainer;

        // clear stage container
        while (container.children[0]) { 
            container.removeChild(container.children[0]); 
        }

        // clear sprite batch
        while (spriteContainer.children[0]) { 
            spriteContainer.removeChild(spriteContainer.children[0]); 
        }

        var bgSprite = render.sprites['bg-0'];

        // clear caches
        render.textures = {};
        render.sprites = {};
        render.primitives = {};

        // set background sprite
        render.sprites['bg-0'] = bgSprite;
        if (bgSprite)
            container.addChildAt(bgSprite, 0);

        // add sprite batch back into container
        render.container.addChild(render.spriteContainer);

        // reset background state
        render.currentBackground = null;

        // reset bounds transforms
        container.scale.set(1, 1);
        container.position.set(0, 0);
    };

    /**
     * Sets the background of the canvas 
     * @method setBackground
     * @param {RenderPixi} render
     * @param {string} background
     * @deprecated
     */
    RenderPixi.setBackground = function(render, background) {
        if (render.currentBackground !== background) {
            var isColor = background.indexOf && background.indexOf('#') !== -1,
                bgSprite = render.sprites['bg-0'];

            if (isColor) {
                // if solid background color
                var color = Common.colorToNumber(background);
                render.renderer.backgroundColor = color;

                // remove background sprite if existing
                if (bgSprite)
                    render.container.removeChild(bgSprite); 
            } else {
                // initialise background sprite if needed
                if (!bgSprite) {
                    var texture = _getTexture(render, background);

                    bgSprite = render.sprites['bg-0'] = new PIXI.Sprite(texture);
                    bgSprite.position.x = 0;
                    bgSprite.position.y = 0;
                    render.container.addChildAt(bgSprite, 0);
                }
            }

            render.currentBackground = background;
        }
    };

    /**
     * Description
     * @method world
     * @param {engine} engine
     * @deprecated
     */
    RenderPixi.world = function(render) {
        var engine = render.engine,
            world = engine.world,
            renderer = render.renderer,
            container = render.container,
            options = render.options,
            bodies = Composite.allBodies(world),
            allConstraints = Composite.allConstraints(world),
            constraints = [],
            i;

        if (options.wireframes) {
            RenderPixi.setBackground(render, options.wireframeBackground);
        } else {
            RenderPixi.setBackground(render, options.background);
        }

        // handle bounds
        var boundsWidth = render.bounds.max.x - render.bounds.min.x,
            boundsHeight = render.bounds.max.y - render.bounds.min.y,
            boundsScaleX = boundsWidth / render.options.width,
            boundsScaleY = boundsHeight / render.options.height;

        if (options.hasBounds) {
            // Hide bodies that are not in view
            for (i = 0; i < bodies.length; i++) {
                var body = bodies[i];
                body.render.sprite.visible = Bounds.overlaps(body.bounds, render.bounds);
            }

            // filter out constraints that are not in view
            for (i = 0; i < allConstraints.length; i++) {
                var constraint = allConstraints[i],
                    bodyA = constraint.bodyA,
                    bodyB = constraint.bodyB,
                    pointAWorld = constraint.pointA,
                    pointBWorld = constraint.pointB;

                if (bodyA) pointAWorld = Vector.add(bodyA.position, constraint.pointA);
                if (bodyB) pointBWorld = Vector.add(bodyB.position, constraint.pointB);

                if (!pointAWorld || !pointBWorld)
                    continue;

                if (Bounds.contains(render.bounds, pointAWorld) || Bounds.contains(render.bounds, pointBWorld))
                    constraints.push(constraint);
            }

            // transform the view
            container.scale.set(1 / boundsScaleX, 1 / boundsScaleY);
            container.position.set(-render.bounds.min.x * (1 / boundsScaleX), -render.bounds.min.y * (1 / boundsScaleY));
        } else {
            constraints = allConstraints;
        }

        for (i = 0; i < bodies.length; i++)
            RenderPixi.body(render, bodies[i]);

        for (i = 0; i < constraints.length; i++)
            RenderPixi.constraint(render, constraints[i]);

        renderer.render(container);
    };


    /**
     * Description
     * @method constraint
     * @param {engine} engine
     * @param {constraint} constraint
     * @deprecated
     */
    RenderPixi.constraint = function(render, constraint) {
        var engine = render.engine,
            bodyA = constraint.bodyA,
            bodyB = constraint.bodyB,
            pointA = constraint.pointA,
            pointB = constraint.pointB,
            container = render.container,
            constraintRender = constraint.render,
            primitiveId = 'c-' + constraint.id,
            primitive = render.primitives[primitiveId];

        // initialise constraint primitive if not existing
        if (!primitive)
            primitive = render.primitives[primitiveId] = new PIXI.Graphics();

        // don't render if constraint does not have two end points
        if (!constraintRender.visible || !constraint.pointA || !constraint.pointB) {
            primitive.clear();
            return;
        }

        // add to scene graph if not already there
        if (Common.indexOf(container.children, primitive) === -1)
            container.addChild(primitive);

        // render the constraint on every update, since they can change dynamically
        primitive.clear();
        primitive.beginFill(0, 0);
        primitive.lineStyle(constraintRender.lineWidth, Common.colorToNumber(constraintRender.strokeStyle), 1);
        
        if (bodyA) {
            primitive.moveTo(bodyA.position.x + pointA.x, bodyA.position.y + pointA.y);
        } else {
            primitive.moveTo(pointA.x, pointA.y);
        }

        if (bodyB) {
            primitive.lineTo(bodyB.position.x + pointB.x, bodyB.position.y + pointB.y);
        } else {
            primitive.lineTo(pointB.x, pointB.y);
        }

        primitive.endFill();
    };
    
    /**
     * Description
     * @method body
     * @param {engine} engine
     * @param {body} body
     * @deprecated
     */
    RenderPixi.body = function(render, body) {
        var engine = render.engine,
            bodyRender = body.render;

        if (!bodyRender.visible)
            return;

        if (bodyRender.sprite && bodyRender.sprite.texture) {
            var spriteId = 'b-' + body.id,
                sprite = render.sprites[spriteId],
                spriteContainer = render.spriteContainer;

            // initialise body sprite if not existing
            if (!sprite)
                sprite = render.sprites[spriteId] = _createBodySprite(render, body);

            // add to scene graph if not already there
            if (Common.indexOf(spriteContainer.children, sprite) === -1)
                spriteContainer.addChild(sprite);

            // update body sprite
            sprite.position.x = body.position.x;
            sprite.position.y = body.position.y;
            sprite.rotation = body.angle;
            sprite.scale.x = bodyRender.sprite.xScale || 1;
            sprite.scale.y = bodyRender.sprite.yScale || 1;
        } else {
            var primitiveId = 'b-' + body.id,
                primitive = render.primitives[primitiveId],
                container = render.container;

            // initialise body primitive if not existing
            if (!primitive) {
                primitive = render.primitives[primitiveId] = _createBodyPrimitive(render, body);
                primitive.initialAngle = body.angle;
            }

            // add to scene graph if not already there
            if (Common.indexOf(container.children, primitive) === -1)
                container.addChild(primitive);

            // update body primitive
            primitive.position.x = body.position.x;
            primitive.position.y = body.position.y;
            primitive.rotation = body.angle - primitive.initialAngle;
        }
    };

    /**
     * Creates a body sprite
     * @method _createBodySprite
     * @private
     * @param {RenderPixi} render
     * @param {body} body
     * @return {PIXI.Sprite} sprite
     * @deprecated
     */
    var _createBodySprite = function(render, body) {
        var bodyRender = body.render,
            texturePath = bodyRender.sprite.texture,
            texture = _getTexture(render, texturePath),
            sprite = new PIXI.Sprite(texture);

        sprite.anchor.x = body.render.sprite.xOffset;
        sprite.anchor.y = body.render.sprite.yOffset;

        return sprite;
    };

    /**
     * Creates a body primitive
     * @method _createBodyPrimitive
     * @private
     * @param {RenderPixi} render
     * @param {body} body
     * @return {PIXI.Graphics} graphics
     * @deprecated
     */
    var _createBodyPrimitive = function(render, body) {
        var bodyRender = body.render,
            options = render.options,
            primitive = new PIXI.Graphics(),
            fillStyle = Common.colorToNumber(bodyRender.fillStyle),
            strokeStyle = Common.colorToNumber(bodyRender.strokeStyle),
            strokeStyleIndicator = Common.colorToNumber(bodyRender.strokeStyle),
            strokeStyleWireframe = Common.colorToNumber('#bbb'),
            strokeStyleWireframeIndicator = Common.colorToNumber('#CD5C5C'),
            part;

        primitive.clear();

        // handle compound parts
        for (var k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
            part = body.parts[k];

            if (!options.wireframes) {
                primitive.beginFill(fillStyle, 1);
                primitive.lineStyle(bodyRender.lineWidth, strokeStyle, 1);
            } else {
                primitive.beginFill(0, 0);
                primitive.lineStyle(1, strokeStyleWireframe, 1);
            }

            primitive.moveTo(part.vertices[0].x - body.position.x, part.vertices[0].y - body.position.y);

            for (var j = 1; j < part.vertices.length; j++) {
                primitive.lineTo(part.vertices[j].x - body.position.x, part.vertices[j].y - body.position.y);
            }

            primitive.lineTo(part.vertices[0].x - body.position.x, part.vertices[0].y - body.position.y);

            primitive.endFill();

            // angle indicator
            if (options.showAngleIndicator || options.showAxes) {
                primitive.beginFill(0, 0);

                if (options.wireframes) {
                    primitive.lineStyle(1, strokeStyleWireframeIndicator, 1);
                } else {
                    primitive.lineStyle(1, strokeStyleIndicator);
                }

                primitive.moveTo(part.position.x - body.position.x, part.position.y - body.position.y);
                primitive.lineTo(((part.vertices[0].x + part.vertices[part.vertices.length-1].x) / 2 - body.position.x), 
                                 ((part.vertices[0].y + part.vertices[part.vertices.length-1].y) / 2 - body.position.y));

                primitive.endFill();
            }
        }

        return primitive;
    };

    /**
     * Gets the requested texture (a PIXI.Texture) via its path
     * @method _getTexture
     * @private
     * @param {RenderPixi} render
     * @param {string} imagePath
     * @return {PIXI.Texture} texture
     * @deprecated
     */
    var _getTexture = function(render, imagePath) {
        var texture = render.textures[imagePath];

        if (!texture)
            texture = render.textures[imagePath] = PIXI.Texture.fromImage(imagePath);

        return texture;
    };

})();

},{"../body/Composite":2,"../core/Common":14,"../core/Events":16,"../geometry/Bounds":26,"../geometry/Vector":28}]},{},[30])(30)
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var matter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! matter-js */ "./node_modules/matter-js/build/matter.js");
/* harmony import */ var matter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(matter_js__WEBPACK_IMPORTED_MODULE_0__);

var Engine = matter_js__WEBPACK_IMPORTED_MODULE_0__["Engine"], Render = matter_js__WEBPACK_IMPORTED_MODULE_0__["Render"], World = matter_js__WEBPACK_IMPORTED_MODULE_0__["World"], Bodies = matter_js__WEBPACK_IMPORTED_MODULE_0__["Bodies"], Body = matter_js__WEBPACK_IMPORTED_MODULE_0__["Body"], Composites = matter_js__WEBPACK_IMPORTED_MODULE_0__["Composites"], Constraint = matter_js__WEBPACK_IMPORTED_MODULE_0__["Constraint"], Mouse = matter_js__WEBPACK_IMPORTED_MODULE_0__["Mouse"], MouseConstraint = matter_js__WEBPACK_IMPORTED_MODULE_0__["MouseConstraint"];
// create an engine
var engine = Engine.create();
// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        showAngleIndicator: true
    }
});
var arm = Bodies.rectangle(200, 200, 200, 50);
var constraint = Constraint.create({
    pointA: { x: 300, y: 100 },
    bodyB: arm,
    pointB: { x: 100, y: 0 }
});
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
// add all of the bodies to the world
World.add(engine.world, [constraint, arm, ground]);
var mouse = Mouse.create(render.canvas), mouseConstraint = MouseConstraint.create(engine, {
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21hdHRlci1qcy9idWlsZC9tYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsR0FBRyxJQUFzRCxFQUFFLG1CQUFtQixLQUFLLFVBQStOLENBQUMsYUFBYSwwQkFBMEIsbUJBQW1C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QUFDQTtBQUNBO0FBQ0EsYUFBYSxhQUFhLEdBQUcsZUFBZSxHQUFHLGNBQWM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LHdCQUF3QjtBQUMvQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsd0JBQXdCO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxXQUFXO0FBQzFCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQSx1QkFBdUIsbUJBQW1CO0FBQzFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsMkJBQTJCLHVCQUF1QjtBQUNsRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRCxDQUFDLEVBQUUsMElBQTBJO0FBQzdJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZ0JBQWdCO0FBQ2hCLGdCQUFnQixnQkFBZ0I7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsMkJBQTJCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7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Q0FBQztBQUVuRCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFDckMsZUFBZSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO0lBQy9DLEtBQUssRUFBRSxLQUFLO0lBQ1osVUFBVSxFQUFFO1FBQ1YsU0FBUyxFQUFFLEdBQUc7UUFDZCxNQUFNLEVBQUU7WUFDTixPQUFPLEVBQUUsS0FBSztTQUNmO0tBQ0Y7Q0FDRixDQUFDLENBQUM7QUFFTCxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFFekMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFFckIsaUJBQWlCO0FBQ2pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFbkIsbUJBQW1CO0FBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL21haW4udHNcIik7XG4iLCIvKipcbiogbWF0dGVyLWpzIDAuMTQuMiBieSBAbGlhYnJ1IDIwMTgtMDYtMTFcbiogaHR0cDovL2JybS5pby9tYXR0ZXItanMvXG4qIExpY2Vuc2UgTUlUXG4qL1xuXG4vKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICogXG4gKiBDb3B5cmlnaHQgKGMpIExpYW0gQnJ1bW1pdHQgYW5kIGNvbnRyaWJ1dG9ycy5cbiAqIFxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICogXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKiBcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLk1hdHRlciA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkoezE6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyLkJvZHlgIG1vZHVsZSBjb250YWlucyBtZXRob2RzIGZvciBjcmVhdGluZyBhbmQgbWFuaXB1bGF0aW5nIGJvZHkgbW9kZWxzLlxuKiBBIGBNYXR0ZXIuQm9keWAgaXMgYSByaWdpZCBib2R5IHRoYXQgY2FuIGJlIHNpbXVsYXRlZCBieSBhIGBNYXR0ZXIuRW5naW5lYC5cbiogRmFjdG9yaWVzIGZvciBjb21tb25seSB1c2VkIGJvZHkgY29uZmlndXJhdGlvbnMgKHN1Y2ggYXMgcmVjdGFuZ2xlcywgY2lyY2xlcyBhbmQgb3RoZXIgcG9seWdvbnMpIGNhbiBiZSBmb3VuZCBpbiB0aGUgbW9kdWxlIGBNYXR0ZXIuQm9kaWVzYC5cbipcbiogU2VlIHRoZSBpbmNsdWRlZCB1c2FnZSBbZXhhbXBsZXNdKGh0dHBzOi8vZ2l0aHViLmNvbS9saWFicnUvbWF0dGVyLWpzL3RyZWUvbWFzdGVyL2V4YW1wbGVzKS5cblxuKiBAY2xhc3MgQm9keVxuKi9cblxudmFyIEJvZHkgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBCb2R5O1xuXG52YXIgVmVydGljZXMgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9WZXJ0aWNlcycpO1xudmFyIFZlY3RvciA9IF9kZXJlcV8oJy4uL2dlb21ldHJ5L1ZlY3RvcicpO1xudmFyIFNsZWVwaW5nID0gX2RlcmVxXygnLi4vY29yZS9TbGVlcGluZycpO1xudmFyIFJlbmRlciA9IF9kZXJlcV8oJy4uL3JlbmRlci9SZW5kZXInKTtcbnZhciBDb21tb24gPSBfZGVyZXFfKCcuLi9jb3JlL0NvbW1vbicpO1xudmFyIEJvdW5kcyA9IF9kZXJlcV8oJy4uL2dlb21ldHJ5L0JvdW5kcycpO1xudmFyIEF4ZXMgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9BeGVzJyk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIEJvZHkuX2luZXJ0aWFTY2FsZSA9IDQ7XG4gICAgQm9keS5fbmV4dENvbGxpZGluZ0dyb3VwSWQgPSAxO1xuICAgIEJvZHkuX25leHROb25Db2xsaWRpbmdHcm91cElkID0gLTE7XG4gICAgQm9keS5fbmV4dENhdGVnb3J5ID0gMHgwMDAxO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyByaWdpZCBib2R5IG1vZGVsLiBUaGUgb3B0aW9ucyBwYXJhbWV0ZXIgaXMgYW4gb2JqZWN0IHRoYXQgc3BlY2lmaWVzIGFueSBwcm9wZXJ0aWVzIHlvdSB3aXNoIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0cy5cbiAgICAgKiBBbGwgcHJvcGVydGllcyBoYXZlIGRlZmF1bHQgdmFsdWVzLCBhbmQgbWFueSBhcmUgcHJlLWNhbGN1bGF0ZWQgYXV0b21hdGljYWxseSBiYXNlZCBvbiBvdGhlciBwcm9wZXJ0aWVzLlxuICAgICAqIFZlcnRpY2VzIG11c3QgYmUgc3BlY2lmaWVkIGluIGNsb2Nrd2lzZSBvcmRlci5cbiAgICAgKiBTZWUgdGhlIHByb3BlcnRpZXMgc2VjdGlvbiBiZWxvdyBmb3IgZGV0YWlsZWQgaW5mb3JtYXRpb24gb24gd2hhdCB5b3UgY2FuIHBhc3MgdmlhIHRoZSBgb3B0aW9uc2Agb2JqZWN0LlxuICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICogQHBhcmFtIHt9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtib2R5fSBib2R5XG4gICAgICovXG4gICAgQm9keS5jcmVhdGUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIGlkOiBDb21tb24ubmV4dElkKCksXG4gICAgICAgICAgICB0eXBlOiAnYm9keScsXG4gICAgICAgICAgICBsYWJlbDogJ0JvZHknLFxuICAgICAgICAgICAgcGFydHM6IFtdLFxuICAgICAgICAgICAgcGx1Z2luOiB7fSxcbiAgICAgICAgICAgIGFuZ2xlOiAwLFxuICAgICAgICAgICAgdmVydGljZXM6IFZlcnRpY2VzLmZyb21QYXRoKCdMIDAgMCBMIDQwIDAgTCA0MCA0MCBMIDAgNDAnKSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICAgIGZvcmNlOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICAgIHRvcnF1ZTogMCxcbiAgICAgICAgICAgIHBvc2l0aW9uSW1wdWxzZTogeyB4OiAwLCB5OiAwIH0sXG4gICAgICAgICAgICBjb25zdHJhaW50SW1wdWxzZTogeyB4OiAwLCB5OiAwLCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgdG90YWxDb250YWN0czogMCxcbiAgICAgICAgICAgIHNwZWVkOiAwLFxuICAgICAgICAgICAgYW5ndWxhclNwZWVkOiAwLFxuICAgICAgICAgICAgdmVsb2NpdHk6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgICAgYW5ndWxhclZlbG9jaXR5OiAwLFxuICAgICAgICAgICAgaXNTZW5zb3I6IGZhbHNlLFxuICAgICAgICAgICAgaXNTdGF0aWM6IGZhbHNlLFxuICAgICAgICAgICAgaXNTbGVlcGluZzogZmFsc2UsXG4gICAgICAgICAgICBtb3Rpb246IDAsXG4gICAgICAgICAgICBzbGVlcFRocmVzaG9sZDogNjAsXG4gICAgICAgICAgICBkZW5zaXR5OiAwLjAwMSxcbiAgICAgICAgICAgIHJlc3RpdHV0aW9uOiAwLFxuICAgICAgICAgICAgZnJpY3Rpb246IDAuMSxcbiAgICAgICAgICAgIGZyaWN0aW9uU3RhdGljOiAwLjUsXG4gICAgICAgICAgICBmcmljdGlvbkFpcjogMC4wMSxcbiAgICAgICAgICAgIGNvbGxpc2lvbkZpbHRlcjoge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAweDAwMDEsXG4gICAgICAgICAgICAgICAgbWFzazogMHhGRkZGRkZGRixcbiAgICAgICAgICAgICAgICBncm91cDogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNsb3A6IDAuMDUsXG4gICAgICAgICAgICB0aW1lU2NhbGU6IDEsXG4gICAgICAgICAgICByZW5kZXI6IHtcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICAgICAgc3ByaXRlOiB7XG4gICAgICAgICAgICAgICAgICAgIHhTY2FsZTogMSxcbiAgICAgICAgICAgICAgICAgICAgeVNjYWxlOiAxLFxuICAgICAgICAgICAgICAgICAgICB4T2Zmc2V0OiAwLFxuICAgICAgICAgICAgICAgICAgICB5T2Zmc2V0OiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgYm9keSA9IENvbW1vbi5leHRlbmQoZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgICAgIF9pbml0UHJvcGVydGllcyhib2R5LCBvcHRpb25zKTtcblxuICAgICAgICByZXR1cm4gYm9keTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbmV4dCB1bmlxdWUgZ3JvdXAgaW5kZXggZm9yIHdoaWNoIGJvZGllcyB3aWxsIGNvbGxpZGUuXG4gICAgICogSWYgYGlzTm9uQ29sbGlkaW5nYCBpcyBgdHJ1ZWAsIHJldHVybnMgdGhlIG5leHQgdW5pcXVlIGdyb3VwIGluZGV4IGZvciB3aGljaCBib2RpZXMgd2lsbCBfbm90XyBjb2xsaWRlLlxuICAgICAqIFNlZSBgYm9keS5jb2xsaXNpb25GaWx0ZXJgIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAqIEBtZXRob2QgbmV4dEdyb3VwXG4gICAgICogQHBhcmFtIHtib29sfSBbaXNOb25Db2xsaWRpbmc9ZmFsc2VdXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBVbmlxdWUgZ3JvdXAgaW5kZXhcbiAgICAgKi9cbiAgICBCb2R5Lm5leHRHcm91cCA9IGZ1bmN0aW9uKGlzTm9uQ29sbGlkaW5nKSB7XG4gICAgICAgIGlmIChpc05vbkNvbGxpZGluZylcbiAgICAgICAgICAgIHJldHVybiBCb2R5Ll9uZXh0Tm9uQ29sbGlkaW5nR3JvdXBJZC0tO1xuXG4gICAgICAgIHJldHVybiBCb2R5Ll9uZXh0Q29sbGlkaW5nR3JvdXBJZCsrO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBuZXh0IHVuaXF1ZSBjYXRlZ29yeSBiaXRmaWVsZCAoc3RhcnRpbmcgYWZ0ZXIgdGhlIGluaXRpYWwgZGVmYXVsdCBjYXRlZ29yeSBgMHgwMDAxYCkuXG4gICAgICogVGhlcmUgYXJlIDMyIGF2YWlsYWJsZS4gU2VlIGBib2R5LmNvbGxpc2lvbkZpbHRlcmAgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICogQG1ldGhvZCBuZXh0Q2F0ZWdvcnlcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFVuaXF1ZSBjYXRlZ29yeSBiaXRmaWVsZFxuICAgICAqL1xuICAgIEJvZHkubmV4dENhdGVnb3J5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIEJvZHkuX25leHRDYXRlZ29yeSA9IEJvZHkuX25leHRDYXRlZ29yeSA8PCAxO1xuICAgICAgICByZXR1cm4gQm9keS5fbmV4dENhdGVnb3J5O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXNlcyBib2R5IHByb3BlcnRpZXMuXG4gICAgICogQG1ldGhvZCBfaW5pdFByb3BlcnRpZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7Ym9keX0gYm9keVxuICAgICAqIEBwYXJhbSB7fSBbb3B0aW9uc11cbiAgICAgKi9cbiAgICB2YXIgX2luaXRQcm9wZXJ0aWVzID0gZnVuY3Rpb24oYm9keSwgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICAvLyBpbml0IHJlcXVpcmVkIHByb3BlcnRpZXMgKG9yZGVyIGlzIGltcG9ydGFudClcbiAgICAgICAgQm9keS5zZXQoYm9keSwge1xuICAgICAgICAgICAgYm91bmRzOiBib2R5LmJvdW5kcyB8fCBCb3VuZHMuY3JlYXRlKGJvZHkudmVydGljZXMpLFxuICAgICAgICAgICAgcG9zaXRpb25QcmV2OiBib2R5LnBvc2l0aW9uUHJldiB8fCBWZWN0b3IuY2xvbmUoYm9keS5wb3NpdGlvbiksXG4gICAgICAgICAgICBhbmdsZVByZXY6IGJvZHkuYW5nbGVQcmV2IHx8IGJvZHkuYW5nbGUsXG4gICAgICAgICAgICB2ZXJ0aWNlczogYm9keS52ZXJ0aWNlcyxcbiAgICAgICAgICAgIHBhcnRzOiBib2R5LnBhcnRzIHx8IFtib2R5XSxcbiAgICAgICAgICAgIGlzU3RhdGljOiBib2R5LmlzU3RhdGljLFxuICAgICAgICAgICAgaXNTbGVlcGluZzogYm9keS5pc1NsZWVwaW5nLFxuICAgICAgICAgICAgcGFyZW50OiBib2R5LnBhcmVudCB8fCBib2R5XG4gICAgICAgIH0pO1xuXG4gICAgICAgIFZlcnRpY2VzLnJvdGF0ZShib2R5LnZlcnRpY2VzLCBib2R5LmFuZ2xlLCBib2R5LnBvc2l0aW9uKTtcbiAgICAgICAgQXhlcy5yb3RhdGUoYm9keS5heGVzLCBib2R5LmFuZ2xlKTtcbiAgICAgICAgQm91bmRzLnVwZGF0ZShib2R5LmJvdW5kcywgYm9keS52ZXJ0aWNlcywgYm9keS52ZWxvY2l0eSk7XG5cbiAgICAgICAgLy8gYWxsb3cgb3B0aW9ucyB0byBvdmVycmlkZSB0aGUgYXV0b21hdGljYWxseSBjYWxjdWxhdGVkIHByb3BlcnRpZXNcbiAgICAgICAgQm9keS5zZXQoYm9keSwge1xuICAgICAgICAgICAgYXhlczogb3B0aW9ucy5heGVzIHx8IGJvZHkuYXhlcyxcbiAgICAgICAgICAgIGFyZWE6IG9wdGlvbnMuYXJlYSB8fCBib2R5LmFyZWEsXG4gICAgICAgICAgICBtYXNzOiBvcHRpb25zLm1hc3MgfHwgYm9keS5tYXNzLFxuICAgICAgICAgICAgaW5lcnRpYTogb3B0aW9ucy5pbmVydGlhIHx8IGJvZHkuaW5lcnRpYVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyByZW5kZXIgcHJvcGVydGllc1xuICAgICAgICB2YXIgZGVmYXVsdEZpbGxTdHlsZSA9IChib2R5LmlzU3RhdGljID8gJyMyZTJiNDQnIDogQ29tbW9uLmNob29zZShbJyMwMDZCQTYnLCAnIzA0OTZGRicsICcjRkZCQzQyJywgJyNEODExNTknLCAnIzhGMkQ1NiddKSksXG4gICAgICAgICAgICBkZWZhdWx0U3Ryb2tlU3R5bGUgPSAnIzAwMCc7XG4gICAgICAgIGJvZHkucmVuZGVyLmZpbGxTdHlsZSA9IGJvZHkucmVuZGVyLmZpbGxTdHlsZSB8fCBkZWZhdWx0RmlsbFN0eWxlO1xuICAgICAgICBib2R5LnJlbmRlci5zdHJva2VTdHlsZSA9IGJvZHkucmVuZGVyLnN0cm9rZVN0eWxlIHx8IGRlZmF1bHRTdHJva2VTdHlsZTtcbiAgICAgICAgYm9keS5yZW5kZXIuc3ByaXRlLnhPZmZzZXQgKz0gLShib2R5LmJvdW5kcy5taW4ueCAtIGJvZHkucG9zaXRpb24ueCkgLyAoYm9keS5ib3VuZHMubWF4LnggLSBib2R5LmJvdW5kcy5taW4ueCk7XG4gICAgICAgIGJvZHkucmVuZGVyLnNwcml0ZS55T2Zmc2V0ICs9IC0oYm9keS5ib3VuZHMubWluLnkgLSBib2R5LnBvc2l0aW9uLnkpIC8gKGJvZHkuYm91bmRzLm1heC55IC0gYm9keS5ib3VuZHMubWluLnkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBHaXZlbiBhIHByb3BlcnR5IGFuZCBhIHZhbHVlIChvciBtYXAgb2YpLCBzZXRzIHRoZSBwcm9wZXJ0eShzKSBvbiB0aGUgYm9keSwgdXNpbmcgdGhlIGFwcHJvcHJpYXRlIHNldHRlciBmdW5jdGlvbnMgaWYgdGhleSBleGlzdC5cbiAgICAgKiBQcmVmZXIgdG8gdXNlIHRoZSBhY3R1YWwgc2V0dGVyIGZ1bmN0aW9ucyBpbiBwZXJmb3JtYW5jZSBjcml0aWNhbCBzaXR1YXRpb25zLlxuICAgICAqIEBtZXRob2Qgc2V0XG4gICAgICogQHBhcmFtIHtib2R5fSBib2R5XG4gICAgICogQHBhcmFtIHt9IHNldHRpbmdzIEEgcHJvcGVydHkgbmFtZSAob3IgbWFwIG9mIHByb3BlcnRpZXMgYW5kIHZhbHVlcykgdG8gc2V0IG9uIHRoZSBib2R5LlxuICAgICAqIEBwYXJhbSB7fSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0IGlmIGBzZXR0aW5nc2AgaXMgYSBzaW5nbGUgcHJvcGVydHkgbmFtZS5cbiAgICAgKi9cbiAgICBCb2R5LnNldCA9IGZ1bmN0aW9uKGJvZHksIHNldHRpbmdzLCB2YWx1ZSkge1xuICAgICAgICB2YXIgcHJvcGVydHk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBzZXR0aW5ncyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHByb3BlcnR5ID0gc2V0dGluZ3M7XG4gICAgICAgICAgICBzZXR0aW5ncyA9IHt9O1xuICAgICAgICAgICAgc2V0dGluZ3NbcHJvcGVydHldID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHByb3BlcnR5IGluIHNldHRpbmdzKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHNldHRpbmdzW3Byb3BlcnR5XTtcblxuICAgICAgICAgICAgaWYgKCFzZXR0aW5ncy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHkpIHtcblxuICAgICAgICAgICAgY2FzZSAnaXNTdGF0aWMnOlxuICAgICAgICAgICAgICAgIEJvZHkuc2V0U3RhdGljKGJvZHksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2lzU2xlZXBpbmcnOlxuICAgICAgICAgICAgICAgIFNsZWVwaW5nLnNldChib2R5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtYXNzJzpcbiAgICAgICAgICAgICAgICBCb2R5LnNldE1hc3MoYm9keSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGVuc2l0eSc6XG4gICAgICAgICAgICAgICAgQm9keS5zZXREZW5zaXR5KGJvZHksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2luZXJ0aWEnOlxuICAgICAgICAgICAgICAgIEJvZHkuc2V0SW5lcnRpYShib2R5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd2ZXJ0aWNlcyc6XG4gICAgICAgICAgICAgICAgQm9keS5zZXRWZXJ0aWNlcyhib2R5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdwb3NpdGlvbic6XG4gICAgICAgICAgICAgICAgQm9keS5zZXRQb3NpdGlvbihib2R5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdhbmdsZSc6XG4gICAgICAgICAgICAgICAgQm9keS5zZXRBbmdsZShib2R5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd2ZWxvY2l0eSc6XG4gICAgICAgICAgICAgICAgQm9keS5zZXRWZWxvY2l0eShib2R5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdhbmd1bGFyVmVsb2NpdHknOlxuICAgICAgICAgICAgICAgIEJvZHkuc2V0QW5ndWxhclZlbG9jaXR5KGJvZHksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3BhcnRzJzpcbiAgICAgICAgICAgICAgICBCb2R5LnNldFBhcnRzKGJvZHksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYm9keVtwcm9wZXJ0eV0gPSB2YWx1ZTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGJvZHkgYXMgc3RhdGljLCBpbmNsdWRpbmcgaXNTdGF0aWMgZmxhZyBhbmQgc2V0dGluZyBtYXNzIGFuZCBpbmVydGlhIHRvIEluZmluaXR5LlxuICAgICAqIEBtZXRob2Qgc2V0U3RhdGljXG4gICAgICogQHBhcmFtIHtib2R5fSBib2R5XG4gICAgICogQHBhcmFtIHtib29sfSBpc1N0YXRpY1xuICAgICAqL1xuICAgIEJvZHkuc2V0U3RhdGljID0gZnVuY3Rpb24oYm9keSwgaXNTdGF0aWMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib2R5LnBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcGFydCA9IGJvZHkucGFydHNbaV07XG4gICAgICAgICAgICBwYXJ0LmlzU3RhdGljID0gaXNTdGF0aWM7XG5cbiAgICAgICAgICAgIGlmIChpc1N0YXRpYykge1xuICAgICAgICAgICAgICAgIHBhcnQuX29yaWdpbmFsID0ge1xuICAgICAgICAgICAgICAgICAgICByZXN0aXR1dGlvbjogcGFydC5yZXN0aXR1dGlvbixcbiAgICAgICAgICAgICAgICAgICAgZnJpY3Rpb246IHBhcnQuZnJpY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIG1hc3M6IHBhcnQubWFzcyxcbiAgICAgICAgICAgICAgICAgICAgaW5lcnRpYTogcGFydC5pbmVydGlhLFxuICAgICAgICAgICAgICAgICAgICBkZW5zaXR5OiBwYXJ0LmRlbnNpdHksXG4gICAgICAgICAgICAgICAgICAgIGludmVyc2VNYXNzOiBwYXJ0LmludmVyc2VNYXNzLFxuICAgICAgICAgICAgICAgICAgICBpbnZlcnNlSW5lcnRpYTogcGFydC5pbnZlcnNlSW5lcnRpYVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBwYXJ0LnJlc3RpdHV0aW9uID0gMDtcbiAgICAgICAgICAgICAgICBwYXJ0LmZyaWN0aW9uID0gMTtcbiAgICAgICAgICAgICAgICBwYXJ0Lm1hc3MgPSBwYXJ0LmluZXJ0aWEgPSBwYXJ0LmRlbnNpdHkgPSBJbmZpbml0eTtcbiAgICAgICAgICAgICAgICBwYXJ0LmludmVyc2VNYXNzID0gcGFydC5pbnZlcnNlSW5lcnRpYSA9IDA7XG5cbiAgICAgICAgICAgICAgICBwYXJ0LnBvc2l0aW9uUHJldi54ID0gcGFydC5wb3NpdGlvbi54O1xuICAgICAgICAgICAgICAgIHBhcnQucG9zaXRpb25QcmV2LnkgPSBwYXJ0LnBvc2l0aW9uLnk7XG4gICAgICAgICAgICAgICAgcGFydC5hbmdsZVByZXYgPSBwYXJ0LmFuZ2xlO1xuICAgICAgICAgICAgICAgIHBhcnQuYW5ndWxhclZlbG9jaXR5ID0gMDtcbiAgICAgICAgICAgICAgICBwYXJ0LnNwZWVkID0gMDtcbiAgICAgICAgICAgICAgICBwYXJ0LmFuZ3VsYXJTcGVlZCA9IDA7XG4gICAgICAgICAgICAgICAgcGFydC5tb3Rpb24gPSAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJ0Ll9vcmlnaW5hbCkge1xuICAgICAgICAgICAgICAgIHBhcnQucmVzdGl0dXRpb24gPSBwYXJ0Ll9vcmlnaW5hbC5yZXN0aXR1dGlvbjtcbiAgICAgICAgICAgICAgICBwYXJ0LmZyaWN0aW9uID0gcGFydC5fb3JpZ2luYWwuZnJpY3Rpb247XG4gICAgICAgICAgICAgICAgcGFydC5tYXNzID0gcGFydC5fb3JpZ2luYWwubWFzcztcbiAgICAgICAgICAgICAgICBwYXJ0LmluZXJ0aWEgPSBwYXJ0Ll9vcmlnaW5hbC5pbmVydGlhO1xuICAgICAgICAgICAgICAgIHBhcnQuZGVuc2l0eSA9IHBhcnQuX29yaWdpbmFsLmRlbnNpdHk7XG4gICAgICAgICAgICAgICAgcGFydC5pbnZlcnNlTWFzcyA9IHBhcnQuX29yaWdpbmFsLmludmVyc2VNYXNzO1xuICAgICAgICAgICAgICAgIHBhcnQuaW52ZXJzZUluZXJ0aWEgPSBwYXJ0Ll9vcmlnaW5hbC5pbnZlcnNlSW5lcnRpYTtcblxuICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXJ0Ll9vcmlnaW5hbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBtYXNzIG9mIHRoZSBib2R5LiBJbnZlcnNlIG1hc3MsIGRlbnNpdHkgYW5kIGluZXJ0aWEgYXJlIGF1dG9tYXRpY2FsbHkgdXBkYXRlZCB0byByZWZsZWN0IHRoZSBjaGFuZ2UuXG4gICAgICogQG1ldGhvZCBzZXRNYXNzXG4gICAgICogQHBhcmFtIHtib2R5fSBib2R5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1hc3NcbiAgICAgKi9cbiAgICBCb2R5LnNldE1hc3MgPSBmdW5jdGlvbihib2R5LCBtYXNzKSB7XG4gICAgICAgIHZhciBtb21lbnQgPSBib2R5LmluZXJ0aWEgLyAoYm9keS5tYXNzIC8gNik7XG4gICAgICAgIGJvZHkuaW5lcnRpYSA9IG1vbWVudCAqIChtYXNzIC8gNik7XG4gICAgICAgIGJvZHkuaW52ZXJzZUluZXJ0aWEgPSAxIC8gYm9keS5pbmVydGlhO1xuXG4gICAgICAgIGJvZHkubWFzcyA9IG1hc3M7XG4gICAgICAgIGJvZHkuaW52ZXJzZU1hc3MgPSAxIC8gYm9keS5tYXNzO1xuICAgICAgICBib2R5LmRlbnNpdHkgPSBib2R5Lm1hc3MgLyBib2R5LmFyZWE7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGRlbnNpdHkgb2YgdGhlIGJvZHkuIE1hc3MgYW5kIGluZXJ0aWEgYXJlIGF1dG9tYXRpY2FsbHkgdXBkYXRlZCB0byByZWZsZWN0IHRoZSBjaGFuZ2UuXG4gICAgICogQG1ldGhvZCBzZXREZW5zaXR5XG4gICAgICogQHBhcmFtIHtib2R5fSBib2R5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRlbnNpdHlcbiAgICAgKi9cbiAgICBCb2R5LnNldERlbnNpdHkgPSBmdW5jdGlvbihib2R5LCBkZW5zaXR5KSB7XG4gICAgICAgIEJvZHkuc2V0TWFzcyhib2R5LCBkZW5zaXR5ICogYm9keS5hcmVhKTtcbiAgICAgICAgYm9keS5kZW5zaXR5ID0gZGVuc2l0eTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgbW9tZW50IG9mIGluZXJ0aWEgKGkuZS4gc2Vjb25kIG1vbWVudCBvZiBhcmVhKSBvZiB0aGUgYm9keSBvZiB0aGUgYm9keS4gXG4gICAgICogSW52ZXJzZSBpbmVydGlhIGlzIGF1dG9tYXRpY2FsbHkgdXBkYXRlZCB0byByZWZsZWN0IHRoZSBjaGFuZ2UuIE1hc3MgaXMgbm90IGNoYW5nZWQuXG4gICAgICogQG1ldGhvZCBzZXRJbmVydGlhXG4gICAgICogQHBhcmFtIHtib2R5fSBib2R5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZXJ0aWFcbiAgICAgKi9cbiAgICBCb2R5LnNldEluZXJ0aWEgPSBmdW5jdGlvbihib2R5LCBpbmVydGlhKSB7XG4gICAgICAgIGJvZHkuaW5lcnRpYSA9IGluZXJ0aWE7XG4gICAgICAgIGJvZHkuaW52ZXJzZUluZXJ0aWEgPSAxIC8gYm9keS5pbmVydGlhO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBib2R5J3MgdmVydGljZXMgYW5kIHVwZGF0ZXMgYm9keSBwcm9wZXJ0aWVzIGFjY29yZGluZ2x5LCBpbmNsdWRpbmcgaW5lcnRpYSwgYXJlYSBhbmQgbWFzcyAod2l0aCByZXNwZWN0IHRvIGBib2R5LmRlbnNpdHlgKS5cbiAgICAgKiBWZXJ0aWNlcyB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgdHJhbnNmb3JtZWQgdG8gYmUgb3JpZW50YXRlZCBhcm91bmQgdGhlaXIgY2VudHJlIG9mIG1hc3MgYXMgdGhlIG9yaWdpbi5cbiAgICAgKiBUaGV5IGFyZSB0aGVuIGF1dG9tYXRpY2FsbHkgdHJhbnNsYXRlZCB0byB3b3JsZCBzcGFjZSBiYXNlZCBvbiBgYm9keS5wb3NpdGlvbmAuXG4gICAgICpcbiAgICAgKiBUaGUgYHZlcnRpY2VzYCBhcmd1bWVudCBzaG91bGQgYmUgcGFzc2VkIGFzIGFuIGFycmF5IG9mIGBNYXR0ZXIuVmVjdG9yYCBwb2ludHMgKG9yIGEgYE1hdHRlci5WZXJ0aWNlc2AgYXJyYXkpLlxuICAgICAqIFZlcnRpY2VzIG11c3QgZm9ybSBhIGNvbnZleCBodWxsLCBjb25jYXZlIGh1bGxzIGFyZSBub3Qgc3VwcG9ydGVkLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBzZXRWZXJ0aWNlc1xuICAgICAqIEBwYXJhbSB7Ym9keX0gYm9keVxuICAgICAqIEBwYXJhbSB7dmVjdG9yW119IHZlcnRpY2VzXG4gICAgICovXG4gICAgQm9keS5zZXRWZXJ0aWNlcyA9IGZ1bmN0aW9uKGJvZHksIHZlcnRpY2VzKSB7XG4gICAgICAgIC8vIGNoYW5nZSB2ZXJ0aWNlc1xuICAgICAgICBpZiAodmVydGljZXNbMF0uYm9keSA9PT0gYm9keSkge1xuICAgICAgICAgICAgYm9keS52ZXJ0aWNlcyA9IHZlcnRpY2VzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm9keS52ZXJ0aWNlcyA9IFZlcnRpY2VzLmNyZWF0ZSh2ZXJ0aWNlcywgYm9keSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgcHJvcGVydGllc1xuICAgICAgICBib2R5LmF4ZXMgPSBBeGVzLmZyb21WZXJ0aWNlcyhib2R5LnZlcnRpY2VzKTtcbiAgICAgICAgYm9keS5hcmVhID0gVmVydGljZXMuYXJlYShib2R5LnZlcnRpY2VzKTtcbiAgICAgICAgQm9keS5zZXRNYXNzKGJvZHksIGJvZHkuZGVuc2l0eSAqIGJvZHkuYXJlYSk7XG5cbiAgICAgICAgLy8gb3JpZW50IHZlcnRpY2VzIGFyb3VuZCB0aGUgY2VudHJlIG9mIG1hc3MgYXQgb3JpZ2luICgwLCAwKVxuICAgICAgICB2YXIgY2VudHJlID0gVmVydGljZXMuY2VudHJlKGJvZHkudmVydGljZXMpO1xuICAgICAgICBWZXJ0aWNlcy50cmFuc2xhdGUoYm9keS52ZXJ0aWNlcywgY2VudHJlLCAtMSk7XG5cbiAgICAgICAgLy8gdXBkYXRlIGluZXJ0aWEgd2hpbGUgdmVydGljZXMgYXJlIGF0IG9yaWdpbiAoMCwgMClcbiAgICAgICAgQm9keS5zZXRJbmVydGlhKGJvZHksIEJvZHkuX2luZXJ0aWFTY2FsZSAqIFZlcnRpY2VzLmluZXJ0aWEoYm9keS52ZXJ0aWNlcywgYm9keS5tYXNzKSk7XG5cbiAgICAgICAgLy8gdXBkYXRlIGdlb21ldHJ5XG4gICAgICAgIFZlcnRpY2VzLnRyYW5zbGF0ZShib2R5LnZlcnRpY2VzLCBib2R5LnBvc2l0aW9uKTtcbiAgICAgICAgQm91bmRzLnVwZGF0ZShib2R5LmJvdW5kcywgYm9keS52ZXJ0aWNlcywgYm9keS52ZWxvY2l0eSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHBhcnRzIG9mIHRoZSBgYm9keWAgYW5kIHVwZGF0ZXMgbWFzcywgaW5lcnRpYSBhbmQgY2VudHJvaWQuXG4gICAgICogRWFjaCBwYXJ0IHdpbGwgaGF2ZSBpdHMgcGFyZW50IHNldCB0byBgYm9keWAuXG4gICAgICogQnkgZGVmYXVsdCB0aGUgY29udmV4IGh1bGwgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IGNvbXB1dGVkIGFuZCBzZXQgb24gYGJvZHlgLCB1bmxlc3MgYGF1dG9IdWxsYCBpcyBzZXQgdG8gYGZhbHNlLmBcbiAgICAgKiBOb3RlIHRoYXQgdGhpcyBtZXRob2Qgd2lsbCBlbnN1cmUgdGhhdCB0aGUgZmlyc3QgcGFydCBpbiBgYm9keS5wYXJ0c2Agd2lsbCBhbHdheXMgYmUgdGhlIGBib2R5YC5cbiAgICAgKiBAbWV0aG9kIHNldFBhcnRzXG4gICAgICogQHBhcmFtIHtib2R5fSBib2R5XG4gICAgICogQHBhcmFtIFtib2R5XSBwYXJ0c1xuICAgICAqIEBwYXJhbSB7Ym9vbH0gW2F1dG9IdWxsPXRydWVdXG4gICAgICovXG4gICAgQm9keS5zZXRQYXJ0cyA9IGZ1bmN0aW9uKGJvZHksIHBhcnRzLCBhdXRvSHVsbCkge1xuICAgICAgICB2YXIgaTtcblxuICAgICAgICAvLyBhZGQgYWxsIHRoZSBwYXJ0cywgZW5zdXJpbmcgdGhhdCB0aGUgZmlyc3QgcGFydCBpcyBhbHdheXMgdGhlIHBhcmVudCBib2R5XG4gICAgICAgIHBhcnRzID0gcGFydHMuc2xpY2UoMCk7XG4gICAgICAgIGJvZHkucGFydHMubGVuZ3RoID0gMDtcbiAgICAgICAgYm9keS5wYXJ0cy5wdXNoKGJvZHkpO1xuICAgICAgICBib2R5LnBhcmVudCA9IGJvZHk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcGFydCA9IHBhcnRzW2ldO1xuICAgICAgICAgICAgaWYgKHBhcnQgIT09IGJvZHkpIHtcbiAgICAgICAgICAgICAgICBwYXJ0LnBhcmVudCA9IGJvZHk7XG4gICAgICAgICAgICAgICAgYm9keS5wYXJ0cy5wdXNoKHBhcnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJvZHkucGFydHMubGVuZ3RoID09PSAxKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGF1dG9IdWxsID0gdHlwZW9mIGF1dG9IdWxsICE9PSAndW5kZWZpbmVkJyA/IGF1dG9IdWxsIDogdHJ1ZTtcblxuICAgICAgICAvLyBmaW5kIHRoZSBjb252ZXggaHVsbCBvZiBhbGwgcGFydHMgdG8gc2V0IG9uIHRoZSBwYXJlbnQgYm9keVxuICAgICAgICBpZiAoYXV0b0h1bGwpIHtcbiAgICAgICAgICAgIHZhciB2ZXJ0aWNlcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMgPSB2ZXJ0aWNlcy5jb25jYXQocGFydHNbaV0udmVydGljZXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBWZXJ0aWNlcy5jbG9ja3dpc2VTb3J0KHZlcnRpY2VzKTtcblxuICAgICAgICAgICAgdmFyIGh1bGwgPSBWZXJ0aWNlcy5odWxsKHZlcnRpY2VzKSxcbiAgICAgICAgICAgICAgICBodWxsQ2VudHJlID0gVmVydGljZXMuY2VudHJlKGh1bGwpO1xuXG4gICAgICAgICAgICBCb2R5LnNldFZlcnRpY2VzKGJvZHksIGh1bGwpO1xuICAgICAgICAgICAgVmVydGljZXMudHJhbnNsYXRlKGJvZHkudmVydGljZXMsIGh1bGxDZW50cmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3VtIHRoZSBwcm9wZXJ0aWVzIG9mIGFsbCBjb21wb3VuZCBwYXJ0cyBvZiB0aGUgcGFyZW50IGJvZHlcbiAgICAgICAgdmFyIHRvdGFsID0gQm9keS5fdG90YWxQcm9wZXJ0aWVzKGJvZHkpO1xuXG4gICAgICAgIGJvZHkuYXJlYSA9IHRvdGFsLmFyZWE7XG4gICAgICAgIGJvZHkucGFyZW50ID0gYm9keTtcbiAgICAgICAgYm9keS5wb3NpdGlvbi54ID0gdG90YWwuY2VudHJlLng7XG4gICAgICAgIGJvZHkucG9zaXRpb24ueSA9IHRvdGFsLmNlbnRyZS55O1xuICAgICAgICBib2R5LnBvc2l0aW9uUHJldi54ID0gdG90YWwuY2VudHJlLng7XG4gICAgICAgIGJvZHkucG9zaXRpb25QcmV2LnkgPSB0b3RhbC5jZW50cmUueTtcblxuICAgICAgICBCb2R5LnNldE1hc3MoYm9keSwgdG90YWwubWFzcyk7XG4gICAgICAgIEJvZHkuc2V0SW5lcnRpYShib2R5LCB0b3RhbC5pbmVydGlhKTtcbiAgICAgICAgQm9keS5zZXRQb3NpdGlvbihib2R5LCB0b3RhbC5jZW50cmUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgYm9keSBpbnN0YW50bHkuIFZlbG9jaXR5LCBhbmdsZSwgZm9yY2UgZXRjLiBhcmUgdW5jaGFuZ2VkLlxuICAgICAqIEBtZXRob2Qgc2V0UG9zaXRpb25cbiAgICAgKiBAcGFyYW0ge2JvZHl9IGJvZHlcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gcG9zaXRpb25cbiAgICAgKi9cbiAgICBCb2R5LnNldFBvc2l0aW9uID0gZnVuY3Rpb24oYm9keSwgcG9zaXRpb24pIHtcbiAgICAgICAgdmFyIGRlbHRhID0gVmVjdG9yLnN1Yihwb3NpdGlvbiwgYm9keS5wb3NpdGlvbik7XG4gICAgICAgIGJvZHkucG9zaXRpb25QcmV2LnggKz0gZGVsdGEueDtcbiAgICAgICAgYm9keS5wb3NpdGlvblByZXYueSArPSBkZWx0YS55O1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm9keS5wYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHBhcnQgPSBib2R5LnBhcnRzW2ldO1xuICAgICAgICAgICAgcGFydC5wb3NpdGlvbi54ICs9IGRlbHRhLng7XG4gICAgICAgICAgICBwYXJ0LnBvc2l0aW9uLnkgKz0gZGVsdGEueTtcbiAgICAgICAgICAgIFZlcnRpY2VzLnRyYW5zbGF0ZShwYXJ0LnZlcnRpY2VzLCBkZWx0YSk7XG4gICAgICAgICAgICBCb3VuZHMudXBkYXRlKHBhcnQuYm91bmRzLCBwYXJ0LnZlcnRpY2VzLCBib2R5LnZlbG9jaXR5KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBhbmdsZSBvZiB0aGUgYm9keSBpbnN0YW50bHkuIEFuZ3VsYXIgdmVsb2NpdHksIHBvc2l0aW9uLCBmb3JjZSBldGMuIGFyZSB1bmNoYW5nZWQuXG4gICAgICogQG1ldGhvZCBzZXRBbmdsZVxuICAgICAqIEBwYXJhbSB7Ym9keX0gYm9keVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZVxuICAgICAqL1xuICAgIEJvZHkuc2V0QW5nbGUgPSBmdW5jdGlvbihib2R5LCBhbmdsZSkge1xuICAgICAgICB2YXIgZGVsdGEgPSBhbmdsZSAtIGJvZHkuYW5nbGU7XG4gICAgICAgIGJvZHkuYW5nbGVQcmV2ICs9IGRlbHRhO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm9keS5wYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHBhcnQgPSBib2R5LnBhcnRzW2ldO1xuICAgICAgICAgICAgcGFydC5hbmdsZSArPSBkZWx0YTtcbiAgICAgICAgICAgIFZlcnRpY2VzLnJvdGF0ZShwYXJ0LnZlcnRpY2VzLCBkZWx0YSwgYm9keS5wb3NpdGlvbik7XG4gICAgICAgICAgICBBeGVzLnJvdGF0ZShwYXJ0LmF4ZXMsIGRlbHRhKTtcbiAgICAgICAgICAgIEJvdW5kcy51cGRhdGUocGFydC5ib3VuZHMsIHBhcnQudmVydGljZXMsIGJvZHkudmVsb2NpdHkpO1xuICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgVmVjdG9yLnJvdGF0ZUFib3V0KHBhcnQucG9zaXRpb24sIGRlbHRhLCBib2R5LnBvc2l0aW9uLCBwYXJ0LnBvc2l0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBsaW5lYXIgdmVsb2NpdHkgb2YgdGhlIGJvZHkgaW5zdGFudGx5LiBQb3NpdGlvbiwgYW5nbGUsIGZvcmNlIGV0Yy4gYXJlIHVuY2hhbmdlZC4gU2VlIGFsc28gYEJvZHkuYXBwbHlGb3JjZWAuXG4gICAgICogQG1ldGhvZCBzZXRWZWxvY2l0eVxuICAgICAqIEBwYXJhbSB7Ym9keX0gYm9keVxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSB2ZWxvY2l0eVxuICAgICAqL1xuICAgIEJvZHkuc2V0VmVsb2NpdHkgPSBmdW5jdGlvbihib2R5LCB2ZWxvY2l0eSkge1xuICAgICAgICBib2R5LnBvc2l0aW9uUHJldi54ID0gYm9keS5wb3NpdGlvbi54IC0gdmVsb2NpdHkueDtcbiAgICAgICAgYm9keS5wb3NpdGlvblByZXYueSA9IGJvZHkucG9zaXRpb24ueSAtIHZlbG9jaXR5Lnk7XG4gICAgICAgIGJvZHkudmVsb2NpdHkueCA9IHZlbG9jaXR5Lng7XG4gICAgICAgIGJvZHkudmVsb2NpdHkueSA9IHZlbG9jaXR5Lnk7XG4gICAgICAgIGJvZHkuc3BlZWQgPSBWZWN0b3IubWFnbml0dWRlKGJvZHkudmVsb2NpdHkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBhbmd1bGFyIHZlbG9jaXR5IG9mIHRoZSBib2R5IGluc3RhbnRseS4gUG9zaXRpb24sIGFuZ2xlLCBmb3JjZSBldGMuIGFyZSB1bmNoYW5nZWQuIFNlZSBhbHNvIGBCb2R5LmFwcGx5Rm9yY2VgLlxuICAgICAqIEBtZXRob2Qgc2V0QW5ndWxhclZlbG9jaXR5XG4gICAgICogQHBhcmFtIHtib2R5fSBib2R5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZlbG9jaXR5XG4gICAgICovXG4gICAgQm9keS5zZXRBbmd1bGFyVmVsb2NpdHkgPSBmdW5jdGlvbihib2R5LCB2ZWxvY2l0eSkge1xuICAgICAgICBib2R5LmFuZ2xlUHJldiA9IGJvZHkuYW5nbGUgLSB2ZWxvY2l0eTtcbiAgICAgICAgYm9keS5hbmd1bGFyVmVsb2NpdHkgPSB2ZWxvY2l0eTtcbiAgICAgICAgYm9keS5hbmd1bGFyU3BlZWQgPSBNYXRoLmFicyhib2R5LmFuZ3VsYXJWZWxvY2l0eSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIE1vdmVzIGEgYm9keSBieSBhIGdpdmVuIHZlY3RvciByZWxhdGl2ZSB0byBpdHMgY3VycmVudCBwb3NpdGlvbiwgd2l0aG91dCBpbXBhcnRpbmcgYW55IHZlbG9jaXR5LlxuICAgICAqIEBtZXRob2QgdHJhbnNsYXRlXG4gICAgICogQHBhcmFtIHtib2R5fSBib2R5XG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHRyYW5zbGF0aW9uXG4gICAgICovXG4gICAgQm9keS50cmFuc2xhdGUgPSBmdW5jdGlvbihib2R5LCB0cmFuc2xhdGlvbikge1xuICAgICAgICBCb2R5LnNldFBvc2l0aW9uKGJvZHksIFZlY3Rvci5hZGQoYm9keS5wb3NpdGlvbiwgdHJhbnNsYXRpb24pKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUm90YXRlcyBhIGJvZHkgYnkgYSBnaXZlbiBhbmdsZSByZWxhdGl2ZSB0byBpdHMgY3VycmVudCBhbmdsZSwgd2l0aG91dCBpbXBhcnRpbmcgYW55IGFuZ3VsYXIgdmVsb2NpdHkuXG4gICAgICogQG1ldGhvZCByb3RhdGVcbiAgICAgKiBAcGFyYW0ge2JvZHl9IGJvZHlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcm90YXRpb25cbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gW3BvaW50XVxuICAgICAqL1xuICAgIEJvZHkucm90YXRlID0gZnVuY3Rpb24oYm9keSwgcm90YXRpb24sIHBvaW50KSB7XG4gICAgICAgIGlmICghcG9pbnQpIHtcbiAgICAgICAgICAgIEJvZHkuc2V0QW5nbGUoYm9keSwgYm9keS5hbmdsZSArIHJvdGF0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBjb3MgPSBNYXRoLmNvcyhyb3RhdGlvbiksXG4gICAgICAgICAgICAgICAgc2luID0gTWF0aC5zaW4ocm90YXRpb24pLFxuICAgICAgICAgICAgICAgIGR4ID0gYm9keS5wb3NpdGlvbi54IC0gcG9pbnQueCxcbiAgICAgICAgICAgICAgICBkeSA9IGJvZHkucG9zaXRpb24ueSAtIHBvaW50Lnk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBCb2R5LnNldFBvc2l0aW9uKGJvZHksIHtcbiAgICAgICAgICAgICAgICB4OiBwb2ludC54ICsgKGR4ICogY29zIC0gZHkgKiBzaW4pLFxuICAgICAgICAgICAgICAgIHk6IHBvaW50LnkgKyAoZHggKiBzaW4gKyBkeSAqIGNvcylcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBCb2R5LnNldEFuZ2xlKGJvZHksIGJvZHkuYW5nbGUgKyByb3RhdGlvbik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2NhbGVzIHRoZSBib2R5LCBpbmNsdWRpbmcgdXBkYXRpbmcgcGh5c2ljYWwgcHJvcGVydGllcyAobWFzcywgYXJlYSwgYXhlcywgaW5lcnRpYSksIGZyb20gYSB3b3JsZC1zcGFjZSBwb2ludCAoZGVmYXVsdCBpcyBib2R5IGNlbnRyZSkuXG4gICAgICogQG1ldGhvZCBzY2FsZVxuICAgICAqIEBwYXJhbSB7Ym9keX0gYm9keVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzY2FsZVhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2NhbGVZXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IFtwb2ludF1cbiAgICAgKi9cbiAgICBCb2R5LnNjYWxlID0gZnVuY3Rpb24oYm9keSwgc2NhbGVYLCBzY2FsZVksIHBvaW50KSB7XG4gICAgICAgIHZhciB0b3RhbEFyZWEgPSAwLFxuICAgICAgICAgICAgdG90YWxJbmVydGlhID0gMDtcblxuICAgICAgICBwb2ludCA9IHBvaW50IHx8IGJvZHkucG9zaXRpb247XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib2R5LnBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcGFydCA9IGJvZHkucGFydHNbaV07XG5cbiAgICAgICAgICAgIC8vIHNjYWxlIHZlcnRpY2VzXG4gICAgICAgICAgICBWZXJ0aWNlcy5zY2FsZShwYXJ0LnZlcnRpY2VzLCBzY2FsZVgsIHNjYWxlWSwgcG9pbnQpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgcHJvcGVydGllc1xuICAgICAgICAgICAgcGFydC5heGVzID0gQXhlcy5mcm9tVmVydGljZXMocGFydC52ZXJ0aWNlcyk7XG4gICAgICAgICAgICBwYXJ0LmFyZWEgPSBWZXJ0aWNlcy5hcmVhKHBhcnQudmVydGljZXMpO1xuICAgICAgICAgICAgQm9keS5zZXRNYXNzKHBhcnQsIGJvZHkuZGVuc2l0eSAqIHBhcnQuYXJlYSk7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBpbmVydGlhIChyZXF1aXJlcyB2ZXJ0aWNlcyB0byBiZSBhdCBvcmlnaW4pXG4gICAgICAgICAgICBWZXJ0aWNlcy50cmFuc2xhdGUocGFydC52ZXJ0aWNlcywgeyB4OiAtcGFydC5wb3NpdGlvbi54LCB5OiAtcGFydC5wb3NpdGlvbi55IH0pO1xuICAgICAgICAgICAgQm9keS5zZXRJbmVydGlhKHBhcnQsIEJvZHkuX2luZXJ0aWFTY2FsZSAqIFZlcnRpY2VzLmluZXJ0aWEocGFydC52ZXJ0aWNlcywgcGFydC5tYXNzKSk7XG4gICAgICAgICAgICBWZXJ0aWNlcy50cmFuc2xhdGUocGFydC52ZXJ0aWNlcywgeyB4OiBwYXJ0LnBvc2l0aW9uLngsIHk6IHBhcnQucG9zaXRpb24ueSB9KTtcblxuICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgdG90YWxBcmVhICs9IHBhcnQuYXJlYTtcbiAgICAgICAgICAgICAgICB0b3RhbEluZXJ0aWEgKz0gcGFydC5pbmVydGlhO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzY2FsZSBwb3NpdGlvblxuICAgICAgICAgICAgcGFydC5wb3NpdGlvbi54ID0gcG9pbnQueCArIChwYXJ0LnBvc2l0aW9uLnggLSBwb2ludC54KSAqIHNjYWxlWDtcbiAgICAgICAgICAgIHBhcnQucG9zaXRpb24ueSA9IHBvaW50LnkgKyAocGFydC5wb3NpdGlvbi55IC0gcG9pbnQueSkgKiBzY2FsZVk7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBib3VuZHNcbiAgICAgICAgICAgIEJvdW5kcy51cGRhdGUocGFydC5ib3VuZHMsIHBhcnQudmVydGljZXMsIGJvZHkudmVsb2NpdHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaGFuZGxlIHBhcmVudCBib2R5XG4gICAgICAgIGlmIChib2R5LnBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGJvZHkuYXJlYSA9IHRvdGFsQXJlYTtcblxuICAgICAgICAgICAgaWYgKCFib2R5LmlzU3RhdGljKSB7XG4gICAgICAgICAgICAgICAgQm9keS5zZXRNYXNzKGJvZHksIGJvZHkuZGVuc2l0eSAqIHRvdGFsQXJlYSk7XG4gICAgICAgICAgICAgICAgQm9keS5zZXRJbmVydGlhKGJvZHksIHRvdGFsSW5lcnRpYSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBoYW5kbGUgY2lyY2xlc1xuICAgICAgICBpZiAoYm9keS5jaXJjbGVSYWRpdXMpIHsgXG4gICAgICAgICAgICBpZiAoc2NhbGVYID09PSBzY2FsZVkpIHtcbiAgICAgICAgICAgICAgICBib2R5LmNpcmNsZVJhZGl1cyAqPSBzY2FsZVg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGJvZHkgaXMgbm8gbG9uZ2VyIGEgY2lyY2xlXG4gICAgICAgICAgICAgICAgYm9keS5jaXJjbGVSYWRpdXMgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGEgc2ltdWxhdGlvbiBzdGVwIGZvciB0aGUgZ2l2ZW4gYGJvZHlgLCBpbmNsdWRpbmcgdXBkYXRpbmcgcG9zaXRpb24gYW5kIGFuZ2xlIHVzaW5nIFZlcmxldCBpbnRlZ3JhdGlvbi5cbiAgICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgICAqIEBwYXJhbSB7Ym9keX0gYm9keVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWx0YVRpbWVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZVNjYWxlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNvcnJlY3Rpb25cbiAgICAgKi9cbiAgICBCb2R5LnVwZGF0ZSA9IGZ1bmN0aW9uKGJvZHksIGRlbHRhVGltZSwgdGltZVNjYWxlLCBjb3JyZWN0aW9uKSB7XG4gICAgICAgIHZhciBkZWx0YVRpbWVTcXVhcmVkID0gTWF0aC5wb3coZGVsdGFUaW1lICogdGltZVNjYWxlICogYm9keS50aW1lU2NhbGUsIDIpO1xuXG4gICAgICAgIC8vIGZyb20gdGhlIHByZXZpb3VzIHN0ZXBcbiAgICAgICAgdmFyIGZyaWN0aW9uQWlyID0gMSAtIGJvZHkuZnJpY3Rpb25BaXIgKiB0aW1lU2NhbGUgKiBib2R5LnRpbWVTY2FsZSxcbiAgICAgICAgICAgIHZlbG9jaXR5UHJldlggPSBib2R5LnBvc2l0aW9uLnggLSBib2R5LnBvc2l0aW9uUHJldi54LFxuICAgICAgICAgICAgdmVsb2NpdHlQcmV2WSA9IGJvZHkucG9zaXRpb24ueSAtIGJvZHkucG9zaXRpb25QcmV2Lnk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHZlbG9jaXR5IHdpdGggVmVybGV0IGludGVncmF0aW9uXG4gICAgICAgIGJvZHkudmVsb2NpdHkueCA9ICh2ZWxvY2l0eVByZXZYICogZnJpY3Rpb25BaXIgKiBjb3JyZWN0aW9uKSArIChib2R5LmZvcmNlLnggLyBib2R5Lm1hc3MpICogZGVsdGFUaW1lU3F1YXJlZDtcbiAgICAgICAgYm9keS52ZWxvY2l0eS55ID0gKHZlbG9jaXR5UHJldlkgKiBmcmljdGlvbkFpciAqIGNvcnJlY3Rpb24pICsgKGJvZHkuZm9yY2UueSAvIGJvZHkubWFzcykgKiBkZWx0YVRpbWVTcXVhcmVkO1xuXG4gICAgICAgIGJvZHkucG9zaXRpb25QcmV2LnggPSBib2R5LnBvc2l0aW9uLng7XG4gICAgICAgIGJvZHkucG9zaXRpb25QcmV2LnkgPSBib2R5LnBvc2l0aW9uLnk7XG4gICAgICAgIGJvZHkucG9zaXRpb24ueCArPSBib2R5LnZlbG9jaXR5Lng7XG4gICAgICAgIGJvZHkucG9zaXRpb24ueSArPSBib2R5LnZlbG9jaXR5Lnk7XG5cbiAgICAgICAgLy8gdXBkYXRlIGFuZ3VsYXIgdmVsb2NpdHkgd2l0aCBWZXJsZXQgaW50ZWdyYXRpb25cbiAgICAgICAgYm9keS5hbmd1bGFyVmVsb2NpdHkgPSAoKGJvZHkuYW5nbGUgLSBib2R5LmFuZ2xlUHJldikgKiBmcmljdGlvbkFpciAqIGNvcnJlY3Rpb24pICsgKGJvZHkudG9ycXVlIC8gYm9keS5pbmVydGlhKSAqIGRlbHRhVGltZVNxdWFyZWQ7XG4gICAgICAgIGJvZHkuYW5nbGVQcmV2ID0gYm9keS5hbmdsZTtcbiAgICAgICAgYm9keS5hbmdsZSArPSBib2R5LmFuZ3VsYXJWZWxvY2l0eTtcblxuICAgICAgICAvLyB0cmFjayBzcGVlZCBhbmQgYWNjZWxlcmF0aW9uXG4gICAgICAgIGJvZHkuc3BlZWQgPSBWZWN0b3IubWFnbml0dWRlKGJvZHkudmVsb2NpdHkpO1xuICAgICAgICBib2R5LmFuZ3VsYXJTcGVlZCA9IE1hdGguYWJzKGJvZHkuYW5ndWxhclZlbG9jaXR5KTtcblxuICAgICAgICAvLyB0cmFuc2Zvcm0gdGhlIGJvZHkgZ2VvbWV0cnlcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib2R5LnBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcGFydCA9IGJvZHkucGFydHNbaV07XG5cbiAgICAgICAgICAgIFZlcnRpY2VzLnRyYW5zbGF0ZShwYXJ0LnZlcnRpY2VzLCBib2R5LnZlbG9jaXR5KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgcGFydC5wb3NpdGlvbi54ICs9IGJvZHkudmVsb2NpdHkueDtcbiAgICAgICAgICAgICAgICBwYXJ0LnBvc2l0aW9uLnkgKz0gYm9keS52ZWxvY2l0eS55O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYm9keS5hbmd1bGFyVmVsb2NpdHkgIT09IDApIHtcbiAgICAgICAgICAgICAgICBWZXJ0aWNlcy5yb3RhdGUocGFydC52ZXJ0aWNlcywgYm9keS5hbmd1bGFyVmVsb2NpdHksIGJvZHkucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIEF4ZXMucm90YXRlKHBhcnQuYXhlcywgYm9keS5hbmd1bGFyVmVsb2NpdHkpO1xuICAgICAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBWZWN0b3Iucm90YXRlQWJvdXQocGFydC5wb3NpdGlvbiwgYm9keS5hbmd1bGFyVmVsb2NpdHksIGJvZHkucG9zaXRpb24sIHBhcnQucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgQm91bmRzLnVwZGF0ZShwYXJ0LmJvdW5kcywgcGFydC52ZXJ0aWNlcywgYm9keS52ZWxvY2l0eSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQXBwbGllcyBhIGZvcmNlIHRvIGEgYm9keSBmcm9tIGEgZ2l2ZW4gd29ybGQtc3BhY2UgcG9zaXRpb24sIGluY2x1ZGluZyByZXN1bHRpbmcgdG9ycXVlLlxuICAgICAqIEBtZXRob2QgYXBwbHlGb3JjZVxuICAgICAqIEBwYXJhbSB7Ym9keX0gYm9keVxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSBwb3NpdGlvblxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSBmb3JjZVxuICAgICAqL1xuICAgIEJvZHkuYXBwbHlGb3JjZSA9IGZ1bmN0aW9uKGJvZHksIHBvc2l0aW9uLCBmb3JjZSkge1xuICAgICAgICBib2R5LmZvcmNlLnggKz0gZm9yY2UueDtcbiAgICAgICAgYm9keS5mb3JjZS55ICs9IGZvcmNlLnk7XG4gICAgICAgIHZhciBvZmZzZXQgPSB7IHg6IHBvc2l0aW9uLnggLSBib2R5LnBvc2l0aW9uLngsIHk6IHBvc2l0aW9uLnkgLSBib2R5LnBvc2l0aW9uLnkgfTtcbiAgICAgICAgYm9keS50b3JxdWUgKz0gb2Zmc2V0LnggKiBmb3JjZS55IC0gb2Zmc2V0LnkgKiBmb3JjZS54O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBzdW1zIG9mIHRoZSBwcm9wZXJ0aWVzIG9mIGFsbCBjb21wb3VuZCBwYXJ0cyBvZiB0aGUgcGFyZW50IGJvZHkuXG4gICAgICogQG1ldGhvZCBfdG90YWxQcm9wZXJ0aWVzXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge2JvZHl9IGJvZHlcbiAgICAgKiBAcmV0dXJuIHt9XG4gICAgICovXG4gICAgQm9keS5fdG90YWxQcm9wZXJ0aWVzID0gZnVuY3Rpb24oYm9keSkge1xuICAgICAgICAvLyBmcm9tIGVxdWF0aW9ucyBhdDpcbiAgICAgICAgLy8gaHR0cHM6Ly9lY291cnNlcy5vdS5lZHUvY2dpLWJpbi9lYm9vay5jZ2k/ZG9jPSZ0b3BpYz1zdCZjaGFwX3NlYz0wNy4yJnBhZ2U9dGhlb3J5XG4gICAgICAgIC8vIGh0dHA6Ly9vdXRwdXQudG8vc2lkZXdheS9kZWZhdWx0LmFzcD9xbm89MTIxMTAwMDg3XG5cbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSB7XG4gICAgICAgICAgICBtYXNzOiAwLFxuICAgICAgICAgICAgYXJlYTogMCxcbiAgICAgICAgICAgIGluZXJ0aWE6IDAsXG4gICAgICAgICAgICBjZW50cmU6IHsgeDogMCwgeTogMCB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gc3VtIHRoZSBwcm9wZXJ0aWVzIG9mIGFsbCBjb21wb3VuZCBwYXJ0cyBvZiB0aGUgcGFyZW50IGJvZHlcbiAgICAgICAgZm9yICh2YXIgaSA9IGJvZHkucGFydHMubGVuZ3RoID09PSAxID8gMCA6IDE7IGkgPCBib2R5LnBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcGFydCA9IGJvZHkucGFydHNbaV0sXG4gICAgICAgICAgICAgICAgbWFzcyA9IHBhcnQubWFzcyAhPT0gSW5maW5pdHkgPyBwYXJ0Lm1hc3MgOiAxO1xuXG4gICAgICAgICAgICBwcm9wZXJ0aWVzLm1hc3MgKz0gbWFzcztcbiAgICAgICAgICAgIHByb3BlcnRpZXMuYXJlYSArPSBwYXJ0LmFyZWE7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLmluZXJ0aWEgKz0gcGFydC5pbmVydGlhO1xuICAgICAgICAgICAgcHJvcGVydGllcy5jZW50cmUgPSBWZWN0b3IuYWRkKHByb3BlcnRpZXMuY2VudHJlLCBWZWN0b3IubXVsdChwYXJ0LnBvc2l0aW9uLCBtYXNzKSk7XG4gICAgICAgIH1cblxuICAgICAgICBwcm9wZXJ0aWVzLmNlbnRyZSA9IFZlY3Rvci5kaXYocHJvcGVydGllcy5jZW50cmUsIHByb3BlcnRpZXMubWFzcyk7XG5cbiAgICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XG4gICAgfTtcblxuICAgIC8qXG4gICAgKlxuICAgICogIEV2ZW50cyBEb2N1bWVudGF0aW9uXG4gICAgKlxuICAgICovXG5cbiAgICAvKipcbiAgICAqIEZpcmVkIHdoZW4gYSBib2R5IHN0YXJ0cyBzbGVlcGluZyAod2hlcmUgYHRoaXNgIGlzIHRoZSBib2R5KS5cbiAgICAqXG4gICAgKiBAZXZlbnQgc2xlZXBTdGFydFxuICAgICogQHRoaXMge2JvZHl9IFRoZSBib2R5IHRoYXQgaGFzIHN0YXJ0ZWQgc2xlZXBpbmdcbiAgICAqIEBwYXJhbSB7fSBldmVudCBBbiBldmVudCBvYmplY3RcbiAgICAqIEBwYXJhbSB7fSBldmVudC5zb3VyY2UgVGhlIHNvdXJjZSBvYmplY3Qgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQubmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcbiAgICAqL1xuXG4gICAgLyoqXG4gICAgKiBGaXJlZCB3aGVuIGEgYm9keSBlbmRzIHNsZWVwaW5nICh3aGVyZSBgdGhpc2AgaXMgdGhlIGJvZHkpLlxuICAgICpcbiAgICAqIEBldmVudCBzbGVlcEVuZFxuICAgICogQHRoaXMge2JvZHl9IFRoZSBib2R5IHRoYXQgaGFzIGVuZGVkIHNsZWVwaW5nXG4gICAgKiBAcGFyYW0ge30gZXZlbnQgQW4gZXZlbnQgb2JqZWN0XG4gICAgKiBAcGFyYW0ge30gZXZlbnQuc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0IG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAgKi9cblxuICAgIC8qXG4gICAgKlxuICAgICogIFByb3BlcnRpZXMgRG9jdW1lbnRhdGlvblxuICAgICpcbiAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gaW50ZWdlciBgTnVtYmVyYCB1bmlxdWVseSBpZGVudGlmeWluZyBudW1iZXIgZ2VuZXJhdGVkIGluIGBCb2R5LmNyZWF0ZWAgYnkgYENvbW1vbi5uZXh0SWRgLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGlkXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBTdHJpbmdgIGRlbm90aW5nIHRoZSB0eXBlIG9mIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB0eXBlXG4gICAgICogQHR5cGUgc3RyaW5nXG4gICAgICogQGRlZmF1bHQgXCJib2R5XCJcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFuIGFyYml0cmFyeSBgU3RyaW5nYCBuYW1lIHRvIGhlbHAgdGhlIHVzZXIgaWRlbnRpZnkgYW5kIG1hbmFnZSBib2RpZXMuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgbGFiZWxcbiAgICAgKiBAdHlwZSBzdHJpbmdcbiAgICAgKiBAZGVmYXVsdCBcIkJvZHlcIlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2YgYm9kaWVzIHRoYXQgbWFrZSB1cCB0aGlzIGJvZHkuIFxuICAgICAqIFRoZSBmaXJzdCBib2R5IGluIHRoZSBhcnJheSBtdXN0IGFsd2F5cyBiZSBhIHNlbGYgcmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IGJvZHkgaW5zdGFuY2UuXG4gICAgICogQWxsIGJvZGllcyBpbiB0aGUgYHBhcnRzYCBhcnJheSB0b2dldGhlciBmb3JtIGEgc2luZ2xlIHJpZ2lkIGNvbXBvdW5kIGJvZHkuXG4gICAgICogUGFydHMgYXJlIGFsbG93ZWQgdG8gb3ZlcmxhcCwgaGF2ZSBnYXBzIG9yIGhvbGVzIG9yIGV2ZW4gZm9ybSBjb25jYXZlIGJvZGllcy5cbiAgICAgKiBQYXJ0cyB0aGVtc2VsdmVzIHNob3VsZCBuZXZlciBiZSBhZGRlZCB0byBhIGBXb3JsZGAsIG9ubHkgdGhlIHBhcmVudCBib2R5IHNob3VsZCBiZS5cbiAgICAgKiBVc2UgYEJvZHkuc2V0UGFydHNgIHdoZW4gc2V0dGluZyBwYXJ0cyB0byBlbnN1cmUgY29ycmVjdCB1cGRhdGVzIG9mIGFsbCBwcm9wZXJ0aWVzLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHBhcnRzXG4gICAgICogQHR5cGUgYm9keVtdXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBbiBvYmplY3QgcmVzZXJ2ZWQgZm9yIHN0b3JpbmcgcGx1Z2luLXNwZWNpZmljIHByb3BlcnRpZXMuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgcGx1Z2luXG4gICAgICogQHR5cGUge31cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgc2VsZiByZWZlcmVuY2UgaWYgdGhlIGJvZHkgaXMgX25vdF8gYSBwYXJ0IG9mIGFub3RoZXIgYm9keS5cbiAgICAgKiBPdGhlcndpc2UgdGhpcyBpcyBhIHJlZmVyZW5jZSB0byB0aGUgYm9keSB0aGF0IHRoaXMgaXMgYSBwYXJ0IG9mLlxuICAgICAqIFNlZSBgYm9keS5wYXJ0c2AuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgcGFyZW50XG4gICAgICogQHR5cGUgYm9keVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgTnVtYmVyYCBzcGVjaWZ5aW5nIHRoZSBhbmdsZSBvZiB0aGUgYm9keSwgaW4gcmFkaWFucy5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBhbmdsZVxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIGBWZWN0b3JgIG9iamVjdHMgdGhhdCBzcGVjaWZ5IHRoZSBjb252ZXggaHVsbCBvZiB0aGUgcmlnaWQgYm9keS5cbiAgICAgKiBUaGVzZSBzaG91bGQgYmUgcHJvdmlkZWQgYWJvdXQgdGhlIG9yaWdpbiBgKDAsIDApYC4gRS5nLlxuICAgICAqXG4gICAgICogICAgIFt7IHg6IDAsIHk6IDAgfSwgeyB4OiAyNSwgeTogNTAgfSwgeyB4OiA1MCwgeTogMCB9XVxuICAgICAqXG4gICAgICogV2hlbiBwYXNzZWQgdmlhIGBCb2R5LmNyZWF0ZWAsIHRoZSB2ZXJ0aWNlcyBhcmUgdHJhbnNsYXRlZCByZWxhdGl2ZSB0byBgYm9keS5wb3NpdGlvbmAgKGkuZS4gd29ybGQtc3BhY2UsIGFuZCBjb25zdGFudGx5IHVwZGF0ZWQgYnkgYEJvZHkudXBkYXRlYCBkdXJpbmcgc2ltdWxhdGlvbikuXG4gICAgICogVGhlIGBWZWN0b3JgIG9iamVjdHMgYXJlIGFsc28gYXVnbWVudGVkIHdpdGggYWRkaXRpb25hbCBwcm9wZXJ0aWVzIHJlcXVpcmVkIGZvciBlZmZpY2llbnQgY29sbGlzaW9uIGRldGVjdGlvbi4gXG4gICAgICpcbiAgICAgKiBPdGhlciBwcm9wZXJ0aWVzIHN1Y2ggYXMgYGluZXJ0aWFgIGFuZCBgYm91bmRzYCBhcmUgYXV0b21hdGljYWxseSBjYWxjdWxhdGVkIGZyb20gdGhlIHBhc3NlZCB2ZXJ0aWNlcyAodW5sZXNzIHByb3ZpZGVkIHZpYSBgb3B0aW9uc2ApLlxuICAgICAqIENvbmNhdmUgaHVsbHMgYXJlIG5vdCBjdXJyZW50bHkgc3VwcG9ydGVkLiBUaGUgbW9kdWxlIGBNYXR0ZXIuVmVydGljZXNgIGNvbnRhaW5zIHVzZWZ1bCBtZXRob2RzIGZvciB3b3JraW5nIHdpdGggdmVydGljZXMuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgdmVydGljZXNcbiAgICAgKiBAdHlwZSB2ZWN0b3JbXVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgVmVjdG9yYCB0aGF0IHNwZWNpZmllcyB0aGUgY3VycmVudCB3b3JsZC1zcGFjZSBwb3NpdGlvbiBvZiB0aGUgYm9keS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBwb3NpdGlvblxuICAgICAqIEB0eXBlIHZlY3RvclxuICAgICAqIEBkZWZhdWx0IHsgeDogMCwgeTogMCB9XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBWZWN0b3JgIHRoYXQgc3BlY2lmaWVzIHRoZSBmb3JjZSB0byBhcHBseSBpbiB0aGUgY3VycmVudCBzdGVwLiBJdCBpcyB6ZXJvZWQgYWZ0ZXIgZXZlcnkgYEJvZHkudXBkYXRlYC4gU2VlIGFsc28gYEJvZHkuYXBwbHlGb3JjZWAuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgZm9yY2VcbiAgICAgKiBAdHlwZSB2ZWN0b3JcbiAgICAgKiBAZGVmYXVsdCB7IHg6IDAsIHk6IDAgfVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgTnVtYmVyYCB0aGF0IHNwZWNpZmllcyB0aGUgdG9ycXVlICh0dXJuaW5nIGZvcmNlKSB0byBhcHBseSBpbiB0aGUgY3VycmVudCBzdGVwLiBJdCBpcyB6ZXJvZWQgYWZ0ZXIgZXZlcnkgYEJvZHkudXBkYXRlYC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB0b3JxdWVcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBOdW1iZXJgIHRoYXQgX21lYXN1cmVzXyB0aGUgY3VycmVudCBzcGVlZCBvZiB0aGUgYm9keSBhZnRlciB0aGUgbGFzdCBgQm9keS51cGRhdGVgLiBJdCBpcyByZWFkLW9ubHkgYW5kIGFsd2F5cyBwb3NpdGl2ZSAoaXQncyB0aGUgbWFnbml0dWRlIG9mIGBib2R5LnZlbG9jaXR5YCkuXG4gICAgICpcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAcHJvcGVydHkgc3BlZWRcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBOdW1iZXJgIHRoYXQgX21lYXN1cmVzXyB0aGUgY3VycmVudCBhbmd1bGFyIHNwZWVkIG9mIHRoZSBib2R5IGFmdGVyIHRoZSBsYXN0IGBCb2R5LnVwZGF0ZWAuIEl0IGlzIHJlYWQtb25seSBhbmQgYWx3YXlzIHBvc2l0aXZlIChpdCdzIHRoZSBtYWduaXR1ZGUgb2YgYGJvZHkuYW5ndWxhclZlbG9jaXR5YCkuXG4gICAgICpcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAcHJvcGVydHkgYW5ndWxhclNwZWVkXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgVmVjdG9yYCB0aGF0IF9tZWFzdXJlc18gdGhlIGN1cnJlbnQgdmVsb2NpdHkgb2YgdGhlIGJvZHkgYWZ0ZXIgdGhlIGxhc3QgYEJvZHkudXBkYXRlYC4gSXQgaXMgcmVhZC1vbmx5LiBcbiAgICAgKiBJZiB5b3UgbmVlZCB0byBtb2RpZnkgYSBib2R5J3MgdmVsb2NpdHkgZGlyZWN0bHksIHlvdSBzaG91bGQgZWl0aGVyIGFwcGx5IGEgZm9yY2Ugb3Igc2ltcGx5IGNoYW5nZSB0aGUgYm9keSdzIGBwb3NpdGlvbmAgKGFzIHRoZSBlbmdpbmUgdXNlcyBwb3NpdGlvbi1WZXJsZXQgaW50ZWdyYXRpb24pLlxuICAgICAqXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQHByb3BlcnR5IHZlbG9jaXR5XG4gICAgICogQHR5cGUgdmVjdG9yXG4gICAgICogQGRlZmF1bHQgeyB4OiAwLCB5OiAwIH1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYE51bWJlcmAgdGhhdCBfbWVhc3VyZXNfIHRoZSBjdXJyZW50IGFuZ3VsYXIgdmVsb2NpdHkgb2YgdGhlIGJvZHkgYWZ0ZXIgdGhlIGxhc3QgYEJvZHkudXBkYXRlYC4gSXQgaXMgcmVhZC1vbmx5LiBcbiAgICAgKiBJZiB5b3UgbmVlZCB0byBtb2RpZnkgYSBib2R5J3MgYW5ndWxhciB2ZWxvY2l0eSBkaXJlY3RseSwgeW91IHNob3VsZCBhcHBseSBhIHRvcnF1ZSBvciBzaW1wbHkgY2hhbmdlIHRoZSBib2R5J3MgYGFuZ2xlYCAoYXMgdGhlIGVuZ2luZSB1c2VzIHBvc2l0aW9uLVZlcmxldCBpbnRlZ3JhdGlvbikuXG4gICAgICpcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAcHJvcGVydHkgYW5ndWxhclZlbG9jaXR5XG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBmbGFnIHRoYXQgaW5kaWNhdGVzIHdoZXRoZXIgYSBib2R5IGlzIGNvbnNpZGVyZWQgc3RhdGljLiBBIHN0YXRpYyBib2R5IGNhbiBuZXZlciBjaGFuZ2UgcG9zaXRpb24gb3IgYW5nbGUgYW5kIGlzIGNvbXBsZXRlbHkgZml4ZWQuXG4gICAgICogSWYgeW91IG5lZWQgdG8gc2V0IGEgYm9keSBhcyBzdGF0aWMgYWZ0ZXIgaXRzIGNyZWF0aW9uLCB5b3Ugc2hvdWxkIHVzZSBgQm9keS5zZXRTdGF0aWNgIGFzIHRoaXMgcmVxdWlyZXMgbW9yZSB0aGFuIGp1c3Qgc2V0dGluZyB0aGlzIGZsYWcuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgaXNTdGF0aWNcbiAgICAgKiBAdHlwZSBib29sZWFuXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgZmxhZyB0aGF0IGluZGljYXRlcyB3aGV0aGVyIGEgYm9keSBpcyBhIHNlbnNvci4gU2Vuc29yIHRyaWdnZXJzIGNvbGxpc2lvbiBldmVudHMsIGJ1dCBkb2Vzbid0IHJlYWN0IHdpdGggY29sbGlkaW5nIGJvZHkgcGh5c2ljYWxseS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBpc1NlbnNvclxuICAgICAqIEB0eXBlIGJvb2xlYW5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBmbGFnIHRoYXQgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIGJvZHkgaXMgY29uc2lkZXJlZCBzbGVlcGluZy4gQSBzbGVlcGluZyBib2R5IGFjdHMgc2ltaWxhciB0byBhIHN0YXRpYyBib2R5LCBleGNlcHQgaXQgaXMgb25seSB0ZW1wb3JhcnkgYW5kIGNhbiBiZSBhd29rZW4uXG4gICAgICogSWYgeW91IG5lZWQgdG8gc2V0IGEgYm9keSBhcyBzbGVlcGluZywgeW91IHNob3VsZCB1c2UgYFNsZWVwaW5nLnNldGAgYXMgdGhpcyByZXF1aXJlcyBtb3JlIHRoYW4ganVzdCBzZXR0aW5nIHRoaXMgZmxhZy5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBpc1NsZWVwaW5nXG4gICAgICogQHR5cGUgYm9vbGVhblxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBOdW1iZXJgIHRoYXQgX21lYXN1cmVzXyB0aGUgYW1vdW50IG9mIG1vdmVtZW50IGEgYm9keSBjdXJyZW50bHkgaGFzIChhIGNvbWJpbmF0aW9uIG9mIGBzcGVlZGAgYW5kIGBhbmd1bGFyU3BlZWRgKS4gSXQgaXMgcmVhZC1vbmx5IGFuZCBhbHdheXMgcG9zaXRpdmUuXG4gICAgICogSXQgaXMgdXNlZCBhbmQgdXBkYXRlZCBieSB0aGUgYE1hdHRlci5TbGVlcGluZ2AgbW9kdWxlIGR1cmluZyBzaW11bGF0aW9uIHRvIGRlY2lkZSBpZiBhIGJvZHkgaGFzIGNvbWUgdG8gcmVzdC5cbiAgICAgKlxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBwcm9wZXJ0eSBtb3Rpb25cbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBOdW1iZXJgIHRoYXQgZGVmaW5lcyB0aGUgbnVtYmVyIG9mIHVwZGF0ZXMgaW4gd2hpY2ggdGhpcyBib2R5IG11c3QgaGF2ZSBuZWFyLXplcm8gdmVsb2NpdHkgYmVmb3JlIGl0IGlzIHNldCBhcyBzbGVlcGluZyBieSB0aGUgYE1hdHRlci5TbGVlcGluZ2AgbW9kdWxlIChpZiBzbGVlcGluZyBpcyBlbmFibGVkIGJ5IHRoZSBlbmdpbmUpLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHNsZWVwVGhyZXNob2xkXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICogQGRlZmF1bHQgNjBcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYE51bWJlcmAgdGhhdCBkZWZpbmVzIHRoZSBkZW5zaXR5IG9mIHRoZSBib2R5LCB0aGF0IGlzIGl0cyBtYXNzIHBlciB1bml0IGFyZWEuXG4gICAgICogSWYgeW91IHBhc3MgdGhlIGRlbnNpdHkgdmlhIGBCb2R5LmNyZWF0ZWAgdGhlIGBtYXNzYCBwcm9wZXJ0eSBpcyBhdXRvbWF0aWNhbGx5IGNhbGN1bGF0ZWQgZm9yIHlvdSBiYXNlZCBvbiB0aGUgc2l6ZSAoYXJlYSkgb2YgdGhlIG9iamVjdC5cbiAgICAgKiBUaGlzIGlzIGdlbmVyYWxseSBwcmVmZXJhYmxlIHRvIHNpbXBseSBzZXR0aW5nIG1hc3MgYW5kIGFsbG93cyBmb3IgbW9yZSBpbnR1aXRpdmUgZGVmaW5pdGlvbiBvZiBtYXRlcmlhbHMgKGUuZy4gcm9jayBoYXMgYSBoaWdoZXIgZGVuc2l0eSB0aGFuIHdvb2QpLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGRlbnNpdHlcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKiBAZGVmYXVsdCAwLjAwMVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgTnVtYmVyYCB0aGF0IGRlZmluZXMgdGhlIG1hc3Mgb2YgdGhlIGJvZHksIGFsdGhvdWdoIGl0IG1heSBiZSBtb3JlIGFwcHJvcHJpYXRlIHRvIHNwZWNpZnkgdGhlIGBkZW5zaXR5YCBwcm9wZXJ0eSBpbnN0ZWFkLlxuICAgICAqIElmIHlvdSBtb2RpZnkgdGhpcyB2YWx1ZSwgeW91IG11c3QgYWxzbyBtb2RpZnkgdGhlIGBib2R5LmludmVyc2VNYXNzYCBwcm9wZXJ0eSAoYDEgLyBtYXNzYCkuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgbWFzc1xuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgTnVtYmVyYCB0aGF0IGRlZmluZXMgdGhlIGludmVyc2UgbWFzcyBvZiB0aGUgYm9keSAoYDEgLyBtYXNzYCkuXG4gICAgICogSWYgeW91IG1vZGlmeSB0aGlzIHZhbHVlLCB5b3UgbXVzdCBhbHNvIG1vZGlmeSB0aGUgYGJvZHkubWFzc2AgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgaW52ZXJzZU1hc3NcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYE51bWJlcmAgdGhhdCBkZWZpbmVzIHRoZSBtb21lbnQgb2YgaW5lcnRpYSAoaS5lLiBzZWNvbmQgbW9tZW50IG9mIGFyZWEpIG9mIHRoZSBib2R5LlxuICAgICAqIEl0IGlzIGF1dG9tYXRpY2FsbHkgY2FsY3VsYXRlZCBmcm9tIHRoZSBnaXZlbiBjb252ZXggaHVsbCAoYHZlcnRpY2VzYCBhcnJheSkgYW5kIGRlbnNpdHkgaW4gYEJvZHkuY3JlYXRlYC5cbiAgICAgKiBJZiB5b3UgbW9kaWZ5IHRoaXMgdmFsdWUsIHlvdSBtdXN0IGFsc28gbW9kaWZ5IHRoZSBgYm9keS5pbnZlcnNlSW5lcnRpYWAgcHJvcGVydHkgKGAxIC8gaW5lcnRpYWApLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGluZXJ0aWFcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYE51bWJlcmAgdGhhdCBkZWZpbmVzIHRoZSBpbnZlcnNlIG1vbWVudCBvZiBpbmVydGlhIG9mIHRoZSBib2R5IChgMSAvIGluZXJ0aWFgKS5cbiAgICAgKiBJZiB5b3UgbW9kaWZ5IHRoaXMgdmFsdWUsIHlvdSBtdXN0IGFsc28gbW9kaWZ5IHRoZSBgYm9keS5pbmVydGlhYCBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBpbnZlcnNlSW5lcnRpYVxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgTnVtYmVyYCB0aGF0IGRlZmluZXMgdGhlIHJlc3RpdHV0aW9uIChlbGFzdGljaXR5KSBvZiB0aGUgYm9keS4gVGhlIHZhbHVlIGlzIGFsd2F5cyBwb3NpdGl2ZSBhbmQgaXMgaW4gdGhlIHJhbmdlIGAoMCwgMSlgLlxuICAgICAqIEEgdmFsdWUgb2YgYDBgIG1lYW5zIGNvbGxpc2lvbnMgbWF5IGJlIHBlcmZlY3RseSBpbmVsYXN0aWMgYW5kIG5vIGJvdW5jaW5nIG1heSBvY2N1ci4gXG4gICAgICogQSB2YWx1ZSBvZiBgMC44YCBtZWFucyB0aGUgYm9keSBtYXkgYm91bmNlIGJhY2sgd2l0aCBhcHByb3hpbWF0ZWx5IDgwJSBvZiBpdHMga2luZXRpYyBlbmVyZ3kuXG4gICAgICogTm90ZSB0aGF0IGNvbGxpc2lvbiByZXNwb25zZSBpcyBiYXNlZCBvbiBfcGFpcnNfIG9mIGJvZGllcywgYW5kIHRoYXQgYHJlc3RpdHV0aW9uYCB2YWx1ZXMgYXJlIF9jb21iaW5lZF8gd2l0aCB0aGUgZm9sbG93aW5nIGZvcm11bGE6XG4gICAgICpcbiAgICAgKiAgICAgTWF0aC5tYXgoYm9keUEucmVzdGl0dXRpb24sIGJvZHlCLnJlc3RpdHV0aW9uKVxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHJlc3RpdHV0aW9uXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgTnVtYmVyYCB0aGF0IGRlZmluZXMgdGhlIGZyaWN0aW9uIG9mIHRoZSBib2R5LiBUaGUgdmFsdWUgaXMgYWx3YXlzIHBvc2l0aXZlIGFuZCBpcyBpbiB0aGUgcmFuZ2UgYCgwLCAxKWAuXG4gICAgICogQSB2YWx1ZSBvZiBgMGAgbWVhbnMgdGhhdCB0aGUgYm9keSBtYXkgc2xpZGUgaW5kZWZpbml0ZWx5LlxuICAgICAqIEEgdmFsdWUgb2YgYDFgIG1lYW5zIHRoZSBib2R5IG1heSBjb21lIHRvIGEgc3RvcCBhbG1vc3QgaW5zdGFudGx5IGFmdGVyIGEgZm9yY2UgaXMgYXBwbGllZC5cbiAgICAgKlxuICAgICAqIFRoZSBlZmZlY3RzIG9mIHRoZSB2YWx1ZSBtYXkgYmUgbm9uLWxpbmVhci4gXG4gICAgICogSGlnaCB2YWx1ZXMgbWF5IGJlIHVuc3RhYmxlIGRlcGVuZGluZyBvbiB0aGUgYm9keS5cbiAgICAgKiBUaGUgZW5naW5lIHVzZXMgYSBDb3Vsb21iIGZyaWN0aW9uIG1vZGVsIGluY2x1ZGluZyBzdGF0aWMgYW5kIGtpbmV0aWMgZnJpY3Rpb24uXG4gICAgICogTm90ZSB0aGF0IGNvbGxpc2lvbiByZXNwb25zZSBpcyBiYXNlZCBvbiBfcGFpcnNfIG9mIGJvZGllcywgYW5kIHRoYXQgYGZyaWN0aW9uYCB2YWx1ZXMgYXJlIF9jb21iaW5lZF8gd2l0aCB0aGUgZm9sbG93aW5nIGZvcm11bGE6XG4gICAgICpcbiAgICAgKiAgICAgTWF0aC5taW4oYm9keUEuZnJpY3Rpb24sIGJvZHlCLmZyaWN0aW9uKVxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGZyaWN0aW9uXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICogQGRlZmF1bHQgMC4xXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBOdW1iZXJgIHRoYXQgZGVmaW5lcyB0aGUgc3RhdGljIGZyaWN0aW9uIG9mIHRoZSBib2R5IChpbiB0aGUgQ291bG9tYiBmcmljdGlvbiBtb2RlbCkuIFxuICAgICAqIEEgdmFsdWUgb2YgYDBgIG1lYW5zIHRoZSBib2R5IHdpbGwgbmV2ZXIgJ3N0aWNrJyB3aGVuIGl0IGlzIG5lYXJseSBzdGF0aW9uYXJ5IGFuZCBvbmx5IGR5bmFtaWMgYGZyaWN0aW9uYCBpcyB1c2VkLlxuICAgICAqIFRoZSBoaWdoZXIgdGhlIHZhbHVlIChlLmcuIGAxMGApLCB0aGUgbW9yZSBmb3JjZSBpdCB3aWxsIHRha2UgdG8gaW5pdGlhbGx5IGdldCB0aGUgYm9keSBtb3Zpbmcgd2hlbiBuZWFybHkgc3RhdGlvbmFyeS5cbiAgICAgKiBUaGlzIHZhbHVlIGlzIG11bHRpcGxpZWQgd2l0aCB0aGUgYGZyaWN0aW9uYCBwcm9wZXJ0eSB0byBtYWtlIGl0IGVhc2llciB0byBjaGFuZ2UgYGZyaWN0aW9uYCBhbmQgbWFpbnRhaW4gYW4gYXBwcm9wcmlhdGUgYW1vdW50IG9mIHN0YXRpYyBmcmljdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBmcmljdGlvblN0YXRpY1xuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDAuNVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgTnVtYmVyYCB0aGF0IGRlZmluZXMgdGhlIGFpciBmcmljdGlvbiBvZiB0aGUgYm9keSAoYWlyIHJlc2lzdGFuY2UpLiBcbiAgICAgKiBBIHZhbHVlIG9mIGAwYCBtZWFucyB0aGUgYm9keSB3aWxsIG5ldmVyIHNsb3cgYXMgaXQgbW92ZXMgdGhyb3VnaCBzcGFjZS5cbiAgICAgKiBUaGUgaGlnaGVyIHRoZSB2YWx1ZSwgdGhlIGZhc3RlciBhIGJvZHkgc2xvd3Mgd2hlbiBtb3ZpbmcgdGhyb3VnaCBzcGFjZS5cbiAgICAgKiBUaGUgZWZmZWN0cyBvZiB0aGUgdmFsdWUgYXJlIG5vbi1saW5lYXIuIFxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGZyaWN0aW9uQWlyXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICogQGRlZmF1bHQgMC4wMVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gYE9iamVjdGAgdGhhdCBzcGVjaWZpZXMgdGhlIGNvbGxpc2lvbiBmaWx0ZXJpbmcgcHJvcGVydGllcyBvZiB0aGlzIGJvZHkuXG4gICAgICpcbiAgICAgKiBDb2xsaXNpb25zIGJldHdlZW4gdHdvIGJvZGllcyB3aWxsIG9iZXkgdGhlIGZvbGxvd2luZyBydWxlczpcbiAgICAgKiAtIElmIHRoZSB0d28gYm9kaWVzIGhhdmUgdGhlIHNhbWUgbm9uLXplcm8gdmFsdWUgb2YgYGNvbGxpc2lvbkZpbHRlci5ncm91cGAsXG4gICAgICogICB0aGV5IHdpbGwgYWx3YXlzIGNvbGxpZGUgaWYgdGhlIHZhbHVlIGlzIHBvc2l0aXZlLCBhbmQgdGhleSB3aWxsIG5ldmVyIGNvbGxpZGVcbiAgICAgKiAgIGlmIHRoZSB2YWx1ZSBpcyBuZWdhdGl2ZS5cbiAgICAgKiAtIElmIHRoZSB0d28gYm9kaWVzIGhhdmUgZGlmZmVyZW50IHZhbHVlcyBvZiBgY29sbGlzaW9uRmlsdGVyLmdyb3VwYCBvciBpZiBvbmVcbiAgICAgKiAgIChvciBib3RoKSBvZiB0aGUgYm9kaWVzIGhhcyBhIHZhbHVlIG9mIDAsIHRoZW4gdGhlIGNhdGVnb3J5L21hc2sgcnVsZXMgYXBwbHkgYXMgZm9sbG93czpcbiAgICAgKlxuICAgICAqIEVhY2ggYm9keSBiZWxvbmdzIHRvIGEgY29sbGlzaW9uIGNhdGVnb3J5LCBnaXZlbiBieSBgY29sbGlzaW9uRmlsdGVyLmNhdGVnb3J5YC4gVGhpc1xuICAgICAqIHZhbHVlIGlzIHVzZWQgYXMgYSBiaXQgZmllbGQgYW5kIHRoZSBjYXRlZ29yeSBzaG91bGQgaGF2ZSBvbmx5IG9uZSBiaXQgc2V0LCBtZWFuaW5nIHRoYXRcbiAgICAgKiB0aGUgdmFsdWUgb2YgdGhpcyBwcm9wZXJ0eSBpcyBhIHBvd2VyIG9mIHR3byBpbiB0aGUgcmFuZ2UgWzEsIDJeMzFdLiBUaHVzLCB0aGVyZSBhcmUgMzJcbiAgICAgKiBkaWZmZXJlbnQgY29sbGlzaW9uIGNhdGVnb3JpZXMgYXZhaWxhYmxlLlxuICAgICAqXG4gICAgICogRWFjaCBib2R5IGFsc28gZGVmaW5lcyBhIGNvbGxpc2lvbiBiaXRtYXNrLCBnaXZlbiBieSBgY29sbGlzaW9uRmlsdGVyLm1hc2tgIHdoaWNoIHNwZWNpZmllc1xuICAgICAqIHRoZSBjYXRlZ29yaWVzIGl0IGNvbGxpZGVzIHdpdGggKHRoZSB2YWx1ZSBpcyB0aGUgYml0d2lzZSBBTkQgdmFsdWUgb2YgYWxsIHRoZXNlIGNhdGVnb3JpZXMpLlxuICAgICAqXG4gICAgICogVXNpbmcgdGhlIGNhdGVnb3J5L21hc2sgcnVsZXMsIHR3byBib2RpZXMgYEFgIGFuZCBgQmAgY29sbGlkZSBpZiBlYWNoIGluY2x1ZGVzIHRoZSBvdGhlcidzXG4gICAgICogY2F0ZWdvcnkgaW4gaXRzIG1hc2ssIGkuZS4gYChjYXRlZ29yeUEgJiBtYXNrQikgIT09IDBgIGFuZCBgKGNhdGVnb3J5QiAmIG1hc2tBKSAhPT0gMGBcbiAgICAgKiBhcmUgYm90aCB0cnVlLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGNvbGxpc2lvbkZpbHRlclxuICAgICAqIEB0eXBlIG9iamVjdFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gSW50ZWdlciBgTnVtYmVyYCwgdGhhdCBzcGVjaWZpZXMgdGhlIGNvbGxpc2lvbiBncm91cCB0aGlzIGJvZHkgYmVsb25ncyB0by5cbiAgICAgKiBTZWUgYGJvZHkuY29sbGlzaW9uRmlsdGVyYCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBjb2xsaXNpb25GaWx0ZXIuZ3JvdXBcbiAgICAgKiBAdHlwZSBvYmplY3RcbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGJpdCBmaWVsZCB0aGF0IHNwZWNpZmllcyB0aGUgY29sbGlzaW9uIGNhdGVnb3J5IHRoaXMgYm9keSBiZWxvbmdzIHRvLlxuICAgICAqIFRoZSBjYXRlZ29yeSB2YWx1ZSBzaG91bGQgaGF2ZSBvbmx5IG9uZSBiaXQgc2V0LCBmb3IgZXhhbXBsZSBgMHgwMDAxYC5cbiAgICAgKiBUaGlzIG1lYW5zIHRoZXJlIGFyZSB1cCB0byAzMiB1bmlxdWUgY29sbGlzaW9uIGNhdGVnb3JpZXMgYXZhaWxhYmxlLlxuICAgICAqIFNlZSBgYm9keS5jb2xsaXNpb25GaWx0ZXJgIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGNvbGxpc2lvbkZpbHRlci5jYXRlZ29yeVxuICAgICAqIEB0eXBlIG9iamVjdFxuICAgICAqIEBkZWZhdWx0IDFcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYml0IG1hc2sgdGhhdCBzcGVjaWZpZXMgdGhlIGNvbGxpc2lvbiBjYXRlZ29yaWVzIHRoaXMgYm9keSBtYXkgY29sbGlkZSB3aXRoLlxuICAgICAqIFNlZSBgYm9keS5jb2xsaXNpb25GaWx0ZXJgIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGNvbGxpc2lvbkZpbHRlci5tYXNrXG4gICAgICogQHR5cGUgb2JqZWN0XG4gICAgICogQGRlZmF1bHQgLTFcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYE51bWJlcmAgdGhhdCBzcGVjaWZpZXMgYSB0b2xlcmFuY2Ugb24gaG93IGZhciBhIGJvZHkgaXMgYWxsb3dlZCB0byAnc2luaycgb3Igcm90YXRlIGludG8gb3RoZXIgYm9kaWVzLlxuICAgICAqIEF2b2lkIGNoYW5naW5nIHRoaXMgdmFsdWUgdW5sZXNzIHlvdSB1bmRlcnN0YW5kIHRoZSBwdXJwb3NlIG9mIGBzbG9wYCBpbiBwaHlzaWNzIGVuZ2luZXMuXG4gICAgICogVGhlIGRlZmF1bHQgc2hvdWxkIGdlbmVyYWxseSBzdWZmaWNlLCBhbHRob3VnaCB2ZXJ5IGxhcmdlIGJvZGllcyBtYXkgcmVxdWlyZSBsYXJnZXIgdmFsdWVzIGZvciBzdGFibGUgc3RhY2tpbmcuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgc2xvcFxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDAuMDVcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYE51bWJlcmAgdGhhdCBhbGxvd3MgcGVyLWJvZHkgdGltZSBzY2FsaW5nLCBlLmcuIGEgZm9yY2UtZmllbGQgd2hlcmUgYm9kaWVzIGluc2lkZSBhcmUgaW4gc2xvdy1tb3Rpb24sIHdoaWxlIG90aGVycyBhcmUgYXQgZnVsbCBzcGVlZC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB0aW1lU2NhbGVcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKiBAZGVmYXVsdCAxXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBbiBgT2JqZWN0YCB0aGF0IGRlZmluZXMgdGhlIHJlbmRlcmluZyBwcm9wZXJ0aWVzIHRvIGJlIGNvbnN1bWVkIGJ5IHRoZSBtb2R1bGUgYE1hdHRlci5SZW5kZXJgLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHJlbmRlclxuICAgICAqIEB0eXBlIG9iamVjdFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBmbGFnIHRoYXQgaW5kaWNhdGVzIGlmIHRoZSBib2R5IHNob3VsZCBiZSByZW5kZXJlZC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSByZW5kZXIudmlzaWJsZVxuICAgICAqIEB0eXBlIGJvb2xlYW5cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBvcGFjaXR5IHRvIHVzZSB3aGVuIHJlbmRlcmluZy5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSByZW5kZXIub3BhY2l0eVxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDFcbiAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gYE9iamVjdGAgdGhhdCBkZWZpbmVzIHRoZSBzcHJpdGUgcHJvcGVydGllcyB0byB1c2Ugd2hlbiByZW5kZXJpbmcsIGlmIGFueS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSByZW5kZXIuc3ByaXRlXG4gICAgICogQHR5cGUgb2JqZWN0XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBbiBgU3RyaW5nYCB0aGF0IGRlZmluZXMgdGhlIHBhdGggdG8gdGhlIGltYWdlIHRvIHVzZSBhcyB0aGUgc3ByaXRlIHRleHR1cmUsIGlmIGFueS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSByZW5kZXIuc3ByaXRlLnRleHR1cmVcbiAgICAgKiBAdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICAgXG4gICAgLyoqXG4gICAgICogQSBgTnVtYmVyYCB0aGF0IGRlZmluZXMgdGhlIHNjYWxpbmcgaW4gdGhlIHgtYXhpcyBmb3IgdGhlIHNwcml0ZSwgaWYgYW55LlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHJlbmRlci5zcHJpdGUueFNjYWxlXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICogQGRlZmF1bHQgMVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgTnVtYmVyYCB0aGF0IGRlZmluZXMgdGhlIHNjYWxpbmcgaW4gdGhlIHktYXhpcyBmb3IgdGhlIHNwcml0ZSwgaWYgYW55LlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHJlbmRlci5zcHJpdGUueVNjYWxlXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICogQGRlZmF1bHQgMVxuICAgICAqL1xuXG4gICAgIC8qKlxuICAgICAgKiBBIGBOdW1iZXJgIHRoYXQgZGVmaW5lcyB0aGUgb2Zmc2V0IGluIHRoZSB4LWF4aXMgZm9yIHRoZSBzcHJpdGUgKG5vcm1hbGlzZWQgYnkgdGV4dHVyZSB3aWR0aCkuXG4gICAgICAqXG4gICAgICAqIEBwcm9wZXJ0eSByZW5kZXIuc3ByaXRlLnhPZmZzZXRcbiAgICAgICogQHR5cGUgbnVtYmVyXG4gICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICovXG5cbiAgICAgLyoqXG4gICAgICAqIEEgYE51bWJlcmAgdGhhdCBkZWZpbmVzIHRoZSBvZmZzZXQgaW4gdGhlIHktYXhpcyBmb3IgdGhlIHNwcml0ZSAobm9ybWFsaXNlZCBieSB0ZXh0dXJlIGhlaWdodCkuXG4gICAgICAqXG4gICAgICAqIEBwcm9wZXJ0eSByZW5kZXIuc3ByaXRlLnlPZmZzZXRcbiAgICAgICogQHR5cGUgbnVtYmVyXG4gICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBOdW1iZXJgIHRoYXQgZGVmaW5lcyB0aGUgbGluZSB3aWR0aCB0byB1c2Ugd2hlbiByZW5kZXJpbmcgdGhlIGJvZHkgb3V0bGluZSAoaWYgYSBzcHJpdGUgaXMgbm90IGRlZmluZWQpLlxuICAgICAqIEEgdmFsdWUgb2YgYDBgIG1lYW5zIG5vIG91dGxpbmUgd2lsbCBiZSByZW5kZXJlZC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSByZW5kZXIubGluZVdpZHRoXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgU3RyaW5nYCB0aGF0IGRlZmluZXMgdGhlIGZpbGwgc3R5bGUgdG8gdXNlIHdoZW4gcmVuZGVyaW5nIHRoZSBib2R5IChpZiBhIHNwcml0ZSBpcyBub3QgZGVmaW5lZCkuXG4gICAgICogSXQgaXMgdGhlIHNhbWUgYXMgd2hlbiB1c2luZyBhIGNhbnZhcywgc28gaXQgYWNjZXB0cyBDU1Mgc3R5bGUgcHJvcGVydHkgdmFsdWVzLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHJlbmRlci5maWxsU3R5bGVcbiAgICAgKiBAdHlwZSBzdHJpbmdcbiAgICAgKiBAZGVmYXVsdCBhIHJhbmRvbSBjb2xvdXJcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYFN0cmluZ2AgdGhhdCBkZWZpbmVzIHRoZSBzdHJva2Ugc3R5bGUgdG8gdXNlIHdoZW4gcmVuZGVyaW5nIHRoZSBib2R5IG91dGxpbmUgKGlmIGEgc3ByaXRlIGlzIG5vdCBkZWZpbmVkKS5cbiAgICAgKiBJdCBpcyB0aGUgc2FtZSBhcyB3aGVuIHVzaW5nIGEgY2FudmFzLCBzbyBpdCBhY2NlcHRzIENTUyBzdHlsZSBwcm9wZXJ0eSB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgcmVuZGVyLnN0cm9rZVN0eWxlXG4gICAgICogQHR5cGUgc3RyaW5nXG4gICAgICogQGRlZmF1bHQgYSByYW5kb20gY29sb3VyXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiB1bmlxdWUgYXhpcyB2ZWN0b3JzIChlZGdlIG5vcm1hbHMpIHVzZWQgZm9yIGNvbGxpc2lvbiBkZXRlY3Rpb24uXG4gICAgICogVGhlc2UgYXJlIGF1dG9tYXRpY2FsbHkgY2FsY3VsYXRlZCBmcm9tIHRoZSBnaXZlbiBjb252ZXggaHVsbCAoYHZlcnRpY2VzYCBhcnJheSkgaW4gYEJvZHkuY3JlYXRlYC5cbiAgICAgKiBUaGV5IGFyZSBjb25zdGFudGx5IHVwZGF0ZWQgYnkgYEJvZHkudXBkYXRlYCBkdXJpbmcgdGhlIHNpbXVsYXRpb24uXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgYXhlc1xuICAgICAqIEB0eXBlIHZlY3RvcltdXG4gICAgICovXG4gICAgIFxuICAgIC8qKlxuICAgICAqIEEgYE51bWJlcmAgdGhhdCBfbWVhc3VyZXNfIHRoZSBhcmVhIG9mIHRoZSBib2R5J3MgY29udmV4IGh1bGwsIGNhbGN1bGF0ZWQgYXQgY3JlYXRpb24gYnkgYEJvZHkuY3JlYXRlYC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBhcmVhXG4gICAgICogQHR5cGUgc3RyaW5nXG4gICAgICogQGRlZmF1bHQgXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBCb3VuZHNgIG9iamVjdCB0aGF0IGRlZmluZXMgdGhlIEFBQkIgcmVnaW9uIGZvciB0aGUgYm9keS5cbiAgICAgKiBJdCBpcyBhdXRvbWF0aWNhbGx5IGNhbGN1bGF0ZWQgZnJvbSB0aGUgZ2l2ZW4gY29udmV4IGh1bGwgKGB2ZXJ0aWNlc2AgYXJyYXkpIGluIGBCb2R5LmNyZWF0ZWAgYW5kIGNvbnN0YW50bHkgdXBkYXRlZCBieSBgQm9keS51cGRhdGVgIGR1cmluZyBzaW11bGF0aW9uLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGJvdW5kc1xuICAgICAqIEB0eXBlIGJvdW5kc1xuICAgICAqL1xuXG59KSgpO1xuXG59LHtcIi4uL2NvcmUvQ29tbW9uXCI6MTQsXCIuLi9jb3JlL1NsZWVwaW5nXCI6MjIsXCIuLi9nZW9tZXRyeS9BeGVzXCI6MjUsXCIuLi9nZW9tZXRyeS9Cb3VuZHNcIjoyNixcIi4uL2dlb21ldHJ5L1ZlY3RvclwiOjI4LFwiLi4vZ2VvbWV0cnkvVmVydGljZXNcIjoyOSxcIi4uL3JlbmRlci9SZW5kZXJcIjozMX1dLDI6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyLkNvbXBvc2l0ZWAgbW9kdWxlIGNvbnRhaW5zIG1ldGhvZHMgZm9yIGNyZWF0aW5nIGFuZCBtYW5pcHVsYXRpbmcgY29tcG9zaXRlIGJvZGllcy5cbiogQSBjb21wb3NpdGUgYm9keSBpcyBhIGNvbGxlY3Rpb24gb2YgYE1hdHRlci5Cb2R5YCwgYE1hdHRlci5Db25zdHJhaW50YCBhbmQgb3RoZXIgYE1hdHRlci5Db21wb3NpdGVgLCB0aGVyZWZvcmUgY29tcG9zaXRlcyBmb3JtIGEgdHJlZSBzdHJ1Y3R1cmUuXG4qIEl0IGlzIGltcG9ydGFudCB0byB1c2UgdGhlIGZ1bmN0aW9ucyBpbiB0aGlzIG1vZHVsZSB0byBtb2RpZnkgY29tcG9zaXRlcywgcmF0aGVyIHRoYW4gZGlyZWN0bHkgbW9kaWZ5aW5nIHRoZWlyIHByb3BlcnRpZXMuXG4qIE5vdGUgdGhhdCB0aGUgYE1hdHRlci5Xb3JsZGAgb2JqZWN0IGlzIGFsc28gYSB0eXBlIG9mIGBNYXR0ZXIuQ29tcG9zaXRlYCBhbmQgYXMgc3VjaCBhbGwgY29tcG9zaXRlIG1ldGhvZHMgaGVyZSBjYW4gYWxzbyBvcGVyYXRlIG9uIGEgYE1hdHRlci5Xb3JsZGAuXG4qXG4qIFNlZSB0aGUgaW5jbHVkZWQgdXNhZ2UgW2V4YW1wbGVzXShodHRwczovL2dpdGh1Yi5jb20vbGlhYnJ1L21hdHRlci1qcy90cmVlL21hc3Rlci9leGFtcGxlcykuXG4qXG4qIEBjbGFzcyBDb21wb3NpdGVcbiovXG5cbnZhciBDb21wb3NpdGUgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb3NpdGU7XG5cbnZhciBFdmVudHMgPSBfZGVyZXFfKCcuLi9jb3JlL0V2ZW50cycpO1xudmFyIENvbW1vbiA9IF9kZXJlcV8oJy4uL2NvcmUvQ29tbW9uJyk7XG52YXIgQm91bmRzID0gX2RlcmVxXygnLi4vZ2VvbWV0cnkvQm91bmRzJyk7XG52YXIgQm9keSA9IF9kZXJlcV8oJy4vQm9keScpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGNvbXBvc2l0ZS4gVGhlIG9wdGlvbnMgcGFyYW1ldGVyIGlzIGFuIG9iamVjdCB0aGF0IHNwZWNpZmllcyBhbnkgcHJvcGVydGllcyB5b3Ugd2lzaCB0byBvdmVycmlkZSB0aGUgZGVmYXVsdHMuXG4gICAgICogU2VlIHRoZSBwcm9wZXJpdGVzIHNlY3Rpb24gYmVsb3cgZm9yIGRldGFpbGVkIGluZm9ybWF0aW9uIG9uIHdoYXQgeW91IGNhbiBwYXNzIHZpYSB0aGUgYG9wdGlvbnNgIG9iamVjdC5cbiAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAqIEBwYXJhbSB7fSBbb3B0aW9uc11cbiAgICAgKiBAcmV0dXJuIHtjb21wb3NpdGV9IEEgbmV3IGNvbXBvc2l0ZVxuICAgICAqL1xuICAgIENvbXBvc2l0ZS5jcmVhdGUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBDb21tb24uZXh0ZW5kKHsgXG4gICAgICAgICAgICBpZDogQ29tbW9uLm5leHRJZCgpLFxuICAgICAgICAgICAgdHlwZTogJ2NvbXBvc2l0ZScsXG4gICAgICAgICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICAgICAgICBpc01vZGlmaWVkOiBmYWxzZSxcbiAgICAgICAgICAgIGJvZGllczogW10sIFxuICAgICAgICAgICAgY29uc3RyYWludHM6IFtdLCBcbiAgICAgICAgICAgIGNvbXBvc2l0ZXM6IFtdLFxuICAgICAgICAgICAgbGFiZWw6ICdDb21wb3NpdGUnLFxuICAgICAgICAgICAgcGx1Z2luOiB7fVxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY29tcG9zaXRlJ3MgYGlzTW9kaWZpZWRgIGZsYWcuIFxuICAgICAqIElmIGB1cGRhdGVQYXJlbnRzYCBpcyB0cnVlLCBhbGwgcGFyZW50cyB3aWxsIGJlIHNldCAoZGVmYXVsdDogZmFsc2UpLlxuICAgICAqIElmIGB1cGRhdGVDaGlsZHJlbmAgaXMgdHJ1ZSwgYWxsIGNoaWxkcmVuIHdpbGwgYmUgc2V0IChkZWZhdWx0OiBmYWxzZSkuXG4gICAgICogQG1ldGhvZCBzZXRNb2RpZmllZFxuICAgICAqIEBwYXJhbSB7Y29tcG9zaXRlfSBjb21wb3NpdGVcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzTW9kaWZpZWRcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFt1cGRhdGVQYXJlbnRzPWZhbHNlXVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3VwZGF0ZUNoaWxkcmVuPWZhbHNlXVxuICAgICAqL1xuICAgIENvbXBvc2l0ZS5zZXRNb2RpZmllZCA9IGZ1bmN0aW9uKGNvbXBvc2l0ZSwgaXNNb2RpZmllZCwgdXBkYXRlUGFyZW50cywgdXBkYXRlQ2hpbGRyZW4pIHtcbiAgICAgICAgY29tcG9zaXRlLmlzTW9kaWZpZWQgPSBpc01vZGlmaWVkO1xuXG4gICAgICAgIGlmICh1cGRhdGVQYXJlbnRzICYmIGNvbXBvc2l0ZS5wYXJlbnQpIHtcbiAgICAgICAgICAgIENvbXBvc2l0ZS5zZXRNb2RpZmllZChjb21wb3NpdGUucGFyZW50LCBpc01vZGlmaWVkLCB1cGRhdGVQYXJlbnRzLCB1cGRhdGVDaGlsZHJlbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXBkYXRlQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjb21wb3NpdGUuY29tcG9zaXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZENvbXBvc2l0ZSA9IGNvbXBvc2l0ZS5jb21wb3NpdGVzW2ldO1xuICAgICAgICAgICAgICAgIENvbXBvc2l0ZS5zZXRNb2RpZmllZChjaGlsZENvbXBvc2l0ZSwgaXNNb2RpZmllZCwgdXBkYXRlUGFyZW50cywgdXBkYXRlQ2hpbGRyZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEdlbmVyaWMgYWRkIGZ1bmN0aW9uLiBBZGRzIG9uZSBvciBtYW55IGJvZHkocyksIGNvbnN0cmFpbnQocykgb3IgYSBjb21wb3NpdGUocykgdG8gdGhlIGdpdmVuIGNvbXBvc2l0ZS5cbiAgICAgKiBUcmlnZ2VycyBgYmVmb3JlQWRkYCBhbmQgYGFmdGVyQWRkYCBldmVudHMgb24gdGhlIGBjb21wb3NpdGVgLlxuICAgICAqIEBtZXRob2QgYWRkXG4gICAgICogQHBhcmFtIHtjb21wb3NpdGV9IGNvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSB7fSBvYmplY3RcbiAgICAgKiBAcmV0dXJuIHtjb21wb3NpdGV9IFRoZSBvcmlnaW5hbCBjb21wb3NpdGUgd2l0aCB0aGUgb2JqZWN0cyBhZGRlZFxuICAgICAqL1xuICAgIENvbXBvc2l0ZS5hZGQgPSBmdW5jdGlvbihjb21wb3NpdGUsIG9iamVjdCkge1xuICAgICAgICB2YXIgb2JqZWN0cyA9IFtdLmNvbmNhdChvYmplY3QpO1xuXG4gICAgICAgIEV2ZW50cy50cmlnZ2VyKGNvbXBvc2l0ZSwgJ2JlZm9yZUFkZCcsIHsgb2JqZWN0OiBvYmplY3QgfSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gb2JqZWN0c1tpXTtcblxuICAgICAgICAgICAgc3dpdGNoIChvYmoudHlwZSkge1xuXG4gICAgICAgICAgICBjYXNlICdib2R5JzpcbiAgICAgICAgICAgICAgICAvLyBza2lwIGFkZGluZyBjb21wb3VuZCBwYXJ0c1xuICAgICAgICAgICAgICAgIGlmIChvYmoucGFyZW50ICE9PSBvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgQ29tbW9uLndhcm4oJ0NvbXBvc2l0ZS5hZGQ6IHNraXBwZWQgYWRkaW5nIGEgY29tcG91bmQgYm9keSBwYXJ0ICh5b3UgbXVzdCBhZGQgaXRzIHBhcmVudCBpbnN0ZWFkKScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBDb21wb3NpdGUuYWRkQm9keShjb21wb3NpdGUsIG9iaik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjb25zdHJhaW50JzpcbiAgICAgICAgICAgICAgICBDb21wb3NpdGUuYWRkQ29uc3RyYWludChjb21wb3NpdGUsIG9iaik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjb21wb3NpdGUnOlxuICAgICAgICAgICAgICAgIENvbXBvc2l0ZS5hZGRDb21wb3NpdGUoY29tcG9zaXRlLCBvYmopO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbW91c2VDb25zdHJhaW50JzpcbiAgICAgICAgICAgICAgICBDb21wb3NpdGUuYWRkQ29uc3RyYWludChjb21wb3NpdGUsIG9iai5jb25zdHJhaW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgRXZlbnRzLnRyaWdnZXIoY29tcG9zaXRlLCAnYWZ0ZXJBZGQnLCB7IG9iamVjdDogb2JqZWN0IH0pO1xuXG4gICAgICAgIHJldHVybiBjb21wb3NpdGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEdlbmVyaWMgcmVtb3ZlIGZ1bmN0aW9uLiBSZW1vdmVzIG9uZSBvciBtYW55IGJvZHkocyksIGNvbnN0cmFpbnQocykgb3IgYSBjb21wb3NpdGUocykgdG8gdGhlIGdpdmVuIGNvbXBvc2l0ZS5cbiAgICAgKiBPcHRpb25hbGx5IHNlYXJjaGluZyBpdHMgY2hpbGRyZW4gcmVjdXJzaXZlbHkuXG4gICAgICogVHJpZ2dlcnMgYGJlZm9yZVJlbW92ZWAgYW5kIGBhZnRlclJlbW92ZWAgZXZlbnRzIG9uIHRoZSBgY29tcG9zaXRlYC5cbiAgICAgKiBAbWV0aG9kIHJlbW92ZVxuICAgICAqIEBwYXJhbSB7Y29tcG9zaXRlfSBjb21wb3NpdGVcbiAgICAgKiBAcGFyYW0ge30gb2JqZWN0XG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZGVlcD1mYWxzZV1cbiAgICAgKiBAcmV0dXJuIHtjb21wb3NpdGV9IFRoZSBvcmlnaW5hbCBjb21wb3NpdGUgd2l0aCB0aGUgb2JqZWN0cyByZW1vdmVkXG4gICAgICovXG4gICAgQ29tcG9zaXRlLnJlbW92ZSA9IGZ1bmN0aW9uKGNvbXBvc2l0ZSwgb2JqZWN0LCBkZWVwKSB7XG4gICAgICAgIHZhciBvYmplY3RzID0gW10uY29uY2F0KG9iamVjdCk7XG5cbiAgICAgICAgRXZlbnRzLnRyaWdnZXIoY29tcG9zaXRlLCAnYmVmb3JlUmVtb3ZlJywgeyBvYmplY3Q6IG9iamVjdCB9KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBvYmplY3RzW2ldO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKG9iai50eXBlKSB7XG5cbiAgICAgICAgICAgIGNhc2UgJ2JvZHknOlxuICAgICAgICAgICAgICAgIENvbXBvc2l0ZS5yZW1vdmVCb2R5KGNvbXBvc2l0ZSwgb2JqLCBkZWVwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NvbnN0cmFpbnQnOlxuICAgICAgICAgICAgICAgIENvbXBvc2l0ZS5yZW1vdmVDb25zdHJhaW50KGNvbXBvc2l0ZSwgb2JqLCBkZWVwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NvbXBvc2l0ZSc6XG4gICAgICAgICAgICAgICAgQ29tcG9zaXRlLnJlbW92ZUNvbXBvc2l0ZShjb21wb3NpdGUsIG9iaiwgZGVlcCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtb3VzZUNvbnN0cmFpbnQnOlxuICAgICAgICAgICAgICAgIENvbXBvc2l0ZS5yZW1vdmVDb25zdHJhaW50KGNvbXBvc2l0ZSwgb2JqLmNvbnN0cmFpbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBFdmVudHMudHJpZ2dlcihjb21wb3NpdGUsICdhZnRlclJlbW92ZScsIHsgb2JqZWN0OiBvYmplY3QgfSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvc2l0ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGNvbXBvc2l0ZSB0byB0aGUgZ2l2ZW4gY29tcG9zaXRlLlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZCBhZGRDb21wb3NpdGVcbiAgICAgKiBAcGFyYW0ge2NvbXBvc2l0ZX0gY29tcG9zaXRlQVxuICAgICAqIEBwYXJhbSB7Y29tcG9zaXRlfSBjb21wb3NpdGVCXG4gICAgICogQHJldHVybiB7Y29tcG9zaXRlfSBUaGUgb3JpZ2luYWwgY29tcG9zaXRlQSB3aXRoIHRoZSBvYmplY3RzIGZyb20gY29tcG9zaXRlQiBhZGRlZFxuICAgICAqL1xuICAgIENvbXBvc2l0ZS5hZGRDb21wb3NpdGUgPSBmdW5jdGlvbihjb21wb3NpdGVBLCBjb21wb3NpdGVCKSB7XG4gICAgICAgIGNvbXBvc2l0ZUEuY29tcG9zaXRlcy5wdXNoKGNvbXBvc2l0ZUIpO1xuICAgICAgICBjb21wb3NpdGVCLnBhcmVudCA9IGNvbXBvc2l0ZUE7XG4gICAgICAgIENvbXBvc2l0ZS5zZXRNb2RpZmllZChjb21wb3NpdGVBLCB0cnVlLCB0cnVlLCBmYWxzZSk7XG4gICAgICAgIHJldHVybiBjb21wb3NpdGVBO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgY29tcG9zaXRlIGZyb20gdGhlIGdpdmVuIGNvbXBvc2l0ZSwgYW5kIG9wdGlvbmFsbHkgc2VhcmNoaW5nIGl0cyBjaGlsZHJlbiByZWN1cnNpdmVseS5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBtZXRob2QgcmVtb3ZlQ29tcG9zaXRlXG4gICAgICogQHBhcmFtIHtjb21wb3NpdGV9IGNvbXBvc2l0ZUFcbiAgICAgKiBAcGFyYW0ge2NvbXBvc2l0ZX0gY29tcG9zaXRlQlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RlZXA9ZmFsc2VdXG4gICAgICogQHJldHVybiB7Y29tcG9zaXRlfSBUaGUgb3JpZ2luYWwgY29tcG9zaXRlQSB3aXRoIHRoZSBjb21wb3NpdGUgcmVtb3ZlZFxuICAgICAqL1xuICAgIENvbXBvc2l0ZS5yZW1vdmVDb21wb3NpdGUgPSBmdW5jdGlvbihjb21wb3NpdGVBLCBjb21wb3NpdGVCLCBkZWVwKSB7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IENvbW1vbi5pbmRleE9mKGNvbXBvc2l0ZUEuY29tcG9zaXRlcywgY29tcG9zaXRlQik7XG4gICAgICAgIGlmIChwb3NpdGlvbiAhPT0gLTEpIHtcbiAgICAgICAgICAgIENvbXBvc2l0ZS5yZW1vdmVDb21wb3NpdGVBdChjb21wb3NpdGVBLCBwb3NpdGlvbik7XG4gICAgICAgICAgICBDb21wb3NpdGUuc2V0TW9kaWZpZWQoY29tcG9zaXRlQSwgdHJ1ZSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlZXApIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29tcG9zaXRlQS5jb21wb3NpdGVzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBDb21wb3NpdGUucmVtb3ZlQ29tcG9zaXRlKGNvbXBvc2l0ZUEuY29tcG9zaXRlc1tpXSwgY29tcG9zaXRlQiwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29tcG9zaXRlQTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIGNvbXBvc2l0ZSBmcm9tIHRoZSBnaXZlbiBjb21wb3NpdGUuXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUNvbXBvc2l0ZUF0XG4gICAgICogQHBhcmFtIHtjb21wb3NpdGV9IGNvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwb3NpdGlvblxuICAgICAqIEByZXR1cm4ge2NvbXBvc2l0ZX0gVGhlIG9yaWdpbmFsIGNvbXBvc2l0ZSB3aXRoIHRoZSBjb21wb3NpdGUgcmVtb3ZlZFxuICAgICAqL1xuICAgIENvbXBvc2l0ZS5yZW1vdmVDb21wb3NpdGVBdCA9IGZ1bmN0aW9uKGNvbXBvc2l0ZSwgcG9zaXRpb24pIHtcbiAgICAgICAgY29tcG9zaXRlLmNvbXBvc2l0ZXMuc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICAgICAgQ29tcG9zaXRlLnNldE1vZGlmaWVkKGNvbXBvc2l0ZSwgdHJ1ZSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICByZXR1cm4gY29tcG9zaXRlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgYm9keSB0byB0aGUgZ2l2ZW4gY29tcG9zaXRlLlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZCBhZGRCb2R5XG4gICAgICogQHBhcmFtIHtjb21wb3NpdGV9IGNvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSB7Ym9keX0gYm9keVxuICAgICAqIEByZXR1cm4ge2NvbXBvc2l0ZX0gVGhlIG9yaWdpbmFsIGNvbXBvc2l0ZSB3aXRoIHRoZSBib2R5IGFkZGVkXG4gICAgICovXG4gICAgQ29tcG9zaXRlLmFkZEJvZHkgPSBmdW5jdGlvbihjb21wb3NpdGUsIGJvZHkpIHtcbiAgICAgICAgY29tcG9zaXRlLmJvZGllcy5wdXNoKGJvZHkpO1xuICAgICAgICBDb21wb3NpdGUuc2V0TW9kaWZpZWQoY29tcG9zaXRlLCB0cnVlLCB0cnVlLCBmYWxzZSk7XG4gICAgICAgIHJldHVybiBjb21wb3NpdGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBib2R5IGZyb20gdGhlIGdpdmVuIGNvbXBvc2l0ZSwgYW5kIG9wdGlvbmFsbHkgc2VhcmNoaW5nIGl0cyBjaGlsZHJlbiByZWN1cnNpdmVseS5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBtZXRob2QgcmVtb3ZlQm9keVxuICAgICAqIEBwYXJhbSB7Y29tcG9zaXRlfSBjb21wb3NpdGVcbiAgICAgKiBAcGFyYW0ge2JvZHl9IGJvZHlcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtkZWVwPWZhbHNlXVxuICAgICAqIEByZXR1cm4ge2NvbXBvc2l0ZX0gVGhlIG9yaWdpbmFsIGNvbXBvc2l0ZSB3aXRoIHRoZSBib2R5IHJlbW92ZWRcbiAgICAgKi9cbiAgICBDb21wb3NpdGUucmVtb3ZlQm9keSA9IGZ1bmN0aW9uKGNvbXBvc2l0ZSwgYm9keSwgZGVlcCkge1xuICAgICAgICB2YXIgcG9zaXRpb24gPSBDb21tb24uaW5kZXhPZihjb21wb3NpdGUuYm9kaWVzLCBib2R5KTtcbiAgICAgICAgaWYgKHBvc2l0aW9uICE9PSAtMSkge1xuICAgICAgICAgICAgQ29tcG9zaXRlLnJlbW92ZUJvZHlBdChjb21wb3NpdGUsIHBvc2l0aW9uKTtcbiAgICAgICAgICAgIENvbXBvc2l0ZS5zZXRNb2RpZmllZChjb21wb3NpdGUsIHRydWUsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWVwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbXBvc2l0ZS5jb21wb3NpdGVzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBDb21wb3NpdGUucmVtb3ZlQm9keShjb21wb3NpdGUuY29tcG9zaXRlc1tpXSwgYm9keSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29tcG9zaXRlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgYm9keSBmcm9tIHRoZSBnaXZlbiBjb21wb3NpdGUuXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUJvZHlBdFxuICAgICAqIEBwYXJhbSB7Y29tcG9zaXRlfSBjb21wb3NpdGVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcG9zaXRpb25cbiAgICAgKiBAcmV0dXJuIHtjb21wb3NpdGV9IFRoZSBvcmlnaW5hbCBjb21wb3NpdGUgd2l0aCB0aGUgYm9keSByZW1vdmVkXG4gICAgICovXG4gICAgQ29tcG9zaXRlLnJlbW92ZUJvZHlBdCA9IGZ1bmN0aW9uKGNvbXBvc2l0ZSwgcG9zaXRpb24pIHtcbiAgICAgICAgY29tcG9zaXRlLmJvZGllcy5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgICAgICBDb21wb3NpdGUuc2V0TW9kaWZpZWQoY29tcG9zaXRlLCB0cnVlLCB0cnVlLCBmYWxzZSk7XG4gICAgICAgIHJldHVybiBjb21wb3NpdGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBjb25zdHJhaW50IHRvIHRoZSBnaXZlbiBjb21wb3NpdGUuXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIGFkZENvbnN0cmFpbnRcbiAgICAgKiBAcGFyYW0ge2NvbXBvc2l0ZX0gY29tcG9zaXRlXG4gICAgICogQHBhcmFtIHtjb25zdHJhaW50fSBjb25zdHJhaW50XG4gICAgICogQHJldHVybiB7Y29tcG9zaXRlfSBUaGUgb3JpZ2luYWwgY29tcG9zaXRlIHdpdGggdGhlIGNvbnN0cmFpbnQgYWRkZWRcbiAgICAgKi9cbiAgICBDb21wb3NpdGUuYWRkQ29uc3RyYWludCA9IGZ1bmN0aW9uKGNvbXBvc2l0ZSwgY29uc3RyYWludCkge1xuICAgICAgICBjb21wb3NpdGUuY29uc3RyYWludHMucHVzaChjb25zdHJhaW50KTtcbiAgICAgICAgQ29tcG9zaXRlLnNldE1vZGlmaWVkKGNvbXBvc2l0ZSwgdHJ1ZSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICByZXR1cm4gY29tcG9zaXRlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgY29uc3RyYWludCBmcm9tIHRoZSBnaXZlbiBjb21wb3NpdGUsIGFuZCBvcHRpb25hbGx5IHNlYXJjaGluZyBpdHMgY2hpbGRyZW4gcmVjdXJzaXZlbHkuXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUNvbnN0cmFpbnRcbiAgICAgKiBAcGFyYW0ge2NvbXBvc2l0ZX0gY29tcG9zaXRlXG4gICAgICogQHBhcmFtIHtjb25zdHJhaW50fSBjb25zdHJhaW50XG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZGVlcD1mYWxzZV1cbiAgICAgKiBAcmV0dXJuIHtjb21wb3NpdGV9IFRoZSBvcmlnaW5hbCBjb21wb3NpdGUgd2l0aCB0aGUgY29uc3RyYWludCByZW1vdmVkXG4gICAgICovXG4gICAgQ29tcG9zaXRlLnJlbW92ZUNvbnN0cmFpbnQgPSBmdW5jdGlvbihjb21wb3NpdGUsIGNvbnN0cmFpbnQsIGRlZXApIHtcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gQ29tbW9uLmluZGV4T2YoY29tcG9zaXRlLmNvbnN0cmFpbnRzLCBjb25zdHJhaW50KTtcbiAgICAgICAgaWYgKHBvc2l0aW9uICE9PSAtMSkge1xuICAgICAgICAgICAgQ29tcG9zaXRlLnJlbW92ZUNvbnN0cmFpbnRBdChjb21wb3NpdGUsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWVwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbXBvc2l0ZS5jb21wb3NpdGVzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBDb21wb3NpdGUucmVtb3ZlQ29uc3RyYWludChjb21wb3NpdGUuY29tcG9zaXRlc1tpXSwgY29uc3RyYWludCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29tcG9zaXRlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgYm9keSBmcm9tIHRoZSBnaXZlbiBjb21wb3NpdGUuXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUNvbnN0cmFpbnRBdFxuICAgICAqIEBwYXJhbSB7Y29tcG9zaXRlfSBjb21wb3NpdGVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcG9zaXRpb25cbiAgICAgKiBAcmV0dXJuIHtjb21wb3NpdGV9IFRoZSBvcmlnaW5hbCBjb21wb3NpdGUgd2l0aCB0aGUgY29uc3RyYWludCByZW1vdmVkXG4gICAgICovXG4gICAgQ29tcG9zaXRlLnJlbW92ZUNvbnN0cmFpbnRBdCA9IGZ1bmN0aW9uKGNvbXBvc2l0ZSwgcG9zaXRpb24pIHtcbiAgICAgICAgY29tcG9zaXRlLmNvbnN0cmFpbnRzLnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgICAgIENvbXBvc2l0ZS5zZXRNb2RpZmllZChjb21wb3NpdGUsIHRydWUsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIGNvbXBvc2l0ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgYm9kaWVzLCBjb25zdHJhaW50cyBhbmQgY29tcG9zaXRlcyBmcm9tIHRoZSBnaXZlbiBjb21wb3NpdGUuXG4gICAgICogT3B0aW9uYWxseSBjbGVhcmluZyBpdHMgY2hpbGRyZW4gcmVjdXJzaXZlbHkuXG4gICAgICogQG1ldGhvZCBjbGVhclxuICAgICAqIEBwYXJhbSB7Y29tcG9zaXRlfSBjb21wb3NpdGVcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGtlZXBTdGF0aWNcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtkZWVwPWZhbHNlXVxuICAgICAqL1xuICAgIENvbXBvc2l0ZS5jbGVhciA9IGZ1bmN0aW9uKGNvbXBvc2l0ZSwga2VlcFN0YXRpYywgZGVlcCkge1xuICAgICAgICBpZiAoZGVlcCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb21wb3NpdGUuY29tcG9zaXRlcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgQ29tcG9zaXRlLmNsZWFyKGNvbXBvc2l0ZS5jb21wb3NpdGVzW2ldLCBrZWVwU3RhdGljLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGtlZXBTdGF0aWMpIHtcbiAgICAgICAgICAgIGNvbXBvc2l0ZS5ib2RpZXMgPSBjb21wb3NpdGUuYm9kaWVzLmZpbHRlcihmdW5jdGlvbihib2R5KSB7IHJldHVybiBib2R5LmlzU3RhdGljOyB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbXBvc2l0ZS5ib2RpZXMubGVuZ3RoID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXBvc2l0ZS5jb25zdHJhaW50cy5sZW5ndGggPSAwO1xuICAgICAgICBjb21wb3NpdGUuY29tcG9zaXRlcy5sZW5ndGggPSAwO1xuICAgICAgICBDb21wb3NpdGUuc2V0TW9kaWZpZWQoY29tcG9zaXRlLCB0cnVlLCB0cnVlLCBmYWxzZSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvc2l0ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgYm9kaWVzIGluIHRoZSBnaXZlbiBjb21wb3NpdGUsIGluY2x1ZGluZyBhbGwgYm9kaWVzIGluIGl0cyBjaGlsZHJlbiwgcmVjdXJzaXZlbHkuXG4gICAgICogQG1ldGhvZCBhbGxCb2RpZXNcbiAgICAgKiBAcGFyYW0ge2NvbXBvc2l0ZX0gY29tcG9zaXRlXG4gICAgICogQHJldHVybiB7Ym9keVtdfSBBbGwgdGhlIGJvZGllc1xuICAgICAqL1xuICAgIENvbXBvc2l0ZS5hbGxCb2RpZXMgPSBmdW5jdGlvbihjb21wb3NpdGUpIHtcbiAgICAgICAgdmFyIGJvZGllcyA9IFtdLmNvbmNhdChjb21wb3NpdGUuYm9kaWVzKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbXBvc2l0ZS5jb21wb3NpdGVzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgYm9kaWVzID0gYm9kaWVzLmNvbmNhdChDb21wb3NpdGUuYWxsQm9kaWVzKGNvbXBvc2l0ZS5jb21wb3NpdGVzW2ldKSk7XG5cbiAgICAgICAgcmV0dXJuIGJvZGllcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgY29uc3RyYWludHMgaW4gdGhlIGdpdmVuIGNvbXBvc2l0ZSwgaW5jbHVkaW5nIGFsbCBjb25zdHJhaW50cyBpbiBpdHMgY2hpbGRyZW4sIHJlY3Vyc2l2ZWx5LlxuICAgICAqIEBtZXRob2QgYWxsQ29uc3RyYWludHNcbiAgICAgKiBAcGFyYW0ge2NvbXBvc2l0ZX0gY29tcG9zaXRlXG4gICAgICogQHJldHVybiB7Y29uc3RyYWludFtdfSBBbGwgdGhlIGNvbnN0cmFpbnRzXG4gICAgICovXG4gICAgQ29tcG9zaXRlLmFsbENvbnN0cmFpbnRzID0gZnVuY3Rpb24oY29tcG9zaXRlKSB7XG4gICAgICAgIHZhciBjb25zdHJhaW50cyA9IFtdLmNvbmNhdChjb21wb3NpdGUuY29uc3RyYWludHMpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29tcG9zaXRlLmNvbXBvc2l0ZXMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBjb25zdHJhaW50cyA9IGNvbnN0cmFpbnRzLmNvbmNhdChDb21wb3NpdGUuYWxsQ29uc3RyYWludHMoY29tcG9zaXRlLmNvbXBvc2l0ZXNbaV0pKTtcblxuICAgICAgICByZXR1cm4gY29uc3RyYWludHM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIGNvbXBvc2l0ZXMgaW4gdGhlIGdpdmVuIGNvbXBvc2l0ZSwgaW5jbHVkaW5nIGFsbCBjb21wb3NpdGVzIGluIGl0cyBjaGlsZHJlbiwgcmVjdXJzaXZlbHkuXG4gICAgICogQG1ldGhvZCBhbGxDb21wb3NpdGVzXG4gICAgICogQHBhcmFtIHtjb21wb3NpdGV9IGNvbXBvc2l0ZVxuICAgICAqIEByZXR1cm4ge2NvbXBvc2l0ZVtdfSBBbGwgdGhlIGNvbXBvc2l0ZXNcbiAgICAgKi9cbiAgICBDb21wb3NpdGUuYWxsQ29tcG9zaXRlcyA9IGZ1bmN0aW9uKGNvbXBvc2l0ZSkge1xuICAgICAgICB2YXIgY29tcG9zaXRlcyA9IFtdLmNvbmNhdChjb21wb3NpdGUuY29tcG9zaXRlcyk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb21wb3NpdGUuY29tcG9zaXRlcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIGNvbXBvc2l0ZXMgPSBjb21wb3NpdGVzLmNvbmNhdChDb21wb3NpdGUuYWxsQ29tcG9zaXRlcyhjb21wb3NpdGUuY29tcG9zaXRlc1tpXSkpO1xuXG4gICAgICAgIHJldHVybiBjb21wb3NpdGVzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZWFyY2hlcyB0aGUgY29tcG9zaXRlIHJlY3Vyc2l2ZWx5IGZvciBhbiBvYmplY3QgbWF0Y2hpbmcgdGhlIHR5cGUgYW5kIGlkIHN1cHBsaWVkLCBudWxsIGlmIG5vdCBmb3VuZC5cbiAgICAgKiBAbWV0aG9kIGdldFxuICAgICAqIEBwYXJhbSB7Y29tcG9zaXRlfSBjb21wb3NpdGVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgICAqIEByZXR1cm4ge29iamVjdH0gVGhlIHJlcXVlc3RlZCBvYmplY3QsIGlmIGZvdW5kXG4gICAgICovXG4gICAgQ29tcG9zaXRlLmdldCA9IGZ1bmN0aW9uKGNvbXBvc2l0ZSwgaWQsIHR5cGUpIHtcbiAgICAgICAgdmFyIG9iamVjdHMsXG4gICAgICAgICAgICBvYmplY3Q7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ2JvZHknOlxuICAgICAgICAgICAgb2JqZWN0cyA9IENvbXBvc2l0ZS5hbGxCb2RpZXMoY29tcG9zaXRlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjb25zdHJhaW50JzpcbiAgICAgICAgICAgIG9iamVjdHMgPSBDb21wb3NpdGUuYWxsQ29uc3RyYWludHMoY29tcG9zaXRlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjb21wb3NpdGUnOlxuICAgICAgICAgICAgb2JqZWN0cyA9IENvbXBvc2l0ZS5hbGxDb21wb3NpdGVzKGNvbXBvc2l0ZSkuY29uY2F0KGNvbXBvc2l0ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghb2JqZWN0cylcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgIG9iamVjdCA9IG9iamVjdHMuZmlsdGVyKGZ1bmN0aW9uKG9iamVjdCkgeyBcbiAgICAgICAgICAgIHJldHVybiBvYmplY3QuaWQudG9TdHJpbmcoKSA9PT0gaWQudG9TdHJpbmcoKTsgXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBvYmplY3QubGVuZ3RoID09PSAwID8gbnVsbCA6IG9iamVjdFswXTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogTW92ZXMgdGhlIGdpdmVuIG9iamVjdChzKSBmcm9tIGNvbXBvc2l0ZUEgdG8gY29tcG9zaXRlQiAoZXF1YWwgdG8gYSByZW1vdmUgZm9sbG93ZWQgYnkgYW4gYWRkKS5cbiAgICAgKiBAbWV0aG9kIG1vdmVcbiAgICAgKiBAcGFyYW0ge2NvbXBvc2l0ZUF9IGNvbXBvc2l0ZUFcbiAgICAgKiBAcGFyYW0ge29iamVjdFtdfSBvYmplY3RzXG4gICAgICogQHBhcmFtIHtjb21wb3NpdGVCfSBjb21wb3NpdGVCXG4gICAgICogQHJldHVybiB7Y29tcG9zaXRlfSBSZXR1cm5zIGNvbXBvc2l0ZUFcbiAgICAgKi9cbiAgICBDb21wb3NpdGUubW92ZSA9IGZ1bmN0aW9uKGNvbXBvc2l0ZUEsIG9iamVjdHMsIGNvbXBvc2l0ZUIpIHtcbiAgICAgICAgQ29tcG9zaXRlLnJlbW92ZShjb21wb3NpdGVBLCBvYmplY3RzKTtcbiAgICAgICAgQ29tcG9zaXRlLmFkZChjb21wb3NpdGVCLCBvYmplY3RzKTtcbiAgICAgICAgcmV0dXJuIGNvbXBvc2l0ZUE7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFzc2lnbnMgbmV3IGlkcyBmb3IgYWxsIG9iamVjdHMgaW4gdGhlIGNvbXBvc2l0ZSwgcmVjdXJzaXZlbHkuXG4gICAgICogQG1ldGhvZCByZWJhc2VcbiAgICAgKiBAcGFyYW0ge2NvbXBvc2l0ZX0gY29tcG9zaXRlXG4gICAgICogQHJldHVybiB7Y29tcG9zaXRlfSBSZXR1cm5zIGNvbXBvc2l0ZVxuICAgICAqL1xuICAgIENvbXBvc2l0ZS5yZWJhc2UgPSBmdW5jdGlvbihjb21wb3NpdGUpIHtcbiAgICAgICAgdmFyIG9iamVjdHMgPSBDb21wb3NpdGUuYWxsQm9kaWVzKGNvbXBvc2l0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jb25jYXQoQ29tcG9zaXRlLmFsbENvbnN0cmFpbnRzKGNvbXBvc2l0ZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KENvbXBvc2l0ZS5hbGxDb21wb3NpdGVzKGNvbXBvc2l0ZSkpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgb2JqZWN0c1tpXS5pZCA9IENvbW1vbi5uZXh0SWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIENvbXBvc2l0ZS5zZXRNb2RpZmllZChjb21wb3NpdGUsIHRydWUsIHRydWUsIGZhbHNlKTtcblxuICAgICAgICByZXR1cm4gY29tcG9zaXRlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUcmFuc2xhdGVzIGFsbCBjaGlsZHJlbiBpbiB0aGUgY29tcG9zaXRlIGJ5IGEgZ2l2ZW4gdmVjdG9yIHJlbGF0aXZlIHRvIHRoZWlyIGN1cnJlbnQgcG9zaXRpb25zLCBcbiAgICAgKiB3aXRob3V0IGltcGFydGluZyBhbnkgdmVsb2NpdHkuXG4gICAgICogQG1ldGhvZCB0cmFuc2xhdGVcbiAgICAgKiBAcGFyYW0ge2NvbXBvc2l0ZX0gY29tcG9zaXRlXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHRyYW5zbGF0aW9uXG4gICAgICogQHBhcmFtIHtib29sfSBbcmVjdXJzaXZlPXRydWVdXG4gICAgICovXG4gICAgQ29tcG9zaXRlLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uKGNvbXBvc2l0ZSwgdHJhbnNsYXRpb24sIHJlY3Vyc2l2ZSkge1xuICAgICAgICB2YXIgYm9kaWVzID0gcmVjdXJzaXZlID8gQ29tcG9zaXRlLmFsbEJvZGllcyhjb21wb3NpdGUpIDogY29tcG9zaXRlLmJvZGllcztcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvZGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgQm9keS50cmFuc2xhdGUoYm9kaWVzW2ldLCB0cmFuc2xhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBDb21wb3NpdGUuc2V0TW9kaWZpZWQoY29tcG9zaXRlLCB0cnVlLCB0cnVlLCBmYWxzZSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvc2l0ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUm90YXRlcyBhbGwgY2hpbGRyZW4gaW4gdGhlIGNvbXBvc2l0ZSBieSBhIGdpdmVuIGFuZ2xlIGFib3V0IHRoZSBnaXZlbiBwb2ludCwgd2l0aG91dCBpbXBhcnRpbmcgYW55IGFuZ3VsYXIgdmVsb2NpdHkuXG4gICAgICogQG1ldGhvZCByb3RhdGVcbiAgICAgKiBAcGFyYW0ge2NvbXBvc2l0ZX0gY29tcG9zaXRlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJvdGF0aW9uXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHBvaW50XG4gICAgICogQHBhcmFtIHtib29sfSBbcmVjdXJzaXZlPXRydWVdXG4gICAgICovXG4gICAgQ29tcG9zaXRlLnJvdGF0ZSA9IGZ1bmN0aW9uKGNvbXBvc2l0ZSwgcm90YXRpb24sIHBvaW50LCByZWN1cnNpdmUpIHtcbiAgICAgICAgdmFyIGNvcyA9IE1hdGguY29zKHJvdGF0aW9uKSxcbiAgICAgICAgICAgIHNpbiA9IE1hdGguc2luKHJvdGF0aW9uKSxcbiAgICAgICAgICAgIGJvZGllcyA9IHJlY3Vyc2l2ZSA/IENvbXBvc2l0ZS5hbGxCb2RpZXMoY29tcG9zaXRlKSA6IGNvbXBvc2l0ZS5ib2RpZXM7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBib2R5ID0gYm9kaWVzW2ldLFxuICAgICAgICAgICAgICAgIGR4ID0gYm9keS5wb3NpdGlvbi54IC0gcG9pbnQueCxcbiAgICAgICAgICAgICAgICBkeSA9IGJvZHkucG9zaXRpb24ueSAtIHBvaW50Lnk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBCb2R5LnNldFBvc2l0aW9uKGJvZHksIHtcbiAgICAgICAgICAgICAgICB4OiBwb2ludC54ICsgKGR4ICogY29zIC0gZHkgKiBzaW4pLFxuICAgICAgICAgICAgICAgIHk6IHBvaW50LnkgKyAoZHggKiBzaW4gKyBkeSAqIGNvcylcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBCb2R5LnJvdGF0ZShib2R5LCByb3RhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBDb21wb3NpdGUuc2V0TW9kaWZpZWQoY29tcG9zaXRlLCB0cnVlLCB0cnVlLCBmYWxzZSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvc2l0ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2NhbGVzIGFsbCBjaGlsZHJlbiBpbiB0aGUgY29tcG9zaXRlLCBpbmNsdWRpbmcgdXBkYXRpbmcgcGh5c2ljYWwgcHJvcGVydGllcyAobWFzcywgYXJlYSwgYXhlcywgaW5lcnRpYSksIGZyb20gYSB3b3JsZC1zcGFjZSBwb2ludC5cbiAgICAgKiBAbWV0aG9kIHNjYWxlXG4gICAgICogQHBhcmFtIHtjb21wb3NpdGV9IGNvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzY2FsZVhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2NhbGVZXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHBvaW50XG4gICAgICogQHBhcmFtIHtib29sfSBbcmVjdXJzaXZlPXRydWVdXG4gICAgICovXG4gICAgQ29tcG9zaXRlLnNjYWxlID0gZnVuY3Rpb24oY29tcG9zaXRlLCBzY2FsZVgsIHNjYWxlWSwgcG9pbnQsIHJlY3Vyc2l2ZSkge1xuICAgICAgICB2YXIgYm9kaWVzID0gcmVjdXJzaXZlID8gQ29tcG9zaXRlLmFsbEJvZGllcyhjb21wb3NpdGUpIDogY29tcG9zaXRlLmJvZGllcztcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvZGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGJvZHkgPSBib2RpZXNbaV0sXG4gICAgICAgICAgICAgICAgZHggPSBib2R5LnBvc2l0aW9uLnggLSBwb2ludC54LFxuICAgICAgICAgICAgICAgIGR5ID0gYm9keS5wb3NpdGlvbi55IC0gcG9pbnQueTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIEJvZHkuc2V0UG9zaXRpb24oYm9keSwge1xuICAgICAgICAgICAgICAgIHg6IHBvaW50LnggKyBkeCAqIHNjYWxlWCxcbiAgICAgICAgICAgICAgICB5OiBwb2ludC55ICsgZHkgKiBzY2FsZVlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBCb2R5LnNjYWxlKGJvZHksIHNjYWxlWCwgc2NhbGVZKTtcbiAgICAgICAgfVxuXG4gICAgICAgIENvbXBvc2l0ZS5zZXRNb2RpZmllZChjb21wb3NpdGUsIHRydWUsIHRydWUsIGZhbHNlKTtcblxuICAgICAgICByZXR1cm4gY29tcG9zaXRlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB1bmlvbiBvZiB0aGUgYm91bmRzIG9mIGFsbCBvZiB0aGUgY29tcG9zaXRlJ3MgYm9kaWVzLlxuICAgICAqIEBtZXRob2QgYm91bmRzXG4gICAgICogQHBhcmFtIHtjb21wb3NpdGV9IGNvbXBvc2l0ZSBUaGUgY29tcG9zaXRlLlxuICAgICAqIEByZXR1cm5zIHtib3VuZHN9IFRoZSBjb21wb3NpdGUgYm91bmRzLlxuICAgICAqL1xuICAgIENvbXBvc2l0ZS5ib3VuZHMgPSBmdW5jdGlvbihjb21wb3NpdGUpIHtcbiAgICAgICAgdmFyIGJvZGllcyA9IENvbXBvc2l0ZS5hbGxCb2RpZXMoY29tcG9zaXRlKSxcbiAgICAgICAgICAgIHZlcnRpY2VzID0gW107XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHZhciBib2R5ID0gYm9kaWVzW2ldO1xuICAgICAgICAgICAgdmVydGljZXMucHVzaChib2R5LmJvdW5kcy5taW4sIGJvZHkuYm91bmRzLm1heCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gQm91bmRzLmNyZWF0ZSh2ZXJ0aWNlcyk7XG4gICAgfTtcblxuICAgIC8qXG4gICAgKlxuICAgICogIEV2ZW50cyBEb2N1bWVudGF0aW9uXG4gICAgKlxuICAgICovXG5cbiAgICAvKipcbiAgICAqIEZpcmVkIHdoZW4gYSBjYWxsIHRvIGBDb21wb3NpdGUuYWRkYCBpcyBtYWRlLCBiZWZvcmUgb2JqZWN0cyBoYXZlIGJlZW4gYWRkZWQuXG4gICAgKlxuICAgICogQGV2ZW50IGJlZm9yZUFkZFxuICAgICogQHBhcmFtIHt9IGV2ZW50IEFuIGV2ZW50IG9iamVjdFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm9iamVjdCBUaGUgb2JqZWN0KHMpIHRvIGJlIGFkZGVkIChtYXkgYmUgYSBzaW5nbGUgYm9keSwgY29uc3RyYWludCwgY29tcG9zaXRlIG9yIGEgbWl4ZWQgYXJyYXkgb2YgdGhlc2UpXG4gICAgKiBAcGFyYW0ge30gZXZlbnQuc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0IG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAgKi9cblxuICAgIC8qKlxuICAgICogRmlyZWQgd2hlbiBhIGNhbGwgdG8gYENvbXBvc2l0ZS5hZGRgIGlzIG1hZGUsIGFmdGVyIG9iamVjdHMgaGF2ZSBiZWVuIGFkZGVkLlxuICAgICpcbiAgICAqIEBldmVudCBhZnRlckFkZFxuICAgICogQHBhcmFtIHt9IGV2ZW50IEFuIGV2ZW50IG9iamVjdFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm9iamVjdCBUaGUgb2JqZWN0KHMpIHRoYXQgaGF2ZSBiZWVuIGFkZGVkIChtYXkgYmUgYSBzaW5nbGUgYm9keSwgY29uc3RyYWludCwgY29tcG9zaXRlIG9yIGEgbWl4ZWQgYXJyYXkgb2YgdGhlc2UpXG4gICAgKiBAcGFyYW0ge30gZXZlbnQuc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0IG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAgKi9cblxuICAgIC8qKlxuICAgICogRmlyZWQgd2hlbiBhIGNhbGwgdG8gYENvbXBvc2l0ZS5yZW1vdmVgIGlzIG1hZGUsIGJlZm9yZSBvYmplY3RzIGhhdmUgYmVlbiByZW1vdmVkLlxuICAgICpcbiAgICAqIEBldmVudCBiZWZvcmVSZW1vdmVcbiAgICAqIEBwYXJhbSB7fSBldmVudCBBbiBldmVudCBvYmplY3RcbiAgICAqIEBwYXJhbSB7fSBldmVudC5vYmplY3QgVGhlIG9iamVjdChzKSB0byBiZSByZW1vdmVkIChtYXkgYmUgYSBzaW5nbGUgYm9keSwgY29uc3RyYWludCwgY29tcG9zaXRlIG9yIGEgbWl4ZWQgYXJyYXkgb2YgdGhlc2UpXG4gICAgKiBAcGFyYW0ge30gZXZlbnQuc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0IG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAgKi9cblxuICAgIC8qKlxuICAgICogRmlyZWQgd2hlbiBhIGNhbGwgdG8gYENvbXBvc2l0ZS5yZW1vdmVgIGlzIG1hZGUsIGFmdGVyIG9iamVjdHMgaGF2ZSBiZWVuIHJlbW92ZWQuXG4gICAgKlxuICAgICogQGV2ZW50IGFmdGVyUmVtb3ZlXG4gICAgKiBAcGFyYW0ge30gZXZlbnQgQW4gZXZlbnQgb2JqZWN0XG4gICAgKiBAcGFyYW0ge30gZXZlbnQub2JqZWN0IFRoZSBvYmplY3QocykgdGhhdCBoYXZlIGJlZW4gcmVtb3ZlZCAobWF5IGJlIGEgc2luZ2xlIGJvZHksIGNvbnN0cmFpbnQsIGNvbXBvc2l0ZSBvciBhIG1peGVkIGFycmF5IG9mIHRoZXNlKVxuICAgICogQHBhcmFtIHt9IGV2ZW50LnNvdXJjZSBUaGUgc291cmNlIG9iamVjdCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5uYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudFxuICAgICovXG5cbiAgICAvKlxuICAgICpcbiAgICAqICBQcm9wZXJ0aWVzIERvY3VtZW50YXRpb25cbiAgICAqXG4gICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFuIGludGVnZXIgYE51bWJlcmAgdW5pcXVlbHkgaWRlbnRpZnlpbmcgbnVtYmVyIGdlbmVyYXRlZCBpbiBgQ29tcG9zaXRlLmNyZWF0ZWAgYnkgYENvbW1vbi5uZXh0SWRgLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGlkXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBTdHJpbmdgIGRlbm90aW5nIHRoZSB0eXBlIG9mIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB0eXBlXG4gICAgICogQHR5cGUgc3RyaW5nXG4gICAgICogQGRlZmF1bHQgXCJjb21wb3NpdGVcIlxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gYXJiaXRyYXJ5IGBTdHJpbmdgIG5hbWUgdG8gaGVscCB0aGUgdXNlciBpZGVudGlmeSBhbmQgbWFuYWdlIGNvbXBvc2l0ZXMuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgbGFiZWxcbiAgICAgKiBAdHlwZSBzdHJpbmdcbiAgICAgKiBAZGVmYXVsdCBcIkNvbXBvc2l0ZVwiXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGZsYWcgdGhhdCBzcGVjaWZpZXMgd2hldGhlciB0aGUgY29tcG9zaXRlIGhhcyBiZWVuIG1vZGlmaWVkIGR1cmluZyB0aGUgY3VycmVudCBzdGVwLlxuICAgICAqIE1vc3QgYE1hdHRlci5Db21wb3NpdGVgIG1ldGhvZHMgd2lsbCBhdXRvbWF0aWNhbGx5IHNldCB0aGlzIGZsYWcgdG8gYHRydWVgIHRvIGluZm9ybSB0aGUgZW5naW5lIG9mIGNoYW5nZXMgdG8gYmUgaGFuZGxlZC5cbiAgICAgKiBJZiB5b3UgbmVlZCB0byBjaGFuZ2UgaXQgbWFudWFsbHksIHlvdSBzaG91bGQgdXNlIHRoZSBgQ29tcG9zaXRlLnNldE1vZGlmaWVkYCBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgaXNNb2RpZmllZFxuICAgICAqIEB0eXBlIGJvb2xlYW5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogVGhlIGBDb21wb3NpdGVgIHRoYXQgaXMgdGhlIHBhcmVudCBvZiB0aGlzIGNvbXBvc2l0ZS4gSXQgaXMgYXV0b21hdGljYWxseSBtYW5hZ2VkIGJ5IHRoZSBgTWF0dGVyLkNvbXBvc2l0ZWAgbWV0aG9kcy5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBwYXJlbnRcbiAgICAgKiBAdHlwZSBjb21wb3NpdGVcbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBgQm9keWAgdGhhdCBhcmUgX2RpcmVjdF8gY2hpbGRyZW4gb2YgdGhpcyBjb21wb3NpdGUuXG4gICAgICogVG8gYWRkIG9yIHJlbW92ZSBib2RpZXMgeW91IHNob3VsZCB1c2UgYENvbXBvc2l0ZS5hZGRgIGFuZCBgQ29tcG9zaXRlLnJlbW92ZWAgbWV0aG9kcyByYXRoZXIgdGhhbiBkaXJlY3RseSBtb2RpZnlpbmcgdGhpcyBwcm9wZXJ0eS5cbiAgICAgKiBJZiB5b3Ugd2lzaCB0byByZWN1cnNpdmVseSBmaW5kIGFsbCBkZXNjZW5kYW50cywgeW91IHNob3VsZCB1c2UgdGhlIGBDb21wb3NpdGUuYWxsQm9kaWVzYCBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgYm9kaWVzXG4gICAgICogQHR5cGUgYm9keVtdXG4gICAgICogQGRlZmF1bHQgW11cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIGBDb25zdHJhaW50YCB0aGF0IGFyZSBfZGlyZWN0XyBjaGlsZHJlbiBvZiB0aGlzIGNvbXBvc2l0ZS5cbiAgICAgKiBUbyBhZGQgb3IgcmVtb3ZlIGNvbnN0cmFpbnRzIHlvdSBzaG91bGQgdXNlIGBDb21wb3NpdGUuYWRkYCBhbmQgYENvbXBvc2l0ZS5yZW1vdmVgIG1ldGhvZHMgcmF0aGVyIHRoYW4gZGlyZWN0bHkgbW9kaWZ5aW5nIHRoaXMgcHJvcGVydHkuXG4gICAgICogSWYgeW91IHdpc2ggdG8gcmVjdXJzaXZlbHkgZmluZCBhbGwgZGVzY2VuZGFudHMsIHlvdSBzaG91bGQgdXNlIHRoZSBgQ29tcG9zaXRlLmFsbENvbnN0cmFpbnRzYCBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgY29uc3RyYWludHNcbiAgICAgKiBAdHlwZSBjb25zdHJhaW50W11cbiAgICAgKiBAZGVmYXVsdCBbXVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2YgYENvbXBvc2l0ZWAgdGhhdCBhcmUgX2RpcmVjdF8gY2hpbGRyZW4gb2YgdGhpcyBjb21wb3NpdGUuXG4gICAgICogVG8gYWRkIG9yIHJlbW92ZSBjb21wb3NpdGVzIHlvdSBzaG91bGQgdXNlIGBDb21wb3NpdGUuYWRkYCBhbmQgYENvbXBvc2l0ZS5yZW1vdmVgIG1ldGhvZHMgcmF0aGVyIHRoYW4gZGlyZWN0bHkgbW9kaWZ5aW5nIHRoaXMgcHJvcGVydHkuXG4gICAgICogSWYgeW91IHdpc2ggdG8gcmVjdXJzaXZlbHkgZmluZCBhbGwgZGVzY2VuZGFudHMsIHlvdSBzaG91bGQgdXNlIHRoZSBgQ29tcG9zaXRlLmFsbENvbXBvc2l0ZXNgIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBjb21wb3NpdGVzXG4gICAgICogQHR5cGUgY29tcG9zaXRlW11cbiAgICAgKiBAZGVmYXVsdCBbXVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gb2JqZWN0IHJlc2VydmVkIGZvciBzdG9yaW5nIHBsdWdpbi1zcGVjaWZpYyBwcm9wZXJ0aWVzLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHBsdWdpblxuICAgICAqIEB0eXBlIHt9XG4gICAgICovXG5cbn0pKCk7XG5cbn0se1wiLi4vY29yZS9Db21tb25cIjoxNCxcIi4uL2NvcmUvRXZlbnRzXCI6MTYsXCIuLi9nZW9tZXRyeS9Cb3VuZHNcIjoyNixcIi4vQm9keVwiOjF9XSwzOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuKiBUaGUgYE1hdHRlci5Xb3JsZGAgbW9kdWxlIGNvbnRhaW5zIG1ldGhvZHMgZm9yIGNyZWF0aW5nIGFuZCBtYW5pcHVsYXRpbmcgdGhlIHdvcmxkIGNvbXBvc2l0ZS5cbiogQSBgTWF0dGVyLldvcmxkYCBpcyBhIGBNYXR0ZXIuQ29tcG9zaXRlYCBib2R5LCB3aGljaCBpcyBhIGNvbGxlY3Rpb24gb2YgYE1hdHRlci5Cb2R5YCwgYE1hdHRlci5Db25zdHJhaW50YCBhbmQgb3RoZXIgYE1hdHRlci5Db21wb3NpdGVgLlxuKiBBIGBNYXR0ZXIuV29ybGRgIGhhcyBhIGZldyBhZGRpdGlvbmFsIHByb3BlcnRpZXMgaW5jbHVkaW5nIGBncmF2aXR5YCBhbmQgYGJvdW5kc2AuXG4qIEl0IGlzIGltcG9ydGFudCB0byB1c2UgdGhlIGZ1bmN0aW9ucyBpbiB0aGUgYE1hdHRlci5Db21wb3NpdGVgIG1vZHVsZSB0byBtb2RpZnkgdGhlIHdvcmxkIGNvbXBvc2l0ZSwgcmF0aGVyIHRoYW4gZGlyZWN0bHkgbW9kaWZ5aW5nIGl0cyBwcm9wZXJ0aWVzLlxuKiBUaGVyZSBhcmUgYWxzbyBhIGZldyBtZXRob2RzIGhlcmUgdGhhdCBhbGlhcyB0aG9zZSBpbiBgTWF0dGVyLkNvbXBvc2l0ZWAgZm9yIGVhc2llciByZWFkYWJpbGl0eS5cbipcbiogU2VlIHRoZSBpbmNsdWRlZCB1c2FnZSBbZXhhbXBsZXNdKGh0dHBzOi8vZ2l0aHViLmNvbS9saWFicnUvbWF0dGVyLWpzL3RyZWUvbWFzdGVyL2V4YW1wbGVzKS5cbipcbiogQGNsYXNzIFdvcmxkXG4qIEBleHRlbmRzIENvbXBvc2l0ZVxuKi9cblxudmFyIFdvcmxkID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gV29ybGQ7XG5cbnZhciBDb21wb3NpdGUgPSBfZGVyZXFfKCcuL0NvbXBvc2l0ZScpO1xudmFyIENvbnN0cmFpbnQgPSBfZGVyZXFfKCcuLi9jb25zdHJhaW50L0NvbnN0cmFpbnQnKTtcbnZhciBDb21tb24gPSBfZGVyZXFfKCcuLi9jb3JlL0NvbW1vbicpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHdvcmxkIGNvbXBvc2l0ZS4gVGhlIG9wdGlvbnMgcGFyYW1ldGVyIGlzIGFuIG9iamVjdCB0aGF0IHNwZWNpZmllcyBhbnkgcHJvcGVydGllcyB5b3Ugd2lzaCB0byBvdmVycmlkZSB0aGUgZGVmYXVsdHMuXG4gICAgICogU2VlIHRoZSBwcm9wZXJ0aWVzIHNlY3Rpb24gYmVsb3cgZm9yIGRldGFpbGVkIGluZm9ybWF0aW9uIG9uIHdoYXQgeW91IGNhbiBwYXNzIHZpYSB0aGUgYG9wdGlvbnNgIG9iamVjdC5cbiAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7fSBvcHRpb25zXG4gICAgICogQHJldHVybiB7d29ybGR9IEEgbmV3IHdvcmxkXG4gICAgICovXG4gICAgV29ybGQuY3JlYXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB2YXIgY29tcG9zaXRlID0gQ29tcG9zaXRlLmNyZWF0ZSgpO1xuXG4gICAgICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIGxhYmVsOiAnV29ybGQnLFxuICAgICAgICAgICAgZ3Jhdml0eToge1xuICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgeTogMSxcbiAgICAgICAgICAgICAgICBzY2FsZTogMC4wMDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib3VuZHM6IHsgXG4gICAgICAgICAgICAgICAgbWluOiB7IHg6IC1JbmZpbml0eSwgeTogLUluZmluaXR5IH0sIFxuICAgICAgICAgICAgICAgIG1heDogeyB4OiBJbmZpbml0eSwgeTogSW5maW5pdHkgfSBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBDb21tb24uZXh0ZW5kKGNvbXBvc2l0ZSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgIH07XG5cbiAgICAvKlxuICAgICpcbiAgICAqICBQcm9wZXJ0aWVzIERvY3VtZW50YXRpb25cbiAgICAqXG4gICAgKi9cblxuICAgIC8qKlxuICAgICAqIFRoZSBncmF2aXR5IHRvIGFwcGx5IG9uIHRoZSB3b3JsZC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBncmF2aXR5XG4gICAgICogQHR5cGUgb2JqZWN0XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBUaGUgZ3Jhdml0eSB4IGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBncmF2aXR5LnhcbiAgICAgKiBAdHlwZSBvYmplY3RcbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBUaGUgZ3Jhdml0eSB5IGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBncmF2aXR5LnlcbiAgICAgKiBAdHlwZSBvYmplY3RcbiAgICAgKiBAZGVmYXVsdCAxXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBUaGUgZ3Jhdml0eSBzY2FsZSBmYWN0b3IuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgZ3Jhdml0eS5zY2FsZVxuICAgICAqIEB0eXBlIG9iamVjdFxuICAgICAqIEBkZWZhdWx0IDAuMDAxXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBCb3VuZHNgIG9iamVjdCB0aGF0IGRlZmluZXMgdGhlIHdvcmxkIGJvdW5kcyBmb3IgY29sbGlzaW9uIGRldGVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBib3VuZHNcbiAgICAgKiBAdHlwZSBib3VuZHNcbiAgICAgKiBAZGVmYXVsdCB7IG1pbjogeyB4OiAtSW5maW5pdHksIHk6IC1JbmZpbml0eSB9LCBtYXg6IHsgeDogSW5maW5pdHksIHk6IEluZmluaXR5IH0gfVxuICAgICAqL1xuXG4gICAgLy8gV29ybGQgaXMgYSBDb21wb3NpdGUgYm9keVxuICAgIC8vIHNlZSBzcmMvbW9kdWxlL091dHJvLmpzIGZvciB0aGVzZSBhbGlhc2VzOlxuICAgIFxuICAgIC8qKlxuICAgICAqIEFuIGFsaWFzIGZvciBDb21wb3NpdGUuYWRkXG4gICAgICogQG1ldGhvZCBhZGRcbiAgICAgKiBAcGFyYW0ge3dvcmxkfSB3b3JsZFxuICAgICAqIEBwYXJhbSB7fSBvYmplY3RcbiAgICAgKiBAcmV0dXJuIHtjb21wb3NpdGV9IFRoZSBvcmlnaW5hbCB3b3JsZCB3aXRoIHRoZSBvYmplY3RzIGFkZGVkXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBbiBhbGlhcyBmb3IgQ29tcG9zaXRlLnJlbW92ZVxuICAgICAqIEBtZXRob2QgcmVtb3ZlXG4gICAgICogQHBhcmFtIHt3b3JsZH0gd29ybGRcbiAgICAgKiBAcGFyYW0ge30gb2JqZWN0XG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZGVlcD1mYWxzZV1cbiAgICAgKiBAcmV0dXJuIHtjb21wb3NpdGV9IFRoZSBvcmlnaW5hbCB3b3JsZCB3aXRoIHRoZSBvYmplY3RzIHJlbW92ZWRcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFuIGFsaWFzIGZvciBDb21wb3NpdGUuY2xlYXJcbiAgICAgKiBAbWV0aG9kIGNsZWFyXG4gICAgICogQHBhcmFtIHt3b3JsZH0gd29ybGRcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGtlZXBTdGF0aWNcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFuIGFsaWFzIGZvciBDb21wb3NpdGUuYWRkQ29tcG9zaXRlXG4gICAgICogQG1ldGhvZCBhZGRDb21wb3NpdGVcbiAgICAgKiBAcGFyYW0ge3dvcmxkfSB3b3JsZFxuICAgICAqIEBwYXJhbSB7Y29tcG9zaXRlfSBjb21wb3NpdGVcbiAgICAgKiBAcmV0dXJuIHt3b3JsZH0gVGhlIG9yaWdpbmFsIHdvcmxkIHdpdGggdGhlIG9iamVjdHMgZnJvbSBjb21wb3NpdGUgYWRkZWRcbiAgICAgKi9cbiAgICBcbiAgICAgLyoqXG4gICAgICAqIEFuIGFsaWFzIGZvciBDb21wb3NpdGUuYWRkQm9keVxuICAgICAgKiBAbWV0aG9kIGFkZEJvZHlcbiAgICAgICogQHBhcmFtIHt3b3JsZH0gd29ybGRcbiAgICAgICogQHBhcmFtIHtib2R5fSBib2R5XG4gICAgICAqIEByZXR1cm4ge3dvcmxkfSBUaGUgb3JpZ2luYWwgd29ybGQgd2l0aCB0aGUgYm9keSBhZGRlZFxuICAgICAgKi9cblxuICAgICAvKipcbiAgICAgICogQW4gYWxpYXMgZm9yIENvbXBvc2l0ZS5hZGRDb25zdHJhaW50XG4gICAgICAqIEBtZXRob2QgYWRkQ29uc3RyYWludFxuICAgICAgKiBAcGFyYW0ge3dvcmxkfSB3b3JsZFxuICAgICAgKiBAcGFyYW0ge2NvbnN0cmFpbnR9IGNvbnN0cmFpbnRcbiAgICAgICogQHJldHVybiB7d29ybGR9IFRoZSBvcmlnaW5hbCB3b3JsZCB3aXRoIHRoZSBjb25zdHJhaW50IGFkZGVkXG4gICAgICAqL1xuXG59KSgpO1xuXG59LHtcIi4uL2NvbnN0cmFpbnQvQ29uc3RyYWludFwiOjEyLFwiLi4vY29yZS9Db21tb25cIjoxNCxcIi4vQ29tcG9zaXRlXCI6Mn1dLDQ6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyLkNvbnRhY3RgIG1vZHVsZSBjb250YWlucyBtZXRob2RzIGZvciBjcmVhdGluZyBhbmQgbWFuaXB1bGF0aW5nIGNvbGxpc2lvbiBjb250YWN0cy5cbipcbiogQGNsYXNzIENvbnRhY3RcbiovXG5cbnZhciBDb250YWN0ID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGFjdDtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBjb250YWN0LlxuICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICogQHBhcmFtIHt2ZXJ0ZXh9IHZlcnRleFxuICAgICAqIEByZXR1cm4ge2NvbnRhY3R9IEEgbmV3IGNvbnRhY3RcbiAgICAgKi9cbiAgICBDb250YWN0LmNyZWF0ZSA9IGZ1bmN0aW9uKHZlcnRleCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IENvbnRhY3QuaWQodmVydGV4KSxcbiAgICAgICAgICAgIHZlcnRleDogdmVydGV4LFxuICAgICAgICAgICAgbm9ybWFsSW1wdWxzZTogMCxcbiAgICAgICAgICAgIHRhbmdlbnRJbXB1bHNlOiAwXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBjb250YWN0IGlkLlxuICAgICAqIEBtZXRob2QgaWRcbiAgICAgKiBAcGFyYW0ge3ZlcnRleH0gdmVydGV4XG4gICAgICogQHJldHVybiB7c3RyaW5nfSBVbmlxdWUgY29udGFjdElEXG4gICAgICovXG4gICAgQ29udGFjdC5pZCA9IGZ1bmN0aW9uKHZlcnRleCkge1xuICAgICAgICByZXR1cm4gdmVydGV4LmJvZHkuaWQgKyAnXycgKyB2ZXJ0ZXguaW5kZXg7XG4gICAgfTtcblxufSkoKTtcblxufSx7fV0sNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiogVGhlIGBNYXR0ZXIuRGV0ZWN0b3JgIG1vZHVsZSBjb250YWlucyBtZXRob2RzIGZvciBkZXRlY3RpbmcgY29sbGlzaW9ucyBnaXZlbiBhIHNldCBvZiBwYWlycy5cbipcbiogQGNsYXNzIERldGVjdG9yXG4qL1xuXG4vLyBUT0RPOiBzcGVjdWxhdGl2ZSBjb250YWN0c1xuXG52YXIgRGV0ZWN0b3IgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBEZXRlY3RvcjtcblxudmFyIFNBVCA9IF9kZXJlcV8oJy4vU0FUJyk7XG52YXIgUGFpciA9IF9kZXJlcV8oJy4vUGFpcicpO1xudmFyIEJvdW5kcyA9IF9kZXJlcV8oJy4uL2dlb21ldHJ5L0JvdW5kcycpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyBhbGwgY29sbGlzaW9ucyBnaXZlbiBhIGxpc3Qgb2YgcGFpcnMuXG4gICAgICogQG1ldGhvZCBjb2xsaXNpb25zXG4gICAgICogQHBhcmFtIHtwYWlyW119IGJyb2FkcGhhc2VQYWlyc1xuICAgICAqIEBwYXJhbSB7ZW5naW5lfSBlbmdpbmVcbiAgICAgKiBAcmV0dXJuIHthcnJheX0gY29sbGlzaW9uc1xuICAgICAqL1xuICAgIERldGVjdG9yLmNvbGxpc2lvbnMgPSBmdW5jdGlvbihicm9hZHBoYXNlUGFpcnMsIGVuZ2luZSkge1xuICAgICAgICB2YXIgY29sbGlzaW9ucyA9IFtdLFxuICAgICAgICAgICAgcGFpcnNUYWJsZSA9IGVuZ2luZS5wYWlycy50YWJsZTtcblxuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBicm9hZHBoYXNlUGFpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBib2R5QSA9IGJyb2FkcGhhc2VQYWlyc1tpXVswXSwgXG4gICAgICAgICAgICAgICAgYm9keUIgPSBicm9hZHBoYXNlUGFpcnNbaV1bMV07XG5cbiAgICAgICAgICAgIGlmICgoYm9keUEuaXNTdGF0aWMgfHwgYm9keUEuaXNTbGVlcGluZykgJiYgKGJvZHlCLmlzU3RhdGljIHx8IGJvZHlCLmlzU2xlZXBpbmcpKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIURldGVjdG9yLmNhbkNvbGxpZGUoYm9keUEuY29sbGlzaW9uRmlsdGVyLCBib2R5Qi5jb2xsaXNpb25GaWx0ZXIpKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG5cbiAgICAgICAgICAgIC8vIG1pZCBwaGFzZVxuICAgICAgICAgICAgaWYgKEJvdW5kcy5vdmVybGFwcyhib2R5QS5ib3VuZHMsIGJvZHlCLmJvdW5kcykpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gYm9keUEucGFydHMubGVuZ3RoID4gMSA/IDEgOiAwOyBqIDwgYm9keUEucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnRBID0gYm9keUEucGFydHNbal07XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IGJvZHlCLnBhcnRzLmxlbmd0aCA+IDEgPyAxIDogMDsgayA8IGJvZHlCLnBhcnRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFydEIgPSBib2R5Qi5wYXJ0c1trXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChwYXJ0QSA9PT0gYm9keUEgJiYgcGFydEIgPT09IGJvZHlCKSB8fCBCb3VuZHMub3ZlcmxhcHMocGFydEEuYm91bmRzLCBwYXJ0Qi5ib3VuZHMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmluZCBhIHByZXZpb3VzIGNvbGxpc2lvbiB3ZSBjb3VsZCByZXVzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYWlySWQgPSBQYWlyLmlkKHBhcnRBLCBwYXJ0QiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhaXIgPSBwYWlyc1RhYmxlW3BhaXJJZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzQ29sbGlzaW9uO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhaXIgJiYgcGFpci5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c0NvbGxpc2lvbiA9IHBhaXIuY29sbGlzaW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzQ29sbGlzaW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYXJyb3cgcGhhc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29sbGlzaW9uID0gU0FULmNvbGxpZGVzKHBhcnRBLCBwYXJ0QiwgcHJldmlvdXNDb2xsaXNpb24pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sbGlzaW9uLmNvbGxpZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbnMucHVzaChjb2xsaXNpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb2xsaXNpb25zO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiBib3RoIHN1cHBsaWVkIGNvbGxpc2lvbiBmaWx0ZXJzIHdpbGwgYWxsb3cgYSBjb2xsaXNpb24gdG8gb2NjdXIuXG4gICAgICogU2VlIGBib2R5LmNvbGxpc2lvbkZpbHRlcmAgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICogQG1ldGhvZCBjYW5Db2xsaWRlXG4gICAgICogQHBhcmFtIHt9IGZpbHRlckFcbiAgICAgKiBAcGFyYW0ge30gZmlsdGVyQlxuICAgICAqIEByZXR1cm4ge2Jvb2x9IGB0cnVlYCBpZiBjb2xsaXNpb24gY2FuIG9jY3VyXG4gICAgICovXG4gICAgRGV0ZWN0b3IuY2FuQ29sbGlkZSA9IGZ1bmN0aW9uKGZpbHRlckEsIGZpbHRlckIpIHtcbiAgICAgICAgaWYgKGZpbHRlckEuZ3JvdXAgPT09IGZpbHRlckIuZ3JvdXAgJiYgZmlsdGVyQS5ncm91cCAhPT0gMClcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJBLmdyb3VwID4gMDtcblxuICAgICAgICByZXR1cm4gKGZpbHRlckEubWFzayAmIGZpbHRlckIuY2F0ZWdvcnkpICE9PSAwICYmIChmaWx0ZXJCLm1hc2sgJiBmaWx0ZXJBLmNhdGVnb3J5KSAhPT0gMDtcbiAgICB9O1xuXG59KSgpO1xuXG59LHtcIi4uL2dlb21ldHJ5L0JvdW5kc1wiOjI2LFwiLi9QYWlyXCI6NyxcIi4vU0FUXCI6MTF9XSw2OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuKiBUaGUgYE1hdHRlci5HcmlkYCBtb2R1bGUgY29udGFpbnMgbWV0aG9kcyBmb3IgY3JlYXRpbmcgYW5kIG1hbmlwdWxhdGluZyBjb2xsaXNpb24gYnJvYWRwaGFzZSBncmlkIHN0cnVjdHVyZXMuXG4qXG4qIEBjbGFzcyBHcmlkXG4qL1xuXG52YXIgR3JpZCA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWQ7XG5cbnZhciBQYWlyID0gX2RlcmVxXygnLi9QYWlyJyk7XG52YXIgRGV0ZWN0b3IgPSBfZGVyZXFfKCcuL0RldGVjdG9yJyk7XG52YXIgQ29tbW9uID0gX2RlcmVxXygnLi4vY29yZS9Db21tb24nKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBncmlkLlxuICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICogQHBhcmFtIHt9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtncmlkfSBBIG5ldyBncmlkXG4gICAgICovXG4gICAgR3JpZC5jcmVhdGUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IEdyaWQsXG4gICAgICAgICAgICBkZXRlY3RvcjogRGV0ZWN0b3IuY29sbGlzaW9ucyxcbiAgICAgICAgICAgIGJ1Y2tldHM6IHt9LFxuICAgICAgICAgICAgcGFpcnM6IHt9LFxuICAgICAgICAgICAgcGFpcnNMaXN0OiBbXSxcbiAgICAgICAgICAgIGJ1Y2tldFdpZHRoOiA0OCxcbiAgICAgICAgICAgIGJ1Y2tldEhlaWdodDogNDhcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gQ29tbW9uLmV4dGVuZChkZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRoZSB3aWR0aCBvZiBhIHNpbmdsZSBncmlkIGJ1Y2tldC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBidWNrZXRXaWR0aFxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDQ4XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBUaGUgaGVpZ2h0IG9mIGEgc2luZ2xlIGdyaWQgYnVja2V0LlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGJ1Y2tldEhlaWdodFxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDQ4XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBncmlkLlxuICAgICAqIEBtZXRob2QgdXBkYXRlXG4gICAgICogQHBhcmFtIHtncmlkfSBncmlkXG4gICAgICogQHBhcmFtIHtib2R5W119IGJvZGllc1xuICAgICAqIEBwYXJhbSB7ZW5naW5lfSBlbmdpbmVcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZvcmNlVXBkYXRlXG4gICAgICovXG4gICAgR3JpZC51cGRhdGUgPSBmdW5jdGlvbihncmlkLCBib2RpZXMsIGVuZ2luZSwgZm9yY2VVcGRhdGUpIHtcbiAgICAgICAgdmFyIGksIGNvbCwgcm93LFxuICAgICAgICAgICAgd29ybGQgPSBlbmdpbmUud29ybGQsXG4gICAgICAgICAgICBidWNrZXRzID0gZ3JpZC5idWNrZXRzLFxuICAgICAgICAgICAgYnVja2V0LFxuICAgICAgICAgICAgYnVja2V0SWQsXG4gICAgICAgICAgICBncmlkQ2hhbmdlZCA9IGZhbHNlO1xuXG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGJvZGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGJvZHkgPSBib2RpZXNbaV07XG5cbiAgICAgICAgICAgIGlmIChib2R5LmlzU2xlZXBpbmcgJiYgIWZvcmNlVXBkYXRlKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAvLyBkb24ndCB1cGRhdGUgb3V0IG9mIHdvcmxkIGJvZGllc1xuICAgICAgICAgICAgaWYgKGJvZHkuYm91bmRzLm1heC54IDwgd29ybGQuYm91bmRzLm1pbi54IHx8IGJvZHkuYm91bmRzLm1pbi54ID4gd29ybGQuYm91bmRzLm1heC54XG4gICAgICAgICAgICAgICAgfHwgYm9keS5ib3VuZHMubWF4LnkgPCB3b3JsZC5ib3VuZHMubWluLnkgfHwgYm9keS5ib3VuZHMubWluLnkgPiB3b3JsZC5ib3VuZHMubWF4LnkpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIHZhciBuZXdSZWdpb24gPSBHcmlkLl9nZXRSZWdpb24oZ3JpZCwgYm9keSk7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBib2R5IGhhcyBjaGFuZ2VkIGdyaWQgcmVnaW9uXG4gICAgICAgICAgICBpZiAoIWJvZHkucmVnaW9uIHx8IG5ld1JlZ2lvbi5pZCAhPT0gYm9keS5yZWdpb24uaWQgfHwgZm9yY2VVcGRhdGUpIHtcblxuXG4gICAgICAgICAgICAgICAgaWYgKCFib2R5LnJlZ2lvbiB8fCBmb3JjZVVwZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgYm9keS5yZWdpb24gPSBuZXdSZWdpb247XG5cbiAgICAgICAgICAgICAgICB2YXIgdW5pb24gPSBHcmlkLl9yZWdpb25VbmlvbihuZXdSZWdpb24sIGJvZHkucmVnaW9uKTtcblxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBncmlkIGJ1Y2tldHMgYWZmZWN0ZWQgYnkgcmVnaW9uIGNoYW5nZVxuICAgICAgICAgICAgICAgIC8vIGl0ZXJhdGUgb3ZlciB0aGUgdW5pb24gb2YgYm90aCByZWdpb25zXG4gICAgICAgICAgICAgICAgZm9yIChjb2wgPSB1bmlvbi5zdGFydENvbDsgY29sIDw9IHVuaW9uLmVuZENvbDsgY29sKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChyb3cgPSB1bmlvbi5zdGFydFJvdzsgcm93IDw9IHVuaW9uLmVuZFJvdzsgcm93KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Y2tldElkID0gR3JpZC5fZ2V0QnVja2V0SWQoY29sLCByb3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVja2V0ID0gYnVja2V0c1tidWNrZXRJZF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0luc2lkZU5ld1JlZ2lvbiA9IChjb2wgPj0gbmV3UmVnaW9uLnN0YXJ0Q29sICYmIGNvbCA8PSBuZXdSZWdpb24uZW5kQ29sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiByb3cgPj0gbmV3UmVnaW9uLnN0YXJ0Um93ICYmIHJvdyA8PSBuZXdSZWdpb24uZW5kUm93KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzSW5zaWRlT2xkUmVnaW9uID0gKGNvbCA+PSBib2R5LnJlZ2lvbi5zdGFydENvbCAmJiBjb2wgPD0gYm9keS5yZWdpb24uZW5kQ29sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiByb3cgPj0gYm9keS5yZWdpb24uc3RhcnRSb3cgJiYgcm93IDw9IGJvZHkucmVnaW9uLmVuZFJvdyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBmcm9tIG9sZCByZWdpb24gYnVja2V0c1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0luc2lkZU5ld1JlZ2lvbiAmJiBpc0luc2lkZU9sZFJlZ2lvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0luc2lkZU9sZFJlZ2lvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnVja2V0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR3JpZC5fYnVja2V0UmVtb3ZlQm9keShncmlkLCBidWNrZXQsIGJvZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRvIG5ldyByZWdpb24gYnVja2V0c1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvZHkucmVnaW9uID09PSBuZXdSZWdpb24gfHwgKGlzSW5zaWRlTmV3UmVnaW9uICYmICFpc0luc2lkZU9sZFJlZ2lvbikgfHwgZm9yY2VVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWJ1Y2tldClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVja2V0ID0gR3JpZC5fY3JlYXRlQnVja2V0KGJ1Y2tldHMsIGJ1Y2tldElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHcmlkLl9idWNrZXRBZGRCb2R5KGdyaWQsIGJ1Y2tldCwgYm9keSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIG5ldyByZWdpb25cbiAgICAgICAgICAgICAgICBib2R5LnJlZ2lvbiA9IG5ld1JlZ2lvbjtcblxuICAgICAgICAgICAgICAgIC8vIGZsYWcgY2hhbmdlcyBzbyB3ZSBjYW4gdXBkYXRlIHBhaXJzXG4gICAgICAgICAgICAgICAgZ3JpZENoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIHBhaXJzIGxpc3Qgb25seSBpZiBwYWlycyBjaGFuZ2VkIChpLmUuIGEgYm9keSBjaGFuZ2VkIHJlZ2lvbilcbiAgICAgICAgaWYgKGdyaWRDaGFuZ2VkKVxuICAgICAgICAgICAgZ3JpZC5wYWlyc0xpc3QgPSBHcmlkLl9jcmVhdGVBY3RpdmVQYWlyc0xpc3QoZ3JpZCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgZ3JpZC5cbiAgICAgKiBAbWV0aG9kIGNsZWFyXG4gICAgICogQHBhcmFtIHtncmlkfSBncmlkXG4gICAgICovXG4gICAgR3JpZC5jbGVhciA9IGZ1bmN0aW9uKGdyaWQpIHtcbiAgICAgICAgZ3JpZC5idWNrZXRzID0ge307XG4gICAgICAgIGdyaWQucGFpcnMgPSB7fTtcbiAgICAgICAgZ3JpZC5wYWlyc0xpc3QgPSBbXTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRmluZHMgdGhlIHVuaW9uIG9mIHR3byByZWdpb25zLlxuICAgICAqIEBtZXRob2QgX3JlZ2lvblVuaW9uXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge30gcmVnaW9uQVxuICAgICAqIEBwYXJhbSB7fSByZWdpb25CXG4gICAgICogQHJldHVybiB7fSByZWdpb25cbiAgICAgKi9cbiAgICBHcmlkLl9yZWdpb25VbmlvbiA9IGZ1bmN0aW9uKHJlZ2lvbkEsIHJlZ2lvbkIpIHtcbiAgICAgICAgdmFyIHN0YXJ0Q29sID0gTWF0aC5taW4ocmVnaW9uQS5zdGFydENvbCwgcmVnaW9uQi5zdGFydENvbCksXG4gICAgICAgICAgICBlbmRDb2wgPSBNYXRoLm1heChyZWdpb25BLmVuZENvbCwgcmVnaW9uQi5lbmRDb2wpLFxuICAgICAgICAgICAgc3RhcnRSb3cgPSBNYXRoLm1pbihyZWdpb25BLnN0YXJ0Um93LCByZWdpb25CLnN0YXJ0Um93KSxcbiAgICAgICAgICAgIGVuZFJvdyA9IE1hdGgubWF4KHJlZ2lvbkEuZW5kUm93LCByZWdpb25CLmVuZFJvdyk7XG5cbiAgICAgICAgcmV0dXJuIEdyaWQuX2NyZWF0ZVJlZ2lvbihzdGFydENvbCwgZW5kQ29sLCBzdGFydFJvdywgZW5kUm93KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcmVnaW9uIGEgZ2l2ZW4gYm9keSBmYWxscyBpbiBmb3IgYSBnaXZlbiBncmlkLlxuICAgICAqIEBtZXRob2QgX2dldFJlZ2lvblxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHt9IGdyaWRcbiAgICAgKiBAcGFyYW0ge30gYm9keVxuICAgICAqIEByZXR1cm4ge30gcmVnaW9uXG4gICAgICovXG4gICAgR3JpZC5fZ2V0UmVnaW9uID0gZnVuY3Rpb24oZ3JpZCwgYm9keSkge1xuICAgICAgICB2YXIgYm91bmRzID0gYm9keS5ib3VuZHMsXG4gICAgICAgICAgICBzdGFydENvbCA9IE1hdGguZmxvb3IoYm91bmRzLm1pbi54IC8gZ3JpZC5idWNrZXRXaWR0aCksXG4gICAgICAgICAgICBlbmRDb2wgPSBNYXRoLmZsb29yKGJvdW5kcy5tYXgueCAvIGdyaWQuYnVja2V0V2lkdGgpLFxuICAgICAgICAgICAgc3RhcnRSb3cgPSBNYXRoLmZsb29yKGJvdW5kcy5taW4ueSAvIGdyaWQuYnVja2V0SGVpZ2h0KSxcbiAgICAgICAgICAgIGVuZFJvdyA9IE1hdGguZmxvb3IoYm91bmRzLm1heC55IC8gZ3JpZC5idWNrZXRIZWlnaHQpO1xuXG4gICAgICAgIHJldHVybiBHcmlkLl9jcmVhdGVSZWdpb24oc3RhcnRDb2wsIGVuZENvbCwgc3RhcnRSb3csIGVuZFJvdyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSByZWdpb24uXG4gICAgICogQG1ldGhvZCBfY3JlYXRlUmVnaW9uXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge30gc3RhcnRDb2xcbiAgICAgKiBAcGFyYW0ge30gZW5kQ29sXG4gICAgICogQHBhcmFtIHt9IHN0YXJ0Um93XG4gICAgICogQHBhcmFtIHt9IGVuZFJvd1xuICAgICAqIEByZXR1cm4ge30gcmVnaW9uXG4gICAgICovXG4gICAgR3JpZC5fY3JlYXRlUmVnaW9uID0gZnVuY3Rpb24oc3RhcnRDb2wsIGVuZENvbCwgc3RhcnRSb3csIGVuZFJvdykge1xuICAgICAgICByZXR1cm4geyBcbiAgICAgICAgICAgIGlkOiBzdGFydENvbCArICcsJyArIGVuZENvbCArICcsJyArIHN0YXJ0Um93ICsgJywnICsgZW5kUm93LFxuICAgICAgICAgICAgc3RhcnRDb2w6IHN0YXJ0Q29sLCBcbiAgICAgICAgICAgIGVuZENvbDogZW5kQ29sLCBcbiAgICAgICAgICAgIHN0YXJ0Um93OiBzdGFydFJvdywgXG4gICAgICAgICAgICBlbmRSb3c6IGVuZFJvdyBcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgYnVja2V0IGlkIGF0IHRoZSBnaXZlbiBwb3NpdGlvbi5cbiAgICAgKiBAbWV0aG9kIF9nZXRCdWNrZXRJZFxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHt9IGNvbHVtblxuICAgICAqIEBwYXJhbSB7fSByb3dcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IGJ1Y2tldCBpZFxuICAgICAqL1xuICAgIEdyaWQuX2dldEJ1Y2tldElkID0gZnVuY3Rpb24oY29sdW1uLCByb3cpIHtcbiAgICAgICAgcmV0dXJuICdDJyArIGNvbHVtbiArICdSJyArIHJvdztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGJ1Y2tldC5cbiAgICAgKiBAbWV0aG9kIF9jcmVhdGVCdWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7fSBidWNrZXRzXG4gICAgICogQHBhcmFtIHt9IGJ1Y2tldElkXG4gICAgICogQHJldHVybiB7fSBidWNrZXRcbiAgICAgKi9cbiAgICBHcmlkLl9jcmVhdGVCdWNrZXQgPSBmdW5jdGlvbihidWNrZXRzLCBidWNrZXRJZCkge1xuICAgICAgICB2YXIgYnVja2V0ID0gYnVja2V0c1tidWNrZXRJZF0gPSBbXTtcbiAgICAgICAgcmV0dXJuIGJ1Y2tldDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGJvZHkgdG8gYSBidWNrZXQuXG4gICAgICogQG1ldGhvZCBfYnVja2V0QWRkQm9keVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHt9IGdyaWRcbiAgICAgKiBAcGFyYW0ge30gYnVja2V0XG4gICAgICogQHBhcmFtIHt9IGJvZHlcbiAgICAgKi9cbiAgICBHcmlkLl9idWNrZXRBZGRCb2R5ID0gZnVuY3Rpb24oZ3JpZCwgYnVja2V0LCBib2R5KSB7XG4gICAgICAgIC8vIGFkZCBuZXcgcGFpcnNcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidWNrZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBib2R5QiA9IGJ1Y2tldFtpXTtcblxuICAgICAgICAgICAgaWYgKGJvZHkuaWQgPT09IGJvZHlCLmlkIHx8IChib2R5LmlzU3RhdGljICYmIGJvZHlCLmlzU3RhdGljKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgLy8ga2VlcCB0cmFjayBvZiB0aGUgbnVtYmVyIG9mIGJ1Y2tldHMgdGhlIHBhaXIgZXhpc3RzIGluXG4gICAgICAgICAgICAvLyBpbXBvcnRhbnQgZm9yIEdyaWQudXBkYXRlIHRvIHdvcmtcbiAgICAgICAgICAgIHZhciBwYWlySWQgPSBQYWlyLmlkKGJvZHksIGJvZHlCKSxcbiAgICAgICAgICAgICAgICBwYWlyID0gZ3JpZC5wYWlyc1twYWlySWRdO1xuXG4gICAgICAgICAgICBpZiAocGFpcikge1xuICAgICAgICAgICAgICAgIHBhaXJbMl0gKz0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZ3JpZC5wYWlyc1twYWlySWRdID0gW2JvZHksIGJvZHlCLCAxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCB0byBib2RpZXMgKGFmdGVyIHBhaXJzLCBvdGhlcndpc2UgcGFpcnMgd2l0aCBzZWxmKVxuICAgICAgICBidWNrZXQucHVzaChib2R5KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIGJvZHkgZnJvbSBhIGJ1Y2tldC5cbiAgICAgKiBAbWV0aG9kIF9idWNrZXRSZW1vdmVCb2R5XG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge30gZ3JpZFxuICAgICAqIEBwYXJhbSB7fSBidWNrZXRcbiAgICAgKiBAcGFyYW0ge30gYm9keVxuICAgICAqL1xuICAgIEdyaWQuX2J1Y2tldFJlbW92ZUJvZHkgPSBmdW5jdGlvbihncmlkLCBidWNrZXQsIGJvZHkpIHtcbiAgICAgICAgLy8gcmVtb3ZlIGZyb20gYnVja2V0XG4gICAgICAgIGJ1Y2tldC5zcGxpY2UoQ29tbW9uLmluZGV4T2YoYnVja2V0LCBib2R5KSwgMSk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHBhaXIgY291bnRzXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnVja2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIHRoZSBudW1iZXIgb2YgYnVja2V0cyB0aGUgcGFpciBleGlzdHMgaW5cbiAgICAgICAgICAgIC8vIGltcG9ydGFudCBmb3IgX2NyZWF0ZUFjdGl2ZVBhaXJzTGlzdCB0byB3b3JrXG4gICAgICAgICAgICB2YXIgYm9keUIgPSBidWNrZXRbaV0sXG4gICAgICAgICAgICAgICAgcGFpcklkID0gUGFpci5pZChib2R5LCBib2R5QiksXG4gICAgICAgICAgICAgICAgcGFpciA9IGdyaWQucGFpcnNbcGFpcklkXTtcblxuICAgICAgICAgICAgaWYgKHBhaXIpXG4gICAgICAgICAgICAgICAgcGFpclsyXSAtPSAxO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIGxpc3Qgb2YgdGhlIGFjdGl2ZSBwYWlycyBpbiB0aGUgZ3JpZC5cbiAgICAgKiBAbWV0aG9kIF9jcmVhdGVBY3RpdmVQYWlyc0xpc3RcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7fSBncmlkXG4gICAgICogQHJldHVybiBbXSBwYWlyc1xuICAgICAqL1xuICAgIEdyaWQuX2NyZWF0ZUFjdGl2ZVBhaXJzTGlzdCA9IGZ1bmN0aW9uKGdyaWQpIHtcbiAgICAgICAgdmFyIHBhaXJLZXlzLFxuICAgICAgICAgICAgcGFpcixcbiAgICAgICAgICAgIHBhaXJzID0gW107XG5cbiAgICAgICAgLy8gZ3JpZC5wYWlycyBpcyB1c2VkIGFzIGEgaGFzaG1hcFxuICAgICAgICBwYWlyS2V5cyA9IENvbW1vbi5rZXlzKGdyaWQucGFpcnMpO1xuXG4gICAgICAgIC8vIGl0ZXJhdGUgb3ZlciBncmlkLnBhaXJzXG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgcGFpcktleXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgIHBhaXIgPSBncmlkLnBhaXJzW3BhaXJLZXlzW2tdXTtcblxuICAgICAgICAgICAgLy8gaWYgcGFpciBleGlzdHMgaW4gYXQgbGVhc3Qgb25lIGJ1Y2tldFxuICAgICAgICAgICAgLy8gaXQgaXMgYSBwYWlyIHRoYXQgbmVlZHMgZnVydGhlciBjb2xsaXNpb24gdGVzdGluZyBzbyBwdXNoIGl0XG4gICAgICAgICAgICBpZiAocGFpclsyXSA+IDApIHtcbiAgICAgICAgICAgICAgICBwYWlycy5wdXNoKHBhaXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgZ3JpZC5wYWlyc1twYWlyS2V5c1trXV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFpcnM7XG4gICAgfTtcbiAgICBcbn0pKCk7XG5cbn0se1wiLi4vY29yZS9Db21tb25cIjoxNCxcIi4vRGV0ZWN0b3JcIjo1LFwiLi9QYWlyXCI6N31dLDc6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyLlBhaXJgIG1vZHVsZSBjb250YWlucyBtZXRob2RzIGZvciBjcmVhdGluZyBhbmQgbWFuaXB1bGF0aW5nIGNvbGxpc2lvbiBwYWlycy5cbipcbiogQGNsYXNzIFBhaXJcbiovXG5cbnZhciBQYWlyID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gUGFpcjtcblxudmFyIENvbnRhY3QgPSBfZGVyZXFfKCcuL0NvbnRhY3QnKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBwYWlyLlxuICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICogQHBhcmFtIHtjb2xsaXNpb259IGNvbGxpc2lvblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXBcbiAgICAgKiBAcmV0dXJuIHtwYWlyfSBBIG5ldyBwYWlyXG4gICAgICovXG4gICAgUGFpci5jcmVhdGUgPSBmdW5jdGlvbihjb2xsaXNpb24sIHRpbWVzdGFtcCkge1xuICAgICAgICB2YXIgYm9keUEgPSBjb2xsaXNpb24uYm9keUEsXG4gICAgICAgICAgICBib2R5QiA9IGNvbGxpc2lvbi5ib2R5QixcbiAgICAgICAgICAgIHBhcmVudEEgPSBjb2xsaXNpb24ucGFyZW50QSxcbiAgICAgICAgICAgIHBhcmVudEIgPSBjb2xsaXNpb24ucGFyZW50QjtcblxuICAgICAgICB2YXIgcGFpciA9IHtcbiAgICAgICAgICAgIGlkOiBQYWlyLmlkKGJvZHlBLCBib2R5QiksXG4gICAgICAgICAgICBib2R5QTogYm9keUEsXG4gICAgICAgICAgICBib2R5QjogYm9keUIsXG4gICAgICAgICAgICBjb250YWN0czoge30sXG4gICAgICAgICAgICBhY3RpdmVDb250YWN0czogW10sXG4gICAgICAgICAgICBzZXBhcmF0aW9uOiAwLFxuICAgICAgICAgICAgaXNBY3RpdmU6IHRydWUsXG4gICAgICAgICAgICBpc1NlbnNvcjogYm9keUEuaXNTZW5zb3IgfHwgYm9keUIuaXNTZW5zb3IsXG4gICAgICAgICAgICB0aW1lQ3JlYXRlZDogdGltZXN0YW1wLFxuICAgICAgICAgICAgdGltZVVwZGF0ZWQ6IHRpbWVzdGFtcCxcbiAgICAgICAgICAgIGludmVyc2VNYXNzOiBwYXJlbnRBLmludmVyc2VNYXNzICsgcGFyZW50Qi5pbnZlcnNlTWFzcyxcbiAgICAgICAgICAgIGZyaWN0aW9uOiBNYXRoLm1pbihwYXJlbnRBLmZyaWN0aW9uLCBwYXJlbnRCLmZyaWN0aW9uKSxcbiAgICAgICAgICAgIGZyaWN0aW9uU3RhdGljOiBNYXRoLm1heChwYXJlbnRBLmZyaWN0aW9uU3RhdGljLCBwYXJlbnRCLmZyaWN0aW9uU3RhdGljKSxcbiAgICAgICAgICAgIHJlc3RpdHV0aW9uOiBNYXRoLm1heChwYXJlbnRBLnJlc3RpdHV0aW9uLCBwYXJlbnRCLnJlc3RpdHV0aW9uKSxcbiAgICAgICAgICAgIHNsb3A6IE1hdGgubWF4KHBhcmVudEEuc2xvcCwgcGFyZW50Qi5zbG9wKVxuICAgICAgICB9O1xuXG4gICAgICAgIFBhaXIudXBkYXRlKHBhaXIsIGNvbGxpc2lvbiwgdGltZXN0YW1wKTtcblxuICAgICAgICByZXR1cm4gcGFpcjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBhIHBhaXIgZ2l2ZW4gYSBjb2xsaXNpb24uXG4gICAgICogQG1ldGhvZCB1cGRhdGVcbiAgICAgKiBAcGFyYW0ge3BhaXJ9IHBhaXJcbiAgICAgKiBAcGFyYW0ge2NvbGxpc2lvbn0gY29sbGlzaW9uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcFxuICAgICAqL1xuICAgIFBhaXIudXBkYXRlID0gZnVuY3Rpb24ocGFpciwgY29sbGlzaW9uLCB0aW1lc3RhbXApIHtcbiAgICAgICAgdmFyIGNvbnRhY3RzID0gcGFpci5jb250YWN0cyxcbiAgICAgICAgICAgIHN1cHBvcnRzID0gY29sbGlzaW9uLnN1cHBvcnRzLFxuICAgICAgICAgICAgYWN0aXZlQ29udGFjdHMgPSBwYWlyLmFjdGl2ZUNvbnRhY3RzLFxuICAgICAgICAgICAgcGFyZW50QSA9IGNvbGxpc2lvbi5wYXJlbnRBLFxuICAgICAgICAgICAgcGFyZW50QiA9IGNvbGxpc2lvbi5wYXJlbnRCO1xuICAgICAgICBcbiAgICAgICAgcGFpci5jb2xsaXNpb24gPSBjb2xsaXNpb247XG4gICAgICAgIHBhaXIuaW52ZXJzZU1hc3MgPSBwYXJlbnRBLmludmVyc2VNYXNzICsgcGFyZW50Qi5pbnZlcnNlTWFzcztcbiAgICAgICAgcGFpci5mcmljdGlvbiA9IE1hdGgubWluKHBhcmVudEEuZnJpY3Rpb24sIHBhcmVudEIuZnJpY3Rpb24pO1xuICAgICAgICBwYWlyLmZyaWN0aW9uU3RhdGljID0gTWF0aC5tYXgocGFyZW50QS5mcmljdGlvblN0YXRpYywgcGFyZW50Qi5mcmljdGlvblN0YXRpYyk7XG4gICAgICAgIHBhaXIucmVzdGl0dXRpb24gPSBNYXRoLm1heChwYXJlbnRBLnJlc3RpdHV0aW9uLCBwYXJlbnRCLnJlc3RpdHV0aW9uKTtcbiAgICAgICAgcGFpci5zbG9wID0gTWF0aC5tYXgocGFyZW50QS5zbG9wLCBwYXJlbnRCLnNsb3ApO1xuICAgICAgICBhY3RpdmVDb250YWN0cy5sZW5ndGggPSAwO1xuICAgICAgICBcbiAgICAgICAgaWYgKGNvbGxpc2lvbi5jb2xsaWRlZCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdXBwb3J0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBzdXBwb3J0ID0gc3VwcG9ydHNbaV0sXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhY3RJZCA9IENvbnRhY3QuaWQoc3VwcG9ydCksXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhY3QgPSBjb250YWN0c1tjb250YWN0SWRdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRhY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlQ29udGFjdHMucHVzaChjb250YWN0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVDb250YWN0cy5wdXNoKGNvbnRhY3RzW2NvbnRhY3RJZF0gPSBDb250YWN0LmNyZWF0ZShzdXBwb3J0KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYWlyLnNlcGFyYXRpb24gPSBjb2xsaXNpb24uZGVwdGg7XG4gICAgICAgICAgICBQYWlyLnNldEFjdGl2ZShwYWlyLCB0cnVlLCB0aW1lc3RhbXApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHBhaXIuaXNBY3RpdmUgPT09IHRydWUpXG4gICAgICAgICAgICAgICAgUGFpci5zZXRBY3RpdmUocGFpciwgZmFsc2UsIHRpbWVzdGFtcCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIFNldCBhIHBhaXIgYXMgYWN0aXZlIG9yIGluYWN0aXZlLlxuICAgICAqIEBtZXRob2Qgc2V0QWN0aXZlXG4gICAgICogQHBhcmFtIHtwYWlyfSBwYWlyXG4gICAgICogQHBhcmFtIHtib29sfSBpc0FjdGl2ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXBcbiAgICAgKi9cbiAgICBQYWlyLnNldEFjdGl2ZSA9IGZ1bmN0aW9uKHBhaXIsIGlzQWN0aXZlLCB0aW1lc3RhbXApIHtcbiAgICAgICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICAgICAgICBwYWlyLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHBhaXIudGltZVVwZGF0ZWQgPSB0aW1lc3RhbXA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYWlyLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBwYWlyLmFjdGl2ZUNvbnRhY3RzLmxlbmd0aCA9IDA7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBpZCBmb3IgdGhlIGdpdmVuIHBhaXIuXG4gICAgICogQG1ldGhvZCBpZFxuICAgICAqIEBwYXJhbSB7Ym9keX0gYm9keUFcbiAgICAgKiBAcGFyYW0ge2JvZHl9IGJvZHlCXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBVbmlxdWUgcGFpcklkXG4gICAgICovXG4gICAgUGFpci5pZCA9IGZ1bmN0aW9uKGJvZHlBLCBib2R5Qikge1xuICAgICAgICBpZiAoYm9keUEuaWQgPCBib2R5Qi5pZCkge1xuICAgICAgICAgICAgcmV0dXJuICdBJyArIGJvZHlBLmlkICsgJ0InICsgYm9keUIuaWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ0EnICsgYm9keUIuaWQgKyAnQicgKyBib2R5QS5pZDtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pKCk7XG5cbn0se1wiLi9Db250YWN0XCI6NH1dLDg6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyLlBhaXJzYCBtb2R1bGUgY29udGFpbnMgbWV0aG9kcyBmb3IgY3JlYXRpbmcgYW5kIG1hbmlwdWxhdGluZyBjb2xsaXNpb24gcGFpciBzZXRzLlxuKlxuKiBAY2xhc3MgUGFpcnNcbiovXG5cbnZhciBQYWlycyA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhaXJzO1xuXG52YXIgUGFpciA9IF9kZXJlcV8oJy4vUGFpcicpO1xudmFyIENvbW1vbiA9IF9kZXJlcV8oJy4uL2NvcmUvQ29tbW9uJyk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICBQYWlycy5fcGFpck1heElkbGVMaWZlID0gMTAwMDtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgcGFpcnMgc3RydWN0dXJlLlxuICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtwYWlyc30gQSBuZXcgcGFpcnMgc3RydWN0dXJlXG4gICAgICovXG4gICAgUGFpcnMuY3JlYXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gQ29tbW9uLmV4dGVuZCh7IFxuICAgICAgICAgICAgdGFibGU6IHt9LFxuICAgICAgICAgICAgbGlzdDogW10sXG4gICAgICAgICAgICBjb2xsaXNpb25TdGFydDogW10sXG4gICAgICAgICAgICBjb2xsaXNpb25BY3RpdmU6IFtdLFxuICAgICAgICAgICAgY29sbGlzaW9uRW5kOiBbXVxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBwYWlycyBnaXZlbiBhIGxpc3Qgb2YgY29sbGlzaW9ucy5cbiAgICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwYWlyc1xuICAgICAqIEBwYXJhbSB7Y29sbGlzaW9uW119IGNvbGxpc2lvbnNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZXN0YW1wXG4gICAgICovXG4gICAgUGFpcnMudXBkYXRlID0gZnVuY3Rpb24ocGFpcnMsIGNvbGxpc2lvbnMsIHRpbWVzdGFtcCkge1xuICAgICAgICB2YXIgcGFpcnNMaXN0ID0gcGFpcnMubGlzdCxcbiAgICAgICAgICAgIHBhaXJzVGFibGUgPSBwYWlycy50YWJsZSxcbiAgICAgICAgICAgIGNvbGxpc2lvblN0YXJ0ID0gcGFpcnMuY29sbGlzaW9uU3RhcnQsXG4gICAgICAgICAgICBjb2xsaXNpb25FbmQgPSBwYWlycy5jb2xsaXNpb25FbmQsXG4gICAgICAgICAgICBjb2xsaXNpb25BY3RpdmUgPSBwYWlycy5jb2xsaXNpb25BY3RpdmUsXG4gICAgICAgICAgICBhY3RpdmVQYWlySWRzID0gW10sXG4gICAgICAgICAgICBjb2xsaXNpb24sXG4gICAgICAgICAgICBwYWlySWQsXG4gICAgICAgICAgICBwYWlyLFxuICAgICAgICAgICAgaTtcblxuICAgICAgICAvLyBjbGVhciBjb2xsaXNpb24gc3RhdGUgYXJyYXlzLCBidXQgbWFpbnRhaW4gb2xkIHJlZmVyZW5jZVxuICAgICAgICBjb2xsaXNpb25TdGFydC5sZW5ndGggPSAwO1xuICAgICAgICBjb2xsaXNpb25FbmQubGVuZ3RoID0gMDtcbiAgICAgICAgY29sbGlzaW9uQWN0aXZlLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvbGxpc2lvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbGxpc2lvbiA9IGNvbGxpc2lvbnNbaV07XG5cbiAgICAgICAgICAgIGlmIChjb2xsaXNpb24uY29sbGlkZWQpIHtcbiAgICAgICAgICAgICAgICBwYWlySWQgPSBQYWlyLmlkKGNvbGxpc2lvbi5ib2R5QSwgY29sbGlzaW9uLmJvZHlCKTtcbiAgICAgICAgICAgICAgICBhY3RpdmVQYWlySWRzLnB1c2gocGFpcklkKTtcblxuICAgICAgICAgICAgICAgIHBhaXIgPSBwYWlyc1RhYmxlW3BhaXJJZF07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHBhaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcGFpciBhbHJlYWR5IGV4aXN0cyAoYnV0IG1heSBvciBtYXkgbm90IGJlIGFjdGl2ZSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhaXIuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhaXIgZXhpc3RzIGFuZCBpcyBhY3RpdmVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbkFjdGl2ZS5wdXNoKHBhaXIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGFpciBleGlzdHMgYnV0IHdhcyBpbmFjdGl2ZSwgc28gYSBjb2xsaXNpb24gaGFzIGp1c3Qgc3RhcnRlZCBhZ2FpblxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uU3RhcnQucHVzaChwYWlyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgcGFpclxuICAgICAgICAgICAgICAgICAgICBQYWlyLnVwZGF0ZShwYWlyLCBjb2xsaXNpb24sIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcGFpciBkaWQgbm90IGV4aXN0LCBjcmVhdGUgYSBuZXcgcGFpclxuICAgICAgICAgICAgICAgICAgICBwYWlyID0gUGFpci5jcmVhdGUoY29sbGlzaW9uLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgICAgICBwYWlyc1RhYmxlW3BhaXJJZF0gPSBwYWlyO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHB1c2ggdGhlIG5ldyBwYWlyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvblN0YXJ0LnB1c2gocGFpcik7XG4gICAgICAgICAgICAgICAgICAgIHBhaXJzTGlzdC5wdXNoKHBhaXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRlYWN0aXZhdGUgcHJldmlvdXNseSBhY3RpdmUgcGFpcnMgdGhhdCBhcmUgbm93IGluYWN0aXZlXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYWlyc0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBhaXIgPSBwYWlyc0xpc3RbaV07XG4gICAgICAgICAgICBpZiAocGFpci5pc0FjdGl2ZSAmJiBDb21tb24uaW5kZXhPZihhY3RpdmVQYWlySWRzLCBwYWlyLmlkKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBQYWlyLnNldEFjdGl2ZShwYWlyLCBmYWxzZSwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25FbmQucHVzaChwYWlyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogRmluZHMgYW5kIHJlbW92ZXMgcGFpcnMgdGhhdCBoYXZlIGJlZW4gaW5hY3RpdmUgZm9yIGEgc2V0IGFtb3VudCBvZiB0aW1lLlxuICAgICAqIEBtZXRob2QgcmVtb3ZlT2xkXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHBhaXJzXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcFxuICAgICAqL1xuICAgIFBhaXJzLnJlbW92ZU9sZCA9IGZ1bmN0aW9uKHBhaXJzLCB0aW1lc3RhbXApIHtcbiAgICAgICAgdmFyIHBhaXJzTGlzdCA9IHBhaXJzLmxpc3QsXG4gICAgICAgICAgICBwYWlyc1RhYmxlID0gcGFpcnMudGFibGUsXG4gICAgICAgICAgICBpbmRleGVzVG9SZW1vdmUgPSBbXSxcbiAgICAgICAgICAgIHBhaXIsXG4gICAgICAgICAgICBjb2xsaXNpb24sXG4gICAgICAgICAgICBwYWlySW5kZXgsXG4gICAgICAgICAgICBpO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYWlyc0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBhaXIgPSBwYWlyc0xpc3RbaV07XG4gICAgICAgICAgICBjb2xsaXNpb24gPSBwYWlyLmNvbGxpc2lvbjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gbmV2ZXIgcmVtb3ZlIHNsZWVwaW5nIHBhaXJzXG4gICAgICAgICAgICBpZiAoY29sbGlzaW9uLmJvZHlBLmlzU2xlZXBpbmcgfHwgY29sbGlzaW9uLmJvZHlCLmlzU2xlZXBpbmcpIHtcbiAgICAgICAgICAgICAgICBwYWlyLnRpbWVVcGRhdGVkID0gdGltZXN0YW1wO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiBwYWlyIGlzIGluYWN0aXZlIGZvciB0b28gbG9uZywgbWFyayBpdCB0byBiZSByZW1vdmVkXG4gICAgICAgICAgICBpZiAodGltZXN0YW1wIC0gcGFpci50aW1lVXBkYXRlZCA+IFBhaXJzLl9wYWlyTWF4SWRsZUxpZmUpIHtcbiAgICAgICAgICAgICAgICBpbmRleGVzVG9SZW1vdmUucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSBtYXJrZWQgcGFpcnNcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGluZGV4ZXNUb1JlbW92ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcGFpckluZGV4ID0gaW5kZXhlc1RvUmVtb3ZlW2ldIC0gaTtcbiAgICAgICAgICAgIHBhaXIgPSBwYWlyc0xpc3RbcGFpckluZGV4XTtcbiAgICAgICAgICAgIGRlbGV0ZSBwYWlyc1RhYmxlW3BhaXIuaWRdO1xuICAgICAgICAgICAgcGFpcnNMaXN0LnNwbGljZShwYWlySW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgZ2l2ZW4gcGFpcnMgc3RydWN0dXJlLlxuICAgICAqIEBtZXRob2QgY2xlYXJcbiAgICAgKiBAcGFyYW0ge3BhaXJzfSBwYWlyc1xuICAgICAqIEByZXR1cm4ge3BhaXJzfSBwYWlyc1xuICAgICAqL1xuICAgIFBhaXJzLmNsZWFyID0gZnVuY3Rpb24ocGFpcnMpIHtcbiAgICAgICAgcGFpcnMudGFibGUgPSB7fTtcbiAgICAgICAgcGFpcnMubGlzdC5sZW5ndGggPSAwO1xuICAgICAgICBwYWlycy5jb2xsaXNpb25TdGFydC5sZW5ndGggPSAwO1xuICAgICAgICBwYWlycy5jb2xsaXNpb25BY3RpdmUubGVuZ3RoID0gMDtcbiAgICAgICAgcGFpcnMuY29sbGlzaW9uRW5kLmxlbmd0aCA9IDA7XG4gICAgICAgIHJldHVybiBwYWlycztcbiAgICB9O1xuXG59KSgpO1xuXG59LHtcIi4uL2NvcmUvQ29tbW9uXCI6MTQsXCIuL1BhaXJcIjo3fV0sOTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiogVGhlIGBNYXR0ZXIuUXVlcnlgIG1vZHVsZSBjb250YWlucyBtZXRob2RzIGZvciBwZXJmb3JtaW5nIGNvbGxpc2lvbiBxdWVyaWVzLlxuKlxuKiBTZWUgdGhlIGluY2x1ZGVkIHVzYWdlIFtleGFtcGxlc10oaHR0cHM6Ly9naXRodWIuY29tL2xpYWJydS9tYXR0ZXItanMvdHJlZS9tYXN0ZXIvZXhhbXBsZXMpLlxuKlxuKiBAY2xhc3MgUXVlcnlcbiovXG5cbnZhciBRdWVyeSA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFF1ZXJ5O1xuXG52YXIgVmVjdG9yID0gX2RlcmVxXygnLi4vZ2VvbWV0cnkvVmVjdG9yJyk7XG52YXIgU0FUID0gX2RlcmVxXygnLi9TQVQnKTtcbnZhciBCb3VuZHMgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9Cb3VuZHMnKTtcbnZhciBCb2RpZXMgPSBfZGVyZXFfKCcuLi9mYWN0b3J5L0JvZGllcycpO1xudmFyIFZlcnRpY2VzID0gX2RlcmVxXygnLi4vZ2VvbWV0cnkvVmVydGljZXMnKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgY29sbGlzaW9ucyBiZXR3ZWVuIGBib2R5YCBhbmQgYGJvZGllc2AuXG4gICAgICogQG1ldGhvZCBjb2xsaWRlc1xuICAgICAqIEBwYXJhbSB7Ym9keX0gYm9keVxuICAgICAqIEBwYXJhbSB7Ym9keVtdfSBib2RpZXNcbiAgICAgKiBAcmV0dXJuIHtvYmplY3RbXX0gQ29sbGlzaW9uc1xuICAgICAqL1xuICAgIFF1ZXJ5LmNvbGxpZGVzID0gZnVuY3Rpb24oYm9keSwgYm9kaWVzKSB7XG4gICAgICAgIHZhciBjb2xsaXNpb25zID0gW107XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBib2R5QSA9IGJvZGllc1tpXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKEJvdW5kcy5vdmVybGFwcyhib2R5QS5ib3VuZHMsIGJvZHkuYm91bmRzKSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSBib2R5QS5wYXJ0cy5sZW5ndGggPT09IDEgPyAwIDogMTsgaiA8IGJvZHlBLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0ID0gYm9keUEucGFydHNbal07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKEJvdW5kcy5vdmVybGFwcyhwYXJ0LmJvdW5kcywgYm9keS5ib3VuZHMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29sbGlzaW9uID0gU0FULmNvbGxpZGVzKHBhcnQsIGJvZHkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sbGlzaW9uLmNvbGxpZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9ucy5wdXNoKGNvbGxpc2lvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29sbGlzaW9ucztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2FzdHMgYSByYXkgc2VnbWVudCBhZ2FpbnN0IGEgc2V0IG9mIGJvZGllcyBhbmQgcmV0dXJucyBhbGwgY29sbGlzaW9ucywgcmF5IHdpZHRoIGlzIG9wdGlvbmFsLiBJbnRlcnNlY3Rpb24gcG9pbnRzIGFyZSBub3QgcHJvdmlkZWQuXG4gICAgICogQG1ldGhvZCByYXlcbiAgICAgKiBAcGFyYW0ge2JvZHlbXX0gYm9kaWVzXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHN0YXJ0UG9pbnRcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gZW5kUG9pbnRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3JheVdpZHRoXVxuICAgICAqIEByZXR1cm4ge29iamVjdFtdfSBDb2xsaXNpb25zXG4gICAgICovXG4gICAgUXVlcnkucmF5ID0gZnVuY3Rpb24oYm9kaWVzLCBzdGFydFBvaW50LCBlbmRQb2ludCwgcmF5V2lkdGgpIHtcbiAgICAgICAgcmF5V2lkdGggPSByYXlXaWR0aCB8fCAxZS0xMDA7XG5cbiAgICAgICAgdmFyIHJheUFuZ2xlID0gVmVjdG9yLmFuZ2xlKHN0YXJ0UG9pbnQsIGVuZFBvaW50KSxcbiAgICAgICAgICAgIHJheUxlbmd0aCA9IFZlY3Rvci5tYWduaXR1ZGUoVmVjdG9yLnN1YihzdGFydFBvaW50LCBlbmRQb2ludCkpLFxuICAgICAgICAgICAgcmF5WCA9IChlbmRQb2ludC54ICsgc3RhcnRQb2ludC54KSAqIDAuNSxcbiAgICAgICAgICAgIHJheVkgPSAoZW5kUG9pbnQueSArIHN0YXJ0UG9pbnQueSkgKiAwLjUsXG4gICAgICAgICAgICByYXkgPSBCb2RpZXMucmVjdGFuZ2xlKHJheVgsIHJheVksIHJheUxlbmd0aCwgcmF5V2lkdGgsIHsgYW5nbGU6IHJheUFuZ2xlIH0pLFxuICAgICAgICAgICAgY29sbGlzaW9ucyA9IFF1ZXJ5LmNvbGxpZGVzKHJheSwgYm9kaWVzKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbGxpc2lvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHZhciBjb2xsaXNpb24gPSBjb2xsaXNpb25zW2ldO1xuICAgICAgICAgICAgY29sbGlzaW9uLmJvZHkgPSBjb2xsaXNpb24uYm9keUIgPSBjb2xsaXNpb24uYm9keUE7ICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29sbGlzaW9ucztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgYm9kaWVzIHdob3NlIGJvdW5kcyBhcmUgaW5zaWRlIChvciBvdXRzaWRlIGlmIHNldCkgdGhlIGdpdmVuIHNldCBvZiBib3VuZHMsIGZyb20gdGhlIGdpdmVuIHNldCBvZiBib2RpZXMuXG4gICAgICogQG1ldGhvZCByZWdpb25cbiAgICAgKiBAcGFyYW0ge2JvZHlbXX0gYm9kaWVzXG4gICAgICogQHBhcmFtIHtib3VuZHN9IGJvdW5kc1xuICAgICAqIEBwYXJhbSB7Ym9vbH0gW291dHNpZGU9ZmFsc2VdXG4gICAgICogQHJldHVybiB7Ym9keVtdfSBUaGUgYm9kaWVzIG1hdGNoaW5nIHRoZSBxdWVyeVxuICAgICAqL1xuICAgIFF1ZXJ5LnJlZ2lvbiA9IGZ1bmN0aW9uKGJvZGllcywgYm91bmRzLCBvdXRzaWRlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvZGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGJvZHkgPSBib2RpZXNbaV0sXG4gICAgICAgICAgICAgICAgb3ZlcmxhcHMgPSBCb3VuZHMub3ZlcmxhcHMoYm9keS5ib3VuZHMsIGJvdW5kcyk7XG4gICAgICAgICAgICBpZiAoKG92ZXJsYXBzICYmICFvdXRzaWRlKSB8fCAoIW92ZXJsYXBzICYmIG91dHNpZGUpKVxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGJvZHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgYm9kaWVzIHdob3NlIHZlcnRpY2VzIGNvbnRhaW4gdGhlIGdpdmVuIHBvaW50LCBmcm9tIHRoZSBnaXZlbiBzZXQgb2YgYm9kaWVzLlxuICAgICAqIEBtZXRob2QgcG9pbnRcbiAgICAgKiBAcGFyYW0ge2JvZHlbXX0gYm9kaWVzXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHBvaW50XG4gICAgICogQHJldHVybiB7Ym9keVtdfSBUaGUgYm9kaWVzIG1hdGNoaW5nIHRoZSBxdWVyeVxuICAgICAqL1xuICAgIFF1ZXJ5LnBvaW50ID0gZnVuY3Rpb24oYm9kaWVzLCBwb2ludCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBib2R5ID0gYm9kaWVzW2ldO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoQm91bmRzLmNvbnRhaW5zKGJvZHkuYm91bmRzLCBwb2ludCkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gYm9keS5wYXJ0cy5sZW5ndGggPT09IDEgPyAwIDogMTsgaiA8IGJvZHkucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnQgPSBib2R5LnBhcnRzW2pdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChCb3VuZHMuY29udGFpbnMocGFydC5ib3VuZHMsIHBvaW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgVmVydGljZXMuY29udGFpbnMocGFydC52ZXJ0aWNlcywgcG9pbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG59KSgpO1xuXG59LHtcIi4uL2ZhY3RvcnkvQm9kaWVzXCI6MjMsXCIuLi9nZW9tZXRyeS9Cb3VuZHNcIjoyNixcIi4uL2dlb21ldHJ5L1ZlY3RvclwiOjI4LFwiLi4vZ2VvbWV0cnkvVmVydGljZXNcIjoyOSxcIi4vU0FUXCI6MTF9XSwxMDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiogVGhlIGBNYXR0ZXIuUmVzb2x2ZXJgIG1vZHVsZSBjb250YWlucyBtZXRob2RzIGZvciByZXNvbHZpbmcgY29sbGlzaW9uIHBhaXJzLlxuKlxuKiBAY2xhc3MgUmVzb2x2ZXJcbiovXG5cbnZhciBSZXNvbHZlciA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc29sdmVyO1xuXG52YXIgVmVydGljZXMgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9WZXJ0aWNlcycpO1xudmFyIFZlY3RvciA9IF9kZXJlcV8oJy4uL2dlb21ldHJ5L1ZlY3RvcicpO1xudmFyIENvbW1vbiA9IF9kZXJlcV8oJy4uL2NvcmUvQ29tbW9uJyk7XG52YXIgQm91bmRzID0gX2RlcmVxXygnLi4vZ2VvbWV0cnkvQm91bmRzJyk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIFJlc29sdmVyLl9yZXN0aW5nVGhyZXNoID0gNDtcbiAgICBSZXNvbHZlci5fcmVzdGluZ1RocmVzaFRhbmdlbnQgPSA2O1xuICAgIFJlc29sdmVyLl9wb3NpdGlvbkRhbXBlbiA9IDAuOTtcbiAgICBSZXNvbHZlci5fcG9zaXRpb25XYXJtaW5nID0gMC44O1xuICAgIFJlc29sdmVyLl9mcmljdGlvbk5vcm1hbE11bHRpcGxpZXIgPSA1O1xuXG4gICAgLyoqXG4gICAgICogUHJlcGFyZSBwYWlycyBmb3IgcG9zaXRpb24gc29sdmluZy5cbiAgICAgKiBAbWV0aG9kIHByZVNvbHZlUG9zaXRpb25cbiAgICAgKiBAcGFyYW0ge3BhaXJbXX0gcGFpcnNcbiAgICAgKi9cbiAgICBSZXNvbHZlci5wcmVTb2x2ZVBvc2l0aW9uID0gZnVuY3Rpb24ocGFpcnMpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBwYWlyLFxuICAgICAgICAgICAgYWN0aXZlQ291bnQ7XG5cbiAgICAgICAgLy8gZmluZCB0b3RhbCBjb250YWN0cyBvbiBlYWNoIGJvZHlcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwYWlyID0gcGFpcnNbaV07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghcGFpci5pc0FjdGl2ZSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYWN0aXZlQ291bnQgPSBwYWlyLmFjdGl2ZUNvbnRhY3RzLmxlbmd0aDtcbiAgICAgICAgICAgIHBhaXIuY29sbGlzaW9uLnBhcmVudEEudG90YWxDb250YWN0cyArPSBhY3RpdmVDb3VudDtcbiAgICAgICAgICAgIHBhaXIuY29sbGlzaW9uLnBhcmVudEIudG90YWxDb250YWN0cyArPSBhY3RpdmVDb3VudDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGaW5kIGEgc29sdXRpb24gZm9yIHBhaXIgcG9zaXRpb25zLlxuICAgICAqIEBtZXRob2Qgc29sdmVQb3NpdGlvblxuICAgICAqIEBwYXJhbSB7cGFpcltdfSBwYWlyc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lU2NhbGVcbiAgICAgKi9cbiAgICBSZXNvbHZlci5zb2x2ZVBvc2l0aW9uID0gZnVuY3Rpb24ocGFpcnMsIHRpbWVTY2FsZSkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIHBhaXIsXG4gICAgICAgICAgICBjb2xsaXNpb24sXG4gICAgICAgICAgICBib2R5QSxcbiAgICAgICAgICAgIGJvZHlCLFxuICAgICAgICAgICAgbm9ybWFsLFxuICAgICAgICAgICAgYm9keUJ0b0EsXG4gICAgICAgICAgICBjb250YWN0U2hhcmUsXG4gICAgICAgICAgICBwb3NpdGlvbkltcHVsc2UsXG4gICAgICAgICAgICBjb250YWN0Q291bnQgPSB7fSxcbiAgICAgICAgICAgIHRlbXBBID0gVmVjdG9yLl90ZW1wWzBdLFxuICAgICAgICAgICAgdGVtcEIgPSBWZWN0b3IuX3RlbXBbMV0sXG4gICAgICAgICAgICB0ZW1wQyA9IFZlY3Rvci5fdGVtcFsyXSxcbiAgICAgICAgICAgIHRlbXBEID0gVmVjdG9yLl90ZW1wWzNdO1xuXG4gICAgICAgIC8vIGZpbmQgaW1wdWxzZXMgcmVxdWlyZWQgdG8gcmVzb2x2ZSBwZW5ldHJhdGlvblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBhaXIgPSBwYWlyc1tpXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFwYWlyLmlzQWN0aXZlIHx8IHBhaXIuaXNTZW5zb3IpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIGNvbGxpc2lvbiA9IHBhaXIuY29sbGlzaW9uO1xuICAgICAgICAgICAgYm9keUEgPSBjb2xsaXNpb24ucGFyZW50QTtcbiAgICAgICAgICAgIGJvZHlCID0gY29sbGlzaW9uLnBhcmVudEI7XG4gICAgICAgICAgICBub3JtYWwgPSBjb2xsaXNpb24ubm9ybWFsO1xuXG4gICAgICAgICAgICAvLyBnZXQgY3VycmVudCBzZXBhcmF0aW9uIGJldHdlZW4gYm9keSBlZGdlcyBpbnZvbHZlZCBpbiBjb2xsaXNpb25cbiAgICAgICAgICAgIGJvZHlCdG9BID0gVmVjdG9yLnN1YihWZWN0b3IuYWRkKGJvZHlCLnBvc2l0aW9uSW1wdWxzZSwgYm9keUIucG9zaXRpb24sIHRlbXBBKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWZWN0b3IuYWRkKGJvZHlBLnBvc2l0aW9uSW1wdWxzZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVmVjdG9yLnN1Yihib2R5Qi5wb3NpdGlvbiwgY29sbGlzaW9uLnBlbmV0cmF0aW9uLCB0ZW1wQiksIHRlbXBDKSwgdGVtcEQpO1xuXG4gICAgICAgICAgICBwYWlyLnNlcGFyYXRpb24gPSBWZWN0b3IuZG90KG5vcm1hbCwgYm9keUJ0b0EpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBhaXIgPSBwYWlyc1tpXTtcblxuICAgICAgICAgICAgaWYgKCFwYWlyLmlzQWN0aXZlIHx8IHBhaXIuaXNTZW5zb3IpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbGxpc2lvbiA9IHBhaXIuY29sbGlzaW9uO1xuICAgICAgICAgICAgYm9keUEgPSBjb2xsaXNpb24ucGFyZW50QTtcbiAgICAgICAgICAgIGJvZHlCID0gY29sbGlzaW9uLnBhcmVudEI7XG4gICAgICAgICAgICBub3JtYWwgPSBjb2xsaXNpb24ubm9ybWFsO1xuICAgICAgICAgICAgcG9zaXRpb25JbXB1bHNlID0gKHBhaXIuc2VwYXJhdGlvbiAtIHBhaXIuc2xvcCkgKiB0aW1lU2NhbGU7XG5cbiAgICAgICAgICAgIGlmIChib2R5QS5pc1N0YXRpYyB8fCBib2R5Qi5pc1N0YXRpYylcbiAgICAgICAgICAgICAgICBwb3NpdGlvbkltcHVsc2UgKj0gMjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCEoYm9keUEuaXNTdGF0aWMgfHwgYm9keUEuaXNTbGVlcGluZykpIHtcbiAgICAgICAgICAgICAgICBjb250YWN0U2hhcmUgPSBSZXNvbHZlci5fcG9zaXRpb25EYW1wZW4gLyBib2R5QS50b3RhbENvbnRhY3RzO1xuICAgICAgICAgICAgICAgIGJvZHlBLnBvc2l0aW9uSW1wdWxzZS54ICs9IG5vcm1hbC54ICogcG9zaXRpb25JbXB1bHNlICogY29udGFjdFNoYXJlO1xuICAgICAgICAgICAgICAgIGJvZHlBLnBvc2l0aW9uSW1wdWxzZS55ICs9IG5vcm1hbC55ICogcG9zaXRpb25JbXB1bHNlICogY29udGFjdFNoYXJlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIShib2R5Qi5pc1N0YXRpYyB8fCBib2R5Qi5pc1NsZWVwaW5nKSkge1xuICAgICAgICAgICAgICAgIGNvbnRhY3RTaGFyZSA9IFJlc29sdmVyLl9wb3NpdGlvbkRhbXBlbiAvIGJvZHlCLnRvdGFsQ29udGFjdHM7XG4gICAgICAgICAgICAgICAgYm9keUIucG9zaXRpb25JbXB1bHNlLnggLT0gbm9ybWFsLnggKiBwb3NpdGlvbkltcHVsc2UgKiBjb250YWN0U2hhcmU7XG4gICAgICAgICAgICAgICAgYm9keUIucG9zaXRpb25JbXB1bHNlLnkgLT0gbm9ybWFsLnkgKiBwb3NpdGlvbkltcHVsc2UgKiBjb250YWN0U2hhcmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQXBwbHkgcG9zaXRpb24gcmVzb2x1dGlvbi5cbiAgICAgKiBAbWV0aG9kIHBvc3RTb2x2ZVBvc2l0aW9uXG4gICAgICogQHBhcmFtIHtib2R5W119IGJvZGllc1xuICAgICAqL1xuICAgIFJlc29sdmVyLnBvc3RTb2x2ZVBvc2l0aW9uID0gZnVuY3Rpb24oYm9kaWVzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm9kaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYm9keSA9IGJvZGllc1tpXTtcblxuICAgICAgICAgICAgLy8gcmVzZXQgY29udGFjdCBjb3VudFxuICAgICAgICAgICAgYm9keS50b3RhbENvbnRhY3RzID0gMDtcblxuICAgICAgICAgICAgaWYgKGJvZHkucG9zaXRpb25JbXB1bHNlLnggIT09IDAgfHwgYm9keS5wb3NpdGlvbkltcHVsc2UueSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBib2R5IGdlb21ldHJ5XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBib2R5LnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0ID0gYm9keS5wYXJ0c1tqXTtcbiAgICAgICAgICAgICAgICAgICAgVmVydGljZXMudHJhbnNsYXRlKHBhcnQudmVydGljZXMsIGJvZHkucG9zaXRpb25JbXB1bHNlKTtcbiAgICAgICAgICAgICAgICAgICAgQm91bmRzLnVwZGF0ZShwYXJ0LmJvdW5kcywgcGFydC52ZXJ0aWNlcywgYm9keS52ZWxvY2l0eSk7XG4gICAgICAgICAgICAgICAgICAgIHBhcnQucG9zaXRpb24ueCArPSBib2R5LnBvc2l0aW9uSW1wdWxzZS54O1xuICAgICAgICAgICAgICAgICAgICBwYXJ0LnBvc2l0aW9uLnkgKz0gYm9keS5wb3NpdGlvbkltcHVsc2UueTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBtb3ZlIHRoZSBib2R5IHdpdGhvdXQgY2hhbmdpbmcgdmVsb2NpdHlcbiAgICAgICAgICAgICAgICBib2R5LnBvc2l0aW9uUHJldi54ICs9IGJvZHkucG9zaXRpb25JbXB1bHNlLng7XG4gICAgICAgICAgICAgICAgYm9keS5wb3NpdGlvblByZXYueSArPSBib2R5LnBvc2l0aW9uSW1wdWxzZS55O1xuXG4gICAgICAgICAgICAgICAgaWYgKFZlY3Rvci5kb3QoYm9keS5wb3NpdGlvbkltcHVsc2UsIGJvZHkudmVsb2NpdHkpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyByZXNldCBjYWNoZWQgaW1wdWxzZSBpZiB0aGUgYm9keSBoYXMgdmVsb2NpdHkgYWxvbmcgaXRcbiAgICAgICAgICAgICAgICAgICAgYm9keS5wb3NpdGlvbkltcHVsc2UueCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkucG9zaXRpb25JbXB1bHNlLnkgPSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHdhcm0gdGhlIG5leHQgaXRlcmF0aW9uXG4gICAgICAgICAgICAgICAgICAgIGJvZHkucG9zaXRpb25JbXB1bHNlLnggKj0gUmVzb2x2ZXIuX3Bvc2l0aW9uV2FybWluZztcbiAgICAgICAgICAgICAgICAgICAgYm9keS5wb3NpdGlvbkltcHVsc2UueSAqPSBSZXNvbHZlci5fcG9zaXRpb25XYXJtaW5nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQcmVwYXJlIHBhaXJzIGZvciB2ZWxvY2l0eSBzb2x2aW5nLlxuICAgICAqIEBtZXRob2QgcHJlU29sdmVWZWxvY2l0eVxuICAgICAqIEBwYXJhbSB7cGFpcltdfSBwYWlyc1xuICAgICAqL1xuICAgIFJlc29sdmVyLnByZVNvbHZlVmVsb2NpdHkgPSBmdW5jdGlvbihwYWlycykge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGosXG4gICAgICAgICAgICBwYWlyLFxuICAgICAgICAgICAgY29udGFjdHMsXG4gICAgICAgICAgICBjb2xsaXNpb24sXG4gICAgICAgICAgICBib2R5QSxcbiAgICAgICAgICAgIGJvZHlCLFxuICAgICAgICAgICAgbm9ybWFsLFxuICAgICAgICAgICAgdGFuZ2VudCxcbiAgICAgICAgICAgIGNvbnRhY3QsXG4gICAgICAgICAgICBjb250YWN0VmVydGV4LFxuICAgICAgICAgICAgbm9ybWFsSW1wdWxzZSxcbiAgICAgICAgICAgIHRhbmdlbnRJbXB1bHNlLFxuICAgICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgICAgaW1wdWxzZSA9IFZlY3Rvci5fdGVtcFswXSxcbiAgICAgICAgICAgIHRlbXBBID0gVmVjdG9yLl90ZW1wWzFdO1xuICAgICAgICBcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwYWlyID0gcGFpcnNbaV07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghcGFpci5pc0FjdGl2ZSB8fCBwYWlyLmlzU2Vuc29yKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb250YWN0cyA9IHBhaXIuYWN0aXZlQ29udGFjdHM7XG4gICAgICAgICAgICBjb2xsaXNpb24gPSBwYWlyLmNvbGxpc2lvbjtcbiAgICAgICAgICAgIGJvZHlBID0gY29sbGlzaW9uLnBhcmVudEE7XG4gICAgICAgICAgICBib2R5QiA9IGNvbGxpc2lvbi5wYXJlbnRCO1xuICAgICAgICAgICAgbm9ybWFsID0gY29sbGlzaW9uLm5vcm1hbDtcbiAgICAgICAgICAgIHRhbmdlbnQgPSBjb2xsaXNpb24udGFuZ2VudDtcblxuICAgICAgICAgICAgLy8gcmVzb2x2ZSBlYWNoIGNvbnRhY3RcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBjb250YWN0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnRhY3QgPSBjb250YWN0c1tqXTtcbiAgICAgICAgICAgICAgICBjb250YWN0VmVydGV4ID0gY29udGFjdC52ZXJ0ZXg7XG4gICAgICAgICAgICAgICAgbm9ybWFsSW1wdWxzZSA9IGNvbnRhY3Qubm9ybWFsSW1wdWxzZTtcbiAgICAgICAgICAgICAgICB0YW5nZW50SW1wdWxzZSA9IGNvbnRhY3QudGFuZ2VudEltcHVsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsSW1wdWxzZSAhPT0gMCB8fCB0YW5nZW50SW1wdWxzZSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0b3RhbCBpbXB1bHNlIGZyb20gY29udGFjdFxuICAgICAgICAgICAgICAgICAgICBpbXB1bHNlLnggPSAobm9ybWFsLnggKiBub3JtYWxJbXB1bHNlKSArICh0YW5nZW50LnggKiB0YW5nZW50SW1wdWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGltcHVsc2UueSA9IChub3JtYWwueSAqIG5vcm1hbEltcHVsc2UpICsgKHRhbmdlbnQueSAqIHRhbmdlbnRJbXB1bHNlKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIGFwcGx5IGltcHVsc2UgZnJvbSBjb250YWN0XG4gICAgICAgICAgICAgICAgICAgIGlmICghKGJvZHlBLmlzU3RhdGljIHx8IGJvZHlBLmlzU2xlZXBpbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBWZWN0b3Iuc3ViKGNvbnRhY3RWZXJ0ZXgsIGJvZHlBLnBvc2l0aW9uLCB0ZW1wQSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5QS5wb3NpdGlvblByZXYueCArPSBpbXB1bHNlLnggKiBib2R5QS5pbnZlcnNlTWFzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHlBLnBvc2l0aW9uUHJldi55ICs9IGltcHVsc2UueSAqIGJvZHlBLmludmVyc2VNYXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keUEuYW5nbGVQcmV2ICs9IFZlY3Rvci5jcm9zcyhvZmZzZXQsIGltcHVsc2UpICogYm9keUEuaW52ZXJzZUluZXJ0aWE7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIShib2R5Qi5pc1N0YXRpYyB8fCBib2R5Qi5pc1NsZWVwaW5nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gVmVjdG9yLnN1Yihjb250YWN0VmVydGV4LCBib2R5Qi5wb3NpdGlvbiwgdGVtcEEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keUIucG9zaXRpb25QcmV2LnggLT0gaW1wdWxzZS54ICogYm9keUIuaW52ZXJzZU1hc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5Qi5wb3NpdGlvblByZXYueSAtPSBpbXB1bHNlLnkgKiBib2R5Qi5pbnZlcnNlTWFzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHlCLmFuZ2xlUHJldiAtPSBWZWN0b3IuY3Jvc3Mob2Zmc2V0LCBpbXB1bHNlKSAqIGJvZHlCLmludmVyc2VJbmVydGlhO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZpbmQgYSBzb2x1dGlvbiBmb3IgcGFpciB2ZWxvY2l0aWVzLlxuICAgICAqIEBtZXRob2Qgc29sdmVWZWxvY2l0eVxuICAgICAqIEBwYXJhbSB7cGFpcltdfSBwYWlyc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lU2NhbGVcbiAgICAgKi9cbiAgICBSZXNvbHZlci5zb2x2ZVZlbG9jaXR5ID0gZnVuY3Rpb24ocGFpcnMsIHRpbWVTY2FsZSkge1xuICAgICAgICB2YXIgdGltZVNjYWxlU3F1YXJlZCA9IHRpbWVTY2FsZSAqIHRpbWVTY2FsZSxcbiAgICAgICAgICAgIGltcHVsc2UgPSBWZWN0b3IuX3RlbXBbMF0sXG4gICAgICAgICAgICB0ZW1wQSA9IFZlY3Rvci5fdGVtcFsxXSxcbiAgICAgICAgICAgIHRlbXBCID0gVmVjdG9yLl90ZW1wWzJdLFxuICAgICAgICAgICAgdGVtcEMgPSBWZWN0b3IuX3RlbXBbM10sXG4gICAgICAgICAgICB0ZW1wRCA9IFZlY3Rvci5fdGVtcFs0XSxcbiAgICAgICAgICAgIHRlbXBFID0gVmVjdG9yLl90ZW1wWzVdO1xuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHBhaXIgPSBwYWlyc1tpXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFwYWlyLmlzQWN0aXZlIHx8IHBhaXIuaXNTZW5zb3IpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBjb2xsaXNpb24gPSBwYWlyLmNvbGxpc2lvbixcbiAgICAgICAgICAgICAgICBib2R5QSA9IGNvbGxpc2lvbi5wYXJlbnRBLFxuICAgICAgICAgICAgICAgIGJvZHlCID0gY29sbGlzaW9uLnBhcmVudEIsXG4gICAgICAgICAgICAgICAgbm9ybWFsID0gY29sbGlzaW9uLm5vcm1hbCxcbiAgICAgICAgICAgICAgICB0YW5nZW50ID0gY29sbGlzaW9uLnRhbmdlbnQsXG4gICAgICAgICAgICAgICAgY29udGFjdHMgPSBwYWlyLmFjdGl2ZUNvbnRhY3RzLFxuICAgICAgICAgICAgICAgIGNvbnRhY3RTaGFyZSA9IDEgLyBjb250YWN0cy5sZW5ndGg7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBib2R5IHZlbG9jaXRpZXNcbiAgICAgICAgICAgIGJvZHlBLnZlbG9jaXR5LnggPSBib2R5QS5wb3NpdGlvbi54IC0gYm9keUEucG9zaXRpb25QcmV2Lng7XG4gICAgICAgICAgICBib2R5QS52ZWxvY2l0eS55ID0gYm9keUEucG9zaXRpb24ueSAtIGJvZHlBLnBvc2l0aW9uUHJldi55O1xuICAgICAgICAgICAgYm9keUIudmVsb2NpdHkueCA9IGJvZHlCLnBvc2l0aW9uLnggLSBib2R5Qi5wb3NpdGlvblByZXYueDtcbiAgICAgICAgICAgIGJvZHlCLnZlbG9jaXR5LnkgPSBib2R5Qi5wb3NpdGlvbi55IC0gYm9keUIucG9zaXRpb25QcmV2Lnk7XG4gICAgICAgICAgICBib2R5QS5hbmd1bGFyVmVsb2NpdHkgPSBib2R5QS5hbmdsZSAtIGJvZHlBLmFuZ2xlUHJldjtcbiAgICAgICAgICAgIGJvZHlCLmFuZ3VsYXJWZWxvY2l0eSA9IGJvZHlCLmFuZ2xlIC0gYm9keUIuYW5nbGVQcmV2O1xuXG4gICAgICAgICAgICAvLyByZXNvbHZlIGVhY2ggY29udGFjdFxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb250YWN0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHZhciBjb250YWN0ID0gY29udGFjdHNbal0sXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhY3RWZXJ0ZXggPSBjb250YWN0LnZlcnRleCxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0QSA9IFZlY3Rvci5zdWIoY29udGFjdFZlcnRleCwgYm9keUEucG9zaXRpb24sIHRlbXBBKSxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0QiA9IFZlY3Rvci5zdWIoY29udGFjdFZlcnRleCwgYm9keUIucG9zaXRpb24sIHRlbXBCKSxcbiAgICAgICAgICAgICAgICAgICAgdmVsb2NpdHlQb2ludEEgPSBWZWN0b3IuYWRkKGJvZHlBLnZlbG9jaXR5LCBWZWN0b3IubXVsdChWZWN0b3IucGVycChvZmZzZXRBKSwgYm9keUEuYW5ndWxhclZlbG9jaXR5KSwgdGVtcEMpLFxuICAgICAgICAgICAgICAgICAgICB2ZWxvY2l0eVBvaW50QiA9IFZlY3Rvci5hZGQoYm9keUIudmVsb2NpdHksIFZlY3Rvci5tdWx0KFZlY3Rvci5wZXJwKG9mZnNldEIpLCBib2R5Qi5hbmd1bGFyVmVsb2NpdHkpLCB0ZW1wRCksIFxuICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVZlbG9jaXR5ID0gVmVjdG9yLnN1Yih2ZWxvY2l0eVBvaW50QSwgdmVsb2NpdHlQb2ludEIsIHRlbXBFKSxcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsVmVsb2NpdHkgPSBWZWN0b3IuZG90KG5vcm1hbCwgcmVsYXRpdmVWZWxvY2l0eSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgdGFuZ2VudFZlbG9jaXR5ID0gVmVjdG9yLmRvdCh0YW5nZW50LCByZWxhdGl2ZVZlbG9jaXR5KSxcbiAgICAgICAgICAgICAgICAgICAgdGFuZ2VudFNwZWVkID0gTWF0aC5hYnModGFuZ2VudFZlbG9jaXR5KSxcbiAgICAgICAgICAgICAgICAgICAgdGFuZ2VudFZlbG9jaXR5RGlyZWN0aW9uID0gQ29tbW9uLnNpZ24odGFuZ2VudFZlbG9jaXR5KTtcblxuICAgICAgICAgICAgICAgIC8vIHJhdyBpbXB1bHNlc1xuICAgICAgICAgICAgICAgIHZhciBub3JtYWxJbXB1bHNlID0gKDEgKyBwYWlyLnJlc3RpdHV0aW9uKSAqIG5vcm1hbFZlbG9jaXR5LFxuICAgICAgICAgICAgICAgICAgICBub3JtYWxGb3JjZSA9IENvbW1vbi5jbGFtcChwYWlyLnNlcGFyYXRpb24gKyBub3JtYWxWZWxvY2l0eSwgMCwgMSkgKiBSZXNvbHZlci5fZnJpY3Rpb25Ob3JtYWxNdWx0aXBsaWVyO1xuXG4gICAgICAgICAgICAgICAgLy8gY291bG9tYiBmcmljdGlvblxuICAgICAgICAgICAgICAgIHZhciB0YW5nZW50SW1wdWxzZSA9IHRhbmdlbnRWZWxvY2l0eSxcbiAgICAgICAgICAgICAgICAgICAgbWF4RnJpY3Rpb24gPSBJbmZpbml0eTtcblxuICAgICAgICAgICAgICAgIGlmICh0YW5nZW50U3BlZWQgPiBwYWlyLmZyaWN0aW9uICogcGFpci5mcmljdGlvblN0YXRpYyAqIG5vcm1hbEZvcmNlICogdGltZVNjYWxlU3F1YXJlZCkge1xuICAgICAgICAgICAgICAgICAgICBtYXhGcmljdGlvbiA9IHRhbmdlbnRTcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgdGFuZ2VudEltcHVsc2UgPSBDb21tb24uY2xhbXAoXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWlyLmZyaWN0aW9uICogdGFuZ2VudFZlbG9jaXR5RGlyZWN0aW9uICogdGltZVNjYWxlU3F1YXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC1tYXhGcmljdGlvbiwgbWF4RnJpY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBtb2RpZnkgaW1wdWxzZXMgYWNjb3VudGluZyBmb3IgbWFzcywgaW5lcnRpYSBhbmQgb2Zmc2V0XG4gICAgICAgICAgICAgICAgdmFyIG9BY04gPSBWZWN0b3IuY3Jvc3Mob2Zmc2V0QSwgbm9ybWFsKSxcbiAgICAgICAgICAgICAgICAgICAgb0JjTiA9IFZlY3Rvci5jcm9zcyhvZmZzZXRCLCBub3JtYWwpLFxuICAgICAgICAgICAgICAgICAgICBzaGFyZSA9IGNvbnRhY3RTaGFyZSAvIChib2R5QS5pbnZlcnNlTWFzcyArIGJvZHlCLmludmVyc2VNYXNzICsgYm9keUEuaW52ZXJzZUluZXJ0aWEgKiBvQWNOICogb0FjTiAgKyBib2R5Qi5pbnZlcnNlSW5lcnRpYSAqIG9CY04gKiBvQmNOKTtcblxuICAgICAgICAgICAgICAgIG5vcm1hbEltcHVsc2UgKj0gc2hhcmU7XG4gICAgICAgICAgICAgICAgdGFuZ2VudEltcHVsc2UgKj0gc2hhcmU7XG5cbiAgICAgICAgICAgICAgICAvLyBoYW5kbGUgaGlnaCB2ZWxvY2l0eSBhbmQgcmVzdGluZyBjb2xsaXNpb25zIHNlcGFyYXRlbHlcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsVmVsb2NpdHkgPCAwICYmIG5vcm1hbFZlbG9jaXR5ICogbm9ybWFsVmVsb2NpdHkgPiBSZXNvbHZlci5fcmVzdGluZ1RocmVzaCAqIHRpbWVTY2FsZVNxdWFyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaGlnaCBub3JtYWwgdmVsb2NpdHkgc28gY2xlYXIgY2FjaGVkIGNvbnRhY3Qgbm9ybWFsIGltcHVsc2VcbiAgICAgICAgICAgICAgICAgICAgY29udGFjdC5ub3JtYWxJbXB1bHNlID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBzb2x2ZSByZXN0aW5nIGNvbGxpc2lvbiBjb25zdHJhaW50cyB1c2luZyBFcmluIENhdHRvJ3MgbWV0aG9kIChHREMwOClcbiAgICAgICAgICAgICAgICAgICAgLy8gaW1wdWxzZSBjb25zdHJhaW50IHRlbmRzIHRvIDBcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRhY3ROb3JtYWxJbXB1bHNlID0gY29udGFjdC5ub3JtYWxJbXB1bHNlO1xuICAgICAgICAgICAgICAgICAgICBjb250YWN0Lm5vcm1hbEltcHVsc2UgPSBNYXRoLm1pbihjb250YWN0Lm5vcm1hbEltcHVsc2UgKyBub3JtYWxJbXB1bHNlLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsSW1wdWxzZSA9IGNvbnRhY3Qubm9ybWFsSW1wdWxzZSAtIGNvbnRhY3ROb3JtYWxJbXB1bHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBoaWdoIHZlbG9jaXR5IGFuZCByZXN0aW5nIGNvbGxpc2lvbnMgc2VwYXJhdGVseVxuICAgICAgICAgICAgICAgIGlmICh0YW5nZW50VmVsb2NpdHkgKiB0YW5nZW50VmVsb2NpdHkgPiBSZXNvbHZlci5fcmVzdGluZ1RocmVzaFRhbmdlbnQgKiB0aW1lU2NhbGVTcXVhcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGhpZ2ggdGFuZ2VudCB2ZWxvY2l0eSBzbyBjbGVhciBjYWNoZWQgY29udGFjdCB0YW5nZW50IGltcHVsc2VcbiAgICAgICAgICAgICAgICAgICAgY29udGFjdC50YW5nZW50SW1wdWxzZSA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc29sdmUgcmVzdGluZyBjb2xsaXNpb24gY29uc3RyYWludHMgdXNpbmcgRXJpbiBDYXR0bydzIG1ldGhvZCAoR0RDMDgpXG4gICAgICAgICAgICAgICAgICAgIC8vIHRhbmdlbnQgaW1wdWxzZSB0ZW5kcyB0byAtdGFuZ2VudFNwZWVkIG9yICt0YW5nZW50U3BlZWRcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRhY3RUYW5nZW50SW1wdWxzZSA9IGNvbnRhY3QudGFuZ2VudEltcHVsc2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhY3QudGFuZ2VudEltcHVsc2UgPSBDb21tb24uY2xhbXAoY29udGFjdC50YW5nZW50SW1wdWxzZSArIHRhbmdlbnRJbXB1bHNlLCAtbWF4RnJpY3Rpb24sIG1heEZyaWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGFuZ2VudEltcHVsc2UgPSBjb250YWN0LnRhbmdlbnRJbXB1bHNlIC0gY29udGFjdFRhbmdlbnRJbXB1bHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHRvdGFsIGltcHVsc2UgZnJvbSBjb250YWN0XG4gICAgICAgICAgICAgICAgaW1wdWxzZS54ID0gKG5vcm1hbC54ICogbm9ybWFsSW1wdWxzZSkgKyAodGFuZ2VudC54ICogdGFuZ2VudEltcHVsc2UpO1xuICAgICAgICAgICAgICAgIGltcHVsc2UueSA9IChub3JtYWwueSAqIG5vcm1hbEltcHVsc2UpICsgKHRhbmdlbnQueSAqIHRhbmdlbnRJbXB1bHNlKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBhcHBseSBpbXB1bHNlIGZyb20gY29udGFjdFxuICAgICAgICAgICAgICAgIGlmICghKGJvZHlBLmlzU3RhdGljIHx8IGJvZHlBLmlzU2xlZXBpbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHlBLnBvc2l0aW9uUHJldi54ICs9IGltcHVsc2UueCAqIGJvZHlBLmludmVyc2VNYXNzO1xuICAgICAgICAgICAgICAgICAgICBib2R5QS5wb3NpdGlvblByZXYueSArPSBpbXB1bHNlLnkgKiBib2R5QS5pbnZlcnNlTWFzcztcbiAgICAgICAgICAgICAgICAgICAgYm9keUEuYW5nbGVQcmV2ICs9IFZlY3Rvci5jcm9zcyhvZmZzZXRBLCBpbXB1bHNlKSAqIGJvZHlBLmludmVyc2VJbmVydGlhO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghKGJvZHlCLmlzU3RhdGljIHx8IGJvZHlCLmlzU2xlZXBpbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHlCLnBvc2l0aW9uUHJldi54IC09IGltcHVsc2UueCAqIGJvZHlCLmludmVyc2VNYXNzO1xuICAgICAgICAgICAgICAgICAgICBib2R5Qi5wb3NpdGlvblByZXYueSAtPSBpbXB1bHNlLnkgKiBib2R5Qi5pbnZlcnNlTWFzcztcbiAgICAgICAgICAgICAgICAgICAgYm9keUIuYW5nbGVQcmV2IC09IFZlY3Rvci5jcm9zcyhvZmZzZXRCLCBpbXB1bHNlKSAqIGJvZHlCLmludmVyc2VJbmVydGlhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbn0pKCk7XG5cbn0se1wiLi4vY29yZS9Db21tb25cIjoxNCxcIi4uL2dlb21ldHJ5L0JvdW5kc1wiOjI2LFwiLi4vZ2VvbWV0cnkvVmVjdG9yXCI6MjgsXCIuLi9nZW9tZXRyeS9WZXJ0aWNlc1wiOjI5fV0sMTE6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyLlNBVGAgbW9kdWxlIGNvbnRhaW5zIG1ldGhvZHMgZm9yIGRldGVjdGluZyBjb2xsaXNpb25zIHVzaW5nIHRoZSBTZXBhcmF0aW5nIEF4aXMgVGhlb3JlbS5cbipcbiogQGNsYXNzIFNBVFxuKi9cblxuLy8gVE9ETzogdHJ1ZSBjaXJjbGVzIGFuZCBjdXJ2ZXNcblxudmFyIFNBVCA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNBVDtcblxudmFyIFZlcnRpY2VzID0gX2RlcmVxXygnLi4vZ2VvbWV0cnkvVmVydGljZXMnKTtcbnZhciBWZWN0b3IgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9WZWN0b3InKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogRGV0ZWN0IGNvbGxpc2lvbiBiZXR3ZWVuIHR3byBib2RpZXMgdXNpbmcgdGhlIFNlcGFyYXRpbmcgQXhpcyBUaGVvcmVtLlxuICAgICAqIEBtZXRob2QgY29sbGlkZXNcbiAgICAgKiBAcGFyYW0ge2JvZHl9IGJvZHlBXG4gICAgICogQHBhcmFtIHtib2R5fSBib2R5QlxuICAgICAqIEBwYXJhbSB7Y29sbGlzaW9ufSBwcmV2aW91c0NvbGxpc2lvblxuICAgICAqIEByZXR1cm4ge2NvbGxpc2lvbn0gY29sbGlzaW9uXG4gICAgICovXG4gICAgU0FULmNvbGxpZGVzID0gZnVuY3Rpb24oYm9keUEsIGJvZHlCLCBwcmV2aW91c0NvbGxpc2lvbikge1xuICAgICAgICB2YXIgb3ZlcmxhcEFCLFxuICAgICAgICAgICAgb3ZlcmxhcEJBLCBcbiAgICAgICAgICAgIG1pbk92ZXJsYXAsXG4gICAgICAgICAgICBjb2xsaXNpb24sXG4gICAgICAgICAgICBjYW5SZXVzZVByZXZDb2wgPSBmYWxzZTtcblxuICAgICAgICBpZiAocHJldmlvdXNDb2xsaXNpb24pIHtcbiAgICAgICAgICAgIC8vIGVzdGltYXRlIHRvdGFsIG1vdGlvblxuICAgICAgICAgICAgdmFyIHBhcmVudEEgPSBib2R5QS5wYXJlbnQsXG4gICAgICAgICAgICAgICAgcGFyZW50QiA9IGJvZHlCLnBhcmVudCxcbiAgICAgICAgICAgICAgICBtb3Rpb24gPSBwYXJlbnRBLnNwZWVkICogcGFyZW50QS5zcGVlZCArIHBhcmVudEEuYW5ndWxhclNwZWVkICogcGFyZW50QS5hbmd1bGFyU3BlZWRcbiAgICAgICAgICAgICAgICAgICAgICAgKyBwYXJlbnRCLnNwZWVkICogcGFyZW50Qi5zcGVlZCArIHBhcmVudEIuYW5ndWxhclNwZWVkICogcGFyZW50Qi5hbmd1bGFyU3BlZWQ7XG5cbiAgICAgICAgICAgIC8vIHdlIG1heSBiZSBhYmxlIHRvIChwYXJ0aWFsbHkpIHJldXNlIGNvbGxpc2lvbiByZXN1bHQgXG4gICAgICAgICAgICAvLyBidXQgb25seSBzYWZlIGlmIGNvbGxpc2lvbiB3YXMgcmVzdGluZ1xuICAgICAgICAgICAgY2FuUmV1c2VQcmV2Q29sID0gcHJldmlvdXNDb2xsaXNpb24gJiYgcHJldmlvdXNDb2xsaXNpb24uY29sbGlkZWQgJiYgbW90aW9uIDwgMC4yO1xuXG4gICAgICAgICAgICAvLyByZXVzZSBjb2xsaXNpb24gb2JqZWN0XG4gICAgICAgICAgICBjb2xsaXNpb24gPSBwcmV2aW91c0NvbGxpc2lvbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbGxpc2lvbiA9IHsgY29sbGlkZWQ6IGZhbHNlLCBib2R5QTogYm9keUEsIGJvZHlCOiBib2R5QiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByZXZpb3VzQ29sbGlzaW9uICYmIGNhblJldXNlUHJldkNvbCkge1xuICAgICAgICAgICAgLy8gaWYgd2UgY2FuIHJldXNlIHRoZSBjb2xsaXNpb24gcmVzdWx0XG4gICAgICAgICAgICAvLyB3ZSBvbmx5IG5lZWQgdG8gdGVzdCB0aGUgcHJldmlvdXNseSBmb3VuZCBheGlzXG4gICAgICAgICAgICB2YXIgYXhpc0JvZHlBID0gY29sbGlzaW9uLmF4aXNCb2R5LFxuICAgICAgICAgICAgICAgIGF4aXNCb2R5QiA9IGF4aXNCb2R5QSA9PT0gYm9keUEgPyBib2R5QiA6IGJvZHlBLFxuICAgICAgICAgICAgICAgIGF4ZXMgPSBbYXhpc0JvZHlBLmF4ZXNbcHJldmlvdXNDb2xsaXNpb24uYXhpc051bWJlcl1dO1xuXG4gICAgICAgICAgICBtaW5PdmVybGFwID0gU0FULl9vdmVybGFwQXhlcyhheGlzQm9keUEudmVydGljZXMsIGF4aXNCb2R5Qi52ZXJ0aWNlcywgYXhlcyk7XG4gICAgICAgICAgICBjb2xsaXNpb24ucmV1c2VkID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKG1pbk92ZXJsYXAub3ZlcmxhcCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgY29sbGlzaW9uLmNvbGxpZGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbGxpc2lvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmIHdlIGNhbid0IHJldXNlIGEgcmVzdWx0LCBwZXJmb3JtIGEgZnVsbCBTQVQgdGVzdFxuXG4gICAgICAgICAgICBvdmVybGFwQUIgPSBTQVQuX292ZXJsYXBBeGVzKGJvZHlBLnZlcnRpY2VzLCBib2R5Qi52ZXJ0aWNlcywgYm9keUEuYXhlcyk7XG5cbiAgICAgICAgICAgIGlmIChvdmVybGFwQUIub3ZlcmxhcCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgY29sbGlzaW9uLmNvbGxpZGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbGxpc2lvbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb3ZlcmxhcEJBID0gU0FULl9vdmVybGFwQXhlcyhib2R5Qi52ZXJ0aWNlcywgYm9keUEudmVydGljZXMsIGJvZHlCLmF4ZXMpO1xuXG4gICAgICAgICAgICBpZiAob3ZlcmxhcEJBLm92ZXJsYXAgPD0gMCkge1xuICAgICAgICAgICAgICAgIGNvbGxpc2lvbi5jb2xsaWRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2xsaXNpb247XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvdmVybGFwQUIub3ZlcmxhcCA8IG92ZXJsYXBCQS5vdmVybGFwKSB7XG4gICAgICAgICAgICAgICAgbWluT3ZlcmxhcCA9IG92ZXJsYXBBQjtcbiAgICAgICAgICAgICAgICBjb2xsaXNpb24uYXhpc0JvZHkgPSBib2R5QTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWluT3ZlcmxhcCA9IG92ZXJsYXBCQTtcbiAgICAgICAgICAgICAgICBjb2xsaXNpb24uYXhpc0JvZHkgPSBib2R5QjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaW1wb3J0YW50IGZvciByZXVzZSBsYXRlclxuICAgICAgICAgICAgY29sbGlzaW9uLmF4aXNOdW1iZXIgPSBtaW5PdmVybGFwLmF4aXNOdW1iZXI7XG4gICAgICAgIH1cblxuICAgICAgICBjb2xsaXNpb24uYm9keUEgPSBib2R5QS5pZCA8IGJvZHlCLmlkID8gYm9keUEgOiBib2R5QjtcbiAgICAgICAgY29sbGlzaW9uLmJvZHlCID0gYm9keUEuaWQgPCBib2R5Qi5pZCA/IGJvZHlCIDogYm9keUE7XG4gICAgICAgIGNvbGxpc2lvbi5jb2xsaWRlZCA9IHRydWU7XG4gICAgICAgIGNvbGxpc2lvbi5kZXB0aCA9IG1pbk92ZXJsYXAub3ZlcmxhcDtcbiAgICAgICAgY29sbGlzaW9uLnBhcmVudEEgPSBjb2xsaXNpb24uYm9keUEucGFyZW50O1xuICAgICAgICBjb2xsaXNpb24ucGFyZW50QiA9IGNvbGxpc2lvbi5ib2R5Qi5wYXJlbnQ7XG4gICAgICAgIFxuICAgICAgICBib2R5QSA9IGNvbGxpc2lvbi5ib2R5QTtcbiAgICAgICAgYm9keUIgPSBjb2xsaXNpb24uYm9keUI7XG5cbiAgICAgICAgLy8gZW5zdXJlIG5vcm1hbCBpcyBmYWNpbmcgYXdheSBmcm9tIGJvZHlBXG4gICAgICAgIGlmIChWZWN0b3IuZG90KG1pbk92ZXJsYXAuYXhpcywgVmVjdG9yLnN1Yihib2R5Qi5wb3NpdGlvbiwgYm9keUEucG9zaXRpb24pKSA8IDApIHtcbiAgICAgICAgICAgIGNvbGxpc2lvbi5ub3JtYWwgPSB7XG4gICAgICAgICAgICAgICAgeDogbWluT3ZlcmxhcC5heGlzLngsXG4gICAgICAgICAgICAgICAgeTogbWluT3ZlcmxhcC5heGlzLnlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2xsaXNpb24ubm9ybWFsID0ge1xuICAgICAgICAgICAgICAgIHg6IC1taW5PdmVybGFwLmF4aXMueCxcbiAgICAgICAgICAgICAgICB5OiAtbWluT3ZlcmxhcC5heGlzLnlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb2xsaXNpb24udGFuZ2VudCA9IFZlY3Rvci5wZXJwKGNvbGxpc2lvbi5ub3JtYWwpO1xuXG4gICAgICAgIGNvbGxpc2lvbi5wZW5ldHJhdGlvbiA9IGNvbGxpc2lvbi5wZW5ldHJhdGlvbiB8fCB7fTtcbiAgICAgICAgY29sbGlzaW9uLnBlbmV0cmF0aW9uLnggPSBjb2xsaXNpb24ubm9ybWFsLnggKiBjb2xsaXNpb24uZGVwdGg7XG4gICAgICAgIGNvbGxpc2lvbi5wZW5ldHJhdGlvbi55ID0gY29sbGlzaW9uLm5vcm1hbC55ICogY29sbGlzaW9uLmRlcHRoOyBcblxuICAgICAgICAvLyBmaW5kIHN1cHBvcnQgcG9pbnRzLCB0aGVyZSBpcyBhbHdheXMgZWl0aGVyIGV4YWN0bHkgb25lIG9yIHR3b1xuICAgICAgICB2YXIgdmVydGljZXNCID0gU0FULl9maW5kU3VwcG9ydHMoYm9keUEsIGJvZHlCLCBjb2xsaXNpb24ubm9ybWFsKSxcbiAgICAgICAgICAgIHN1cHBvcnRzID0gW107XG5cbiAgICAgICAgLy8gZmluZCB0aGUgc3VwcG9ydHMgZnJvbSBib2R5QiB0aGF0IGFyZSBpbnNpZGUgYm9keUFcbiAgICAgICAgaWYgKFZlcnRpY2VzLmNvbnRhaW5zKGJvZHlBLnZlcnRpY2VzLCB2ZXJ0aWNlc0JbMF0pKVxuICAgICAgICAgICAgc3VwcG9ydHMucHVzaCh2ZXJ0aWNlc0JbMF0pO1xuXG4gICAgICAgIGlmIChWZXJ0aWNlcy5jb250YWlucyhib2R5QS52ZXJ0aWNlcywgdmVydGljZXNCWzFdKSlcbiAgICAgICAgICAgIHN1cHBvcnRzLnB1c2godmVydGljZXNCWzFdKTtcblxuICAgICAgICAvLyBmaW5kIHRoZSBzdXBwb3J0cyBmcm9tIGJvZHlBIHRoYXQgYXJlIGluc2lkZSBib2R5QlxuICAgICAgICBpZiAoc3VwcG9ydHMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgdmFyIHZlcnRpY2VzQSA9IFNBVC5fZmluZFN1cHBvcnRzKGJvZHlCLCBib2R5QSwgVmVjdG9yLm5lZyhjb2xsaXNpb24ubm9ybWFsKSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoVmVydGljZXMuY29udGFpbnMoYm9keUIudmVydGljZXMsIHZlcnRpY2VzQVswXSkpXG4gICAgICAgICAgICAgICAgc3VwcG9ydHMucHVzaCh2ZXJ0aWNlc0FbMF0pO1xuXG4gICAgICAgICAgICBpZiAoc3VwcG9ydHMubGVuZ3RoIDwgMiAmJiBWZXJ0aWNlcy5jb250YWlucyhib2R5Qi52ZXJ0aWNlcywgdmVydGljZXNBWzFdKSlcbiAgICAgICAgICAgICAgICBzdXBwb3J0cy5wdXNoKHZlcnRpY2VzQVsxXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhY2NvdW50IGZvciB0aGUgZWRnZSBjYXNlIG9mIG92ZXJsYXBwaW5nIGJ1dCBubyB2ZXJ0ZXggY29udGFpbm1lbnRcbiAgICAgICAgaWYgKHN1cHBvcnRzLmxlbmd0aCA8IDEpXG4gICAgICAgICAgICBzdXBwb3J0cyA9IFt2ZXJ0aWNlc0JbMF1dO1xuICAgICAgICBcbiAgICAgICAgY29sbGlzaW9uLnN1cHBvcnRzID0gc3VwcG9ydHM7XG5cbiAgICAgICAgcmV0dXJuIGNvbGxpc2lvbjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRmluZCB0aGUgb3ZlcmxhcCBiZXR3ZWVuIHR3byBzZXRzIG9mIHZlcnRpY2VzLlxuICAgICAqIEBtZXRob2QgX292ZXJsYXBBeGVzXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge30gdmVydGljZXNBXG4gICAgICogQHBhcmFtIHt9IHZlcnRpY2VzQlxuICAgICAqIEBwYXJhbSB7fSBheGVzXG4gICAgICogQHJldHVybiByZXN1bHRcbiAgICAgKi9cbiAgICBTQVQuX292ZXJsYXBBeGVzID0gZnVuY3Rpb24odmVydGljZXNBLCB2ZXJ0aWNlc0IsIGF4ZXMpIHtcbiAgICAgICAgdmFyIHByb2plY3Rpb25BID0gVmVjdG9yLl90ZW1wWzBdLCBcbiAgICAgICAgICAgIHByb2plY3Rpb25CID0gVmVjdG9yLl90ZW1wWzFdLFxuICAgICAgICAgICAgcmVzdWx0ID0geyBvdmVybGFwOiBOdW1iZXIuTUFYX1ZBTFVFIH0sXG4gICAgICAgICAgICBvdmVybGFwLFxuICAgICAgICAgICAgYXhpcztcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGF4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGF4aXMgPSBheGVzW2ldO1xuXG4gICAgICAgICAgICBTQVQuX3Byb2plY3RUb0F4aXMocHJvamVjdGlvbkEsIHZlcnRpY2VzQSwgYXhpcyk7XG4gICAgICAgICAgICBTQVQuX3Byb2plY3RUb0F4aXMocHJvamVjdGlvbkIsIHZlcnRpY2VzQiwgYXhpcyk7XG5cbiAgICAgICAgICAgIG92ZXJsYXAgPSBNYXRoLm1pbihwcm9qZWN0aW9uQS5tYXggLSBwcm9qZWN0aW9uQi5taW4sIHByb2plY3Rpb25CLm1heCAtIHByb2plY3Rpb25BLm1pbik7XG5cbiAgICAgICAgICAgIGlmIChvdmVybGFwIDw9IDApIHtcbiAgICAgICAgICAgICAgICByZXN1bHQub3ZlcmxhcCA9IG92ZXJsYXA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG92ZXJsYXAgPCByZXN1bHQub3ZlcmxhcCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5vdmVybGFwID0gb3ZlcmxhcDtcbiAgICAgICAgICAgICAgICByZXN1bHQuYXhpcyA9IGF4aXM7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmF4aXNOdW1iZXIgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHJvamVjdHMgdmVydGljZXMgb24gYW4gYXhpcyBhbmQgcmV0dXJucyBhbiBpbnRlcnZhbC5cbiAgICAgKiBAbWV0aG9kIF9wcm9qZWN0VG9BeGlzXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge30gcHJvamVjdGlvblxuICAgICAqIEBwYXJhbSB7fSB2ZXJ0aWNlc1xuICAgICAqIEBwYXJhbSB7fSBheGlzXG4gICAgICovXG4gICAgU0FULl9wcm9qZWN0VG9BeGlzID0gZnVuY3Rpb24ocHJvamVjdGlvbiwgdmVydGljZXMsIGF4aXMpIHtcbiAgICAgICAgdmFyIG1pbiA9IFZlY3Rvci5kb3QodmVydGljZXNbMF0sIGF4aXMpLFxuICAgICAgICAgICAgbWF4ID0gbWluO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgdmVydGljZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHZhciBkb3QgPSBWZWN0b3IuZG90KHZlcnRpY2VzW2ldLCBheGlzKTtcblxuICAgICAgICAgICAgaWYgKGRvdCA+IG1heCkgeyBcbiAgICAgICAgICAgICAgICBtYXggPSBkb3Q7IFxuICAgICAgICAgICAgfSBlbHNlIGlmIChkb3QgPCBtaW4pIHsgXG4gICAgICAgICAgICAgICAgbWluID0gZG90OyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByb2plY3Rpb24ubWluID0gbWluO1xuICAgICAgICBwcm9qZWN0aW9uLm1heCA9IG1heDtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEZpbmRzIHN1cHBvcnRpbmcgdmVydGljZXMgZ2l2ZW4gdHdvIGJvZGllcyBhbG9uZyBhIGdpdmVuIGRpcmVjdGlvbiB1c2luZyBoaWxsLWNsaW1iaW5nLlxuICAgICAqIEBtZXRob2QgX2ZpbmRTdXBwb3J0c1xuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHt9IGJvZHlBXG4gICAgICogQHBhcmFtIHt9IGJvZHlCXG4gICAgICogQHBhcmFtIHt9IG5vcm1hbFxuICAgICAqIEByZXR1cm4gW3ZlY3Rvcl1cbiAgICAgKi9cbiAgICBTQVQuX2ZpbmRTdXBwb3J0cyA9IGZ1bmN0aW9uKGJvZHlBLCBib2R5Qiwgbm9ybWFsKSB7XG4gICAgICAgIHZhciBuZWFyZXN0RGlzdGFuY2UgPSBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgICAgICAgdmVydGV4VG9Cb2R5ID0gVmVjdG9yLl90ZW1wWzBdLFxuICAgICAgICAgICAgdmVydGljZXMgPSBib2R5Qi52ZXJ0aWNlcyxcbiAgICAgICAgICAgIGJvZHlBUG9zaXRpb24gPSBib2R5QS5wb3NpdGlvbixcbiAgICAgICAgICAgIGRpc3RhbmNlLFxuICAgICAgICAgICAgdmVydGV4LFxuICAgICAgICAgICAgdmVydGV4QSxcbiAgICAgICAgICAgIHZlcnRleEI7XG5cbiAgICAgICAgLy8gZmluZCBjbG9zZXN0IHZlcnRleCBvbiBib2R5QlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2ZXJ0ZXggPSB2ZXJ0aWNlc1tpXTtcbiAgICAgICAgICAgIHZlcnRleFRvQm9keS54ID0gdmVydGV4LnggLSBib2R5QVBvc2l0aW9uLng7XG4gICAgICAgICAgICB2ZXJ0ZXhUb0JvZHkueSA9IHZlcnRleC55IC0gYm9keUFQb3NpdGlvbi55O1xuICAgICAgICAgICAgZGlzdGFuY2UgPSAtVmVjdG9yLmRvdChub3JtYWwsIHZlcnRleFRvQm9keSk7XG5cbiAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8IG5lYXJlc3REaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgIG5lYXJlc3REaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgICAgICAgICAgICAgIHZlcnRleEEgPSB2ZXJ0ZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaW5kIG5leHQgY2xvc2VzdCB2ZXJ0ZXggdXNpbmcgdGhlIHR3byBjb25uZWN0ZWQgdG8gaXRcbiAgICAgICAgdmFyIHByZXZJbmRleCA9IHZlcnRleEEuaW5kZXggLSAxID49IDAgPyB2ZXJ0ZXhBLmluZGV4IC0gMSA6IHZlcnRpY2VzLmxlbmd0aCAtIDE7XG4gICAgICAgIHZlcnRleCA9IHZlcnRpY2VzW3ByZXZJbmRleF07XG4gICAgICAgIHZlcnRleFRvQm9keS54ID0gdmVydGV4LnggLSBib2R5QVBvc2l0aW9uLng7XG4gICAgICAgIHZlcnRleFRvQm9keS55ID0gdmVydGV4LnkgLSBib2R5QVBvc2l0aW9uLnk7XG4gICAgICAgIG5lYXJlc3REaXN0YW5jZSA9IC1WZWN0b3IuZG90KG5vcm1hbCwgdmVydGV4VG9Cb2R5KTtcbiAgICAgICAgdmVydGV4QiA9IHZlcnRleDtcblxuICAgICAgICB2YXIgbmV4dEluZGV4ID0gKHZlcnRleEEuaW5kZXggKyAxKSAlIHZlcnRpY2VzLmxlbmd0aDtcbiAgICAgICAgdmVydGV4ID0gdmVydGljZXNbbmV4dEluZGV4XTtcbiAgICAgICAgdmVydGV4VG9Cb2R5LnggPSB2ZXJ0ZXgueCAtIGJvZHlBUG9zaXRpb24ueDtcbiAgICAgICAgdmVydGV4VG9Cb2R5LnkgPSB2ZXJ0ZXgueSAtIGJvZHlBUG9zaXRpb24ueTtcbiAgICAgICAgZGlzdGFuY2UgPSAtVmVjdG9yLmRvdChub3JtYWwsIHZlcnRleFRvQm9keSk7XG4gICAgICAgIGlmIChkaXN0YW5jZSA8IG5lYXJlc3REaXN0YW5jZSkge1xuICAgICAgICAgICAgdmVydGV4QiA9IHZlcnRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbdmVydGV4QSwgdmVydGV4Ql07XG4gICAgfTtcblxufSkoKTtcblxufSx7XCIuLi9nZW9tZXRyeS9WZWN0b3JcIjoyOCxcIi4uL2dlb21ldHJ5L1ZlcnRpY2VzXCI6Mjl9XSwxMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiogVGhlIGBNYXR0ZXIuQ29uc3RyYWludGAgbW9kdWxlIGNvbnRhaW5zIG1ldGhvZHMgZm9yIGNyZWF0aW5nIGFuZCBtYW5pcHVsYXRpbmcgY29uc3RyYWludHMuXG4qIENvbnN0cmFpbnRzIGFyZSB1c2VkIGZvciBzcGVjaWZ5aW5nIHRoYXQgYSBmaXhlZCBkaXN0YW5jZSBtdXN0IGJlIG1haW50YWluZWQgYmV0d2VlbiB0d28gYm9kaWVzIChvciBhIGJvZHkgYW5kIGEgZml4ZWQgd29ybGQtc3BhY2UgcG9zaXRpb24pLlxuKiBUaGUgc3RpZmZuZXNzIG9mIGNvbnN0cmFpbnRzIGNhbiBiZSBtb2RpZmllZCB0byBjcmVhdGUgc3ByaW5ncyBvciBlbGFzdGljLlxuKlxuKiBTZWUgdGhlIGluY2x1ZGVkIHVzYWdlIFtleGFtcGxlc10oaHR0cHM6Ly9naXRodWIuY29tL2xpYWJydS9tYXR0ZXItanMvdHJlZS9tYXN0ZXIvZXhhbXBsZXMpLlxuKlxuKiBAY2xhc3MgQ29uc3RyYWludFxuKi9cblxudmFyIENvbnN0cmFpbnQgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb25zdHJhaW50O1xuXG52YXIgVmVydGljZXMgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9WZXJ0aWNlcycpO1xudmFyIFZlY3RvciA9IF9kZXJlcV8oJy4uL2dlb21ldHJ5L1ZlY3RvcicpO1xudmFyIFNsZWVwaW5nID0gX2RlcmVxXygnLi4vY29yZS9TbGVlcGluZycpO1xudmFyIEJvdW5kcyA9IF9kZXJlcV8oJy4uL2dlb21ldHJ5L0JvdW5kcycpO1xudmFyIEF4ZXMgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9BeGVzJyk7XG52YXIgQ29tbW9uID0gX2RlcmVxXygnLi4vY29yZS9Db21tb24nKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgQ29uc3RyYWludC5fd2FybWluZyA9IDAuNDtcbiAgICBDb25zdHJhaW50Ll90b3JxdWVEYW1wZW4gPSAxO1xuICAgIENvbnN0cmFpbnQuX21pbkxlbmd0aCA9IDAuMDAwMDAxO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBjb25zdHJhaW50LlxuICAgICAqIEFsbCBwcm9wZXJ0aWVzIGhhdmUgZGVmYXVsdCB2YWx1ZXMsIGFuZCBtYW55IGFyZSBwcmUtY2FsY3VsYXRlZCBhdXRvbWF0aWNhbGx5IGJhc2VkIG9uIG90aGVyIHByb3BlcnRpZXMuXG4gICAgICogVG8gc2ltdWxhdGUgYSByZXZvbHV0ZSBjb25zdHJhaW50IChvciBwaW4gam9pbnQpIHNldCBgbGVuZ3RoOiAwYCBhbmQgYSBoaWdoIGBzdGlmZm5lc3NgIHZhbHVlIChlLmcuIGAwLjdgIG9yIGFib3ZlKS5cbiAgICAgKiBJZiB0aGUgY29uc3RyYWludCBpcyB1bnN0YWJsZSwgdHJ5IGxvd2VyaW5nIHRoZSBgc3RpZmZuZXNzYCB2YWx1ZSBhbmQgLyBvciBpbmNyZWFzaW5nIGBlbmdpbmUuY29uc3RyYWludEl0ZXJhdGlvbnNgLlxuICAgICAqIEZvciBjb21wb3VuZCBib2RpZXMsIGNvbnN0cmFpbnRzIG11c3QgYmUgYXBwbGllZCB0byB0aGUgcGFyZW50IGJvZHkgKG5vdCBvbmUgb2YgaXRzIHBhcnRzKS5cbiAgICAgKiBTZWUgdGhlIHByb3BlcnRpZXMgc2VjdGlvbiBiZWxvdyBmb3IgZGV0YWlsZWQgaW5mb3JtYXRpb24gb24gd2hhdCB5b3UgY2FuIHBhc3MgdmlhIHRoZSBgb3B0aW9uc2Agb2JqZWN0LlxuICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICogQHBhcmFtIHt9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtjb25zdHJhaW50fSBjb25zdHJhaW50XG4gICAgICovXG4gICAgQ29uc3RyYWludC5jcmVhdGUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHZhciBjb25zdHJhaW50ID0gb3B0aW9ucztcblxuICAgICAgICAvLyBpZiBib2RpZXMgZGVmaW5lZCBidXQgbm8gcG9pbnRzLCB1c2UgYm9keSBjZW50cmVcbiAgICAgICAgaWYgKGNvbnN0cmFpbnQuYm9keUEgJiYgIWNvbnN0cmFpbnQucG9pbnRBKVxuICAgICAgICAgICAgY29uc3RyYWludC5wb2ludEEgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgaWYgKGNvbnN0cmFpbnQuYm9keUIgJiYgIWNvbnN0cmFpbnQucG9pbnRCKVxuICAgICAgICAgICAgY29uc3RyYWludC5wb2ludEIgPSB7IHg6IDAsIHk6IDAgfTtcblxuICAgICAgICAvLyBjYWxjdWxhdGUgc3RhdGljIGxlbmd0aCB1c2luZyBpbml0aWFsIHdvcmxkIHNwYWNlIHBvaW50c1xuICAgICAgICB2YXIgaW5pdGlhbFBvaW50QSA9IGNvbnN0cmFpbnQuYm9keUEgPyBWZWN0b3IuYWRkKGNvbnN0cmFpbnQuYm9keUEucG9zaXRpb24sIGNvbnN0cmFpbnQucG9pbnRBKSA6IGNvbnN0cmFpbnQucG9pbnRBLFxuICAgICAgICAgICAgaW5pdGlhbFBvaW50QiA9IGNvbnN0cmFpbnQuYm9keUIgPyBWZWN0b3IuYWRkKGNvbnN0cmFpbnQuYm9keUIucG9zaXRpb24sIGNvbnN0cmFpbnQucG9pbnRCKSA6IGNvbnN0cmFpbnQucG9pbnRCLFxuICAgICAgICAgICAgbGVuZ3RoID0gVmVjdG9yLm1hZ25pdHVkZShWZWN0b3Iuc3ViKGluaXRpYWxQb2ludEEsIGluaXRpYWxQb2ludEIpKTtcbiAgICBcbiAgICAgICAgY29uc3RyYWludC5sZW5ndGggPSB0eXBlb2YgY29uc3RyYWludC5sZW5ndGggIT09ICd1bmRlZmluZWQnID8gY29uc3RyYWludC5sZW5ndGggOiBsZW5ndGg7XG5cbiAgICAgICAgLy8gb3B0aW9uIGRlZmF1bHRzXG4gICAgICAgIGNvbnN0cmFpbnQuaWQgPSBjb25zdHJhaW50LmlkIHx8IENvbW1vbi5uZXh0SWQoKTtcbiAgICAgICAgY29uc3RyYWludC5sYWJlbCA9IGNvbnN0cmFpbnQubGFiZWwgfHwgJ0NvbnN0cmFpbnQnO1xuICAgICAgICBjb25zdHJhaW50LnR5cGUgPSAnY29uc3RyYWludCc7XG4gICAgICAgIGNvbnN0cmFpbnQuc3RpZmZuZXNzID0gY29uc3RyYWludC5zdGlmZm5lc3MgfHwgKGNvbnN0cmFpbnQubGVuZ3RoID4gMCA/IDEgOiAwLjcpO1xuICAgICAgICBjb25zdHJhaW50LmRhbXBpbmcgPSBjb25zdHJhaW50LmRhbXBpbmcgfHwgMDtcbiAgICAgICAgY29uc3RyYWludC5hbmd1bGFyU3RpZmZuZXNzID0gY29uc3RyYWludC5hbmd1bGFyU3RpZmZuZXNzIHx8IDA7XG4gICAgICAgIGNvbnN0cmFpbnQuYW5nbGVBID0gY29uc3RyYWludC5ib2R5QSA/IGNvbnN0cmFpbnQuYm9keUEuYW5nbGUgOiBjb25zdHJhaW50LmFuZ2xlQTtcbiAgICAgICAgY29uc3RyYWludC5hbmdsZUIgPSBjb25zdHJhaW50LmJvZHlCID8gY29uc3RyYWludC5ib2R5Qi5hbmdsZSA6IGNvbnN0cmFpbnQuYW5nbGVCO1xuICAgICAgICBjb25zdHJhaW50LnBsdWdpbiA9IHt9O1xuXG4gICAgICAgIC8vIHJlbmRlclxuICAgICAgICB2YXIgcmVuZGVyID0ge1xuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgIHN0cm9rZVN0eWxlOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICBhbmNob3JzOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGNvbnN0cmFpbnQubGVuZ3RoID09PSAwICYmIGNvbnN0cmFpbnQuc3RpZmZuZXNzID4gMC4xKSB7XG4gICAgICAgICAgICByZW5kZXIudHlwZSA9ICdwaW4nO1xuICAgICAgICAgICAgcmVuZGVyLmFuY2hvcnMgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25zdHJhaW50LnN0aWZmbmVzcyA8IDAuOSkge1xuICAgICAgICAgICAgcmVuZGVyLnR5cGUgPSAnc3ByaW5nJztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0cmFpbnQucmVuZGVyID0gQ29tbW9uLmV4dGVuZChyZW5kZXIsIGNvbnN0cmFpbnQucmVuZGVyKTtcblxuICAgICAgICByZXR1cm4gY29uc3RyYWludDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHJlcGFyZXMgZm9yIHNvbHZpbmcgYnkgY29uc3RyYWludCB3YXJtaW5nLlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZCBwcmVTb2x2ZUFsbFxuICAgICAqIEBwYXJhbSB7Ym9keVtdfSBib2RpZXNcbiAgICAgKi9cbiAgICBDb25zdHJhaW50LnByZVNvbHZlQWxsID0gZnVuY3Rpb24oYm9kaWVzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm9kaWVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICB2YXIgYm9keSA9IGJvZGllc1tpXSxcbiAgICAgICAgICAgICAgICBpbXB1bHNlID0gYm9keS5jb25zdHJhaW50SW1wdWxzZTtcblxuICAgICAgICAgICAgaWYgKGJvZHkuaXNTdGF0aWMgfHwgKGltcHVsc2UueCA9PT0gMCAmJiBpbXB1bHNlLnkgPT09IDAgJiYgaW1wdWxzZS5hbmdsZSA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYm9keS5wb3NpdGlvbi54ICs9IGltcHVsc2UueDtcbiAgICAgICAgICAgIGJvZHkucG9zaXRpb24ueSArPSBpbXB1bHNlLnk7XG4gICAgICAgICAgICBib2R5LmFuZ2xlICs9IGltcHVsc2UuYW5nbGU7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU29sdmVzIGFsbCBjb25zdHJhaW50cyBpbiBhIGxpc3Qgb2YgY29sbGlzaW9ucy5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBtZXRob2Qgc29sdmVBbGxcbiAgICAgKiBAcGFyYW0ge2NvbnN0cmFpbnRbXX0gY29uc3RyYWludHNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZVNjYWxlXG4gICAgICovXG4gICAgQ29uc3RyYWludC5zb2x2ZUFsbCA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCB0aW1lU2NhbGUpIHtcbiAgICAgICAgLy8gU29sdmUgZml4ZWQgY29uc3RyYWludHMgZmlyc3QuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29uc3RyYWludHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHZhciBjb25zdHJhaW50ID0gY29uc3RyYWludHNbaV0sXG4gICAgICAgICAgICAgICAgZml4ZWRBID0gIWNvbnN0cmFpbnQuYm9keUEgfHwgKGNvbnN0cmFpbnQuYm9keUEgJiYgY29uc3RyYWludC5ib2R5QS5pc1N0YXRpYyksXG4gICAgICAgICAgICAgICAgZml4ZWRCID0gIWNvbnN0cmFpbnQuYm9keUIgfHwgKGNvbnN0cmFpbnQuYm9keUIgJiYgY29uc3RyYWludC5ib2R5Qi5pc1N0YXRpYyk7XG5cbiAgICAgICAgICAgIGlmIChmaXhlZEEgfHwgZml4ZWRCKSB7XG4gICAgICAgICAgICAgICAgQ29uc3RyYWludC5zb2x2ZShjb25zdHJhaW50c1tpXSwgdGltZVNjYWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNvbHZlIGZyZWUgY29uc3RyYWludHMgbGFzdC5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvbnN0cmFpbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdHJhaW50ID0gY29uc3RyYWludHNbaV07XG4gICAgICAgICAgICBmaXhlZEEgPSAhY29uc3RyYWludC5ib2R5QSB8fCAoY29uc3RyYWludC5ib2R5QSAmJiBjb25zdHJhaW50LmJvZHlBLmlzU3RhdGljKTtcbiAgICAgICAgICAgIGZpeGVkQiA9ICFjb25zdHJhaW50LmJvZHlCIHx8IChjb25zdHJhaW50LmJvZHlCICYmIGNvbnN0cmFpbnQuYm9keUIuaXNTdGF0aWMpO1xuXG4gICAgICAgICAgICBpZiAoIWZpeGVkQSAmJiAhZml4ZWRCKSB7XG4gICAgICAgICAgICAgICAgQ29uc3RyYWludC5zb2x2ZShjb25zdHJhaW50c1tpXSwgdGltZVNjYWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTb2x2ZXMgYSBkaXN0YW5jZSBjb25zdHJhaW50IHdpdGggR2F1c3MtU2llZGVsIG1ldGhvZC5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBtZXRob2Qgc29sdmVcbiAgICAgKiBAcGFyYW0ge2NvbnN0cmFpbnR9IGNvbnN0cmFpbnRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZVNjYWxlXG4gICAgICovXG4gICAgQ29uc3RyYWludC5zb2x2ZSA9IGZ1bmN0aW9uKGNvbnN0cmFpbnQsIHRpbWVTY2FsZSkge1xuICAgICAgICB2YXIgYm9keUEgPSBjb25zdHJhaW50LmJvZHlBLFxuICAgICAgICAgICAgYm9keUIgPSBjb25zdHJhaW50LmJvZHlCLFxuICAgICAgICAgICAgcG9pbnRBID0gY29uc3RyYWludC5wb2ludEEsXG4gICAgICAgICAgICBwb2ludEIgPSBjb25zdHJhaW50LnBvaW50QjtcblxuICAgICAgICBpZiAoIWJvZHlBICYmICFib2R5QilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAvLyB1cGRhdGUgcmVmZXJlbmNlIGFuZ2xlXG4gICAgICAgIGlmIChib2R5QSAmJiAhYm9keUEuaXNTdGF0aWMpIHtcbiAgICAgICAgICAgIFZlY3Rvci5yb3RhdGUocG9pbnRBLCBib2R5QS5hbmdsZSAtIGNvbnN0cmFpbnQuYW5nbGVBLCBwb2ludEEpO1xuICAgICAgICAgICAgY29uc3RyYWludC5hbmdsZUEgPSBib2R5QS5hbmdsZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gdXBkYXRlIHJlZmVyZW5jZSBhbmdsZVxuICAgICAgICBpZiAoYm9keUIgJiYgIWJvZHlCLmlzU3RhdGljKSB7XG4gICAgICAgICAgICBWZWN0b3Iucm90YXRlKHBvaW50QiwgYm9keUIuYW5nbGUgLSBjb25zdHJhaW50LmFuZ2xlQiwgcG9pbnRCKTtcbiAgICAgICAgICAgIGNvbnN0cmFpbnQuYW5nbGVCID0gYm9keUIuYW5nbGU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcG9pbnRBV29ybGQgPSBwb2ludEEsXG4gICAgICAgICAgICBwb2ludEJXb3JsZCA9IHBvaW50QjtcblxuICAgICAgICBpZiAoYm9keUEpIHBvaW50QVdvcmxkID0gVmVjdG9yLmFkZChib2R5QS5wb3NpdGlvbiwgcG9pbnRBKTtcbiAgICAgICAgaWYgKGJvZHlCKSBwb2ludEJXb3JsZCA9IFZlY3Rvci5hZGQoYm9keUIucG9zaXRpb24sIHBvaW50Qik7XG5cbiAgICAgICAgaWYgKCFwb2ludEFXb3JsZCB8fCAhcG9pbnRCV29ybGQpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIGRlbHRhID0gVmVjdG9yLnN1Yihwb2ludEFXb3JsZCwgcG9pbnRCV29ybGQpLFxuICAgICAgICAgICAgY3VycmVudExlbmd0aCA9IFZlY3Rvci5tYWduaXR1ZGUoZGVsdGEpO1xuXG4gICAgICAgIC8vIHByZXZlbnQgc2luZ3VsYXJpdHlcbiAgICAgICAgaWYgKGN1cnJlbnRMZW5ndGggPCBDb25zdHJhaW50Ll9taW5MZW5ndGgpIHtcbiAgICAgICAgICAgIGN1cnJlbnRMZW5ndGggPSBDb25zdHJhaW50Ll9taW5MZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzb2x2ZSBkaXN0YW5jZSBjb25zdHJhaW50IHdpdGggR2F1c3MtU2llZGVsIG1ldGhvZFxuICAgICAgICB2YXIgZGlmZmVyZW5jZSA9IChjdXJyZW50TGVuZ3RoIC0gY29uc3RyYWludC5sZW5ndGgpIC8gY3VycmVudExlbmd0aCxcbiAgICAgICAgICAgIHN0aWZmbmVzcyA9IGNvbnN0cmFpbnQuc3RpZmZuZXNzIDwgMSA/IGNvbnN0cmFpbnQuc3RpZmZuZXNzICogdGltZVNjYWxlIDogY29uc3RyYWludC5zdGlmZm5lc3MsXG4gICAgICAgICAgICBmb3JjZSA9IFZlY3Rvci5tdWx0KGRlbHRhLCBkaWZmZXJlbmNlICogc3RpZmZuZXNzKSxcbiAgICAgICAgICAgIG1hc3NUb3RhbCA9IChib2R5QSA/IGJvZHlBLmludmVyc2VNYXNzIDogMCkgKyAoYm9keUIgPyBib2R5Qi5pbnZlcnNlTWFzcyA6IDApLFxuICAgICAgICAgICAgaW5lcnRpYVRvdGFsID0gKGJvZHlBID8gYm9keUEuaW52ZXJzZUluZXJ0aWEgOiAwKSArIChib2R5QiA/IGJvZHlCLmludmVyc2VJbmVydGlhIDogMCksXG4gICAgICAgICAgICByZXNpc3RhbmNlVG90YWwgPSBtYXNzVG90YWwgKyBpbmVydGlhVG90YWwsXG4gICAgICAgICAgICB0b3JxdWUsXG4gICAgICAgICAgICBzaGFyZSxcbiAgICAgICAgICAgIG5vcm1hbCxcbiAgICAgICAgICAgIG5vcm1hbFZlbG9jaXR5LFxuICAgICAgICAgICAgcmVsYXRpdmVWZWxvY2l0eTtcblxuICAgICAgICBpZiAoY29uc3RyYWludC5kYW1waW5nKSB7XG4gICAgICAgICAgICB2YXIgemVybyA9IFZlY3Rvci5jcmVhdGUoKTtcbiAgICAgICAgICAgIG5vcm1hbCA9IFZlY3Rvci5kaXYoZGVsdGEsIGN1cnJlbnRMZW5ndGgpO1xuXG4gICAgICAgICAgICByZWxhdGl2ZVZlbG9jaXR5ID0gVmVjdG9yLnN1YihcbiAgICAgICAgICAgICAgICBib2R5QiAmJiBWZWN0b3Iuc3ViKGJvZHlCLnBvc2l0aW9uLCBib2R5Qi5wb3NpdGlvblByZXYpIHx8IHplcm8sXG4gICAgICAgICAgICAgICAgYm9keUEgJiYgVmVjdG9yLnN1Yihib2R5QS5wb3NpdGlvbiwgYm9keUEucG9zaXRpb25QcmV2KSB8fCB6ZXJvXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBub3JtYWxWZWxvY2l0eSA9IFZlY3Rvci5kb3Qobm9ybWFsLCByZWxhdGl2ZVZlbG9jaXR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChib2R5QSAmJiAhYm9keUEuaXNTdGF0aWMpIHtcbiAgICAgICAgICAgIHNoYXJlID0gYm9keUEuaW52ZXJzZU1hc3MgLyBtYXNzVG90YWw7XG5cbiAgICAgICAgICAgIC8vIGtlZXAgdHJhY2sgb2YgYXBwbGllZCBpbXB1bHNlcyBmb3IgcG9zdCBzb2x2aW5nXG4gICAgICAgICAgICBib2R5QS5jb25zdHJhaW50SW1wdWxzZS54IC09IGZvcmNlLnggKiBzaGFyZTtcbiAgICAgICAgICAgIGJvZHlBLmNvbnN0cmFpbnRJbXB1bHNlLnkgLT0gZm9yY2UueSAqIHNoYXJlO1xuXG4gICAgICAgICAgICAvLyBhcHBseSBmb3JjZXNcbiAgICAgICAgICAgIGJvZHlBLnBvc2l0aW9uLnggLT0gZm9yY2UueCAqIHNoYXJlO1xuICAgICAgICAgICAgYm9keUEucG9zaXRpb24ueSAtPSBmb3JjZS55ICogc2hhcmU7XG5cbiAgICAgICAgICAgIC8vIGFwcGx5IGRhbXBpbmdcbiAgICAgICAgICAgIGlmIChjb25zdHJhaW50LmRhbXBpbmcpIHtcbiAgICAgICAgICAgICAgICBib2R5QS5wb3NpdGlvblByZXYueCAtPSBjb25zdHJhaW50LmRhbXBpbmcgKiBub3JtYWwueCAqIG5vcm1hbFZlbG9jaXR5ICogc2hhcmU7XG4gICAgICAgICAgICAgICAgYm9keUEucG9zaXRpb25QcmV2LnkgLT0gY29uc3RyYWludC5kYW1waW5nICogbm9ybWFsLnkgKiBub3JtYWxWZWxvY2l0eSAqIHNoYXJlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhcHBseSB0b3JxdWVcbiAgICAgICAgICAgIHRvcnF1ZSA9IChWZWN0b3IuY3Jvc3MocG9pbnRBLCBmb3JjZSkgLyByZXNpc3RhbmNlVG90YWwpICogQ29uc3RyYWludC5fdG9ycXVlRGFtcGVuICogYm9keUEuaW52ZXJzZUluZXJ0aWEgKiAoMSAtIGNvbnN0cmFpbnQuYW5ndWxhclN0aWZmbmVzcyk7XG4gICAgICAgICAgICBib2R5QS5jb25zdHJhaW50SW1wdWxzZS5hbmdsZSAtPSB0b3JxdWU7XG4gICAgICAgICAgICBib2R5QS5hbmdsZSAtPSB0b3JxdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYm9keUIgJiYgIWJvZHlCLmlzU3RhdGljKSB7XG4gICAgICAgICAgICBzaGFyZSA9IGJvZHlCLmludmVyc2VNYXNzIC8gbWFzc1RvdGFsO1xuXG4gICAgICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIGFwcGxpZWQgaW1wdWxzZXMgZm9yIHBvc3Qgc29sdmluZ1xuICAgICAgICAgICAgYm9keUIuY29uc3RyYWludEltcHVsc2UueCArPSBmb3JjZS54ICogc2hhcmU7XG4gICAgICAgICAgICBib2R5Qi5jb25zdHJhaW50SW1wdWxzZS55ICs9IGZvcmNlLnkgKiBzaGFyZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gYXBwbHkgZm9yY2VzXG4gICAgICAgICAgICBib2R5Qi5wb3NpdGlvbi54ICs9IGZvcmNlLnggKiBzaGFyZTtcbiAgICAgICAgICAgIGJvZHlCLnBvc2l0aW9uLnkgKz0gZm9yY2UueSAqIHNoYXJlO1xuXG4gICAgICAgICAgICAvLyBhcHBseSBkYW1waW5nXG4gICAgICAgICAgICBpZiAoY29uc3RyYWludC5kYW1waW5nKSB7XG4gICAgICAgICAgICAgICAgYm9keUIucG9zaXRpb25QcmV2LnggKz0gY29uc3RyYWludC5kYW1waW5nICogbm9ybWFsLnggKiBub3JtYWxWZWxvY2l0eSAqIHNoYXJlO1xuICAgICAgICAgICAgICAgIGJvZHlCLnBvc2l0aW9uUHJldi55ICs9IGNvbnN0cmFpbnQuZGFtcGluZyAqIG5vcm1hbC55ICogbm9ybWFsVmVsb2NpdHkgKiBzaGFyZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYXBwbHkgdG9ycXVlXG4gICAgICAgICAgICB0b3JxdWUgPSAoVmVjdG9yLmNyb3NzKHBvaW50QiwgZm9yY2UpIC8gcmVzaXN0YW5jZVRvdGFsKSAqIENvbnN0cmFpbnQuX3RvcnF1ZURhbXBlbiAqIGJvZHlCLmludmVyc2VJbmVydGlhICogKDEgLSBjb25zdHJhaW50LmFuZ3VsYXJTdGlmZm5lc3MpO1xuICAgICAgICAgICAgYm9keUIuY29uc3RyYWludEltcHVsc2UuYW5nbGUgKz0gdG9ycXVlO1xuICAgICAgICAgICAgYm9keUIuYW5nbGUgKz0gdG9ycXVlO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYm9keSB1cGRhdGVzIHJlcXVpcmVkIGFmdGVyIHNvbHZpbmcgY29uc3RyYWludHMuXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIHBvc3RTb2x2ZUFsbFxuICAgICAqIEBwYXJhbSB7Ym9keVtdfSBib2RpZXNcbiAgICAgKi9cbiAgICBDb25zdHJhaW50LnBvc3RTb2x2ZUFsbCA9IGZ1bmN0aW9uKGJvZGllcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvZGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGJvZHkgPSBib2RpZXNbaV0sXG4gICAgICAgICAgICAgICAgaW1wdWxzZSA9IGJvZHkuY29uc3RyYWludEltcHVsc2U7XG5cbiAgICAgICAgICAgIGlmIChib2R5LmlzU3RhdGljIHx8IChpbXB1bHNlLnggPT09IDAgJiYgaW1wdWxzZS55ID09PSAwICYmIGltcHVsc2UuYW5nbGUgPT09IDApKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFNsZWVwaW5nLnNldChib2R5LCBmYWxzZSk7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBnZW9tZXRyeSBhbmQgcmVzZXRcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYm9keS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHZhciBwYXJ0ID0gYm9keS5wYXJ0c1tqXTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBWZXJ0aWNlcy50cmFuc2xhdGUocGFydC52ZXJ0aWNlcywgaW1wdWxzZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaiA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcGFydC5wb3NpdGlvbi54ICs9IGltcHVsc2UueDtcbiAgICAgICAgICAgICAgICAgICAgcGFydC5wb3NpdGlvbi55ICs9IGltcHVsc2UueTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaW1wdWxzZS5hbmdsZSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBWZXJ0aWNlcy5yb3RhdGUocGFydC52ZXJ0aWNlcywgaW1wdWxzZS5hbmdsZSwgYm9keS5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIEF4ZXMucm90YXRlKHBhcnQuYXhlcywgaW1wdWxzZS5hbmdsZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChqID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgVmVjdG9yLnJvdGF0ZUFib3V0KHBhcnQucG9zaXRpb24sIGltcHVsc2UuYW5nbGUsIGJvZHkucG9zaXRpb24sIHBhcnQucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgQm91bmRzLnVwZGF0ZShwYXJ0LmJvdW5kcywgcGFydC52ZXJ0aWNlcywgYm9keS52ZWxvY2l0eSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRhbXBlbiB0aGUgY2FjaGVkIGltcHVsc2UgZm9yIHdhcm1pbmcgbmV4dCBzdGVwXG4gICAgICAgICAgICBpbXB1bHNlLmFuZ2xlICo9IENvbnN0cmFpbnQuX3dhcm1pbmc7XG4gICAgICAgICAgICBpbXB1bHNlLnggKj0gQ29uc3RyYWludC5fd2FybWluZztcbiAgICAgICAgICAgIGltcHVsc2UueSAqPSBDb25zdHJhaW50Ll93YXJtaW5nO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qXG4gICAgKlxuICAgICogIFByb3BlcnRpZXMgRG9jdW1lbnRhdGlvblxuICAgICpcbiAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gaW50ZWdlciBgTnVtYmVyYCB1bmlxdWVseSBpZGVudGlmeWluZyBudW1iZXIgZ2VuZXJhdGVkIGluIGBDb21wb3NpdGUuY3JlYXRlYCBieSBgQ29tbW9uLm5leHRJZGAuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgaWRcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYFN0cmluZ2AgZGVub3RpbmcgdGhlIHR5cGUgb2Ygb2JqZWN0LlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHR5cGVcbiAgICAgKiBAdHlwZSBzdHJpbmdcbiAgICAgKiBAZGVmYXVsdCBcImNvbnN0cmFpbnRcIlxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gYXJiaXRyYXJ5IGBTdHJpbmdgIG5hbWUgdG8gaGVscCB0aGUgdXNlciBpZGVudGlmeSBhbmQgbWFuYWdlIGJvZGllcy5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBsYWJlbFxuICAgICAqIEB0eXBlIHN0cmluZ1xuICAgICAqIEBkZWZhdWx0IFwiQ29uc3RyYWludFwiXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBbiBgT2JqZWN0YCB0aGF0IGRlZmluZXMgdGhlIHJlbmRlcmluZyBwcm9wZXJ0aWVzIHRvIGJlIGNvbnN1bWVkIGJ5IHRoZSBtb2R1bGUgYE1hdHRlci5SZW5kZXJgLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHJlbmRlclxuICAgICAqIEB0eXBlIG9iamVjdFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBmbGFnIHRoYXQgaW5kaWNhdGVzIGlmIHRoZSBjb25zdHJhaW50IHNob3VsZCBiZSByZW5kZXJlZC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSByZW5kZXIudmlzaWJsZVxuICAgICAqIEB0eXBlIGJvb2xlYW5cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBOdW1iZXJgIHRoYXQgZGVmaW5lcyB0aGUgbGluZSB3aWR0aCB0byB1c2Ugd2hlbiByZW5kZXJpbmcgdGhlIGNvbnN0cmFpbnQgb3V0bGluZS5cbiAgICAgKiBBIHZhbHVlIG9mIGAwYCBtZWFucyBubyBvdXRsaW5lIHdpbGwgYmUgcmVuZGVyZWQuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgcmVuZGVyLmxpbmVXaWR0aFxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDJcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYFN0cmluZ2AgdGhhdCBkZWZpbmVzIHRoZSBzdHJva2Ugc3R5bGUgdG8gdXNlIHdoZW4gcmVuZGVyaW5nIHRoZSBjb25zdHJhaW50IG91dGxpbmUuXG4gICAgICogSXQgaXMgdGhlIHNhbWUgYXMgd2hlbiB1c2luZyBhIGNhbnZhcywgc28gaXQgYWNjZXB0cyBDU1Mgc3R5bGUgcHJvcGVydHkgdmFsdWVzLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHJlbmRlci5zdHJva2VTdHlsZVxuICAgICAqIEB0eXBlIHN0cmluZ1xuICAgICAqIEBkZWZhdWx0IGEgcmFuZG9tIGNvbG91clxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgU3RyaW5nYCB0aGF0IGRlZmluZXMgdGhlIGNvbnN0cmFpbnQgcmVuZGVyaW5nIHR5cGUuIFxuICAgICAqIFRoZSBwb3NzaWJsZSB2YWx1ZXMgYXJlICdsaW5lJywgJ3BpbicsICdzcHJpbmcnLlxuICAgICAqIEFuIGFwcHJvcHJpYXRlIHJlbmRlciB0eXBlIHdpbGwgYmUgYXV0b21hdGljYWxseSBjaG9zZW4gdW5sZXNzIG9uZSBpcyBnaXZlbiBpbiBvcHRpb25zLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHJlbmRlci50eXBlXG4gICAgICogQHR5cGUgc3RyaW5nXG4gICAgICogQGRlZmF1bHQgJ2xpbmUnXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBCb29sZWFuYCB0aGF0IGRlZmluZXMgaWYgdGhlIGNvbnN0cmFpbnQncyBhbmNob3IgcG9pbnRzIHNob3VsZCBiZSByZW5kZXJlZC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSByZW5kZXIuYW5jaG9yc1xuICAgICAqIEB0eXBlIGJvb2xlYW5cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBUaGUgZmlyc3QgcG9zc2libGUgYEJvZHlgIHRoYXQgdGhpcyBjb25zdHJhaW50IGlzIGF0dGFjaGVkIHRvLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGJvZHlBXG4gICAgICogQHR5cGUgYm9keVxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIFRoZSBzZWNvbmQgcG9zc2libGUgYEJvZHlgIHRoYXQgdGhpcyBjb25zdHJhaW50IGlzIGF0dGFjaGVkIHRvLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGJvZHlCXG4gICAgICogQHR5cGUgYm9keVxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYFZlY3RvcmAgdGhhdCBzcGVjaWZpZXMgdGhlIG9mZnNldCBvZiB0aGUgY29uc3RyYWludCBmcm9tIGNlbnRlciBvZiB0aGUgYGNvbnN0cmFpbnQuYm9keUFgIGlmIGRlZmluZWQsIG90aGVyd2lzZSBhIHdvcmxkLXNwYWNlIHBvc2l0aW9uLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHBvaW50QVxuICAgICAqIEB0eXBlIHZlY3RvclxuICAgICAqIEBkZWZhdWx0IHsgeDogMCwgeTogMCB9XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBWZWN0b3JgIHRoYXQgc3BlY2lmaWVzIHRoZSBvZmZzZXQgb2YgdGhlIGNvbnN0cmFpbnQgZnJvbSBjZW50ZXIgb2YgdGhlIGBjb25zdHJhaW50LmJvZHlCYCBpZiBkZWZpbmVkLCBvdGhlcndpc2UgYSB3b3JsZC1zcGFjZSBwb3NpdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBwb2ludEJcbiAgICAgKiBAdHlwZSB2ZWN0b3JcbiAgICAgKiBAZGVmYXVsdCB7IHg6IDAsIHk6IDAgfVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgTnVtYmVyYCB0aGF0IHNwZWNpZmllcyB0aGUgc3RpZmZuZXNzIG9mIHRoZSBjb25zdHJhaW50LCBpLmUuIHRoZSByYXRlIGF0IHdoaWNoIGl0IHJldHVybnMgdG8gaXRzIHJlc3RpbmcgYGNvbnN0cmFpbnQubGVuZ3RoYC5cbiAgICAgKiBBIHZhbHVlIG9mIGAxYCBtZWFucyB0aGUgY29uc3RyYWludCBzaG91bGQgYmUgdmVyeSBzdGlmZi5cbiAgICAgKiBBIHZhbHVlIG9mIGAwLjJgIG1lYW5zIHRoZSBjb25zdHJhaW50IGFjdHMgbGlrZSBhIHNvZnQgc3ByaW5nLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHN0aWZmbmVzc1xuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDFcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYE51bWJlcmAgdGhhdCBzcGVjaWZpZXMgdGhlIGRhbXBpbmcgb2YgdGhlIGNvbnN0cmFpbnQsIFxuICAgICAqIGkuZS4gdGhlIGFtb3VudCBvZiByZXNpc3RhbmNlIGFwcGxpZWQgdG8gZWFjaCBib2R5IGJhc2VkIG9uIHRoZWlyIHZlbG9jaXRpZXMgdG8gbGltaXQgdGhlIGFtb3VudCBvZiBvc2NpbGxhdGlvbi5cbiAgICAgKiBEYW1waW5nIHdpbGwgb25seSBiZSBhcHBhcmVudCB3aGVuIHRoZSBjb25zdHJhaW50IGFsc28gaGFzIGEgdmVyeSBsb3cgYHN0aWZmbmVzc2AuXG4gICAgICogQSB2YWx1ZSBvZiBgMC4xYCBtZWFucyB0aGUgY29uc3RyYWludCB3aWxsIGFwcGx5IGhlYXZ5IGRhbXBpbmcsIHJlc3VsdGluZyBpbiBsaXR0bGUgdG8gbm8gb3NjaWxsYXRpb24uXG4gICAgICogQSB2YWx1ZSBvZiBgMGAgbWVhbnMgdGhlIGNvbnN0cmFpbnQgd2lsbCBhcHBseSBubyBkYW1waW5nLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGRhbXBpbmdcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBOdW1iZXJgIHRoYXQgc3BlY2lmaWVzIHRoZSB0YXJnZXQgcmVzdGluZyBsZW5ndGggb2YgdGhlIGNvbnN0cmFpbnQuIFxuICAgICAqIEl0IGlzIGNhbGN1bGF0ZWQgYXV0b21hdGljYWxseSBpbiBgQ29uc3RyYWludC5jcmVhdGVgIGZyb20gaW5pdGlhbCBwb3NpdGlvbnMgb2YgdGhlIGBjb25zdHJhaW50LmJvZHlBYCBhbmQgYGNvbnN0cmFpbnQuYm9keUJgLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGxlbmd0aFxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gb2JqZWN0IHJlc2VydmVkIGZvciBzdG9yaW5nIHBsdWdpbi1zcGVjaWZpYyBwcm9wZXJ0aWVzLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHBsdWdpblxuICAgICAqIEB0eXBlIHt9XG4gICAgICovXG5cbn0pKCk7XG5cbn0se1wiLi4vY29yZS9Db21tb25cIjoxNCxcIi4uL2NvcmUvU2xlZXBpbmdcIjoyMixcIi4uL2dlb21ldHJ5L0F4ZXNcIjoyNSxcIi4uL2dlb21ldHJ5L0JvdW5kc1wiOjI2LFwiLi4vZ2VvbWV0cnkvVmVjdG9yXCI6MjgsXCIuLi9nZW9tZXRyeS9WZXJ0aWNlc1wiOjI5fV0sMTM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyLk1vdXNlQ29uc3RyYWludGAgbW9kdWxlIGNvbnRhaW5zIG1ldGhvZHMgZm9yIGNyZWF0aW5nIG1vdXNlIGNvbnN0cmFpbnRzLlxuKiBNb3VzZSBjb25zdHJhaW50cyBhcmUgdXNlZCBmb3IgYWxsb3dpbmcgdXNlciBpbnRlcmFjdGlvbiwgcHJvdmlkaW5nIHRoZSBhYmlsaXR5IHRvIG1vdmUgYm9kaWVzIHZpYSB0aGUgbW91c2Ugb3IgdG91Y2guXG4qXG4qIFNlZSB0aGUgaW5jbHVkZWQgdXNhZ2UgW2V4YW1wbGVzXShodHRwczovL2dpdGh1Yi5jb20vbGlhYnJ1L21hdHRlci1qcy90cmVlL21hc3Rlci9leGFtcGxlcykuXG4qXG4qIEBjbGFzcyBNb3VzZUNvbnN0cmFpbnRcbiovXG5cbnZhciBNb3VzZUNvbnN0cmFpbnQgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBNb3VzZUNvbnN0cmFpbnQ7XG5cbnZhciBWZXJ0aWNlcyA9IF9kZXJlcV8oJy4uL2dlb21ldHJ5L1ZlcnRpY2VzJyk7XG52YXIgU2xlZXBpbmcgPSBfZGVyZXFfKCcuLi9jb3JlL1NsZWVwaW5nJyk7XG52YXIgTW91c2UgPSBfZGVyZXFfKCcuLi9jb3JlL01vdXNlJyk7XG52YXIgRXZlbnRzID0gX2RlcmVxXygnLi4vY29yZS9FdmVudHMnKTtcbnZhciBEZXRlY3RvciA9IF9kZXJlcV8oJy4uL2NvbGxpc2lvbi9EZXRlY3RvcicpO1xudmFyIENvbnN0cmFpbnQgPSBfZGVyZXFfKCcuL0NvbnN0cmFpbnQnKTtcbnZhciBDb21wb3NpdGUgPSBfZGVyZXFfKCcuLi9ib2R5L0NvbXBvc2l0ZScpO1xudmFyIENvbW1vbiA9IF9kZXJlcV8oJy4uL2NvcmUvQ29tbW9uJyk7XG52YXIgQm91bmRzID0gX2RlcmVxXygnLi4vZ2VvbWV0cnkvQm91bmRzJyk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgbW91c2UgY29uc3RyYWludC5cbiAgICAgKiBBbGwgcHJvcGVydGllcyBoYXZlIGRlZmF1bHQgdmFsdWVzLCBhbmQgbWFueSBhcmUgcHJlLWNhbGN1bGF0ZWQgYXV0b21hdGljYWxseSBiYXNlZCBvbiBvdGhlciBwcm9wZXJ0aWVzLlxuICAgICAqIFNlZSB0aGUgcHJvcGVydGllcyBzZWN0aW9uIGJlbG93IGZvciBkZXRhaWxlZCBpbmZvcm1hdGlvbiBvbiB3aGF0IHlvdSBjYW4gcGFzcyB2aWEgdGhlIGBvcHRpb25zYCBvYmplY3QuXG4gICAgICogQG1ldGhvZCBjcmVhdGVcbiAgICAgKiBAcGFyYW0ge2VuZ2luZX0gZW5naW5lXG4gICAgICogQHBhcmFtIHt9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtNb3VzZUNvbnN0cmFpbnR9IEEgbmV3IE1vdXNlQ29uc3RyYWludFxuICAgICAqL1xuICAgIE1vdXNlQ29uc3RyYWludC5jcmVhdGUgPSBmdW5jdGlvbihlbmdpbmUsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIG1vdXNlID0gKGVuZ2luZSA/IGVuZ2luZS5tb3VzZSA6IG51bGwpIHx8IChvcHRpb25zID8gb3B0aW9ucy5tb3VzZSA6IG51bGwpO1xuXG4gICAgICAgIGlmICghbW91c2UpIHtcbiAgICAgICAgICAgIGlmIChlbmdpbmUgJiYgZW5naW5lLnJlbmRlciAmJiBlbmdpbmUucmVuZGVyLmNhbnZhcykge1xuICAgICAgICAgICAgICAgIG1vdXNlID0gTW91c2UuY3JlYXRlKGVuZ2luZS5yZW5kZXIuY2FudmFzKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBtb3VzZSA9IE1vdXNlLmNyZWF0ZShvcHRpb25zLmVsZW1lbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtb3VzZSA9IE1vdXNlLmNyZWF0ZSgpO1xuICAgICAgICAgICAgICAgIENvbW1vbi53YXJuKCdNb3VzZUNvbnN0cmFpbnQuY3JlYXRlOiBvcHRpb25zLm1vdXNlIHdhcyB1bmRlZmluZWQsIG9wdGlvbnMuZWxlbWVudCB3YXMgdW5kZWZpbmVkLCBtYXkgbm90IGZ1bmN0aW9uIGFzIGV4cGVjdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY29uc3RyYWludCA9IENvbnN0cmFpbnQuY3JlYXRlKHsgXG4gICAgICAgICAgICBsYWJlbDogJ01vdXNlIENvbnN0cmFpbnQnLFxuICAgICAgICAgICAgcG9pbnRBOiBtb3VzZS5wb3NpdGlvbixcbiAgICAgICAgICAgIHBvaW50QjogeyB4OiAwLCB5OiAwIH0sXG4gICAgICAgICAgICBsZW5ndGg6IDAuMDEsIFxuICAgICAgICAgICAgc3RpZmZuZXNzOiAwLjEsXG4gICAgICAgICAgICBhbmd1bGFyU3RpZmZuZXNzOiAxLFxuICAgICAgICAgICAgcmVuZGVyOiB7XG4gICAgICAgICAgICAgICAgc3Ryb2tlU3R5bGU6ICcjOTBFRTkwJyxcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgdHlwZTogJ21vdXNlQ29uc3RyYWludCcsXG4gICAgICAgICAgICBtb3VzZTogbW91c2UsXG4gICAgICAgICAgICBlbGVtZW50OiBudWxsLFxuICAgICAgICAgICAgYm9keTogbnVsbCxcbiAgICAgICAgICAgIGNvbnN0cmFpbnQ6IGNvbnN0cmFpbnQsXG4gICAgICAgICAgICBjb2xsaXNpb25GaWx0ZXI6IHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogMHgwMDAxLFxuICAgICAgICAgICAgICAgIG1hc2s6IDB4RkZGRkZGRkYsXG4gICAgICAgICAgICAgICAgZ3JvdXA6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgbW91c2VDb25zdHJhaW50ID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICAgICAgRXZlbnRzLm9uKGVuZ2luZSwgJ2JlZm9yZVVwZGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGFsbEJvZGllcyA9IENvbXBvc2l0ZS5hbGxCb2RpZXMoZW5naW5lLndvcmxkKTtcbiAgICAgICAgICAgIE1vdXNlQ29uc3RyYWludC51cGRhdGUobW91c2VDb25zdHJhaW50LCBhbGxCb2RpZXMpO1xuICAgICAgICAgICAgTW91c2VDb25zdHJhaW50Ll90cmlnZ2VyRXZlbnRzKG1vdXNlQ29uc3RyYWludCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBtb3VzZUNvbnN0cmFpbnQ7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIGdpdmVuIG1vdXNlIGNvbnN0cmFpbnQuXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgICAqIEBwYXJhbSB7TW91c2VDb25zdHJhaW50fSBtb3VzZUNvbnN0cmFpbnRcbiAgICAgKiBAcGFyYW0ge2JvZHlbXX0gYm9kaWVzXG4gICAgICovXG4gICAgTW91c2VDb25zdHJhaW50LnVwZGF0ZSA9IGZ1bmN0aW9uKG1vdXNlQ29uc3RyYWludCwgYm9kaWVzKSB7XG4gICAgICAgIHZhciBtb3VzZSA9IG1vdXNlQ29uc3RyYWludC5tb3VzZSxcbiAgICAgICAgICAgIGNvbnN0cmFpbnQgPSBtb3VzZUNvbnN0cmFpbnQuY29uc3RyYWludCxcbiAgICAgICAgICAgIGJvZHkgPSBtb3VzZUNvbnN0cmFpbnQuYm9keTtcblxuICAgICAgICBpZiAobW91c2UuYnV0dG9uID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoIWNvbnN0cmFpbnQuYm9keUIpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvZGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBib2R5ID0gYm9kaWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoQm91bmRzLmNvbnRhaW5zKGJvZHkuYm91bmRzLCBtb3VzZS5wb3NpdGlvbikgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgRGV0ZWN0b3IuY2FuQ29sbGlkZShib2R5LmNvbGxpc2lvbkZpbHRlciwgbW91c2VDb25zdHJhaW50LmNvbGxpc2lvbkZpbHRlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSBib2R5LnBhcnRzLmxlbmd0aCA+IDEgPyAxIDogMDsgaiA8IGJvZHkucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFydCA9IGJvZHkucGFydHNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFZlcnRpY2VzLmNvbnRhaW5zKHBhcnQudmVydGljZXMsIG1vdXNlLnBvc2l0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdHJhaW50LnBvaW50QSA9IG1vdXNlLnBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdHJhaW50LmJvZHlCID0gbW91c2VDb25zdHJhaW50LmJvZHkgPSBib2R5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdHJhaW50LnBvaW50QiA9IHsgeDogbW91c2UucG9zaXRpb24ueCAtIGJvZHkucG9zaXRpb24ueCwgeTogbW91c2UucG9zaXRpb24ueSAtIGJvZHkucG9zaXRpb24ueSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdHJhaW50LmFuZ2xlQiA9IGJvZHkuYW5nbGU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2xlZXBpbmcuc2V0KGJvZHksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXZlbnRzLnRyaWdnZXIobW91c2VDb25zdHJhaW50LCAnc3RhcnRkcmFnJywgeyBtb3VzZTogbW91c2UsIGJvZHk6IGJvZHkgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBTbGVlcGluZy5zZXQoY29uc3RyYWludC5ib2R5QiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGNvbnN0cmFpbnQucG9pbnRBID0gbW91c2UucG9zaXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdHJhaW50LmJvZHlCID0gbW91c2VDb25zdHJhaW50LmJvZHkgPSBudWxsO1xuICAgICAgICAgICAgY29uc3RyYWludC5wb2ludEIgPSBudWxsO1xuXG4gICAgICAgICAgICBpZiAoYm9keSlcbiAgICAgICAgICAgICAgICBFdmVudHMudHJpZ2dlcihtb3VzZUNvbnN0cmFpbnQsICdlbmRkcmFnJywgeyBtb3VzZTogbW91c2UsIGJvZHk6IGJvZHkgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgbW91c2UgY29uc3RyYWludCBldmVudHMuXG4gICAgICogQG1ldGhvZCBfdHJpZ2dlckV2ZW50c1xuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHttb3VzZX0gbW91c2VDb25zdHJhaW50XG4gICAgICovXG4gICAgTW91c2VDb25zdHJhaW50Ll90cmlnZ2VyRXZlbnRzID0gZnVuY3Rpb24obW91c2VDb25zdHJhaW50KSB7XG4gICAgICAgIHZhciBtb3VzZSA9IG1vdXNlQ29uc3RyYWludC5tb3VzZSxcbiAgICAgICAgICAgIG1vdXNlRXZlbnRzID0gbW91c2Uuc291cmNlRXZlbnRzO1xuXG4gICAgICAgIGlmIChtb3VzZUV2ZW50cy5tb3VzZW1vdmUpXG4gICAgICAgICAgICBFdmVudHMudHJpZ2dlcihtb3VzZUNvbnN0cmFpbnQsICdtb3VzZW1vdmUnLCB7IG1vdXNlOiBtb3VzZSB9KTtcblxuICAgICAgICBpZiAobW91c2VFdmVudHMubW91c2Vkb3duKVxuICAgICAgICAgICAgRXZlbnRzLnRyaWdnZXIobW91c2VDb25zdHJhaW50LCAnbW91c2Vkb3duJywgeyBtb3VzZTogbW91c2UgfSk7XG5cbiAgICAgICAgaWYgKG1vdXNlRXZlbnRzLm1vdXNldXApXG4gICAgICAgICAgICBFdmVudHMudHJpZ2dlcihtb3VzZUNvbnN0cmFpbnQsICdtb3VzZXVwJywgeyBtb3VzZTogbW91c2UgfSk7XG5cbiAgICAgICAgLy8gcmVzZXQgdGhlIG1vdXNlIHN0YXRlIHJlYWR5IGZvciB0aGUgbmV4dCBzdGVwXG4gICAgICAgIE1vdXNlLmNsZWFyU291cmNlRXZlbnRzKG1vdXNlKTtcbiAgICB9O1xuXG4gICAgLypcbiAgICAqXG4gICAgKiAgRXZlbnRzIERvY3VtZW50YXRpb25cbiAgICAqXG4gICAgKi9cblxuICAgIC8qKlxuICAgICogRmlyZWQgd2hlbiB0aGUgbW91c2UgaGFzIG1vdmVkIChvciBhIHRvdWNoIG1vdmVzKSBkdXJpbmcgdGhlIGxhc3Qgc3RlcFxuICAgICpcbiAgICAqIEBldmVudCBtb3VzZW1vdmVcbiAgICAqIEBwYXJhbSB7fSBldmVudCBBbiBldmVudCBvYmplY3RcbiAgICAqIEBwYXJhbSB7bW91c2V9IGV2ZW50Lm1vdXNlIFRoZSBlbmdpbmUncyBtb3VzZSBpbnN0YW5jZVxuICAgICogQHBhcmFtIHt9IGV2ZW50LnNvdXJjZSBUaGUgc291cmNlIG9iamVjdCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5uYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudFxuICAgICovXG5cbiAgICAvKipcbiAgICAqIEZpcmVkIHdoZW4gdGhlIG1vdXNlIGlzIGRvd24gKG9yIGEgdG91Y2ggaGFzIHN0YXJ0ZWQpIGR1cmluZyB0aGUgbGFzdCBzdGVwXG4gICAgKlxuICAgICogQGV2ZW50IG1vdXNlZG93blxuICAgICogQHBhcmFtIHt9IGV2ZW50IEFuIGV2ZW50IG9iamVjdFxuICAgICogQHBhcmFtIHttb3VzZX0gZXZlbnQubW91c2UgVGhlIGVuZ2luZSdzIG1vdXNlIGluc3RhbmNlXG4gICAgKiBAcGFyYW0ge30gZXZlbnQuc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0IG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAgKi9cblxuICAgIC8qKlxuICAgICogRmlyZWQgd2hlbiB0aGUgbW91c2UgaXMgdXAgKG9yIGEgdG91Y2ggaGFzIGVuZGVkKSBkdXJpbmcgdGhlIGxhc3Qgc3RlcFxuICAgICpcbiAgICAqIEBldmVudCBtb3VzZXVwXG4gICAgKiBAcGFyYW0ge30gZXZlbnQgQW4gZXZlbnQgb2JqZWN0XG4gICAgKiBAcGFyYW0ge21vdXNlfSBldmVudC5tb3VzZSBUaGUgZW5naW5lJ3MgbW91c2UgaW5zdGFuY2VcbiAgICAqIEBwYXJhbSB7fSBldmVudC5zb3VyY2UgVGhlIHNvdXJjZSBvYmplY3Qgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQubmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcbiAgICAqL1xuXG4gICAgLyoqXG4gICAgKiBGaXJlZCB3aGVuIHRoZSB1c2VyIHN0YXJ0cyBkcmFnZ2luZyBhIGJvZHlcbiAgICAqXG4gICAgKiBAZXZlbnQgc3RhcnRkcmFnXG4gICAgKiBAcGFyYW0ge30gZXZlbnQgQW4gZXZlbnQgb2JqZWN0XG4gICAgKiBAcGFyYW0ge21vdXNlfSBldmVudC5tb3VzZSBUaGUgZW5naW5lJ3MgbW91c2UgaW5zdGFuY2VcbiAgICAqIEBwYXJhbSB7Ym9keX0gZXZlbnQuYm9keSBUaGUgYm9keSBiZWluZyBkcmFnZ2VkXG4gICAgKiBAcGFyYW0ge30gZXZlbnQuc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0IG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAgKi9cblxuICAgIC8qKlxuICAgICogRmlyZWQgd2hlbiB0aGUgdXNlciBlbmRzIGRyYWdnaW5nIGEgYm9keVxuICAgICpcbiAgICAqIEBldmVudCBlbmRkcmFnXG4gICAgKiBAcGFyYW0ge30gZXZlbnQgQW4gZXZlbnQgb2JqZWN0XG4gICAgKiBAcGFyYW0ge21vdXNlfSBldmVudC5tb3VzZSBUaGUgZW5naW5lJ3MgbW91c2UgaW5zdGFuY2VcbiAgICAqIEBwYXJhbSB7Ym9keX0gZXZlbnQuYm9keSBUaGUgYm9keSB0aGF0IGhhcyBzdG9wcGVkIGJlaW5nIGRyYWdnZWRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5zb3VyY2UgVGhlIHNvdXJjZSBvYmplY3Qgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQubmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcbiAgICAqL1xuXG4gICAgLypcbiAgICAqXG4gICAgKiAgUHJvcGVydGllcyBEb2N1bWVudGF0aW9uXG4gICAgKlxuICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBTdHJpbmdgIGRlbm90aW5nIHRoZSB0eXBlIG9mIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB0eXBlXG4gICAgICogQHR5cGUgc3RyaW5nXG4gICAgICogQGRlZmF1bHQgXCJjb25zdHJhaW50XCJcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIFRoZSBgTW91c2VgIGluc3RhbmNlIGluIHVzZS4gSWYgbm90IHN1cHBsaWVkIGluIGBNb3VzZUNvbnN0cmFpbnQuY3JlYXRlYCwgb25lIHdpbGwgYmUgY3JlYXRlZC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBtb3VzZVxuICAgICAqIEB0eXBlIG1vdXNlXG4gICAgICogQGRlZmF1bHQgbW91c2VcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIFRoZSBgQm9keWAgdGhhdCBpcyBjdXJyZW50bHkgYmVpbmcgbW92ZWQgYnkgdGhlIHVzZXIsIG9yIGBudWxsYCBpZiBubyBib2R5LlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGJvZHlcbiAgICAgKiBAdHlwZSBib2R5XG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogVGhlIGBDb25zdHJhaW50YCBvYmplY3QgdGhhdCBpcyB1c2VkIHRvIG1vdmUgdGhlIGJvZHkgZHVyaW5nIGludGVyYWN0aW9uLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGNvbnN0cmFpbnRcbiAgICAgKiBAdHlwZSBjb25zdHJhaW50XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBbiBgT2JqZWN0YCB0aGF0IHNwZWNpZmllcyB0aGUgY29sbGlzaW9uIGZpbHRlciBwcm9wZXJ0aWVzLlxuICAgICAqIFRoZSBjb2xsaXNpb24gZmlsdGVyIGFsbG93cyB0aGUgdXNlciB0byBkZWZpbmUgd2hpY2ggdHlwZXMgb2YgYm9keSB0aGlzIG1vdXNlIGNvbnN0cmFpbnQgY2FuIGludGVyYWN0IHdpdGguXG4gICAgICogU2VlIGBib2R5LmNvbGxpc2lvbkZpbHRlcmAgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgY29sbGlzaW9uRmlsdGVyXG4gICAgICogQHR5cGUgb2JqZWN0XG4gICAgICovXG5cbn0pKCk7XG5cbn0se1wiLi4vYm9keS9Db21wb3NpdGVcIjoyLFwiLi4vY29sbGlzaW9uL0RldGVjdG9yXCI6NSxcIi4uL2NvcmUvQ29tbW9uXCI6MTQsXCIuLi9jb3JlL0V2ZW50c1wiOjE2LFwiLi4vY29yZS9Nb3VzZVwiOjE5LFwiLi4vY29yZS9TbGVlcGluZ1wiOjIyLFwiLi4vZ2VvbWV0cnkvQm91bmRzXCI6MjYsXCIuLi9nZW9tZXRyeS9WZXJ0aWNlc1wiOjI5LFwiLi9Db25zdHJhaW50XCI6MTJ9XSwxNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKGdsb2JhbCl7XG4vKipcbiogVGhlIGBNYXR0ZXIuQ29tbW9uYCBtb2R1bGUgY29udGFpbnMgdXRpbGl0eSBmdW5jdGlvbnMgdGhhdCBhcmUgY29tbW9uIHRvIGFsbCBtb2R1bGVzLlxuKlxuKiBAY2xhc3MgQ29tbW9uXG4qL1xuXG52YXIgQ29tbW9uID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tbW9uO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICBDb21tb24uX25leHRJZCA9IDA7XG4gICAgQ29tbW9uLl9zZWVkID0gMDtcbiAgICBDb21tb24uX25vd1N0YXJ0VGltZSA9ICsobmV3IERhdGUoKSk7XG5cbiAgICAvKipcbiAgICAgKiBFeHRlbmRzIHRoZSBvYmplY3QgaW4gdGhlIGZpcnN0IGFyZ3VtZW50IHVzaW5nIHRoZSBvYmplY3QgaW4gdGhlIHNlY29uZCBhcmd1bWVudC5cbiAgICAgKiBAbWV0aG9kIGV4dGVuZFxuICAgICAqIEBwYXJhbSB7fSBvYmpcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRlZXBcbiAgICAgKiBAcmV0dXJuIHt9IG9iaiBleHRlbmRlZFxuICAgICAqL1xuICAgIENvbW1vbi5leHRlbmQgPSBmdW5jdGlvbihvYmosIGRlZXApIHtcbiAgICAgICAgdmFyIGFyZ3NTdGFydCxcbiAgICAgICAgICAgIGFyZ3MsXG4gICAgICAgICAgICBkZWVwQ2xvbmU7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBkZWVwID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIGFyZ3NTdGFydCA9IDI7XG4gICAgICAgICAgICBkZWVwQ2xvbmUgPSBkZWVwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXJnc1N0YXJ0ID0gMTtcbiAgICAgICAgICAgIGRlZXBDbG9uZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gYXJnc1N0YXJ0OyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlZXBDbG9uZSAmJiBzb3VyY2VbcHJvcF0gJiYgc291cmNlW3Byb3BdLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb2JqW3Byb3BdIHx8IG9ialtwcm9wXS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqW3Byb3BdID0gb2JqW3Byb3BdIHx8IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbW1vbi5leHRlbmQob2JqW3Byb3BdLCBkZWVwQ2xvbmUsIHNvdXJjZVtwcm9wXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ialtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ialtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBjbG9uZSBvZiB0aGUgb2JqZWN0LCBpZiBkZWVwIGlzIHRydWUgcmVmZXJlbmNlcyB3aWxsIGFsc28gYmUgY2xvbmVkLlxuICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgKiBAcGFyYW0ge30gb2JqXG4gICAgICogQHBhcmFtIHtib29sfSBkZWVwXG4gICAgICogQHJldHVybiB7fSBvYmogY2xvbmVkXG4gICAgICovXG4gICAgQ29tbW9uLmNsb25lID0gZnVuY3Rpb24ob2JqLCBkZWVwKSB7XG4gICAgICAgIHJldHVybiBDb21tb24uZXh0ZW5kKHt9LCBkZWVwLCBvYmopO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBsaXN0IG9mIGtleXMgZm9yIHRoZSBnaXZlbiBvYmplY3QuXG4gICAgICogQG1ldGhvZCBrZXlzXG4gICAgICogQHBhcmFtIHt9IG9ialxuICAgICAqIEByZXR1cm4ge3N0cmluZ1tdfSBrZXlzXG4gICAgICovXG4gICAgQ29tbW9uLmtleXMgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKVxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaik7XG5cbiAgICAgICAgLy8gYXZvaWQgaGFzT3duUHJvcGVydHkgZm9yIHBlcmZvcm1hbmNlXG4gICAgICAgIHZhciBrZXlzID0gW107XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopXG4gICAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxpc3Qgb2YgdmFsdWVzIGZvciB0aGUgZ2l2ZW4gb2JqZWN0LlxuICAgICAqIEBtZXRob2QgdmFsdWVzXG4gICAgICogQHBhcmFtIHt9IG9ialxuICAgICAqIEByZXR1cm4ge2FycmF5fSBBcnJheSBvZiB0aGUgb2JqZWN0cyBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgKi9cbiAgICBDb21tb24udmFsdWVzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGlmIChPYmplY3Qua2V5cykge1xuICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzLnB1c2gob2JqW2tleXNbaV1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIGF2b2lkIGhhc093blByb3BlcnR5IGZvciBwZXJmb3JtYW5jZVxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKVxuICAgICAgICAgICAgdmFsdWVzLnB1c2gob2JqW2tleV0pO1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgdmFsdWUgZnJvbSBgYmFzZWAgcmVsYXRpdmUgdG8gdGhlIGBwYXRoYCBzdHJpbmcuXG4gICAgICogQG1ldGhvZCBnZXRcbiAgICAgKiBAcGFyYW0ge30gb2JqIFRoZSBiYXNlIG9iamVjdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHJlbGF0aXZlIHRvIGBiYXNlYCwgZS5nLiAnRm9vLkJhci5iYXonXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtiZWdpbl0gUGF0aCBzbGljZSBiZWdpblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbZW5kXSBQYXRoIHNsaWNlIGVuZFxuICAgICAqIEByZXR1cm4ge30gVGhlIG9iamVjdCBhdCB0aGUgZ2l2ZW4gcGF0aFxuICAgICAqL1xuICAgIENvbW1vbi5nZXQgPSBmdW5jdGlvbihvYmosIHBhdGgsIGJlZ2luLCBlbmQpIHtcbiAgICAgICAgcGF0aCA9IHBhdGguc3BsaXQoJy4nKS5zbGljZShiZWdpbiwgZW5kKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIG9iaiA9IG9ialtwYXRoW2ldXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNldHMgYSB2YWx1ZSBvbiBgYmFzZWAgcmVsYXRpdmUgdG8gdGhlIGdpdmVuIGBwYXRoYCBzdHJpbmcuXG4gICAgICogQG1ldGhvZCBzZXRcbiAgICAgKiBAcGFyYW0ge30gb2JqIFRoZSBiYXNlIG9iamVjdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHJlbGF0aXZlIHRvIGBiYXNlYCwgZS5nLiAnRm9vLkJhci5iYXonXG4gICAgICogQHBhcmFtIHt9IHZhbCBUaGUgdmFsdWUgdG8gc2V0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtiZWdpbl0gUGF0aCBzbGljZSBiZWdpblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbZW5kXSBQYXRoIHNsaWNlIGVuZFxuICAgICAqIEByZXR1cm4ge30gUGFzcyB0aHJvdWdoIGB2YWxgIGZvciBjaGFpbmluZ1xuICAgICAqL1xuICAgIENvbW1vbi5zZXQgPSBmdW5jdGlvbihvYmosIHBhdGgsIHZhbCwgYmVnaW4sIGVuZCkge1xuICAgICAgICB2YXIgcGFydHMgPSBwYXRoLnNwbGl0KCcuJykuc2xpY2UoYmVnaW4sIGVuZCk7XG4gICAgICAgIENvbW1vbi5nZXQob2JqLCBwYXRoLCAwLCAtMSlbcGFydHNbcGFydHMubGVuZ3RoIC0gMV1dID0gdmFsO1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTaHVmZmxlcyB0aGUgZ2l2ZW4gYXJyYXkgaW4tcGxhY2UuXG4gICAgICogVGhlIGZ1bmN0aW9uIHVzZXMgYSBzZWVkZWQgcmFuZG9tIGdlbmVyYXRvci5cbiAgICAgKiBAbWV0aG9kIHNodWZmbGVcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBhcnJheVxuICAgICAqIEByZXR1cm4ge2FycmF5fSBhcnJheSBzaHVmZmxlZCByYW5kb21seVxuICAgICAqL1xuICAgIENvbW1vbi5zaHVmZmxlID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IGFycmF5Lmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgIHZhciBqID0gTWF0aC5mbG9vcihDb21tb24ucmFuZG9tKCkgKiAoaSArIDEpKTtcbiAgICAgICAgICAgIHZhciB0ZW1wID0gYXJyYXlbaV07XG4gICAgICAgICAgICBhcnJheVtpXSA9IGFycmF5W2pdO1xuICAgICAgICAgICAgYXJyYXlbal0gPSB0ZW1wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmFuZG9tbHkgY2hvb3NlcyBhIHZhbHVlIGZyb20gYSBsaXN0IHdpdGggZXF1YWwgcHJvYmFiaWxpdHkuXG4gICAgICogVGhlIGZ1bmN0aW9uIHVzZXMgYSBzZWVkZWQgcmFuZG9tIGdlbmVyYXRvci5cbiAgICAgKiBAbWV0aG9kIGNob29zZVxuICAgICAqIEBwYXJhbSB7YXJyYXl9IGNob2ljZXNcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IEEgcmFuZG9tIGNob2ljZSBvYmplY3QgZnJvbSB0aGUgYXJyYXlcbiAgICAgKi9cbiAgICBDb21tb24uY2hvb3NlID0gZnVuY3Rpb24oY2hvaWNlcykge1xuICAgICAgICByZXR1cm4gY2hvaWNlc1tNYXRoLmZsb29yKENvbW1vbi5yYW5kb20oKSAqIGNob2ljZXMubGVuZ3RoKV07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgb2JqZWN0IGlzIGEgSFRNTEVsZW1lbnQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKiBAbWV0aG9kIGlzRWxlbWVudFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmpcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBvYmplY3QgaXMgYSBIVE1MRWxlbWVudCwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgICovXG4gICAgQ29tbW9uLmlzRWxlbWVudCA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBpZiAodHlwZW9mIEhUTUxFbGVtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhKG9iaiAmJiBvYmoubm9kZVR5cGUgJiYgb2JqLm5vZGVOYW1lKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBvYmplY3QgaXMgYW4gYXJyYXkuXG4gICAgICogQG1ldGhvZCBpc0FycmF5XG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9ialxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG9iamVjdCBpcyBhbiBhcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgICovXG4gICAgQ29tbW9uLmlzQXJyYXkgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIG9iamVjdCBpcyBhIGZ1bmN0aW9uLlxuICAgICAqIEBtZXRob2QgaXNGdW5jdGlvblxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmpcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBvYmplY3QgaXMgYSBmdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgICovXG4gICAgQ29tbW9uLmlzRnVuY3Rpb24gPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBvYmplY3QgaXMgYSBwbGFpbiBvYmplY3QuXG4gICAgICogQG1ldGhvZCBpc1BsYWluT2JqZWN0XG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9ialxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG9iamVjdCBpcyBhIHBsYWluIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgICovXG4gICAgQ29tbW9uLmlzUGxhaW5PYmplY3QgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIG9iamVjdCBpcyBhIHN0cmluZy5cbiAgICAgKiBAbWV0aG9kIGlzU3RyaW5nXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9ialxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG9iamVjdCBpcyBhIHN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gICAgICovXG4gICAgQ29tbW9uLmlzU3RyaW5nID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZ2l2ZW4gdmFsdWUgY2xhbXBlZCBiZXR3ZWVuIGEgbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZS5cbiAgICAgKiBAbWV0aG9kIGNsYW1wXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1pblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSB2YWx1ZSBjbGFtcGVkIGJldHdlZW4gbWluIGFuZCBtYXggaW5jbHVzaXZlXG4gICAgICovXG4gICAgQ29tbW9uLmNsYW1wID0gZnVuY3Rpb24odmFsdWUsIG1pbiwgbWF4KSB7XG4gICAgICAgIGlmICh2YWx1ZSA8IG1pbilcbiAgICAgICAgICAgIHJldHVybiBtaW47XG4gICAgICAgIGlmICh2YWx1ZSA+IG1heClcbiAgICAgICAgICAgIHJldHVybiBtYXg7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHNpZ24gb2YgdGhlIGdpdmVuIHZhbHVlLlxuICAgICAqIEBtZXRob2Qgc2lnblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge251bWJlcn0gLTEgaWYgbmVnYXRpdmUsICsxIGlmIDAgb3IgcG9zaXRpdmVcbiAgICAgKi9cbiAgICBDb21tb24uc2lnbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA8IDAgPyAtMSA6IDE7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHRpbWVzdGFtcCBzaW5jZSB0aGUgdGltZSBvcmlnaW4gKGUuZy4gZnJvbSBwYWdlIGxvYWQpLlxuICAgICAqIFRoZSByZXN1bHQgd2lsbCBiZSBoaWdoLXJlc29sdXRpb24gaW5jbHVkaW5nIGRlY2ltYWwgcGxhY2VzIGlmIGF2YWlsYWJsZS5cbiAgICAgKiBAbWV0aG9kIG5vd1xuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIGN1cnJlbnQgdGltZXN0YW1wXG4gICAgICovXG4gICAgQ29tbW9uLm5vdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAod2luZG93LnBlcmZvcm1hbmNlKSB7XG4gICAgICAgICAgICBpZiAod2luZG93LnBlcmZvcm1hbmNlLm5vdykge1xuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5wZXJmb3JtYW5jZS53ZWJraXROb3cpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LnBlcmZvcm1hbmNlLndlYmtpdE5vdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChuZXcgRGF0ZSgpKSAtIENvbW1vbi5fbm93U3RhcnRUaW1lO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHJhbmRvbSB2YWx1ZSBiZXR3ZWVuIGEgbWluaW11bSBhbmQgYSBtYXhpbXVtIHZhbHVlIGluY2x1c2l2ZS5cbiAgICAgKiBUaGUgZnVuY3Rpb24gdXNlcyBhIHNlZWRlZCByYW5kb20gZ2VuZXJhdG9yLlxuICAgICAqIEBtZXRob2QgcmFuZG9tXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1pblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IEEgcmFuZG9tIG51bWJlciBiZXR3ZWVuIG1pbiBhbmQgbWF4IGluY2x1c2l2ZVxuICAgICAqL1xuICAgIENvbW1vbi5yYW5kb20gPSBmdW5jdGlvbihtaW4sIG1heCkge1xuICAgICAgICBtaW4gPSAodHlwZW9mIG1pbiAhPT0gXCJ1bmRlZmluZWRcIikgPyBtaW4gOiAwO1xuICAgICAgICBtYXggPSAodHlwZW9mIG1heCAhPT0gXCJ1bmRlZmluZWRcIikgPyBtYXggOiAxO1xuICAgICAgICByZXR1cm4gbWluICsgX3NlZWRlZFJhbmRvbSgpICogKG1heCAtIG1pbik7XG4gICAgfTtcblxuICAgIHZhciBfc2VlZGVkUmFuZG9tID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xpbmVhcl9jb25ncnVlbnRpYWxfZ2VuZXJhdG9yXG4gICAgICAgIENvbW1vbi5fc2VlZCA9IChDb21tb24uX3NlZWQgKiA5MzAxICsgNDkyOTcpICUgMjMzMjgwO1xuICAgICAgICByZXR1cm4gQ29tbW9uLl9zZWVkIC8gMjMzMjgwO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIENTUyBoZXggY29sb3VyIHN0cmluZyBpbnRvIGFuIGludGVnZXIuXG4gICAgICogQG1ldGhvZCBjb2xvclRvTnVtYmVyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yU3RyaW5nXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBBbiBpbnRlZ2VyIHJlcHJlc2VudGluZyB0aGUgQ1NTIGhleCBzdHJpbmdcbiAgICAgKi9cbiAgICBDb21tb24uY29sb3JUb051bWJlciA9IGZ1bmN0aW9uKGNvbG9yU3RyaW5nKSB7XG4gICAgICAgIGNvbG9yU3RyaW5nID0gY29sb3JTdHJpbmcucmVwbGFjZSgnIycsJycpO1xuXG4gICAgICAgIGlmIChjb2xvclN0cmluZy5sZW5ndGggPT0gMykge1xuICAgICAgICAgICAgY29sb3JTdHJpbmcgPSBjb2xvclN0cmluZy5jaGFyQXQoMCkgKyBjb2xvclN0cmluZy5jaGFyQXQoMClcbiAgICAgICAgICAgICAgICAgICAgICAgICsgY29sb3JTdHJpbmcuY2hhckF0KDEpICsgY29sb3JTdHJpbmcuY2hhckF0KDEpXG4gICAgICAgICAgICAgICAgICAgICAgICArIGNvbG9yU3RyaW5nLmNoYXJBdCgyKSArIGNvbG9yU3RyaW5nLmNoYXJBdCgyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJzZUludChjb2xvclN0cmluZywgMTYpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29uc29sZSBsb2dnaW5nIGxldmVsIHRvIHVzZSwgd2hlcmUgZWFjaCBsZXZlbCBpbmNsdWRlcyBhbGwgbGV2ZWxzIGFib3ZlIGFuZCBleGNsdWRlcyB0aGUgbGV2ZWxzIGJlbG93LlxuICAgICAqIFRoZSBkZWZhdWx0IGxldmVsIGlzICdkZWJ1Zycgd2hpY2ggc2hvd3MgYWxsIGNvbnNvbGUgbWVzc2FnZXMuICBcbiAgICAgKlxuICAgICAqIFBvc3NpYmxlIGxldmVsIHZhbHVlcyBhcmU6XG4gICAgICogLSAwID0gTm9uZVxuICAgICAqIC0gMSA9IERlYnVnXG4gICAgICogLSAyID0gSW5mb1xuICAgICAqIC0gMyA9IFdhcm5cbiAgICAgKiAtIDQgPSBFcnJvclxuICAgICAqIEBwcm9wZXJ0eSBDb21tb24ubG9nTGV2ZWxcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEBkZWZhdWx0IDFcbiAgICAgKi9cbiAgICBDb21tb24ubG9nTGV2ZWwgPSAxO1xuXG4gICAgLyoqXG4gICAgICogU2hvd3MgYSBgY29uc29sZS5sb2dgIG1lc3NhZ2Ugb25seSBpZiB0aGUgY3VycmVudCBgQ29tbW9uLmxvZ0xldmVsYCBhbGxvd3MgaXQuXG4gICAgICogVGhlIG1lc3NhZ2Ugd2lsbCBiZSBwcmVmaXhlZCB3aXRoICdtYXR0ZXItanMnIHRvIG1ha2UgaXQgZWFzaWx5IGlkZW50aWZpYWJsZS5cbiAgICAgKiBAbWV0aG9kIGxvZ1xuICAgICAqIEBwYXJhbSAuLi5vYmpzIHt9IFRoZSBvYmplY3RzIHRvIGxvZy5cbiAgICAgKi9cbiAgICBDb21tb24ubG9nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChjb25zb2xlICYmIENvbW1vbi5sb2dMZXZlbCA+IDAgJiYgQ29tbW9uLmxvZ0xldmVsIDw9IDMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIFsnbWF0dGVyLWpzOiddLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2hvd3MgYSBgY29uc29sZS5pbmZvYCBtZXNzYWdlIG9ubHkgaWYgdGhlIGN1cnJlbnQgYENvbW1vbi5sb2dMZXZlbGAgYWxsb3dzIGl0LlxuICAgICAqIFRoZSBtZXNzYWdlIHdpbGwgYmUgcHJlZml4ZWQgd2l0aCAnbWF0dGVyLWpzJyB0byBtYWtlIGl0IGVhc2lseSBpZGVudGlmaWFibGUuXG4gICAgICogQG1ldGhvZCBpbmZvXG4gICAgICogQHBhcmFtIC4uLm9ianMge30gVGhlIG9iamVjdHMgdG8gbG9nLlxuICAgICAqL1xuICAgIENvbW1vbi5pbmZvID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChjb25zb2xlICYmIENvbW1vbi5sb2dMZXZlbCA+IDAgJiYgQ29tbW9uLmxvZ0xldmVsIDw9IDIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mby5hcHBseShjb25zb2xlLCBbJ21hdHRlci1qczonXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNob3dzIGEgYGNvbnNvbGUud2FybmAgbWVzc2FnZSBvbmx5IGlmIHRoZSBjdXJyZW50IGBDb21tb24ubG9nTGV2ZWxgIGFsbG93cyBpdC5cbiAgICAgKiBUaGUgbWVzc2FnZSB3aWxsIGJlIHByZWZpeGVkIHdpdGggJ21hdHRlci1qcycgdG8gbWFrZSBpdCBlYXNpbHkgaWRlbnRpZmlhYmxlLlxuICAgICAqIEBtZXRob2Qgd2FyblxuICAgICAqIEBwYXJhbSAuLi5vYmpzIHt9IFRoZSBvYmplY3RzIHRvIGxvZy5cbiAgICAgKi9cbiAgICBDb21tb24ud2FybiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoY29uc29sZSAmJiBDb21tb24ubG9nTGV2ZWwgPiAwICYmIENvbW1vbi5sb2dMZXZlbCA8PSAzKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4uYXBwbHkoY29uc29sZSwgWydtYXR0ZXItanM6J10uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBuZXh0IHVuaXF1ZSBzZXF1ZW50aWFsIElELlxuICAgICAqIEBtZXRob2QgbmV4dElkXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBVbmlxdWUgc2VxdWVudGlhbCBJRFxuICAgICAqL1xuICAgIENvbW1vbi5uZXh0SWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIENvbW1vbi5fbmV4dElkKys7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEEgY3Jvc3MgYnJvd3NlciBjb21wYXRpYmxlIGluZGV4T2YgaW1wbGVtZW50YXRpb24uXG4gICAgICogQG1ldGhvZCBpbmRleE9mXG4gICAgICogQHBhcmFtIHthcnJheX0gaGF5c3RhY2tcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbmVlZGxlXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBUaGUgcG9zaXRpb24gb2YgbmVlZGxlIGluIGhheXN0YWNrLCBvdGhlcndpc2UgLTEuXG4gICAgICovXG4gICAgQ29tbW9uLmluZGV4T2YgPSBmdW5jdGlvbihoYXlzdGFjaywgbmVlZGxlKSB7XG4gICAgICAgIGlmIChoYXlzdGFjay5pbmRleE9mKVxuICAgICAgICAgICAgcmV0dXJuIGhheXN0YWNrLmluZGV4T2YobmVlZGxlKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhheXN0YWNrLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaGF5c3RhY2tbaV0gPT09IG5lZWRsZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQSBjcm9zcyBicm93c2VyIGNvbXBhdGlibGUgYXJyYXkgbWFwIGltcGxlbWVudGF0aW9uLlxuICAgICAqIEBtZXRob2QgbWFwXG4gICAgICogQHBhcmFtIHthcnJheX0gbGlzdFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmNcbiAgICAgKiBAcmV0dXJuIHthcnJheX0gVmFsdWVzIGZyb20gbGlzdCB0cmFuc2Zvcm1lZCBieSBmdW5jLlxuICAgICAqL1xuICAgIENvbW1vbi5tYXAgPSBmdW5jdGlvbihsaXN0LCBmdW5jKSB7XG4gICAgICAgIGlmIChsaXN0Lm1hcCkge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3QubWFwKGZ1bmMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1hcHBlZCA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgbWFwcGVkLnB1c2goZnVuYyhsaXN0W2ldKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWFwcGVkO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUYWtlcyBhIGRpcmVjdGVkIGdyYXBoIGFuZCByZXR1cm5zIHRoZSBwYXJ0aWFsbHkgb3JkZXJlZCBzZXQgb2YgdmVydGljZXMgaW4gdG9wb2xvZ2ljYWwgb3JkZXIuXG4gICAgICogQ2lyY3VsYXIgZGVwZW5kZW5jaWVzIGFyZSBhbGxvd2VkLlxuICAgICAqIEBtZXRob2QgdG9wb2xvZ2ljYWxTb3J0XG4gICAgICogQHBhcmFtIHtvYmplY3R9IGdyYXBoXG4gICAgICogQHJldHVybiB7YXJyYXl9IFBhcnRpYWxseSBvcmRlcmVkIHNldCBvZiB2ZXJ0aWNlcyBpbiB0b3BvbG9naWNhbCBvcmRlci5cbiAgICAgKi9cbiAgICBDb21tb24udG9wb2xvZ2ljYWxTb3J0ID0gZnVuY3Rpb24oZ3JhcGgpIHtcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21nZWNoZXYvamF2YXNjcmlwdC1hbGdvcml0aG1zXG4gICAgICAgIC8vIENvcHlyaWdodCAoYykgTWlua28gR2VjaGV2IChNSVQgbGljZW5zZSlcbiAgICAgICAgLy8gTW9kaWZpY2F0aW9uczogdGlkeSBmb3JtYXR0aW5nIGFuZCBuYW1pbmdcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdLFxuICAgICAgICAgICAgdmlzaXRlZCA9IFtdLFxuICAgICAgICAgICAgdGVtcCA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIG5vZGUgaW4gZ3JhcGgpIHtcbiAgICAgICAgICAgIGlmICghdmlzaXRlZFtub2RlXSAmJiAhdGVtcFtub2RlXSkge1xuICAgICAgICAgICAgICAgIENvbW1vbi5fdG9wb2xvZ2ljYWxTb3J0KG5vZGUsIHZpc2l0ZWQsIHRlbXAsIGdyYXBoLCByZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgQ29tbW9uLl90b3BvbG9naWNhbFNvcnQgPSBmdW5jdGlvbihub2RlLCB2aXNpdGVkLCB0ZW1wLCBncmFwaCwgcmVzdWx0KSB7XG4gICAgICAgIHZhciBuZWlnaGJvcnMgPSBncmFwaFtub2RlXSB8fCBbXTtcbiAgICAgICAgdGVtcFtub2RlXSA9IHRydWU7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZWlnaGJvcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHZhciBuZWlnaGJvciA9IG5laWdoYm9yc1tpXTtcblxuICAgICAgICAgICAgaWYgKHRlbXBbbmVpZ2hib3JdKSB7XG4gICAgICAgICAgICAgICAgLy8gc2tpcCBjaXJjdWxhciBkZXBlbmRlbmNpZXNcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF2aXNpdGVkW25laWdoYm9yXSkge1xuICAgICAgICAgICAgICAgIENvbW1vbi5fdG9wb2xvZ2ljYWxTb3J0KG5laWdoYm9yLCB2aXNpdGVkLCB0ZW1wLCBncmFwaCwgcmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRlbXBbbm9kZV0gPSBmYWxzZTtcbiAgICAgICAgdmlzaXRlZFtub2RlXSA9IHRydWU7XG5cbiAgICAgICAgcmVzdWx0LnB1c2gobm9kZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRha2VzIF9uXyBmdW5jdGlvbnMgYXMgYXJndW1lbnRzIGFuZCByZXR1cm5zIGEgbmV3IGZ1bmN0aW9uIHRoYXQgY2FsbHMgdGhlbSBpbiBvcmRlci5cbiAgICAgKiBUaGUgYXJndW1lbnRzIGFwcGxpZWQgd2hlbiBjYWxsaW5nIHRoZSBuZXcgZnVuY3Rpb24gd2lsbCBhbHNvIGJlIGFwcGxpZWQgdG8gZXZlcnkgZnVuY3Rpb24gcGFzc2VkLlxuICAgICAqIFRoZSB2YWx1ZSBvZiBgdGhpc2AgcmVmZXJzIHRvIHRoZSBsYXN0IHZhbHVlIHJldHVybmVkIGluIHRoZSBjaGFpbiB0aGF0IHdhcyBub3QgYHVuZGVmaW5lZGAuXG4gICAgICogVGhlcmVmb3JlIGlmIGEgcGFzc2VkIGZ1bmN0aW9uIGRvZXMgbm90IHJldHVybiBhIHZhbHVlLCB0aGUgcHJldmlvdXNseSByZXR1cm5lZCB2YWx1ZSBpcyBtYWludGFpbmVkLlxuICAgICAqIEFmdGVyIGFsbCBwYXNzZWQgZnVuY3Rpb25zIGhhdmUgYmVlbiBjYWxsZWQgdGhlIG5ldyBmdW5jdGlvbiByZXR1cm5zIHRoZSBsYXN0IHJldHVybmVkIHZhbHVlIChpZiBhbnkpLlxuICAgICAqIElmIGFueSBvZiB0aGUgcGFzc2VkIGZ1bmN0aW9ucyBhcmUgYSBjaGFpbiwgdGhlbiB0aGUgY2hhaW4gd2lsbCBiZSBmbGF0dGVuZWQuXG4gICAgICogQG1ldGhvZCBjaGFpblxuICAgICAqIEBwYXJhbSAuLi5mdW5jcyB7ZnVuY3Rpb259IFRoZSBmdW5jdGlvbnMgdG8gY2hhaW4uXG4gICAgICogQHJldHVybiB7ZnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHRoYXQgY2FsbHMgdGhlIHBhc3NlZCBmdW5jdGlvbnMgaW4gb3JkZXIuXG4gICAgICovXG4gICAgQ29tbW9uLmNoYWluID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBmdW5jcyA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICB2YXIgZnVuYyA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgICAgICAgaWYgKGZ1bmMuX2NoYWluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBmbGF0dGVuIGFscmVhZHkgY2hhaW5lZCBmdW5jdGlvbnNcbiAgICAgICAgICAgICAgICBmdW5jcy5wdXNoLmFwcGx5KGZ1bmNzLCBmdW5jLl9jaGFpbmVkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZnVuY3MucHVzaChmdW5jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjaGFpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS9kZXZ0b29scy1kb2NzL2lzc3Vlcy81MyNpc3N1ZWNvbW1lbnQtNTE5NDEzNThcbiAgICAgICAgICAgIHZhciBsYXN0UmVzdWx0LFxuICAgICAgICAgICAgICAgIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBmdW5jcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBmdW5jc1tpXS5hcHBseShsYXN0UmVzdWx0LCBhcmdzKTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBsYXN0UmVzdWx0ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGxhc3RSZXN1bHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgY2hhaW4uX2NoYWluZWQgPSBmdW5jcztcblxuICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoYWlucyBhIGZ1bmN0aW9uIHRvIGV4Y3V0ZSBiZWZvcmUgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIG9uIHRoZSBnaXZlbiBgcGF0aGAgcmVsYXRpdmUgdG8gYGJhc2VgLlxuICAgICAqIFNlZSBhbHNvIGRvY3MgZm9yIGBDb21tb24uY2hhaW5gLlxuICAgICAqIEBtZXRob2QgY2hhaW5QYXRoQmVmb3JlXG4gICAgICogQHBhcmFtIHt9IGJhc2UgVGhlIGJhc2Ugb2JqZWN0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggcmVsYXRpdmUgdG8gYGJhc2VgXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hhaW4gYmVmb3JlIHRoZSBvcmlnaW5hbFxuICAgICAqIEByZXR1cm4ge2Z1bmN0aW9ufSBUaGUgY2hhaW5lZCBmdW5jdGlvbiB0aGF0IHJlcGxhY2VkIHRoZSBvcmlnaW5hbFxuICAgICAqL1xuICAgIENvbW1vbi5jaGFpblBhdGhCZWZvcmUgPSBmdW5jdGlvbihiYXNlLCBwYXRoLCBmdW5jKSB7XG4gICAgICAgIHJldHVybiBDb21tb24uc2V0KGJhc2UsIHBhdGgsIENvbW1vbi5jaGFpbihcbiAgICAgICAgICAgIGZ1bmMsXG4gICAgICAgICAgICBDb21tb24uZ2V0KGJhc2UsIHBhdGgpXG4gICAgICAgICkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGFpbnMgYSBmdW5jdGlvbiB0byBleGN1dGUgYWZ0ZXIgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIG9uIHRoZSBnaXZlbiBgcGF0aGAgcmVsYXRpdmUgdG8gYGJhc2VgLlxuICAgICAqIFNlZSBhbHNvIGRvY3MgZm9yIGBDb21tb24uY2hhaW5gLlxuICAgICAqIEBtZXRob2QgY2hhaW5QYXRoQWZ0ZXJcbiAgICAgKiBAcGFyYW0ge30gYmFzZSBUaGUgYmFzZSBvYmplY3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBUaGUgcGF0aCByZWxhdGl2ZSB0byBgYmFzZWBcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGFpbiBhZnRlciB0aGUgb3JpZ2luYWxcbiAgICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gVGhlIGNoYWluZWQgZnVuY3Rpb24gdGhhdCByZXBsYWNlZCB0aGUgb3JpZ2luYWxcbiAgICAgKi9cbiAgICBDb21tb24uY2hhaW5QYXRoQWZ0ZXIgPSBmdW5jdGlvbihiYXNlLCBwYXRoLCBmdW5jKSB7XG4gICAgICAgIHJldHVybiBDb21tb24uc2V0KGJhc2UsIHBhdGgsIENvbW1vbi5jaGFpbihcbiAgICAgICAgICAgIENvbW1vbi5nZXQoYmFzZSwgcGF0aCksXG4gICAgICAgICAgICBmdW5jXG4gICAgICAgICkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHJlcXVpcmUgZXh0ZXJuYWwgbGlicmFyaWVzIG91dHNpZGUgb2YgdGhlIGJ1bmRsZS5cbiAgICAgKiBJdCBmaXJzdCBsb29rcyBmb3IgdGhlIGBnbG9iYWxOYW1lYCBvbiB0aGUgZW52aXJvbm1lbnQncyBnbG9iYWwgbmFtZXNwYWNlLlxuICAgICAqIElmIHRoZSBnbG9iYWwgaXMgbm90IGZvdW5kLCBpdCB3aWxsIGZhbGwgYmFjayB0byB1c2luZyB0aGUgc3RhbmRhcmQgYHJlcXVpcmVgIHVzaW5nIHRoZSBgbW9kdWxlTmFtZWAuXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIF9yZXF1aXJlR2xvYmFsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGdsb2JhbE5hbWUgVGhlIGdsb2JhbCBtb2R1bGUgbmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtb2R1bGVOYW1lIFRoZSBmYWxsYmFjayBDb21tb25KUyBtb2R1bGUgbmFtZVxuICAgICAqIEByZXR1cm4ge30gVGhlIGxvYWRlZCBtb2R1bGVcbiAgICAgKi9cbiAgICBDb21tb24uX3JlcXVpcmVHbG9iYWwgPSBmdW5jdGlvbihnbG9iYWxOYW1lLCBtb2R1bGVOYW1lKSB7XG4gICAgICAgIHZhciBvYmogPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3dbZ2xvYmFsTmFtZV0gOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFtnbG9iYWxOYW1lXSA6IG51bGwpO1xuICAgICAgICByZXR1cm4gb2JqIHx8IF9kZXJlcV8obW9kdWxlTmFtZSk7XG4gICAgfTtcbn0pKCk7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7fV0sMTU6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyLkVuZ2luZWAgbW9kdWxlIGNvbnRhaW5zIG1ldGhvZHMgZm9yIGNyZWF0aW5nIGFuZCBtYW5pcHVsYXRpbmcgZW5naW5lcy5cbiogQW4gZW5naW5lIGlzIGEgY29udHJvbGxlciB0aGF0IG1hbmFnZXMgdXBkYXRpbmcgdGhlIHNpbXVsYXRpb24gb2YgdGhlIHdvcmxkLlxuKiBTZWUgYE1hdHRlci5SdW5uZXJgIGZvciBhbiBvcHRpb25hbCBnYW1lIGxvb3AgdXRpbGl0eS5cbipcbiogU2VlIHRoZSBpbmNsdWRlZCB1c2FnZSBbZXhhbXBsZXNdKGh0dHBzOi8vZ2l0aHViLmNvbS9saWFicnUvbWF0dGVyLWpzL3RyZWUvbWFzdGVyL2V4YW1wbGVzKS5cbipcbiogQGNsYXNzIEVuZ2luZVxuKi9cblxudmFyIEVuZ2luZSA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVuZ2luZTtcblxudmFyIFdvcmxkID0gX2RlcmVxXygnLi4vYm9keS9Xb3JsZCcpO1xudmFyIFNsZWVwaW5nID0gX2RlcmVxXygnLi9TbGVlcGluZycpO1xudmFyIFJlc29sdmVyID0gX2RlcmVxXygnLi4vY29sbGlzaW9uL1Jlc29sdmVyJyk7XG52YXIgUmVuZGVyID0gX2RlcmVxXygnLi4vcmVuZGVyL1JlbmRlcicpO1xudmFyIFBhaXJzID0gX2RlcmVxXygnLi4vY29sbGlzaW9uL1BhaXJzJyk7XG52YXIgTWV0cmljcyA9IF9kZXJlcV8oJy4vTWV0cmljcycpO1xudmFyIEdyaWQgPSBfZGVyZXFfKCcuLi9jb2xsaXNpb24vR3JpZCcpO1xudmFyIEV2ZW50cyA9IF9kZXJlcV8oJy4vRXZlbnRzJyk7XG52YXIgQ29tcG9zaXRlID0gX2RlcmVxXygnLi4vYm9keS9Db21wb3NpdGUnKTtcbnZhciBDb25zdHJhaW50ID0gX2RlcmVxXygnLi4vY29uc3RyYWludC9Db25zdHJhaW50Jyk7XG52YXIgQ29tbW9uID0gX2RlcmVxXygnLi9Db21tb24nKTtcbnZhciBCb2R5ID0gX2RlcmVxXygnLi4vYm9keS9Cb2R5Jyk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgZW5naW5lLiBUaGUgb3B0aW9ucyBwYXJhbWV0ZXIgaXMgYW4gb2JqZWN0IHRoYXQgc3BlY2lmaWVzIGFueSBwcm9wZXJ0aWVzIHlvdSB3aXNoIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0cy5cbiAgICAgKiBBbGwgcHJvcGVydGllcyBoYXZlIGRlZmF1bHQgdmFsdWVzLCBhbmQgbWFueSBhcmUgcHJlLWNhbGN1bGF0ZWQgYXV0b21hdGljYWxseSBiYXNlZCBvbiBvdGhlciBwcm9wZXJ0aWVzLlxuICAgICAqIFNlZSB0aGUgcHJvcGVydGllcyBzZWN0aW9uIGJlbG93IGZvciBkZXRhaWxlZCBpbmZvcm1hdGlvbiBvbiB3aGF0IHlvdSBjYW4gcGFzcyB2aWEgdGhlIGBvcHRpb25zYCBvYmplY3QuXG4gICAgICogQG1ldGhvZCBjcmVhdGVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gICAgICogQHJldHVybiB7ZW5naW5lfSBlbmdpbmVcbiAgICAgKi9cbiAgICBFbmdpbmUuY3JlYXRlID0gZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgICAvLyBvcHRpb25zIG1heSBiZSBwYXNzZWQgYXMgdGhlIGZpcnN0IChhbmQgb25seSkgYXJndW1lbnRcbiAgICAgICAgb3B0aW9ucyA9IENvbW1vbi5pc0VsZW1lbnQoZWxlbWVudCkgPyBvcHRpb25zIDogZWxlbWVudDtcbiAgICAgICAgZWxlbWVudCA9IENvbW1vbi5pc0VsZW1lbnQoZWxlbWVudCkgPyBlbGVtZW50IDogbnVsbDtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgaWYgKGVsZW1lbnQgfHwgb3B0aW9ucy5yZW5kZXIpIHtcbiAgICAgICAgICAgIENvbW1vbi53YXJuKCdFbmdpbmUuY3JlYXRlOiBlbmdpbmUucmVuZGVyIGlzIGRlcHJlY2F0ZWQgKHNlZSBkb2NzKScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgcG9zaXRpb25JdGVyYXRpb25zOiA2LFxuICAgICAgICAgICAgdmVsb2NpdHlJdGVyYXRpb25zOiA0LFxuICAgICAgICAgICAgY29uc3RyYWludEl0ZXJhdGlvbnM6IDIsXG4gICAgICAgICAgICBlbmFibGVTbGVlcGluZzogZmFsc2UsXG4gICAgICAgICAgICBldmVudHM6IFtdLFxuICAgICAgICAgICAgcGx1Z2luOiB7fSxcbiAgICAgICAgICAgIHRpbWluZzoge1xuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogMCxcbiAgICAgICAgICAgICAgICB0aW1lU2NhbGU6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBicm9hZHBoYXNlOiB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogR3JpZFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBlbmdpbmUgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgICAgICAvLyBAZGVwcmVjYXRlZFxuICAgICAgICBpZiAoZWxlbWVudCB8fCBlbmdpbmUucmVuZGVyKSB7XG4gICAgICAgICAgICB2YXIgcmVuZGVyRGVmYXVsdHMgPSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBSZW5kZXJcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGVuZ2luZS5yZW5kZXIgPSBDb21tb24uZXh0ZW5kKHJlbmRlckRlZmF1bHRzLCBlbmdpbmUucmVuZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEBkZXByZWNhdGVkXG4gICAgICAgIGlmIChlbmdpbmUucmVuZGVyICYmIGVuZ2luZS5yZW5kZXIuY29udHJvbGxlcikge1xuICAgICAgICAgICAgZW5naW5lLnJlbmRlciA9IGVuZ2luZS5yZW5kZXIuY29udHJvbGxlci5jcmVhdGUoZW5naW5lLnJlbmRlcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBAZGVwcmVjYXRlZFxuICAgICAgICBpZiAoZW5naW5lLnJlbmRlcikge1xuICAgICAgICAgICAgZW5naW5lLnJlbmRlci5lbmdpbmUgPSBlbmdpbmU7XG4gICAgICAgIH1cblxuICAgICAgICBlbmdpbmUud29ybGQgPSBvcHRpb25zLndvcmxkIHx8IFdvcmxkLmNyZWF0ZShlbmdpbmUud29ybGQpO1xuICAgICAgICBlbmdpbmUucGFpcnMgPSBQYWlycy5jcmVhdGUoKTtcbiAgICAgICAgZW5naW5lLmJyb2FkcGhhc2UgPSBlbmdpbmUuYnJvYWRwaGFzZS5jb250cm9sbGVyLmNyZWF0ZShlbmdpbmUuYnJvYWRwaGFzZSk7XG4gICAgICAgIGVuZ2luZS5tZXRyaWNzID0gZW5naW5lLm1ldHJpY3MgfHwgeyBleHRlbmRlZDogZmFsc2UgfTtcblxuXG4gICAgICAgIHJldHVybiBlbmdpbmU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIE1vdmVzIHRoZSBzaW11bGF0aW9uIGZvcndhcmQgaW4gdGltZSBieSBgZGVsdGFgIG1zLlxuICAgICAqIFRoZSBgY29ycmVjdGlvbmAgYXJndW1lbnQgaXMgYW4gb3B0aW9uYWwgYE51bWJlcmAgdGhhdCBzcGVjaWZpZXMgdGhlIHRpbWUgY29ycmVjdGlvbiBmYWN0b3IgdG8gYXBwbHkgdG8gdGhlIHVwZGF0ZS5cbiAgICAgKiBUaGlzIGNhbiBoZWxwIGltcHJvdmUgdGhlIGFjY3VyYWN5IG9mIHRoZSBzaW11bGF0aW9uIGluIGNhc2VzIHdoZXJlIGBkZWx0YWAgaXMgY2hhbmdpbmcgYmV0d2VlbiB1cGRhdGVzLlxuICAgICAqIFRoZSB2YWx1ZSBvZiBgY29ycmVjdGlvbmAgaXMgZGVmaW5lZCBhcyBgZGVsdGEgLyBsYXN0RGVsdGFgLCBpLmUuIHRoZSBwZXJjZW50YWdlIGNoYW5nZSBvZiBgZGVsdGFgIG92ZXIgdGhlIGxhc3Qgc3RlcC5cbiAgICAgKiBUaGVyZWZvcmUgdGhlIHZhbHVlIGlzIGFsd2F5cyBgMWAgKG5vIGNvcnJlY3Rpb24pIHdoZW4gYGRlbHRhYCBjb25zdGFudCAob3Igd2hlbiBubyBjb3JyZWN0aW9uIGlzIGRlc2lyZWQsIHdoaWNoIGlzIHRoZSBkZWZhdWx0KS5cbiAgICAgKiBTZWUgdGhlIHBhcGVyIG9uIDxhIGhyZWY9XCJodHRwOi8vbG9uZXNvY2submV0L2FydGljbGUvdmVybGV0Lmh0bWxcIj5UaW1lIENvcnJlY3RlZCBWZXJsZXQ8L2E+IGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAqXG4gICAgICogVHJpZ2dlcnMgYGJlZm9yZVVwZGF0ZWAgYW5kIGBhZnRlclVwZGF0ZWAgZXZlbnRzLlxuICAgICAqIFRyaWdnZXJzIGBjb2xsaXNpb25TdGFydGAsIGBjb2xsaXNpb25BY3RpdmVgIGFuZCBgY29sbGlzaW9uRW5kYCBldmVudHMuXG4gICAgICogQG1ldGhvZCB1cGRhdGVcbiAgICAgKiBAcGFyYW0ge2VuZ2luZX0gZW5naW5lXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtkZWx0YT0xNi42NjZdXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtjb3JyZWN0aW9uPTFdXG4gICAgICovXG4gICAgRW5naW5lLnVwZGF0ZSA9IGZ1bmN0aW9uKGVuZ2luZSwgZGVsdGEsIGNvcnJlY3Rpb24pIHtcbiAgICAgICAgZGVsdGEgPSBkZWx0YSB8fCAxMDAwIC8gNjA7XG4gICAgICAgIGNvcnJlY3Rpb24gPSBjb3JyZWN0aW9uIHx8IDE7XG5cbiAgICAgICAgdmFyIHdvcmxkID0gZW5naW5lLndvcmxkLFxuICAgICAgICAgICAgdGltaW5nID0gZW5naW5lLnRpbWluZyxcbiAgICAgICAgICAgIGJyb2FkcGhhc2UgPSBlbmdpbmUuYnJvYWRwaGFzZSxcbiAgICAgICAgICAgIGJyb2FkcGhhc2VQYWlycyA9IFtdLFxuICAgICAgICAgICAgaTtcblxuICAgICAgICAvLyBpbmNyZW1lbnQgdGltZXN0YW1wXG4gICAgICAgIHRpbWluZy50aW1lc3RhbXAgKz0gZGVsdGEgKiB0aW1pbmcudGltZVNjYWxlO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBhbiBldmVudCBvYmplY3RcbiAgICAgICAgdmFyIGV2ZW50ID0ge1xuICAgICAgICAgICAgdGltZXN0YW1wOiB0aW1pbmcudGltZXN0YW1wXG4gICAgICAgIH07XG5cbiAgICAgICAgRXZlbnRzLnRyaWdnZXIoZW5naW5lLCAnYmVmb3JlVXBkYXRlJywgZXZlbnQpO1xuXG4gICAgICAgIC8vIGdldCBsaXN0cyBvZiBhbGwgYm9kaWVzIGFuZCBjb25zdHJhaW50cywgbm8gbWF0dGVyIHdoYXQgY29tcG9zaXRlcyB0aGV5IGFyZSBpblxuICAgICAgICB2YXIgYWxsQm9kaWVzID0gQ29tcG9zaXRlLmFsbEJvZGllcyh3b3JsZCksXG4gICAgICAgICAgICBhbGxDb25zdHJhaW50cyA9IENvbXBvc2l0ZS5hbGxDb25zdHJhaW50cyh3b3JsZCk7XG5cblxuICAgICAgICAvLyBpZiBzbGVlcGluZyBlbmFibGVkLCBjYWxsIHRoZSBzbGVlcGluZyBjb250cm9sbGVyXG4gICAgICAgIGlmIChlbmdpbmUuZW5hYmxlU2xlZXBpbmcpXG4gICAgICAgICAgICBTbGVlcGluZy51cGRhdGUoYWxsQm9kaWVzLCB0aW1pbmcudGltZVNjYWxlKTtcblxuICAgICAgICAvLyBhcHBsaWVzIGdyYXZpdHkgdG8gYWxsIGJvZGllc1xuICAgICAgICBFbmdpbmUuX2JvZGllc0FwcGx5R3Jhdml0eShhbGxCb2RpZXMsIHdvcmxkLmdyYXZpdHkpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBhbGwgYm9keSBwb3NpdGlvbiBhbmQgcm90YXRpb24gYnkgaW50ZWdyYXRpb25cbiAgICAgICAgRW5naW5lLl9ib2RpZXNVcGRhdGUoYWxsQm9kaWVzLCBkZWx0YSwgdGltaW5nLnRpbWVTY2FsZSwgY29ycmVjdGlvbiwgd29ybGQuYm91bmRzKTtcblxuICAgICAgICAvLyB1cGRhdGUgYWxsIGNvbnN0cmFpbnRzIChmaXJzdCBwYXNzKVxuICAgICAgICBDb25zdHJhaW50LnByZVNvbHZlQWxsKGFsbEJvZGllcyk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBlbmdpbmUuY29uc3RyYWludEl0ZXJhdGlvbnM7IGkrKykge1xuICAgICAgICAgICAgQ29uc3RyYWludC5zb2x2ZUFsbChhbGxDb25zdHJhaW50cywgdGltaW5nLnRpbWVTY2FsZSk7XG4gICAgICAgIH1cbiAgICAgICAgQ29uc3RyYWludC5wb3N0U29sdmVBbGwoYWxsQm9kaWVzKTtcblxuICAgICAgICAvLyBicm9hZHBoYXNlIHBhc3M6IGZpbmQgcG90ZW50aWFsIGNvbGxpc2lvbiBwYWlyc1xuICAgICAgICBpZiAoYnJvYWRwaGFzZS5jb250cm9sbGVyKSB7XG4gICAgICAgICAgICAvLyBpZiB3b3JsZCBpcyBkaXJ0eSwgd2UgbXVzdCBmbHVzaCB0aGUgd2hvbGUgZ3JpZFxuICAgICAgICAgICAgaWYgKHdvcmxkLmlzTW9kaWZpZWQpXG4gICAgICAgICAgICAgICAgYnJvYWRwaGFzZS5jb250cm9sbGVyLmNsZWFyKGJyb2FkcGhhc2UpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIGdyaWQgYnVja2V0cyBiYXNlZCBvbiBjdXJyZW50IGJvZGllc1xuICAgICAgICAgICAgYnJvYWRwaGFzZS5jb250cm9sbGVyLnVwZGF0ZShicm9hZHBoYXNlLCBhbGxCb2RpZXMsIGVuZ2luZSwgd29ybGQuaXNNb2RpZmllZCk7XG4gICAgICAgICAgICBicm9hZHBoYXNlUGFpcnMgPSBicm9hZHBoYXNlLnBhaXJzTGlzdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmIG5vIGJyb2FkcGhhc2Ugc2V0LCB3ZSBqdXN0IHBhc3MgYWxsIGJvZGllc1xuICAgICAgICAgICAgYnJvYWRwaGFzZVBhaXJzID0gYWxsQm9kaWVzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2xlYXIgYWxsIGNvbXBvc2l0ZSBtb2RpZmllZCBmbGFnc1xuICAgICAgICBpZiAod29ybGQuaXNNb2RpZmllZCkge1xuICAgICAgICAgICAgQ29tcG9zaXRlLnNldE1vZGlmaWVkKHdvcmxkLCBmYWxzZSwgZmFsc2UsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbmFycm93cGhhc2UgcGFzczogZmluZCBhY3R1YWwgY29sbGlzaW9ucywgdGhlbiBjcmVhdGUgb3IgdXBkYXRlIGNvbGxpc2lvbiBwYWlyc1xuICAgICAgICB2YXIgY29sbGlzaW9ucyA9IGJyb2FkcGhhc2UuZGV0ZWN0b3IoYnJvYWRwaGFzZVBhaXJzLCBlbmdpbmUpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBjb2xsaXNpb24gcGFpcnNcbiAgICAgICAgdmFyIHBhaXJzID0gZW5naW5lLnBhaXJzLFxuICAgICAgICAgICAgdGltZXN0YW1wID0gdGltaW5nLnRpbWVzdGFtcDtcbiAgICAgICAgUGFpcnMudXBkYXRlKHBhaXJzLCBjb2xsaXNpb25zLCB0aW1lc3RhbXApO1xuICAgICAgICBQYWlycy5yZW1vdmVPbGQocGFpcnMsIHRpbWVzdGFtcCk7XG5cbiAgICAgICAgLy8gd2FrZSB1cCBib2RpZXMgaW52b2x2ZWQgaW4gY29sbGlzaW9uc1xuICAgICAgICBpZiAoZW5naW5lLmVuYWJsZVNsZWVwaW5nKVxuICAgICAgICAgICAgU2xlZXBpbmcuYWZ0ZXJDb2xsaXNpb25zKHBhaXJzLmxpc3QsIHRpbWluZy50aW1lU2NhbGUpO1xuXG4gICAgICAgIC8vIHRyaWdnZXIgY29sbGlzaW9uIGV2ZW50c1xuICAgICAgICBpZiAocGFpcnMuY29sbGlzaW9uU3RhcnQubGVuZ3RoID4gMClcbiAgICAgICAgICAgIEV2ZW50cy50cmlnZ2VyKGVuZ2luZSwgJ2NvbGxpc2lvblN0YXJ0JywgeyBwYWlyczogcGFpcnMuY29sbGlzaW9uU3RhcnQgfSk7XG5cbiAgICAgICAgLy8gaXRlcmF0aXZlbHkgcmVzb2x2ZSBwb3NpdGlvbiBiZXR3ZWVuIGNvbGxpc2lvbnNcbiAgICAgICAgUmVzb2x2ZXIucHJlU29sdmVQb3NpdGlvbihwYWlycy5saXN0KTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGVuZ2luZS5wb3NpdGlvbkl0ZXJhdGlvbnM7IGkrKykge1xuICAgICAgICAgICAgUmVzb2x2ZXIuc29sdmVQb3NpdGlvbihwYWlycy5saXN0LCB0aW1pbmcudGltZVNjYWxlKTtcbiAgICAgICAgfVxuICAgICAgICBSZXNvbHZlci5wb3N0U29sdmVQb3NpdGlvbihhbGxCb2RpZXMpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBhbGwgY29uc3RyYWludHMgKHNlY29uZCBwYXNzKVxuICAgICAgICBDb25zdHJhaW50LnByZVNvbHZlQWxsKGFsbEJvZGllcyk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBlbmdpbmUuY29uc3RyYWludEl0ZXJhdGlvbnM7IGkrKykge1xuICAgICAgICAgICAgQ29uc3RyYWludC5zb2x2ZUFsbChhbGxDb25zdHJhaW50cywgdGltaW5nLnRpbWVTY2FsZSk7XG4gICAgICAgIH1cbiAgICAgICAgQ29uc3RyYWludC5wb3N0U29sdmVBbGwoYWxsQm9kaWVzKTtcblxuICAgICAgICAvLyBpdGVyYXRpdmVseSByZXNvbHZlIHZlbG9jaXR5IGJldHdlZW4gY29sbGlzaW9uc1xuICAgICAgICBSZXNvbHZlci5wcmVTb2x2ZVZlbG9jaXR5KHBhaXJzLmxpc3QpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZW5naW5lLnZlbG9jaXR5SXRlcmF0aW9uczsgaSsrKSB7XG4gICAgICAgICAgICBSZXNvbHZlci5zb2x2ZVZlbG9jaXR5KHBhaXJzLmxpc3QsIHRpbWluZy50aW1lU2NhbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdHJpZ2dlciBjb2xsaXNpb24gZXZlbnRzXG4gICAgICAgIGlmIChwYWlycy5jb2xsaXNpb25BY3RpdmUubGVuZ3RoID4gMClcbiAgICAgICAgICAgIEV2ZW50cy50cmlnZ2VyKGVuZ2luZSwgJ2NvbGxpc2lvbkFjdGl2ZScsIHsgcGFpcnM6IHBhaXJzLmNvbGxpc2lvbkFjdGl2ZSB9KTtcblxuICAgICAgICBpZiAocGFpcnMuY29sbGlzaW9uRW5kLmxlbmd0aCA+IDApXG4gICAgICAgICAgICBFdmVudHMudHJpZ2dlcihlbmdpbmUsICdjb2xsaXNpb25FbmQnLCB7IHBhaXJzOiBwYWlycy5jb2xsaXNpb25FbmQgfSk7XG5cblxuICAgICAgICAvLyBjbGVhciBmb3JjZSBidWZmZXJzXG4gICAgICAgIEVuZ2luZS5fYm9kaWVzQ2xlYXJGb3JjZXMoYWxsQm9kaWVzKTtcblxuICAgICAgICBFdmVudHMudHJpZ2dlcihlbmdpbmUsICdhZnRlclVwZGF0ZScsIGV2ZW50KTtcblxuICAgICAgICByZXR1cm4gZW5naW5lO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogTWVyZ2VzIHR3byBlbmdpbmVzIGJ5IGtlZXBpbmcgdGhlIGNvbmZpZ3VyYXRpb24gb2YgYGVuZ2luZUFgIGJ1dCByZXBsYWNpbmcgdGhlIHdvcmxkIHdpdGggdGhlIG9uZSBmcm9tIGBlbmdpbmVCYC5cbiAgICAgKiBAbWV0aG9kIG1lcmdlXG4gICAgICogQHBhcmFtIHtlbmdpbmV9IGVuZ2luZUFcbiAgICAgKiBAcGFyYW0ge2VuZ2luZX0gZW5naW5lQlxuICAgICAqL1xuICAgIEVuZ2luZS5tZXJnZSA9IGZ1bmN0aW9uKGVuZ2luZUEsIGVuZ2luZUIpIHtcbiAgICAgICAgQ29tbW9uLmV4dGVuZChlbmdpbmVBLCBlbmdpbmVCKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChlbmdpbmVCLndvcmxkKSB7XG4gICAgICAgICAgICBlbmdpbmVBLndvcmxkID0gZW5naW5lQi53b3JsZDtcblxuICAgICAgICAgICAgRW5naW5lLmNsZWFyKGVuZ2luZUEpO1xuXG4gICAgICAgICAgICB2YXIgYm9kaWVzID0gQ29tcG9zaXRlLmFsbEJvZGllcyhlbmdpbmVBLndvcmxkKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgYm9keSA9IGJvZGllc1tpXTtcbiAgICAgICAgICAgICAgICBTbGVlcGluZy5zZXQoYm9keSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGJvZHkuaWQgPSBDb21tb24ubmV4dElkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2xlYXJzIHRoZSBlbmdpbmUgaW5jbHVkaW5nIHRoZSB3b3JsZCwgcGFpcnMgYW5kIGJyb2FkcGhhc2UuXG4gICAgICogQG1ldGhvZCBjbGVhclxuICAgICAqIEBwYXJhbSB7ZW5naW5lfSBlbmdpbmVcbiAgICAgKi9cbiAgICBFbmdpbmUuY2xlYXIgPSBmdW5jdGlvbihlbmdpbmUpIHtcbiAgICAgICAgdmFyIHdvcmxkID0gZW5naW5lLndvcmxkO1xuICAgICAgICBcbiAgICAgICAgUGFpcnMuY2xlYXIoZW5naW5lLnBhaXJzKTtcblxuICAgICAgICB2YXIgYnJvYWRwaGFzZSA9IGVuZ2luZS5icm9hZHBoYXNlO1xuICAgICAgICBpZiAoYnJvYWRwaGFzZS5jb250cm9sbGVyKSB7XG4gICAgICAgICAgICB2YXIgYm9kaWVzID0gQ29tcG9zaXRlLmFsbEJvZGllcyh3b3JsZCk7XG4gICAgICAgICAgICBicm9hZHBoYXNlLmNvbnRyb2xsZXIuY2xlYXIoYnJvYWRwaGFzZSk7XG4gICAgICAgICAgICBicm9hZHBoYXNlLmNvbnRyb2xsZXIudXBkYXRlKGJyb2FkcGhhc2UsIGJvZGllcywgZW5naW5lLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBaZXJvZXMgdGhlIGBib2R5LmZvcmNlYCBhbmQgYGJvZHkudG9ycXVlYCBmb3JjZSBidWZmZXJzLlxuICAgICAqIEBtZXRob2QgX2JvZGllc0NsZWFyRm9yY2VzXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge2JvZHlbXX0gYm9kaWVzXG4gICAgICovXG4gICAgRW5naW5lLl9ib2RpZXNDbGVhckZvcmNlcyA9IGZ1bmN0aW9uKGJvZGllcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvZGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGJvZHkgPSBib2RpZXNbaV07XG5cbiAgICAgICAgICAgIC8vIHJlc2V0IGZvcmNlIGJ1ZmZlcnNcbiAgICAgICAgICAgIGJvZHkuZm9yY2UueCA9IDA7XG4gICAgICAgICAgICBib2R5LmZvcmNlLnkgPSAwO1xuICAgICAgICAgICAgYm9keS50b3JxdWUgPSAwO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFwcGx5cyBhIG1hc3MgZGVwZW5kYW50IGZvcmNlIHRvIGFsbCBnaXZlbiBib2RpZXMuXG4gICAgICogQG1ldGhvZCBfYm9kaWVzQXBwbHlHcmF2aXR5XG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge2JvZHlbXX0gYm9kaWVzXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IGdyYXZpdHlcbiAgICAgKi9cbiAgICBFbmdpbmUuX2JvZGllc0FwcGx5R3Jhdml0eSA9IGZ1bmN0aW9uKGJvZGllcywgZ3Jhdml0eSkge1xuICAgICAgICB2YXIgZ3Jhdml0eVNjYWxlID0gdHlwZW9mIGdyYXZpdHkuc2NhbGUgIT09ICd1bmRlZmluZWQnID8gZ3Jhdml0eS5zY2FsZSA6IDAuMDAxO1xuXG4gICAgICAgIGlmICgoZ3Jhdml0eS54ID09PSAwICYmIGdyYXZpdHkueSA9PT0gMCkgfHwgZ3Jhdml0eVNjYWxlID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm9kaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYm9keSA9IGJvZGllc1tpXTtcblxuICAgICAgICAgICAgaWYgKGJvZHkuaXNTdGF0aWMgfHwgYm9keS5pc1NsZWVwaW5nKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAvLyBhcHBseSBncmF2aXR5XG4gICAgICAgICAgICBib2R5LmZvcmNlLnkgKz0gYm9keS5tYXNzICogZ3Jhdml0eS55ICogZ3Jhdml0eVNjYWxlO1xuICAgICAgICAgICAgYm9keS5mb3JjZS54ICs9IGJvZHkubWFzcyAqIGdyYXZpdHkueCAqIGdyYXZpdHlTY2FsZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBcHBseXMgYEJvZHkudXBkYXRlYCB0byBhbGwgZ2l2ZW4gYGJvZGllc2AuXG4gICAgICogQG1ldGhvZCBfYm9kaWVzVXBkYXRlXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge2JvZHlbXX0gYm9kaWVzXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRlbHRhVGltZSBcbiAgICAgKiBUaGUgYW1vdW50IG9mIHRpbWUgZWxhcHNlZCBiZXR3ZWVuIHVwZGF0ZXNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZVNjYWxlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNvcnJlY3Rpb24gXG4gICAgICogVGhlIFZlcmxldCBjb3JyZWN0aW9uIGZhY3RvciAoZGVsdGFUaW1lIC8gbGFzdERlbHRhVGltZSlcbiAgICAgKiBAcGFyYW0ge2JvdW5kc30gd29ybGRCb3VuZHNcbiAgICAgKi9cbiAgICBFbmdpbmUuX2JvZGllc1VwZGF0ZSA9IGZ1bmN0aW9uKGJvZGllcywgZGVsdGFUaW1lLCB0aW1lU2NhbGUsIGNvcnJlY3Rpb24sIHdvcmxkQm91bmRzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm9kaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYm9keSA9IGJvZGllc1tpXTtcblxuICAgICAgICAgICAgaWYgKGJvZHkuaXNTdGF0aWMgfHwgYm9keS5pc1NsZWVwaW5nKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBCb2R5LnVwZGF0ZShib2R5LCBkZWx0YVRpbWUsIHRpbWVTY2FsZSwgY29ycmVjdGlvbik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQW4gYWxpYXMgZm9yIGBSdW5uZXIucnVuYCwgc2VlIGBNYXR0ZXIuUnVubmVyYCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgKiBAbWV0aG9kIHJ1blxuICAgICAqIEBwYXJhbSB7ZW5naW5lfSBlbmdpbmVcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICogRmlyZWQganVzdCBiZWZvcmUgYW4gdXBkYXRlXG4gICAgKlxuICAgICogQGV2ZW50IGJlZm9yZVVwZGF0ZVxuICAgICogQHBhcmFtIHt9IGV2ZW50IEFuIGV2ZW50IG9iamVjdFxuICAgICogQHBhcmFtIHtudW1iZXJ9IGV2ZW50LnRpbWVzdGFtcCBUaGUgZW5naW5lLnRpbWluZy50aW1lc3RhbXAgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQuc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0IG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAgKi9cblxuICAgIC8qKlxuICAgICogRmlyZWQgYWZ0ZXIgZW5naW5lIHVwZGF0ZSBhbmQgYWxsIGNvbGxpc2lvbiBldmVudHNcbiAgICAqXG4gICAgKiBAZXZlbnQgYWZ0ZXJVcGRhdGVcbiAgICAqIEBwYXJhbSB7fSBldmVudCBBbiBldmVudCBvYmplY3RcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBldmVudC50aW1lc3RhbXAgVGhlIGVuZ2luZS50aW1pbmcudGltZXN0YW1wIG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50LnNvdXJjZSBUaGUgc291cmNlIG9iamVjdCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5uYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudFxuICAgICovXG5cbiAgICAvKipcbiAgICAqIEZpcmVkIGFmdGVyIGVuZ2luZSB1cGRhdGUsIHByb3ZpZGVzIGEgbGlzdCBvZiBhbGwgcGFpcnMgdGhhdCBoYXZlIHN0YXJ0ZWQgdG8gY29sbGlkZSBpbiB0aGUgY3VycmVudCB0aWNrIChpZiBhbnkpXG4gICAgKlxuICAgICogQGV2ZW50IGNvbGxpc2lvblN0YXJ0XG4gICAgKiBAcGFyYW0ge30gZXZlbnQgQW4gZXZlbnQgb2JqZWN0XG4gICAgKiBAcGFyYW0ge30gZXZlbnQucGFpcnMgTGlzdCBvZiBhZmZlY3RlZCBwYWlyc1xuICAgICogQHBhcmFtIHtudW1iZXJ9IGV2ZW50LnRpbWVzdGFtcCBUaGUgZW5naW5lLnRpbWluZy50aW1lc3RhbXAgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQuc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0IG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAgKi9cblxuICAgIC8qKlxuICAgICogRmlyZWQgYWZ0ZXIgZW5naW5lIHVwZGF0ZSwgcHJvdmlkZXMgYSBsaXN0IG9mIGFsbCBwYWlycyB0aGF0IGFyZSBjb2xsaWRpbmcgaW4gdGhlIGN1cnJlbnQgdGljayAoaWYgYW55KVxuICAgICpcbiAgICAqIEBldmVudCBjb2xsaXNpb25BY3RpdmVcbiAgICAqIEBwYXJhbSB7fSBldmVudCBBbiBldmVudCBvYmplY3RcbiAgICAqIEBwYXJhbSB7fSBldmVudC5wYWlycyBMaXN0IG9mIGFmZmVjdGVkIHBhaXJzXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZXZlbnQudGltZXN0YW1wIFRoZSBlbmdpbmUudGltaW5nLnRpbWVzdGFtcCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5zb3VyY2UgVGhlIHNvdXJjZSBvYmplY3Qgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQubmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcbiAgICAqL1xuXG4gICAgLyoqXG4gICAgKiBGaXJlZCBhZnRlciBlbmdpbmUgdXBkYXRlLCBwcm92aWRlcyBhIGxpc3Qgb2YgYWxsIHBhaXJzIHRoYXQgaGF2ZSBlbmRlZCBjb2xsaXNpb24gaW4gdGhlIGN1cnJlbnQgdGljayAoaWYgYW55KVxuICAgICpcbiAgICAqIEBldmVudCBjb2xsaXNpb25FbmRcbiAgICAqIEBwYXJhbSB7fSBldmVudCBBbiBldmVudCBvYmplY3RcbiAgICAqIEBwYXJhbSB7fSBldmVudC5wYWlycyBMaXN0IG9mIGFmZmVjdGVkIHBhaXJzXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZXZlbnQudGltZXN0YW1wIFRoZSBlbmdpbmUudGltaW5nLnRpbWVzdGFtcCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5zb3VyY2UgVGhlIHNvdXJjZSBvYmplY3Qgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQubmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcbiAgICAqL1xuXG4gICAgLypcbiAgICAqXG4gICAgKiAgUHJvcGVydGllcyBEb2N1bWVudGF0aW9uXG4gICAgKlxuICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBbiBpbnRlZ2VyIGBOdW1iZXJgIHRoYXQgc3BlY2lmaWVzIHRoZSBudW1iZXIgb2YgcG9zaXRpb24gaXRlcmF0aW9ucyB0byBwZXJmb3JtIGVhY2ggdXBkYXRlLlxuICAgICAqIFRoZSBoaWdoZXIgdGhlIHZhbHVlLCB0aGUgaGlnaGVyIHF1YWxpdHkgdGhlIHNpbXVsYXRpb24gd2lsbCBiZSBhdCB0aGUgZXhwZW5zZSBvZiBwZXJmb3JtYW5jZS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBwb3NpdGlvbkl0ZXJhdGlvbnNcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKiBAZGVmYXVsdCA2XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBbiBpbnRlZ2VyIGBOdW1iZXJgIHRoYXQgc3BlY2lmaWVzIHRoZSBudW1iZXIgb2YgdmVsb2NpdHkgaXRlcmF0aW9ucyB0byBwZXJmb3JtIGVhY2ggdXBkYXRlLlxuICAgICAqIFRoZSBoaWdoZXIgdGhlIHZhbHVlLCB0aGUgaGlnaGVyIHF1YWxpdHkgdGhlIHNpbXVsYXRpb24gd2lsbCBiZSBhdCB0aGUgZXhwZW5zZSBvZiBwZXJmb3JtYW5jZS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB2ZWxvY2l0eUl0ZXJhdGlvbnNcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKiBAZGVmYXVsdCA0XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBbiBpbnRlZ2VyIGBOdW1iZXJgIHRoYXQgc3BlY2lmaWVzIHRoZSBudW1iZXIgb2YgY29uc3RyYWludCBpdGVyYXRpb25zIHRvIHBlcmZvcm0gZWFjaCB1cGRhdGUuXG4gICAgICogVGhlIGhpZ2hlciB0aGUgdmFsdWUsIHRoZSBoaWdoZXIgcXVhbGl0eSB0aGUgc2ltdWxhdGlvbiB3aWxsIGJlIGF0IHRoZSBleHBlbnNlIG9mIHBlcmZvcm1hbmNlLlxuICAgICAqIFRoZSBkZWZhdWx0IHZhbHVlIG9mIGAyYCBpcyB1c3VhbGx5IHZlcnkgYWRlcXVhdGUuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgY29uc3RyYWludEl0ZXJhdGlvbnNcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKiBAZGVmYXVsdCAyXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGZsYWcgdGhhdCBzcGVjaWZpZXMgd2hldGhlciB0aGUgZW5naW5lIHNob3VsZCBhbGxvdyBzbGVlcGluZyB2aWEgdGhlIGBNYXR0ZXIuU2xlZXBpbmdgIG1vZHVsZS5cbiAgICAgKiBTbGVlcGluZyBjYW4gaW1wcm92ZSBzdGFiaWxpdHkgYW5kIHBlcmZvcm1hbmNlLCBidXQgb2Z0ZW4gYXQgdGhlIGV4cGVuc2Ugb2YgYWNjdXJhY3kuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgZW5hYmxlU2xlZXBpbmdcbiAgICAgKiBAdHlwZSBib29sZWFuXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFuIGBPYmplY3RgIGNvbnRhaW5pbmcgcHJvcGVydGllcyByZWdhcmRpbmcgdGhlIHRpbWluZyBzeXN0ZW1zIG9mIHRoZSBlbmdpbmUuIFxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHRpbWluZ1xuICAgICAqIEB0eXBlIG9iamVjdFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgTnVtYmVyYCB0aGF0IHNwZWNpZmllcyB0aGUgZ2xvYmFsIHNjYWxpbmcgZmFjdG9yIG9mIHRpbWUgZm9yIGFsbCBib2RpZXMuXG4gICAgICogQSB2YWx1ZSBvZiBgMGAgZnJlZXplcyB0aGUgc2ltdWxhdGlvbi5cbiAgICAgKiBBIHZhbHVlIG9mIGAwLjFgIGdpdmVzIGEgc2xvdy1tb3Rpb24gZWZmZWN0LlxuICAgICAqIEEgdmFsdWUgb2YgYDEuMmAgZ2l2ZXMgYSBzcGVlZC11cCBlZmZlY3QuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgdGltaW5nLnRpbWVTY2FsZVxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDFcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYE51bWJlcmAgdGhhdCBzcGVjaWZpZXMgdGhlIGN1cnJlbnQgc2ltdWxhdGlvbi10aW1lIGluIG1pbGxpc2Vjb25kcyBzdGFydGluZyBmcm9tIGAwYC4gXG4gICAgICogSXQgaXMgaW5jcmVtZW50ZWQgb24gZXZlcnkgYEVuZ2luZS51cGRhdGVgIGJ5IHRoZSBnaXZlbiBgZGVsdGFgIGFyZ3VtZW50LiBcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB0aW1pbmcudGltZXN0YW1wXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gaW5zdGFuY2Ugb2YgYSBgUmVuZGVyYCBjb250cm9sbGVyLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBhIGBNYXR0ZXIuUmVuZGVyYCBpbnN0YW5jZSBjcmVhdGVkIGJ5IGBFbmdpbmUuY3JlYXRlYC5cbiAgICAgKiBPbmUgbWF5IGFsc28gZGV2ZWxvcCBhIGN1c3RvbSByZW5kZXJlciBtb2R1bGUgYmFzZWQgb24gYE1hdHRlci5SZW5kZXJgIGFuZCBwYXNzIGFuIGluc3RhbmNlIG9mIGl0IHRvIGBFbmdpbmUuY3JlYXRlYCB2aWEgYG9wdGlvbnMucmVuZGVyYC5cbiAgICAgKlxuICAgICAqIEEgbWluaW1hbCBjdXN0b20gcmVuZGVyZXIgb2JqZWN0IG11c3QgZGVmaW5lIGF0IGxlYXN0IHRocmVlIGZ1bmN0aW9uczogYGNyZWF0ZWAsIGBjbGVhcmAgYW5kIGB3b3JsZGAgKHNlZSBgTWF0dGVyLlJlbmRlcmApLlxuICAgICAqIEl0IGlzIGFsc28gcG9zc2libGUgdG8gaW5zdGVhZCBwYXNzIHRoZSBfbW9kdWxlXyByZWZlcmVuY2UgdmlhIGBvcHRpb25zLnJlbmRlci5jb250cm9sbGVyYCBhbmQgYEVuZ2luZS5jcmVhdGVgIHdpbGwgaW5zdGFudGlhdGUgb25lIGZvciB5b3UuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgcmVuZGVyXG4gICAgICogQHR5cGUgcmVuZGVyXG4gICAgICogQGRlcHJlY2F0ZWQgc2VlIERlbW8uanMgZm9yIGFuIGV4YW1wbGUgb2YgY3JlYXRpbmcgYSByZW5kZXJlclxuICAgICAqIEBkZWZhdWx0IGEgTWF0dGVyLlJlbmRlciBpbnN0YW5jZVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gaW5zdGFuY2Ugb2YgYSBicm9hZHBoYXNlIGNvbnRyb2xsZXIuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIGEgYE1hdHRlci5HcmlkYCBpbnN0YW5jZSBjcmVhdGVkIGJ5IGBFbmdpbmUuY3JlYXRlYC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBicm9hZHBoYXNlXG4gICAgICogQHR5cGUgZ3JpZFxuICAgICAqIEBkZWZhdWx0IGEgTWF0dGVyLkdyaWQgaW5zdGFuY2VcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYFdvcmxkYCBjb21wb3NpdGUgb2JqZWN0IHRoYXQgd2lsbCBjb250YWluIGFsbCBzaW11bGF0ZWQgYm9kaWVzIGFuZCBjb25zdHJhaW50cy5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB3b3JsZFxuICAgICAqIEB0eXBlIHdvcmxkXG4gICAgICogQGRlZmF1bHQgYSBNYXR0ZXIuV29ybGQgaW5zdGFuY2VcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFuIG9iamVjdCByZXNlcnZlZCBmb3Igc3RvcmluZyBwbHVnaW4tc3BlY2lmaWMgcHJvcGVydGllcy5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBwbHVnaW5cbiAgICAgKiBAdHlwZSB7fVxuICAgICAqL1xuXG59KSgpO1xuXG59LHtcIi4uL2JvZHkvQm9keVwiOjEsXCIuLi9ib2R5L0NvbXBvc2l0ZVwiOjIsXCIuLi9ib2R5L1dvcmxkXCI6MyxcIi4uL2NvbGxpc2lvbi9HcmlkXCI6NixcIi4uL2NvbGxpc2lvbi9QYWlyc1wiOjgsXCIuLi9jb2xsaXNpb24vUmVzb2x2ZXJcIjoxMCxcIi4uL2NvbnN0cmFpbnQvQ29uc3RyYWludFwiOjEyLFwiLi4vcmVuZGVyL1JlbmRlclwiOjMxLFwiLi9Db21tb25cIjoxNCxcIi4vRXZlbnRzXCI6MTYsXCIuL01ldHJpY3NcIjoxOCxcIi4vU2xlZXBpbmdcIjoyMn1dLDE2OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuKiBUaGUgYE1hdHRlci5FdmVudHNgIG1vZHVsZSBjb250YWlucyBtZXRob2RzIHRvIGZpcmUgYW5kIGxpc3RlbiB0byBldmVudHMgb24gb3RoZXIgb2JqZWN0cy5cbipcbiogU2VlIHRoZSBpbmNsdWRlZCB1c2FnZSBbZXhhbXBsZXNdKGh0dHBzOi8vZ2l0aHViLmNvbS9saWFicnUvbWF0dGVyLWpzL3RyZWUvbWFzdGVyL2V4YW1wbGVzKS5cbipcbiogQGNsYXNzIEV2ZW50c1xuKi9cblxudmFyIEV2ZW50cyA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50cztcblxudmFyIENvbW1vbiA9IF9kZXJlcV8oJy4vQ29tbW9uJyk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZXMgYSBjYWxsYmFjayBmdW5jdGlvbiB0byB0aGUgZ2l2ZW4gb2JqZWN0J3MgYGV2ZW50TmFtZWAuXG4gICAgICogQG1ldGhvZCBvblxuICAgICAqIEBwYXJhbSB7fSBvYmplY3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lc1xuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICovXG4gICAgRXZlbnRzLm9uID0gZnVuY3Rpb24ob2JqZWN0LCBldmVudE5hbWVzLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgbmFtZXMgPSBldmVudE5hbWVzLnNwbGl0KCcgJyksXG4gICAgICAgICAgICBuYW1lO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgICAgICAgIG9iamVjdC5ldmVudHMgPSBvYmplY3QuZXZlbnRzIHx8IHt9O1xuICAgICAgICAgICAgb2JqZWN0LmV2ZW50c1tuYW1lXSA9IG9iamVjdC5ldmVudHNbbmFtZV0gfHwgW107XG4gICAgICAgICAgICBvYmplY3QuZXZlbnRzW25hbWVdLnB1c2goY2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBnaXZlbiBldmVudCBjYWxsYmFjay4gSWYgbm8gY2FsbGJhY2ssIGNsZWFycyBhbGwgY2FsbGJhY2tzIGluIGBldmVudE5hbWVzYC4gSWYgbm8gYGV2ZW50TmFtZXNgLCBjbGVhcnMgYWxsIGV2ZW50cy5cbiAgICAgKiBAbWV0aG9kIG9mZlxuICAgICAqIEBwYXJhbSB7fSBvYmplY3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lc1xuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICovXG4gICAgRXZlbnRzLm9mZiA9IGZ1bmN0aW9uKG9iamVjdCwgZXZlbnROYW1lcywgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKCFldmVudE5hbWVzKSB7XG4gICAgICAgICAgICBvYmplY3QuZXZlbnRzID0ge307XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBoYW5kbGUgRXZlbnRzLm9mZihvYmplY3QsIGNhbGxiYWNrKVxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50TmFtZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gZXZlbnROYW1lcztcbiAgICAgICAgICAgIGV2ZW50TmFtZXMgPSBDb21tb24ua2V5cyhvYmplY3QuZXZlbnRzKS5qb2luKCcgJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbmFtZXMgPSBldmVudE5hbWVzLnNwbGl0KCcgJyk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrcyA9IG9iamVjdC5ldmVudHNbbmFtZXNbaV1dLFxuICAgICAgICAgICAgICAgIG5ld0NhbGxiYWNrcyA9IFtdO1xuXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgJiYgY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjYWxsYmFja3MubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrc1tqXSAhPT0gY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdDYWxsYmFja3MucHVzaChjYWxsYmFja3Nbal0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb2JqZWN0LmV2ZW50c1tuYW1lc1tpXV0gPSBuZXdDYWxsYmFja3M7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRmlyZXMgYWxsIHRoZSBjYWxsYmFja3Mgc3Vic2NyaWJlZCB0byB0aGUgZ2l2ZW4gb2JqZWN0J3MgYGV2ZW50TmFtZWAsIGluIHRoZSBvcmRlciB0aGV5IHN1YnNjcmliZWQsIGlmIGFueS5cbiAgICAgKiBAbWV0aG9kIHRyaWdnZXJcbiAgICAgKiBAcGFyYW0ge30gb2JqZWN0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZXNcbiAgICAgKiBAcGFyYW0ge30gZXZlbnRcbiAgICAgKi9cbiAgICBFdmVudHMudHJpZ2dlciA9IGZ1bmN0aW9uKG9iamVjdCwgZXZlbnROYW1lcywgZXZlbnQpIHtcbiAgICAgICAgdmFyIG5hbWVzLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGNhbGxiYWNrcyxcbiAgICAgICAgICAgIGV2ZW50Q2xvbmU7XG5cbiAgICAgICAgaWYgKG9iamVjdC5ldmVudHMpIHtcbiAgICAgICAgICAgIGlmICghZXZlbnQpXG4gICAgICAgICAgICAgICAgZXZlbnQgPSB7fTtcblxuICAgICAgICAgICAgbmFtZXMgPSBldmVudE5hbWVzLnNwbGl0KCcgJyk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBuYW1lID0gbmFtZXNbaV07XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzID0gb2JqZWN0LmV2ZW50c1tuYW1lXTtcblxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRDbG9uZSA9IENvbW1vbi5jbG9uZShldmVudCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBldmVudENsb25lLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgICAgICAgICBldmVudENsb25lLnNvdXJjZSA9IG9iamVjdDtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNhbGxiYWNrcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzW2pdLmFwcGx5KG9iamVjdCwgW2V2ZW50Q2xvbmVdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbn0pKCk7XG5cbn0se1wiLi9Db21tb25cIjoxNH1dLDE3OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuKiBUaGUgYE1hdHRlcmAgbW9kdWxlIGlzIHRoZSB0b3AgbGV2ZWwgbmFtZXNwYWNlLiBJdCBhbHNvIGluY2x1ZGVzIGEgZnVuY3Rpb24gZm9yIGluc3RhbGxpbmcgcGx1Z2lucyBvbiB0b3Agb2YgdGhlIGxpYnJhcnkuXG4qXG4qIEBjbGFzcyBNYXR0ZXJcbiovXG5cbnZhciBNYXR0ZXIgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBNYXR0ZXI7XG5cbnZhciBQbHVnaW4gPSBfZGVyZXFfKCcuL1BsdWdpbicpO1xudmFyIENvbW1vbiA9IF9kZXJlcV8oJy4vQ29tbW9uJyk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIFRoZSBsaWJyYXJ5IG5hbWUuXG4gICAgICogQHByb3BlcnR5IG5hbWVcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqL1xuICAgIE1hdHRlci5uYW1lID0gJ21hdHRlci1qcyc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbGlicmFyeSB2ZXJzaW9uLlxuICAgICAqIEBwcm9wZXJ0eSB2ZXJzaW9uXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKi9cbiAgICBNYXR0ZXIudmVyc2lvbiA9ICcwLjE0LjInO1xuXG4gICAgLyoqXG4gICAgICogQSBsaXN0IG9mIHBsdWdpbiBkZXBlbmRlbmNpZXMgdG8gYmUgaW5zdGFsbGVkLiBUaGVzZSBhcmUgbm9ybWFsbHkgc2V0IGFuZCBpbnN0YWxsZWQgdGhyb3VnaCBgTWF0dGVyLnVzZWAuXG4gICAgICogQWx0ZXJuYXRpdmVseSB5b3UgbWF5IHNldCBgTWF0dGVyLnVzZXNgIG1hbnVhbGx5IGFuZCBpbnN0YWxsIHRoZW0gYnkgY2FsbGluZyBgUGx1Z2luLnVzZShNYXR0ZXIpYC5cbiAgICAgKiBAcHJvcGVydHkgdXNlc1xuICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgKi9cbiAgICBNYXR0ZXIudXNlcyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHBsdWdpbnMgdGhhdCBoYXZlIGJlZW4gaW5zdGFsbGVkIHRocm91Z2ggYE1hdHRlci5QbHVnaW4uaW5zdGFsbGAuIFJlYWQgb25seS5cbiAgICAgKiBAcHJvcGVydHkgdXNlZFxuICAgICAqIEByZWFkT25seVxuICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgKi9cbiAgICBNYXR0ZXIudXNlZCA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogSW5zdGFsbHMgdGhlIGdpdmVuIHBsdWdpbnMgb24gdGhlIGBNYXR0ZXJgIG5hbWVzcGFjZS5cbiAgICAgKiBUaGlzIGlzIGEgc2hvcnQtaGFuZCBmb3IgYFBsdWdpbi51c2VgLCBzZWUgaXQgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICogQ2FsbCB0aGlzIGZ1bmN0aW9uIG9uY2UgYXQgdGhlIHN0YXJ0IG9mIHlvdXIgY29kZSwgd2l0aCBhbGwgb2YgdGhlIHBsdWdpbnMgeW91IHdpc2ggdG8gaW5zdGFsbCBhcyBhcmd1bWVudHMuXG4gICAgICogQXZvaWQgY2FsbGluZyB0aGlzIGZ1bmN0aW9uIG11bHRpcGxlIHRpbWVzIHVubGVzcyB5b3UgaW50ZW5kIHRvIG1hbnVhbGx5IGNvbnRyb2wgaW5zdGFsbGF0aW9uIG9yZGVyLlxuICAgICAqIEBtZXRob2QgdXNlXG4gICAgICogQHBhcmFtIC4uLnBsdWdpbiB7RnVuY3Rpb259IFRoZSBwbHVnaW4ocykgdG8gaW5zdGFsbCBvbiBgYmFzZWAgKG11bHRpLWFyZ3VtZW50KS5cbiAgICAgKi9cbiAgICBNYXR0ZXIudXNlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFBsdWdpbi51c2UoTWF0dGVyLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hhaW5zIGEgZnVuY3Rpb24gdG8gZXhjdXRlIGJlZm9yZSB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gb24gdGhlIGdpdmVuIGBwYXRoYCByZWxhdGl2ZSB0byBgTWF0dGVyYC5cbiAgICAgKiBTZWUgYWxzbyBkb2NzIGZvciBgQ29tbW9uLmNoYWluYC5cbiAgICAgKiBAbWV0aG9kIGJlZm9yZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHJlbGF0aXZlIHRvIGBNYXR0ZXJgXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hhaW4gYmVmb3JlIHRoZSBvcmlnaW5hbFxuICAgICAqIEByZXR1cm4ge2Z1bmN0aW9ufSBUaGUgY2hhaW5lZCBmdW5jdGlvbiB0aGF0IHJlcGxhY2VkIHRoZSBvcmlnaW5hbFxuICAgICAqL1xuICAgIE1hdHRlci5iZWZvcmUgPSBmdW5jdGlvbihwYXRoLCBmdW5jKSB7XG4gICAgICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL15NYXR0ZXIuLywgJycpO1xuICAgICAgICByZXR1cm4gQ29tbW9uLmNoYWluUGF0aEJlZm9yZShNYXR0ZXIsIHBhdGgsIGZ1bmMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGFpbnMgYSBmdW5jdGlvbiB0byBleGN1dGUgYWZ0ZXIgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIG9uIHRoZSBnaXZlbiBgcGF0aGAgcmVsYXRpdmUgdG8gYE1hdHRlcmAuXG4gICAgICogU2VlIGFsc28gZG9jcyBmb3IgYENvbW1vbi5jaGFpbmAuXG4gICAgICogQG1ldGhvZCBhZnRlclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHJlbGF0aXZlIHRvIGBNYXR0ZXJgXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hhaW4gYWZ0ZXIgdGhlIG9yaWdpbmFsXG4gICAgICogQHJldHVybiB7ZnVuY3Rpb259IFRoZSBjaGFpbmVkIGZ1bmN0aW9uIHRoYXQgcmVwbGFjZWQgdGhlIG9yaWdpbmFsXG4gICAgICovXG4gICAgTWF0dGVyLmFmdGVyID0gZnVuY3Rpb24ocGF0aCwgZnVuYykge1xuICAgICAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9eTWF0dGVyLi8sICcnKTtcbiAgICAgICAgcmV0dXJuIENvbW1vbi5jaGFpblBhdGhBZnRlcihNYXR0ZXIsIHBhdGgsIGZ1bmMpO1xuICAgIH07XG5cbn0pKCk7XG5cbn0se1wiLi9Db21tb25cIjoxNCxcIi4vUGx1Z2luXCI6MjB9XSwxODpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cbn0se1wiLi4vYm9keS9Db21wb3NpdGVcIjoyLFwiLi9Db21tb25cIjoxNH1dLDE5OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuKiBUaGUgYE1hdHRlci5Nb3VzZWAgbW9kdWxlIGNvbnRhaW5zIG1ldGhvZHMgZm9yIGNyZWF0aW5nIGFuZCBtYW5pcHVsYXRpbmcgbW91c2UgaW5wdXRzLlxuKlxuKiBAY2xhc3MgTW91c2VcbiovXG5cbnZhciBNb3VzZSA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1vdXNlO1xuXG52YXIgQ29tbW9uID0gX2RlcmVxXygnLi4vY29yZS9Db21tb24nKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG1vdXNlIGlucHV0LlxuICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICAgICAqIEByZXR1cm4ge21vdXNlfSBBIG5ldyBtb3VzZVxuICAgICAqL1xuICAgIE1vdXNlLmNyZWF0ZSA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIG1vdXNlID0ge307XG5cbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICBDb21tb24ubG9nKCdNb3VzZS5jcmVhdGU6IGVsZW1lbnQgd2FzIHVuZGVmaW5lZCwgZGVmYXVsdGluZyB0byBkb2N1bWVudC5ib2R5JywgJ3dhcm4nKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbW91c2UuZWxlbWVudCA9IGVsZW1lbnQgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgICAgbW91c2UuYWJzb2x1dGUgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgbW91c2UucG9zaXRpb24gPSB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgbW91c2UubW91c2Vkb3duUG9zaXRpb24gPSB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgbW91c2UubW91c2V1cFBvc2l0aW9uID0geyB4OiAwLCB5OiAwIH07XG4gICAgICAgIG1vdXNlLm9mZnNldCA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgICBtb3VzZS5zY2FsZSA9IHsgeDogMSwgeTogMSB9O1xuICAgICAgICBtb3VzZS53aGVlbERlbHRhID0gMDtcbiAgICAgICAgbW91c2UuYnV0dG9uID0gLTE7XG4gICAgICAgIG1vdXNlLnBpeGVsUmF0aW8gPSBtb3VzZS5lbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1waXhlbC1yYXRpbycpIHx8IDE7XG5cbiAgICAgICAgbW91c2Uuc291cmNlRXZlbnRzID0ge1xuICAgICAgICAgICAgbW91c2Vtb3ZlOiBudWxsLFxuICAgICAgICAgICAgbW91c2Vkb3duOiBudWxsLFxuICAgICAgICAgICAgbW91c2V1cDogbnVsbCxcbiAgICAgICAgICAgIG1vdXNld2hlZWw6IG51bGxcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIG1vdXNlLm1vdXNlbW92ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7IFxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gTW91c2UuX2dldFJlbGF0aXZlTW91c2VQb3NpdGlvbihldmVudCwgbW91c2UuZWxlbWVudCwgbW91c2UucGl4ZWxSYXRpbyksXG4gICAgICAgICAgICAgICAgdG91Y2hlcyA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzO1xuXG4gICAgICAgICAgICBpZiAodG91Y2hlcykge1xuICAgICAgICAgICAgICAgIG1vdXNlLmJ1dHRvbiA9IDA7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbW91c2UuYWJzb2x1dGUueCA9IHBvc2l0aW9uLng7XG4gICAgICAgICAgICBtb3VzZS5hYnNvbHV0ZS55ID0gcG9zaXRpb24ueTtcbiAgICAgICAgICAgIG1vdXNlLnBvc2l0aW9uLnggPSBtb3VzZS5hYnNvbHV0ZS54ICogbW91c2Uuc2NhbGUueCArIG1vdXNlLm9mZnNldC54O1xuICAgICAgICAgICAgbW91c2UucG9zaXRpb24ueSA9IG1vdXNlLmFic29sdXRlLnkgKiBtb3VzZS5zY2FsZS55ICsgbW91c2Uub2Zmc2V0Lnk7XG4gICAgICAgICAgICBtb3VzZS5zb3VyY2VFdmVudHMubW91c2Vtb3ZlID0gZXZlbnQ7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBtb3VzZS5tb3VzZWRvd24gPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gTW91c2UuX2dldFJlbGF0aXZlTW91c2VQb3NpdGlvbihldmVudCwgbW91c2UuZWxlbWVudCwgbW91c2UucGl4ZWxSYXRpbyksXG4gICAgICAgICAgICAgICAgdG91Y2hlcyA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzO1xuXG4gICAgICAgICAgICBpZiAodG91Y2hlcykge1xuICAgICAgICAgICAgICAgIG1vdXNlLmJ1dHRvbiA9IDA7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbW91c2UuYnV0dG9uID0gZXZlbnQuYnV0dG9uO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtb3VzZS5hYnNvbHV0ZS54ID0gcG9zaXRpb24ueDtcbiAgICAgICAgICAgIG1vdXNlLmFic29sdXRlLnkgPSBwb3NpdGlvbi55O1xuICAgICAgICAgICAgbW91c2UucG9zaXRpb24ueCA9IG1vdXNlLmFic29sdXRlLnggKiBtb3VzZS5zY2FsZS54ICsgbW91c2Uub2Zmc2V0Lng7XG4gICAgICAgICAgICBtb3VzZS5wb3NpdGlvbi55ID0gbW91c2UuYWJzb2x1dGUueSAqIG1vdXNlLnNjYWxlLnkgKyBtb3VzZS5vZmZzZXQueTtcbiAgICAgICAgICAgIG1vdXNlLm1vdXNlZG93blBvc2l0aW9uLnggPSBtb3VzZS5wb3NpdGlvbi54O1xuICAgICAgICAgICAgbW91c2UubW91c2Vkb3duUG9zaXRpb24ueSA9IG1vdXNlLnBvc2l0aW9uLnk7XG4gICAgICAgICAgICBtb3VzZS5zb3VyY2VFdmVudHMubW91c2Vkb3duID0gZXZlbnQ7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBtb3VzZS5tb3VzZXVwID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IE1vdXNlLl9nZXRSZWxhdGl2ZU1vdXNlUG9zaXRpb24oZXZlbnQsIG1vdXNlLmVsZW1lbnQsIG1vdXNlLnBpeGVsUmF0aW8pLFxuICAgICAgICAgICAgICAgIHRvdWNoZXMgPSBldmVudC5jaGFuZ2VkVG91Y2hlcztcblxuICAgICAgICAgICAgaWYgKHRvdWNoZXMpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBtb3VzZS5idXR0b24gPSAtMTtcbiAgICAgICAgICAgIG1vdXNlLmFic29sdXRlLnggPSBwb3NpdGlvbi54O1xuICAgICAgICAgICAgbW91c2UuYWJzb2x1dGUueSA9IHBvc2l0aW9uLnk7XG4gICAgICAgICAgICBtb3VzZS5wb3NpdGlvbi54ID0gbW91c2UuYWJzb2x1dGUueCAqIG1vdXNlLnNjYWxlLnggKyBtb3VzZS5vZmZzZXQueDtcbiAgICAgICAgICAgIG1vdXNlLnBvc2l0aW9uLnkgPSBtb3VzZS5hYnNvbHV0ZS55ICogbW91c2Uuc2NhbGUueSArIG1vdXNlLm9mZnNldC55O1xuICAgICAgICAgICAgbW91c2UubW91c2V1cFBvc2l0aW9uLnggPSBtb3VzZS5wb3NpdGlvbi54O1xuICAgICAgICAgICAgbW91c2UubW91c2V1cFBvc2l0aW9uLnkgPSBtb3VzZS5wb3NpdGlvbi55O1xuICAgICAgICAgICAgbW91c2Uuc291cmNlRXZlbnRzLm1vdXNldXAgPSBldmVudDtcbiAgICAgICAgfTtcblxuICAgICAgICBtb3VzZS5tb3VzZXdoZWVsID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIG1vdXNlLndoZWVsRGVsdGEgPSBNYXRoLm1heCgtMSwgTWF0aC5taW4oMSwgZXZlbnQud2hlZWxEZWx0YSB8fCAtZXZlbnQuZGV0YWlsKSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIE1vdXNlLnNldEVsZW1lbnQobW91c2UsIG1vdXNlLmVsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiBtb3VzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZWxlbWVudCB0aGUgbW91c2UgaXMgYm91bmQgdG8gKGFuZCByZWxhdGl2ZSB0bykuXG4gICAgICogQG1ldGhvZCBzZXRFbGVtZW50XG4gICAgICogQHBhcmFtIHttb3VzZX0gbW91c2VcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAgICovXG4gICAgTW91c2Uuc2V0RWxlbWVudCA9IGZ1bmN0aW9uKG1vdXNlLCBlbGVtZW50KSB7XG4gICAgICAgIG1vdXNlLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2UubW91c2Vtb3ZlKTtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZS5tb3VzZWRvd24pO1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZS5tb3VzZXVwKTtcbiAgICAgICAgXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIG1vdXNlLm1vdXNld2hlZWwpO1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgbW91c2UubW91c2V3aGVlbCk7XG5cbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBtb3VzZS5tb3VzZW1vdmUpO1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBtb3VzZS5tb3VzZWRvd24pO1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgbW91c2UubW91c2V1cCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENsZWFycyBhbGwgY2FwdHVyZWQgc291cmNlIGV2ZW50cy5cbiAgICAgKiBAbWV0aG9kIGNsZWFyU291cmNlRXZlbnRzXG4gICAgICogQHBhcmFtIHttb3VzZX0gbW91c2VcbiAgICAgKi9cbiAgICBNb3VzZS5jbGVhclNvdXJjZUV2ZW50cyA9IGZ1bmN0aW9uKG1vdXNlKSB7XG4gICAgICAgIG1vdXNlLnNvdXJjZUV2ZW50cy5tb3VzZW1vdmUgPSBudWxsO1xuICAgICAgICBtb3VzZS5zb3VyY2VFdmVudHMubW91c2Vkb3duID0gbnVsbDtcbiAgICAgICAgbW91c2Uuc291cmNlRXZlbnRzLm1vdXNldXAgPSBudWxsO1xuICAgICAgICBtb3VzZS5zb3VyY2VFdmVudHMubW91c2V3aGVlbCA9IG51bGw7XG4gICAgICAgIG1vdXNlLndoZWVsRGVsdGEgPSAwO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBtb3VzZSBwb3NpdGlvbiBvZmZzZXQuXG4gICAgICogQG1ldGhvZCBzZXRPZmZzZXRcbiAgICAgKiBAcGFyYW0ge21vdXNlfSBtb3VzZVxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSBvZmZzZXRcbiAgICAgKi9cbiAgICBNb3VzZS5zZXRPZmZzZXQgPSBmdW5jdGlvbihtb3VzZSwgb2Zmc2V0KSB7XG4gICAgICAgIG1vdXNlLm9mZnNldC54ID0gb2Zmc2V0Lng7XG4gICAgICAgIG1vdXNlLm9mZnNldC55ID0gb2Zmc2V0Lnk7XG4gICAgICAgIG1vdXNlLnBvc2l0aW9uLnggPSBtb3VzZS5hYnNvbHV0ZS54ICogbW91c2Uuc2NhbGUueCArIG1vdXNlLm9mZnNldC54O1xuICAgICAgICBtb3VzZS5wb3NpdGlvbi55ID0gbW91c2UuYWJzb2x1dGUueSAqIG1vdXNlLnNjYWxlLnkgKyBtb3VzZS5vZmZzZXQueTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgbW91c2UgcG9zaXRpb24gc2NhbGUuXG4gICAgICogQG1ldGhvZCBzZXRTY2FsZVxuICAgICAqIEBwYXJhbSB7bW91c2V9IG1vdXNlXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHNjYWxlXG4gICAgICovXG4gICAgTW91c2Uuc2V0U2NhbGUgPSBmdW5jdGlvbihtb3VzZSwgc2NhbGUpIHtcbiAgICAgICAgbW91c2Uuc2NhbGUueCA9IHNjYWxlLng7XG4gICAgICAgIG1vdXNlLnNjYWxlLnkgPSBzY2FsZS55O1xuICAgICAgICBtb3VzZS5wb3NpdGlvbi54ID0gbW91c2UuYWJzb2x1dGUueCAqIG1vdXNlLnNjYWxlLnggKyBtb3VzZS5vZmZzZXQueDtcbiAgICAgICAgbW91c2UucG9zaXRpb24ueSA9IG1vdXNlLmFic29sdXRlLnkgKiBtb3VzZS5zY2FsZS55ICsgbW91c2Uub2Zmc2V0Lnk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtb3VzZSBwb3NpdGlvbiByZWxhdGl2ZSB0byBhbiBlbGVtZW50IGdpdmVuIGEgc2NyZWVuIHBpeGVsIHJhdGlvLlxuICAgICAqIEBtZXRob2QgX2dldFJlbGF0aXZlTW91c2VQb3NpdGlvblxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHt9IGV2ZW50XG4gICAgICogQHBhcmFtIHt9IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGl4ZWxSYXRpb1xuICAgICAqIEByZXR1cm4ge31cbiAgICAgKi9cbiAgICBNb3VzZS5fZ2V0UmVsYXRpdmVNb3VzZVBvc2l0aW9uID0gZnVuY3Rpb24oZXZlbnQsIGVsZW1lbnQsIHBpeGVsUmF0aW8pIHtcbiAgICAgICAgdmFyIGVsZW1lbnRCb3VuZHMgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgICAgcm9vdE5vZGUgPSAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8IGRvY3VtZW50LmJvZHkucGFyZW50Tm9kZSB8fCBkb2N1bWVudC5ib2R5KSxcbiAgICAgICAgICAgIHNjcm9sbFggPSAod2luZG93LnBhZ2VYT2Zmc2V0ICE9PSB1bmRlZmluZWQpID8gd2luZG93LnBhZ2VYT2Zmc2V0IDogcm9vdE5vZGUuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgIHNjcm9sbFkgPSAod2luZG93LnBhZ2VZT2Zmc2V0ICE9PSB1bmRlZmluZWQpID8gd2luZG93LnBhZ2VZT2Zmc2V0IDogcm9vdE5vZGUuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgdG91Y2hlcyA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzLFxuICAgICAgICAgICAgeCwgeTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0b3VjaGVzKSB7XG4gICAgICAgICAgICB4ID0gdG91Y2hlc1swXS5wYWdlWCAtIGVsZW1lbnRCb3VuZHMubGVmdCAtIHNjcm9sbFg7XG4gICAgICAgICAgICB5ID0gdG91Y2hlc1swXS5wYWdlWSAtIGVsZW1lbnRCb3VuZHMudG9wIC0gc2Nyb2xsWTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHggPSBldmVudC5wYWdlWCAtIGVsZW1lbnRCb3VuZHMubGVmdCAtIHNjcm9sbFg7XG4gICAgICAgICAgICB5ID0gZXZlbnQucGFnZVkgLSBlbGVtZW50Qm91bmRzLnRvcCAtIHNjcm9sbFk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBcbiAgICAgICAgICAgIHg6IHggLyAoZWxlbWVudC5jbGllbnRXaWR0aCAvIChlbGVtZW50LndpZHRoIHx8IGVsZW1lbnQuY2xpZW50V2lkdGgpICogcGl4ZWxSYXRpbyksXG4gICAgICAgICAgICB5OiB5IC8gKGVsZW1lbnQuY2xpZW50SGVpZ2h0IC8gKGVsZW1lbnQuaGVpZ2h0IHx8IGVsZW1lbnQuY2xpZW50SGVpZ2h0KSAqIHBpeGVsUmF0aW8pXG4gICAgICAgIH07XG4gICAgfTtcblxufSkoKTtcblxufSx7XCIuLi9jb3JlL0NvbW1vblwiOjE0fV0sMjA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyLlBsdWdpbmAgbW9kdWxlIGNvbnRhaW5zIGZ1bmN0aW9ucyBmb3IgcmVnaXN0ZXJpbmcgYW5kIGluc3RhbGxpbmcgcGx1Z2lucyBvbiBtb2R1bGVzLlxuKlxuKiBAY2xhc3MgUGx1Z2luXG4qL1xuXG52YXIgUGx1Z2luID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gUGx1Z2luO1xuXG52YXIgQ29tbW9uID0gX2RlcmVxXygnLi9Db21tb24nKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgUGx1Z2luLl9yZWdpc3RyeSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGEgcGx1Z2luIG9iamVjdCBzbyBpdCBjYW4gYmUgcmVzb2x2ZWQgbGF0ZXIgYnkgbmFtZS5cbiAgICAgKiBAbWV0aG9kIHJlZ2lzdGVyXG4gICAgICogQHBhcmFtIHBsdWdpbiB7fSBUaGUgcGx1Z2luIHRvIHJlZ2lzdGVyLlxuICAgICAqIEByZXR1cm4ge29iamVjdH0gVGhlIHBsdWdpbi5cbiAgICAgKi9cbiAgICBQbHVnaW4ucmVnaXN0ZXIgPSBmdW5jdGlvbihwbHVnaW4pIHtcbiAgICAgICAgaWYgKCFQbHVnaW4uaXNQbHVnaW4ocGx1Z2luKSkge1xuICAgICAgICAgICAgQ29tbW9uLndhcm4oJ1BsdWdpbi5yZWdpc3RlcjonLCBQbHVnaW4udG9TdHJpbmcocGx1Z2luKSwgJ2RvZXMgbm90IGltcGxlbWVudCBhbGwgcmVxdWlyZWQgZmllbGRzLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBsdWdpbi5uYW1lIGluIFBsdWdpbi5fcmVnaXN0cnkpIHtcbiAgICAgICAgICAgIHZhciByZWdpc3RlcmVkID0gUGx1Z2luLl9yZWdpc3RyeVtwbHVnaW4ubmFtZV0sXG4gICAgICAgICAgICAgICAgcGx1Z2luVmVyc2lvbiA9IFBsdWdpbi52ZXJzaW9uUGFyc2UocGx1Z2luLnZlcnNpb24pLm51bWJlcixcbiAgICAgICAgICAgICAgICByZWdpc3RlcmVkVmVyc2lvbiA9IFBsdWdpbi52ZXJzaW9uUGFyc2UocmVnaXN0ZXJlZC52ZXJzaW9uKS5udW1iZXI7XG5cbiAgICAgICAgICAgIGlmIChwbHVnaW5WZXJzaW9uID4gcmVnaXN0ZXJlZFZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICBDb21tb24ud2FybignUGx1Z2luLnJlZ2lzdGVyOicsIFBsdWdpbi50b1N0cmluZyhyZWdpc3RlcmVkKSwgJ3dhcyB1cGdyYWRlZCB0bycsIFBsdWdpbi50b1N0cmluZyhwbHVnaW4pKTtcbiAgICAgICAgICAgICAgICBQbHVnaW4uX3JlZ2lzdHJ5W3BsdWdpbi5uYW1lXSA9IHBsdWdpbjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGx1Z2luVmVyc2lvbiA8IHJlZ2lzdGVyZWRWZXJzaW9uKSB7XG4gICAgICAgICAgICAgICAgQ29tbW9uLndhcm4oJ1BsdWdpbi5yZWdpc3RlcjonLCBQbHVnaW4udG9TdHJpbmcocmVnaXN0ZXJlZCksICdjYW4gbm90IGJlIGRvd25ncmFkZWQgdG8nLCBQbHVnaW4udG9TdHJpbmcocGx1Z2luKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBsdWdpbiAhPT0gcmVnaXN0ZXJlZCkge1xuICAgICAgICAgICAgICAgIENvbW1vbi53YXJuKCdQbHVnaW4ucmVnaXN0ZXI6JywgUGx1Z2luLnRvU3RyaW5nKHBsdWdpbiksICdpcyBhbHJlYWR5IHJlZ2lzdGVyZWQgdG8gZGlmZmVyZW50IHBsdWdpbiBvYmplY3QnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFBsdWdpbi5fcmVnaXN0cnlbcGx1Z2luLm5hbWVdID0gcGx1Z2luO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBsdWdpbjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVzb2x2ZXMgYSBkZXBlbmRlbmN5IHRvIGEgcGx1Z2luIG9iamVjdCBmcm9tIHRoZSByZWdpc3RyeSBpZiBpdCBleGlzdHMuIFxuICAgICAqIFRoZSBgZGVwZW5kZW5jeWAgbWF5IGNvbnRhaW4gYSB2ZXJzaW9uLCBidXQgb25seSB0aGUgbmFtZSBtYXR0ZXJzIHdoZW4gcmVzb2x2aW5nLlxuICAgICAqIEBtZXRob2QgcmVzb2x2ZVxuICAgICAqIEBwYXJhbSBkZXBlbmRlbmN5IHtzdHJpbmd9IFRoZSBkZXBlbmRlbmN5LlxuICAgICAqIEByZXR1cm4ge29iamVjdH0gVGhlIHBsdWdpbiBpZiByZXNvbHZlZCwgb3RoZXJ3aXNlIGB1bmRlZmluZWRgLlxuICAgICAqL1xuICAgIFBsdWdpbi5yZXNvbHZlID0gZnVuY3Rpb24oZGVwZW5kZW5jeSkge1xuICAgICAgICByZXR1cm4gUGx1Z2luLl9yZWdpc3RyeVtQbHVnaW4uZGVwZW5kZW5jeVBhcnNlKGRlcGVuZGVuY3kpLm5hbWVdO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJldHR5IHByaW50ZWQgcGx1Z2luIG5hbWUgYW5kIHZlcnNpb24uXG4gICAgICogQG1ldGhvZCB0b1N0cmluZ1xuICAgICAqIEBwYXJhbSBwbHVnaW4ge30gVGhlIHBsdWdpbi5cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFByZXR0eSBwcmludGVkIHBsdWdpbiBuYW1lIGFuZCB2ZXJzaW9uLlxuICAgICAqL1xuICAgIFBsdWdpbi50b1N0cmluZyA9IGZ1bmN0aW9uKHBsdWdpbikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHBsdWdpbiA9PT0gJ3N0cmluZycgPyBwbHVnaW4gOiAocGx1Z2luLm5hbWUgfHwgJ2Fub255bW91cycpICsgJ0AnICsgKHBsdWdpbi52ZXJzaW9uIHx8IHBsdWdpbi5yYW5nZSB8fCAnMC4wLjAnKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdCBtZWV0cyB0aGUgbWluaW11bSBzdGFuZGFyZCB0byBiZSBjb25zaWRlcmVkIGEgcGx1Z2luLlxuICAgICAqIFRoaXMgbWVhbnMgaXQgbXVzdCBkZWZpbmUgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICAgICAqIC0gYG5hbWVgXG4gICAgICogLSBgdmVyc2lvbmBcbiAgICAgKiAtIGBpbnN0YWxsYFxuICAgICAqIEBtZXRob2QgaXNQbHVnaW5cbiAgICAgKiBAcGFyYW0gb2JqIHt9IFRoZSBvYmogdG8gdGVzdC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIG9iamVjdCBjYW4gYmUgY29uc2lkZXJlZCBhIHBsdWdpbiBvdGhlcndpc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBQbHVnaW4uaXNQbHVnaW4gPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiAmJiBvYmoubmFtZSAmJiBvYmoudmVyc2lvbiAmJiBvYmouaW5zdGFsbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgYSBwbHVnaW4gd2l0aCB0aGUgZ2l2ZW4gYG5hbWVgIGJlZW4gaW5zdGFsbGVkIG9uIGBtb2R1bGVgLlxuICAgICAqIEBtZXRob2QgaXNVc2VkXG4gICAgICogQHBhcmFtIG1vZHVsZSB7fSBUaGUgbW9kdWxlLlxuICAgICAqIEBwYXJhbSBuYW1lIHtzdHJpbmd9IFRoZSBwbHVnaW4gbmFtZS5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBgdHJ1ZWAgaWYgYSBwbHVnaW4gd2l0aCB0aGUgZ2l2ZW4gYG5hbWVgIGJlZW4gaW5zdGFsbGVkIG9uIGBtb2R1bGVgLCBvdGhlcndpc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBQbHVnaW4uaXNVc2VkID0gZnVuY3Rpb24obW9kdWxlLCBuYW1lKSB7XG4gICAgICAgIHJldHVybiBtb2R1bGUudXNlZC5pbmRleE9mKG5hbWUpID4gLTE7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIGBwbHVnaW4uZm9yYCBpcyBhcHBsaWNhYmxlIHRvIGBtb2R1bGVgIGJ5IGNvbXBhcmluZyBhZ2FpbnN0IGBtb2R1bGUubmFtZWAgYW5kIGBtb2R1bGUudmVyc2lvbmAuXG4gICAgICogSWYgYHBsdWdpbi5mb3JgIGlzIG5vdCBzcGVjaWZpZWQgdGhlbiBpdCBpcyBhc3N1bWVkIHRvIGJlIGFwcGxpY2FibGUuXG4gICAgICogVGhlIHZhbHVlIG9mIGBwbHVnaW4uZm9yYCBpcyBhIHN0cmluZyBvZiB0aGUgZm9ybWF0IGAnbW9kdWxlLW5hbWUnYCBvciBgJ21vZHVsZS1uYW1lQHZlcnNpb24nYC5cbiAgICAgKiBAbWV0aG9kIGlzRm9yXG4gICAgICogQHBhcmFtIHBsdWdpbiB7fSBUaGUgcGx1Z2luLlxuICAgICAqIEBwYXJhbSBtb2R1bGUge30gVGhlIG1vZHVsZS5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBgdHJ1ZWAgaWYgYHBsdWdpbi5mb3JgIGlzIGFwcGxpY2FibGUgdG8gYG1vZHVsZWAsIG90aGVyd2lzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIFBsdWdpbi5pc0ZvciA9IGZ1bmN0aW9uKHBsdWdpbiwgbW9kdWxlKSB7XG4gICAgICAgIHZhciBwYXJzZWQgPSBwbHVnaW4uZm9yICYmIFBsdWdpbi5kZXBlbmRlbmN5UGFyc2UocGx1Z2luLmZvcik7XG4gICAgICAgIHJldHVybiAhcGx1Z2luLmZvciB8fCAobW9kdWxlLm5hbWUgPT09IHBhcnNlZC5uYW1lICYmIFBsdWdpbi52ZXJzaW9uU2F0aXNmaWVzKG1vZHVsZS52ZXJzaW9uLCBwYXJzZWQucmFuZ2UpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSW5zdGFsbHMgdGhlIHBsdWdpbnMgYnkgY2FsbGluZyBgcGx1Z2luLmluc3RhbGxgIG9uIGVhY2ggcGx1Z2luIHNwZWNpZmllZCBpbiBgcGx1Z2luc2AgaWYgcGFzc2VkLCBvdGhlcndpc2UgYG1vZHVsZS51c2VzYC5cbiAgICAgKiBGb3IgaW5zdGFsbGluZyBwbHVnaW5zIG9uIGBNYXR0ZXJgIHNlZSB0aGUgY29udmVuaWVuY2UgZnVuY3Rpb24gYE1hdHRlci51c2VgLlxuICAgICAqIFBsdWdpbnMgbWF5IGJlIHNwZWNpZmllZCBlaXRoZXIgYnkgdGhlaXIgbmFtZSBvciBhIHJlZmVyZW5jZSB0byB0aGUgcGx1Z2luIG9iamVjdC5cbiAgICAgKiBQbHVnaW5zIHRoZW1zZWx2ZXMgbWF5IHNwZWNpZnkgZnVydGhlciBkZXBlbmRlbmNpZXMsIGJ1dCBlYWNoIHBsdWdpbiBpcyBpbnN0YWxsZWQgb25seSBvbmNlLlxuICAgICAqIE9yZGVyIGlzIGltcG9ydGFudCwgYSB0b3BvbG9naWNhbCBzb3J0IGlzIHBlcmZvcm1lZCB0byBmaW5kIHRoZSBiZXN0IHJlc3VsdGluZyBvcmRlciBvZiBpbnN0YWxsYXRpb24uXG4gICAgICogVGhpcyBzb3J0aW5nIGF0dGVtcHRzIHRvIHNhdGlzZnkgZXZlcnkgZGVwZW5kZW5jeSdzIHJlcXVlc3RlZCBvcmRlcmluZywgYnV0IG1heSBub3QgYmUgZXhhY3QgaW4gYWxsIGNhc2VzLlxuICAgICAqIFRoaXMgZnVuY3Rpb24gbG9ncyB0aGUgcmVzdWx0aW5nIHN0YXR1cyBvZiBlYWNoIGRlcGVuZGVuY3kgaW4gdGhlIGNvbnNvbGUsIGFsb25nIHdpdGggYW55IHdhcm5pbmdzLlxuICAgICAqIC0gQSBncmVlbiB0aWNrIOKchSBpbmRpY2F0ZXMgYSBkZXBlbmRlbmN5IHdhcyByZXNvbHZlZCBhbmQgaW5zdGFsbGVkLlxuICAgICAqIC0gQW4gb3JhbmdlIGRpYW1vbmQg8J+UtiBpbmRpY2F0ZXMgYSBkZXBlbmRlbmN5IHdhcyByZXNvbHZlZCBidXQgYSB3YXJuaW5nIHdhcyB0aHJvd24gZm9yIGl0IG9yIG9uZSBpZiBpdHMgZGVwZW5kZW5jaWVzLlxuICAgICAqIC0gQSByZWQgY3Jvc3Mg4p2MIGluZGljYXRlcyBhIGRlcGVuZGVuY3kgY291bGQgbm90IGJlIHJlc29sdmVkLlxuICAgICAqIEF2b2lkIGNhbGxpbmcgdGhpcyBmdW5jdGlvbiBtdWx0aXBsZSB0aW1lcyBvbiB0aGUgc2FtZSBtb2R1bGUgdW5sZXNzIHlvdSBpbnRlbmQgdG8gbWFudWFsbHkgY29udHJvbCBpbnN0YWxsYXRpb24gb3JkZXIuXG4gICAgICogQG1ldGhvZCB1c2VcbiAgICAgKiBAcGFyYW0gbW9kdWxlIHt9IFRoZSBtb2R1bGUgaW5zdGFsbCBwbHVnaW5zIG9uLlxuICAgICAqIEBwYXJhbSBbcGx1Z2lucz1tb2R1bGUudXNlc10ge30gVGhlIHBsdWdpbnMgdG8gaW5zdGFsbCBvbiBtb2R1bGUgKG9wdGlvbmFsLCBkZWZhdWx0cyB0byBgbW9kdWxlLnVzZXNgKS5cbiAgICAgKi9cbiAgICBQbHVnaW4udXNlID0gZnVuY3Rpb24obW9kdWxlLCBwbHVnaW5zKSB7XG4gICAgICAgIG1vZHVsZS51c2VzID0gKG1vZHVsZS51c2VzIHx8IFtdKS5jb25jYXQocGx1Z2lucyB8fCBbXSk7XG5cbiAgICAgICAgaWYgKG1vZHVsZS51c2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgQ29tbW9uLndhcm4oJ1BsdWdpbi51c2U6JywgUGx1Z2luLnRvU3RyaW5nKG1vZHVsZSksICdkb2VzIG5vdCBzcGVjaWZ5IGFueSBkZXBlbmRlbmNpZXMgdG8gaW5zdGFsbC4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkZXBlbmRlbmNpZXMgPSBQbHVnaW4uZGVwZW5kZW5jaWVzKG1vZHVsZSksXG4gICAgICAgICAgICBzb3J0ZWREZXBlbmRlbmNpZXMgPSBDb21tb24udG9wb2xvZ2ljYWxTb3J0KGRlcGVuZGVuY2llcyksXG4gICAgICAgICAgICBzdGF0dXMgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvcnRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaWYgKHNvcnRlZERlcGVuZGVuY2llc1tpXSA9PT0gbW9kdWxlLm5hbWUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHBsdWdpbiA9IFBsdWdpbi5yZXNvbHZlKHNvcnRlZERlcGVuZGVuY2llc1tpXSk7XG5cbiAgICAgICAgICAgIGlmICghcGx1Z2luKSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzLnB1c2goJ+KdjCAnICsgc29ydGVkRGVwZW5kZW5jaWVzW2ldKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKFBsdWdpbi5pc1VzZWQobW9kdWxlLCBwbHVnaW4ubmFtZSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFQbHVnaW4uaXNGb3IocGx1Z2luLCBtb2R1bGUpKSB7XG4gICAgICAgICAgICAgICAgQ29tbW9uLndhcm4oJ1BsdWdpbi51c2U6JywgUGx1Z2luLnRvU3RyaW5nKHBsdWdpbiksICdpcyBmb3InLCBwbHVnaW4uZm9yLCAnYnV0IGluc3RhbGxlZCBvbicsIFBsdWdpbi50b1N0cmluZyhtb2R1bGUpICsgJy4nKTtcbiAgICAgICAgICAgICAgICBwbHVnaW4uX3dhcm5lZCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwbHVnaW4uaW5zdGFsbCkge1xuICAgICAgICAgICAgICAgIHBsdWdpbi5pbnN0YWxsKG1vZHVsZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIENvbW1vbi53YXJuKCdQbHVnaW4udXNlOicsIFBsdWdpbi50b1N0cmluZyhwbHVnaW4pLCAnZG9lcyBub3Qgc3BlY2lmeSBhbiBpbnN0YWxsIGZ1bmN0aW9uLicpO1xuICAgICAgICAgICAgICAgIHBsdWdpbi5fd2FybmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBsdWdpbi5fd2FybmVkKSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzLnB1c2goJ/CflLYgJyArIFBsdWdpbi50b1N0cmluZyhwbHVnaW4pKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgcGx1Z2luLl93YXJuZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YXR1cy5wdXNoKCfinIUgJyArIFBsdWdpbi50b1N0cmluZyhwbHVnaW4pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbW9kdWxlLnVzZWQucHVzaChwbHVnaW4ubmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIENvbW1vbi5pbmZvKHN0YXR1cy5qb2luKCcgICcpKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZWN1cnNpdmVseSBmaW5kcyBhbGwgb2YgYSBtb2R1bGUncyBkZXBlbmRlbmNpZXMgYW5kIHJldHVybnMgYSBmbGF0IGRlcGVuZGVuY3kgZ3JhcGguXG4gICAgICogQG1ldGhvZCBkZXBlbmRlbmNpZXNcbiAgICAgKiBAcGFyYW0gbW9kdWxlIHt9IFRoZSBtb2R1bGUuXG4gICAgICogQHJldHVybiB7b2JqZWN0fSBBIGRlcGVuZGVuY3kgZ3JhcGguXG4gICAgICovXG4gICAgUGx1Z2luLmRlcGVuZGVuY2llcyA9IGZ1bmN0aW9uKG1vZHVsZSwgdHJhY2tlZCkge1xuICAgICAgICB2YXIgcGFyc2VkQmFzZSA9IFBsdWdpbi5kZXBlbmRlbmN5UGFyc2UobW9kdWxlKSxcbiAgICAgICAgICAgIG5hbWUgPSBwYXJzZWRCYXNlLm5hbWU7XG5cbiAgICAgICAgdHJhY2tlZCA9IHRyYWNrZWQgfHwge307XG5cbiAgICAgICAgaWYgKG5hbWUgaW4gdHJhY2tlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbW9kdWxlID0gUGx1Z2luLnJlc29sdmUobW9kdWxlKSB8fCBtb2R1bGU7XG5cbiAgICAgICAgdHJhY2tlZFtuYW1lXSA9IENvbW1vbi5tYXAobW9kdWxlLnVzZXMgfHwgW10sIGZ1bmN0aW9uKGRlcGVuZGVuY3kpIHtcbiAgICAgICAgICAgIGlmIChQbHVnaW4uaXNQbHVnaW4oZGVwZW5kZW5jeSkpIHtcbiAgICAgICAgICAgICAgICBQbHVnaW4ucmVnaXN0ZXIoZGVwZW5kZW5jeSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBwYXJzZWQgPSBQbHVnaW4uZGVwZW5kZW5jeVBhcnNlKGRlcGVuZGVuY3kpLFxuICAgICAgICAgICAgICAgIHJlc29sdmVkID0gUGx1Z2luLnJlc29sdmUoZGVwZW5kZW5jeSk7XG5cbiAgICAgICAgICAgIGlmIChyZXNvbHZlZCAmJiAhUGx1Z2luLnZlcnNpb25TYXRpc2ZpZXMocmVzb2x2ZWQudmVyc2lvbiwgcGFyc2VkLnJhbmdlKSkge1xuICAgICAgICAgICAgICAgIENvbW1vbi53YXJuKFxuICAgICAgICAgICAgICAgICAgICAnUGx1Z2luLmRlcGVuZGVuY2llczonLCBQbHVnaW4udG9TdHJpbmcocmVzb2x2ZWQpLCAnZG9lcyBub3Qgc2F0aXNmeScsXG4gICAgICAgICAgICAgICAgICAgIFBsdWdpbi50b1N0cmluZyhwYXJzZWQpLCAndXNlZCBieScsIFBsdWdpbi50b1N0cmluZyhwYXJzZWRCYXNlKSArICcuJ1xuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlZC5fd2FybmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBtb2R1bGUuX3dhcm5lZCA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFyZXNvbHZlZCkge1xuICAgICAgICAgICAgICAgIENvbW1vbi53YXJuKFxuICAgICAgICAgICAgICAgICAgICAnUGx1Z2luLmRlcGVuZGVuY2llczonLCBQbHVnaW4udG9TdHJpbmcoZGVwZW5kZW5jeSksICd1c2VkIGJ5JyxcbiAgICAgICAgICAgICAgICAgICAgUGx1Z2luLnRvU3RyaW5nKHBhcnNlZEJhc2UpLCAnY291bGQgbm90IGJlIHJlc29sdmVkLidcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgbW9kdWxlLl93YXJuZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VkLm5hbWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhY2tlZFtuYW1lXS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgUGx1Z2luLmRlcGVuZGVuY2llcyh0cmFja2VkW25hbWVdW2ldLCB0cmFja2VkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cmFja2VkO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgYSBkZXBlbmRlbmN5IHN0cmluZyBpbnRvIGl0cyBjb21wb25lbnRzLlxuICAgICAqIFRoZSBgZGVwZW5kZW5jeWAgaXMgYSBzdHJpbmcgb2YgdGhlIGZvcm1hdCBgJ21vZHVsZS1uYW1lJ2Agb3IgYCdtb2R1bGUtbmFtZUB2ZXJzaW9uJ2AuXG4gICAgICogU2VlIGRvY3VtZW50YXRpb24gZm9yIGBQbHVnaW4udmVyc2lvblBhcnNlYCBmb3IgYSBkZXNjcmlwdGlvbiBvZiB0aGUgZm9ybWF0LlxuICAgICAqIFRoaXMgZnVuY3Rpb24gY2FuIGFsc28gaGFuZGxlIGRlcGVuZGVuY2llcyB0aGF0IGFyZSBhbHJlYWR5IHJlc29sdmVkIChlLmcuIGEgbW9kdWxlIG9iamVjdCkuXG4gICAgICogQG1ldGhvZCBkZXBlbmRlbmN5UGFyc2VcbiAgICAgKiBAcGFyYW0gZGVwZW5kZW5jeSB7c3RyaW5nfSBUaGUgZGVwZW5kZW5jeSBvZiB0aGUgZm9ybWF0IGAnbW9kdWxlLW5hbWUnYCBvciBgJ21vZHVsZS1uYW1lQHZlcnNpb24nYC5cbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IFRoZSBkZXBlbmRlbmN5IHBhcnNlZCBpbnRvIGl0cyBjb21wb25lbnRzLlxuICAgICAqL1xuICAgIFBsdWdpbi5kZXBlbmRlbmN5UGFyc2UgPSBmdW5jdGlvbihkZXBlbmRlbmN5KSB7XG4gICAgICAgIGlmIChDb21tb24uaXNTdHJpbmcoZGVwZW5kZW5jeSkpIHtcbiAgICAgICAgICAgIHZhciBwYXR0ZXJuID0gL15bXFx3LV0rKEAoXFwqfFtcXF5+XT9cXGQrXFwuXFxkK1xcLlxcZCsoLVswLTlBLVphLXotXSspPykpPyQvO1xuXG4gICAgICAgICAgICBpZiAoIXBhdHRlcm4udGVzdChkZXBlbmRlbmN5KSkge1xuICAgICAgICAgICAgICAgIENvbW1vbi53YXJuKCdQbHVnaW4uZGVwZW5kZW5jeVBhcnNlOicsIGRlcGVuZGVuY3ksICdpcyBub3QgYSB2YWxpZCBkZXBlbmRlbmN5IHN0cmluZy4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBkZXBlbmRlbmN5LnNwbGl0KCdAJylbMF0sXG4gICAgICAgICAgICAgICAgcmFuZ2U6IGRlcGVuZGVuY3kuc3BsaXQoJ0AnKVsxXSB8fCAnKidcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogZGVwZW5kZW5jeS5uYW1lLFxuICAgICAgICAgICAgcmFuZ2U6IGRlcGVuZGVuY3kucmFuZ2UgfHwgZGVwZW5kZW5jeS52ZXJzaW9uXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhIHZlcnNpb24gc3RyaW5nIGludG8gaXRzIGNvbXBvbmVudHMuICBcbiAgICAgKiBWZXJzaW9ucyBhcmUgc3RyaWN0bHkgb2YgdGhlIGZvcm1hdCBgeC55LnpgIChhcyBpbiBbc2VtdmVyXShodHRwOi8vc2VtdmVyLm9yZy8pKS5cbiAgICAgKiBWZXJzaW9ucyBtYXkgb3B0aW9uYWxseSBoYXZlIGEgcHJlcmVsZWFzZSB0YWcgaW4gdGhlIGZvcm1hdCBgeC55LnotYWxwaGFgLlxuICAgICAqIFJhbmdlcyBhcmUgYSBzdHJpY3Qgc3Vic2V0IG9mIFtucG0gcmFuZ2VzXShodHRwczovL2RvY3MubnBtanMuY29tL21pc2Mvc2VtdmVyI2FkdmFuY2VkLXJhbmdlLXN5bnRheCkuXG4gICAgICogT25seSB0aGUgZm9sbG93aW5nIHJhbmdlIHR5cGVzIGFyZSBzdXBwb3J0ZWQ6XG4gICAgICogLSBUaWxkZSByYW5nZXMgZS5nLiBgfjEuMi4zYFxuICAgICAqIC0gQ2FyZXQgcmFuZ2VzIGUuZy4gYF4xLjIuM2BcbiAgICAgKiAtIEV4YWN0IHZlcnNpb24gZS5nLiBgMS4yLjNgXG4gICAgICogLSBBbnkgdmVyc2lvbiBgKmBcbiAgICAgKiBAbWV0aG9kIHZlcnNpb25QYXJzZVxuICAgICAqIEBwYXJhbSByYW5nZSB7c3RyaW5nfSBUaGUgdmVyc2lvbiBzdHJpbmcuXG4gICAgICogQHJldHVybiB7b2JqZWN0fSBUaGUgdmVyc2lvbiByYW5nZSBwYXJzZWQgaW50byBpdHMgY29tcG9uZW50cy5cbiAgICAgKi9cbiAgICBQbHVnaW4udmVyc2lvblBhcnNlID0gZnVuY3Rpb24ocmFuZ2UpIHtcbiAgICAgICAgdmFyIHBhdHRlcm4gPSAvXlxcKnxbXFxefl0/XFxkK1xcLlxcZCtcXC5cXGQrKC1bMC05QS1aYS16LV0rKT8kLztcblxuICAgICAgICBpZiAoIXBhdHRlcm4udGVzdChyYW5nZSkpIHtcbiAgICAgICAgICAgIENvbW1vbi53YXJuKCdQbHVnaW4udmVyc2lvblBhcnNlOicsIHJhbmdlLCAnaXMgbm90IGEgdmFsaWQgdmVyc2lvbiBvciByYW5nZS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpZGVudGlmaWVycyA9IHJhbmdlLnNwbGl0KCctJyk7XG4gICAgICAgIHJhbmdlID0gaWRlbnRpZmllcnNbMF07XG5cbiAgICAgICAgdmFyIGlzUmFuZ2UgPSBpc05hTihOdW1iZXIocmFuZ2VbMF0pKSxcbiAgICAgICAgICAgIHZlcnNpb24gPSBpc1JhbmdlID8gcmFuZ2Uuc3Vic3RyKDEpIDogcmFuZ2UsXG4gICAgICAgICAgICBwYXJ0cyA9IENvbW1vbi5tYXAodmVyc2lvbi5zcGxpdCgnLicpLCBmdW5jdGlvbihwYXJ0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcihwYXJ0KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpc1JhbmdlOiBpc1JhbmdlLFxuICAgICAgICAgICAgdmVyc2lvbjogdmVyc2lvbixcbiAgICAgICAgICAgIHJhbmdlOiByYW5nZSxcbiAgICAgICAgICAgIG9wZXJhdG9yOiBpc1JhbmdlID8gcmFuZ2VbMF0gOiAnJyxcbiAgICAgICAgICAgIHBhcnRzOiBwYXJ0cyxcbiAgICAgICAgICAgIHByZXJlbGVhc2U6IGlkZW50aWZpZXJzWzFdLFxuICAgICAgICAgICAgbnVtYmVyOiBwYXJ0c1swXSAqIDFlOCArIHBhcnRzWzFdICogMWU0ICsgcGFydHNbMl1cbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgYHZlcnNpb25gIHNhdGlzZmllcyB0aGUgZ2l2ZW4gYHJhbmdlYC5cbiAgICAgKiBTZWUgZG9jdW1lbnRhdGlvbiBmb3IgYFBsdWdpbi52ZXJzaW9uUGFyc2VgIGZvciBhIGRlc2NyaXB0aW9uIG9mIHRoZSBmb3JtYXQuXG4gICAgICogSWYgYSB2ZXJzaW9uIG9yIHJhbmdlIGlzIG5vdCBzcGVjaWZpZWQsIHRoZW4gYW55IHZlcnNpb24gKGAqYCkgaXMgYXNzdW1lZCB0byBzYXRpc2Z5LlxuICAgICAqIEBtZXRob2QgdmVyc2lvblNhdGlzZmllc1xuICAgICAqIEBwYXJhbSB2ZXJzaW9uIHtzdHJpbmd9IFRoZSB2ZXJzaW9uIHN0cmluZy5cbiAgICAgKiBAcGFyYW0gcmFuZ2Uge3N0cmluZ30gVGhlIHJhbmdlIHN0cmluZy5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBgdHJ1ZWAgaWYgYHZlcnNpb25gIHNhdGlzZmllcyBgcmFuZ2VgLCBvdGhlcndpc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBQbHVnaW4udmVyc2lvblNhdGlzZmllcyA9IGZ1bmN0aW9uKHZlcnNpb24sIHJhbmdlKSB7XG4gICAgICAgIHJhbmdlID0gcmFuZ2UgfHwgJyonO1xuXG4gICAgICAgIHZhciByYW5nZVBhcnNlZCA9IFBsdWdpbi52ZXJzaW9uUGFyc2UocmFuZ2UpLFxuICAgICAgICAgICAgcmFuZ2VQYXJ0cyA9IHJhbmdlUGFyc2VkLnBhcnRzLFxuICAgICAgICAgICAgdmVyc2lvblBhcnNlZCA9IFBsdWdpbi52ZXJzaW9uUGFyc2UodmVyc2lvbiksXG4gICAgICAgICAgICB2ZXJzaW9uUGFydHMgPSB2ZXJzaW9uUGFyc2VkLnBhcnRzO1xuXG4gICAgICAgIGlmIChyYW5nZVBhcnNlZC5pc1JhbmdlKSB7XG4gICAgICAgICAgICBpZiAocmFuZ2VQYXJzZWQub3BlcmF0b3IgPT09ICcqJyB8fCB2ZXJzaW9uID09PSAnKicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJhbmdlUGFyc2VkLm9wZXJhdG9yID09PSAnficpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmVyc2lvblBhcnRzWzBdID09PSByYW5nZVBhcnRzWzBdICYmIHZlcnNpb25QYXJ0c1sxXSA9PT0gcmFuZ2VQYXJ0c1sxXSAmJiB2ZXJzaW9uUGFydHNbMl0gPj0gcmFuZ2VQYXJ0c1syXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJhbmdlUGFyc2VkLm9wZXJhdG9yID09PSAnXicpIHtcbiAgICAgICAgICAgICAgICBpZiAocmFuZ2VQYXJ0c1swXSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZlcnNpb25QYXJ0c1swXSA9PT0gcmFuZ2VQYXJ0c1swXSAmJiB2ZXJzaW9uUGFyc2VkLm51bWJlciA+PSByYW5nZVBhcnNlZC5udW1iZXI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJhbmdlUGFydHNbMV0gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2ZXJzaW9uUGFydHNbMV0gPT09IHJhbmdlUGFydHNbMV0gJiYgdmVyc2lvblBhcnRzWzJdID49IHJhbmdlUGFydHNbMl07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZlcnNpb25QYXJ0c1syXSA9PT0gcmFuZ2VQYXJ0c1syXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2ZXJzaW9uID09PSByYW5nZSB8fCB2ZXJzaW9uID09PSAnKic7XG4gICAgfTtcblxufSkoKTtcblxufSx7XCIuL0NvbW1vblwiOjE0fV0sMjE6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyLlJ1bm5lcmAgbW9kdWxlIGlzIGFuIG9wdGlvbmFsIHV0aWxpdHkgd2hpY2ggcHJvdmlkZXMgYSBnYW1lIGxvb3AsIFxuKiB0aGF0IGhhbmRsZXMgY29udGludW91c2x5IHVwZGF0aW5nIGEgYE1hdHRlci5FbmdpbmVgIGZvciB5b3Ugd2l0aGluIGEgYnJvd3Nlci5cbiogSXQgaXMgaW50ZW5kZWQgZm9yIGRldmVsb3BtZW50IGFuZCBkZWJ1Z2dpbmcgcHVycG9zZXMsIGJ1dCBtYXkgYWxzbyBiZSBzdWl0YWJsZSBmb3Igc2ltcGxlIGdhbWVzLlxuKiBJZiB5b3UgYXJlIHVzaW5nIHlvdXIgb3duIGdhbWUgbG9vcCBpbnN0ZWFkLCB0aGVuIHlvdSBkbyBub3QgbmVlZCB0aGUgYE1hdHRlci5SdW5uZXJgIG1vZHVsZS5cbiogSW5zdGVhZCBqdXN0IGNhbGwgYEVuZ2luZS51cGRhdGUoZW5naW5lLCBkZWx0YSlgIGluIHlvdXIgb3duIGxvb3AuXG4qXG4qIFNlZSB0aGUgaW5jbHVkZWQgdXNhZ2UgW2V4YW1wbGVzXShodHRwczovL2dpdGh1Yi5jb20vbGlhYnJ1L21hdHRlci1qcy90cmVlL21hc3Rlci9leGFtcGxlcykuXG4qXG4qIEBjbGFzcyBSdW5uZXJcbiovXG5cbnZhciBSdW5uZXIgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBSdW5uZXI7XG5cbnZhciBFdmVudHMgPSBfZGVyZXFfKCcuL0V2ZW50cycpO1xudmFyIEVuZ2luZSA9IF9kZXJlcV8oJy4vRW5naW5lJyk7XG52YXIgQ29tbW9uID0gX2RlcmVxXygnLi9Db21tb24nKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIF9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUsXG4gICAgICAgIF9jYW5jZWxBbmltYXRpb25GcmFtZTtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBfcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuICAgXG4gICAgICAgIF9jYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubW96Q2FuY2VsQW5pbWF0aW9uRnJhbWUgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubXNDYW5jZWxBbmltYXRpb25GcmFtZTtcbiAgICB9XG5cbiAgICBpZiAoIV9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcbiAgICAgICAgdmFyIF9mcmFtZVRpbWVvdXQ7XG5cbiAgICAgICAgX3JlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKXsgXG4gICAgICAgICAgICBfZnJhbWVUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHsgXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soQ29tbW9uLm5vdygpKTsgXG4gICAgICAgICAgICB9LCAxMDAwIC8gNjApO1xuICAgICAgICB9O1xuXG4gICAgICAgIF9jYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KF9mcmFtZVRpbWVvdXQpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgUnVubmVyLiBUaGUgb3B0aW9ucyBwYXJhbWV0ZXIgaXMgYW4gb2JqZWN0IHRoYXQgc3BlY2lmaWVzIGFueSBwcm9wZXJ0aWVzIHlvdSB3aXNoIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0cy5cbiAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAqIEBwYXJhbSB7fSBvcHRpb25zXG4gICAgICovXG4gICAgUnVubmVyLmNyZWF0ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgZnBzOiA2MCxcbiAgICAgICAgICAgIGNvcnJlY3Rpb246IDEsXG4gICAgICAgICAgICBkZWx0YVNhbXBsZVNpemU6IDYwLFxuICAgICAgICAgICAgY291bnRlclRpbWVzdGFtcDogMCxcbiAgICAgICAgICAgIGZyYW1lQ291bnRlcjogMCxcbiAgICAgICAgICAgIGRlbHRhSGlzdG9yeTogW10sXG4gICAgICAgICAgICB0aW1lUHJldjogbnVsbCxcbiAgICAgICAgICAgIHRpbWVTY2FsZVByZXY6IDEsXG4gICAgICAgICAgICBmcmFtZVJlcXVlc3RJZDogbnVsbCxcbiAgICAgICAgICAgIGlzRml4ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBydW5uZXIgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgICAgICBydW5uZXIuZGVsdGEgPSBydW5uZXIuZGVsdGEgfHwgMTAwMCAvIHJ1bm5lci5mcHM7XG4gICAgICAgIHJ1bm5lci5kZWx0YU1pbiA9IHJ1bm5lci5kZWx0YU1pbiB8fCAxMDAwIC8gcnVubmVyLmZwcztcbiAgICAgICAgcnVubmVyLmRlbHRhTWF4ID0gcnVubmVyLmRlbHRhTWF4IHx8IDEwMDAgLyAocnVubmVyLmZwcyAqIDAuNSk7XG4gICAgICAgIHJ1bm5lci5mcHMgPSAxMDAwIC8gcnVubmVyLmRlbHRhO1xuXG4gICAgICAgIHJldHVybiBydW5uZXI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbnRpbnVvdXNseSB0aWNrcyBhIGBNYXR0ZXIuRW5naW5lYCBieSBjYWxsaW5nIGBSdW5uZXIudGlja2Agb24gdGhlIGByZXF1ZXN0QW5pbWF0aW9uRnJhbWVgIGV2ZW50LlxuICAgICAqIEBtZXRob2QgcnVuXG4gICAgICogQHBhcmFtIHtlbmdpbmV9IGVuZ2luZVxuICAgICAqL1xuICAgIFJ1bm5lci5ydW4gPSBmdW5jdGlvbihydW5uZXIsIGVuZ2luZSkge1xuICAgICAgICAvLyBjcmVhdGUgcnVubmVyIGlmIGVuZ2luZSBpcyBmaXJzdCBhcmd1bWVudFxuICAgICAgICBpZiAodHlwZW9mIHJ1bm5lci5wb3NpdGlvbkl0ZXJhdGlvbnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBlbmdpbmUgPSBydW5uZXI7XG4gICAgICAgICAgICBydW5uZXIgPSBSdW5uZXIuY3JlYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAoZnVuY3Rpb24gcmVuZGVyKHRpbWUpe1xuICAgICAgICAgICAgcnVubmVyLmZyYW1lUmVxdWVzdElkID0gX3JlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXG4gICAgICAgICAgICBpZiAodGltZSAmJiBydW5uZXIuZW5hYmxlZCkge1xuICAgICAgICAgICAgICAgIFJ1bm5lci50aWNrKHJ1bm5lciwgZW5naW5lLCB0aW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcblxuICAgICAgICByZXR1cm4gcnVubmVyO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBIGdhbWUgbG9vcCB1dGlsaXR5IHRoYXQgdXBkYXRlcyB0aGUgZW5naW5lIGFuZCByZW5kZXJlciBieSBvbmUgc3RlcCAoYSAndGljaycpLlxuICAgICAqIEZlYXR1cmVzIGRlbHRhIHNtb290aGluZywgdGltZSBjb3JyZWN0aW9uIGFuZCBmaXhlZCBvciBkeW5hbWljIHRpbWluZy5cbiAgICAgKiBUcmlnZ2VycyBgYmVmb3JlVGlja2AsIGB0aWNrYCBhbmQgYGFmdGVyVGlja2AgZXZlbnRzIG9uIHRoZSBlbmdpbmUuXG4gICAgICogQ29uc2lkZXIganVzdCBgRW5naW5lLnVwZGF0ZShlbmdpbmUsIGRlbHRhKWAgaWYgeW91J3JlIHVzaW5nIHlvdXIgb3duIGxvb3AuXG4gICAgICogQG1ldGhvZCB0aWNrXG4gICAgICogQHBhcmFtIHtydW5uZXJ9IHJ1bm5lclxuICAgICAqIEBwYXJhbSB7ZW5naW5lfSBlbmdpbmVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZVxuICAgICAqL1xuICAgIFJ1bm5lci50aWNrID0gZnVuY3Rpb24ocnVubmVyLCBlbmdpbmUsIHRpbWUpIHtcbiAgICAgICAgdmFyIHRpbWluZyA9IGVuZ2luZS50aW1pbmcsXG4gICAgICAgICAgICBjb3JyZWN0aW9uID0gMSxcbiAgICAgICAgICAgIGRlbHRhO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBhbiBldmVudCBvYmplY3RcbiAgICAgICAgdmFyIGV2ZW50ID0ge1xuICAgICAgICAgICAgdGltZXN0YW1wOiB0aW1pbmcudGltZXN0YW1wXG4gICAgICAgIH07XG5cbiAgICAgICAgRXZlbnRzLnRyaWdnZXIocnVubmVyLCAnYmVmb3JlVGljaycsIGV2ZW50KTtcbiAgICAgICAgRXZlbnRzLnRyaWdnZXIoZW5naW5lLCAnYmVmb3JlVGljaycsIGV2ZW50KTsgLy8gQGRlcHJlY2F0ZWRcblxuICAgICAgICBpZiAocnVubmVyLmlzRml4ZWQpIHtcbiAgICAgICAgICAgIC8vIGZpeGVkIHRpbWVzdGVwXG4gICAgICAgICAgICBkZWx0YSA9IHJ1bm5lci5kZWx0YTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGR5bmFtaWMgdGltZXN0ZXAgYmFzZWQgb24gd2FsbCBjbG9jayBiZXR3ZWVuIGNhbGxzXG4gICAgICAgICAgICBkZWx0YSA9ICh0aW1lIC0gcnVubmVyLnRpbWVQcmV2KSB8fCBydW5uZXIuZGVsdGE7XG4gICAgICAgICAgICBydW5uZXIudGltZVByZXYgPSB0aW1lO1xuXG4gICAgICAgICAgICAvLyBvcHRpbWlzdGljYWxseSBmaWx0ZXIgZGVsdGEgb3ZlciBhIGZldyBmcmFtZXMsIHRvIGltcHJvdmUgc3RhYmlsaXR5XG4gICAgICAgICAgICBydW5uZXIuZGVsdGFIaXN0b3J5LnB1c2goZGVsdGEpO1xuICAgICAgICAgICAgcnVubmVyLmRlbHRhSGlzdG9yeSA9IHJ1bm5lci5kZWx0YUhpc3Rvcnkuc2xpY2UoLXJ1bm5lci5kZWx0YVNhbXBsZVNpemUpO1xuICAgICAgICAgICAgZGVsdGEgPSBNYXRoLm1pbi5hcHBseShudWxsLCBydW5uZXIuZGVsdGFIaXN0b3J5KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gbGltaXQgZGVsdGFcbiAgICAgICAgICAgIGRlbHRhID0gZGVsdGEgPCBydW5uZXIuZGVsdGFNaW4gPyBydW5uZXIuZGVsdGFNaW4gOiBkZWx0YTtcbiAgICAgICAgICAgIGRlbHRhID0gZGVsdGEgPiBydW5uZXIuZGVsdGFNYXggPyBydW5uZXIuZGVsdGFNYXggOiBkZWx0YTtcblxuICAgICAgICAgICAgLy8gY29ycmVjdGlvbiBmb3IgZGVsdGFcbiAgICAgICAgICAgIGNvcnJlY3Rpb24gPSBkZWx0YSAvIHJ1bm5lci5kZWx0YTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIGVuZ2luZSB0aW1pbmcgb2JqZWN0XG4gICAgICAgICAgICBydW5uZXIuZGVsdGEgPSBkZWx0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRpbWUgY29ycmVjdGlvbiBmb3IgdGltZSBzY2FsaW5nXG4gICAgICAgIGlmIChydW5uZXIudGltZVNjYWxlUHJldiAhPT0gMClcbiAgICAgICAgICAgIGNvcnJlY3Rpb24gKj0gdGltaW5nLnRpbWVTY2FsZSAvIHJ1bm5lci50aW1lU2NhbGVQcmV2O1xuXG4gICAgICAgIGlmICh0aW1pbmcudGltZVNjYWxlID09PSAwKVxuICAgICAgICAgICAgY29ycmVjdGlvbiA9IDA7XG5cbiAgICAgICAgcnVubmVyLnRpbWVTY2FsZVByZXYgPSB0aW1pbmcudGltZVNjYWxlO1xuICAgICAgICBydW5uZXIuY29ycmVjdGlvbiA9IGNvcnJlY3Rpb247XG5cbiAgICAgICAgLy8gZnBzIGNvdW50ZXJcbiAgICAgICAgcnVubmVyLmZyYW1lQ291bnRlciArPSAxO1xuICAgICAgICBpZiAodGltZSAtIHJ1bm5lci5jb3VudGVyVGltZXN0YW1wID49IDEwMDApIHtcbiAgICAgICAgICAgIHJ1bm5lci5mcHMgPSBydW5uZXIuZnJhbWVDb3VudGVyICogKCh0aW1lIC0gcnVubmVyLmNvdW50ZXJUaW1lc3RhbXApIC8gMTAwMCk7XG4gICAgICAgICAgICBydW5uZXIuY291bnRlclRpbWVzdGFtcCA9IHRpbWU7XG4gICAgICAgICAgICBydW5uZXIuZnJhbWVDb3VudGVyID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIEV2ZW50cy50cmlnZ2VyKHJ1bm5lciwgJ3RpY2snLCBldmVudCk7XG4gICAgICAgIEV2ZW50cy50cmlnZ2VyKGVuZ2luZSwgJ3RpY2snLCBldmVudCk7IC8vIEBkZXByZWNhdGVkXG5cbiAgICAgICAgLy8gaWYgd29ybGQgaGFzIGJlZW4gbW9kaWZpZWQsIGNsZWFyIHRoZSByZW5kZXIgc2NlbmUgZ3JhcGhcbiAgICAgICAgaWYgKGVuZ2luZS53b3JsZC5pc01vZGlmaWVkIFxuICAgICAgICAgICAgJiYgZW5naW5lLnJlbmRlclxuICAgICAgICAgICAgJiYgZW5naW5lLnJlbmRlci5jb250cm9sbGVyXG4gICAgICAgICAgICAmJiBlbmdpbmUucmVuZGVyLmNvbnRyb2xsZXIuY2xlYXIpIHtcbiAgICAgICAgICAgIGVuZ2luZS5yZW5kZXIuY29udHJvbGxlci5jbGVhcihlbmdpbmUucmVuZGVyKTsgLy8gQGRlcHJlY2F0ZWRcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZVxuICAgICAgICBFdmVudHMudHJpZ2dlcihydW5uZXIsICdiZWZvcmVVcGRhdGUnLCBldmVudCk7XG4gICAgICAgIEVuZ2luZS51cGRhdGUoZW5naW5lLCBkZWx0YSwgY29ycmVjdGlvbik7XG4gICAgICAgIEV2ZW50cy50cmlnZ2VyKHJ1bm5lciwgJ2FmdGVyVXBkYXRlJywgZXZlbnQpO1xuXG4gICAgICAgIC8vIHJlbmRlclxuICAgICAgICAvLyBAZGVwcmVjYXRlZFxuICAgICAgICBpZiAoZW5naW5lLnJlbmRlciAmJiBlbmdpbmUucmVuZGVyLmNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIEV2ZW50cy50cmlnZ2VyKHJ1bm5lciwgJ2JlZm9yZVJlbmRlcicsIGV2ZW50KTtcbiAgICAgICAgICAgIEV2ZW50cy50cmlnZ2VyKGVuZ2luZSwgJ2JlZm9yZVJlbmRlcicsIGV2ZW50KTsgLy8gQGRlcHJlY2F0ZWRcblxuICAgICAgICAgICAgZW5naW5lLnJlbmRlci5jb250cm9sbGVyLndvcmxkKGVuZ2luZS5yZW5kZXIpO1xuXG4gICAgICAgICAgICBFdmVudHMudHJpZ2dlcihydW5uZXIsICdhZnRlclJlbmRlcicsIGV2ZW50KTtcbiAgICAgICAgICAgIEV2ZW50cy50cmlnZ2VyKGVuZ2luZSwgJ2FmdGVyUmVuZGVyJywgZXZlbnQpOyAvLyBAZGVwcmVjYXRlZFxuICAgICAgICB9XG5cbiAgICAgICAgRXZlbnRzLnRyaWdnZXIocnVubmVyLCAnYWZ0ZXJUaWNrJywgZXZlbnQpO1xuICAgICAgICBFdmVudHMudHJpZ2dlcihlbmdpbmUsICdhZnRlclRpY2snLCBldmVudCk7IC8vIEBkZXByZWNhdGVkXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVuZHMgZXhlY3V0aW9uIG9mIGBSdW5uZXIucnVuYCBvbiB0aGUgZ2l2ZW4gYHJ1bm5lcmAsIGJ5IGNhbmNlbGluZyB0aGUgYW5pbWF0aW9uIGZyYW1lIHJlcXVlc3QgZXZlbnQgbG9vcC5cbiAgICAgKiBJZiB5b3Ugd2lzaCB0byBvbmx5IHRlbXBvcmFyaWx5IHBhdXNlIHRoZSBlbmdpbmUsIHNlZSBgZW5naW5lLmVuYWJsZWRgIGluc3RlYWQuXG4gICAgICogQG1ldGhvZCBzdG9wXG4gICAgICogQHBhcmFtIHtydW5uZXJ9IHJ1bm5lclxuICAgICAqL1xuICAgIFJ1bm5lci5zdG9wID0gZnVuY3Rpb24ocnVubmVyKSB7XG4gICAgICAgIF9jYW5jZWxBbmltYXRpb25GcmFtZShydW5uZXIuZnJhbWVSZXF1ZXN0SWQpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3IgYFJ1bm5lci5ydW5gLlxuICAgICAqIEBtZXRob2Qgc3RhcnRcbiAgICAgKiBAcGFyYW0ge3J1bm5lcn0gcnVubmVyXG4gICAgICogQHBhcmFtIHtlbmdpbmV9IGVuZ2luZVxuICAgICAqL1xuICAgIFJ1bm5lci5zdGFydCA9IGZ1bmN0aW9uKHJ1bm5lciwgZW5naW5lKSB7XG4gICAgICAgIFJ1bm5lci5ydW4ocnVubmVyLCBlbmdpbmUpO1xuICAgIH07XG5cbiAgICAvKlxuICAgICpcbiAgICAqICBFdmVudHMgRG9jdW1lbnRhdGlvblxuICAgICpcbiAgICAqL1xuXG4gICAgLyoqXG4gICAgKiBGaXJlZCBhdCB0aGUgc3RhcnQgb2YgYSB0aWNrLCBiZWZvcmUgYW55IHVwZGF0ZXMgdG8gdGhlIGVuZ2luZSBvciB0aW1pbmdcbiAgICAqXG4gICAgKiBAZXZlbnQgYmVmb3JlVGlja1xuICAgICogQHBhcmFtIHt9IGV2ZW50IEFuIGV2ZW50IG9iamVjdFxuICAgICogQHBhcmFtIHtudW1iZXJ9IGV2ZW50LnRpbWVzdGFtcCBUaGUgZW5naW5lLnRpbWluZy50aW1lc3RhbXAgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQuc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0IG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAgKi9cblxuICAgIC8qKlxuICAgICogRmlyZWQgYWZ0ZXIgZW5naW5lIHRpbWluZyB1cGRhdGVkLCBidXQganVzdCBiZWZvcmUgdXBkYXRlXG4gICAgKlxuICAgICogQGV2ZW50IHRpY2tcbiAgICAqIEBwYXJhbSB7fSBldmVudCBBbiBldmVudCBvYmplY3RcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBldmVudC50aW1lc3RhbXAgVGhlIGVuZ2luZS50aW1pbmcudGltZXN0YW1wIG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50LnNvdXJjZSBUaGUgc291cmNlIG9iamVjdCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5uYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudFxuICAgICovXG5cbiAgICAvKipcbiAgICAqIEZpcmVkIGF0IHRoZSBlbmQgb2YgYSB0aWNrLCBhZnRlciBlbmdpbmUgdXBkYXRlIGFuZCBhZnRlciByZW5kZXJpbmdcbiAgICAqXG4gICAgKiBAZXZlbnQgYWZ0ZXJUaWNrXG4gICAgKiBAcGFyYW0ge30gZXZlbnQgQW4gZXZlbnQgb2JqZWN0XG4gICAgKiBAcGFyYW0ge251bWJlcn0gZXZlbnQudGltZXN0YW1wIFRoZSBlbmdpbmUudGltaW5nLnRpbWVzdGFtcCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5zb3VyY2UgVGhlIHNvdXJjZSBvYmplY3Qgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQubmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcbiAgICAqL1xuXG4gICAgLyoqXG4gICAgKiBGaXJlZCBiZWZvcmUgdXBkYXRlXG4gICAgKlxuICAgICogQGV2ZW50IGJlZm9yZVVwZGF0ZVxuICAgICogQHBhcmFtIHt9IGV2ZW50IEFuIGV2ZW50IG9iamVjdFxuICAgICogQHBhcmFtIHtudW1iZXJ9IGV2ZW50LnRpbWVzdGFtcCBUaGUgZW5naW5lLnRpbWluZy50aW1lc3RhbXAgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQuc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0IG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAgKi9cblxuICAgIC8qKlxuICAgICogRmlyZWQgYWZ0ZXIgdXBkYXRlXG4gICAgKlxuICAgICogQGV2ZW50IGFmdGVyVXBkYXRlXG4gICAgKiBAcGFyYW0ge30gZXZlbnQgQW4gZXZlbnQgb2JqZWN0XG4gICAgKiBAcGFyYW0ge251bWJlcn0gZXZlbnQudGltZXN0YW1wIFRoZSBlbmdpbmUudGltaW5nLnRpbWVzdGFtcCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5zb3VyY2UgVGhlIHNvdXJjZSBvYmplY3Qgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQubmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcbiAgICAqL1xuXG4gICAgLyoqXG4gICAgKiBGaXJlZCBiZWZvcmUgcmVuZGVyaW5nXG4gICAgKlxuICAgICogQGV2ZW50IGJlZm9yZVJlbmRlclxuICAgICogQHBhcmFtIHt9IGV2ZW50IEFuIGV2ZW50IG9iamVjdFxuICAgICogQHBhcmFtIHtudW1iZXJ9IGV2ZW50LnRpbWVzdGFtcCBUaGUgZW5naW5lLnRpbWluZy50aW1lc3RhbXAgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQuc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0IG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAgKiBAZGVwcmVjYXRlZFxuICAgICovXG5cbiAgICAvKipcbiAgICAqIEZpcmVkIGFmdGVyIHJlbmRlcmluZ1xuICAgICpcbiAgICAqIEBldmVudCBhZnRlclJlbmRlclxuICAgICogQHBhcmFtIHt9IGV2ZW50IEFuIGV2ZW50IG9iamVjdFxuICAgICogQHBhcmFtIHtudW1iZXJ9IGV2ZW50LnRpbWVzdGFtcCBUaGUgZW5naW5lLnRpbWluZy50aW1lc3RhbXAgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQuc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0IG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAgKiBAZGVwcmVjYXRlZFxuICAgICovXG5cbiAgICAvKlxuICAgICpcbiAgICAqICBQcm9wZXJ0aWVzIERvY3VtZW50YXRpb25cbiAgICAqXG4gICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgZmxhZyB0aGF0IHNwZWNpZmllcyB3aGV0aGVyIHRoZSBydW5uZXIgaXMgcnVubmluZyBvciBub3QuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgZW5hYmxlZFxuICAgICAqIEB0eXBlIGJvb2xlYW5cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBCb29sZWFuYCB0aGF0IHNwZWNpZmllcyBpZiB0aGUgcnVubmVyIHNob3VsZCB1c2UgYSBmaXhlZCB0aW1lc3RlcCAob3RoZXJ3aXNlIGl0IGlzIHZhcmlhYmxlKS5cbiAgICAgKiBJZiB0aW1pbmcgaXMgZml4ZWQsIHRoZW4gdGhlIGFwcGFyZW50IHNpbXVsYXRpb24gc3BlZWQgd2lsbCBjaGFuZ2UgZGVwZW5kaW5nIG9uIHRoZSBmcmFtZSByYXRlIChidXQgYmVoYXZpb3VyIHdpbGwgYmUgZGV0ZXJtaW5pc3RpYykuXG4gICAgICogSWYgdGhlIHRpbWluZyBpcyB2YXJpYWJsZSwgdGhlbiB0aGUgYXBwYXJlbnQgc2ltdWxhdGlvbiBzcGVlZCB3aWxsIGJlIGNvbnN0YW50IChhcHByb3hpbWF0ZWx5LCBidXQgYXQgdGhlIGNvc3Qgb2YgZGV0ZXJtaW5pbmlzbSkuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgaXNGaXhlZFxuICAgICAqIEB0eXBlIGJvb2xlYW5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgTnVtYmVyYCB0aGF0IHNwZWNpZmllcyB0aGUgdGltZSBzdGVwIGJldHdlZW4gdXBkYXRlcyBpbiBtaWxsaXNlY29uZHMuXG4gICAgICogSWYgYGVuZ2luZS50aW1pbmcuaXNGaXhlZGAgaXMgc2V0IHRvIGB0cnVlYCwgdGhlbiBgZGVsdGFgIGlzIGZpeGVkLlxuICAgICAqIElmIGl0IGlzIGBmYWxzZWAsIHRoZW4gYGRlbHRhYCBjYW4gZHluYW1pY2FsbHkgY2hhbmdlIHRvIG1haW50YWluIHRoZSBjb3JyZWN0IGFwcGFyZW50IHNpbXVsYXRpb24gc3BlZWQuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgZGVsdGFcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKiBAZGVmYXVsdCAxMDAwIC8gNjBcbiAgICAgKi9cblxufSkoKTtcblxufSx7XCIuL0NvbW1vblwiOjE0LFwiLi9FbmdpbmVcIjoxNSxcIi4vRXZlbnRzXCI6MTZ9XSwyMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiogVGhlIGBNYXR0ZXIuU2xlZXBpbmdgIG1vZHVsZSBjb250YWlucyBtZXRob2RzIHRvIG1hbmFnZSB0aGUgc2xlZXBpbmcgc3RhdGUgb2YgYm9kaWVzLlxuKlxuKiBAY2xhc3MgU2xlZXBpbmdcbiovXG5cbnZhciBTbGVlcGluZyA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNsZWVwaW5nO1xuXG52YXIgRXZlbnRzID0gX2RlcmVxXygnLi9FdmVudHMnKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgU2xlZXBpbmcuX21vdGlvbldha2VUaHJlc2hvbGQgPSAwLjE4O1xuICAgIFNsZWVwaW5nLl9tb3Rpb25TbGVlcFRocmVzaG9sZCA9IDAuMDg7XG4gICAgU2xlZXBpbmcuX21pbkJpYXMgPSAwLjk7XG5cbiAgICAvKipcbiAgICAgKiBQdXRzIGJvZGllcyB0byBzbGVlcCBvciB3YWtlcyB0aGVtIHVwIGRlcGVuZGluZyBvbiB0aGVpciBtb3Rpb24uXG4gICAgICogQG1ldGhvZCB1cGRhdGVcbiAgICAgKiBAcGFyYW0ge2JvZHlbXX0gYm9kaWVzXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVTY2FsZVxuICAgICAqL1xuICAgIFNsZWVwaW5nLnVwZGF0ZSA9IGZ1bmN0aW9uKGJvZGllcywgdGltZVNjYWxlKSB7XG4gICAgICAgIHZhciB0aW1lRmFjdG9yID0gdGltZVNjYWxlICogdGltZVNjYWxlICogdGltZVNjYWxlO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBib2RpZXMgc2xlZXBpbmcgc3RhdHVzXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm9kaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYm9keSA9IGJvZGllc1tpXSxcbiAgICAgICAgICAgICAgICBtb3Rpb24gPSBib2R5LnNwZWVkICogYm9keS5zcGVlZCArIGJvZHkuYW5ndWxhclNwZWVkICogYm9keS5hbmd1bGFyU3BlZWQ7XG5cbiAgICAgICAgICAgIC8vIHdha2UgdXAgYm9kaWVzIGlmIHRoZXkgaGF2ZSBhIGZvcmNlIGFwcGxpZWRcbiAgICAgICAgICAgIGlmIChib2R5LmZvcmNlLnggIT09IDAgfHwgYm9keS5mb3JjZS55ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgU2xlZXBpbmcuc2V0KGJvZHksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG1pbk1vdGlvbiA9IE1hdGgubWluKGJvZHkubW90aW9uLCBtb3Rpb24pLFxuICAgICAgICAgICAgICAgIG1heE1vdGlvbiA9IE1hdGgubWF4KGJvZHkubW90aW9uLCBtb3Rpb24pO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIGJpYXNlZCBhdmVyYWdlIG1vdGlvbiBlc3RpbWF0aW9uIGJldHdlZW4gZnJhbWVzXG4gICAgICAgICAgICBib2R5Lm1vdGlvbiA9IFNsZWVwaW5nLl9taW5CaWFzICogbWluTW90aW9uICsgKDEgLSBTbGVlcGluZy5fbWluQmlhcykgKiBtYXhNb3Rpb247XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChib2R5LnNsZWVwVGhyZXNob2xkID4gMCAmJiBib2R5Lm1vdGlvbiA8IFNsZWVwaW5nLl9tb3Rpb25TbGVlcFRocmVzaG9sZCAqIHRpbWVGYWN0b3IpIHtcbiAgICAgICAgICAgICAgICBib2R5LnNsZWVwQ291bnRlciArPSAxO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChib2R5LnNsZWVwQ291bnRlciA+PSBib2R5LnNsZWVwVGhyZXNob2xkKVxuICAgICAgICAgICAgICAgICAgICBTbGVlcGluZy5zZXQoYm9keSwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGJvZHkuc2xlZXBDb3VudGVyID4gMCkge1xuICAgICAgICAgICAgICAgIGJvZHkuc2xlZXBDb3VudGVyIC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gYSBzZXQgb2YgY29sbGlkaW5nIHBhaXJzLCB3YWtlcyB0aGUgc2xlZXBpbmcgYm9kaWVzIGludm9sdmVkLlxuICAgICAqIEBtZXRob2QgYWZ0ZXJDb2xsaXNpb25zXG4gICAgICogQHBhcmFtIHtwYWlyW119IHBhaXJzXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVTY2FsZVxuICAgICAqL1xuICAgIFNsZWVwaW5nLmFmdGVyQ29sbGlzaW9ucyA9IGZ1bmN0aW9uKHBhaXJzLCB0aW1lU2NhbGUpIHtcbiAgICAgICAgdmFyIHRpbWVGYWN0b3IgPSB0aW1lU2NhbGUgKiB0aW1lU2NhbGUgKiB0aW1lU2NhbGU7XG5cbiAgICAgICAgLy8gd2FrZSB1cCBib2RpZXMgaW52b2x2ZWQgaW4gY29sbGlzaW9uc1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcGFpciA9IHBhaXJzW2ldO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBkb24ndCB3YWtlIGluYWN0aXZlIHBhaXJzXG4gICAgICAgICAgICBpZiAoIXBhaXIuaXNBY3RpdmUpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIHZhciBjb2xsaXNpb24gPSBwYWlyLmNvbGxpc2lvbixcbiAgICAgICAgICAgICAgICBib2R5QSA9IGNvbGxpc2lvbi5ib2R5QS5wYXJlbnQsIFxuICAgICAgICAgICAgICAgIGJvZHlCID0gY29sbGlzaW9uLmJvZHlCLnBhcmVudDtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBkb24ndCB3YWtlIGlmIGF0IGxlYXN0IG9uZSBib2R5IGlzIHN0YXRpY1xuICAgICAgICAgICAgaWYgKChib2R5QS5pc1NsZWVwaW5nICYmIGJvZHlCLmlzU2xlZXBpbmcpIHx8IGJvZHlBLmlzU3RhdGljIHx8IGJvZHlCLmlzU3RhdGljKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBcbiAgICAgICAgICAgIGlmIChib2R5QS5pc1NsZWVwaW5nIHx8IGJvZHlCLmlzU2xlZXBpbmcpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2xlZXBpbmdCb2R5ID0gKGJvZHlBLmlzU2xlZXBpbmcgJiYgIWJvZHlBLmlzU3RhdGljKSA/IGJvZHlBIDogYm9keUIsXG4gICAgICAgICAgICAgICAgICAgIG1vdmluZ0JvZHkgPSBzbGVlcGluZ0JvZHkgPT09IGJvZHlBID8gYm9keUIgOiBib2R5QTtcblxuICAgICAgICAgICAgICAgIGlmICghc2xlZXBpbmdCb2R5LmlzU3RhdGljICYmIG1vdmluZ0JvZHkubW90aW9uID4gU2xlZXBpbmcuX21vdGlvbldha2VUaHJlc2hvbGQgKiB0aW1lRmFjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIFNsZWVwaW5nLnNldChzbGVlcGluZ0JvZHksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICBcbiAgICAvKipcbiAgICAgKiBTZXQgYSBib2R5IGFzIHNsZWVwaW5nIG9yIGF3YWtlLlxuICAgICAqIEBtZXRob2Qgc2V0XG4gICAgICogQHBhcmFtIHtib2R5fSBib2R5XG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc1NsZWVwaW5nXG4gICAgICovXG4gICAgU2xlZXBpbmcuc2V0ID0gZnVuY3Rpb24oYm9keSwgaXNTbGVlcGluZykge1xuICAgICAgICB2YXIgd2FzU2xlZXBpbmcgPSBib2R5LmlzU2xlZXBpbmc7XG5cbiAgICAgICAgaWYgKGlzU2xlZXBpbmcpIHtcbiAgICAgICAgICAgIGJvZHkuaXNTbGVlcGluZyA9IHRydWU7XG4gICAgICAgICAgICBib2R5LnNsZWVwQ291bnRlciA9IGJvZHkuc2xlZXBUaHJlc2hvbGQ7XG5cbiAgICAgICAgICAgIGJvZHkucG9zaXRpb25JbXB1bHNlLnggPSAwO1xuICAgICAgICAgICAgYm9keS5wb3NpdGlvbkltcHVsc2UueSA9IDA7XG5cbiAgICAgICAgICAgIGJvZHkucG9zaXRpb25QcmV2LnggPSBib2R5LnBvc2l0aW9uLng7XG4gICAgICAgICAgICBib2R5LnBvc2l0aW9uUHJldi55ID0gYm9keS5wb3NpdGlvbi55O1xuXG4gICAgICAgICAgICBib2R5LmFuZ2xlUHJldiA9IGJvZHkuYW5nbGU7XG4gICAgICAgICAgICBib2R5LnNwZWVkID0gMDtcbiAgICAgICAgICAgIGJvZHkuYW5ndWxhclNwZWVkID0gMDtcbiAgICAgICAgICAgIGJvZHkubW90aW9uID0gMDtcblxuICAgICAgICAgICAgaWYgKCF3YXNTbGVlcGluZykge1xuICAgICAgICAgICAgICAgIEV2ZW50cy50cmlnZ2VyKGJvZHksICdzbGVlcFN0YXJ0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib2R5LmlzU2xlZXBpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGJvZHkuc2xlZXBDb3VudGVyID0gMDtcblxuICAgICAgICAgICAgaWYgKHdhc1NsZWVwaW5nKSB7XG4gICAgICAgICAgICAgICAgRXZlbnRzLnRyaWdnZXIoYm9keSwgJ3NsZWVwRW5kJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG59KSgpO1xuXG59LHtcIi4vRXZlbnRzXCI6MTZ9XSwyMzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiogVGhlIGBNYXR0ZXIuQm9kaWVzYCBtb2R1bGUgY29udGFpbnMgZmFjdG9yeSBtZXRob2RzIGZvciBjcmVhdGluZyByaWdpZCBib2R5IG1vZGVscyBcbiogd2l0aCBjb21tb25seSB1c2VkIGJvZHkgY29uZmlndXJhdGlvbnMgKHN1Y2ggYXMgcmVjdGFuZ2xlcywgY2lyY2xlcyBhbmQgb3RoZXIgcG9seWdvbnMpLlxuKlxuKiBTZWUgdGhlIGluY2x1ZGVkIHVzYWdlIFtleGFtcGxlc10oaHR0cHM6Ly9naXRodWIuY29tL2xpYWJydS9tYXR0ZXItanMvdHJlZS9tYXN0ZXIvZXhhbXBsZXMpLlxuKlxuKiBAY2xhc3MgQm9kaWVzXG4qL1xuXG4vLyBUT0RPOiB0cnVlIGNpcmNsZSBib2RpZXNcblxudmFyIEJvZGllcyA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJvZGllcztcblxudmFyIFZlcnRpY2VzID0gX2RlcmVxXygnLi4vZ2VvbWV0cnkvVmVydGljZXMnKTtcbnZhciBDb21tb24gPSBfZGVyZXFfKCcuLi9jb3JlL0NvbW1vbicpO1xudmFyIEJvZHkgPSBfZGVyZXFfKCcuLi9ib2R5L0JvZHknKTtcbnZhciBCb3VuZHMgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9Cb3VuZHMnKTtcbnZhciBWZWN0b3IgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9WZWN0b3InKTtcbnZhciBkZWNvbXA7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgcmlnaWQgYm9keSBtb2RlbCB3aXRoIGEgcmVjdGFuZ2xlIGh1bGwuIFxuICAgICAqIFRoZSBvcHRpb25zIHBhcmFtZXRlciBpcyBhbiBvYmplY3QgdGhhdCBzcGVjaWZpZXMgYW55IHByb3BlcnRpZXMgeW91IHdpc2ggdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHRzLlxuICAgICAqIFNlZSB0aGUgcHJvcGVydGllcyBzZWN0aW9uIG9mIHRoZSBgTWF0dGVyLkJvZHlgIG1vZHVsZSBmb3IgZGV0YWlsZWQgaW5mb3JtYXRpb24gb24gd2hhdCB5b3UgY2FuIHBhc3MgdmlhIHRoZSBgb3B0aW9uc2Agb2JqZWN0LlxuICAgICAqIEBtZXRob2QgcmVjdGFuZ2xlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gICAgICogQHJldHVybiB7Ym9keX0gQSBuZXcgcmVjdGFuZ2xlIGJvZHlcbiAgICAgKi9cbiAgICBCb2RpZXMucmVjdGFuZ2xlID0gZnVuY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodCwgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICB2YXIgcmVjdGFuZ2xlID0geyBcbiAgICAgICAgICAgIGxhYmVsOiAnUmVjdGFuZ2xlIEJvZHknLFxuICAgICAgICAgICAgcG9zaXRpb246IHsgeDogeCwgeTogeSB9LFxuICAgICAgICAgICAgdmVydGljZXM6IFZlcnRpY2VzLmZyb21QYXRoKCdMIDAgMCBMICcgKyB3aWR0aCArICcgMCBMICcgKyB3aWR0aCArICcgJyArIGhlaWdodCArICcgTCAwICcgKyBoZWlnaHQpXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuY2hhbWZlcikge1xuICAgICAgICAgICAgdmFyIGNoYW1mZXIgPSBvcHRpb25zLmNoYW1mZXI7XG4gICAgICAgICAgICByZWN0YW5nbGUudmVydGljZXMgPSBWZXJ0aWNlcy5jaGFtZmVyKHJlY3RhbmdsZS52ZXJ0aWNlcywgY2hhbWZlci5yYWRpdXMsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbWZlci5xdWFsaXR5LCBjaGFtZmVyLnF1YWxpdHlNaW4sIGNoYW1mZXIucXVhbGl0eU1heCk7XG4gICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5jaGFtZmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEJvZHkuY3JlYXRlKENvbW1vbi5leHRlbmQoe30sIHJlY3RhbmdsZSwgb3B0aW9ucykpO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyByaWdpZCBib2R5IG1vZGVsIHdpdGggYSB0cmFwZXpvaWQgaHVsbC4gXG4gICAgICogVGhlIG9wdGlvbnMgcGFyYW1ldGVyIGlzIGFuIG9iamVjdCB0aGF0IHNwZWNpZmllcyBhbnkgcHJvcGVydGllcyB5b3Ugd2lzaCB0byBvdmVycmlkZSB0aGUgZGVmYXVsdHMuXG4gICAgICogU2VlIHRoZSBwcm9wZXJ0aWVzIHNlY3Rpb24gb2YgdGhlIGBNYXR0ZXIuQm9keWAgbW9kdWxlIGZvciBkZXRhaWxlZCBpbmZvcm1hdGlvbiBvbiB3aGF0IHlvdSBjYW4gcGFzcyB2aWEgdGhlIGBvcHRpb25zYCBvYmplY3QuXG4gICAgICogQG1ldGhvZCB0cmFwZXpvaWRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzbG9wZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICAgKiBAcmV0dXJuIHtib2R5fSBBIG5ldyB0cmFwZXpvaWQgYm9keVxuICAgICAqL1xuICAgIEJvZGllcy50cmFwZXpvaWQgPSBmdW5jdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0LCBzbG9wZSwgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICBzbG9wZSAqPSAwLjU7XG4gICAgICAgIHZhciByb29mID0gKDEgLSAoc2xvcGUgKiAyKSkgKiB3aWR0aDtcbiAgICAgICAgXG4gICAgICAgIHZhciB4MSA9IHdpZHRoICogc2xvcGUsXG4gICAgICAgICAgICB4MiA9IHgxICsgcm9vZixcbiAgICAgICAgICAgIHgzID0geDIgKyB4MSxcbiAgICAgICAgICAgIHZlcnRpY2VzUGF0aDtcblxuICAgICAgICBpZiAoc2xvcGUgPCAwLjUpIHtcbiAgICAgICAgICAgIHZlcnRpY2VzUGF0aCA9ICdMIDAgMCBMICcgKyB4MSArICcgJyArICgtaGVpZ2h0KSArICcgTCAnICsgeDIgKyAnICcgKyAoLWhlaWdodCkgKyAnIEwgJyArIHgzICsgJyAwJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZlcnRpY2VzUGF0aCA9ICdMIDAgMCBMICcgKyB4MiArICcgJyArICgtaGVpZ2h0KSArICcgTCAnICsgeDMgKyAnIDAnO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRyYXBlem9pZCA9IHsgXG4gICAgICAgICAgICBsYWJlbDogJ1RyYXBlem9pZCBCb2R5JyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7IHg6IHgsIHk6IHkgfSxcbiAgICAgICAgICAgIHZlcnRpY2VzOiBWZXJ0aWNlcy5mcm9tUGF0aCh2ZXJ0aWNlc1BhdGgpXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuY2hhbWZlcikge1xuICAgICAgICAgICAgdmFyIGNoYW1mZXIgPSBvcHRpb25zLmNoYW1mZXI7XG4gICAgICAgICAgICB0cmFwZXpvaWQudmVydGljZXMgPSBWZXJ0aWNlcy5jaGFtZmVyKHRyYXBlem9pZC52ZXJ0aWNlcywgY2hhbWZlci5yYWRpdXMsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbWZlci5xdWFsaXR5LCBjaGFtZmVyLnF1YWxpdHlNaW4sIGNoYW1mZXIucXVhbGl0eU1heCk7XG4gICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5jaGFtZmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEJvZHkuY3JlYXRlKENvbW1vbi5leHRlbmQoe30sIHRyYXBlem9pZCwgb3B0aW9ucykpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHJpZ2lkIGJvZHkgbW9kZWwgd2l0aCBhIGNpcmNsZSBodWxsLiBcbiAgICAgKiBUaGUgb3B0aW9ucyBwYXJhbWV0ZXIgaXMgYW4gb2JqZWN0IHRoYXQgc3BlY2lmaWVzIGFueSBwcm9wZXJ0aWVzIHlvdSB3aXNoIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0cy5cbiAgICAgKiBTZWUgdGhlIHByb3BlcnRpZXMgc2VjdGlvbiBvZiB0aGUgYE1hdHRlci5Cb2R5YCBtb2R1bGUgZm9yIGRldGFpbGVkIGluZm9ybWF0aW9uIG9uIHdoYXQgeW91IGNhbiBwYXNzIHZpYSB0aGUgYG9wdGlvbnNgIG9iamVjdC5cbiAgICAgKiBAbWV0aG9kIGNpcmNsZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbWF4U2lkZXNdXG4gICAgICogQHJldHVybiB7Ym9keX0gQSBuZXcgY2lyY2xlIGJvZHlcbiAgICAgKi9cbiAgICBCb2RpZXMuY2lyY2xlID0gZnVuY3Rpb24oeCwgeSwgcmFkaXVzLCBvcHRpb25zLCBtYXhTaWRlcykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICB2YXIgY2lyY2xlID0ge1xuICAgICAgICAgICAgbGFiZWw6ICdDaXJjbGUgQm9keScsXG4gICAgICAgICAgICBjaXJjbGVSYWRpdXM6IHJhZGl1c1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLy8gYXBwcm94aW1hdGUgY2lyY2xlcyB3aXRoIHBvbHlnb25zIHVudGlsIHRydWUgY2lyY2xlcyBpbXBsZW1lbnRlZCBpbiBTQVRcbiAgICAgICAgbWF4U2lkZXMgPSBtYXhTaWRlcyB8fCAyNTtcbiAgICAgICAgdmFyIHNpZGVzID0gTWF0aC5jZWlsKE1hdGgubWF4KDEwLCBNYXRoLm1pbihtYXhTaWRlcywgcmFkaXVzKSkpO1xuXG4gICAgICAgIC8vIG9wdGltaXNhdGlvbjogYWx3YXlzIHVzZSBldmVuIG51bWJlciBvZiBzaWRlcyAoaGFsZiB0aGUgbnVtYmVyIG9mIHVuaXF1ZSBheGVzKVxuICAgICAgICBpZiAoc2lkZXMgJSAyID09PSAxKVxuICAgICAgICAgICAgc2lkZXMgKz0gMTtcblxuICAgICAgICByZXR1cm4gQm9kaWVzLnBvbHlnb24oeCwgeSwgc2lkZXMsIHJhZGl1cywgQ29tbW9uLmV4dGVuZCh7fSwgY2lyY2xlLCBvcHRpb25zKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgcmlnaWQgYm9keSBtb2RlbCB3aXRoIGEgcmVndWxhciBwb2x5Z29uIGh1bGwgd2l0aCB0aGUgZ2l2ZW4gbnVtYmVyIG9mIHNpZGVzLiBcbiAgICAgKiBUaGUgb3B0aW9ucyBwYXJhbWV0ZXIgaXMgYW4gb2JqZWN0IHRoYXQgc3BlY2lmaWVzIGFueSBwcm9wZXJ0aWVzIHlvdSB3aXNoIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0cy5cbiAgICAgKiBTZWUgdGhlIHByb3BlcnRpZXMgc2VjdGlvbiBvZiB0aGUgYE1hdHRlci5Cb2R5YCBtb2R1bGUgZm9yIGRldGFpbGVkIGluZm9ybWF0aW9uIG9uIHdoYXQgeW91IGNhbiBwYXNzIHZpYSB0aGUgYG9wdGlvbnNgIG9iamVjdC5cbiAgICAgKiBAbWV0aG9kIHBvbHlnb25cbiAgICAgKiBAcGFyYW0ge251bWJlcn0geFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNpZGVzXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICAgKiBAcmV0dXJuIHtib2R5fSBBIG5ldyByZWd1bGFyIHBvbHlnb24gYm9keVxuICAgICAqL1xuICAgIEJvZGllcy5wb2x5Z29uID0gZnVuY3Rpb24oeCwgeSwgc2lkZXMsIHJhZGl1cywgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICBpZiAoc2lkZXMgPCAzKVxuICAgICAgICAgICAgcmV0dXJuIEJvZGllcy5jaXJjbGUoeCwgeSwgcmFkaXVzLCBvcHRpb25zKTtcblxuICAgICAgICB2YXIgdGhldGEgPSAyICogTWF0aC5QSSAvIHNpZGVzLFxuICAgICAgICAgICAgcGF0aCA9ICcnLFxuICAgICAgICAgICAgb2Zmc2V0ID0gdGhldGEgKiAwLjU7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWRlczsgaSArPSAxKSB7XG4gICAgICAgICAgICB2YXIgYW5nbGUgPSBvZmZzZXQgKyAoaSAqIHRoZXRhKSxcbiAgICAgICAgICAgICAgICB4eCA9IE1hdGguY29zKGFuZ2xlKSAqIHJhZGl1cyxcbiAgICAgICAgICAgICAgICB5eSA9IE1hdGguc2luKGFuZ2xlKSAqIHJhZGl1cztcblxuICAgICAgICAgICAgcGF0aCArPSAnTCAnICsgeHgudG9GaXhlZCgzKSArICcgJyArIHl5LnRvRml4ZWQoMykgKyAnICc7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcG9seWdvbiA9IHsgXG4gICAgICAgICAgICBsYWJlbDogJ1BvbHlnb24gQm9keScsXG4gICAgICAgICAgICBwb3NpdGlvbjogeyB4OiB4LCB5OiB5IH0sXG4gICAgICAgICAgICB2ZXJ0aWNlczogVmVydGljZXMuZnJvbVBhdGgocGF0aClcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAob3B0aW9ucy5jaGFtZmVyKSB7XG4gICAgICAgICAgICB2YXIgY2hhbWZlciA9IG9wdGlvbnMuY2hhbWZlcjtcbiAgICAgICAgICAgIHBvbHlnb24udmVydGljZXMgPSBWZXJ0aWNlcy5jaGFtZmVyKHBvbHlnb24udmVydGljZXMsIGNoYW1mZXIucmFkaXVzLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW1mZXIucXVhbGl0eSwgY2hhbWZlci5xdWFsaXR5TWluLCBjaGFtZmVyLnF1YWxpdHlNYXgpO1xuICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuY2hhbWZlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBCb2R5LmNyZWF0ZShDb21tb24uZXh0ZW5kKHt9LCBwb2x5Z29uLCBvcHRpb25zKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBib2R5IHVzaW5nIHRoZSBzdXBwbGllZCB2ZXJ0aWNlcyAob3IgYW4gYXJyYXkgY29udGFpbmluZyBtdWx0aXBsZSBzZXRzIG9mIHZlcnRpY2VzKS5cbiAgICAgKiBJZiB0aGUgdmVydGljZXMgYXJlIGNvbnZleCwgdGhleSB3aWxsIHBhc3MgdGhyb3VnaCBhcyBzdXBwbGllZC5cbiAgICAgKiBPdGhlcndpc2UgaWYgdGhlIHZlcnRpY2VzIGFyZSBjb25jYXZlLCB0aGV5IHdpbGwgYmUgZGVjb21wb3NlZCBpZiBbcG9seS1kZWNvbXAuanNdKGh0dHBzOi8vZ2l0aHViLmNvbS9zY2h0ZXBwZS9wb2x5LWRlY29tcC5qcykgaXMgYXZhaWxhYmxlLlxuICAgICAqIE5vdGUgdGhhdCB0aGlzIHByb2Nlc3MgaXMgbm90IGd1YXJhbnRlZWQgdG8gc3VwcG9ydCBjb21wbGV4IHNldHMgb2YgdmVydGljZXMgKGUuZy4gdGhvc2Ugd2l0aCBob2xlcyBtYXkgZmFpbCkuXG4gICAgICogQnkgZGVmYXVsdCB0aGUgZGVjb21wb3NpdGlvbiB3aWxsIGRpc2NhcmQgY29sbGluZWFyIGVkZ2VzICh0byBpbXByb3ZlIHBlcmZvcm1hbmNlKS5cbiAgICAgKiBJdCBjYW4gYWxzbyBvcHRpb25hbGx5IGRpc2NhcmQgYW55IHBhcnRzIHRoYXQgaGF2ZSBhbiBhcmVhIGxlc3MgdGhhbiBgbWluaW11bUFyZWFgLlxuICAgICAqIElmIHRoZSB2ZXJ0aWNlcyBjYW4gbm90IGJlIGRlY29tcG9zZWQsIHRoZSByZXN1bHQgd2lsbCBmYWxsIGJhY2sgdG8gdXNpbmcgdGhlIGNvbnZleCBodWxsLlxuICAgICAqIFRoZSBvcHRpb25zIHBhcmFtZXRlciBpcyBhbiBvYmplY3QgdGhhdCBzcGVjaWZpZXMgYW55IGBNYXR0ZXIuQm9keWAgcHJvcGVydGllcyB5b3Ugd2lzaCB0byBvdmVycmlkZSB0aGUgZGVmYXVsdHMuXG4gICAgICogU2VlIHRoZSBwcm9wZXJ0aWVzIHNlY3Rpb24gb2YgdGhlIGBNYXR0ZXIuQm9keWAgbW9kdWxlIGZvciBkZXRhaWxlZCBpbmZvcm1hdGlvbiBvbiB3aGF0IHlvdSBjYW4gcGFzcyB2aWEgdGhlIGBvcHRpb25zYCBvYmplY3QuXG4gICAgICogQG1ldGhvZCBmcm9tVmVydGljZXNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XG4gICAgICogQHBhcmFtIFtbdmVjdG9yXV0gdmVydGV4U2V0c1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICAgKiBAcGFyYW0ge2Jvb2x9IFtmbGFnSW50ZXJuYWw9ZmFsc2VdXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtyZW1vdmVDb2xsaW5lYXI9MC4wMV1cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW21pbmltdW1BcmVhPTEwXVxuICAgICAqIEByZXR1cm4ge2JvZHl9XG4gICAgICovXG4gICAgQm9kaWVzLmZyb21WZXJ0aWNlcyA9IGZ1bmN0aW9uKHgsIHksIHZlcnRleFNldHMsIG9wdGlvbnMsIGZsYWdJbnRlcm5hbCwgcmVtb3ZlQ29sbGluZWFyLCBtaW5pbXVtQXJlYSkge1xuICAgICAgICBpZiAoIWRlY29tcCkge1xuICAgICAgICAgICAgZGVjb21wID0gQ29tbW9uLl9yZXF1aXJlR2xvYmFsKCdkZWNvbXAnLCAncG9seS1kZWNvbXAnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBib2R5LFxuICAgICAgICAgICAgcGFydHMsXG4gICAgICAgICAgICBpc0NvbnZleCxcbiAgICAgICAgICAgIHZlcnRpY2VzLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIGosXG4gICAgICAgICAgICBrLFxuICAgICAgICAgICAgdixcbiAgICAgICAgICAgIHo7XG5cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHBhcnRzID0gW107XG5cbiAgICAgICAgZmxhZ0ludGVybmFsID0gdHlwZW9mIGZsYWdJbnRlcm5hbCAhPT0gJ3VuZGVmaW5lZCcgPyBmbGFnSW50ZXJuYWwgOiBmYWxzZTtcbiAgICAgICAgcmVtb3ZlQ29sbGluZWFyID0gdHlwZW9mIHJlbW92ZUNvbGxpbmVhciAhPT0gJ3VuZGVmaW5lZCcgPyByZW1vdmVDb2xsaW5lYXIgOiAwLjAxO1xuICAgICAgICBtaW5pbXVtQXJlYSA9IHR5cGVvZiBtaW5pbXVtQXJlYSAhPT0gJ3VuZGVmaW5lZCcgPyBtaW5pbXVtQXJlYSA6IDEwO1xuXG4gICAgICAgIGlmICghZGVjb21wKSB7XG4gICAgICAgICAgICBDb21tb24ud2FybignQm9kaWVzLmZyb21WZXJ0aWNlczogcG9seS1kZWNvbXAuanMgcmVxdWlyZWQuIENvdWxkIG5vdCBkZWNvbXBvc2UgdmVydGljZXMuIEZhbGxiYWNrIHRvIGNvbnZleCBodWxsLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZW5zdXJlIHZlcnRleFNldHMgaXMgYW4gYXJyYXkgb2YgYXJyYXlzXG4gICAgICAgIGlmICghQ29tbW9uLmlzQXJyYXkodmVydGV4U2V0c1swXSkpIHtcbiAgICAgICAgICAgIHZlcnRleFNldHMgPSBbdmVydGV4U2V0c107XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHYgPSAwOyB2IDwgdmVydGV4U2V0cy5sZW5ndGg7IHYgKz0gMSkge1xuICAgICAgICAgICAgdmVydGljZXMgPSB2ZXJ0ZXhTZXRzW3ZdO1xuICAgICAgICAgICAgaXNDb252ZXggPSBWZXJ0aWNlcy5pc0NvbnZleCh2ZXJ0aWNlcyk7XG5cbiAgICAgICAgICAgIGlmIChpc0NvbnZleCB8fCAhZGVjb21wKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzQ29udmV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2VzID0gVmVydGljZXMuY2xvY2t3aXNlU29ydCh2ZXJ0aWNlcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZmFsbGJhY2sgdG8gY29udmV4IGh1bGwgd2hlbiBkZWNvbXBvc2l0aW9uIGlzIG5vdCBwb3NzaWJsZVxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNlcyA9IFZlcnRpY2VzLmh1bGwodmVydGljZXMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHBhcnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogeyB4OiB4LCB5OiB5IH0sXG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2VzOiB2ZXJ0aWNlc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBpbml0aWFsaXNlIGEgZGVjb21wb3NpdGlvblxuICAgICAgICAgICAgICAgIHZhciBjb25jYXZlID0gdmVydGljZXMubWFwKGZ1bmN0aW9uKHZlcnRleCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW3ZlcnRleC54LCB2ZXJ0ZXgueV07XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyB2ZXJ0aWNlcyBhcmUgY29uY2F2ZSBhbmQgc2ltcGxlLCB3ZSBjYW4gZGVjb21wb3NlIGludG8gcGFydHNcbiAgICAgICAgICAgICAgICBkZWNvbXAubWFrZUNDVyhjb25jYXZlKTtcbiAgICAgICAgICAgICAgICBpZiAocmVtb3ZlQ29sbGluZWFyICE9PSBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgZGVjb21wLnJlbW92ZUNvbGxpbmVhclBvaW50cyhjb25jYXZlLCByZW1vdmVDb2xsaW5lYXIpO1xuXG4gICAgICAgICAgICAgICAgLy8gdXNlIHRoZSBxdWljayBkZWNvbXBvc2l0aW9uIGFsZ29yaXRobSAoQmF5YXppdClcbiAgICAgICAgICAgICAgICB2YXIgZGVjb21wb3NlZCA9IGRlY29tcC5xdWlja0RlY29tcChjb25jYXZlKTtcblxuICAgICAgICAgICAgICAgIC8vIGZvciBlYWNoIGRlY29tcG9zZWQgY2h1bmtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZGVjb21wb3NlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2h1bmsgPSBkZWNvbXBvc2VkW2ldO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgdmVydGljZXMgaW50byB0aGUgY29ycmVjdCBzdHJ1Y3R1cmVcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNodW5rVmVydGljZXMgPSBjaHVuay5tYXAoZnVuY3Rpb24odmVydGljZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogdmVydGljZXNbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogdmVydGljZXNbMV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNraXAgc21hbGwgY2h1bmtzXG4gICAgICAgICAgICAgICAgICAgIGlmIChtaW5pbXVtQXJlYSA+IDAgJiYgVmVydGljZXMuYXJlYShjaHVua1ZlcnRpY2VzKSA8IG1pbmltdW1BcmVhKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIGEgY29tcG91bmQgcGFydFxuICAgICAgICAgICAgICAgICAgICBwYXJ0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBWZXJ0aWNlcy5jZW50cmUoY2h1bmtWZXJ0aWNlcyksXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNlczogY2h1bmtWZXJ0aWNlc1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGUgYm9keSBwYXJ0c1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBhcnRzW2ldID0gQm9keS5jcmVhdGUoQ29tbW9uLmV4dGVuZChwYXJ0c1tpXSwgb3B0aW9ucykpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmxhZyBpbnRlcm5hbCBlZGdlcyAoY29pbmNpZGVudCBwYXJ0IGVkZ2VzKVxuICAgICAgICBpZiAoZmxhZ0ludGVybmFsKSB7XG4gICAgICAgICAgICB2YXIgY29pbmNpZGVudF9tYXhfZGlzdCA9IDU7XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBwYXJ0QSA9IHBhcnRzW2ldO1xuXG4gICAgICAgICAgICAgICAgZm9yIChqID0gaSArIDE7IGogPCBwYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFydEIgPSBwYXJ0c1tqXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoQm91bmRzLm92ZXJsYXBzKHBhcnRBLmJvdW5kcywgcGFydEIuYm91bmRzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhdiA9IHBhcnRBLnZlcnRpY2VzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBidiA9IHBhcnRCLnZlcnRpY2VzO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpdGVyYXRlIHZlcnRpY2VzIG9mIGJvdGggcGFydHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoayA9IDA7IGsgPCBwYXJ0QS52ZXJ0aWNlcy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoeiA9IDA7IHogPCBwYXJ0Qi52ZXJ0aWNlcy5sZW5ndGg7IHorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmaW5kIGRpc3RhbmNlcyBiZXR3ZWVuIHRoZSB2ZXJ0aWNlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGEgPSBWZWN0b3IubWFnbml0dWRlU3F1YXJlZChWZWN0b3Iuc3ViKHBhdlsoayArIDEpICUgcGF2Lmxlbmd0aF0sIHBidlt6XSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGIgPSBWZWN0b3IubWFnbml0dWRlU3F1YXJlZChWZWN0b3Iuc3ViKHBhdltrXSwgcGJ2Wyh6ICsgMSkgJSBwYnYubGVuZ3RoXSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGJvdGggdmVydGljZXMgYXJlIHZlcnkgY2xvc2UsIGNvbnNpZGVyIHRoZSBlZGdlIGNvbmNpZGVudCAoaW50ZXJuYWwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYSA8IGNvaW5jaWRlbnRfbWF4X2Rpc3QgJiYgZGIgPCBjb2luY2lkZW50X21heF9kaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXZba10uaXNJbnRlcm5hbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYnZbel0uaXNJbnRlcm5hbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgdGhlIHBhcmVudCBib2R5IHRvIGJlIHJldHVybmVkLCB0aGF0IGNvbnRhaW5zIGdlbmVyYXRlZCBjb21wb3VuZCBwYXJ0c1xuICAgICAgICAgICAgYm9keSA9IEJvZHkuY3JlYXRlKENvbW1vbi5leHRlbmQoeyBwYXJ0czogcGFydHMuc2xpY2UoMCkgfSwgb3B0aW9ucykpO1xuICAgICAgICAgICAgQm9keS5zZXRQb3NpdGlvbihib2R5LCB7IHg6IHgsIHk6IHkgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnRzWzBdO1xuICAgICAgICB9XG4gICAgfTtcblxufSkoKTtcblxufSx7XCIuLi9ib2R5L0JvZHlcIjoxLFwiLi4vY29yZS9Db21tb25cIjoxNCxcIi4uL2dlb21ldHJ5L0JvdW5kc1wiOjI2LFwiLi4vZ2VvbWV0cnkvVmVjdG9yXCI6MjgsXCIuLi9nZW9tZXRyeS9WZXJ0aWNlc1wiOjI5fV0sMjQ6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyLkNvbXBvc2l0ZXNgIG1vZHVsZSBjb250YWlucyBmYWN0b3J5IG1ldGhvZHMgZm9yIGNyZWF0aW5nIGNvbXBvc2l0ZSBib2RpZXNcbiogd2l0aCBjb21tb25seSB1c2VkIGNvbmZpZ3VyYXRpb25zIChzdWNoIGFzIHN0YWNrcyBhbmQgY2hhaW5zKS5cbipcbiogU2VlIHRoZSBpbmNsdWRlZCB1c2FnZSBbZXhhbXBsZXNdKGh0dHBzOi8vZ2l0aHViLmNvbS9saWFicnUvbWF0dGVyLWpzL3RyZWUvbWFzdGVyL2V4YW1wbGVzKS5cbipcbiogQGNsYXNzIENvbXBvc2l0ZXNcbiovXG5cbnZhciBDb21wb3NpdGVzID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9zaXRlcztcblxudmFyIENvbXBvc2l0ZSA9IF9kZXJlcV8oJy4uL2JvZHkvQ29tcG9zaXRlJyk7XG52YXIgQ29uc3RyYWludCA9IF9kZXJlcV8oJy4uL2NvbnN0cmFpbnQvQ29uc3RyYWludCcpO1xudmFyIENvbW1vbiA9IF9kZXJlcV8oJy4uL2NvcmUvQ29tbW9uJyk7XG52YXIgQm9keSA9IF9kZXJlcV8oJy4uL2JvZHkvQm9keScpO1xudmFyIEJvZGllcyA9IF9kZXJlcV8oJy4vQm9kaWVzJyk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBjb21wb3NpdGUgY29udGFpbmluZyBib2RpZXMgY3JlYXRlZCBpbiB0aGUgY2FsbGJhY2sgaW4gYSBncmlkIGFycmFuZ2VtZW50LlxuICAgICAqIFRoaXMgZnVuY3Rpb24gdXNlcyB0aGUgYm9keSdzIGJvdW5kcyB0byBwcmV2ZW50IG92ZXJsYXBzLlxuICAgICAqIEBtZXRob2Qgc3RhY2tcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geHhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY29sdW1uc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByb3dzXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNvbHVtbkdhcFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByb3dHYXBcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEByZXR1cm4ge2NvbXBvc2l0ZX0gQSBuZXcgY29tcG9zaXRlIGNvbnRhaW5pbmcgb2JqZWN0cyBjcmVhdGVkIGluIHRoZSBjYWxsYmFja1xuICAgICAqL1xuICAgIENvbXBvc2l0ZXMuc3RhY2sgPSBmdW5jdGlvbih4eCwgeXksIGNvbHVtbnMsIHJvd3MsIGNvbHVtbkdhcCwgcm93R2FwLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgc3RhY2sgPSBDb21wb3NpdGUuY3JlYXRlKHsgbGFiZWw6ICdTdGFjaycgfSksXG4gICAgICAgICAgICB4ID0geHgsXG4gICAgICAgICAgICB5ID0geXksXG4gICAgICAgICAgICBsYXN0Qm9keSxcbiAgICAgICAgICAgIGkgPSAwO1xuXG4gICAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IHJvd3M7IHJvdysrKSB7XG4gICAgICAgICAgICB2YXIgbWF4SGVpZ2h0ID0gMDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yICh2YXIgY29sdW1uID0gMDsgY29sdW1uIDwgY29sdW1uczsgY29sdW1uKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgYm9keSA9IGNhbGxiYWNrKHgsIHksIGNvbHVtbiwgcm93LCBsYXN0Qm9keSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChib2R5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBib2R5SGVpZ2h0ID0gYm9keS5ib3VuZHMubWF4LnkgLSBib2R5LmJvdW5kcy5taW4ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHlXaWR0aCA9IGJvZHkuYm91bmRzLm1heC54IC0gYm9keS5ib3VuZHMubWluLng7IFxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChib2R5SGVpZ2h0ID4gbWF4SGVpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0ID0gYm9keUhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIEJvZHkudHJhbnNsYXRlKGJvZHksIHsgeDogYm9keVdpZHRoICogMC41LCB5OiBib2R5SGVpZ2h0ICogMC41IH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHggPSBib2R5LmJvdW5kcy5tYXgueCArIGNvbHVtbkdhcDtcblxuICAgICAgICAgICAgICAgICAgICBDb21wb3NpdGUuYWRkQm9keShzdGFjaywgYm9keSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsYXN0Qm9keSA9IGJvZHk7XG4gICAgICAgICAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB4ICs9IGNvbHVtbkdhcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHkgKz0gbWF4SGVpZ2h0ICsgcm93R2FwO1xuICAgICAgICAgICAgeCA9IHh4O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0YWNrO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogQ2hhaW5zIGFsbCBib2RpZXMgaW4gdGhlIGdpdmVuIGNvbXBvc2l0ZSB0b2dldGhlciB1c2luZyBjb25zdHJhaW50cy5cbiAgICAgKiBAbWV0aG9kIGNoYWluXG4gICAgICogQHBhcmFtIHtjb21wb3NpdGV9IGNvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4T2Zmc2V0QVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5T2Zmc2V0QVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4T2Zmc2V0QlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5T2Zmc2V0QlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gICAgICogQHJldHVybiB7Y29tcG9zaXRlfSBBIG5ldyBjb21wb3NpdGUgY29udGFpbmluZyBvYmplY3RzIGNoYWluZWQgdG9nZXRoZXIgd2l0aCBjb25zdHJhaW50c1xuICAgICAqL1xuICAgIENvbXBvc2l0ZXMuY2hhaW4gPSBmdW5jdGlvbihjb21wb3NpdGUsIHhPZmZzZXRBLCB5T2Zmc2V0QSwgeE9mZnNldEIsIHlPZmZzZXRCLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBib2RpZXMgPSBjb21wb3NpdGUuYm9kaWVzO1xuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBib2R5QSA9IGJvZGllc1tpIC0gMV0sXG4gICAgICAgICAgICAgICAgYm9keUIgPSBib2RpZXNbaV0sXG4gICAgICAgICAgICAgICAgYm9keUFIZWlnaHQgPSBib2R5QS5ib3VuZHMubWF4LnkgLSBib2R5QS5ib3VuZHMubWluLnksXG4gICAgICAgICAgICAgICAgYm9keUFXaWR0aCA9IGJvZHlBLmJvdW5kcy5tYXgueCAtIGJvZHlBLmJvdW5kcy5taW4ueCwgXG4gICAgICAgICAgICAgICAgYm9keUJIZWlnaHQgPSBib2R5Qi5ib3VuZHMubWF4LnkgLSBib2R5Qi5ib3VuZHMubWluLnksXG4gICAgICAgICAgICAgICAgYm9keUJXaWR0aCA9IGJvZHlCLmJvdW5kcy5tYXgueCAtIGJvZHlCLmJvdW5kcy5taW4ueDtcbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICAgICAgYm9keUE6IGJvZHlBLFxuICAgICAgICAgICAgICAgIHBvaW50QTogeyB4OiBib2R5QVdpZHRoICogeE9mZnNldEEsIHk6IGJvZHlBSGVpZ2h0ICogeU9mZnNldEEgfSxcbiAgICAgICAgICAgICAgICBib2R5QjogYm9keUIsXG4gICAgICAgICAgICAgICAgcG9pbnRCOiB7IHg6IGJvZHlCV2lkdGggKiB4T2Zmc2V0QiwgeTogYm9keUJIZWlnaHQgKiB5T2Zmc2V0QiB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgY29uc3RyYWludCA9IENvbW1vbi5leHRlbmQoZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgICAgICBcbiAgICAgICAgICAgIENvbXBvc2l0ZS5hZGRDb25zdHJhaW50KGNvbXBvc2l0ZSwgQ29uc3RyYWludC5jcmVhdGUoY29uc3RyYWludCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29tcG9zaXRlLmxhYmVsICs9ICcgQ2hhaW4nO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNvbXBvc2l0ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29ubmVjdHMgYm9kaWVzIGluIHRoZSBjb21wb3NpdGUgd2l0aCBjb25zdHJhaW50cyBpbiBhIGdyaWQgcGF0dGVybiwgd2l0aCBvcHRpb25hbCBjcm9zcyBicmFjZXMuXG4gICAgICogQG1ldGhvZCBtZXNoXG4gICAgICogQHBhcmFtIHtjb21wb3NpdGV9IGNvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb2x1bW5zXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJvd3NcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNyb3NzQnJhY2VcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge2NvbXBvc2l0ZX0gVGhlIGNvbXBvc2l0ZSBjb250YWluaW5nIG9iamVjdHMgbWVzaGVkIHRvZ2V0aGVyIHdpdGggY29uc3RyYWludHNcbiAgICAgKi9cbiAgICBDb21wb3NpdGVzLm1lc2ggPSBmdW5jdGlvbihjb21wb3NpdGUsIGNvbHVtbnMsIHJvd3MsIGNyb3NzQnJhY2UsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGJvZGllcyA9IGNvbXBvc2l0ZS5ib2RpZXMsXG4gICAgICAgICAgICByb3csXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBib2R5QSxcbiAgICAgICAgICAgIGJvZHlCLFxuICAgICAgICAgICAgYm9keUM7XG4gICAgICAgIFxuICAgICAgICBmb3IgKHJvdyA9IDA7IHJvdyA8IHJvd3M7IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKGNvbCA9IDE7IGNvbCA8IGNvbHVtbnM7IGNvbCsrKSB7XG4gICAgICAgICAgICAgICAgYm9keUEgPSBib2RpZXNbKGNvbCAtIDEpICsgKHJvdyAqIGNvbHVtbnMpXTtcbiAgICAgICAgICAgICAgICBib2R5QiA9IGJvZGllc1tjb2wgKyAocm93ICogY29sdW1ucyldO1xuICAgICAgICAgICAgICAgIENvbXBvc2l0ZS5hZGRDb25zdHJhaW50KGNvbXBvc2l0ZSwgQ29uc3RyYWludC5jcmVhdGUoQ29tbW9uLmV4dGVuZCh7IGJvZHlBOiBib2R5QSwgYm9keUI6IGJvZHlCIH0sIG9wdGlvbnMpKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyb3cgPiAwKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb2wgPSAwOyBjb2wgPCBjb2x1bW5zOyBjb2wrKykge1xuICAgICAgICAgICAgICAgICAgICBib2R5QSA9IGJvZGllc1tjb2wgKyAoKHJvdyAtIDEpICogY29sdW1ucyldO1xuICAgICAgICAgICAgICAgICAgICBib2R5QiA9IGJvZGllc1tjb2wgKyAocm93ICogY29sdW1ucyldO1xuICAgICAgICAgICAgICAgICAgICBDb21wb3NpdGUuYWRkQ29uc3RyYWludChjb21wb3NpdGUsIENvbnN0cmFpbnQuY3JlYXRlKENvbW1vbi5leHRlbmQoeyBib2R5QTogYm9keUEsIGJvZHlCOiBib2R5QiB9LCBvcHRpb25zKSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjcm9zc0JyYWNlICYmIGNvbCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHlDID0gYm9kaWVzWyhjb2wgLSAxKSArICgocm93IC0gMSkgKiBjb2x1bW5zKV07XG4gICAgICAgICAgICAgICAgICAgICAgICBDb21wb3NpdGUuYWRkQ29uc3RyYWludChjb21wb3NpdGUsIENvbnN0cmFpbnQuY3JlYXRlKENvbW1vbi5leHRlbmQoeyBib2R5QTogYm9keUMsIGJvZHlCOiBib2R5QiB9LCBvcHRpb25zKSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNyb3NzQnJhY2UgJiYgY29sIDwgY29sdW1ucyAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHlDID0gYm9kaWVzWyhjb2wgKyAxKSArICgocm93IC0gMSkgKiBjb2x1bW5zKV07XG4gICAgICAgICAgICAgICAgICAgICAgICBDb21wb3NpdGUuYWRkQ29uc3RyYWludChjb21wb3NpdGUsIENvbnN0cmFpbnQuY3JlYXRlKENvbW1vbi5leHRlbmQoeyBib2R5QTogYm9keUMsIGJvZHlCOiBib2R5QiB9LCBvcHRpb25zKSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29tcG9zaXRlLmxhYmVsICs9ICcgTWVzaCc7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY29tcG9zaXRlO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGNvbXBvc2l0ZSBjb250YWluaW5nIGJvZGllcyBjcmVhdGVkIGluIHRoZSBjYWxsYmFjayBpbiBhIHB5cmFtaWQgYXJyYW5nZW1lbnQuXG4gICAgICogVGhpcyBmdW5jdGlvbiB1c2VzIHRoZSBib2R5J3MgYm91bmRzIHRvIHByZXZlbnQgb3ZlcmxhcHMuXG4gICAgICogQG1ldGhvZCBweXJhbWlkXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHh4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHl5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNvbHVtbnNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcm93c1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb2x1bW5HYXBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcm93R2FwXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJuIHtjb21wb3NpdGV9IEEgbmV3IGNvbXBvc2l0ZSBjb250YWluaW5nIG9iamVjdHMgY3JlYXRlZCBpbiB0aGUgY2FsbGJhY2tcbiAgICAgKi9cbiAgICBDb21wb3NpdGVzLnB5cmFtaWQgPSBmdW5jdGlvbih4eCwgeXksIGNvbHVtbnMsIHJvd3MsIGNvbHVtbkdhcCwgcm93R2FwLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gQ29tcG9zaXRlcy5zdGFjayh4eCwgeXksIGNvbHVtbnMsIHJvd3MsIGNvbHVtbkdhcCwgcm93R2FwLCBmdW5jdGlvbih4LCB5LCBjb2x1bW4sIHJvdywgbGFzdEJvZHksIGkpIHtcbiAgICAgICAgICAgIHZhciBhY3R1YWxSb3dzID0gTWF0aC5taW4ocm93cywgTWF0aC5jZWlsKGNvbHVtbnMgLyAyKSksXG4gICAgICAgICAgICAgICAgbGFzdEJvZHlXaWR0aCA9IGxhc3RCb2R5ID8gbGFzdEJvZHkuYm91bmRzLm1heC54IC0gbGFzdEJvZHkuYm91bmRzLm1pbi54IDogMDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHJvdyA+IGFjdHVhbFJvd3MpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyByZXZlcnNlIHJvdyBvcmRlclxuICAgICAgICAgICAgcm93ID0gYWN0dWFsUm93cyAtIHJvdztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gcm93LFxuICAgICAgICAgICAgICAgIGVuZCA9IGNvbHVtbnMgLSAxIC0gcm93O1xuXG4gICAgICAgICAgICBpZiAoY29sdW1uIDwgc3RhcnQgfHwgY29sdW1uID4gZW5kKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gcmV0cm9hY3RpdmVseSBmaXggdGhlIGZpcnN0IGJvZHkncyBwb3NpdGlvbiwgc2luY2Ugd2lkdGggd2FzIHVua25vd25cbiAgICAgICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICAgICAgQm9keS50cmFuc2xhdGUobGFzdEJvZHksIHsgeDogKGNvbHVtbiArIChjb2x1bW5zICUgMiA9PT0gMSA/IDEgOiAtMSkpICogbGFzdEJvZHlXaWR0aCwgeTogMCB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHhPZmZzZXQgPSBsYXN0Qm9keSA/IGNvbHVtbiAqIGxhc3RCb2R5V2lkdGggOiAwO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soeHggKyB4T2Zmc2V0ICsgY29sdW1uICogY29sdW1uR2FwLCB5LCBjb2x1bW4sIHJvdywgbGFzdEJvZHksIGkpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGNvbXBvc2l0ZSB3aXRoIGEgTmV3dG9uJ3MgQ3JhZGxlIHNldHVwIG9mIGJvZGllcyBhbmQgY29uc3RyYWludHMuXG4gICAgICogQG1ldGhvZCBuZXd0b25zQ3JhZGxlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHh4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHl5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzaXplXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aFxuICAgICAqIEByZXR1cm4ge2NvbXBvc2l0ZX0gQSBuZXcgY29tcG9zaXRlIG5ld3RvbnNDcmFkbGUgYm9keVxuICAgICAqL1xuICAgIENvbXBvc2l0ZXMubmV3dG9uc0NyYWRsZSA9IGZ1bmN0aW9uKHh4LCB5eSwgbnVtYmVyLCBzaXplLCBsZW5ndGgpIHtcbiAgICAgICAgdmFyIG5ld3RvbnNDcmFkbGUgPSBDb21wb3NpdGUuY3JlYXRlKHsgbGFiZWw6ICdOZXd0b25zIENyYWRsZScgfSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXI7IGkrKykge1xuICAgICAgICAgICAgdmFyIHNlcGFyYXRpb24gPSAxLjksXG4gICAgICAgICAgICAgICAgY2lyY2xlID0gQm9kaWVzLmNpcmNsZSh4eCArIGkgKiAoc2l6ZSAqIHNlcGFyYXRpb24pLCB5eSArIGxlbmd0aCwgc2l6ZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBpbmVydGlhOiBJbmZpbml0eSwgcmVzdGl0dXRpb246IDEsIGZyaWN0aW9uOiAwLCBmcmljdGlvbkFpcjogMC4wMDAxLCBzbG9wOiAxIH0pLFxuICAgICAgICAgICAgICAgIGNvbnN0cmFpbnQgPSBDb25zdHJhaW50LmNyZWF0ZSh7IHBvaW50QTogeyB4OiB4eCArIGkgKiAoc2l6ZSAqIHNlcGFyYXRpb24pLCB5OiB5eSB9LCBib2R5QjogY2lyY2xlIH0pO1xuXG4gICAgICAgICAgICBDb21wb3NpdGUuYWRkQm9keShuZXd0b25zQ3JhZGxlLCBjaXJjbGUpO1xuICAgICAgICAgICAgQ29tcG9zaXRlLmFkZENvbnN0cmFpbnQobmV3dG9uc0NyYWRsZSwgY29uc3RyYWludCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3dG9uc0NyYWRsZTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBjb21wb3NpdGUgd2l0aCBzaW1wbGUgY2FyIHNldHVwIG9mIGJvZGllcyBhbmQgY29uc3RyYWludHMuXG4gICAgICogQG1ldGhvZCBjYXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geHhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdoZWVsU2l6ZVxuICAgICAqIEByZXR1cm4ge2NvbXBvc2l0ZX0gQSBuZXcgY29tcG9zaXRlIGNhciBib2R5XG4gICAgICovXG4gICAgQ29tcG9zaXRlcy5jYXIgPSBmdW5jdGlvbih4eCwgeXksIHdpZHRoLCBoZWlnaHQsIHdoZWVsU2l6ZSkge1xuICAgICAgICB2YXIgZ3JvdXAgPSBCb2R5Lm5leHRHcm91cCh0cnVlKSxcbiAgICAgICAgICAgIHdoZWVsQmFzZSA9IDIwLFxuICAgICAgICAgICAgd2hlZWxBT2Zmc2V0ID0gLXdpZHRoICogMC41ICsgd2hlZWxCYXNlLFxuICAgICAgICAgICAgd2hlZWxCT2Zmc2V0ID0gd2lkdGggKiAwLjUgLSB3aGVlbEJhc2UsXG4gICAgICAgICAgICB3aGVlbFlPZmZzZXQgPSAwO1xuICAgIFxuICAgICAgICB2YXIgY2FyID0gQ29tcG9zaXRlLmNyZWF0ZSh7IGxhYmVsOiAnQ2FyJyB9KSxcbiAgICAgICAgICAgIGJvZHkgPSBCb2RpZXMucmVjdGFuZ2xlKHh4LCB5eSwgd2lkdGgsIGhlaWdodCwgeyBcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25GaWx0ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IGdyb3VwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjaGFtZmVyOiB7XG4gICAgICAgICAgICAgICAgICAgIHJhZGl1czogaGVpZ2h0ICogMC41XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZW5zaXR5OiAwLjAwMDJcbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICB2YXIgd2hlZWxBID0gQm9kaWVzLmNpcmNsZSh4eCArIHdoZWVsQU9mZnNldCwgeXkgKyB3aGVlbFlPZmZzZXQsIHdoZWVsU2l6ZSwgeyBcbiAgICAgICAgICAgIGNvbGxpc2lvbkZpbHRlcjoge1xuICAgICAgICAgICAgICAgIGdyb3VwOiBncm91cFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZyaWN0aW9uOiAwLjhcbiAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB2YXIgd2hlZWxCID0gQm9kaWVzLmNpcmNsZSh4eCArIHdoZWVsQk9mZnNldCwgeXkgKyB3aGVlbFlPZmZzZXQsIHdoZWVsU2l6ZSwgeyBcbiAgICAgICAgICAgIGNvbGxpc2lvbkZpbHRlcjoge1xuICAgICAgICAgICAgICAgIGdyb3VwOiBncm91cFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZyaWN0aW9uOiAwLjhcbiAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB2YXIgYXhlbEEgPSBDb25zdHJhaW50LmNyZWF0ZSh7XG4gICAgICAgICAgICBib2R5QjogYm9keSxcbiAgICAgICAgICAgIHBvaW50QjogeyB4OiB3aGVlbEFPZmZzZXQsIHk6IHdoZWVsWU9mZnNldCB9LFxuICAgICAgICAgICAgYm9keUE6IHdoZWVsQSxcbiAgICAgICAgICAgIHN0aWZmbmVzczogMSxcbiAgICAgICAgICAgIGxlbmd0aDogMFxuICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB2YXIgYXhlbEIgPSBDb25zdHJhaW50LmNyZWF0ZSh7XG4gICAgICAgICAgICBib2R5QjogYm9keSxcbiAgICAgICAgICAgIHBvaW50QjogeyB4OiB3aGVlbEJPZmZzZXQsIHk6IHdoZWVsWU9mZnNldCB9LFxuICAgICAgICAgICAgYm9keUE6IHdoZWVsQixcbiAgICAgICAgICAgIHN0aWZmbmVzczogMSxcbiAgICAgICAgICAgIGxlbmd0aDogMFxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIENvbXBvc2l0ZS5hZGRCb2R5KGNhciwgYm9keSk7XG4gICAgICAgIENvbXBvc2l0ZS5hZGRCb2R5KGNhciwgd2hlZWxBKTtcbiAgICAgICAgQ29tcG9zaXRlLmFkZEJvZHkoY2FyLCB3aGVlbEIpO1xuICAgICAgICBDb21wb3NpdGUuYWRkQ29uc3RyYWludChjYXIsIGF4ZWxBKTtcbiAgICAgICAgQ29tcG9zaXRlLmFkZENvbnN0cmFpbnQoY2FyLCBheGVsQik7XG5cbiAgICAgICAgcmV0dXJuIGNhcjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHNpbXBsZSBzb2Z0IGJvZHkgbGlrZSBvYmplY3QuXG4gICAgICogQG1ldGhvZCBzb2Z0Qm9keVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4eFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5eVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb2x1bW5zXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJvd3NcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY29sdW1uR2FwXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJvd0dhcFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY3Jvc3NCcmFjZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwYXJ0aWNsZVJhZGl1c1xuICAgICAqIEBwYXJhbSB7fSBwYXJ0aWNsZU9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge30gY29uc3RyYWludE9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtjb21wb3NpdGV9IEEgbmV3IGNvbXBvc2l0ZSBzb2Z0Qm9keVxuICAgICAqL1xuICAgIENvbXBvc2l0ZXMuc29mdEJvZHkgPSBmdW5jdGlvbih4eCwgeXksIGNvbHVtbnMsIHJvd3MsIGNvbHVtbkdhcCwgcm93R2FwLCBjcm9zc0JyYWNlLCBwYXJ0aWNsZVJhZGl1cywgcGFydGljbGVPcHRpb25zLCBjb25zdHJhaW50T3B0aW9ucykge1xuICAgICAgICBwYXJ0aWNsZU9wdGlvbnMgPSBDb21tb24uZXh0ZW5kKHsgaW5lcnRpYTogSW5maW5pdHkgfSwgcGFydGljbGVPcHRpb25zKTtcbiAgICAgICAgY29uc3RyYWludE9wdGlvbnMgPSBDb21tb24uZXh0ZW5kKHsgc3RpZmZuZXNzOiAwLjIsIHJlbmRlcjogeyB0eXBlOiAnbGluZScsIGFuY2hvcnM6IGZhbHNlIH0gfSwgY29uc3RyYWludE9wdGlvbnMpO1xuXG4gICAgICAgIHZhciBzb2Z0Qm9keSA9IENvbXBvc2l0ZXMuc3RhY2soeHgsIHl5LCBjb2x1bW5zLCByb3dzLCBjb2x1bW5HYXAsIHJvd0dhcCwgZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICAgICAgcmV0dXJuIEJvZGllcy5jaXJjbGUoeCwgeSwgcGFydGljbGVSYWRpdXMsIHBhcnRpY2xlT3B0aW9ucyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIENvbXBvc2l0ZXMubWVzaChzb2Z0Qm9keSwgY29sdW1ucywgcm93cywgY3Jvc3NCcmFjZSwgY29uc3RyYWludE9wdGlvbnMpO1xuXG4gICAgICAgIHNvZnRCb2R5LmxhYmVsID0gJ1NvZnQgQm9keSc7XG5cbiAgICAgICAgcmV0dXJuIHNvZnRCb2R5O1xuICAgIH07XG5cbn0pKCk7XG5cbn0se1wiLi4vYm9keS9Cb2R5XCI6MSxcIi4uL2JvZHkvQ29tcG9zaXRlXCI6MixcIi4uL2NvbnN0cmFpbnQvQ29uc3RyYWludFwiOjEyLFwiLi4vY29yZS9Db21tb25cIjoxNCxcIi4vQm9kaWVzXCI6MjN9XSwyNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiogVGhlIGBNYXR0ZXIuQXhlc2AgbW9kdWxlIGNvbnRhaW5zIG1ldGhvZHMgZm9yIGNyZWF0aW5nIGFuZCBtYW5pcHVsYXRpbmcgc2V0cyBvZiBheGVzLlxuKlxuKiBAY2xhc3MgQXhlc1xuKi9cblxudmFyIEF4ZXMgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGVzO1xuXG52YXIgVmVjdG9yID0gX2RlcmVxXygnLi4vZ2VvbWV0cnkvVmVjdG9yJyk7XG52YXIgQ29tbW9uID0gX2RlcmVxXygnLi4vY29yZS9Db21tb24nKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBzZXQgb2YgYXhlcyBmcm9tIHRoZSBnaXZlbiB2ZXJ0aWNlcy5cbiAgICAgKiBAbWV0aG9kIGZyb21WZXJ0aWNlc1xuICAgICAqIEBwYXJhbSB7dmVydGljZXN9IHZlcnRpY2VzXG4gICAgICogQHJldHVybiB7YXhlc30gQSBuZXcgYXhlcyBmcm9tIHRoZSBnaXZlbiB2ZXJ0aWNlc1xuICAgICAqL1xuICAgIEF4ZXMuZnJvbVZlcnRpY2VzID0gZnVuY3Rpb24odmVydGljZXMpIHtcbiAgICAgICAgdmFyIGF4ZXMgPSB7fTtcblxuICAgICAgICAvLyBmaW5kIHRoZSB1bmlxdWUgYXhlcywgdXNpbmcgZWRnZSBub3JtYWwgZ3JhZGllbnRzXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmVydGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBqID0gKGkgKyAxKSAlIHZlcnRpY2VzLmxlbmd0aCwgXG4gICAgICAgICAgICAgICAgbm9ybWFsID0gVmVjdG9yLm5vcm1hbGlzZSh7IFxuICAgICAgICAgICAgICAgICAgICB4OiB2ZXJ0aWNlc1tqXS55IC0gdmVydGljZXNbaV0ueSwgXG4gICAgICAgICAgICAgICAgICAgIHk6IHZlcnRpY2VzW2ldLnggLSB2ZXJ0aWNlc1tqXS54XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgZ3JhZGllbnQgPSAobm9ybWFsLnkgPT09IDApID8gSW5maW5pdHkgOiAobm9ybWFsLnggLyBub3JtYWwueSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGxpbWl0IHByZWNpc2lvblxuICAgICAgICAgICAgZ3JhZGllbnQgPSBncmFkaWVudC50b0ZpeGVkKDMpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBheGVzW2dyYWRpZW50XSA9IG5vcm1hbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBDb21tb24udmFsdWVzKGF4ZXMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSb3RhdGVzIGEgc2V0IG9mIGF4ZXMgYnkgdGhlIGdpdmVuIGFuZ2xlLlxuICAgICAqIEBtZXRob2Qgcm90YXRlXG4gICAgICogQHBhcmFtIHtheGVzfSBheGVzXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlXG4gICAgICovXG4gICAgQXhlcy5yb3RhdGUgPSBmdW5jdGlvbihheGVzLCBhbmdsZSkge1xuICAgICAgICBpZiAoYW5nbGUgPT09IDApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIFxuICAgICAgICB2YXIgY29zID0gTWF0aC5jb3MoYW5nbGUpLFxuICAgICAgICAgICAgc2luID0gTWF0aC5zaW4oYW5nbGUpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXhlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGF4aXMgPSBheGVzW2ldLFxuICAgICAgICAgICAgICAgIHh4O1xuICAgICAgICAgICAgeHggPSBheGlzLnggKiBjb3MgLSBheGlzLnkgKiBzaW47XG4gICAgICAgICAgICBheGlzLnkgPSBheGlzLnggKiBzaW4gKyBheGlzLnkgKiBjb3M7XG4gICAgICAgICAgICBheGlzLnggPSB4eDtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pKCk7XG5cbn0se1wiLi4vY29yZS9Db21tb25cIjoxNCxcIi4uL2dlb21ldHJ5L1ZlY3RvclwiOjI4fV0sMjY6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyLkJvdW5kc2AgbW9kdWxlIGNvbnRhaW5zIG1ldGhvZHMgZm9yIGNyZWF0aW5nIGFuZCBtYW5pcHVsYXRpbmcgYXhpcy1hbGlnbmVkIGJvdW5kaW5nIGJveGVzIChBQUJCKS5cbipcbiogQGNsYXNzIEJvdW5kc1xuKi9cblxudmFyIEJvdW5kcyA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJvdW5kcztcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBheGlzLWFsaWduZWQgYm91bmRpbmcgYm94IChBQUJCKSBmb3IgdGhlIGdpdmVuIHZlcnRpY2VzLlxuICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICogQHBhcmFtIHt2ZXJ0aWNlc30gdmVydGljZXNcbiAgICAgKiBAcmV0dXJuIHtib3VuZHN9IEEgbmV3IGJvdW5kcyBvYmplY3RcbiAgICAgKi9cbiAgICBCb3VuZHMuY3JlYXRlID0gZnVuY3Rpb24odmVydGljZXMpIHtcbiAgICAgICAgdmFyIGJvdW5kcyA9IHsgXG4gICAgICAgICAgICBtaW46IHsgeDogMCwgeTogMCB9LCBcbiAgICAgICAgICAgIG1heDogeyB4OiAwLCB5OiAwIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodmVydGljZXMpXG4gICAgICAgICAgICBCb3VuZHMudXBkYXRlKGJvdW5kcywgdmVydGljZXMpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGJvdW5kcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBib3VuZHMgdXNpbmcgdGhlIGdpdmVuIHZlcnRpY2VzIGFuZCBleHRlbmRzIHRoZSBib3VuZHMgZ2l2ZW4gYSB2ZWxvY2l0eS5cbiAgICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgICAqIEBwYXJhbSB7Ym91bmRzfSBib3VuZHNcbiAgICAgKiBAcGFyYW0ge3ZlcnRpY2VzfSB2ZXJ0aWNlc1xuICAgICAqIEBwYXJhbSB7dmVjdG9yfSB2ZWxvY2l0eVxuICAgICAqL1xuICAgIEJvdW5kcy51cGRhdGUgPSBmdW5jdGlvbihib3VuZHMsIHZlcnRpY2VzLCB2ZWxvY2l0eSkge1xuICAgICAgICBib3VuZHMubWluLnggPSBJbmZpbml0eTtcbiAgICAgICAgYm91bmRzLm1heC54ID0gLUluZmluaXR5O1xuICAgICAgICBib3VuZHMubWluLnkgPSBJbmZpbml0eTtcbiAgICAgICAgYm91bmRzLm1heC55ID0gLUluZmluaXR5O1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmVydGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB2ZXJ0ZXggPSB2ZXJ0aWNlc1tpXTtcbiAgICAgICAgICAgIGlmICh2ZXJ0ZXgueCA+IGJvdW5kcy5tYXgueCkgYm91bmRzLm1heC54ID0gdmVydGV4Lng7XG4gICAgICAgICAgICBpZiAodmVydGV4LnggPCBib3VuZHMubWluLngpIGJvdW5kcy5taW4ueCA9IHZlcnRleC54O1xuICAgICAgICAgICAgaWYgKHZlcnRleC55ID4gYm91bmRzLm1heC55KSBib3VuZHMubWF4LnkgPSB2ZXJ0ZXgueTtcbiAgICAgICAgICAgIGlmICh2ZXJ0ZXgueSA8IGJvdW5kcy5taW4ueSkgYm91bmRzLm1pbi55ID0gdmVydGV4Lnk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh2ZWxvY2l0eSkge1xuICAgICAgICAgICAgaWYgKHZlbG9jaXR5LnggPiAwKSB7XG4gICAgICAgICAgICAgICAgYm91bmRzLm1heC54ICs9IHZlbG9jaXR5Lng7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJvdW5kcy5taW4ueCArPSB2ZWxvY2l0eS54O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodmVsb2NpdHkueSA+IDApIHtcbiAgICAgICAgICAgICAgICBib3VuZHMubWF4LnkgKz0gdmVsb2NpdHkueTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYm91bmRzLm1pbi55ICs9IHZlbG9jaXR5Lnk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBib3VuZHMgY29udGFpbnMgdGhlIGdpdmVuIHBvaW50LlxuICAgICAqIEBtZXRob2QgY29udGFpbnNcbiAgICAgKiBAcGFyYW0ge2JvdW5kc30gYm91bmRzXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHBvaW50XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgYm91bmRzIGNvbnRhaW4gdGhlIHBvaW50LCBvdGhlcndpc2UgZmFsc2VcbiAgICAgKi9cbiAgICBCb3VuZHMuY29udGFpbnMgPSBmdW5jdGlvbihib3VuZHMsIHBvaW50KSB7XG4gICAgICAgIHJldHVybiBwb2ludC54ID49IGJvdW5kcy5taW4ueCAmJiBwb2ludC54IDw9IGJvdW5kcy5tYXgueCBcbiAgICAgICAgICAgICAgICYmIHBvaW50LnkgPj0gYm91bmRzLm1pbi55ICYmIHBvaW50LnkgPD0gYm91bmRzLm1heC55O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHR3byBib3VuZHMgaW50ZXJzZWN0LlxuICAgICAqIEBtZXRob2Qgb3ZlcmxhcHNcbiAgICAgKiBAcGFyYW0ge2JvdW5kc30gYm91bmRzQVxuICAgICAqIEBwYXJhbSB7Ym91bmRzfSBib3VuZHNCXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgYm91bmRzIG92ZXJsYXAsIG90aGVyd2lzZSBmYWxzZVxuICAgICAqL1xuICAgIEJvdW5kcy5vdmVybGFwcyA9IGZ1bmN0aW9uKGJvdW5kc0EsIGJvdW5kc0IpIHtcbiAgICAgICAgcmV0dXJuIChib3VuZHNBLm1pbi54IDw9IGJvdW5kc0IubWF4LnggJiYgYm91bmRzQS5tYXgueCA+PSBib3VuZHNCLm1pbi54XG4gICAgICAgICAgICAgICAgJiYgYm91bmRzQS5tYXgueSA+PSBib3VuZHNCLm1pbi55ICYmIGJvdW5kc0EubWluLnkgPD0gYm91bmRzQi5tYXgueSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRyYW5zbGF0ZXMgdGhlIGJvdW5kcyBieSB0aGUgZ2l2ZW4gdmVjdG9yLlxuICAgICAqIEBtZXRob2QgdHJhbnNsYXRlXG4gICAgICogQHBhcmFtIHtib3VuZHN9IGJvdW5kc1xuICAgICAqIEBwYXJhbSB7dmVjdG9yfSB2ZWN0b3JcbiAgICAgKi9cbiAgICBCb3VuZHMudHJhbnNsYXRlID0gZnVuY3Rpb24oYm91bmRzLCB2ZWN0b3IpIHtcbiAgICAgICAgYm91bmRzLm1pbi54ICs9IHZlY3Rvci54O1xuICAgICAgICBib3VuZHMubWF4LnggKz0gdmVjdG9yLng7XG4gICAgICAgIGJvdW5kcy5taW4ueSArPSB2ZWN0b3IueTtcbiAgICAgICAgYm91bmRzLm1heC55ICs9IHZlY3Rvci55O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTaGlmdHMgdGhlIGJvdW5kcyB0byB0aGUgZ2l2ZW4gcG9zaXRpb24uXG4gICAgICogQG1ldGhvZCBzaGlmdFxuICAgICAqIEBwYXJhbSB7Ym91bmRzfSBib3VuZHNcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gcG9zaXRpb25cbiAgICAgKi9cbiAgICBCb3VuZHMuc2hpZnQgPSBmdW5jdGlvbihib3VuZHMsIHBvc2l0aW9uKSB7XG4gICAgICAgIHZhciBkZWx0YVggPSBib3VuZHMubWF4LnggLSBib3VuZHMubWluLngsXG4gICAgICAgICAgICBkZWx0YVkgPSBib3VuZHMubWF4LnkgLSBib3VuZHMubWluLnk7XG4gICAgICAgICAgICBcbiAgICAgICAgYm91bmRzLm1pbi54ID0gcG9zaXRpb24ueDtcbiAgICAgICAgYm91bmRzLm1heC54ID0gcG9zaXRpb24ueCArIGRlbHRhWDtcbiAgICAgICAgYm91bmRzLm1pbi55ID0gcG9zaXRpb24ueTtcbiAgICAgICAgYm91bmRzLm1heC55ID0gcG9zaXRpb24ueSArIGRlbHRhWTtcbiAgICB9O1xuICAgIFxufSkoKTtcblxufSx7fV0sMjc6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyLlN2Z2AgbW9kdWxlIGNvbnRhaW5zIG1ldGhvZHMgZm9yIGNvbnZlcnRpbmcgU1ZHIGltYWdlcyBpbnRvIGFuIGFycmF5IG9mIHZlY3RvciBwb2ludHMuXG4qXG4qIFRvIHVzZSB0aGlzIG1vZHVsZSB5b3UgYWxzbyBuZWVkIHRoZSBTVkdQYXRoU2VnIHBvbHlmaWxsOiBodHRwczovL2dpdGh1Yi5jb20vcHJvZ2Vycy9wYXRoc2VnXG4qXG4qIFNlZSB0aGUgaW5jbHVkZWQgdXNhZ2UgW2V4YW1wbGVzXShodHRwczovL2dpdGh1Yi5jb20vbGlhYnJ1L21hdHRlci1qcy90cmVlL21hc3Rlci9leGFtcGxlcykuXG4qXG4qIEBjbGFzcyBTdmdcbiovXG5cbnZhciBTdmcgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdmc7XG5cbnZhciBCb3VuZHMgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9Cb3VuZHMnKTtcbnZhciBDb21tb24gPSBfZGVyZXFfKCcuLi9jb3JlL0NvbW1vbicpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhbiBTVkcgcGF0aCBpbnRvIGFuIGFycmF5IG9mIHZlY3RvciBwb2ludHMuXG4gICAgICogSWYgdGhlIGlucHV0IHBhdGggZm9ybXMgYSBjb25jYXZlIHNoYXBlLCB5b3UgbXVzdCBkZWNvbXBvc2UgdGhlIHJlc3VsdCBpbnRvIGNvbnZleCBwYXJ0cyBiZWZvcmUgdXNlLlxuICAgICAqIFNlZSBgQm9kaWVzLmZyb21WZXJ0aWNlc2Agd2hpY2ggcHJvdmlkZXMgc3VwcG9ydCBmb3IgdGhpcy5cbiAgICAgKiBOb3RlIHRoYXQgdGhpcyBmdW5jdGlvbiBpcyBub3QgZ3VhcmFudGVlZCB0byBzdXBwb3J0IGNvbXBsZXggcGF0aHMgKHN1Y2ggYXMgdGhvc2Ugd2l0aCBob2xlcykuXG4gICAgICogWW91IG11c3QgbG9hZCB0aGUgYHBhdGhzZWcuanNgIHBvbHlmaWxsIG9uIG5ld2VyIGJyb3dzZXJzLlxuICAgICAqIEBtZXRob2QgcGF0aFRvVmVydGljZXNcbiAgICAgKiBAcGFyYW0ge1NWR1BhdGhFbGVtZW50fSBwYXRoXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtzYW1wbGVMZW5ndGg9MTVdXG4gICAgICogQHJldHVybiB7VmVjdG9yW119IHBvaW50c1xuICAgICAqL1xuICAgIFN2Zy5wYXRoVG9WZXJ0aWNlcyA9IGZ1bmN0aW9uKHBhdGgsIHNhbXBsZUxlbmd0aCkge1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgISgnU1ZHUGF0aFNlZycgaW4gd2luZG93KSkge1xuICAgICAgICAgICAgQ29tbW9uLndhcm4oJ1N2Zy5wYXRoVG9WZXJ0aWNlczogU1ZHUGF0aFNlZyBub3QgZGVmaW5lZCwgYSBwb2x5ZmlsbCBpcyByZXF1aXJlZC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS93b3V0L3N2Zy50b3BvbHkuanMvYmxvYi9tYXN0ZXIvc3ZnLnRvcG9seS5qc1xuICAgICAgICB2YXIgaSwgaWwsIHRvdGFsLCBwb2ludCwgc2VnbWVudCwgc2VnbWVudHMsIFxuICAgICAgICAgICAgc2VnbWVudHNRdWV1ZSwgbGFzdFNlZ21lbnQsIFxuICAgICAgICAgICAgbGFzdFBvaW50LCBzZWdtZW50SW5kZXgsIHBvaW50cyA9IFtdLFxuICAgICAgICAgICAgbHgsIGx5LCBsZW5ndGggPSAwLCB4ID0gMCwgeSA9IDA7XG5cbiAgICAgICAgc2FtcGxlTGVuZ3RoID0gc2FtcGxlTGVuZ3RoIHx8IDE1O1xuXG4gICAgICAgIHZhciBhZGRQb2ludCA9IGZ1bmN0aW9uKHB4LCBweSwgcGF0aFNlZ1R5cGUpIHtcbiAgICAgICAgICAgIC8vIGFsbCBvZGQtbnVtYmVyZWQgcGF0aCB0eXBlcyBhcmUgcmVsYXRpdmUgZXhjZXB0IFBBVEhTRUdfQ0xPU0VQQVRIICgxKVxuICAgICAgICAgICAgdmFyIGlzUmVsYXRpdmUgPSBwYXRoU2VnVHlwZSAlIDIgPT09IDEgJiYgcGF0aFNlZ1R5cGUgPiAxO1xuXG4gICAgICAgICAgICAvLyB3aGVuIHRoZSBsYXN0IHBvaW50IGRvZXNuJ3QgZXF1YWwgdGhlIGN1cnJlbnQgcG9pbnQgYWRkIHRoZSBjdXJyZW50IHBvaW50XG4gICAgICAgICAgICBpZiAoIWxhc3RQb2ludCB8fCBweCAhPSBsYXN0UG9pbnQueCB8fCBweSAhPSBsYXN0UG9pbnQueSkge1xuICAgICAgICAgICAgICAgIGlmIChsYXN0UG9pbnQgJiYgaXNSZWxhdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBseCA9IGxhc3RQb2ludC54O1xuICAgICAgICAgICAgICAgICAgICBseSA9IGxhc3RQb2ludC55O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGx4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbHkgPSAwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBwb2ludCA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogbHggKyBweCxcbiAgICAgICAgICAgICAgICAgICAgeTogbHkgKyBweVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgbGFzdCBwb2ludFxuICAgICAgICAgICAgICAgIGlmIChpc1JlbGF0aXZlIHx8ICFsYXN0UG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFBvaW50ID0gcG9pbnQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcG9pbnRzLnB1c2gocG9pbnQpO1xuXG4gICAgICAgICAgICAgICAgeCA9IGx4ICsgcHg7XG4gICAgICAgICAgICAgICAgeSA9IGx5ICsgcHk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGFkZFNlZ21lbnRQb2ludCA9IGZ1bmN0aW9uKHNlZ21lbnQpIHtcbiAgICAgICAgICAgIHZhciBzZWdUeXBlID0gc2VnbWVudC5wYXRoU2VnVHlwZUFzTGV0dGVyLnRvVXBwZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIC8vIHNraXAgcGF0aCBlbmRzXG4gICAgICAgICAgICBpZiAoc2VnVHlwZSA9PT0gJ1onKSBcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIC8vIG1hcCBzZWdtZW50IHRvIHggYW5kIHlcbiAgICAgICAgICAgIHN3aXRjaCAoc2VnVHlwZSkge1xuXG4gICAgICAgICAgICBjYXNlICdNJzpcbiAgICAgICAgICAgIGNhc2UgJ0wnOlxuICAgICAgICAgICAgY2FzZSAnVCc6XG4gICAgICAgICAgICBjYXNlICdDJzpcbiAgICAgICAgICAgIGNhc2UgJ1MnOlxuICAgICAgICAgICAgY2FzZSAnUSc6XG4gICAgICAgICAgICAgICAgeCA9IHNlZ21lbnQueDtcbiAgICAgICAgICAgICAgICB5ID0gc2VnbWVudC55O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnSCc6XG4gICAgICAgICAgICAgICAgeCA9IHNlZ21lbnQueDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1YnOlxuICAgICAgICAgICAgICAgIHkgPSBzZWdtZW50Lnk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFkZFBvaW50KHgsIHksIHNlZ21lbnQucGF0aFNlZ1R5cGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGVuc3VyZSBwYXRoIGlzIGFic29sdXRlXG4gICAgICAgIFN2Zy5fc3ZnUGF0aFRvQWJzb2x1dGUocGF0aCk7XG5cbiAgICAgICAgLy8gZ2V0IHRvdGFsIGxlbmd0aFxuICAgICAgICB0b3RhbCA9IHBhdGguZ2V0VG90YWxMZW5ndGgoKTtcblxuICAgICAgICAvLyBxdWV1ZSBzZWdtZW50c1xuICAgICAgICBzZWdtZW50cyA9IFtdO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGF0aC5wYXRoU2VnTGlzdC5udW1iZXJPZkl0ZW1zOyBpICs9IDEpXG4gICAgICAgICAgICBzZWdtZW50cy5wdXNoKHBhdGgucGF0aFNlZ0xpc3QuZ2V0SXRlbShpKSk7XG5cbiAgICAgICAgc2VnbWVudHNRdWV1ZSA9IHNlZ21lbnRzLmNvbmNhdCgpO1xuXG4gICAgICAgIC8vIHNhbXBsZSB0aHJvdWdoIHBhdGhcbiAgICAgICAgd2hpbGUgKGxlbmd0aCA8IHRvdGFsKSB7XG4gICAgICAgICAgICAvLyBnZXQgc2VnbWVudCBhdCBwb3NpdGlvblxuICAgICAgICAgICAgc2VnbWVudEluZGV4ID0gcGF0aC5nZXRQYXRoU2VnQXRMZW5ndGgobGVuZ3RoKTtcbiAgICAgICAgICAgIHNlZ21lbnQgPSBzZWdtZW50c1tzZWdtZW50SW5kZXhdO1xuXG4gICAgICAgICAgICAvLyBuZXcgc2VnbWVudFxuICAgICAgICAgICAgaWYgKHNlZ21lbnQgIT0gbGFzdFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoc2VnbWVudHNRdWV1ZS5sZW5ndGggJiYgc2VnbWVudHNRdWV1ZVswXSAhPSBzZWdtZW50KVxuICAgICAgICAgICAgICAgICAgICBhZGRTZWdtZW50UG9pbnQoc2VnbWVudHNRdWV1ZS5zaGlmdCgpKTtcblxuICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50ID0gc2VnbWVudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYWRkIHBvaW50cyBpbiBiZXR3ZWVuIHdoZW4gY3VydmluZ1xuICAgICAgICAgICAgLy8gVE9ETzogYWRhcHRpdmUgc2FtcGxpbmdcbiAgICAgICAgICAgIHN3aXRjaCAoc2VnbWVudC5wYXRoU2VnVHlwZUFzTGV0dGVyLnRvVXBwZXJDYXNlKCkpIHtcblxuICAgICAgICAgICAgY2FzZSAnQyc6XG4gICAgICAgICAgICBjYXNlICdUJzpcbiAgICAgICAgICAgIGNhc2UgJ1MnOlxuICAgICAgICAgICAgY2FzZSAnUSc6XG4gICAgICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgICAgICAgICBwb2ludCA9IHBhdGguZ2V0UG9pbnRBdExlbmd0aChsZW5ndGgpO1xuICAgICAgICAgICAgICAgIGFkZFBvaW50KHBvaW50LngsIHBvaW50LnksIDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGluY3JlbWVudCBieSBzYW1wbGUgdmFsdWVcbiAgICAgICAgICAgIGxlbmd0aCArPSBzYW1wbGVMZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgcmVtYWluaW5nIHNlZ21lbnRzIG5vdCBwYXNzZWQgYnkgc2FtcGxpbmdcbiAgICAgICAgZm9yIChpID0gMCwgaWwgPSBzZWdtZW50c1F1ZXVlLmxlbmd0aDsgaSA8IGlsOyArK2kpXG4gICAgICAgICAgICBhZGRTZWdtZW50UG9pbnQoc2VnbWVudHNRdWV1ZVtpXSk7XG5cbiAgICAgICAgcmV0dXJuIHBvaW50cztcbiAgICB9O1xuXG4gICAgU3ZnLl9zdmdQYXRoVG9BYnNvbHV0ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICAgICAgLy8gaHR0cDovL3Bocm9nei5uZXQvY29udmVydC1zdmctcGF0aC10by1hbGwtYWJzb2x1dGUtY29tbWFuZHNcbiAgICAgICAgLy8gQ29weXJpZ2h0IChjKSBHYXZpbiBLaXN0bmVyXG4gICAgICAgIC8vIGh0dHA6Ly9waHJvZ3oubmV0L2pzL19SZXVzZUxpY2Vuc2UudHh0XG4gICAgICAgIC8vIE1vZGlmaWNhdGlvbnM6IHRpZHkgZm9ybWF0dGluZyBhbmQgbmFtaW5nXG4gICAgICAgIHZhciB4MCwgeTAsIHgxLCB5MSwgeDIsIHkyLCBzZWdzID0gcGF0aC5wYXRoU2VnTGlzdCxcbiAgICAgICAgICAgIHggPSAwLCB5ID0gMCwgbGVuID0gc2Vncy5udW1iZXJPZkl0ZW1zO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBzZWcgPSBzZWdzLmdldEl0ZW0oaSksXG4gICAgICAgICAgICAgICAgc2VnVHlwZSA9IHNlZy5wYXRoU2VnVHlwZUFzTGV0dGVyO1xuXG4gICAgICAgICAgICBpZiAoL1tNTEhWQ1NRVEFdLy50ZXN0KHNlZ1R5cGUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCd4JyBpbiBzZWcpIHggPSBzZWcueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3knIGluIHNlZykgeSA9IHNlZy55O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoJ3gxJyBpbiBzZWcpIHgxID0geCArIHNlZy54MTtcbiAgICAgICAgICAgICAgICBpZiAoJ3gyJyBpbiBzZWcpIHgyID0geCArIHNlZy54MjtcbiAgICAgICAgICAgICAgICBpZiAoJ3kxJyBpbiBzZWcpIHkxID0geSArIHNlZy55MTtcbiAgICAgICAgICAgICAgICBpZiAoJ3kyJyBpbiBzZWcpIHkyID0geSArIHNlZy55MjtcbiAgICAgICAgICAgICAgICBpZiAoJ3gnIGluIHNlZykgeCArPSBzZWcueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3knIGluIHNlZykgeSArPSBzZWcueTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoc2VnVHlwZSkge1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgIHNlZ3MucmVwbGFjZUl0ZW0ocGF0aC5jcmVhdGVTVkdQYXRoU2VnTW92ZXRvQWJzKHgsIHkpLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbCc6XG4gICAgICAgICAgICAgICAgICAgIHNlZ3MucmVwbGFjZUl0ZW0ocGF0aC5jcmVhdGVTVkdQYXRoU2VnTGluZXRvQWJzKHgsIHkpLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgICAgIHNlZ3MucmVwbGFjZUl0ZW0ocGF0aC5jcmVhdGVTVkdQYXRoU2VnTGluZXRvSG9yaXpvbnRhbEFicyh4KSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3YnOlxuICAgICAgICAgICAgICAgICAgICBzZWdzLnJlcGxhY2VJdGVtKHBhdGguY3JlYXRlU1ZHUGF0aFNlZ0xpbmV0b1ZlcnRpY2FsQWJzKHkpLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgICAgICAgICAgIHNlZ3MucmVwbGFjZUl0ZW0ocGF0aC5jcmVhdGVTVkdQYXRoU2VnQ3VydmV0b0N1YmljQWJzKHgsIHksIHgxLCB5MSwgeDIsIHkyKSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICBzZWdzLnJlcGxhY2VJdGVtKHBhdGguY3JlYXRlU1ZHUGF0aFNlZ0N1cnZldG9DdWJpY1Ntb290aEFicyh4LCB5LCB4MiwgeTIpLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncSc6XG4gICAgICAgICAgICAgICAgICAgIHNlZ3MucmVwbGFjZUl0ZW0ocGF0aC5jcmVhdGVTVkdQYXRoU2VnQ3VydmV0b1F1YWRyYXRpY0Ficyh4LCB5LCB4MSwgeTEpLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAndCc6XG4gICAgICAgICAgICAgICAgICAgIHNlZ3MucmVwbGFjZUl0ZW0ocGF0aC5jcmVhdGVTVkdQYXRoU2VnQ3VydmV0b1F1YWRyYXRpY1Ntb290aEFicyh4LCB5KSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2EnOlxuICAgICAgICAgICAgICAgICAgICBzZWdzLnJlcGxhY2VJdGVtKHBhdGguY3JlYXRlU1ZHUGF0aFNlZ0FyY0Ficyh4LCB5LCBzZWcucjEsIHNlZy5yMiwgc2VnLmFuZ2xlLCBzZWcubGFyZ2VBcmNGbGFnLCBzZWcuc3dlZXBGbGFnKSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3onOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1onOlxuICAgICAgICAgICAgICAgICAgICB4ID0geDA7XG4gICAgICAgICAgICAgICAgICAgIHkgPSB5MDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzZWdUeXBlID09ICdNJyB8fCBzZWdUeXBlID09ICdtJykge1xuICAgICAgICAgICAgICAgIHgwID0geDtcbiAgICAgICAgICAgICAgICB5MCA9IHk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG59KSgpO1xufSx7XCIuLi9jb3JlL0NvbW1vblwiOjE0LFwiLi4vZ2VvbWV0cnkvQm91bmRzXCI6MjZ9XSwyODpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiogVGhlIGBNYXR0ZXIuVmVjdG9yYCBtb2R1bGUgY29udGFpbnMgbWV0aG9kcyBmb3IgY3JlYXRpbmcgYW5kIG1hbmlwdWxhdGluZyB2ZWN0b3JzLlxuKiBWZWN0b3JzIGFyZSB0aGUgYmFzaXMgb2YgYWxsIHRoZSBnZW9tZXRyeSByZWxhdGVkIG9wZXJhdGlvbnMgaW4gdGhlIGVuZ2luZS5cbiogQSBgTWF0dGVyLlZlY3RvcmAgb2JqZWN0IGlzIG9mIHRoZSBmb3JtIGB7IHg6IDAsIHk6IDAgfWAuXG4qXG4qIFNlZSB0aGUgaW5jbHVkZWQgdXNhZ2UgW2V4YW1wbGVzXShodHRwczovL2dpdGh1Yi5jb20vbGlhYnJ1L21hdHRlci1qcy90cmVlL21hc3Rlci9leGFtcGxlcykuXG4qXG4qIEBjbGFzcyBWZWN0b3JcbiovXG5cbi8vIFRPRE86IGNvbnNpZGVyIHBhcmFtcyBmb3IgcmV1c2luZyB2ZWN0b3Igb2JqZWN0c1xuXG52YXIgVmVjdG9yID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gVmVjdG9yO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHZlY3Rvci5cbiAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHlcbiAgICAgKiBAcmV0dXJuIHt2ZWN0b3J9IEEgbmV3IHZlY3RvclxuICAgICAqL1xuICAgIFZlY3Rvci5jcmVhdGUgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIHJldHVybiB7IHg6IHggfHwgMCwgeTogeSB8fCAwIH07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBuZXcgdmVjdG9yIHdpdGggYHhgIGFuZCBgeWAgY29waWVkIGZyb20gdGhlIGdpdmVuIGB2ZWN0b3JgLlxuICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gdmVjdG9yXG4gICAgICogQHJldHVybiB7dmVjdG9yfSBBIG5ldyBjbG9uZWQgdmVjdG9yXG4gICAgICovXG4gICAgVmVjdG9yLmNsb25lID0gZnVuY3Rpb24odmVjdG9yKSB7XG4gICAgICAgIHJldHVybiB7IHg6IHZlY3Rvci54LCB5OiB2ZWN0b3IueSB9O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBtYWduaXR1ZGUgKGxlbmd0aCkgb2YgYSB2ZWN0b3IuXG4gICAgICogQG1ldGhvZCBtYWduaXR1ZGVcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gdmVjdG9yXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBUaGUgbWFnbml0dWRlIG9mIHRoZSB2ZWN0b3JcbiAgICAgKi9cbiAgICBWZWN0b3IubWFnbml0dWRlID0gZnVuY3Rpb24odmVjdG9yKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoKHZlY3Rvci54ICogdmVjdG9yLngpICsgKHZlY3Rvci55ICogdmVjdG9yLnkpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbWFnbml0dWRlIChsZW5ndGgpIG9mIGEgdmVjdG9yICh0aGVyZWZvcmUgc2F2aW5nIGEgYHNxcnRgIG9wZXJhdGlvbikuXG4gICAgICogQG1ldGhvZCBtYWduaXR1ZGVTcXVhcmVkXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHZlY3RvclxuICAgICAqIEByZXR1cm4ge251bWJlcn0gVGhlIHNxdWFyZWQgbWFnbml0dWRlIG9mIHRoZSB2ZWN0b3JcbiAgICAgKi9cbiAgICBWZWN0b3IubWFnbml0dWRlU3F1YXJlZCA9IGZ1bmN0aW9uKHZlY3Rvcikge1xuICAgICAgICByZXR1cm4gKHZlY3Rvci54ICogdmVjdG9yLngpICsgKHZlY3Rvci55ICogdmVjdG9yLnkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSb3RhdGVzIHRoZSB2ZWN0b3IgYWJvdXQgKDAsIDApIGJ5IHNwZWNpZmllZCBhbmdsZS5cbiAgICAgKiBAbWV0aG9kIHJvdGF0ZVxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSB2ZWN0b3JcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGVcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gW291dHB1dF1cbiAgICAgKiBAcmV0dXJuIHt2ZWN0b3J9IFRoZSB2ZWN0b3Igcm90YXRlZCBhYm91dCAoMCwgMClcbiAgICAgKi9cbiAgICBWZWN0b3Iucm90YXRlID0gZnVuY3Rpb24odmVjdG9yLCBhbmdsZSwgb3V0cHV0KSB7XG4gICAgICAgIHZhciBjb3MgPSBNYXRoLmNvcyhhbmdsZSksIHNpbiA9IE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgaWYgKCFvdXRwdXQpIG91dHB1dCA9IHt9O1xuICAgICAgICB2YXIgeCA9IHZlY3Rvci54ICogY29zIC0gdmVjdG9yLnkgKiBzaW47XG4gICAgICAgIG91dHB1dC55ID0gdmVjdG9yLnggKiBzaW4gKyB2ZWN0b3IueSAqIGNvcztcbiAgICAgICAgb3V0cHV0LnggPSB4O1xuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSb3RhdGVzIHRoZSB2ZWN0b3IgYWJvdXQgYSBzcGVjaWZpZWQgcG9pbnQgYnkgc3BlY2lmaWVkIGFuZ2xlLlxuICAgICAqIEBtZXRob2Qgcm90YXRlQWJvdXRcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gdmVjdG9yXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHBvaW50XG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IFtvdXRwdXRdXG4gICAgICogQHJldHVybiB7dmVjdG9yfSBBIG5ldyB2ZWN0b3Igcm90YXRlZCBhYm91dCB0aGUgcG9pbnRcbiAgICAgKi9cbiAgICBWZWN0b3Iucm90YXRlQWJvdXQgPSBmdW5jdGlvbih2ZWN0b3IsIGFuZ2xlLCBwb2ludCwgb3V0cHV0KSB7XG4gICAgICAgIHZhciBjb3MgPSBNYXRoLmNvcyhhbmdsZSksIHNpbiA9IE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgaWYgKCFvdXRwdXQpIG91dHB1dCA9IHt9O1xuICAgICAgICB2YXIgeCA9IHBvaW50LnggKyAoKHZlY3Rvci54IC0gcG9pbnQueCkgKiBjb3MgLSAodmVjdG9yLnkgLSBwb2ludC55KSAqIHNpbik7XG4gICAgICAgIG91dHB1dC55ID0gcG9pbnQueSArICgodmVjdG9yLnggLSBwb2ludC54KSAqIHNpbiArICh2ZWN0b3IueSAtIHBvaW50LnkpICogY29zKTtcbiAgICAgICAgb3V0cHV0LnggPSB4O1xuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBOb3JtYWxpc2VzIGEgdmVjdG9yIChzdWNoIHRoYXQgaXRzIG1hZ25pdHVkZSBpcyBgMWApLlxuICAgICAqIEBtZXRob2Qgbm9ybWFsaXNlXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHZlY3RvclxuICAgICAqIEByZXR1cm4ge3ZlY3Rvcn0gQSBuZXcgdmVjdG9yIG5vcm1hbGlzZWRcbiAgICAgKi9cbiAgICBWZWN0b3Iubm9ybWFsaXNlID0gZnVuY3Rpb24odmVjdG9yKSB7XG4gICAgICAgIHZhciBtYWduaXR1ZGUgPSBWZWN0b3IubWFnbml0dWRlKHZlY3Rvcik7XG4gICAgICAgIGlmIChtYWduaXR1ZGUgPT09IDApXG4gICAgICAgICAgICByZXR1cm4geyB4OiAwLCB5OiAwIH07XG4gICAgICAgIHJldHVybiB7IHg6IHZlY3Rvci54IC8gbWFnbml0dWRlLCB5OiB2ZWN0b3IueSAvIG1hZ25pdHVkZSB9O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBkb3QtcHJvZHVjdCBvZiB0d28gdmVjdG9ycy5cbiAgICAgKiBAbWV0aG9kIGRvdFxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSB2ZWN0b3JBXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHZlY3RvckJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBkb3QgcHJvZHVjdCBvZiB0aGUgdHdvIHZlY3RvcnNcbiAgICAgKi9cbiAgICBWZWN0b3IuZG90ID0gZnVuY3Rpb24odmVjdG9yQSwgdmVjdG9yQikge1xuICAgICAgICByZXR1cm4gKHZlY3RvckEueCAqIHZlY3RvckIueCkgKyAodmVjdG9yQS55ICogdmVjdG9yQi55KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY3Jvc3MtcHJvZHVjdCBvZiB0d28gdmVjdG9ycy5cbiAgICAgKiBAbWV0aG9kIGNyb3NzXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHZlY3RvckFcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gdmVjdG9yQlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gVGhlIGNyb3NzIHByb2R1Y3Qgb2YgdGhlIHR3byB2ZWN0b3JzXG4gICAgICovXG4gICAgVmVjdG9yLmNyb3NzID0gZnVuY3Rpb24odmVjdG9yQSwgdmVjdG9yQikge1xuICAgICAgICByZXR1cm4gKHZlY3RvckEueCAqIHZlY3RvckIueSkgLSAodmVjdG9yQS55ICogdmVjdG9yQi54KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY3Jvc3MtcHJvZHVjdCBvZiB0aHJlZSB2ZWN0b3JzLlxuICAgICAqIEBtZXRob2QgY3Jvc3MzXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHZlY3RvckFcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gdmVjdG9yQlxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSB2ZWN0b3JDXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBUaGUgY3Jvc3MgcHJvZHVjdCBvZiB0aGUgdGhyZWUgdmVjdG9yc1xuICAgICAqL1xuICAgIFZlY3Rvci5jcm9zczMgPSBmdW5jdGlvbih2ZWN0b3JBLCB2ZWN0b3JCLCB2ZWN0b3JDKSB7XG4gICAgICAgIHJldHVybiAodmVjdG9yQi54IC0gdmVjdG9yQS54KSAqICh2ZWN0b3JDLnkgLSB2ZWN0b3JBLnkpIC0gKHZlY3RvckIueSAtIHZlY3RvckEueSkgKiAodmVjdG9yQy54IC0gdmVjdG9yQS54KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgdHdvIHZlY3RvcnMuXG4gICAgICogQG1ldGhvZCBhZGRcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gdmVjdG9yQVxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSB2ZWN0b3JCXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IFtvdXRwdXRdXG4gICAgICogQHJldHVybiB7dmVjdG9yfSBBIG5ldyB2ZWN0b3Igb2YgdmVjdG9yQSBhbmQgdmVjdG9yQiBhZGRlZFxuICAgICAqL1xuICAgIFZlY3Rvci5hZGQgPSBmdW5jdGlvbih2ZWN0b3JBLCB2ZWN0b3JCLCBvdXRwdXQpIHtcbiAgICAgICAgaWYgKCFvdXRwdXQpIG91dHB1dCA9IHt9O1xuICAgICAgICBvdXRwdXQueCA9IHZlY3RvckEueCArIHZlY3RvckIueDtcbiAgICAgICAgb3V0cHV0LnkgPSB2ZWN0b3JBLnkgKyB2ZWN0b3JCLnk7XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFN1YnRyYWN0cyB0aGUgdHdvIHZlY3RvcnMuXG4gICAgICogQG1ldGhvZCBzdWJcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gdmVjdG9yQVxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSB2ZWN0b3JCXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IFtvdXRwdXRdXG4gICAgICogQHJldHVybiB7dmVjdG9yfSBBIG5ldyB2ZWN0b3Igb2YgdmVjdG9yQSBhbmQgdmVjdG9yQiBzdWJ0cmFjdGVkXG4gICAgICovXG4gICAgVmVjdG9yLnN1YiA9IGZ1bmN0aW9uKHZlY3RvckEsIHZlY3RvckIsIG91dHB1dCkge1xuICAgICAgICBpZiAoIW91dHB1dCkgb3V0cHV0ID0ge307XG4gICAgICAgIG91dHB1dC54ID0gdmVjdG9yQS54IC0gdmVjdG9yQi54O1xuICAgICAgICBvdXRwdXQueSA9IHZlY3RvckEueSAtIHZlY3RvckIueTtcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogTXVsdGlwbGllcyBhIHZlY3RvciBhbmQgYSBzY2FsYXIuXG4gICAgICogQG1ldGhvZCBtdWx0XG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHZlY3RvclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzY2FsYXJcbiAgICAgKiBAcmV0dXJuIHt2ZWN0b3J9IEEgbmV3IHZlY3RvciBtdWx0aXBsaWVkIGJ5IHNjYWxhclxuICAgICAqL1xuICAgIFZlY3Rvci5tdWx0ID0gZnVuY3Rpb24odmVjdG9yLCBzY2FsYXIpIHtcbiAgICAgICAgcmV0dXJuIHsgeDogdmVjdG9yLnggKiBzY2FsYXIsIHk6IHZlY3Rvci55ICogc2NhbGFyIH07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERpdmlkZXMgYSB2ZWN0b3IgYW5kIGEgc2NhbGFyLlxuICAgICAqIEBtZXRob2QgZGl2XG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHZlY3RvclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzY2FsYXJcbiAgICAgKiBAcmV0dXJuIHt2ZWN0b3J9IEEgbmV3IHZlY3RvciBkaXZpZGVkIGJ5IHNjYWxhclxuICAgICAqL1xuICAgIFZlY3Rvci5kaXYgPSBmdW5jdGlvbih2ZWN0b3IsIHNjYWxhcikge1xuICAgICAgICByZXR1cm4geyB4OiB2ZWN0b3IueCAvIHNjYWxhciwgeTogdmVjdG9yLnkgLyBzY2FsYXIgfTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcGVycGVuZGljdWxhciB2ZWN0b3IuIFNldCBgbmVnYXRlYCB0byB0cnVlIGZvciB0aGUgcGVycGVuZGljdWxhciBpbiB0aGUgb3Bwb3NpdGUgZGlyZWN0aW9uLlxuICAgICAqIEBtZXRob2QgcGVycFxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSB2ZWN0b3JcbiAgICAgKiBAcGFyYW0ge2Jvb2x9IFtuZWdhdGU9ZmFsc2VdXG4gICAgICogQHJldHVybiB7dmVjdG9yfSBUaGUgcGVycGVuZGljdWxhciB2ZWN0b3JcbiAgICAgKi9cbiAgICBWZWN0b3IucGVycCA9IGZ1bmN0aW9uKHZlY3RvciwgbmVnYXRlKSB7XG4gICAgICAgIG5lZ2F0ZSA9IG5lZ2F0ZSA9PT0gdHJ1ZSA/IC0xIDogMTtcbiAgICAgICAgcmV0dXJuIHsgeDogbmVnYXRlICogLXZlY3Rvci55LCB5OiBuZWdhdGUgKiB2ZWN0b3IueCB9O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBOZWdhdGVzIGJvdGggY29tcG9uZW50cyBvZiBhIHZlY3RvciBzdWNoIHRoYXQgaXQgcG9pbnRzIGluIHRoZSBvcHBvc2l0ZSBkaXJlY3Rpb24uXG4gICAgICogQG1ldGhvZCBuZWdcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gdmVjdG9yXG4gICAgICogQHJldHVybiB7dmVjdG9yfSBUaGUgbmVnYXRlZCB2ZWN0b3JcbiAgICAgKi9cbiAgICBWZWN0b3IubmVnID0gZnVuY3Rpb24odmVjdG9yKSB7XG4gICAgICAgIHJldHVybiB7IHg6IC12ZWN0b3IueCwgeTogLXZlY3Rvci55IH07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGFuZ2xlIGJldHdlZW4gdGhlIHZlY3RvciBgdmVjdG9yQiAtIHZlY3RvckFgIGFuZCB0aGUgeC1heGlzIGluIHJhZGlhbnMuXG4gICAgICogQG1ldGhvZCBhbmdsZVxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSB2ZWN0b3JBXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHZlY3RvckJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBhbmdsZSBpbiByYWRpYW5zXG4gICAgICovXG4gICAgVmVjdG9yLmFuZ2xlID0gZnVuY3Rpb24odmVjdG9yQSwgdmVjdG9yQikge1xuICAgICAgICByZXR1cm4gTWF0aC5hdGFuMih2ZWN0b3JCLnkgLSB2ZWN0b3JBLnksIHZlY3RvckIueCAtIHZlY3RvckEueCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRlbXBvcmFyeSB2ZWN0b3IgcG9vbCAobm90IHRocmVhZC1zYWZlKS5cbiAgICAgKiBAcHJvcGVydHkgX3RlbXBcbiAgICAgKiBAdHlwZSB7dmVjdG9yW119XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBWZWN0b3IuX3RlbXAgPSBbXG4gICAgICAgIFZlY3Rvci5jcmVhdGUoKSwgVmVjdG9yLmNyZWF0ZSgpLCBcbiAgICAgICAgVmVjdG9yLmNyZWF0ZSgpLCBWZWN0b3IuY3JlYXRlKCksIFxuICAgICAgICBWZWN0b3IuY3JlYXRlKCksIFZlY3Rvci5jcmVhdGUoKVxuICAgIF07XG5cbn0pKCk7XG59LHt9XSwyOTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiogVGhlIGBNYXR0ZXIuVmVydGljZXNgIG1vZHVsZSBjb250YWlucyBtZXRob2RzIGZvciBjcmVhdGluZyBhbmQgbWFuaXB1bGF0aW5nIHNldHMgb2YgdmVydGljZXMuXG4qIEEgc2V0IG9mIHZlcnRpY2VzIGlzIGFuIGFycmF5IG9mIGBNYXR0ZXIuVmVjdG9yYCB3aXRoIGFkZGl0aW9uYWwgaW5kZXhpbmcgcHJvcGVydGllcyBpbnNlcnRlZCBieSBgVmVydGljZXMuY3JlYXRlYC5cbiogQSBgTWF0dGVyLkJvZHlgIG1haW50YWlucyBhIHNldCBvZiB2ZXJ0aWNlcyB0byByZXByZXNlbnQgdGhlIHNoYXBlIG9mIHRoZSBvYmplY3QgKGl0cyBjb252ZXggaHVsbCkuXG4qXG4qIFNlZSB0aGUgaW5jbHVkZWQgdXNhZ2UgW2V4YW1wbGVzXShodHRwczovL2dpdGh1Yi5jb20vbGlhYnJ1L21hdHRlci1qcy90cmVlL21hc3Rlci9leGFtcGxlcykuXG4qXG4qIEBjbGFzcyBWZXJ0aWNlc1xuKi9cblxudmFyIFZlcnRpY2VzID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gVmVydGljZXM7XG5cbnZhciBWZWN0b3IgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9WZWN0b3InKTtcbnZhciBDb21tb24gPSBfZGVyZXFfKCcuLi9jb3JlL0NvbW1vbicpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHNldCBvZiBgTWF0dGVyLkJvZHlgIGNvbXBhdGlibGUgdmVydGljZXMuXG4gICAgICogVGhlIGBwb2ludHNgIGFyZ3VtZW50IGFjY2VwdHMgYW4gYXJyYXkgb2YgYE1hdHRlci5WZWN0b3JgIHBvaW50cyBvcmllbnRhdGVkIGFyb3VuZCB0aGUgb3JpZ2luIGAoMCwgMClgLCBmb3IgZXhhbXBsZTpcbiAgICAgKlxuICAgICAqICAgICBbeyB4OiAwLCB5OiAwIH0sIHsgeDogMjUsIHk6IDUwIH0sIHsgeDogNTAsIHk6IDAgfV1cbiAgICAgKlxuICAgICAqIFRoZSBgVmVydGljZXMuY3JlYXRlYCBtZXRob2QgcmV0dXJucyBhIG5ldyBhcnJheSBvZiB2ZXJ0aWNlcywgd2hpY2ggYXJlIHNpbWlsYXIgdG8gTWF0dGVyLlZlY3RvciBvYmplY3RzLFxuICAgICAqIGJ1dCB3aXRoIHNvbWUgYWRkaXRpb25hbCByZWZlcmVuY2VzIHJlcXVpcmVkIGZvciBlZmZpY2llbnQgY29sbGlzaW9uIGRldGVjdGlvbiByb3V0aW5lcy5cbiAgICAgKlxuICAgICAqIFZlcnRpY2VzIG11c3QgYmUgc3BlY2lmaWVkIGluIGNsb2Nrd2lzZSBvcmRlci5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhhdCB0aGUgYGJvZHlgIGFyZ3VtZW50IGlzIG5vdCBvcHRpb25hbCwgYSBgTWF0dGVyLkJvZHlgIHJlZmVyZW5jZSBtdXN0IGJlIHByb3ZpZGVkLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBjcmVhdGVcbiAgICAgKiBAcGFyYW0ge3ZlY3RvcltdfSBwb2ludHNcbiAgICAgKiBAcGFyYW0ge2JvZHl9IGJvZHlcbiAgICAgKi9cbiAgICBWZXJ0aWNlcy5jcmVhdGUgPSBmdW5jdGlvbihwb2ludHMsIGJvZHkpIHtcbiAgICAgICAgdmFyIHZlcnRpY2VzID0gW107XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwb2ludCA9IHBvaW50c1tpXSxcbiAgICAgICAgICAgICAgICB2ZXJ0ZXggPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHBvaW50LngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHBvaW50LnksXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBpLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiBib2R5LFxuICAgICAgICAgICAgICAgICAgICBpc0ludGVybmFsOiBmYWxzZVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2ZXJ0aWNlcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIGEgc3RyaW5nIGNvbnRhaW5pbmcgb3JkZXJlZCB4IHkgcGFpcnMgc2VwYXJhdGVkIGJ5IHNwYWNlcyAoYW5kIG9wdGlvbmFsbHkgY29tbWFzKSwgXG4gICAgICogaW50byBhIGBNYXR0ZXIuVmVydGljZXNgIG9iamVjdCBmb3IgdGhlIGdpdmVuIGBNYXR0ZXIuQm9keWAuXG4gICAgICogRm9yIHBhcnNpbmcgU1ZHIHBhdGhzLCBzZWUgYFN2Zy5wYXRoVG9WZXJ0aWNlc2AuXG4gICAgICogQG1ldGhvZCBmcm9tUGF0aFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHtib2R5fSBib2R5XG4gICAgICogQHJldHVybiB7dmVydGljZXN9IHZlcnRpY2VzXG4gICAgICovXG4gICAgVmVydGljZXMuZnJvbVBhdGggPSBmdW5jdGlvbihwYXRoLCBib2R5KSB7XG4gICAgICAgIHZhciBwYXRoUGF0dGVybiA9IC9MP1xccyooW1xcLVxcZFxcLmVdKylbXFxzLF0qKFtcXC1cXGRcXC5lXSspKi9pZyxcbiAgICAgICAgICAgIHBvaW50cyA9IFtdO1xuXG4gICAgICAgIHBhdGgucmVwbGFjZShwYXRoUGF0dGVybiwgZnVuY3Rpb24obWF0Y2gsIHgsIHkpIHtcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKHsgeDogcGFyc2VGbG9hdCh4KSwgeTogcGFyc2VGbG9hdCh5KSB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIFZlcnRpY2VzLmNyZWF0ZShwb2ludHMsIGJvZHkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjZW50cmUgKGNlbnRyb2lkKSBvZiB0aGUgc2V0IG9mIHZlcnRpY2VzLlxuICAgICAqIEBtZXRob2QgY2VudHJlXG4gICAgICogQHBhcmFtIHt2ZXJ0aWNlc30gdmVydGljZXNcbiAgICAgKiBAcmV0dXJuIHt2ZWN0b3J9IFRoZSBjZW50cmUgcG9pbnRcbiAgICAgKi9cbiAgICBWZXJ0aWNlcy5jZW50cmUgPSBmdW5jdGlvbih2ZXJ0aWNlcykge1xuICAgICAgICB2YXIgYXJlYSA9IFZlcnRpY2VzLmFyZWEodmVydGljZXMsIHRydWUpLFxuICAgICAgICAgICAgY2VudHJlID0geyB4OiAwLCB5OiAwIH0sXG4gICAgICAgICAgICBjcm9zcyxcbiAgICAgICAgICAgIHRlbXAsXG4gICAgICAgICAgICBqO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmVydGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGogPSAoaSArIDEpICUgdmVydGljZXMubGVuZ3RoO1xuICAgICAgICAgICAgY3Jvc3MgPSBWZWN0b3IuY3Jvc3ModmVydGljZXNbaV0sIHZlcnRpY2VzW2pdKTtcbiAgICAgICAgICAgIHRlbXAgPSBWZWN0b3IubXVsdChWZWN0b3IuYWRkKHZlcnRpY2VzW2ldLCB2ZXJ0aWNlc1tqXSksIGNyb3NzKTtcbiAgICAgICAgICAgIGNlbnRyZSA9IFZlY3Rvci5hZGQoY2VudHJlLCB0ZW1wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBWZWN0b3IuZGl2KGNlbnRyZSwgNiAqIGFyZWEpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBhdmVyYWdlIChtZWFuKSBvZiB0aGUgc2V0IG9mIHZlcnRpY2VzLlxuICAgICAqIEBtZXRob2QgbWVhblxuICAgICAqIEBwYXJhbSB7dmVydGljZXN9IHZlcnRpY2VzXG4gICAgICogQHJldHVybiB7dmVjdG9yfSBUaGUgYXZlcmFnZSBwb2ludFxuICAgICAqL1xuICAgIFZlcnRpY2VzLm1lYW4gPSBmdW5jdGlvbih2ZXJ0aWNlcykge1xuICAgICAgICB2YXIgYXZlcmFnZSA9IHsgeDogMCwgeTogMCB9O1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmVydGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGF2ZXJhZ2UueCArPSB2ZXJ0aWNlc1tpXS54O1xuICAgICAgICAgICAgYXZlcmFnZS55ICs9IHZlcnRpY2VzW2ldLnk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gVmVjdG9yLmRpdihhdmVyYWdlLCB2ZXJ0aWNlcy5sZW5ndGgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBhcmVhIG9mIHRoZSBzZXQgb2YgdmVydGljZXMuXG4gICAgICogQG1ldGhvZCBhcmVhXG4gICAgICogQHBhcmFtIHt2ZXJ0aWNlc30gdmVydGljZXNcbiAgICAgKiBAcGFyYW0ge2Jvb2x9IHNpZ25lZFxuICAgICAqIEByZXR1cm4ge251bWJlcn0gVGhlIGFyZWFcbiAgICAgKi9cbiAgICBWZXJ0aWNlcy5hcmVhID0gZnVuY3Rpb24odmVydGljZXMsIHNpZ25lZCkge1xuICAgICAgICB2YXIgYXJlYSA9IDAsXG4gICAgICAgICAgICBqID0gdmVydGljZXMubGVuZ3RoIC0gMTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmVhICs9ICh2ZXJ0aWNlc1tqXS54IC0gdmVydGljZXNbaV0ueCkgKiAodmVydGljZXNbal0ueSArIHZlcnRpY2VzW2ldLnkpO1xuICAgICAgICAgICAgaiA9IGk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2lnbmVkKVxuICAgICAgICAgICAgcmV0dXJuIGFyZWEgLyAyO1xuXG4gICAgICAgIHJldHVybiBNYXRoLmFicyhhcmVhKSAvIDI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG1vbWVudCBvZiBpbmVydGlhIChzZWNvbmQgbW9tZW50IG9mIGFyZWEpIG9mIHRoZSBzZXQgb2YgdmVydGljZXMgZ2l2ZW4gdGhlIHRvdGFsIG1hc3MuXG4gICAgICogQG1ldGhvZCBpbmVydGlhXG4gICAgICogQHBhcmFtIHt2ZXJ0aWNlc30gdmVydGljZXNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWFzc1xuICAgICAqIEByZXR1cm4ge251bWJlcn0gVGhlIHBvbHlnb24ncyBtb21lbnQgb2YgaW5lcnRpYVxuICAgICAqL1xuICAgIFZlcnRpY2VzLmluZXJ0aWEgPSBmdW5jdGlvbih2ZXJ0aWNlcywgbWFzcykge1xuICAgICAgICB2YXIgbnVtZXJhdG9yID0gMCxcbiAgICAgICAgICAgIGRlbm9taW5hdG9yID0gMCxcbiAgICAgICAgICAgIHYgPSB2ZXJ0aWNlcyxcbiAgICAgICAgICAgIGNyb3NzLFxuICAgICAgICAgICAgajtcblxuICAgICAgICAvLyBmaW5kIHRoZSBwb2x5Z29uJ3MgbW9tZW50IG9mIGluZXJ0aWEsIHVzaW5nIHNlY29uZCBtb21lbnQgb2YgYXJlYVxuICAgICAgICAvLyBmcm9tIGVxdWF0aW9ucyBhdCBodHRwOi8vd3d3LnBoeXNpY3Nmb3J1bXMuY29tL3Nob3d0aHJlYWQucGhwP3Q9MjUyOTNcbiAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCB2Lmxlbmd0aDsgbisrKSB7XG4gICAgICAgICAgICBqID0gKG4gKyAxKSAlIHYubGVuZ3RoO1xuICAgICAgICAgICAgY3Jvc3MgPSBNYXRoLmFicyhWZWN0b3IuY3Jvc3ModltqXSwgdltuXSkpO1xuICAgICAgICAgICAgbnVtZXJhdG9yICs9IGNyb3NzICogKFZlY3Rvci5kb3QodltqXSwgdltqXSkgKyBWZWN0b3IuZG90KHZbal0sIHZbbl0pICsgVmVjdG9yLmRvdCh2W25dLCB2W25dKSk7XG4gICAgICAgICAgICBkZW5vbWluYXRvciArPSBjcm9zcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAobWFzcyAvIDYpICogKG51bWVyYXRvciAvIGRlbm9taW5hdG9yKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVHJhbnNsYXRlcyB0aGUgc2V0IG9mIHZlcnRpY2VzIGluLXBsYWNlLlxuICAgICAqIEBtZXRob2QgdHJhbnNsYXRlXG4gICAgICogQHBhcmFtIHt2ZXJ0aWNlc30gdmVydGljZXNcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gdmVjdG9yXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNjYWxhclxuICAgICAqL1xuICAgIFZlcnRpY2VzLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uKHZlcnRpY2VzLCB2ZWN0b3IsIHNjYWxhcikge1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgaWYgKHNjYWxhcikge1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXNbaV0ueCArPSB2ZWN0b3IueCAqIHNjYWxhcjtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlc1tpXS55ICs9IHZlY3Rvci55ICogc2NhbGFyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXNbaV0ueCArPSB2ZWN0b3IueDtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlc1tpXS55ICs9IHZlY3Rvci55O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZlcnRpY2VzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSb3RhdGVzIHRoZSBzZXQgb2YgdmVydGljZXMgaW4tcGxhY2UuXG4gICAgICogQG1ldGhvZCByb3RhdGVcbiAgICAgKiBAcGFyYW0ge3ZlcnRpY2VzfSB2ZXJ0aWNlc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZVxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSBwb2ludFxuICAgICAqL1xuICAgIFZlcnRpY2VzLnJvdGF0ZSA9IGZ1bmN0aW9uKHZlcnRpY2VzLCBhbmdsZSwgcG9pbnQpIHtcbiAgICAgICAgaWYgKGFuZ2xlID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBjb3MgPSBNYXRoLmNvcyhhbmdsZSksXG4gICAgICAgICAgICBzaW4gPSBNYXRoLnNpbihhbmdsZSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2ZXJ0aWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHZlcnRpY2UgPSB2ZXJ0aWNlc1tpXSxcbiAgICAgICAgICAgICAgICBkeCA9IHZlcnRpY2UueCAtIHBvaW50LngsXG4gICAgICAgICAgICAgICAgZHkgPSB2ZXJ0aWNlLnkgLSBwb2ludC55O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgdmVydGljZS54ID0gcG9pbnQueCArIChkeCAqIGNvcyAtIGR5ICogc2luKTtcbiAgICAgICAgICAgIHZlcnRpY2UueSA9IHBvaW50LnkgKyAoZHggKiBzaW4gKyBkeSAqIGNvcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmVydGljZXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBgcG9pbnRgIGlzIGluc2lkZSB0aGUgc2V0IG9mIGB2ZXJ0aWNlc2AuXG4gICAgICogQG1ldGhvZCBjb250YWluc1xuICAgICAqIEBwYXJhbSB7dmVydGljZXN9IHZlcnRpY2VzXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHBvaW50XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVydGljZXMgY29udGFpbnMgcG9pbnQsIG90aGVyd2lzZSBmYWxzZVxuICAgICAqL1xuICAgIFZlcnRpY2VzLmNvbnRhaW5zID0gZnVuY3Rpb24odmVydGljZXMsIHBvaW50KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmVydGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB2ZXJ0aWNlID0gdmVydGljZXNbaV0sXG4gICAgICAgICAgICAgICAgbmV4dFZlcnRpY2UgPSB2ZXJ0aWNlc1soaSArIDEpICUgdmVydGljZXMubGVuZ3RoXTtcbiAgICAgICAgICAgIGlmICgocG9pbnQueCAtIHZlcnRpY2UueCkgKiAobmV4dFZlcnRpY2UueSAtIHZlcnRpY2UueSkgKyAocG9pbnQueSAtIHZlcnRpY2UueSkgKiAodmVydGljZS54IC0gbmV4dFZlcnRpY2UueCkgPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNjYWxlcyB0aGUgdmVydGljZXMgZnJvbSBhIHBvaW50IChkZWZhdWx0IGlzIGNlbnRyZSkgaW4tcGxhY2UuXG4gICAgICogQG1ldGhvZCBzY2FsZVxuICAgICAqIEBwYXJhbSB7dmVydGljZXN9IHZlcnRpY2VzXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNjYWxlWFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzY2FsZVlcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gcG9pbnRcbiAgICAgKi9cbiAgICBWZXJ0aWNlcy5zY2FsZSA9IGZ1bmN0aW9uKHZlcnRpY2VzLCBzY2FsZVgsIHNjYWxlWSwgcG9pbnQpIHtcbiAgICAgICAgaWYgKHNjYWxlWCA9PT0gMSAmJiBzY2FsZVkgPT09IDEpXG4gICAgICAgICAgICByZXR1cm4gdmVydGljZXM7XG5cbiAgICAgICAgcG9pbnQgPSBwb2ludCB8fCBWZXJ0aWNlcy5jZW50cmUodmVydGljZXMpO1xuXG4gICAgICAgIHZhciB2ZXJ0ZXgsXG4gICAgICAgICAgICBkZWx0YTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2ZXJ0ZXggPSB2ZXJ0aWNlc1tpXTtcbiAgICAgICAgICAgIGRlbHRhID0gVmVjdG9yLnN1Yih2ZXJ0ZXgsIHBvaW50KTtcbiAgICAgICAgICAgIHZlcnRpY2VzW2ldLnggPSBwb2ludC54ICsgZGVsdGEueCAqIHNjYWxlWDtcbiAgICAgICAgICAgIHZlcnRpY2VzW2ldLnkgPSBwb2ludC55ICsgZGVsdGEueSAqIHNjYWxlWTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2ZXJ0aWNlcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hhbWZlcnMgYSBzZXQgb2YgdmVydGljZXMgYnkgZ2l2aW5nIHRoZW0gcm91bmRlZCBjb3JuZXJzLCByZXR1cm5zIGEgbmV3IHNldCBvZiB2ZXJ0aWNlcy5cbiAgICAgKiBUaGUgcmFkaXVzIHBhcmFtZXRlciBpcyBhIHNpbmdsZSBudW1iZXIgb3IgYW4gYXJyYXkgdG8gc3BlY2lmeSB0aGUgcmFkaXVzIGZvciBlYWNoIHZlcnRleC5cbiAgICAgKiBAbWV0aG9kIGNoYW1mZXJcbiAgICAgKiBAcGFyYW0ge3ZlcnRpY2VzfSB2ZXJ0aWNlc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IHJhZGl1c1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBxdWFsaXR5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHF1YWxpdHlNaW5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcXVhbGl0eU1heFxuICAgICAqL1xuICAgIFZlcnRpY2VzLmNoYW1mZXIgPSBmdW5jdGlvbih2ZXJ0aWNlcywgcmFkaXVzLCBxdWFsaXR5LCBxdWFsaXR5TWluLCBxdWFsaXR5TWF4KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmFkaXVzID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmFkaXVzID0gW3JhZGl1c107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByYWRpdXMgPSByYWRpdXMgfHwgWzhdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcXVhbGl0eSBkZWZhdWx0cyB0byAtMSwgd2hpY2ggaXMgYXV0b1xuICAgICAgICBxdWFsaXR5ID0gKHR5cGVvZiBxdWFsaXR5ICE9PSAndW5kZWZpbmVkJykgPyBxdWFsaXR5IDogLTE7XG4gICAgICAgIHF1YWxpdHlNaW4gPSBxdWFsaXR5TWluIHx8IDI7XG4gICAgICAgIHF1YWxpdHlNYXggPSBxdWFsaXR5TWF4IHx8IDE0O1xuXG4gICAgICAgIHZhciBuZXdWZXJ0aWNlcyA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmVydGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwcmV2VmVydGV4ID0gdmVydGljZXNbaSAtIDEgPj0gMCA/IGkgLSAxIDogdmVydGljZXMubGVuZ3RoIC0gMV0sXG4gICAgICAgICAgICAgICAgdmVydGV4ID0gdmVydGljZXNbaV0sXG4gICAgICAgICAgICAgICAgbmV4dFZlcnRleCA9IHZlcnRpY2VzWyhpICsgMSkgJSB2ZXJ0aWNlcy5sZW5ndGhdLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRSYWRpdXMgPSByYWRpdXNbaSA8IHJhZGl1cy5sZW5ndGggPyBpIDogcmFkaXVzLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgICAgICBpZiAoY3VycmVudFJhZGl1cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIG5ld1ZlcnRpY2VzLnB1c2godmVydGV4KTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHByZXZOb3JtYWwgPSBWZWN0b3Iubm9ybWFsaXNlKHsgXG4gICAgICAgICAgICAgICAgeDogdmVydGV4LnkgLSBwcmV2VmVydGV4LnksIFxuICAgICAgICAgICAgICAgIHk6IHByZXZWZXJ0ZXgueCAtIHZlcnRleC54XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIG5leHROb3JtYWwgPSBWZWN0b3Iubm9ybWFsaXNlKHsgXG4gICAgICAgICAgICAgICAgeDogbmV4dFZlcnRleC55IC0gdmVydGV4LnksIFxuICAgICAgICAgICAgICAgIHk6IHZlcnRleC54IC0gbmV4dFZlcnRleC54XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIGRpYWdvbmFsUmFkaXVzID0gTWF0aC5zcXJ0KDIgKiBNYXRoLnBvdyhjdXJyZW50UmFkaXVzLCAyKSksXG4gICAgICAgICAgICAgICAgcmFkaXVzVmVjdG9yID0gVmVjdG9yLm11bHQoQ29tbW9uLmNsb25lKHByZXZOb3JtYWwpLCBjdXJyZW50UmFkaXVzKSxcbiAgICAgICAgICAgICAgICBtaWROb3JtYWwgPSBWZWN0b3Iubm9ybWFsaXNlKFZlY3Rvci5tdWx0KFZlY3Rvci5hZGQocHJldk5vcm1hbCwgbmV4dE5vcm1hbCksIDAuNSkpLFxuICAgICAgICAgICAgICAgIHNjYWxlZFZlcnRleCA9IFZlY3Rvci5zdWIodmVydGV4LCBWZWN0b3IubXVsdChtaWROb3JtYWwsIGRpYWdvbmFsUmFkaXVzKSk7XG5cbiAgICAgICAgICAgIHZhciBwcmVjaXNpb24gPSBxdWFsaXR5O1xuXG4gICAgICAgICAgICBpZiAocXVhbGl0eSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyBhdXRvbWF0aWNhbGx5IGRlY2lkZSBwcmVjaXNpb25cbiAgICAgICAgICAgICAgICBwcmVjaXNpb24gPSBNYXRoLnBvdyhjdXJyZW50UmFkaXVzLCAwLjMyKSAqIDEuNzU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByZWNpc2lvbiA9IENvbW1vbi5jbGFtcChwcmVjaXNpb24sIHF1YWxpdHlNaW4sIHF1YWxpdHlNYXgpO1xuXG4gICAgICAgICAgICAvLyB1c2UgYW4gZXZlbiB2YWx1ZSBmb3IgcHJlY2lzaW9uLCBtb3JlIGxpa2VseSB0byByZWR1Y2UgYXhlcyBieSB1c2luZyBzeW1tZXRyeVxuICAgICAgICAgICAgaWYgKHByZWNpc2lvbiAlIDIgPT09IDEpXG4gICAgICAgICAgICAgICAgcHJlY2lzaW9uICs9IDE7XG5cbiAgICAgICAgICAgIHZhciBhbHBoYSA9IE1hdGguYWNvcyhWZWN0b3IuZG90KHByZXZOb3JtYWwsIG5leHROb3JtYWwpKSxcbiAgICAgICAgICAgICAgICB0aGV0YSA9IGFscGhhIC8gcHJlY2lzaW9uO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHByZWNpc2lvbjsgaisrKSB7XG4gICAgICAgICAgICAgICAgbmV3VmVydGljZXMucHVzaChWZWN0b3IuYWRkKFZlY3Rvci5yb3RhdGUocmFkaXVzVmVjdG9yLCB0aGV0YSAqIGopLCBzY2FsZWRWZXJ0ZXgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXdWZXJ0aWNlcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU29ydHMgdGhlIGlucHV0IHZlcnRpY2VzIGludG8gY2xvY2t3aXNlIG9yZGVyIGluIHBsYWNlLlxuICAgICAqIEBtZXRob2QgY2xvY2t3aXNlU29ydFxuICAgICAqIEBwYXJhbSB7dmVydGljZXN9IHZlcnRpY2VzXG4gICAgICogQHJldHVybiB7dmVydGljZXN9IHZlcnRpY2VzXG4gICAgICovXG4gICAgVmVydGljZXMuY2xvY2t3aXNlU29ydCA9IGZ1bmN0aW9uKHZlcnRpY2VzKSB7XG4gICAgICAgIHZhciBjZW50cmUgPSBWZXJ0aWNlcy5tZWFuKHZlcnRpY2VzKTtcblxuICAgICAgICB2ZXJ0aWNlcy5zb3J0KGZ1bmN0aW9uKHZlcnRleEEsIHZlcnRleEIpIHtcbiAgICAgICAgICAgIHJldHVybiBWZWN0b3IuYW5nbGUoY2VudHJlLCB2ZXJ0ZXhBKSAtIFZlY3Rvci5hbmdsZShjZW50cmUsIHZlcnRleEIpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmVydGljZXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmVydGljZXMgZm9ybSBhIGNvbnZleCBzaGFwZSAodmVydGljZXMgbXVzdCBiZSBpbiBjbG9ja3dpc2Ugb3JkZXIpLlxuICAgICAqIEBtZXRob2QgaXNDb252ZXhcbiAgICAgKiBAcGFyYW0ge3ZlcnRpY2VzfSB2ZXJ0aWNlc1xuICAgICAqIEByZXR1cm4ge2Jvb2x9IGB0cnVlYCBpZiB0aGUgYHZlcnRpY2VzYCBhcmUgY29udmV4LCBgZmFsc2VgIGlmIG5vdCAob3IgYG51bGxgIGlmIG5vdCBjb21wdXRhYmxlKS5cbiAgICAgKi9cbiAgICBWZXJ0aWNlcy5pc0NvbnZleCA9IGZ1bmN0aW9uKHZlcnRpY2VzKSB7XG4gICAgICAgIC8vIGh0dHA6Ly9wYXVsYm91cmtlLm5ldC9nZW9tZXRyeS9wb2x5Z29ubWVzaC9cbiAgICAgICAgLy8gQ29weXJpZ2h0IChjKSBQYXVsIEJvdXJrZSAodXNlIHBlcm1pdHRlZClcblxuICAgICAgICB2YXIgZmxhZyA9IDAsXG4gICAgICAgICAgICBuID0gdmVydGljZXMubGVuZ3RoLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIGosXG4gICAgICAgICAgICBrLFxuICAgICAgICAgICAgejtcblxuICAgICAgICBpZiAobiA8IDMpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBqID0gKGkgKyAxKSAlIG47XG4gICAgICAgICAgICBrID0gKGkgKyAyKSAlIG47XG4gICAgICAgICAgICB6ID0gKHZlcnRpY2VzW2pdLnggLSB2ZXJ0aWNlc1tpXS54KSAqICh2ZXJ0aWNlc1trXS55IC0gdmVydGljZXNbal0ueSk7XG4gICAgICAgICAgICB6IC09ICh2ZXJ0aWNlc1tqXS55IC0gdmVydGljZXNbaV0ueSkgKiAodmVydGljZXNba10ueCAtIHZlcnRpY2VzW2pdLngpO1xuXG4gICAgICAgICAgICBpZiAoeiA8IDApIHtcbiAgICAgICAgICAgICAgICBmbGFnIHw9IDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHogPiAwKSB7XG4gICAgICAgICAgICAgICAgZmxhZyB8PSAyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZmxhZyA9PT0gMykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmbGFnICE9PSAwKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY29udmV4IGh1bGwgb2YgdGhlIGlucHV0IHZlcnRpY2VzIGFzIGEgbmV3IGFycmF5IG9mIHBvaW50cy5cbiAgICAgKiBAbWV0aG9kIGh1bGxcbiAgICAgKiBAcGFyYW0ge3ZlcnRpY2VzfSB2ZXJ0aWNlc1xuICAgICAqIEByZXR1cm4gW3ZlcnRleF0gdmVydGljZXNcbiAgICAgKi9cbiAgICBWZXJ0aWNlcy5odWxsID0gZnVuY3Rpb24odmVydGljZXMpIHtcbiAgICAgICAgLy8gaHR0cDovL2dlb21hbGdvcml0aG1zLmNvbS9hMTAtX2h1bGwtMS5odG1sXG5cbiAgICAgICAgdmFyIHVwcGVyID0gW10sXG4gICAgICAgICAgICBsb3dlciA9IFtdLCBcbiAgICAgICAgICAgIHZlcnRleCxcbiAgICAgICAgICAgIGk7XG5cbiAgICAgICAgLy8gc29ydCB2ZXJ0aWNlcyBvbiB4LWF4aXMgKHktYXhpcyBmb3IgdGllcylcbiAgICAgICAgdmVydGljZXMgPSB2ZXJ0aWNlcy5zbGljZSgwKTtcbiAgICAgICAgdmVydGljZXMuc29ydChmdW5jdGlvbih2ZXJ0ZXhBLCB2ZXJ0ZXhCKSB7XG4gICAgICAgICAgICB2YXIgZHggPSB2ZXJ0ZXhBLnggLSB2ZXJ0ZXhCLng7XG4gICAgICAgICAgICByZXR1cm4gZHggIT09IDAgPyBkeCA6IHZlcnRleEEueSAtIHZlcnRleEIueTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gYnVpbGQgbG93ZXIgaHVsbFxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdmVydGljZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHZlcnRleCA9IHZlcnRpY2VzW2ldO1xuXG4gICAgICAgICAgICB3aGlsZSAobG93ZXIubGVuZ3RoID49IDIgXG4gICAgICAgICAgICAgICAgICAgJiYgVmVjdG9yLmNyb3NzMyhsb3dlcltsb3dlci5sZW5ndGggLSAyXSwgbG93ZXJbbG93ZXIubGVuZ3RoIC0gMV0sIHZlcnRleCkgPD0gMCkge1xuICAgICAgICAgICAgICAgIGxvd2VyLnBvcCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsb3dlci5wdXNoKHZlcnRleCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBidWlsZCB1cHBlciBodWxsXG4gICAgICAgIGZvciAoaSA9IHZlcnRpY2VzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaSAtPSAxKSB7XG4gICAgICAgICAgICB2ZXJ0ZXggPSB2ZXJ0aWNlc1tpXTtcblxuICAgICAgICAgICAgd2hpbGUgKHVwcGVyLmxlbmd0aCA+PSAyIFxuICAgICAgICAgICAgICAgICAgICYmIFZlY3Rvci5jcm9zczModXBwZXJbdXBwZXIubGVuZ3RoIC0gMl0sIHVwcGVyW3VwcGVyLmxlbmd0aCAtIDFdLCB2ZXJ0ZXgpIDw9IDApIHtcbiAgICAgICAgICAgICAgICB1cHBlci5wb3AoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdXBwZXIucHVzaCh2ZXJ0ZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uY2F0ZW5hdGlvbiBvZiB0aGUgbG93ZXIgYW5kIHVwcGVyIGh1bGxzIGdpdmVzIHRoZSBjb252ZXggaHVsbFxuICAgICAgICAvLyBvbWl0IGxhc3QgcG9pbnRzIGJlY2F1c2UgdGhleSBhcmUgcmVwZWF0ZWQgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgb3RoZXIgbGlzdFxuICAgICAgICB1cHBlci5wb3AoKTtcbiAgICAgICAgbG93ZXIucG9wKCk7XG5cbiAgICAgICAgcmV0dXJuIHVwcGVyLmNvbmNhdChsb3dlcik7XG4gICAgfTtcblxufSkoKTtcblxufSx7XCIuLi9jb3JlL0NvbW1vblwiOjE0LFwiLi4vZ2VvbWV0cnkvVmVjdG9yXCI6Mjh9XSwzMDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgTWF0dGVyID0gbW9kdWxlLmV4cG9ydHMgPSBfZGVyZXFfKCcuLi9jb3JlL01hdHRlcicpO1xuXG5NYXR0ZXIuQm9keSA9IF9kZXJlcV8oJy4uL2JvZHkvQm9keScpO1xuTWF0dGVyLkNvbXBvc2l0ZSA9IF9kZXJlcV8oJy4uL2JvZHkvQ29tcG9zaXRlJyk7XG5NYXR0ZXIuV29ybGQgPSBfZGVyZXFfKCcuLi9ib2R5L1dvcmxkJyk7XG5cbk1hdHRlci5Db250YWN0ID0gX2RlcmVxXygnLi4vY29sbGlzaW9uL0NvbnRhY3QnKTtcbk1hdHRlci5EZXRlY3RvciA9IF9kZXJlcV8oJy4uL2NvbGxpc2lvbi9EZXRlY3RvcicpO1xuTWF0dGVyLkdyaWQgPSBfZGVyZXFfKCcuLi9jb2xsaXNpb24vR3JpZCcpO1xuTWF0dGVyLlBhaXJzID0gX2RlcmVxXygnLi4vY29sbGlzaW9uL1BhaXJzJyk7XG5NYXR0ZXIuUGFpciA9IF9kZXJlcV8oJy4uL2NvbGxpc2lvbi9QYWlyJyk7XG5NYXR0ZXIuUXVlcnkgPSBfZGVyZXFfKCcuLi9jb2xsaXNpb24vUXVlcnknKTtcbk1hdHRlci5SZXNvbHZlciA9IF9kZXJlcV8oJy4uL2NvbGxpc2lvbi9SZXNvbHZlcicpO1xuTWF0dGVyLlNBVCA9IF9kZXJlcV8oJy4uL2NvbGxpc2lvbi9TQVQnKTtcblxuTWF0dGVyLkNvbnN0cmFpbnQgPSBfZGVyZXFfKCcuLi9jb25zdHJhaW50L0NvbnN0cmFpbnQnKTtcbk1hdHRlci5Nb3VzZUNvbnN0cmFpbnQgPSBfZGVyZXFfKCcuLi9jb25zdHJhaW50L01vdXNlQ29uc3RyYWludCcpO1xuXG5NYXR0ZXIuQ29tbW9uID0gX2RlcmVxXygnLi4vY29yZS9Db21tb24nKTtcbk1hdHRlci5FbmdpbmUgPSBfZGVyZXFfKCcuLi9jb3JlL0VuZ2luZScpO1xuTWF0dGVyLkV2ZW50cyA9IF9kZXJlcV8oJy4uL2NvcmUvRXZlbnRzJyk7XG5NYXR0ZXIuTW91c2UgPSBfZGVyZXFfKCcuLi9jb3JlL01vdXNlJyk7XG5NYXR0ZXIuUnVubmVyID0gX2RlcmVxXygnLi4vY29yZS9SdW5uZXInKTtcbk1hdHRlci5TbGVlcGluZyA9IF9kZXJlcV8oJy4uL2NvcmUvU2xlZXBpbmcnKTtcbk1hdHRlci5QbHVnaW4gPSBfZGVyZXFfKCcuLi9jb3JlL1BsdWdpbicpO1xuXG5cbk1hdHRlci5Cb2RpZXMgPSBfZGVyZXFfKCcuLi9mYWN0b3J5L0JvZGllcycpO1xuTWF0dGVyLkNvbXBvc2l0ZXMgPSBfZGVyZXFfKCcuLi9mYWN0b3J5L0NvbXBvc2l0ZXMnKTtcblxuTWF0dGVyLkF4ZXMgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9BeGVzJyk7XG5NYXR0ZXIuQm91bmRzID0gX2RlcmVxXygnLi4vZ2VvbWV0cnkvQm91bmRzJyk7XG5NYXR0ZXIuU3ZnID0gX2RlcmVxXygnLi4vZ2VvbWV0cnkvU3ZnJyk7XG5NYXR0ZXIuVmVjdG9yID0gX2RlcmVxXygnLi4vZ2VvbWV0cnkvVmVjdG9yJyk7XG5NYXR0ZXIuVmVydGljZXMgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9WZXJ0aWNlcycpO1xuXG5NYXR0ZXIuUmVuZGVyID0gX2RlcmVxXygnLi4vcmVuZGVyL1JlbmRlcicpO1xuTWF0dGVyLlJlbmRlclBpeGkgPSBfZGVyZXFfKCcuLi9yZW5kZXIvUmVuZGVyUGl4aScpO1xuXG4vLyBhbGlhc2VzXG5cbk1hdHRlci5Xb3JsZC5hZGQgPSBNYXR0ZXIuQ29tcG9zaXRlLmFkZDtcbk1hdHRlci5Xb3JsZC5yZW1vdmUgPSBNYXR0ZXIuQ29tcG9zaXRlLnJlbW92ZTtcbk1hdHRlci5Xb3JsZC5hZGRDb21wb3NpdGUgPSBNYXR0ZXIuQ29tcG9zaXRlLmFkZENvbXBvc2l0ZTtcbk1hdHRlci5Xb3JsZC5hZGRCb2R5ID0gTWF0dGVyLkNvbXBvc2l0ZS5hZGRCb2R5O1xuTWF0dGVyLldvcmxkLmFkZENvbnN0cmFpbnQgPSBNYXR0ZXIuQ29tcG9zaXRlLmFkZENvbnN0cmFpbnQ7XG5NYXR0ZXIuV29ybGQuY2xlYXIgPSBNYXR0ZXIuQ29tcG9zaXRlLmNsZWFyO1xuTWF0dGVyLkVuZ2luZS5ydW4gPSBNYXR0ZXIuUnVubmVyLnJ1bjtcblxufSx7XCIuLi9ib2R5L0JvZHlcIjoxLFwiLi4vYm9keS9Db21wb3NpdGVcIjoyLFwiLi4vYm9keS9Xb3JsZFwiOjMsXCIuLi9jb2xsaXNpb24vQ29udGFjdFwiOjQsXCIuLi9jb2xsaXNpb24vRGV0ZWN0b3JcIjo1LFwiLi4vY29sbGlzaW9uL0dyaWRcIjo2LFwiLi4vY29sbGlzaW9uL1BhaXJcIjo3LFwiLi4vY29sbGlzaW9uL1BhaXJzXCI6OCxcIi4uL2NvbGxpc2lvbi9RdWVyeVwiOjksXCIuLi9jb2xsaXNpb24vUmVzb2x2ZXJcIjoxMCxcIi4uL2NvbGxpc2lvbi9TQVRcIjoxMSxcIi4uL2NvbnN0cmFpbnQvQ29uc3RyYWludFwiOjEyLFwiLi4vY29uc3RyYWludC9Nb3VzZUNvbnN0cmFpbnRcIjoxMyxcIi4uL2NvcmUvQ29tbW9uXCI6MTQsXCIuLi9jb3JlL0VuZ2luZVwiOjE1LFwiLi4vY29yZS9FdmVudHNcIjoxNixcIi4uL2NvcmUvTWF0dGVyXCI6MTcsXCIuLi9jb3JlL01ldHJpY3NcIjoxOCxcIi4uL2NvcmUvTW91c2VcIjoxOSxcIi4uL2NvcmUvUGx1Z2luXCI6MjAsXCIuLi9jb3JlL1J1bm5lclwiOjIxLFwiLi4vY29yZS9TbGVlcGluZ1wiOjIyLFwiLi4vZmFjdG9yeS9Cb2RpZXNcIjoyMyxcIi4uL2ZhY3RvcnkvQ29tcG9zaXRlc1wiOjI0LFwiLi4vZ2VvbWV0cnkvQXhlc1wiOjI1LFwiLi4vZ2VvbWV0cnkvQm91bmRzXCI6MjYsXCIuLi9nZW9tZXRyeS9TdmdcIjoyNyxcIi4uL2dlb21ldHJ5L1ZlY3RvclwiOjI4LFwiLi4vZ2VvbWV0cnkvVmVydGljZXNcIjoyOSxcIi4uL3JlbmRlci9SZW5kZXJcIjozMSxcIi4uL3JlbmRlci9SZW5kZXJQaXhpXCI6MzJ9XSwzMTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiogVGhlIGBNYXR0ZXIuUmVuZGVyYCBtb2R1bGUgaXMgYSBzaW1wbGUgSFRNTDUgY2FudmFzIGJhc2VkIHJlbmRlcmVyIGZvciB2aXN1YWxpc2luZyBpbnN0YW5jZXMgb2YgYE1hdHRlci5FbmdpbmVgLlxuKiBJdCBpcyBpbnRlbmRlZCBmb3IgZGV2ZWxvcG1lbnQgYW5kIGRlYnVnZ2luZyBwdXJwb3NlcywgYnV0IG1heSBhbHNvIGJlIHN1aXRhYmxlIGZvciBzaW1wbGUgZ2FtZXMuXG4qIEl0IGluY2x1ZGVzIGEgbnVtYmVyIG9mIGRyYXdpbmcgb3B0aW9ucyBpbmNsdWRpbmcgd2lyZWZyYW1lLCB2ZWN0b3Igd2l0aCBzdXBwb3J0IGZvciBzcHJpdGVzIGFuZCB2aWV3cG9ydHMuXG4qXG4qIEBjbGFzcyBSZW5kZXJcbiovXG5cbnZhciBSZW5kZXIgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZW5kZXI7XG5cbnZhciBDb21tb24gPSBfZGVyZXFfKCcuLi9jb3JlL0NvbW1vbicpO1xudmFyIENvbXBvc2l0ZSA9IF9kZXJlcV8oJy4uL2JvZHkvQ29tcG9zaXRlJyk7XG52YXIgQm91bmRzID0gX2RlcmVxXygnLi4vZ2VvbWV0cnkvQm91bmRzJyk7XG52YXIgRXZlbnRzID0gX2RlcmVxXygnLi4vY29yZS9FdmVudHMnKTtcbnZhciBHcmlkID0gX2RlcmVxXygnLi4vY29sbGlzaW9uL0dyaWQnKTtcbnZhciBWZWN0b3IgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9WZWN0b3InKTtcbnZhciBNb3VzZSA9IF9kZXJlcV8oJy4uL2NvcmUvTW91c2UnKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIF9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUsXG4gICAgICAgIF9jYW5jZWxBbmltYXRpb25GcmFtZTtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBfcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IGZ1bmN0aW9uKGNhbGxiYWNrKXsgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKENvbW1vbi5ub3coKSk7IH0sIDEwMDAgLyA2MCk7IH07XG5cbiAgICAgICAgX2NhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tb3pDYW5jZWxBbmltYXRpb25GcmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1zQ2FuY2VsQW5pbWF0aW9uRnJhbWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyByZW5kZXJlci4gVGhlIG9wdGlvbnMgcGFyYW1ldGVyIGlzIGFuIG9iamVjdCB0aGF0IHNwZWNpZmllcyBhbnkgcHJvcGVydGllcyB5b3Ugd2lzaCB0byBvdmVycmlkZSB0aGUgZGVmYXVsdHMuXG4gICAgICogQWxsIHByb3BlcnRpZXMgaGF2ZSBkZWZhdWx0IHZhbHVlcywgYW5kIG1hbnkgYXJlIHByZS1jYWxjdWxhdGVkIGF1dG9tYXRpY2FsbHkgYmFzZWQgb24gb3RoZXIgcHJvcGVydGllcy5cbiAgICAgKiBTZWUgdGhlIHByb3BlcnRpZXMgc2VjdGlvbiBiZWxvdyBmb3IgZGV0YWlsZWQgaW5mb3JtYXRpb24gb24gd2hhdCB5b3UgY2FuIHBhc3MgdmlhIHRoZSBgb3B0aW9uc2Agb2JqZWN0LlxuICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICAgICAqIEByZXR1cm4ge3JlbmRlcn0gQSBuZXcgcmVuZGVyZXJcbiAgICAgKi9cbiAgICBSZW5kZXIuY3JlYXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBjb250cm9sbGVyOiBSZW5kZXIsXG4gICAgICAgICAgICBlbmdpbmU6IG51bGwsXG4gICAgICAgICAgICBlbGVtZW50OiBudWxsLFxuICAgICAgICAgICAgY2FudmFzOiBudWxsLFxuICAgICAgICAgICAgbW91c2U6IG51bGwsXG4gICAgICAgICAgICBmcmFtZVJlcXVlc3RJZDogbnVsbCxcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogODAwLFxuICAgICAgICAgICAgICAgIGhlaWdodDogNjAwLFxuICAgICAgICAgICAgICAgIHBpeGVsUmF0aW86IDEsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyMxODE4MWQnLFxuICAgICAgICAgICAgICAgIHdpcmVmcmFtZUJhY2tncm91bmQ6ICcjMGYwZjEzJyxcbiAgICAgICAgICAgICAgICBoYXNCb3VuZHM6ICEhb3B0aW9ucy5ib3VuZHMsXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB3aXJlZnJhbWVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNob3dTbGVlcGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzaG93RGVidWc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dCcm9hZHBoYXNlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93Qm91bmRzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93VmVsb2NpdHk6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dDb2xsaXNpb25zOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93U2VwYXJhdGlvbnM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dBeGVzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93UG9zaXRpb25zOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93QW5nbGVJbmRpY2F0b3I6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dJZHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dTaGFkb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93VmVydGV4TnVtYmVyczogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd0NvbnZleEh1bGxzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93SW50ZXJuYWxFZGdlczogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd01vdXNlUG9zaXRpb246IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHJlbmRlciA9IENvbW1vbi5leHRlbmQoZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgICAgIGlmIChyZW5kZXIuY2FudmFzKSB7XG4gICAgICAgICAgICByZW5kZXIuY2FudmFzLndpZHRoID0gcmVuZGVyLm9wdGlvbnMud2lkdGggfHwgcmVuZGVyLmNhbnZhcy53aWR0aDtcbiAgICAgICAgICAgIHJlbmRlci5jYW52YXMuaGVpZ2h0ID0gcmVuZGVyLm9wdGlvbnMuaGVpZ2h0IHx8IHJlbmRlci5jYW52YXMuaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmVuZGVyLm1vdXNlID0gb3B0aW9ucy5tb3VzZTtcbiAgICAgICAgcmVuZGVyLmVuZ2luZSA9IG9wdGlvbnMuZW5naW5lO1xuICAgICAgICByZW5kZXIuY2FudmFzID0gcmVuZGVyLmNhbnZhcyB8fCBfY3JlYXRlQ2FudmFzKHJlbmRlci5vcHRpb25zLndpZHRoLCByZW5kZXIub3B0aW9ucy5oZWlnaHQpO1xuICAgICAgICByZW5kZXIuY29udGV4dCA9IHJlbmRlci5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgcmVuZGVyLnRleHR1cmVzID0ge307XG5cbiAgICAgICAgcmVuZGVyLmJvdW5kcyA9IHJlbmRlci5ib3VuZHMgfHwge1xuICAgICAgICAgICAgbWluOiB7XG4gICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICB5OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWF4OiB7XG4gICAgICAgICAgICAgICAgeDogcmVuZGVyLmNhbnZhcy53aWR0aCxcbiAgICAgICAgICAgICAgICB5OiByZW5kZXIuY2FudmFzLmhlaWdodFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChyZW5kZXIub3B0aW9ucy5waXhlbFJhdGlvICE9PSAxKSB7XG4gICAgICAgICAgICBSZW5kZXIuc2V0UGl4ZWxSYXRpbyhyZW5kZXIsIHJlbmRlci5vcHRpb25zLnBpeGVsUmF0aW8pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKENvbW1vbi5pc0VsZW1lbnQocmVuZGVyLmVsZW1lbnQpKSB7XG4gICAgICAgICAgICByZW5kZXIuZWxlbWVudC5hcHBlbmRDaGlsZChyZW5kZXIuY2FudmFzKTtcbiAgICAgICAgfSBlbHNlIGlmICghcmVuZGVyLmNhbnZhcy5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBDb21tb24ubG9nKCdSZW5kZXIuY3JlYXRlOiBvcHRpb25zLmVsZW1lbnQgd2FzIHVuZGVmaW5lZCwgcmVuZGVyLmNhbnZhcyB3YXMgY3JlYXRlZCBidXQgbm90IGFwcGVuZGVkJywgJ3dhcm4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZW5kZXI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbnRpbnVvdXNseSB1cGRhdGVzIHRoZSByZW5kZXIgY2FudmFzIG9uIHRoZSBgcmVxdWVzdEFuaW1hdGlvbkZyYW1lYCBldmVudC5cbiAgICAgKiBAbWV0aG9kIHJ1blxuICAgICAqIEBwYXJhbSB7cmVuZGVyfSByZW5kZXJcbiAgICAgKi9cbiAgICBSZW5kZXIucnVuID0gZnVuY3Rpb24ocmVuZGVyKSB7XG4gICAgICAgIChmdW5jdGlvbiBsb29wKHRpbWUpe1xuICAgICAgICAgICAgcmVuZGVyLmZyYW1lUmVxdWVzdElkID0gX3JlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgICAgICAgIFJlbmRlci53b3JsZChyZW5kZXIpO1xuICAgICAgICB9KSgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmRzIGV4ZWN1dGlvbiBvZiBgUmVuZGVyLnJ1bmAgb24gdGhlIGdpdmVuIGByZW5kZXJgLCBieSBjYW5jZWxpbmcgdGhlIGFuaW1hdGlvbiBmcmFtZSByZXF1ZXN0IGV2ZW50IGxvb3AuXG4gICAgICogQG1ldGhvZCBzdG9wXG4gICAgICogQHBhcmFtIHtyZW5kZXJ9IHJlbmRlclxuICAgICAqL1xuICAgIFJlbmRlci5zdG9wID0gZnVuY3Rpb24ocmVuZGVyKSB7XG4gICAgICAgIF9jYW5jZWxBbmltYXRpb25GcmFtZShyZW5kZXIuZnJhbWVSZXF1ZXN0SWQpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwaXhlbCByYXRpbyBvZiB0aGUgcmVuZGVyZXIgYW5kIHVwZGF0ZXMgdGhlIGNhbnZhcy5cbiAgICAgKiBUbyBhdXRvbWF0aWNhbGx5IGRldGVjdCB0aGUgY29ycmVjdCByYXRpbywgcGFzcyB0aGUgc3RyaW5nIGAnYXV0bydgIGZvciBgcGl4ZWxSYXRpb2AuXG4gICAgICogQG1ldGhvZCBzZXRQaXhlbFJhdGlvXG4gICAgICogQHBhcmFtIHtyZW5kZXJ9IHJlbmRlclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwaXhlbFJhdGlvXG4gICAgICovXG4gICAgUmVuZGVyLnNldFBpeGVsUmF0aW8gPSBmdW5jdGlvbihyZW5kZXIsIHBpeGVsUmF0aW8pIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSByZW5kZXIub3B0aW9ucyxcbiAgICAgICAgICAgIGNhbnZhcyA9IHJlbmRlci5jYW52YXM7XG5cbiAgICAgICAgaWYgKHBpeGVsUmF0aW8gPT09ICdhdXRvJykge1xuICAgICAgICAgICAgcGl4ZWxSYXRpbyA9IF9nZXRQaXhlbFJhdGlvKGNhbnZhcyk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zLnBpeGVsUmF0aW8gPSBwaXhlbFJhdGlvO1xuICAgICAgICBjYW52YXMuc2V0QXR0cmlidXRlKCdkYXRhLXBpeGVsLXJhdGlvJywgcGl4ZWxSYXRpbyk7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IG9wdGlvbnMud2lkdGggKiBwaXhlbFJhdGlvO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgKiBwaXhlbFJhdGlvO1xuICAgICAgICBjYW52YXMuc3R5bGUud2lkdGggPSBvcHRpb25zLndpZHRoICsgJ3B4JztcbiAgICAgICAgY2FudmFzLnN0eWxlLmhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgcmVuZGVyLmNvbnRleHQuc2NhbGUocGl4ZWxSYXRpbywgcGl4ZWxSYXRpbyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBvc2l0aW9ucyBhbmQgc2l6ZXMgdGhlIHZpZXdwb3J0IGFyb3VuZCB0aGUgZ2l2ZW4gb2JqZWN0IGJvdW5kcy5cbiAgICAgKiBPYmplY3RzIG11c3QgaGF2ZSBhdCBsZWFzdCBvbmUgb2YgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICAgICAqIC0gYG9iamVjdC5ib3VuZHNgXG4gICAgICogLSBgb2JqZWN0LnBvc2l0aW9uYFxuICAgICAqIC0gYG9iamVjdC5taW5gIGFuZCBgb2JqZWN0Lm1heGBcbiAgICAgKiAtIGBvYmplY3QueGAgYW5kIGBvYmplY3QueWBcbiAgICAgKiBAbWV0aG9kIGxvb2tBdFxuICAgICAqIEBwYXJhbSB7cmVuZGVyfSByZW5kZXJcbiAgICAgKiBAcGFyYW0ge29iamVjdFtdfSBvYmplY3RzXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IFtwYWRkaW5nXVxuICAgICAqIEBwYXJhbSB7Ym9vbH0gW2NlbnRlcj10cnVlXVxuICAgICAqL1xuICAgIFJlbmRlci5sb29rQXQgPSBmdW5jdGlvbihyZW5kZXIsIG9iamVjdHMsIHBhZGRpbmcsIGNlbnRlcikge1xuICAgICAgICBjZW50ZXIgPSB0eXBlb2YgY2VudGVyICE9PSAndW5kZWZpbmVkJyA/IGNlbnRlciA6IHRydWU7XG4gICAgICAgIG9iamVjdHMgPSBDb21tb24uaXNBcnJheShvYmplY3RzKSA/IG9iamVjdHMgOiBbb2JqZWN0c107XG4gICAgICAgIHBhZGRpbmcgPSBwYWRkaW5nIHx8IHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gZmluZCBib3VuZHMgb2YgYWxsIG9iamVjdHNcbiAgICAgICAgdmFyIGJvdW5kcyA9IHtcbiAgICAgICAgICAgIG1pbjogeyB4OiBJbmZpbml0eSwgeTogSW5maW5pdHkgfSxcbiAgICAgICAgICAgIG1heDogeyB4OiAtSW5maW5pdHksIHk6IC1JbmZpbml0eSB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0gb2JqZWN0c1tpXSxcbiAgICAgICAgICAgICAgICBtaW4gPSBvYmplY3QuYm91bmRzID8gb2JqZWN0LmJvdW5kcy5taW4gOiAob2JqZWN0Lm1pbiB8fCBvYmplY3QucG9zaXRpb24gfHwgb2JqZWN0KSxcbiAgICAgICAgICAgICAgICBtYXggPSBvYmplY3QuYm91bmRzID8gb2JqZWN0LmJvdW5kcy5tYXggOiAob2JqZWN0Lm1heCB8fCBvYmplY3QucG9zaXRpb24gfHwgb2JqZWN0KTtcblxuICAgICAgICAgICAgaWYgKG1pbiAmJiBtYXgpIHtcbiAgICAgICAgICAgICAgICBpZiAobWluLnggPCBib3VuZHMubWluLngpXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kcy5taW4ueCA9IG1pbi54O1xuXG4gICAgICAgICAgICAgICAgaWYgKG1heC54ID4gYm91bmRzLm1heC54KVxuICAgICAgICAgICAgICAgICAgICBib3VuZHMubWF4LnggPSBtYXgueDtcblxuICAgICAgICAgICAgICAgIGlmIChtaW4ueSA8IGJvdW5kcy5taW4ueSlcbiAgICAgICAgICAgICAgICAgICAgYm91bmRzLm1pbi55ID0gbWluLnk7XG5cbiAgICAgICAgICAgICAgICBpZiAobWF4LnkgPiBib3VuZHMubWF4LnkpXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kcy5tYXgueSA9IG1heC55O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmluZCByYXRpb3NcbiAgICAgICAgdmFyIHdpZHRoID0gKGJvdW5kcy5tYXgueCAtIGJvdW5kcy5taW4ueCkgKyAyICogcGFkZGluZy54LFxuICAgICAgICAgICAgaGVpZ2h0ID0gKGJvdW5kcy5tYXgueSAtIGJvdW5kcy5taW4ueSkgKyAyICogcGFkZGluZy55LFxuICAgICAgICAgICAgdmlld0hlaWdodCA9IHJlbmRlci5jYW52YXMuaGVpZ2h0LFxuICAgICAgICAgICAgdmlld1dpZHRoID0gcmVuZGVyLmNhbnZhcy53aWR0aCxcbiAgICAgICAgICAgIG91dGVyUmF0aW8gPSB2aWV3V2lkdGggLyB2aWV3SGVpZ2h0LFxuICAgICAgICAgICAgaW5uZXJSYXRpbyA9IHdpZHRoIC8gaGVpZ2h0LFxuICAgICAgICAgICAgc2NhbGVYID0gMSxcbiAgICAgICAgICAgIHNjYWxlWSA9IDE7XG5cbiAgICAgICAgLy8gZmluZCBzY2FsZSBmYWN0b3JcbiAgICAgICAgaWYgKGlubmVyUmF0aW8gPiBvdXRlclJhdGlvKSB7XG4gICAgICAgICAgICBzY2FsZVkgPSBpbm5lclJhdGlvIC8gb3V0ZXJSYXRpbztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNjYWxlWCA9IG91dGVyUmF0aW8gLyBpbm5lclJhdGlvO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZW5hYmxlIGJvdW5kc1xuICAgICAgICByZW5kZXIub3B0aW9ucy5oYXNCb3VuZHMgPSB0cnVlO1xuXG4gICAgICAgIC8vIHBvc2l0aW9uIGFuZCBzaXplXG4gICAgICAgIHJlbmRlci5ib3VuZHMubWluLnggPSBib3VuZHMubWluLng7XG4gICAgICAgIHJlbmRlci5ib3VuZHMubWF4LnggPSBib3VuZHMubWluLnggKyB3aWR0aCAqIHNjYWxlWDtcbiAgICAgICAgcmVuZGVyLmJvdW5kcy5taW4ueSA9IGJvdW5kcy5taW4ueTtcbiAgICAgICAgcmVuZGVyLmJvdW5kcy5tYXgueSA9IGJvdW5kcy5taW4ueSArIGhlaWdodCAqIHNjYWxlWTtcblxuICAgICAgICAvLyBjZW50ZXJcbiAgICAgICAgaWYgKGNlbnRlcikge1xuICAgICAgICAgICAgcmVuZGVyLmJvdW5kcy5taW4ueCArPSB3aWR0aCAqIDAuNSAtICh3aWR0aCAqIHNjYWxlWCkgKiAwLjU7XG4gICAgICAgICAgICByZW5kZXIuYm91bmRzLm1heC54ICs9IHdpZHRoICogMC41IC0gKHdpZHRoICogc2NhbGVYKSAqIDAuNTtcbiAgICAgICAgICAgIHJlbmRlci5ib3VuZHMubWluLnkgKz0gaGVpZ2h0ICogMC41IC0gKGhlaWdodCAqIHNjYWxlWSkgKiAwLjU7XG4gICAgICAgICAgICByZW5kZXIuYm91bmRzLm1heC55ICs9IGhlaWdodCAqIDAuNSAtIChoZWlnaHQgKiBzY2FsZVkpICogMC41O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcGFkZGluZ1xuICAgICAgICByZW5kZXIuYm91bmRzLm1pbi54IC09IHBhZGRpbmcueDtcbiAgICAgICAgcmVuZGVyLmJvdW5kcy5tYXgueCAtPSBwYWRkaW5nLng7XG4gICAgICAgIHJlbmRlci5ib3VuZHMubWluLnkgLT0gcGFkZGluZy55O1xuICAgICAgICByZW5kZXIuYm91bmRzLm1heC55IC09IHBhZGRpbmcueTtcblxuICAgICAgICAvLyB1cGRhdGUgbW91c2VcbiAgICAgICAgaWYgKHJlbmRlci5tb3VzZSkge1xuICAgICAgICAgICAgTW91c2Uuc2V0U2NhbGUocmVuZGVyLm1vdXNlLCB7XG4gICAgICAgICAgICAgICAgeDogKHJlbmRlci5ib3VuZHMubWF4LnggLSByZW5kZXIuYm91bmRzLm1pbi54KSAvIHJlbmRlci5jYW52YXMud2lkdGgsXG4gICAgICAgICAgICAgICAgeTogKHJlbmRlci5ib3VuZHMubWF4LnkgLSByZW5kZXIuYm91bmRzLm1pbi55KSAvIHJlbmRlci5jYW52YXMuaGVpZ2h0XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgTW91c2Uuc2V0T2Zmc2V0KHJlbmRlci5tb3VzZSwgcmVuZGVyLmJvdW5kcy5taW4pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgdmlld3BvcnQgdHJhbnNmb3JtcyBiYXNlZCBvbiBgcmVuZGVyLmJvdW5kc2AgdG8gYSByZW5kZXIgY29udGV4dC5cbiAgICAgKiBAbWV0aG9kIHN0YXJ0Vmlld1RyYW5zZm9ybVxuICAgICAqIEBwYXJhbSB7cmVuZGVyfSByZW5kZXJcbiAgICAgKi9cbiAgICBSZW5kZXIuc3RhcnRWaWV3VHJhbnNmb3JtID0gZnVuY3Rpb24ocmVuZGVyKSB7XG4gICAgICAgIHZhciBib3VuZHNXaWR0aCA9IHJlbmRlci5ib3VuZHMubWF4LnggLSByZW5kZXIuYm91bmRzLm1pbi54LFxuICAgICAgICAgICAgYm91bmRzSGVpZ2h0ID0gcmVuZGVyLmJvdW5kcy5tYXgueSAtIHJlbmRlci5ib3VuZHMubWluLnksXG4gICAgICAgICAgICBib3VuZHNTY2FsZVggPSBib3VuZHNXaWR0aCAvIHJlbmRlci5vcHRpb25zLndpZHRoLFxuICAgICAgICAgICAgYm91bmRzU2NhbGVZID0gYm91bmRzSGVpZ2h0IC8gcmVuZGVyLm9wdGlvbnMuaGVpZ2h0O1xuXG4gICAgICAgIHJlbmRlci5jb250ZXh0LnNjYWxlKDEgLyBib3VuZHNTY2FsZVgsIDEgLyBib3VuZHNTY2FsZVkpO1xuICAgICAgICByZW5kZXIuY29udGV4dC50cmFuc2xhdGUoLXJlbmRlci5ib3VuZHMubWluLngsIC1yZW5kZXIuYm91bmRzLm1pbi55KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVzZXRzIGFsbCB0cmFuc2Zvcm1zIG9uIHRoZSByZW5kZXIgY29udGV4dC5cbiAgICAgKiBAbWV0aG9kIGVuZFZpZXdUcmFuc2Zvcm1cbiAgICAgKiBAcGFyYW0ge3JlbmRlcn0gcmVuZGVyXG4gICAgICovXG4gICAgUmVuZGVyLmVuZFZpZXdUcmFuc2Zvcm0gPSBmdW5jdGlvbihyZW5kZXIpIHtcbiAgICAgICAgcmVuZGVyLmNvbnRleHQuc2V0VHJhbnNmb3JtKHJlbmRlci5vcHRpb25zLnBpeGVsUmF0aW8sIDAsIDAsIHJlbmRlci5vcHRpb25zLnBpeGVsUmF0aW8sIDAsIDApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIHRoZSBnaXZlbiBgZW5naW5lYCdzIGBNYXR0ZXIuV29ybGRgIG9iamVjdC5cbiAgICAgKiBUaGlzIGlzIHRoZSBlbnRyeSBwb2ludCBmb3IgYWxsIHJlbmRlcmluZyBhbmQgc2hvdWxkIGJlIGNhbGxlZCBldmVyeSB0aW1lIHRoZSBzY2VuZSBjaGFuZ2VzLlxuICAgICAqIEBtZXRob2Qgd29ybGRcbiAgICAgKiBAcGFyYW0ge3JlbmRlcn0gcmVuZGVyXG4gICAgICovXG4gICAgUmVuZGVyLndvcmxkID0gZnVuY3Rpb24ocmVuZGVyKSB7XG4gICAgICAgIHZhciBlbmdpbmUgPSByZW5kZXIuZW5naW5lLFxuICAgICAgICAgICAgd29ybGQgPSBlbmdpbmUud29ybGQsXG4gICAgICAgICAgICBjYW52YXMgPSByZW5kZXIuY2FudmFzLFxuICAgICAgICAgICAgY29udGV4dCA9IHJlbmRlci5jb250ZXh0LFxuICAgICAgICAgICAgb3B0aW9ucyA9IHJlbmRlci5vcHRpb25zLFxuICAgICAgICAgICAgYWxsQm9kaWVzID0gQ29tcG9zaXRlLmFsbEJvZGllcyh3b3JsZCksXG4gICAgICAgICAgICBhbGxDb25zdHJhaW50cyA9IENvbXBvc2l0ZS5hbGxDb25zdHJhaW50cyh3b3JsZCksXG4gICAgICAgICAgICBiYWNrZ3JvdW5kID0gb3B0aW9ucy53aXJlZnJhbWVzID8gb3B0aW9ucy53aXJlZnJhbWVCYWNrZ3JvdW5kIDogb3B0aW9ucy5iYWNrZ3JvdW5kLFxuICAgICAgICAgICAgYm9kaWVzID0gW10sXG4gICAgICAgICAgICBjb25zdHJhaW50cyA9IFtdLFxuICAgICAgICAgICAgaTtcblxuICAgICAgICB2YXIgZXZlbnQgPSB7XG4gICAgICAgICAgICB0aW1lc3RhbXA6IGVuZ2luZS50aW1pbmcudGltZXN0YW1wXG4gICAgICAgIH07XG5cbiAgICAgICAgRXZlbnRzLnRyaWdnZXIocmVuZGVyLCAnYmVmb3JlUmVuZGVyJywgZXZlbnQpO1xuXG4gICAgICAgIC8vIGFwcGx5IGJhY2tncm91bmQgaWYgaXQgaGFzIGNoYW5nZWRcbiAgICAgICAgaWYgKHJlbmRlci5jdXJyZW50QmFja2dyb3VuZCAhPT0gYmFja2dyb3VuZClcbiAgICAgICAgICAgIF9hcHBseUJhY2tncm91bmQocmVuZGVyLCBiYWNrZ3JvdW5kKTtcblxuICAgICAgICAvLyBjbGVhciB0aGUgY2FudmFzIHdpdGggYSB0cmFuc3BhcmVudCBmaWxsLCB0byBhbGxvdyB0aGUgY2FudmFzIGJhY2tncm91bmQgdG8gc2hvd1xuICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2UtaW4nO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwidHJhbnNwYXJlbnRcIjtcbiAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3Zlcic7XG5cbiAgICAgICAgLy8gaGFuZGxlIGJvdW5kc1xuICAgICAgICBpZiAob3B0aW9ucy5oYXNCb3VuZHMpIHtcbiAgICAgICAgICAgIC8vIGZpbHRlciBvdXQgYm9kaWVzIHRoYXQgYXJlIG5vdCBpbiB2aWV3XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYWxsQm9kaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJvZHkgPSBhbGxCb2RpZXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKEJvdW5kcy5vdmVybGFwcyhib2R5LmJvdW5kcywgcmVuZGVyLmJvdW5kcykpXG4gICAgICAgICAgICAgICAgICAgIGJvZGllcy5wdXNoKGJvZHkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBmaWx0ZXIgb3V0IGNvbnN0cmFpbnRzIHRoYXQgYXJlIG5vdCBpbiB2aWV3XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYWxsQ29uc3RyYWludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY29uc3RyYWludCA9IGFsbENvbnN0cmFpbnRzW2ldLFxuICAgICAgICAgICAgICAgICAgICBib2R5QSA9IGNvbnN0cmFpbnQuYm9keUEsXG4gICAgICAgICAgICAgICAgICAgIGJvZHlCID0gY29uc3RyYWludC5ib2R5QixcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRBV29ybGQgPSBjb25zdHJhaW50LnBvaW50QSxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRCV29ybGQgPSBjb25zdHJhaW50LnBvaW50QjtcblxuICAgICAgICAgICAgICAgIGlmIChib2R5QSkgcG9pbnRBV29ybGQgPSBWZWN0b3IuYWRkKGJvZHlBLnBvc2l0aW9uLCBjb25zdHJhaW50LnBvaW50QSk7XG4gICAgICAgICAgICAgICAgaWYgKGJvZHlCKSBwb2ludEJXb3JsZCA9IFZlY3Rvci5hZGQoYm9keUIucG9zaXRpb24sIGNvbnN0cmFpbnQucG9pbnRCKTtcblxuICAgICAgICAgICAgICAgIGlmICghcG9pbnRBV29ybGQgfHwgIXBvaW50QldvcmxkKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGlmIChCb3VuZHMuY29udGFpbnMocmVuZGVyLmJvdW5kcywgcG9pbnRBV29ybGQpIHx8IEJvdW5kcy5jb250YWlucyhyZW5kZXIuYm91bmRzLCBwb2ludEJXb3JsZCkpXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0cmFpbnRzLnB1c2goY29uc3RyYWludCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHRyYW5zZm9ybSB0aGUgdmlld1xuICAgICAgICAgICAgUmVuZGVyLnN0YXJ0Vmlld1RyYW5zZm9ybShyZW5kZXIpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgbW91c2VcbiAgICAgICAgICAgIGlmIChyZW5kZXIubW91c2UpIHtcbiAgICAgICAgICAgICAgICBNb3VzZS5zZXRTY2FsZShyZW5kZXIubW91c2UsIHtcbiAgICAgICAgICAgICAgICAgICAgeDogKHJlbmRlci5ib3VuZHMubWF4LnggLSByZW5kZXIuYm91bmRzLm1pbi54KSAvIHJlbmRlci5jYW52YXMud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIHk6IChyZW5kZXIuYm91bmRzLm1heC55IC0gcmVuZGVyLmJvdW5kcy5taW4ueSkgLyByZW5kZXIuY2FudmFzLmhlaWdodFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgTW91c2Uuc2V0T2Zmc2V0KHJlbmRlci5tb3VzZSwgcmVuZGVyLmJvdW5kcy5taW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3RyYWludHMgPSBhbGxDb25zdHJhaW50cztcbiAgICAgICAgICAgIGJvZGllcyA9IGFsbEJvZGllcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghb3B0aW9ucy53aXJlZnJhbWVzIHx8IChlbmdpbmUuZW5hYmxlU2xlZXBpbmcgJiYgb3B0aW9ucy5zaG93U2xlZXBpbmcpKSB7XG4gICAgICAgICAgICAvLyBmdWxseSBmZWF0dXJlZCByZW5kZXJpbmcgb2YgYm9kaWVzXG4gICAgICAgICAgICBSZW5kZXIuYm9kaWVzKHJlbmRlciwgYm9kaWVzLCBjb250ZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dDb252ZXhIdWxscylcbiAgICAgICAgICAgICAgICBSZW5kZXIuYm9keUNvbnZleEh1bGxzKHJlbmRlciwgYm9kaWVzLCBjb250ZXh0KTtcblxuICAgICAgICAgICAgLy8gb3B0aW1pc2VkIG1ldGhvZCBmb3Igd2lyZWZyYW1lcyBvbmx5XG4gICAgICAgICAgICBSZW5kZXIuYm9keVdpcmVmcmFtZXMocmVuZGVyLCBib2RpZXMsIGNvbnRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuc2hvd0JvdW5kcylcbiAgICAgICAgICAgIFJlbmRlci5ib2R5Qm91bmRzKHJlbmRlciwgYm9kaWVzLCBjb250ZXh0KTtcblxuICAgICAgICBpZiAob3B0aW9ucy5zaG93QXhlcyB8fCBvcHRpb25zLnNob3dBbmdsZUluZGljYXRvcilcbiAgICAgICAgICAgIFJlbmRlci5ib2R5QXhlcyhyZW5kZXIsIGJvZGllcywgY29udGV4dCk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuc2hvd1Bvc2l0aW9ucylcbiAgICAgICAgICAgIFJlbmRlci5ib2R5UG9zaXRpb25zKHJlbmRlciwgYm9kaWVzLCBjb250ZXh0KTtcblxuICAgICAgICBpZiAob3B0aW9ucy5zaG93VmVsb2NpdHkpXG4gICAgICAgICAgICBSZW5kZXIuYm9keVZlbG9jaXR5KHJlbmRlciwgYm9kaWVzLCBjb250ZXh0KTtcblxuICAgICAgICBpZiAob3B0aW9ucy5zaG93SWRzKVxuICAgICAgICAgICAgUmVuZGVyLmJvZHlJZHMocmVuZGVyLCBib2RpZXMsIGNvbnRleHQpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLnNob3dTZXBhcmF0aW9ucylcbiAgICAgICAgICAgIFJlbmRlci5zZXBhcmF0aW9ucyhyZW5kZXIsIGVuZ2luZS5wYWlycy5saXN0LCBjb250ZXh0KTtcblxuICAgICAgICBpZiAob3B0aW9ucy5zaG93Q29sbGlzaW9ucylcbiAgICAgICAgICAgIFJlbmRlci5jb2xsaXNpb25zKHJlbmRlciwgZW5naW5lLnBhaXJzLmxpc3QsIGNvbnRleHQpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLnNob3dWZXJ0ZXhOdW1iZXJzKVxuICAgICAgICAgICAgUmVuZGVyLnZlcnRleE51bWJlcnMocmVuZGVyLCBib2RpZXMsIGNvbnRleHQpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLnNob3dNb3VzZVBvc2l0aW9uKVxuICAgICAgICAgICAgUmVuZGVyLm1vdXNlUG9zaXRpb24ocmVuZGVyLCByZW5kZXIubW91c2UsIGNvbnRleHQpO1xuXG4gICAgICAgIFJlbmRlci5jb25zdHJhaW50cyhjb25zdHJhaW50cywgY29udGV4dCk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuc2hvd0Jyb2FkcGhhc2UgJiYgZW5naW5lLmJyb2FkcGhhc2UuY29udHJvbGxlciA9PT0gR3JpZClcbiAgICAgICAgICAgIFJlbmRlci5ncmlkKHJlbmRlciwgZW5naW5lLmJyb2FkcGhhc2UsIGNvbnRleHQpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLnNob3dEZWJ1ZylcbiAgICAgICAgICAgIFJlbmRlci5kZWJ1ZyhyZW5kZXIsIGNvbnRleHQpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLmhhc0JvdW5kcykge1xuICAgICAgICAgICAgLy8gcmV2ZXJ0IHZpZXcgdHJhbnNmb3Jtc1xuICAgICAgICAgICAgUmVuZGVyLmVuZFZpZXdUcmFuc2Zvcm0ocmVuZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEV2ZW50cy50cmlnZ2VyKHJlbmRlciwgJ2FmdGVyUmVuZGVyJywgZXZlbnQpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZXNjcmlwdGlvblxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZCBkZWJ1Z1xuICAgICAqIEBwYXJhbSB7cmVuZGVyfSByZW5kZXJcbiAgICAgKiBAcGFyYW0ge1JlbmRlcmluZ0NvbnRleHR9IGNvbnRleHRcbiAgICAgKi9cbiAgICBSZW5kZXIuZGVidWcgPSBmdW5jdGlvbihyZW5kZXIsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGMgPSBjb250ZXh0LFxuICAgICAgICAgICAgZW5naW5lID0gcmVuZGVyLmVuZ2luZSxcbiAgICAgICAgICAgIHdvcmxkID0gZW5naW5lLndvcmxkLFxuICAgICAgICAgICAgbWV0cmljcyA9IGVuZ2luZS5tZXRyaWNzLFxuICAgICAgICAgICAgb3B0aW9ucyA9IHJlbmRlci5vcHRpb25zLFxuICAgICAgICAgICAgYm9kaWVzID0gQ29tcG9zaXRlLmFsbEJvZGllcyh3b3JsZCksXG4gICAgICAgICAgICBzcGFjZSA9IFwiICAgIFwiO1xuXG4gICAgICAgIGlmIChlbmdpbmUudGltaW5nLnRpbWVzdGFtcCAtIChyZW5kZXIuZGVidWdUaW1lc3RhbXAgfHwgMCkgPj0gNTAwKSB7XG4gICAgICAgICAgICB2YXIgdGV4dCA9IFwiXCI7XG5cbiAgICAgICAgICAgIGlmIChtZXRyaWNzLnRpbWluZykge1xuICAgICAgICAgICAgICAgIHRleHQgKz0gXCJmcHM6IFwiICsgTWF0aC5yb3VuZChtZXRyaWNzLnRpbWluZy5mcHMpICsgc3BhY2U7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgcmVuZGVyLmRlYnVnU3RyaW5nID0gdGV4dDtcbiAgICAgICAgICAgIHJlbmRlci5kZWJ1Z1RpbWVzdGFtcCA9IGVuZ2luZS50aW1pbmcudGltZXN0YW1wO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlbmRlci5kZWJ1Z1N0cmluZykge1xuICAgICAgICAgICAgYy5mb250ID0gXCIxMnB4IEFyaWFsXCI7XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLndpcmVmcmFtZXMpIHtcbiAgICAgICAgICAgICAgICBjLmZpbGxTdHlsZSA9ICdyZ2JhKDI1NSwyNTUsMjU1LDAuNSknO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjLmZpbGxTdHlsZSA9ICdyZ2JhKDAsMCwwLDAuNSknO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc3BsaXQgPSByZW5kZXIuZGVidWdTdHJpbmcuc3BsaXQoJ1xcbicpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNwbGl0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYy5maWxsVGV4dChzcGxpdFtpXSwgNTAsIDUwICsgaSAqIDE4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZXNjcmlwdGlvblxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZCBjb25zdHJhaW50c1xuICAgICAqIEBwYXJhbSB7Y29uc3RyYWludFtdfSBjb25zdHJhaW50c1xuICAgICAqIEBwYXJhbSB7UmVuZGVyaW5nQ29udGV4dH0gY29udGV4dFxuICAgICAqL1xuICAgIFJlbmRlci5jb25zdHJhaW50cyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBjID0gY29udGV4dDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnN0cmFpbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY29uc3RyYWludCA9IGNvbnN0cmFpbnRzW2ldO1xuXG4gICAgICAgICAgICBpZiAoIWNvbnN0cmFpbnQucmVuZGVyLnZpc2libGUgfHwgIWNvbnN0cmFpbnQucG9pbnRBIHx8ICFjb25zdHJhaW50LnBvaW50QilcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgdmFyIGJvZHlBID0gY29uc3RyYWludC5ib2R5QSxcbiAgICAgICAgICAgICAgICBib2R5QiA9IGNvbnN0cmFpbnQuYm9keUIsXG4gICAgICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICAgICAgZW5kO1xuXG4gICAgICAgICAgICBpZiAoYm9keUEpIHtcbiAgICAgICAgICAgICAgICBzdGFydCA9IFZlY3Rvci5hZGQoYm9keUEucG9zaXRpb24sIGNvbnN0cmFpbnQucG9pbnRBKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhcnQgPSBjb25zdHJhaW50LnBvaW50QTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvbnN0cmFpbnQucmVuZGVyLnR5cGUgPT09ICdwaW4nKSB7XG4gICAgICAgICAgICAgICAgYy5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjLmFyYyhzdGFydC54LCBzdGFydC55LCAzLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICAgICAgICAgICAgYy5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGJvZHlCKSB7XG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IFZlY3Rvci5hZGQoYm9keUIucG9zaXRpb24sIGNvbnN0cmFpbnQucG9pbnRCKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbmQgPSBjb25zdHJhaW50LnBvaW50QjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjLmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGMubW92ZVRvKHN0YXJ0LngsIHN0YXJ0LnkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNvbnN0cmFpbnQucmVuZGVyLnR5cGUgPT09ICdzcHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWx0YSA9IFZlY3Rvci5zdWIoZW5kLCBzdGFydCksXG4gICAgICAgICAgICAgICAgICAgICAgICBub3JtYWwgPSBWZWN0b3IucGVycChWZWN0b3Iubm9ybWFsaXNlKGRlbHRhKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2lscyA9IE1hdGguY2VpbChDb21tb24uY2xhbXAoY29uc3RyYWludC5sZW5ndGggLyA1LCAxMiwgMjApKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldDtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IGNvaWxzOyBqICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IGogJSAyID09PSAwID8gMSA6IC0xO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjLmxpbmVUbyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydC54ICsgZGVsdGEueCAqIChqIC8gY29pbHMpICsgbm9ybWFsLnggKiBvZmZzZXQgKiA0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0LnkgKyBkZWx0YS55ICogKGogLyBjb2lscykgKyBub3JtYWwueSAqIG9mZnNldCAqIDRcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjLmxpbmVUbyhlbmQueCwgZW5kLnkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29uc3RyYWludC5yZW5kZXIubGluZVdpZHRoKSB7XG4gICAgICAgICAgICAgICAgYy5saW5lV2lkdGggPSBjb25zdHJhaW50LnJlbmRlci5saW5lV2lkdGg7XG4gICAgICAgICAgICAgICAgYy5zdHJva2VTdHlsZSA9IGNvbnN0cmFpbnQucmVuZGVyLnN0cm9rZVN0eWxlO1xuICAgICAgICAgICAgICAgIGMuc3Ryb2tlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb25zdHJhaW50LnJlbmRlci5hbmNob3JzKSB7XG4gICAgICAgICAgICAgICAgYy5maWxsU3R5bGUgPSBjb25zdHJhaW50LnJlbmRlci5zdHJva2VTdHlsZTtcbiAgICAgICAgICAgICAgICBjLmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGMuYXJjKHN0YXJ0LngsIHN0YXJ0LnksIDMsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgICAgICAgICBjLmFyYyhlbmQueCwgZW5kLnksIDMsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgICAgICAgICBjLmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgICAgIGMuZmlsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlc2NyaXB0aW9uXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIGJvZHlTaGFkb3dzXG4gICAgICogQHBhcmFtIHtyZW5kZXJ9IHJlbmRlclxuICAgICAqIEBwYXJhbSB7Ym9keVtdfSBib2RpZXNcbiAgICAgKiBAcGFyYW0ge1JlbmRlcmluZ0NvbnRleHR9IGNvbnRleHRcbiAgICAgKi9cbiAgICBSZW5kZXIuYm9keVNoYWRvd3MgPSBmdW5jdGlvbihyZW5kZXIsIGJvZGllcywgY29udGV4dCkge1xuICAgICAgICB2YXIgYyA9IGNvbnRleHQsXG4gICAgICAgICAgICBlbmdpbmUgPSByZW5kZXIuZW5naW5lO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm9kaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYm9keSA9IGJvZGllc1tpXTtcblxuICAgICAgICAgICAgaWYgKCFib2R5LnJlbmRlci52aXNpYmxlKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBpZiAoYm9keS5jaXJjbGVSYWRpdXMpIHtcbiAgICAgICAgICAgICAgICBjLmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGMuYXJjKGJvZHkucG9zaXRpb24ueCwgYm9keS5wb3NpdGlvbi55LCBib2R5LmNpcmNsZVJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICAgICAgICAgIGMuY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGMuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgYy5tb3ZlVG8oYm9keS52ZXJ0aWNlc1swXS54LCBib2R5LnZlcnRpY2VzWzBdLnkpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgYm9keS52ZXJ0aWNlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjLmxpbmVUbyhib2R5LnZlcnRpY2VzW2pdLngsIGJvZHkudmVydGljZXNbal0ueSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGMuY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkaXN0YW5jZVggPSBib2R5LnBvc2l0aW9uLnggLSByZW5kZXIub3B0aW9ucy53aWR0aCAqIDAuNSxcbiAgICAgICAgICAgICAgICBkaXN0YW5jZVkgPSBib2R5LnBvc2l0aW9uLnkgLSByZW5kZXIub3B0aW9ucy5oZWlnaHQgKiAwLjIsXG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBNYXRoLmFicyhkaXN0YW5jZVgpICsgTWF0aC5hYnMoZGlzdGFuY2VZKTtcblxuICAgICAgICAgICAgYy5zaGFkb3dDb2xvciA9ICdyZ2JhKDAsMCwwLDAuMTUpJztcbiAgICAgICAgICAgIGMuc2hhZG93T2Zmc2V0WCA9IDAuMDUgKiBkaXN0YW5jZVg7XG4gICAgICAgICAgICBjLnNoYWRvd09mZnNldFkgPSAwLjA1ICogZGlzdGFuY2VZO1xuICAgICAgICAgICAgYy5zaGFkb3dCbHVyID0gMSArIDEyICogTWF0aC5taW4oMSwgZGlzdGFuY2UgLyAxMDAwKTtcblxuICAgICAgICAgICAgYy5maWxsKCk7XG5cbiAgICAgICAgICAgIGMuc2hhZG93Q29sb3IgPSBudWxsO1xuICAgICAgICAgICAgYy5zaGFkb3dPZmZzZXRYID0gbnVsbDtcbiAgICAgICAgICAgIGMuc2hhZG93T2Zmc2V0WSA9IG51bGw7XG4gICAgICAgICAgICBjLnNoYWRvd0JsdXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlc2NyaXB0aW9uXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIGJvZGllc1xuICAgICAqIEBwYXJhbSB7cmVuZGVyfSByZW5kZXJcbiAgICAgKiBAcGFyYW0ge2JvZHlbXX0gYm9kaWVzXG4gICAgICogQHBhcmFtIHtSZW5kZXJpbmdDb250ZXh0fSBjb250ZXh0XG4gICAgICovXG4gICAgUmVuZGVyLmJvZGllcyA9IGZ1bmN0aW9uKHJlbmRlciwgYm9kaWVzLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBjID0gY29udGV4dCxcbiAgICAgICAgICAgIGVuZ2luZSA9IHJlbmRlci5lbmdpbmUsXG4gICAgICAgICAgICBvcHRpb25zID0gcmVuZGVyLm9wdGlvbnMsXG4gICAgICAgICAgICBzaG93SW50ZXJuYWxFZGdlcyA9IG9wdGlvbnMuc2hvd0ludGVybmFsRWRnZXMgfHwgIW9wdGlvbnMud2lyZWZyYW1lcyxcbiAgICAgICAgICAgIGJvZHksXG4gICAgICAgICAgICBwYXJ0LFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIGs7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGJvZGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYm9keSA9IGJvZGllc1tpXTtcblxuICAgICAgICAgICAgaWYgKCFib2R5LnJlbmRlci52aXNpYmxlKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAvLyBoYW5kbGUgY29tcG91bmQgcGFydHNcbiAgICAgICAgICAgIGZvciAoayA9IGJvZHkucGFydHMubGVuZ3RoID4gMSA/IDEgOiAwOyBrIDwgYm9keS5wYXJ0cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgIHBhcnQgPSBib2R5LnBhcnRzW2tdO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFwYXJ0LnJlbmRlci52aXNpYmxlKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dTbGVlcGluZyAmJiBib2R5LmlzU2xlZXBpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgYy5nbG9iYWxBbHBoYSA9IDAuNSAqIHBhcnQucmVuZGVyLm9wYWNpdHk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJ0LnJlbmRlci5vcGFjaXR5ICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGMuZ2xvYmFsQWxwaGEgPSBwYXJ0LnJlbmRlci5vcGFjaXR5O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChwYXJ0LnJlbmRlci5zcHJpdGUgJiYgcGFydC5yZW5kZXIuc3ByaXRlLnRleHR1cmUgJiYgIW9wdGlvbnMud2lyZWZyYW1lcykge1xuICAgICAgICAgICAgICAgICAgICAvLyBwYXJ0IHNwcml0ZVxuICAgICAgICAgICAgICAgICAgICB2YXIgc3ByaXRlID0gcGFydC5yZW5kZXIuc3ByaXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dHVyZSA9IF9nZXRUZXh0dXJlKHJlbmRlciwgc3ByaXRlLnRleHR1cmUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGMudHJhbnNsYXRlKHBhcnQucG9zaXRpb24ueCwgcGFydC5wb3NpdGlvbi55KTtcbiAgICAgICAgICAgICAgICAgICAgYy5yb3RhdGUocGFydC5hbmdsZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgYy5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dHVyZS53aWR0aCAqIC1zcHJpdGUueE9mZnNldCAqIHNwcml0ZS54U2NhbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlLmhlaWdodCAqIC1zcHJpdGUueU9mZnNldCAqIHNwcml0ZS55U2NhbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlLndpZHRoICogc3ByaXRlLnhTY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmUuaGVpZ2h0ICogc3ByaXRlLnlTY2FsZVxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJldmVydCB0cmFuc2xhdGlvbiwgaG9wZWZ1bGx5IGZhc3RlciB0aGFuIHNhdmUgLyByZXN0b3JlXG4gICAgICAgICAgICAgICAgICAgIGMucm90YXRlKC1wYXJ0LmFuZ2xlKTtcbiAgICAgICAgICAgICAgICAgICAgYy50cmFuc2xhdGUoLXBhcnQucG9zaXRpb24ueCwgLXBhcnQucG9zaXRpb24ueSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcGFydCBwb2x5Z29uXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJ0LmNpcmNsZVJhZGl1cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYy5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMuYXJjKHBhcnQucG9zaXRpb24ueCwgcGFydC5wb3NpdGlvbi55LCBwYXJ0LmNpcmNsZVJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYy5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMubW92ZVRvKHBhcnQudmVydGljZXNbMF0ueCwgcGFydC52ZXJ0aWNlc1swXS55KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCBwYXJ0LnZlcnRpY2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXJ0LnZlcnRpY2VzW2ogLSAxXS5pc0ludGVybmFsIHx8IHNob3dJbnRlcm5hbEVkZ2VzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMubGluZVRvKHBhcnQudmVydGljZXNbal0ueCwgcGFydC52ZXJ0aWNlc1tqXS55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLm1vdmVUbyhwYXJ0LnZlcnRpY2VzW2pdLngsIHBhcnQudmVydGljZXNbal0ueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnQudmVydGljZXNbal0uaXNJbnRlcm5hbCAmJiAhc2hvd0ludGVybmFsRWRnZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYy5tb3ZlVG8ocGFydC52ZXJ0aWNlc1soaiArIDEpICUgcGFydC52ZXJ0aWNlcy5sZW5ndGhdLngsIHBhcnQudmVydGljZXNbKGogKyAxKSAlIHBhcnQudmVydGljZXMubGVuZ3RoXS55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGMubGluZVRvKHBhcnQudmVydGljZXNbMF0ueCwgcGFydC52ZXJ0aWNlc1swXS55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMuY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMud2lyZWZyYW1lcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYy5maWxsU3R5bGUgPSBwYXJ0LnJlbmRlci5maWxsU3R5bGU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJ0LnJlbmRlci5saW5lV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLmxpbmVXaWR0aCA9IHBhcnQucmVuZGVyLmxpbmVXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLnN0cm9rZVN0eWxlID0gcGFydC5yZW5kZXIuc3Ryb2tlU3R5bGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYy5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgYy5maWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjLmxpbmVXaWR0aCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBjLnN0cm9rZVN0eWxlID0gJyNiYmInO1xuICAgICAgICAgICAgICAgICAgICAgICAgYy5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGMuZ2xvYmFsQWxwaGEgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIE9wdGltaXNlZCBtZXRob2QgZm9yIGRyYXdpbmcgYm9keSB3aXJlZnJhbWVzIGluIG9uZSBwYXNzXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIGJvZHlXaXJlZnJhbWVzXG4gICAgICogQHBhcmFtIHtyZW5kZXJ9IHJlbmRlclxuICAgICAqIEBwYXJhbSB7Ym9keVtdfSBib2RpZXNcbiAgICAgKiBAcGFyYW0ge1JlbmRlcmluZ0NvbnRleHR9IGNvbnRleHRcbiAgICAgKi9cbiAgICBSZW5kZXIuYm9keVdpcmVmcmFtZXMgPSBmdW5jdGlvbihyZW5kZXIsIGJvZGllcywgY29udGV4dCkge1xuICAgICAgICB2YXIgYyA9IGNvbnRleHQsXG4gICAgICAgICAgICBzaG93SW50ZXJuYWxFZGdlcyA9IHJlbmRlci5vcHRpb25zLnNob3dJbnRlcm5hbEVkZ2VzLFxuICAgICAgICAgICAgYm9keSxcbiAgICAgICAgICAgIHBhcnQsXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgaixcbiAgICAgICAgICAgIGs7XG5cbiAgICAgICAgYy5iZWdpblBhdGgoKTtcblxuICAgICAgICAvLyByZW5kZXIgYWxsIGJvZGllc1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYm9kaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBib2R5ID0gYm9kaWVzW2ldO1xuXG4gICAgICAgICAgICBpZiAoIWJvZHkucmVuZGVyLnZpc2libGUpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSBjb21wb3VuZCBwYXJ0c1xuICAgICAgICAgICAgZm9yIChrID0gYm9keS5wYXJ0cy5sZW5ndGggPiAxID8gMSA6IDA7IGsgPCBib2R5LnBhcnRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgcGFydCA9IGJvZHkucGFydHNba107XG5cbiAgICAgICAgICAgICAgICBjLm1vdmVUbyhwYXJ0LnZlcnRpY2VzWzBdLngsIHBhcnQudmVydGljZXNbMF0ueSk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGogPSAxOyBqIDwgcGFydC52ZXJ0aWNlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXBhcnQudmVydGljZXNbaiAtIDFdLmlzSW50ZXJuYWwgfHwgc2hvd0ludGVybmFsRWRnZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMubGluZVRvKHBhcnQudmVydGljZXNbal0ueCwgcGFydC52ZXJ0aWNlc1tqXS55KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMubW92ZVRvKHBhcnQudmVydGljZXNbal0ueCwgcGFydC52ZXJ0aWNlc1tqXS55KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJ0LnZlcnRpY2VzW2pdLmlzSW50ZXJuYWwgJiYgIXNob3dJbnRlcm5hbEVkZ2VzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjLm1vdmVUbyhwYXJ0LnZlcnRpY2VzWyhqICsgMSkgJSBwYXJ0LnZlcnRpY2VzLmxlbmd0aF0ueCwgcGFydC52ZXJ0aWNlc1soaiArIDEpICUgcGFydC52ZXJ0aWNlcy5sZW5ndGhdLnkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYy5saW5lVG8ocGFydC52ZXJ0aWNlc1swXS54LCBwYXJ0LnZlcnRpY2VzWzBdLnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYy5saW5lV2lkdGggPSAxO1xuICAgICAgICBjLnN0cm9rZVN0eWxlID0gJyNiYmInO1xuICAgICAgICBjLnN0cm9rZSgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBPcHRpbWlzZWQgbWV0aG9kIGZvciBkcmF3aW5nIGJvZHkgY29udmV4IGh1bGwgd2lyZWZyYW1lcyBpbiBvbmUgcGFzc1xuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZCBib2R5Q29udmV4SHVsbHNcbiAgICAgKiBAcGFyYW0ge3JlbmRlcn0gcmVuZGVyXG4gICAgICogQHBhcmFtIHtib2R5W119IGJvZGllc1xuICAgICAqIEBwYXJhbSB7UmVuZGVyaW5nQ29udGV4dH0gY29udGV4dFxuICAgICAqL1xuICAgIFJlbmRlci5ib2R5Q29udmV4SHVsbHMgPSBmdW5jdGlvbihyZW5kZXIsIGJvZGllcywgY29udGV4dCkge1xuICAgICAgICB2YXIgYyA9IGNvbnRleHQsXG4gICAgICAgICAgICBib2R5LFxuICAgICAgICAgICAgcGFydCxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBqLFxuICAgICAgICAgICAgaztcblxuICAgICAgICBjLmJlZ2luUGF0aCgpO1xuXG4gICAgICAgIC8vIHJlbmRlciBjb252ZXggaHVsbHNcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGJvZGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYm9keSA9IGJvZGllc1tpXTtcblxuICAgICAgICAgICAgaWYgKCFib2R5LnJlbmRlci52aXNpYmxlIHx8IGJvZHkucGFydHMubGVuZ3RoID09PSAxKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBjLm1vdmVUbyhib2R5LnZlcnRpY2VzWzBdLngsIGJvZHkudmVydGljZXNbMF0ueSk7XG5cbiAgICAgICAgICAgIGZvciAoaiA9IDE7IGogPCBib2R5LnZlcnRpY2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgYy5saW5lVG8oYm9keS52ZXJ0aWNlc1tqXS54LCBib2R5LnZlcnRpY2VzW2pdLnkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjLmxpbmVUbyhib2R5LnZlcnRpY2VzWzBdLngsIGJvZHkudmVydGljZXNbMF0ueSk7XG4gICAgICAgIH1cblxuICAgICAgICBjLmxpbmVXaWR0aCA9IDE7XG4gICAgICAgIGMuc3Ryb2tlU3R5bGUgPSAncmdiYSgyNTUsMjU1LDI1NSwwLjIpJztcbiAgICAgICAgYy5zdHJva2UoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBib2R5IHZlcnRleCBudW1iZXJzLlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZCB2ZXJ0ZXhOdW1iZXJzXG4gICAgICogQHBhcmFtIHtyZW5kZXJ9IHJlbmRlclxuICAgICAqIEBwYXJhbSB7Ym9keVtdfSBib2RpZXNcbiAgICAgKiBAcGFyYW0ge1JlbmRlcmluZ0NvbnRleHR9IGNvbnRleHRcbiAgICAgKi9cbiAgICBSZW5kZXIudmVydGV4TnVtYmVycyA9IGZ1bmN0aW9uKHJlbmRlciwgYm9kaWVzLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBjID0gY29udGV4dCxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBqLFxuICAgICAgICAgICAgaztcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYm9kaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcGFydHMgPSBib2RpZXNbaV0ucGFydHM7XG4gICAgICAgICAgICBmb3IgKGsgPSBwYXJ0cy5sZW5ndGggPiAxID8gMSA6IDA7IGsgPCBwYXJ0cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgIHZhciBwYXJ0ID0gcGFydHNba107XG4gICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IHBhcnQudmVydGljZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYy5maWxsU3R5bGUgPSAncmdiYSgyNTUsMjU1LDI1NSwwLjIpJztcbiAgICAgICAgICAgICAgICAgICAgYy5maWxsVGV4dChpICsgJ18nICsgaiwgcGFydC5wb3NpdGlvbi54ICsgKHBhcnQudmVydGljZXNbal0ueCAtIHBhcnQucG9zaXRpb24ueCkgKiAwLjgsIHBhcnQucG9zaXRpb24ueSArIChwYXJ0LnZlcnRpY2VzW2pdLnkgLSBwYXJ0LnBvc2l0aW9uLnkpICogMC44KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBtb3VzZSBwb3NpdGlvbi5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBtZXRob2QgbW91c2VQb3NpdGlvblxuICAgICAqIEBwYXJhbSB7cmVuZGVyfSByZW5kZXJcbiAgICAgKiBAcGFyYW0ge21vdXNlfSBtb3VzZVxuICAgICAqIEBwYXJhbSB7UmVuZGVyaW5nQ29udGV4dH0gY29udGV4dFxuICAgICAqL1xuICAgIFJlbmRlci5tb3VzZVBvc2l0aW9uID0gZnVuY3Rpb24ocmVuZGVyLCBtb3VzZSwgY29udGV4dCkge1xuICAgICAgICB2YXIgYyA9IGNvbnRleHQ7XG4gICAgICAgIGMuZmlsbFN0eWxlID0gJ3JnYmEoMjU1LDI1NSwyNTUsMC44KSc7XG4gICAgICAgIGMuZmlsbFRleHQobW91c2UucG9zaXRpb24ueCArICcgICcgKyBtb3VzZS5wb3NpdGlvbi55LCBtb3VzZS5wb3NpdGlvbi54ICsgNSwgbW91c2UucG9zaXRpb24ueSAtIDUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEcmF3cyBib2R5IGJvdW5kc1xuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZCBib2R5Qm91bmRzXG4gICAgICogQHBhcmFtIHtyZW5kZXJ9IHJlbmRlclxuICAgICAqIEBwYXJhbSB7Ym9keVtdfSBib2RpZXNcbiAgICAgKiBAcGFyYW0ge1JlbmRlcmluZ0NvbnRleHR9IGNvbnRleHRcbiAgICAgKi9cbiAgICBSZW5kZXIuYm9keUJvdW5kcyA9IGZ1bmN0aW9uKHJlbmRlciwgYm9kaWVzLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBjID0gY29udGV4dCxcbiAgICAgICAgICAgIGVuZ2luZSA9IHJlbmRlci5lbmdpbmUsXG4gICAgICAgICAgICBvcHRpb25zID0gcmVuZGVyLm9wdGlvbnM7XG5cbiAgICAgICAgYy5iZWdpblBhdGgoKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvZGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGJvZHkgPSBib2RpZXNbaV07XG5cbiAgICAgICAgICAgIGlmIChib2R5LnJlbmRlci52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcnRzID0gYm9kaWVzW2ldLnBhcnRzO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSBwYXJ0cy5sZW5ndGggPiAxID8gMSA6IDA7IGogPCBwYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFydCA9IHBhcnRzW2pdO1xuICAgICAgICAgICAgICAgICAgICBjLnJlY3QocGFydC5ib3VuZHMubWluLngsIHBhcnQuYm91bmRzLm1pbi55LCBwYXJ0LmJvdW5kcy5tYXgueCAtIHBhcnQuYm91bmRzLm1pbi54LCBwYXJ0LmJvdW5kcy5tYXgueSAtIHBhcnQuYm91bmRzLm1pbi55KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy53aXJlZnJhbWVzKSB7XG4gICAgICAgICAgICBjLnN0cm9rZVN0eWxlID0gJ3JnYmEoMjU1LDI1NSwyNTUsMC4wOCknO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYy5zdHJva2VTdHlsZSA9ICdyZ2JhKDAsMCwwLDAuMSknO1xuICAgICAgICB9XG5cbiAgICAgICAgYy5saW5lV2lkdGggPSAxO1xuICAgICAgICBjLnN0cm9rZSgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEcmF3cyBib2R5IGFuZ2xlIGluZGljYXRvcnMgYW5kIGF4ZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBtZXRob2QgYm9keUF4ZXNcbiAgICAgKiBAcGFyYW0ge3JlbmRlcn0gcmVuZGVyXG4gICAgICogQHBhcmFtIHtib2R5W119IGJvZGllc1xuICAgICAqIEBwYXJhbSB7UmVuZGVyaW5nQ29udGV4dH0gY29udGV4dFxuICAgICAqL1xuICAgIFJlbmRlci5ib2R5QXhlcyA9IGZ1bmN0aW9uKHJlbmRlciwgYm9kaWVzLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBjID0gY29udGV4dCxcbiAgICAgICAgICAgIGVuZ2luZSA9IHJlbmRlci5lbmdpbmUsXG4gICAgICAgICAgICBvcHRpb25zID0gcmVuZGVyLm9wdGlvbnMsXG4gICAgICAgICAgICBwYXJ0LFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIGosXG4gICAgICAgICAgICBrO1xuXG4gICAgICAgIGMuYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGJvZGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGJvZHkgPSBib2RpZXNbaV0sXG4gICAgICAgICAgICAgICAgcGFydHMgPSBib2R5LnBhcnRzO1xuXG4gICAgICAgICAgICBpZiAoIWJvZHkucmVuZGVyLnZpc2libGUpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dBeGVzKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVuZGVyIGFsbCBheGVzXG4gICAgICAgICAgICAgICAgZm9yIChqID0gcGFydHMubGVuZ3RoID4gMSA/IDEgOiAwOyBqIDwgcGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcGFydCA9IHBhcnRzW2pdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGsgPSAwOyBrIDwgcGFydC5heGVzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXhpcyA9IHBhcnQuYXhlc1trXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMubW92ZVRvKHBhcnQucG9zaXRpb24ueCwgcGFydC5wb3NpdGlvbi55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMubGluZVRvKHBhcnQucG9zaXRpb24ueCArIGF4aXMueCAqIDIwLCBwYXJ0LnBvc2l0aW9uLnkgKyBheGlzLnkgKiAyMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAoaiA9IHBhcnRzLmxlbmd0aCA+IDEgPyAxIDogMDsgaiA8IHBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnQgPSBwYXJ0c1tqXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChrID0gMDsgayA8IHBhcnQuYXhlcy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVuZGVyIGEgc2luZ2xlIGF4aXMgaW5kaWNhdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBjLm1vdmVUbyhwYXJ0LnBvc2l0aW9uLngsIHBhcnQucG9zaXRpb24ueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjLmxpbmVUbygocGFydC52ZXJ0aWNlc1swXS54ICsgcGFydC52ZXJ0aWNlc1twYXJ0LnZlcnRpY2VzLmxlbmd0aC0xXS54KSAvIDIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocGFydC52ZXJ0aWNlc1swXS55ICsgcGFydC52ZXJ0aWNlc1twYXJ0LnZlcnRpY2VzLmxlbmd0aC0xXS55KSAvIDIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMud2lyZWZyYW1lcykge1xuICAgICAgICAgICAgYy5zdHJva2VTdHlsZSA9ICdpbmRpYW5yZWQnO1xuICAgICAgICAgICAgYy5saW5lV2lkdGggPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYy5zdHJva2VTdHlsZSA9ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCknO1xuICAgICAgICAgICAgYy5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnb3ZlcmxheSc7XG4gICAgICAgICAgICBjLmxpbmVXaWR0aCA9IDI7XG4gICAgICAgIH1cblxuICAgICAgICBjLnN0cm9rZSgpO1xuICAgICAgICBjLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3Zlcic7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERyYXdzIGJvZHkgcG9zaXRpb25zXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIGJvZHlQb3NpdGlvbnNcbiAgICAgKiBAcGFyYW0ge3JlbmRlcn0gcmVuZGVyXG4gICAgICogQHBhcmFtIHtib2R5W119IGJvZGllc1xuICAgICAqIEBwYXJhbSB7UmVuZGVyaW5nQ29udGV4dH0gY29udGV4dFxuICAgICAqL1xuICAgIFJlbmRlci5ib2R5UG9zaXRpb25zID0gZnVuY3Rpb24ocmVuZGVyLCBib2RpZXMsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGMgPSBjb250ZXh0LFxuICAgICAgICAgICAgZW5naW5lID0gcmVuZGVyLmVuZ2luZSxcbiAgICAgICAgICAgIG9wdGlvbnMgPSByZW5kZXIub3B0aW9ucyxcbiAgICAgICAgICAgIGJvZHksXG4gICAgICAgICAgICBwYXJ0LFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIGs7XG5cbiAgICAgICAgYy5iZWdpblBhdGgoKTtcblxuICAgICAgICAvLyByZW5kZXIgY3VycmVudCBwb3NpdGlvbnNcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGJvZGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYm9keSA9IGJvZGllc1tpXTtcblxuICAgICAgICAgICAgaWYgKCFib2R5LnJlbmRlci52aXNpYmxlKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAvLyBoYW5kbGUgY29tcG91bmQgcGFydHNcbiAgICAgICAgICAgIGZvciAoayA9IDA7IGsgPCBib2R5LnBhcnRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgcGFydCA9IGJvZHkucGFydHNba107XG4gICAgICAgICAgICAgICAgYy5hcmMocGFydC5wb3NpdGlvbi54LCBwYXJ0LnBvc2l0aW9uLnksIDMsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgYy5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLndpcmVmcmFtZXMpIHtcbiAgICAgICAgICAgIGMuZmlsbFN0eWxlID0gJ2luZGlhbnJlZCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjLmZpbGxTdHlsZSA9ICdyZ2JhKDAsMCwwLDAuNSknO1xuICAgICAgICB9XG4gICAgICAgIGMuZmlsbCgpO1xuXG4gICAgICAgIGMuYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgLy8gcmVuZGVyIHByZXZpb3VzIHBvc2l0aW9uc1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYm9kaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBib2R5ID0gYm9kaWVzW2ldO1xuICAgICAgICAgICAgaWYgKGJvZHkucmVuZGVyLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBjLmFyYyhib2R5LnBvc2l0aW9uUHJldi54LCBib2R5LnBvc2l0aW9uUHJldi55LCAyLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGMuY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjLmZpbGxTdHlsZSA9ICdyZ2JhKDI1NSwxNjUsMCwwLjgpJztcbiAgICAgICAgYy5maWxsKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERyYXdzIGJvZHkgdmVsb2NpdHlcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBtZXRob2QgYm9keVZlbG9jaXR5XG4gICAgICogQHBhcmFtIHtyZW5kZXJ9IHJlbmRlclxuICAgICAqIEBwYXJhbSB7Ym9keVtdfSBib2RpZXNcbiAgICAgKiBAcGFyYW0ge1JlbmRlcmluZ0NvbnRleHR9IGNvbnRleHRcbiAgICAgKi9cbiAgICBSZW5kZXIuYm9keVZlbG9jaXR5ID0gZnVuY3Rpb24ocmVuZGVyLCBib2RpZXMsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGMgPSBjb250ZXh0O1xuXG4gICAgICAgIGMuYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBib2R5ID0gYm9kaWVzW2ldO1xuXG4gICAgICAgICAgICBpZiAoIWJvZHkucmVuZGVyLnZpc2libGUpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIGMubW92ZVRvKGJvZHkucG9zaXRpb24ueCwgYm9keS5wb3NpdGlvbi55KTtcbiAgICAgICAgICAgIGMubGluZVRvKGJvZHkucG9zaXRpb24ueCArIChib2R5LnBvc2l0aW9uLnggLSBib2R5LnBvc2l0aW9uUHJldi54KSAqIDIsIGJvZHkucG9zaXRpb24ueSArIChib2R5LnBvc2l0aW9uLnkgLSBib2R5LnBvc2l0aW9uUHJldi55KSAqIDIpO1xuICAgICAgICB9XG5cbiAgICAgICAgYy5saW5lV2lkdGggPSAzO1xuICAgICAgICBjLnN0cm9rZVN0eWxlID0gJ2Nvcm5mbG93ZXJibHVlJztcbiAgICAgICAgYy5zdHJva2UoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRHJhd3MgYm9keSBpZHNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBtZXRob2QgYm9keUlkc1xuICAgICAqIEBwYXJhbSB7cmVuZGVyfSByZW5kZXJcbiAgICAgKiBAcGFyYW0ge2JvZHlbXX0gYm9kaWVzXG4gICAgICogQHBhcmFtIHtSZW5kZXJpbmdDb250ZXh0fSBjb250ZXh0XG4gICAgICovXG4gICAgUmVuZGVyLmJvZHlJZHMgPSBmdW5jdGlvbihyZW5kZXIsIGJvZGllcywgY29udGV4dCkge1xuICAgICAgICB2YXIgYyA9IGNvbnRleHQsXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgajtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYm9kaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIWJvZGllc1tpXS5yZW5kZXIudmlzaWJsZSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgdmFyIHBhcnRzID0gYm9kaWVzW2ldLnBhcnRzO1xuICAgICAgICAgICAgZm9yIChqID0gcGFydHMubGVuZ3RoID4gMSA/IDEgOiAwOyBqIDwgcGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFydCA9IHBhcnRzW2pdO1xuICAgICAgICAgICAgICAgIGMuZm9udCA9IFwiMTJweCBBcmlhbFwiO1xuICAgICAgICAgICAgICAgIGMuZmlsbFN0eWxlID0gJ3JnYmEoMjU1LDI1NSwyNTUsMC41KSc7XG4gICAgICAgICAgICAgICAgYy5maWxsVGV4dChwYXJ0LmlkLCBwYXJ0LnBvc2l0aW9uLnggKyAxMCwgcGFydC5wb3NpdGlvbi55IC0gMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlc2NyaXB0aW9uXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIGNvbGxpc2lvbnNcbiAgICAgKiBAcGFyYW0ge3JlbmRlcn0gcmVuZGVyXG4gICAgICogQHBhcmFtIHtwYWlyW119IHBhaXJzXG4gICAgICogQHBhcmFtIHtSZW5kZXJpbmdDb250ZXh0fSBjb250ZXh0XG4gICAgICovXG4gICAgUmVuZGVyLmNvbGxpc2lvbnMgPSBmdW5jdGlvbihyZW5kZXIsIHBhaXJzLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBjID0gY29udGV4dCxcbiAgICAgICAgICAgIG9wdGlvbnMgPSByZW5kZXIub3B0aW9ucyxcbiAgICAgICAgICAgIHBhaXIsXG4gICAgICAgICAgICBjb2xsaXNpb24sXG4gICAgICAgICAgICBjb3JyZWN0ZWQsXG4gICAgICAgICAgICBib2R5QSxcbiAgICAgICAgICAgIGJvZHlCLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIGo7XG5cbiAgICAgICAgYy5iZWdpblBhdGgoKTtcblxuICAgICAgICAvLyByZW5kZXIgY29sbGlzaW9uIHBvc2l0aW9uc1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBhaXIgPSBwYWlyc1tpXTtcblxuICAgICAgICAgICAgaWYgKCFwYWlyLmlzQWN0aXZlKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBjb2xsaXNpb24gPSBwYWlyLmNvbGxpc2lvbjtcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBwYWlyLmFjdGl2ZUNvbnRhY3RzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRhY3QgPSBwYWlyLmFjdGl2ZUNvbnRhY3RzW2pdLFxuICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXggPSBjb250YWN0LnZlcnRleDtcbiAgICAgICAgICAgICAgICBjLnJlY3QodmVydGV4LnggLSAxLjUsIHZlcnRleC55IC0gMS41LCAzLjUsIDMuNSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy53aXJlZnJhbWVzKSB7XG4gICAgICAgICAgICBjLmZpbGxTdHlsZSA9ICdyZ2JhKDI1NSwyNTUsMjU1LDAuNyknO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYy5maWxsU3R5bGUgPSAnb3JhbmdlJztcbiAgICAgICAgfVxuICAgICAgICBjLmZpbGwoKTtcblxuICAgICAgICBjLmJlZ2luUGF0aCgpO1xuXG4gICAgICAgIC8vIHJlbmRlciBjb2xsaXNpb24gbm9ybWFsc1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBhaXIgPSBwYWlyc1tpXTtcblxuICAgICAgICAgICAgaWYgKCFwYWlyLmlzQWN0aXZlKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBjb2xsaXNpb24gPSBwYWlyLmNvbGxpc2lvbjtcblxuICAgICAgICAgICAgaWYgKHBhaXIuYWN0aXZlQ29udGFjdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBub3JtYWxQb3NYID0gcGFpci5hY3RpdmVDb250YWN0c1swXS52ZXJ0ZXgueCxcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsUG9zWSA9IHBhaXIuYWN0aXZlQ29udGFjdHNbMF0udmVydGV4Lnk7XG5cbiAgICAgICAgICAgICAgICBpZiAocGFpci5hY3RpdmVDb250YWN0cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsUG9zWCA9IChwYWlyLmFjdGl2ZUNvbnRhY3RzWzBdLnZlcnRleC54ICsgcGFpci5hY3RpdmVDb250YWN0c1sxXS52ZXJ0ZXgueCkgLyAyO1xuICAgICAgICAgICAgICAgICAgICBub3JtYWxQb3NZID0gKHBhaXIuYWN0aXZlQ29udGFjdHNbMF0udmVydGV4LnkgKyBwYWlyLmFjdGl2ZUNvbnRhY3RzWzFdLnZlcnRleC55KSAvIDI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvbGxpc2lvbi5ib2R5QiA9PT0gY29sbGlzaW9uLnN1cHBvcnRzWzBdLmJvZHkgfHwgY29sbGlzaW9uLmJvZHlBLmlzU3RhdGljID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGMubW92ZVRvKG5vcm1hbFBvc1ggLSBjb2xsaXNpb24ubm9ybWFsLnggKiA4LCBub3JtYWxQb3NZIC0gY29sbGlzaW9uLm5vcm1hbC55ICogOCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYy5tb3ZlVG8obm9ybWFsUG9zWCArIGNvbGxpc2lvbi5ub3JtYWwueCAqIDgsIG5vcm1hbFBvc1kgKyBjb2xsaXNpb24ubm9ybWFsLnkgKiA4KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjLmxpbmVUbyhub3JtYWxQb3NYLCBub3JtYWxQb3NZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLndpcmVmcmFtZXMpIHtcbiAgICAgICAgICAgIGMuc3Ryb2tlU3R5bGUgPSAncmdiYSgyNTUsMTY1LDAsMC43KSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjLnN0cm9rZVN0eWxlID0gJ29yYW5nZSc7XG4gICAgICAgIH1cblxuICAgICAgICBjLmxpbmVXaWR0aCA9IDE7XG4gICAgICAgIGMuc3Ryb2tlKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlc2NyaXB0aW9uXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIHNlcGFyYXRpb25zXG4gICAgICogQHBhcmFtIHtyZW5kZXJ9IHJlbmRlclxuICAgICAqIEBwYXJhbSB7cGFpcltdfSBwYWlyc1xuICAgICAqIEBwYXJhbSB7UmVuZGVyaW5nQ29udGV4dH0gY29udGV4dFxuICAgICAqL1xuICAgIFJlbmRlci5zZXBhcmF0aW9ucyA9IGZ1bmN0aW9uKHJlbmRlciwgcGFpcnMsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGMgPSBjb250ZXh0LFxuICAgICAgICAgICAgb3B0aW9ucyA9IHJlbmRlci5vcHRpb25zLFxuICAgICAgICAgICAgcGFpcixcbiAgICAgICAgICAgIGNvbGxpc2lvbixcbiAgICAgICAgICAgIGNvcnJlY3RlZCxcbiAgICAgICAgICAgIGJvZHlBLFxuICAgICAgICAgICAgYm9keUIsXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgajtcblxuICAgICAgICBjLmJlZ2luUGF0aCgpO1xuXG4gICAgICAgIC8vIHJlbmRlciBzZXBhcmF0aW9uc1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBhaXIgPSBwYWlyc1tpXTtcblxuICAgICAgICAgICAgaWYgKCFwYWlyLmlzQWN0aXZlKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBjb2xsaXNpb24gPSBwYWlyLmNvbGxpc2lvbjtcbiAgICAgICAgICAgIGJvZHlBID0gY29sbGlzaW9uLmJvZHlBO1xuICAgICAgICAgICAgYm9keUIgPSBjb2xsaXNpb24uYm9keUI7XG5cbiAgICAgICAgICAgIHZhciBrID0gMTtcblxuICAgICAgICAgICAgaWYgKCFib2R5Qi5pc1N0YXRpYyAmJiAhYm9keUEuaXNTdGF0aWMpIGsgPSAwLjU7XG4gICAgICAgICAgICBpZiAoYm9keUIuaXNTdGF0aWMpIGsgPSAwO1xuXG4gICAgICAgICAgICBjLm1vdmVUbyhib2R5Qi5wb3NpdGlvbi54LCBib2R5Qi5wb3NpdGlvbi55KTtcbiAgICAgICAgICAgIGMubGluZVRvKGJvZHlCLnBvc2l0aW9uLnggLSBjb2xsaXNpb24ucGVuZXRyYXRpb24ueCAqIGssIGJvZHlCLnBvc2l0aW9uLnkgLSBjb2xsaXNpb24ucGVuZXRyYXRpb24ueSAqIGspO1xuXG4gICAgICAgICAgICBrID0gMTtcblxuICAgICAgICAgICAgaWYgKCFib2R5Qi5pc1N0YXRpYyAmJiAhYm9keUEuaXNTdGF0aWMpIGsgPSAwLjU7XG4gICAgICAgICAgICBpZiAoYm9keUEuaXNTdGF0aWMpIGsgPSAwO1xuXG4gICAgICAgICAgICBjLm1vdmVUbyhib2R5QS5wb3NpdGlvbi54LCBib2R5QS5wb3NpdGlvbi55KTtcbiAgICAgICAgICAgIGMubGluZVRvKGJvZHlBLnBvc2l0aW9uLnggKyBjb2xsaXNpb24ucGVuZXRyYXRpb24ueCAqIGssIGJvZHlBLnBvc2l0aW9uLnkgKyBjb2xsaXNpb24ucGVuZXRyYXRpb24ueSAqIGspO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMud2lyZWZyYW1lcykge1xuICAgICAgICAgICAgYy5zdHJva2VTdHlsZSA9ICdyZ2JhKDI1NSwxNjUsMCwwLjUpJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGMuc3Ryb2tlU3R5bGUgPSAnb3JhbmdlJztcbiAgICAgICAgfVxuICAgICAgICBjLnN0cm9rZSgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZXNjcmlwdGlvblxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZCBncmlkXG4gICAgICogQHBhcmFtIHtyZW5kZXJ9IHJlbmRlclxuICAgICAqIEBwYXJhbSB7Z3JpZH0gZ3JpZFxuICAgICAqIEBwYXJhbSB7UmVuZGVyaW5nQ29udGV4dH0gY29udGV4dFxuICAgICAqL1xuICAgIFJlbmRlci5ncmlkID0gZnVuY3Rpb24ocmVuZGVyLCBncmlkLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBjID0gY29udGV4dCxcbiAgICAgICAgICAgIG9wdGlvbnMgPSByZW5kZXIub3B0aW9ucztcblxuICAgICAgICBpZiAob3B0aW9ucy53aXJlZnJhbWVzKSB7XG4gICAgICAgICAgICBjLnN0cm9rZVN0eWxlID0gJ3JnYmEoMjU1LDE4MCwwLDAuMSknO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYy5zdHJva2VTdHlsZSA9ICdyZ2JhKDI1NSwxODAsMCwwLjUpJztcbiAgICAgICAgfVxuXG4gICAgICAgIGMuYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgdmFyIGJ1Y2tldEtleXMgPSBDb21tb24ua2V5cyhncmlkLmJ1Y2tldHMpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnVja2V0S2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGJ1Y2tldElkID0gYnVja2V0S2V5c1tpXTtcblxuICAgICAgICAgICAgaWYgKGdyaWQuYnVja2V0c1tidWNrZXRJZF0ubGVuZ3RoIDwgMilcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgdmFyIHJlZ2lvbiA9IGJ1Y2tldElkLnNwbGl0KC9DfFIvKTtcbiAgICAgICAgICAgIGMucmVjdCgwLjUgKyBwYXJzZUludChyZWdpb25bMV0sIDEwKSAqIGdyaWQuYnVja2V0V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIDAuNSArIHBhcnNlSW50KHJlZ2lvblsyXSwgMTApICogZ3JpZC5idWNrZXRIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIGdyaWQuYnVja2V0V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGdyaWQuYnVja2V0SGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGMubGluZVdpZHRoID0gMTtcbiAgICAgICAgYy5zdHJva2UoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVzY3JpcHRpb25cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBtZXRob2QgaW5zcGVjdG9yXG4gICAgICogQHBhcmFtIHtpbnNwZWN0b3J9IGluc3BlY3RvclxuICAgICAqIEBwYXJhbSB7UmVuZGVyaW5nQ29udGV4dH0gY29udGV4dFxuICAgICAqL1xuICAgIFJlbmRlci5pbnNwZWN0b3IgPSBmdW5jdGlvbihpbnNwZWN0b3IsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGVuZ2luZSA9IGluc3BlY3Rvci5lbmdpbmUsXG4gICAgICAgICAgICBzZWxlY3RlZCA9IGluc3BlY3Rvci5zZWxlY3RlZCxcbiAgICAgICAgICAgIHJlbmRlciA9IGluc3BlY3Rvci5yZW5kZXIsXG4gICAgICAgICAgICBvcHRpb25zID0gcmVuZGVyLm9wdGlvbnMsXG4gICAgICAgICAgICBib3VuZHM7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaGFzQm91bmRzKSB7XG4gICAgICAgICAgICB2YXIgYm91bmRzV2lkdGggPSByZW5kZXIuYm91bmRzLm1heC54IC0gcmVuZGVyLmJvdW5kcy5taW4ueCxcbiAgICAgICAgICAgICAgICBib3VuZHNIZWlnaHQgPSByZW5kZXIuYm91bmRzLm1heC55IC0gcmVuZGVyLmJvdW5kcy5taW4ueSxcbiAgICAgICAgICAgICAgICBib3VuZHNTY2FsZVggPSBib3VuZHNXaWR0aCAvIHJlbmRlci5vcHRpb25zLndpZHRoLFxuICAgICAgICAgICAgICAgIGJvdW5kc1NjYWxlWSA9IGJvdW5kc0hlaWdodCAvIHJlbmRlci5vcHRpb25zLmhlaWdodDtcblxuICAgICAgICAgICAgY29udGV4dC5zY2FsZSgxIC8gYm91bmRzU2NhbGVYLCAxIC8gYm91bmRzU2NhbGVZKTtcbiAgICAgICAgICAgIGNvbnRleHQudHJhbnNsYXRlKC1yZW5kZXIuYm91bmRzLm1pbi54LCAtcmVuZGVyLmJvdW5kcy5taW4ueSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbGVjdGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IHNlbGVjdGVkW2ldLmRhdGE7XG5cbiAgICAgICAgICAgIGNvbnRleHQudHJhbnNsYXRlKDAuNSwgMC41KTtcbiAgICAgICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gMTtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAncmdiYSgyNTUsMTY1LDAsMC45KSc7XG4gICAgICAgICAgICBjb250ZXh0LnNldExpbmVEYXNoKFsxLDJdKTtcblxuICAgICAgICAgICAgc3dpdGNoIChpdGVtLnR5cGUpIHtcblxuICAgICAgICAgICAgY2FzZSAnYm9keSc6XG5cbiAgICAgICAgICAgICAgICAvLyByZW5kZXIgYm9keSBzZWxlY3Rpb25zXG4gICAgICAgICAgICAgICAgYm91bmRzID0gaXRlbS5ib3VuZHM7XG4gICAgICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnJlY3QoTWF0aC5mbG9vcihib3VuZHMubWluLnggLSAzKSwgTWF0aC5mbG9vcihib3VuZHMubWluLnkgLSAzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihib3VuZHMubWF4LnggLSBib3VuZHMubWluLnggKyA2KSwgTWF0aC5mbG9vcihib3VuZHMubWF4LnkgLSBib3VuZHMubWluLnkgKyA2KSk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2NvbnN0cmFpbnQnOlxuXG4gICAgICAgICAgICAgICAgLy8gcmVuZGVyIGNvbnN0cmFpbnQgc2VsZWN0aW9uc1xuICAgICAgICAgICAgICAgIHZhciBwb2ludCA9IGl0ZW0ucG9pbnRBO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmJvZHlBKVxuICAgICAgICAgICAgICAgICAgICBwb2ludCA9IGl0ZW0ucG9pbnRCO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5hcmMocG9pbnQueCwgcG9pbnQueSwgMTAsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb250ZXh0LnNldExpbmVEYXNoKFtdKTtcbiAgICAgICAgICAgIGNvbnRleHQudHJhbnNsYXRlKC0wLjUsIC0wLjUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVuZGVyIHNlbGVjdGlvbiByZWdpb25cbiAgICAgICAgaWYgKGluc3BlY3Rvci5zZWxlY3RTdGFydCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGV4dC50cmFuc2xhdGUoMC41LCAwLjUpO1xuICAgICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSAxO1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9ICdyZ2JhKDI1NSwxNjUsMCwwLjYpJztcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ3JnYmEoMjU1LDE2NSwwLDAuMSknO1xuICAgICAgICAgICAgYm91bmRzID0gaW5zcGVjdG9yLnNlbGVjdEJvdW5kcztcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjb250ZXh0LnJlY3QoTWF0aC5mbG9vcihib3VuZHMubWluLngpLCBNYXRoLmZsb29yKGJvdW5kcy5taW4ueSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihib3VuZHMubWF4LnggLSBib3VuZHMubWluLngpLCBNYXRoLmZsb29yKGJvdW5kcy5tYXgueSAtIGJvdW5kcy5taW4ueSkpO1xuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcbiAgICAgICAgICAgIGNvbnRleHQudHJhbnNsYXRlKC0wLjUsIC0wLjUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaGFzQm91bmRzKVxuICAgICAgICAgICAgY29udGV4dC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlc2NyaXB0aW9uXG4gICAgICogQG1ldGhvZCBfY3JlYXRlQ2FudmFzXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge30gd2lkdGhcbiAgICAgKiBAcGFyYW0ge30gaGVpZ2h0XG4gICAgICogQHJldHVybiBjYW52YXNcbiAgICAgKi9cbiAgICB2YXIgX2NyZWF0ZUNhbnZhcyA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgY2FudmFzLm9uY29udGV4dG1lbnUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlOyB9O1xuICAgICAgICBjYW52YXMub25zZWxlY3RzdGFydCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gZmFsc2U7IH07XG4gICAgICAgIHJldHVybiBjYW52YXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHBpeGVsIHJhdGlvIG9mIHRoZSBjYW52YXMuXG4gICAgICogQG1ldGhvZCBfZ2V0UGl4ZWxSYXRpb1xuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2FudmFzXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBwaXhlbCByYXRpb1xuICAgICAqL1xuICAgIHZhciBfZ2V0UGl4ZWxSYXRpbyA9IGZ1bmN0aW9uKGNhbnZhcykge1xuICAgICAgICB2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLFxuICAgICAgICAgICAgZGV2aWNlUGl4ZWxSYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEsXG4gICAgICAgICAgICBiYWNraW5nU3RvcmVQaXhlbFJhdGlvID0gY29udGV4dC53ZWJraXRCYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8IGNvbnRleHQubW96QmFja2luZ1N0b3JlUGl4ZWxSYXRpb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBjb250ZXh0Lm1zQmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fCBjb250ZXh0Lm9CYWNraW5nU3RvcmVQaXhlbFJhdGlvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IGNvbnRleHQuYmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fCAxO1xuXG4gICAgICAgIHJldHVybiBkZXZpY2VQaXhlbFJhdGlvIC8gYmFja2luZ1N0b3JlUGl4ZWxSYXRpbztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcmVxdWVzdGVkIHRleHR1cmUgKGFuIEltYWdlKSB2aWEgaXRzIHBhdGhcbiAgICAgKiBAbWV0aG9kIF9nZXRUZXh0dXJlXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge3JlbmRlcn0gcmVuZGVyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlUGF0aFxuICAgICAqIEByZXR1cm4ge0ltYWdlfSB0ZXh0dXJlXG4gICAgICovXG4gICAgdmFyIF9nZXRUZXh0dXJlID0gZnVuY3Rpb24ocmVuZGVyLCBpbWFnZVBhdGgpIHtcbiAgICAgICAgdmFyIGltYWdlID0gcmVuZGVyLnRleHR1cmVzW2ltYWdlUGF0aF07XG5cbiAgICAgICAgaWYgKGltYWdlKVxuICAgICAgICAgICAgcmV0dXJuIGltYWdlO1xuXG4gICAgICAgIGltYWdlID0gcmVuZGVyLnRleHR1cmVzW2ltYWdlUGF0aF0gPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1hZ2Uuc3JjID0gaW1hZ2VQYXRoO1xuXG4gICAgICAgIHJldHVybiBpbWFnZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQXBwbGllcyB0aGUgYmFja2dyb3VuZCB0byB0aGUgY2FudmFzIHVzaW5nIENTUy5cbiAgICAgKiBAbWV0aG9kIGFwcGx5QmFja2dyb3VuZFxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtyZW5kZXJ9IHJlbmRlclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBiYWNrZ3JvdW5kXG4gICAgICovXG4gICAgdmFyIF9hcHBseUJhY2tncm91bmQgPSBmdW5jdGlvbihyZW5kZXIsIGJhY2tncm91bmQpIHtcbiAgICAgICAgdmFyIGNzc0JhY2tncm91bmQgPSBiYWNrZ3JvdW5kO1xuXG4gICAgICAgIGlmICgvKGpwZ3xnaWZ8cG5nKSQvLnRlc3QoYmFja2dyb3VuZCkpXG4gICAgICAgICAgICBjc3NCYWNrZ3JvdW5kID0gJ3VybCgnICsgYmFja2dyb3VuZCArICcpJztcblxuICAgICAgICByZW5kZXIuY2FudmFzLnN0eWxlLmJhY2tncm91bmQgPSBjc3NCYWNrZ3JvdW5kO1xuICAgICAgICByZW5kZXIuY2FudmFzLnN0eWxlLmJhY2tncm91bmRTaXplID0gXCJjb250YWluXCI7XG4gICAgICAgIHJlbmRlci5jdXJyZW50QmFja2dyb3VuZCA9IGJhY2tncm91bmQ7XG4gICAgfTtcblxuICAgIC8qXG4gICAgKlxuICAgICogIEV2ZW50cyBEb2N1bWVudGF0aW9uXG4gICAgKlxuICAgICovXG5cbiAgICAvKipcbiAgICAqIEZpcmVkIGJlZm9yZSByZW5kZXJpbmdcbiAgICAqXG4gICAgKiBAZXZlbnQgYmVmb3JlUmVuZGVyXG4gICAgKiBAcGFyYW0ge30gZXZlbnQgQW4gZXZlbnQgb2JqZWN0XG4gICAgKiBAcGFyYW0ge251bWJlcn0gZXZlbnQudGltZXN0YW1wIFRoZSBlbmdpbmUudGltaW5nLnRpbWVzdGFtcCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5zb3VyY2UgVGhlIHNvdXJjZSBvYmplY3Qgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQubmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcbiAgICAqL1xuXG4gICAgLyoqXG4gICAgKiBGaXJlZCBhZnRlciByZW5kZXJpbmdcbiAgICAqXG4gICAgKiBAZXZlbnQgYWZ0ZXJSZW5kZXJcbiAgICAqIEBwYXJhbSB7fSBldmVudCBBbiBldmVudCBvYmplY3RcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBldmVudC50aW1lc3RhbXAgVGhlIGVuZ2luZS50aW1pbmcudGltZXN0YW1wIG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50LnNvdXJjZSBUaGUgc291cmNlIG9iamVjdCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5uYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudFxuICAgICovXG5cbiAgICAvKlxuICAgICpcbiAgICAqICBQcm9wZXJ0aWVzIERvY3VtZW50YXRpb25cbiAgICAqXG4gICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYmFjay1yZWZlcmVuY2UgdG8gdGhlIGBNYXR0ZXIuUmVuZGVyYCBtb2R1bGUuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgY29udHJvbGxlclxuICAgICAqIEB0eXBlIHJlbmRlclxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSByZWZlcmVuY2UgdG8gdGhlIGBNYXR0ZXIuRW5naW5lYCBpbnN0YW5jZSB0byBiZSB1c2VkLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGVuZ2luZVxuICAgICAqIEB0eXBlIGVuZ2luZVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSByZWZlcmVuY2UgdG8gdGhlIGVsZW1lbnQgd2hlcmUgdGhlIGNhbnZhcyBpcyB0byBiZSBpbnNlcnRlZCAoaWYgYHJlbmRlci5jYW52YXNgIGhhcyBub3QgYmVlbiBzcGVjaWZpZWQpXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgZWxlbWVudFxuICAgICAqIEB0eXBlIEhUTUxFbGVtZW50XG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNhbnZhcyBlbGVtZW50IHRvIHJlbmRlciB0by4gSWYgbm90IHNwZWNpZmllZCwgb25lIHdpbGwgYmUgY3JlYXRlZCBpZiBgcmVuZGVyLmVsZW1lbnRgIGhhcyBiZWVuIHNwZWNpZmllZC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBjYW52YXNcbiAgICAgKiBAdHlwZSBIVE1MQ2FudmFzRWxlbWVudFxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIFRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgb2YgdGhlIHJlbmRlcmVyLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IG9wdGlvbnNcbiAgICAgKiBAdHlwZSB7fVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRhcmdldCB3aWR0aCBpbiBwaXhlbHMgb2YgdGhlIGByZW5kZXIuY2FudmFzYCB0byBiZSBjcmVhdGVkLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IG9wdGlvbnMud2lkdGhcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKiBAZGVmYXVsdCA4MDBcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIFRoZSB0YXJnZXQgaGVpZ2h0IGluIHBpeGVscyBvZiB0aGUgYHJlbmRlci5jYW52YXNgIHRvIGJlIGNyZWF0ZWQuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgb3B0aW9ucy5oZWlnaHRcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKiBAZGVmYXVsdCA2MDBcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgZmxhZyB0aGF0IHNwZWNpZmllcyBpZiBgcmVuZGVyLmJvdW5kc2Agc2hvdWxkIGJlIHVzZWQgd2hlbiByZW5kZXJpbmcuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgb3B0aW9ucy5oYXNCb3VuZHNcbiAgICAgKiBAdHlwZSBib29sZWFuXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYEJvdW5kc2Agb2JqZWN0IHRoYXQgc3BlY2lmaWVzIHRoZSBkcmF3aW5nIHZpZXcgcmVnaW9uLlxuICAgICAqIFJlbmRlcmluZyB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgdHJhbnNmb3JtZWQgYW5kIHNjYWxlZCB0byBmaXQgd2l0aGluIHRoZSBjYW52YXMgc2l6ZSAoYHJlbmRlci5vcHRpb25zLndpZHRoYCBhbmQgYHJlbmRlci5vcHRpb25zLmhlaWdodGApLlxuICAgICAqIFRoaXMgYWxsb3dzIGZvciBjcmVhdGluZyB2aWV3cyB0aGF0IGNhbiBwYW4gb3Igem9vbSBhcm91bmQgdGhlIHNjZW5lLlxuICAgICAqIFlvdSBtdXN0IGFsc28gc2V0IGByZW5kZXIub3B0aW9ucy5oYXNCb3VuZHNgIHRvIGB0cnVlYCB0byBlbmFibGUgYm91bmRlZCByZW5kZXJpbmcuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgYm91bmRzXG4gICAgICogQHR5cGUgYm91bmRzXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBUaGUgMmQgcmVuZGVyaW5nIGNvbnRleHQgZnJvbSB0aGUgYHJlbmRlci5jYW52YXNgIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgY29udGV4dFxuICAgICAqIEB0eXBlIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNwcml0ZSB0ZXh0dXJlIGNhY2hlLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHRleHR1cmVzXG4gICAgICogQHR5cGUge31cbiAgICAgKi9cblxufSkoKTtcblxufSx7XCIuLi9ib2R5L0NvbXBvc2l0ZVwiOjIsXCIuLi9jb2xsaXNpb24vR3JpZFwiOjYsXCIuLi9jb3JlL0NvbW1vblwiOjE0LFwiLi4vY29yZS9FdmVudHNcIjoxNixcIi4uL2NvcmUvTW91c2VcIjoxOSxcIi4uL2dlb21ldHJ5L0JvdW5kc1wiOjI2LFwiLi4vZ2VvbWV0cnkvVmVjdG9yXCI6Mjh9XSwzMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiogVGhlIGBNYXR0ZXIuUmVuZGVyUGl4aWAgbW9kdWxlIGlzIGFuIGV4YW1wbGUgcmVuZGVyZXIgdXNpbmcgcGl4aS5qcy5cbiogU2VlIGFsc28gYE1hdHRlci5SZW5kZXJgIGZvciBhIGNhbnZhcyBiYXNlZCByZW5kZXJlci5cbipcbiogQGNsYXNzIFJlbmRlclBpeGlcbiogQGRlcHJlY2F0ZWQgdGhlIE1hdHRlci5SZW5kZXJQaXhpIG1vZHVsZSB3aWxsIHNvb24gYmUgcmVtb3ZlZCBmcm9tIHRoZSBNYXR0ZXIuanMgY29yZS5cbiogSXQgd2lsbCBsaWtlbHkgYmUgbW92ZWQgdG8gaXRzIG93biByZXBvc2l0b3J5IChidXQgbWFpbnRlbmFuY2Ugd2lsbCBiZSBsaW1pdGVkKS5cbiovXG5cbnZhciBSZW5kZXJQaXhpID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gUmVuZGVyUGl4aTtcblxudmFyIEJvdW5kcyA9IF9kZXJlcV8oJy4uL2dlb21ldHJ5L0JvdW5kcycpO1xudmFyIENvbXBvc2l0ZSA9IF9kZXJlcV8oJy4uL2JvZHkvQ29tcG9zaXRlJyk7XG52YXIgQ29tbW9uID0gX2RlcmVxXygnLi4vY29yZS9Db21tb24nKTtcbnZhciBFdmVudHMgPSBfZGVyZXFfKCcuLi9jb3JlL0V2ZW50cycpO1xudmFyIFZlY3RvciA9IF9kZXJlcV8oJy4uL2dlb21ldHJ5L1ZlY3RvcicpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgX3JlcXVlc3RBbmltYXRpb25GcmFtZSxcbiAgICAgICAgX2NhbmNlbEFuaW1hdGlvbkZyYW1lO1xuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIF9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IGZ1bmN0aW9uKGNhbGxiYWNrKXsgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKENvbW1vbi5ub3coKSk7IH0sIDEwMDAgLyA2MCk7IH07XG4gICBcbiAgICAgICAgX2NhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tb3pDYW5jZWxBbmltYXRpb25GcmFtZSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tc0NhbmNlbEFuaW1hdGlvbkZyYW1lO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IFBpeGkuanMgV2ViR0wgcmVuZGVyZXJcbiAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gICAgICogQHJldHVybiB7UmVuZGVyUGl4aX0gQSBuZXcgcmVuZGVyZXJcbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIFJlbmRlclBpeGkuY3JlYXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICBDb21tb24ud2FybignUmVuZGVyUGl4aS5jcmVhdGU6IE1hdHRlci5SZW5kZXJQaXhpIGlzIGRlcHJlY2F0ZWQgKHNlZSBkb2NzKScpO1xuXG4gICAgICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFJlbmRlclBpeGksXG4gICAgICAgICAgICBlbmdpbmU6IG51bGwsXG4gICAgICAgICAgICBlbGVtZW50OiBudWxsLFxuICAgICAgICAgICAgZnJhbWVSZXF1ZXN0SWQ6IG51bGwsXG4gICAgICAgICAgICBjYW52YXM6IG51bGwsXG4gICAgICAgICAgICByZW5kZXJlcjogbnVsbCxcbiAgICAgICAgICAgIGNvbnRhaW5lcjogbnVsbCxcbiAgICAgICAgICAgIHNwcml0ZUNvbnRhaW5lcjogbnVsbCxcbiAgICAgICAgICAgIHBpeGlPcHRpb25zOiBudWxsLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgIHdpZHRoOiA4MDAsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA2MDAsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmYWZhZmEnLFxuICAgICAgICAgICAgICAgIHdpcmVmcmFtZUJhY2tncm91bmQ6ICcjMjIyJyxcbiAgICAgICAgICAgICAgICBoYXNCb3VuZHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgd2lyZWZyYW1lczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzaG93U2xlZXBpbmc6IHRydWUsXG4gICAgICAgICAgICAgICAgc2hvd0RlYnVnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93QnJvYWRwaGFzZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd0JvdW5kczogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd1ZlbG9jaXR5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93Q29sbGlzaW9uczogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd0F4ZXM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dQb3NpdGlvbnM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dBbmdsZUluZGljYXRvcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd0lkczogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd1NoYWRvd3M6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHJlbmRlciA9IENvbW1vbi5leHRlbmQoZGVmYXVsdHMsIG9wdGlvbnMpLFxuICAgICAgICAgICAgdHJhbnNwYXJlbnQgPSAhcmVuZGVyLm9wdGlvbnMud2lyZWZyYW1lcyAmJiByZW5kZXIub3B0aW9ucy5iYWNrZ3JvdW5kID09PSAndHJhbnNwYXJlbnQnO1xuXG4gICAgICAgIC8vIGluaXQgcGl4aVxuICAgICAgICByZW5kZXIucGl4aU9wdGlvbnMgPSByZW5kZXIucGl4aU9wdGlvbnMgfHwge1xuICAgICAgICAgICAgdmlldzogcmVuZGVyLmNhbnZhcyxcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cmFuc3BhcmVudCxcbiAgICAgICAgICAgIGFudGlhbGlhczogdHJ1ZSxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogb3B0aW9ucy5iYWNrZ3JvdW5kXG4gICAgICAgIH07XG5cbiAgICAgICAgcmVuZGVyLm1vdXNlID0gb3B0aW9ucy5tb3VzZTtcbiAgICAgICAgcmVuZGVyLmVuZ2luZSA9IG9wdGlvbnMuZW5naW5lO1xuICAgICAgICByZW5kZXIucmVuZGVyZXIgPSByZW5kZXIucmVuZGVyZXIgfHwgbmV3IFBJWEkuV2ViR0xSZW5kZXJlcihyZW5kZXIub3B0aW9ucy53aWR0aCwgcmVuZGVyLm9wdGlvbnMuaGVpZ2h0LCByZW5kZXIucGl4aU9wdGlvbnMpO1xuICAgICAgICByZW5kZXIuY29udGFpbmVyID0gcmVuZGVyLmNvbnRhaW5lciB8fCBuZXcgUElYSS5Db250YWluZXIoKTtcbiAgICAgICAgcmVuZGVyLnNwcml0ZUNvbnRhaW5lciA9IHJlbmRlci5zcHJpdGVDb250YWluZXIgfHwgbmV3IFBJWEkuQ29udGFpbmVyKCk7XG4gICAgICAgIHJlbmRlci5jYW52YXMgPSByZW5kZXIuY2FudmFzIHx8IHJlbmRlci5yZW5kZXJlci52aWV3O1xuICAgICAgICByZW5kZXIuYm91bmRzID0gcmVuZGVyLmJvdW5kcyB8fCB7IFxuICAgICAgICAgICAgbWluOiB7XG4gICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICB5OiAwXG4gICAgICAgICAgICB9LCBcbiAgICAgICAgICAgIG1heDogeyBcbiAgICAgICAgICAgICAgICB4OiByZW5kZXIub3B0aW9ucy53aWR0aCxcbiAgICAgICAgICAgICAgICB5OiByZW5kZXIub3B0aW9ucy5oZWlnaHRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgRXZlbnRzLm9uKHJlbmRlci5lbmdpbmUsICdiZWZvcmVVcGRhdGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIFJlbmRlclBpeGkuY2xlYXIocmVuZGVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2FjaGVzXG4gICAgICAgIHJlbmRlci50ZXh0dXJlcyA9IHt9O1xuICAgICAgICByZW5kZXIuc3ByaXRlcyA9IHt9O1xuICAgICAgICByZW5kZXIucHJpbWl0aXZlcyA9IHt9O1xuXG4gICAgICAgIC8vIHVzZSBhIHNwcml0ZSBiYXRjaCBmb3IgcGVyZm9ybWFuY2VcbiAgICAgICAgcmVuZGVyLmNvbnRhaW5lci5hZGRDaGlsZChyZW5kZXIuc3ByaXRlQ29udGFpbmVyKTtcblxuICAgICAgICAvLyBpbnNlcnQgY2FudmFzXG4gICAgICAgIGlmIChDb21tb24uaXNFbGVtZW50KHJlbmRlci5lbGVtZW50KSkge1xuICAgICAgICAgICAgcmVuZGVyLmVsZW1lbnQuYXBwZW5kQ2hpbGQocmVuZGVyLmNhbnZhcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBDb21tb24ud2FybignTm8gXCJyZW5kZXIuZWxlbWVudFwiIHBhc3NlZCwgXCJyZW5kZXIuY2FudmFzXCIgd2FzIG5vdCBpbnNlcnRlZCBpbnRvIGRvY3VtZW50LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJldmVudCBtZW51cyBvbiBjYW52YXNcbiAgICAgICAgcmVuZGVyLmNhbnZhcy5vbmNvbnRleHRtZW51ID0gZnVuY3Rpb24oKSB7IHJldHVybiBmYWxzZTsgfTtcbiAgICAgICAgcmVuZGVyLmNhbnZhcy5vbnNlbGVjdHN0YXJ0ID0gZnVuY3Rpb24oKSB7IHJldHVybiBmYWxzZTsgfTtcblxuICAgICAgICByZXR1cm4gcmVuZGVyO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDb250aW51b3VzbHkgdXBkYXRlcyB0aGUgcmVuZGVyIGNhbnZhcyBvbiB0aGUgYHJlcXVlc3RBbmltYXRpb25GcmFtZWAgZXZlbnQuXG4gICAgICogQG1ldGhvZCBydW5cbiAgICAgKiBAcGFyYW0ge3JlbmRlcn0gcmVuZGVyXG4gICAgICogQGRlcHJlY2F0ZWRcbiAgICAgKi9cbiAgICBSZW5kZXJQaXhpLnJ1biA9IGZ1bmN0aW9uKHJlbmRlcikge1xuICAgICAgICAoZnVuY3Rpb24gbG9vcCh0aW1lKXtcbiAgICAgICAgICAgIHJlbmRlci5mcmFtZVJlcXVlc3RJZCA9IF9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgICAgICAgICBSZW5kZXJQaXhpLndvcmxkKHJlbmRlcik7XG4gICAgICAgIH0pKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVuZHMgZXhlY3V0aW9uIG9mIGBSZW5kZXIucnVuYCBvbiB0aGUgZ2l2ZW4gYHJlbmRlcmAsIGJ5IGNhbmNlbGluZyB0aGUgYW5pbWF0aW9uIGZyYW1lIHJlcXVlc3QgZXZlbnQgbG9vcC5cbiAgICAgKiBAbWV0aG9kIHN0b3BcbiAgICAgKiBAcGFyYW0ge3JlbmRlcn0gcmVuZGVyXG4gICAgICogQGRlcHJlY2F0ZWRcbiAgICAgKi9cbiAgICBSZW5kZXJQaXhpLnN0b3AgPSBmdW5jdGlvbihyZW5kZXIpIHtcbiAgICAgICAgX2NhbmNlbEFuaW1hdGlvbkZyYW1lKHJlbmRlci5mcmFtZVJlcXVlc3RJZCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgc2NlbmUgZ3JhcGhcbiAgICAgKiBAbWV0aG9kIGNsZWFyXG4gICAgICogQHBhcmFtIHtSZW5kZXJQaXhpfSByZW5kZXJcbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIFJlbmRlclBpeGkuY2xlYXIgPSBmdW5jdGlvbihyZW5kZXIpIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHJlbmRlci5jb250YWluZXIsXG4gICAgICAgICAgICBzcHJpdGVDb250YWluZXIgPSByZW5kZXIuc3ByaXRlQ29udGFpbmVyO1xuXG4gICAgICAgIC8vIGNsZWFyIHN0YWdlIGNvbnRhaW5lclxuICAgICAgICB3aGlsZSAoY29udGFpbmVyLmNoaWxkcmVuWzBdKSB7IFxuICAgICAgICAgICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKGNvbnRhaW5lci5jaGlsZHJlblswXSk7IFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2xlYXIgc3ByaXRlIGJhdGNoXG4gICAgICAgIHdoaWxlIChzcHJpdGVDb250YWluZXIuY2hpbGRyZW5bMF0pIHsgXG4gICAgICAgICAgICBzcHJpdGVDb250YWluZXIucmVtb3ZlQ2hpbGQoc3ByaXRlQ29udGFpbmVyLmNoaWxkcmVuWzBdKTsgXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYmdTcHJpdGUgPSByZW5kZXIuc3ByaXRlc1snYmctMCddO1xuXG4gICAgICAgIC8vIGNsZWFyIGNhY2hlc1xuICAgICAgICByZW5kZXIudGV4dHVyZXMgPSB7fTtcbiAgICAgICAgcmVuZGVyLnNwcml0ZXMgPSB7fTtcbiAgICAgICAgcmVuZGVyLnByaW1pdGl2ZXMgPSB7fTtcblxuICAgICAgICAvLyBzZXQgYmFja2dyb3VuZCBzcHJpdGVcbiAgICAgICAgcmVuZGVyLnNwcml0ZXNbJ2JnLTAnXSA9IGJnU3ByaXRlO1xuICAgICAgICBpZiAoYmdTcHJpdGUpXG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2hpbGRBdChiZ1Nwcml0ZSwgMCk7XG5cbiAgICAgICAgLy8gYWRkIHNwcml0ZSBiYXRjaCBiYWNrIGludG8gY29udGFpbmVyXG4gICAgICAgIHJlbmRlci5jb250YWluZXIuYWRkQ2hpbGQocmVuZGVyLnNwcml0ZUNvbnRhaW5lcik7XG5cbiAgICAgICAgLy8gcmVzZXQgYmFja2dyb3VuZCBzdGF0ZVxuICAgICAgICByZW5kZXIuY3VycmVudEJhY2tncm91bmQgPSBudWxsO1xuXG4gICAgICAgIC8vIHJlc2V0IGJvdW5kcyB0cmFuc2Zvcm1zXG4gICAgICAgIGNvbnRhaW5lci5zY2FsZS5zZXQoMSwgMSk7XG4gICAgICAgIGNvbnRhaW5lci5wb3NpdGlvbi5zZXQoMCwgMCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGJhY2tncm91bmQgb2YgdGhlIGNhbnZhcyBcbiAgICAgKiBAbWV0aG9kIHNldEJhY2tncm91bmRcbiAgICAgKiBAcGFyYW0ge1JlbmRlclBpeGl9IHJlbmRlclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBiYWNrZ3JvdW5kXG4gICAgICogQGRlcHJlY2F0ZWRcbiAgICAgKi9cbiAgICBSZW5kZXJQaXhpLnNldEJhY2tncm91bmQgPSBmdW5jdGlvbihyZW5kZXIsIGJhY2tncm91bmQpIHtcbiAgICAgICAgaWYgKHJlbmRlci5jdXJyZW50QmFja2dyb3VuZCAhPT0gYmFja2dyb3VuZCkge1xuICAgICAgICAgICAgdmFyIGlzQ29sb3IgPSBiYWNrZ3JvdW5kLmluZGV4T2YgJiYgYmFja2dyb3VuZC5pbmRleE9mKCcjJykgIT09IC0xLFxuICAgICAgICAgICAgICAgIGJnU3ByaXRlID0gcmVuZGVyLnNwcml0ZXNbJ2JnLTAnXTtcblxuICAgICAgICAgICAgaWYgKGlzQ29sb3IpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiBzb2xpZCBiYWNrZ3JvdW5kIGNvbG9yXG4gICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gQ29tbW9uLmNvbG9yVG9OdW1iZXIoYmFja2dyb3VuZCk7XG4gICAgICAgICAgICAgICAgcmVuZGVyLnJlbmRlcmVyLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGJhY2tncm91bmQgc3ByaXRlIGlmIGV4aXN0aW5nXG4gICAgICAgICAgICAgICAgaWYgKGJnU3ByaXRlKVxuICAgICAgICAgICAgICAgICAgICByZW5kZXIuY29udGFpbmVyLnJlbW92ZUNoaWxkKGJnU3ByaXRlKTsgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGluaXRpYWxpc2UgYmFja2dyb3VuZCBzcHJpdGUgaWYgbmVlZGVkXG4gICAgICAgICAgICAgICAgaWYgKCFiZ1Nwcml0ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dHVyZSA9IF9nZXRUZXh0dXJlKHJlbmRlciwgYmFja2dyb3VuZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgYmdTcHJpdGUgPSByZW5kZXIuc3ByaXRlc1snYmctMCddID0gbmV3IFBJWEkuU3ByaXRlKHRleHR1cmUpO1xuICAgICAgICAgICAgICAgICAgICBiZ1Nwcml0ZS5wb3NpdGlvbi54ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgYmdTcHJpdGUucG9zaXRpb24ueSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlci5jb250YWluZXIuYWRkQ2hpbGRBdChiZ1Nwcml0ZSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZW5kZXIuY3VycmVudEJhY2tncm91bmQgPSBiYWNrZ3JvdW5kO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlc2NyaXB0aW9uXG4gICAgICogQG1ldGhvZCB3b3JsZFxuICAgICAqIEBwYXJhbSB7ZW5naW5lfSBlbmdpbmVcbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIFJlbmRlclBpeGkud29ybGQgPSBmdW5jdGlvbihyZW5kZXIpIHtcbiAgICAgICAgdmFyIGVuZ2luZSA9IHJlbmRlci5lbmdpbmUsXG4gICAgICAgICAgICB3b3JsZCA9IGVuZ2luZS53b3JsZCxcbiAgICAgICAgICAgIHJlbmRlcmVyID0gcmVuZGVyLnJlbmRlcmVyLFxuICAgICAgICAgICAgY29udGFpbmVyID0gcmVuZGVyLmNvbnRhaW5lcixcbiAgICAgICAgICAgIG9wdGlvbnMgPSByZW5kZXIub3B0aW9ucyxcbiAgICAgICAgICAgIGJvZGllcyA9IENvbXBvc2l0ZS5hbGxCb2RpZXMod29ybGQpLFxuICAgICAgICAgICAgYWxsQ29uc3RyYWludHMgPSBDb21wb3NpdGUuYWxsQ29uc3RyYWludHMod29ybGQpLFxuICAgICAgICAgICAgY29uc3RyYWludHMgPSBbXSxcbiAgICAgICAgICAgIGk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMud2lyZWZyYW1lcykge1xuICAgICAgICAgICAgUmVuZGVyUGl4aS5zZXRCYWNrZ3JvdW5kKHJlbmRlciwgb3B0aW9ucy53aXJlZnJhbWVCYWNrZ3JvdW5kKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFJlbmRlclBpeGkuc2V0QmFja2dyb3VuZChyZW5kZXIsIG9wdGlvbnMuYmFja2dyb3VuZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBoYW5kbGUgYm91bmRzXG4gICAgICAgIHZhciBib3VuZHNXaWR0aCA9IHJlbmRlci5ib3VuZHMubWF4LnggLSByZW5kZXIuYm91bmRzLm1pbi54LFxuICAgICAgICAgICAgYm91bmRzSGVpZ2h0ID0gcmVuZGVyLmJvdW5kcy5tYXgueSAtIHJlbmRlci5ib3VuZHMubWluLnksXG4gICAgICAgICAgICBib3VuZHNTY2FsZVggPSBib3VuZHNXaWR0aCAvIHJlbmRlci5vcHRpb25zLndpZHRoLFxuICAgICAgICAgICAgYm91bmRzU2NhbGVZID0gYm91bmRzSGVpZ2h0IC8gcmVuZGVyLm9wdGlvbnMuaGVpZ2h0O1xuXG4gICAgICAgIGlmIChvcHRpb25zLmhhc0JvdW5kcykge1xuICAgICAgICAgICAgLy8gSGlkZSBib2RpZXMgdGhhdCBhcmUgbm90IGluIHZpZXdcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgYm9keSA9IGJvZGllc1tpXTtcbiAgICAgICAgICAgICAgICBib2R5LnJlbmRlci5zcHJpdGUudmlzaWJsZSA9IEJvdW5kcy5vdmVybGFwcyhib2R5LmJvdW5kcywgcmVuZGVyLmJvdW5kcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGZpbHRlciBvdXQgY29uc3RyYWludHMgdGhhdCBhcmUgbm90IGluIHZpZXdcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhbGxDb25zdHJhaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBjb25zdHJhaW50ID0gYWxsQ29uc3RyYWludHNbaV0sXG4gICAgICAgICAgICAgICAgICAgIGJvZHlBID0gY29uc3RyYWludC5ib2R5QSxcbiAgICAgICAgICAgICAgICAgICAgYm9keUIgPSBjb25zdHJhaW50LmJvZHlCLFxuICAgICAgICAgICAgICAgICAgICBwb2ludEFXb3JsZCA9IGNvbnN0cmFpbnQucG9pbnRBLFxuICAgICAgICAgICAgICAgICAgICBwb2ludEJXb3JsZCA9IGNvbnN0cmFpbnQucG9pbnRCO1xuXG4gICAgICAgICAgICAgICAgaWYgKGJvZHlBKSBwb2ludEFXb3JsZCA9IFZlY3Rvci5hZGQoYm9keUEucG9zaXRpb24sIGNvbnN0cmFpbnQucG9pbnRBKTtcbiAgICAgICAgICAgICAgICBpZiAoYm9keUIpIHBvaW50QldvcmxkID0gVmVjdG9yLmFkZChib2R5Qi5wb3NpdGlvbiwgY29uc3RyYWludC5wb2ludEIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFwb2ludEFXb3JsZCB8fCAhcG9pbnRCV29ybGQpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKEJvdW5kcy5jb250YWlucyhyZW5kZXIuYm91bmRzLCBwb2ludEFXb3JsZCkgfHwgQm91bmRzLmNvbnRhaW5zKHJlbmRlci5ib3VuZHMsIHBvaW50QldvcmxkKSlcbiAgICAgICAgICAgICAgICAgICAgY29uc3RyYWludHMucHVzaChjb25zdHJhaW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdHJhbnNmb3JtIHRoZSB2aWV3XG4gICAgICAgICAgICBjb250YWluZXIuc2NhbGUuc2V0KDEgLyBib3VuZHNTY2FsZVgsIDEgLyBib3VuZHNTY2FsZVkpO1xuICAgICAgICAgICAgY29udGFpbmVyLnBvc2l0aW9uLnNldCgtcmVuZGVyLmJvdW5kcy5taW4ueCAqICgxIC8gYm91bmRzU2NhbGVYKSwgLXJlbmRlci5ib3VuZHMubWluLnkgKiAoMSAvIGJvdW5kc1NjYWxlWSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3RyYWludHMgPSBhbGxDb25zdHJhaW50cztcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBSZW5kZXJQaXhpLmJvZHkocmVuZGVyLCBib2RpZXNbaV0pO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb25zdHJhaW50cy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIFJlbmRlclBpeGkuY29uc3RyYWludChyZW5kZXIsIGNvbnN0cmFpbnRzW2ldKTtcblxuICAgICAgICByZW5kZXJlci5yZW5kZXIoY29udGFpbmVyKTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBEZXNjcmlwdGlvblxuICAgICAqIEBtZXRob2QgY29uc3RyYWludFxuICAgICAqIEBwYXJhbSB7ZW5naW5lfSBlbmdpbmVcbiAgICAgKiBAcGFyYW0ge2NvbnN0cmFpbnR9IGNvbnN0cmFpbnRcbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIFJlbmRlclBpeGkuY29uc3RyYWludCA9IGZ1bmN0aW9uKHJlbmRlciwgY29uc3RyYWludCkge1xuICAgICAgICB2YXIgZW5naW5lID0gcmVuZGVyLmVuZ2luZSxcbiAgICAgICAgICAgIGJvZHlBID0gY29uc3RyYWludC5ib2R5QSxcbiAgICAgICAgICAgIGJvZHlCID0gY29uc3RyYWludC5ib2R5QixcbiAgICAgICAgICAgIHBvaW50QSA9IGNvbnN0cmFpbnQucG9pbnRBLFxuICAgICAgICAgICAgcG9pbnRCID0gY29uc3RyYWludC5wb2ludEIsXG4gICAgICAgICAgICBjb250YWluZXIgPSByZW5kZXIuY29udGFpbmVyLFxuICAgICAgICAgICAgY29uc3RyYWludFJlbmRlciA9IGNvbnN0cmFpbnQucmVuZGVyLFxuICAgICAgICAgICAgcHJpbWl0aXZlSWQgPSAnYy0nICsgY29uc3RyYWludC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZSA9IHJlbmRlci5wcmltaXRpdmVzW3ByaW1pdGl2ZUlkXTtcblxuICAgICAgICAvLyBpbml0aWFsaXNlIGNvbnN0cmFpbnQgcHJpbWl0aXZlIGlmIG5vdCBleGlzdGluZ1xuICAgICAgICBpZiAoIXByaW1pdGl2ZSlcbiAgICAgICAgICAgIHByaW1pdGl2ZSA9IHJlbmRlci5wcmltaXRpdmVzW3ByaW1pdGl2ZUlkXSA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG5cbiAgICAgICAgLy8gZG9uJ3QgcmVuZGVyIGlmIGNvbnN0cmFpbnQgZG9lcyBub3QgaGF2ZSB0d28gZW5kIHBvaW50c1xuICAgICAgICBpZiAoIWNvbnN0cmFpbnRSZW5kZXIudmlzaWJsZSB8fCAhY29uc3RyYWludC5wb2ludEEgfHwgIWNvbnN0cmFpbnQucG9pbnRCKSB7XG4gICAgICAgICAgICBwcmltaXRpdmUuY2xlYXIoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCB0byBzY2VuZSBncmFwaCBpZiBub3QgYWxyZWFkeSB0aGVyZVxuICAgICAgICBpZiAoQ29tbW9uLmluZGV4T2YoY29udGFpbmVyLmNoaWxkcmVuLCBwcmltaXRpdmUpID09PSAtMSlcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDaGlsZChwcmltaXRpdmUpO1xuXG4gICAgICAgIC8vIHJlbmRlciB0aGUgY29uc3RyYWludCBvbiBldmVyeSB1cGRhdGUsIHNpbmNlIHRoZXkgY2FuIGNoYW5nZSBkeW5hbWljYWxseVxuICAgICAgICBwcmltaXRpdmUuY2xlYXIoKTtcbiAgICAgICAgcHJpbWl0aXZlLmJlZ2luRmlsbCgwLCAwKTtcbiAgICAgICAgcHJpbWl0aXZlLmxpbmVTdHlsZShjb25zdHJhaW50UmVuZGVyLmxpbmVXaWR0aCwgQ29tbW9uLmNvbG9yVG9OdW1iZXIoY29uc3RyYWludFJlbmRlci5zdHJva2VTdHlsZSksIDEpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGJvZHlBKSB7XG4gICAgICAgICAgICBwcmltaXRpdmUubW92ZVRvKGJvZHlBLnBvc2l0aW9uLnggKyBwb2ludEEueCwgYm9keUEucG9zaXRpb24ueSArIHBvaW50QS55KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByaW1pdGl2ZS5tb3ZlVG8ocG9pbnRBLngsIHBvaW50QS55KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChib2R5Qikge1xuICAgICAgICAgICAgcHJpbWl0aXZlLmxpbmVUbyhib2R5Qi5wb3NpdGlvbi54ICsgcG9pbnRCLngsIGJvZHlCLnBvc2l0aW9uLnkgKyBwb2ludEIueSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcmltaXRpdmUubGluZVRvKHBvaW50Qi54LCBwb2ludEIueSk7XG4gICAgICAgIH1cblxuICAgICAgICBwcmltaXRpdmUuZW5kRmlsbCgpO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogRGVzY3JpcHRpb25cbiAgICAgKiBAbWV0aG9kIGJvZHlcbiAgICAgKiBAcGFyYW0ge2VuZ2luZX0gZW5naW5lXG4gICAgICogQHBhcmFtIHtib2R5fSBib2R5XG4gICAgICogQGRlcHJlY2F0ZWRcbiAgICAgKi9cbiAgICBSZW5kZXJQaXhpLmJvZHkgPSBmdW5jdGlvbihyZW5kZXIsIGJvZHkpIHtcbiAgICAgICAgdmFyIGVuZ2luZSA9IHJlbmRlci5lbmdpbmUsXG4gICAgICAgICAgICBib2R5UmVuZGVyID0gYm9keS5yZW5kZXI7XG5cbiAgICAgICAgaWYgKCFib2R5UmVuZGVyLnZpc2libGUpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgaWYgKGJvZHlSZW5kZXIuc3ByaXRlICYmIGJvZHlSZW5kZXIuc3ByaXRlLnRleHR1cmUpIHtcbiAgICAgICAgICAgIHZhciBzcHJpdGVJZCA9ICdiLScgKyBib2R5LmlkLFxuICAgICAgICAgICAgICAgIHNwcml0ZSA9IHJlbmRlci5zcHJpdGVzW3Nwcml0ZUlkXSxcbiAgICAgICAgICAgICAgICBzcHJpdGVDb250YWluZXIgPSByZW5kZXIuc3ByaXRlQ29udGFpbmVyO1xuXG4gICAgICAgICAgICAvLyBpbml0aWFsaXNlIGJvZHkgc3ByaXRlIGlmIG5vdCBleGlzdGluZ1xuICAgICAgICAgICAgaWYgKCFzcHJpdGUpXG4gICAgICAgICAgICAgICAgc3ByaXRlID0gcmVuZGVyLnNwcml0ZXNbc3ByaXRlSWRdID0gX2NyZWF0ZUJvZHlTcHJpdGUocmVuZGVyLCBib2R5KTtcblxuICAgICAgICAgICAgLy8gYWRkIHRvIHNjZW5lIGdyYXBoIGlmIG5vdCBhbHJlYWR5IHRoZXJlXG4gICAgICAgICAgICBpZiAoQ29tbW9uLmluZGV4T2Yoc3ByaXRlQ29udGFpbmVyLmNoaWxkcmVuLCBzcHJpdGUpID09PSAtMSlcbiAgICAgICAgICAgICAgICBzcHJpdGVDb250YWluZXIuYWRkQ2hpbGQoc3ByaXRlKTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIGJvZHkgc3ByaXRlXG4gICAgICAgICAgICBzcHJpdGUucG9zaXRpb24ueCA9IGJvZHkucG9zaXRpb24ueDtcbiAgICAgICAgICAgIHNwcml0ZS5wb3NpdGlvbi55ID0gYm9keS5wb3NpdGlvbi55O1xuICAgICAgICAgICAgc3ByaXRlLnJvdGF0aW9uID0gYm9keS5hbmdsZTtcbiAgICAgICAgICAgIHNwcml0ZS5zY2FsZS54ID0gYm9keVJlbmRlci5zcHJpdGUueFNjYWxlIHx8IDE7XG4gICAgICAgICAgICBzcHJpdGUuc2NhbGUueSA9IGJvZHlSZW5kZXIuc3ByaXRlLnlTY2FsZSB8fCAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHByaW1pdGl2ZUlkID0gJ2ItJyArIGJvZHkuaWQsXG4gICAgICAgICAgICAgICAgcHJpbWl0aXZlID0gcmVuZGVyLnByaW1pdGl2ZXNbcHJpbWl0aXZlSWRdLFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IHJlbmRlci5jb250YWluZXI7XG5cbiAgICAgICAgICAgIC8vIGluaXRpYWxpc2UgYm9keSBwcmltaXRpdmUgaWYgbm90IGV4aXN0aW5nXG4gICAgICAgICAgICBpZiAoIXByaW1pdGl2ZSkge1xuICAgICAgICAgICAgICAgIHByaW1pdGl2ZSA9IHJlbmRlci5wcmltaXRpdmVzW3ByaW1pdGl2ZUlkXSA9IF9jcmVhdGVCb2R5UHJpbWl0aXZlKHJlbmRlciwgYm9keSk7XG4gICAgICAgICAgICAgICAgcHJpbWl0aXZlLmluaXRpYWxBbmdsZSA9IGJvZHkuYW5nbGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFkZCB0byBzY2VuZSBncmFwaCBpZiBub3QgYWxyZWFkeSB0aGVyZVxuICAgICAgICAgICAgaWYgKENvbW1vbi5pbmRleE9mKGNvbnRhaW5lci5jaGlsZHJlbiwgcHJpbWl0aXZlKSA9PT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFkZENoaWxkKHByaW1pdGl2ZSk7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBib2R5IHByaW1pdGl2ZVxuICAgICAgICAgICAgcHJpbWl0aXZlLnBvc2l0aW9uLnggPSBib2R5LnBvc2l0aW9uLng7XG4gICAgICAgICAgICBwcmltaXRpdmUucG9zaXRpb24ueSA9IGJvZHkucG9zaXRpb24ueTtcbiAgICAgICAgICAgIHByaW1pdGl2ZS5yb3RhdGlvbiA9IGJvZHkuYW5nbGUgLSBwcmltaXRpdmUuaW5pdGlhbEFuZ2xlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBib2R5IHNwcml0ZVxuICAgICAqIEBtZXRob2QgX2NyZWF0ZUJvZHlTcHJpdGVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7UmVuZGVyUGl4aX0gcmVuZGVyXG4gICAgICogQHBhcmFtIHtib2R5fSBib2R5XG4gICAgICogQHJldHVybiB7UElYSS5TcHJpdGV9IHNwcml0ZVxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgdmFyIF9jcmVhdGVCb2R5U3ByaXRlID0gZnVuY3Rpb24ocmVuZGVyLCBib2R5KSB7XG4gICAgICAgIHZhciBib2R5UmVuZGVyID0gYm9keS5yZW5kZXIsXG4gICAgICAgICAgICB0ZXh0dXJlUGF0aCA9IGJvZHlSZW5kZXIuc3ByaXRlLnRleHR1cmUsXG4gICAgICAgICAgICB0ZXh0dXJlID0gX2dldFRleHR1cmUocmVuZGVyLCB0ZXh0dXJlUGF0aCksXG4gICAgICAgICAgICBzcHJpdGUgPSBuZXcgUElYSS5TcHJpdGUodGV4dHVyZSk7XG5cbiAgICAgICAgc3ByaXRlLmFuY2hvci54ID0gYm9keS5yZW5kZXIuc3ByaXRlLnhPZmZzZXQ7XG4gICAgICAgIHNwcml0ZS5hbmNob3IueSA9IGJvZHkucmVuZGVyLnNwcml0ZS55T2Zmc2V0O1xuXG4gICAgICAgIHJldHVybiBzcHJpdGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBib2R5IHByaW1pdGl2ZVxuICAgICAqIEBtZXRob2QgX2NyZWF0ZUJvZHlQcmltaXRpdmVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7UmVuZGVyUGl4aX0gcmVuZGVyXG4gICAgICogQHBhcmFtIHtib2R5fSBib2R5XG4gICAgICogQHJldHVybiB7UElYSS5HcmFwaGljc30gZ3JhcGhpY3NcbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIHZhciBfY3JlYXRlQm9keVByaW1pdGl2ZSA9IGZ1bmN0aW9uKHJlbmRlciwgYm9keSkge1xuICAgICAgICB2YXIgYm9keVJlbmRlciA9IGJvZHkucmVuZGVyLFxuICAgICAgICAgICAgb3B0aW9ucyA9IHJlbmRlci5vcHRpb25zLFxuICAgICAgICAgICAgcHJpbWl0aXZlID0gbmV3IFBJWEkuR3JhcGhpY3MoKSxcbiAgICAgICAgICAgIGZpbGxTdHlsZSA9IENvbW1vbi5jb2xvclRvTnVtYmVyKGJvZHlSZW5kZXIuZmlsbFN0eWxlKSxcbiAgICAgICAgICAgIHN0cm9rZVN0eWxlID0gQ29tbW9uLmNvbG9yVG9OdW1iZXIoYm9keVJlbmRlci5zdHJva2VTdHlsZSksXG4gICAgICAgICAgICBzdHJva2VTdHlsZUluZGljYXRvciA9IENvbW1vbi5jb2xvclRvTnVtYmVyKGJvZHlSZW5kZXIuc3Ryb2tlU3R5bGUpLFxuICAgICAgICAgICAgc3Ryb2tlU3R5bGVXaXJlZnJhbWUgPSBDb21tb24uY29sb3JUb051bWJlcignI2JiYicpLFxuICAgICAgICAgICAgc3Ryb2tlU3R5bGVXaXJlZnJhbWVJbmRpY2F0b3IgPSBDb21tb24uY29sb3JUb051bWJlcignI0NENUM1QycpLFxuICAgICAgICAgICAgcGFydDtcblxuICAgICAgICBwcmltaXRpdmUuY2xlYXIoKTtcblxuICAgICAgICAvLyBoYW5kbGUgY29tcG91bmQgcGFydHNcbiAgICAgICAgZm9yICh2YXIgayA9IGJvZHkucGFydHMubGVuZ3RoID4gMSA/IDEgOiAwOyBrIDwgYm9keS5wYXJ0cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgcGFydCA9IGJvZHkucGFydHNba107XG5cbiAgICAgICAgICAgIGlmICghb3B0aW9ucy53aXJlZnJhbWVzKSB7XG4gICAgICAgICAgICAgICAgcHJpbWl0aXZlLmJlZ2luRmlsbChmaWxsU3R5bGUsIDEpO1xuICAgICAgICAgICAgICAgIHByaW1pdGl2ZS5saW5lU3R5bGUoYm9keVJlbmRlci5saW5lV2lkdGgsIHN0cm9rZVN0eWxlLCAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJpbWl0aXZlLmJlZ2luRmlsbCgwLCAwKTtcbiAgICAgICAgICAgICAgICBwcmltaXRpdmUubGluZVN0eWxlKDEsIHN0cm9rZVN0eWxlV2lyZWZyYW1lLCAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJpbWl0aXZlLm1vdmVUbyhwYXJ0LnZlcnRpY2VzWzBdLnggLSBib2R5LnBvc2l0aW9uLngsIHBhcnQudmVydGljZXNbMF0ueSAtIGJvZHkucG9zaXRpb24ueSk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgcGFydC52ZXJ0aWNlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHByaW1pdGl2ZS5saW5lVG8ocGFydC52ZXJ0aWNlc1tqXS54IC0gYm9keS5wb3NpdGlvbi54LCBwYXJ0LnZlcnRpY2VzW2pdLnkgLSBib2R5LnBvc2l0aW9uLnkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwcmltaXRpdmUubGluZVRvKHBhcnQudmVydGljZXNbMF0ueCAtIGJvZHkucG9zaXRpb24ueCwgcGFydC52ZXJ0aWNlc1swXS55IC0gYm9keS5wb3NpdGlvbi55KTtcblxuICAgICAgICAgICAgcHJpbWl0aXZlLmVuZEZpbGwoKTtcblxuICAgICAgICAgICAgLy8gYW5nbGUgaW5kaWNhdG9yXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93QW5nbGVJbmRpY2F0b3IgfHwgb3B0aW9ucy5zaG93QXhlcykge1xuICAgICAgICAgICAgICAgIHByaW1pdGl2ZS5iZWdpbkZpbGwoMCwgMCk7XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy53aXJlZnJhbWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHByaW1pdGl2ZS5saW5lU3R5bGUoMSwgc3Ryb2tlU3R5bGVXaXJlZnJhbWVJbmRpY2F0b3IsIDEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHByaW1pdGl2ZS5saW5lU3R5bGUoMSwgc3Ryb2tlU3R5bGVJbmRpY2F0b3IpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByaW1pdGl2ZS5tb3ZlVG8ocGFydC5wb3NpdGlvbi54IC0gYm9keS5wb3NpdGlvbi54LCBwYXJ0LnBvc2l0aW9uLnkgLSBib2R5LnBvc2l0aW9uLnkpO1xuICAgICAgICAgICAgICAgIHByaW1pdGl2ZS5saW5lVG8oKChwYXJ0LnZlcnRpY2VzWzBdLnggKyBwYXJ0LnZlcnRpY2VzW3BhcnQudmVydGljZXMubGVuZ3RoLTFdLngpIC8gMiAtIGJvZHkucG9zaXRpb24ueCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKChwYXJ0LnZlcnRpY2VzWzBdLnkgKyBwYXJ0LnZlcnRpY2VzW3BhcnQudmVydGljZXMubGVuZ3RoLTFdLnkpIC8gMiAtIGJvZHkucG9zaXRpb24ueSkpO1xuXG4gICAgICAgICAgICAgICAgcHJpbWl0aXZlLmVuZEZpbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcmltaXRpdmU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHJlcXVlc3RlZCB0ZXh0dXJlIChhIFBJWEkuVGV4dHVyZSkgdmlhIGl0cyBwYXRoXG4gICAgICogQG1ldGhvZCBfZ2V0VGV4dHVyZVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtSZW5kZXJQaXhpfSByZW5kZXJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VQYXRoXG4gICAgICogQHJldHVybiB7UElYSS5UZXh0dXJlfSB0ZXh0dXJlXG4gICAgICogQGRlcHJlY2F0ZWRcbiAgICAgKi9cbiAgICB2YXIgX2dldFRleHR1cmUgPSBmdW5jdGlvbihyZW5kZXIsIGltYWdlUGF0aCkge1xuICAgICAgICB2YXIgdGV4dHVyZSA9IHJlbmRlci50ZXh0dXJlc1tpbWFnZVBhdGhdO1xuXG4gICAgICAgIGlmICghdGV4dHVyZSlcbiAgICAgICAgICAgIHRleHR1cmUgPSByZW5kZXIudGV4dHVyZXNbaW1hZ2VQYXRoXSA9IFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UoaW1hZ2VQYXRoKTtcblxuICAgICAgICByZXR1cm4gdGV4dHVyZTtcbiAgICB9O1xuXG59KSgpO1xuXG59LHtcIi4uL2JvZHkvQ29tcG9zaXRlXCI6MixcIi4uL2NvcmUvQ29tbW9uXCI6MTQsXCIuLi9jb3JlL0V2ZW50c1wiOjE2LFwiLi4vZ2VvbWV0cnkvQm91bmRzXCI6MjYsXCIuLi9nZW9tZXRyeS9WZWN0b3JcIjoyOH1dfSx7fSxbMzBdKSgzMClcbn0pO1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiaW1wb3J0ICogYXMgTWF0dGVyIGZyb20gJ21hdHRlci1qcyc7XG5cbmNvbnN0IHtcbiAgRW5naW5lLCBSZW5kZXIsIFdvcmxkLCBCb2RpZXMsIEJvZHksIENvbXBvc2l0ZXMsIENvbnN0cmFpbnQsIE1vdXNlLCBNb3VzZUNvbnN0cmFpbnRcbn0gPSBNYXR0ZXI7XG5cbi8vIGNyZWF0ZSBhbiBlbmdpbmVcbmNvbnN0IGVuZ2luZSA9IEVuZ2luZS5jcmVhdGUoKTtcblxuLy8gY3JlYXRlIGEgcmVuZGVyZXJcbmNvbnN0IHJlbmRlciA9IFJlbmRlci5jcmVhdGUoe1xuICBlbGVtZW50OiBkb2N1bWVudC5ib2R5LFxuICBlbmdpbmU6IGVuZ2luZSxcbiAgb3B0aW9uczoge1xuICAgIHdpZHRoOiA4MDAsXG4gICAgaGVpZ2h0OiA2MDAsXG4gICAgc2hvd0FuZ2xlSW5kaWNhdG9yOiB0cnVlXG4gIH1cbn0pO1xuXG5jb25zdCBhcm0gPSBCb2RpZXMucmVjdGFuZ2xlKDIwMCwgMjAwLCAyMDAsIDUwKTtcblxuY29uc3QgY29uc3RyYWludCA9IENvbnN0cmFpbnQuY3JlYXRlKHtcbiAgcG9pbnRBOiB7eDogMzAwLCB5OiAxMDB9LFxuICBib2R5QjogYXJtLFxuICBwb2ludEI6IHt4OiAxMDAsIHk6IDB9XG59KTtcblxuXG5jb25zdCBncm91bmQgPSBCb2RpZXMucmVjdGFuZ2xlKDQwMCwgNjEwLCA4MTAsIDYwLCB7IGlzU3RhdGljOiB0cnVlIH0pO1xuXG4vLyBhZGQgYWxsIG9mIHRoZSBib2RpZXMgdG8gdGhlIHdvcmxkXG5Xb3JsZC5hZGQoZW5naW5lLndvcmxkLCBbY29uc3RyYWludCwgYXJtLCBncm91bmRdKTtcblxudmFyIG1vdXNlID0gTW91c2UuY3JlYXRlKHJlbmRlci5jYW52YXMpLFxuICBtb3VzZUNvbnN0cmFpbnQgPSBNb3VzZUNvbnN0cmFpbnQuY3JlYXRlKGVuZ2luZSwge1xuICAgIG1vdXNlOiBtb3VzZSxcbiAgICBjb25zdHJhaW50OiB7XG4gICAgICBzdGlmZm5lc3M6IDAuMixcbiAgICAgIHJlbmRlcjoge1xuICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbldvcmxkLmFkZChlbmdpbmUud29ybGQsIG1vdXNlQ29uc3RyYWludCk7XG5cbnJlbmRlci5tb3VzZSA9IG1vdXNlO1xuXG4vLyBydW4gdGhlIGVuZ2luZVxuRW5naW5lLnJ1bihlbmdpbmUpO1xuXG4vLyBydW4gdGhlIHJlbmRlcmVyXG5SZW5kZXIucnVuKHJlbmRlcik7XG4iXSwic291cmNlUm9vdCI6IiJ9