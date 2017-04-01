const W = 500;
const H = 500;

const initCanvas = (id, width, height) => {
    const canvas = document.getElementById('main');
    canvas.width = W;
    canvas.height = H;
    const context = canvas.getContext('2d');
    context.width = W;
    context.height = H;
    return context;
}

const degToRad = (deg) => deg * (Math.PI / 180);
const radToDeg = (rad) => rad * (180 / Math.PI);

const PLAYER1 = 'player1';
const PLAYER2 = 'player2';
const UP = 'UP';
const DOWN = 'DOWN';
const BALL_SIZE = 15;
const BALL_SPEED = 4; // px/tick
const PADDLE_SIZE = 60;
const PADDLE_DEPTH = 5;
const PADDLE_SPEED = 10; // px/tick
const PADDLE_MAX_REFLECT_ANGLE = degToRad(75);
const DEG90 = degToRad(90);
const DEG180 = degToRad(180);
const DEG270 = degToRad(270);
const DEG360 = degToRad(360);

class PongGame {
    constructor(width, height, context) {
        this.context = context;
        this.width = width;
        this.height = height;
        // Y position of a paddle center
        this.paddles = {
            [PLAYER1]: 0.5 * height,
            [PLAYER2]: 0.5 * height
        }
        this.score = {
            [PLAYER1]: 0,
            [PLAYER2]: 0
        }
        this.ball = {
            x: 0.5 * height,
            y: 0.5 * width,
            speed: 0,
            angle: 0  // angle in Radians. Zero is to the right.
        };
    }

    isPaddleAtTheTop(player) {
        return this.paddles[player] <= PADDLE_SIZE / 2
    }

    isPaddleAtTheBottom(player) {
        return this.paddles[player] >= this.height - PADDLE_SIZE / 2
    }

    move(player, direction) {
        if (player !== PLAYER1 && player !== PLAYER2) {
            throw new Error(`Unknown player ${player}. 'player1' or 'player2' are valid values.`);
        }
        if (direction !== UP && direction !== DOWN) {
            throw new Error(`Unknown direction ${direction}. 'UP' or 'DOWN' are valid values.`);
        }

        if (direction === UP && !this.isPaddleAtTheTop(player)) {
            this.paddles[player] -= PADDLE_SPEED;
        } else if (direction === DOWN && !this.isPaddleAtTheBottom(player)) {
            this.paddles[player] += PADDLE_SPEED;
        }

        if (this.ball.speed === 0) {
            this.startGame();
        }
    }

    getPaddleTop(player) {
        return this.paddles[player] - PADDLE_SIZE / 2;
    }

    getPaddleBottom(player) {
        return this.paddles[player] + PADDLE_SIZE / 2;
    }

    resetState() {
        this.ball = {
            x: 0.5 * this.height,
            y: 0.5 * this.width,
            speed: 0,
            angle: 0
        };
    }

    startGame() {
        this.ball.angle = Math.random() * DEG360;
        this.ball.speed = BALL_SPEED;
    }

    tick() {
        if (this.ball.y - BALL_SIZE / 2 < 0) {
            // Reflect From Top
            this.ball.angle = DEG180 - this.ball.angle;
            this.ball.y = BALL_SIZE / 2;
        } else if (this.ball.y + BALL_SIZE / 2 > this.height) {
            // Reflect From Bottom
            this.ball.angle = DEG180 - this.ball.angle;
            this.ball.y = this.height - BALL_SIZE / 2;
        }

        if (this.ball.x - BALL_SIZE / 2 < PADDLE_DEPTH) {
            const isPaddleCollision =
                this.getPaddleTop(PLAYER1) < this.ball.y &&
                this.getPaddleBottom(PLAYER1) > this.ball.y;
            this.ball.x = PADDLE_DEPTH + BALL_SIZE / 2;
            if (isPaddleCollision) {
                const contactPoint = this.paddles[PLAYER1] - this.ball.y;
                this.ball.angle = DEG90 - (contactPoint * 2 / PADDLE_SIZE) * PADDLE_MAX_REFLECT_ANGLE;
            } else {
                this.score[PLAYER2] += 1;
                return this.resetState();
            }
        }
        if (this.ball.x + BALL_SIZE / 2 > this.width - PADDLE_DEPTH) {
            const isPaddleCollision =
                this.getPaddleTop(PLAYER2) < this.ball.y &&
                this.getPaddleBottom(PLAYER2) > this.ball.y;
            this.ball.x = this.width - PADDLE_DEPTH - BALL_SIZE / 2;
            if (isPaddleCollision) {
                const contactPoint = this.paddles[PLAYER2] - this.ball.y;
                this.ball.angle = DEG270 + (contactPoint * 2 / PADDLE_SIZE) * PADDLE_MAX_REFLECT_ANGLE;
            } else {
                this.score[PLAYER1] += 1;
                return this.resetState();
            }
        }

        this.ball.x = this.ball.x + Math.cos(this.ball.angle - DEG90) * this.ball.speed;
        this.ball.y = this.ball.y + Math.sin(this.ball.angle - DEG90) * this.ball.speed;
    }

    generateDigit(digit, x, y) {
        const t = 10;
        const h = 100;
        const w = 50;
        const fullLeft = [x,y,t,h];
        const fullRight = [x + w-t, y, t, h];
        const top = [x,y,w,t];
        const middle = [x,y+h/2-t,w,t];
        const bottom = [x,y+h-t, w, t];
        const topHalfRight = [x + w-t, y, t, h/2];
        const topHalfLeft = [x, y, t, h/2];
        const bottomHalfLeft = [x,y+h/2-t,t,h/2];
        const bottomHalfRight = [x+w-t,y+h/2-t,t,h/2];

        if(digit === 0 || digit === '0') {
            return [
                fullLeft,
                fullRight,
                top,
                bottom
            ];
        }
        if(digit === 1 || digit === '1') {
            return [
                fullRight
            ]
        }
        if(digit === 2 || digit === '2') {
            return [
                top,
                topHalfRight,
                middle,
                bottomHalfLeft,
                bottom,
            ]
        }
        if(digit === 3 || digit === '3') {
            return [
                top,
                middle,
                bottom,
                fullRight
            ]
        }
        if(digit === 4 || digit === '4') {
            return [
                topHalfLeft,
                middle,
                fullRight
            ]
        }
        if(digit === 5 || digit === '5') {
            return [
                top,
                middle,
                bottom,
                topHalfLeft,
                bottomHalfRight
            ]
        }
        if(digit === 6 || digit === '6') {
            return [
                middle,
                bottom,
                fullLeft,
                bottomHalfRight
            ]
        }
        if(digit === 7 || digit === '7') {
            return [
                top,
                fullRight
            ]
        }
        if(digit === 8 || digit === '8') {
            return [
                top,
                middle,
                bottom,
                fullRight,
                fullLeft
            ]
        }
        if(digit === 9 || digit === '9') {
            return [
                top,
                middle,
                fullRight,
                topHalfLeft
            ]
        }
    }


    generateData() {
        const whiteRects = [
            [   // Paddle Player 1
                0, this.paddles[PLAYER1] - PADDLE_SIZE / 2,
                PADDLE_DEPTH, PADDLE_SIZE
            ],
            [   // Paddle Player 2
                this.width - PADDLE_DEPTH, this.paddles[PLAYER2] - PADDLE_SIZE / 2,
                PADDLE_DEPTH, PADDLE_SIZE
            ],
            [   // Ball
                Math.round(this.ball.x - BALL_SIZE / 2), Math.round(this.ball.y - BALL_SIZE / 2),
                BALL_SIZE, BALL_SIZE
            ]
        ];
        
        const deviderLength = 10;
        for(let i=0; i<this.height/(deviderLength*2); i++) {
            whiteRects.push([
                Math.round(this.width / 2 - PADDLE_DEPTH / 4), i * deviderLength * 2,
                Math.round(PADDLE_DEPTH / 2), deviderLength
            ]);
        }
        
        const digitsPlayer1 = this.score[PLAYER1].toString().split('');
        digitsPlayer1.reverse();
        digitsPlayer1.forEach((s, i) => {
            const digitRects = this.generateDigit(s, this.width / 2 - 30 - 70 * (i+1), 20);
            whiteRects.push(...digitRects);
        });
        const digitsPlayer2 = this.score[PLAYER2].toString().split('');
        digitsPlayer2.forEach((s, i) => {
            const digitRects = this.generateDigit(s, this.width / 2 + 50 + 70 * i, 20);
            whiteRects.push(...digitRects);
        });
        
        const data = new Int8Array(this.width * this.height);
        
        whiteRects.forEach(([xStart, yStart, width, height]) => {
            for (let y = yStart; y < yStart + height; y++) {
                for (let x = xStart; x < xStart + width; x++) {
                    data[y * this.width + x] = 1;
                }
            }
        });
        
        return data;
    }

    applyData(data) {
        const imageData = this.context.createImageData(this.width, this.height);

        for(let i=0;i<this.width * this.height;i++) {
            if (data[i] > 0) {
                imageData.data[i * 4] = 255;
                imageData.data[i * 4 + 1] = 255;
                imageData.data[i * 4 + 2] = 255;
                imageData.data[i * 4 + 3] = 255;
            }else{
                imageData.data[i * 4] = 0;
                imageData.data[i * 4 + 1] = 0;
                imageData.data[i * 4 + 2] = 0;
                imageData.data[i * 4 + 3] = 255;
            }
        }

        this.context.putImageData(imageData, 0, 0);
    }
}

const context = initCanvas('main', W, H);
const pong = new PongGame(W, H, context);

let keysPressed = {};
const PLAYER1_ARROWUP_KEY_CODE = 87;
const PLAYER1_ARROWDOWN_KEY_CODE = 83;
const PLAYER2_ARROWUP_KEY_CODE = 38;
const PLAYER2_ARROWDOWN_KEY_CODE = 40;

const timeAverage = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const timeElement = document.getElementById('time');

const redraw = () => {
    if (keysPressed[PLAYER1_ARROWUP_KEY_CODE]) {
        pong.move(PLAYER1, UP);
    }
    if (keysPressed[PLAYER1_ARROWDOWN_KEY_CODE]) {
        pong.move(PLAYER1, DOWN);
    }
    if (keysPressed[PLAYER2_ARROWUP_KEY_CODE]) {
        pong.move(PLAYER2, UP);
    }
    if (keysPressed[PLAYER2_ARROWDOWN_KEY_CODE]) {
        pong.move(PLAYER2, DOWN);
    }

    const start = Date.now();
    pong.tick();
    const data = pong.generateData();
    const time = Date.now() - start;
    pong.applyData(data);
    
    timeAverage.push(time);
    timeAverage.shift();
    const avgTime = timeAverage.reduce((memo, el) => el + memo, 0) / timeAverage.length;
    timeElement.innerHTML = avgTime.toFixed(3);

    requestAnimationFrame(redraw);
}

document.addEventListener('keydown', (e) => {
    keysPressed[e.keyCode || e.which] = true;
});
document.addEventListener('keyup', (e) => {
    keysPressed[e.keyCode || e.which] = false;
});

redraw();
