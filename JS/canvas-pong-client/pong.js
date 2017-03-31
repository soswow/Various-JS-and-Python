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
                const contactPoint =  this.paddles[PLAYER1] - this.ball.y;
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
                const contactPoint =  this.paddles[PLAYER2] - this.ball.y;
                this.ball.angle = DEG270 + (contactPoint * 2 / PADDLE_SIZE) * PADDLE_MAX_REFLECT_ANGLE;
            } else {
                this.score[PLAYER1] += 1;
                return this.resetState();
            }
        }

        this.ball.x = this.ball.x + Math.cos(this.ball.angle - DEG90) * this.ball.speed;
        this.ball.y = this.ball.y + Math.sin(this.ball.angle - DEG90) * this.ball.speed;        
    }

    drawBall() {
        const x = this.ball.x - BALL_SIZE / 2;
        const y = this.ball.y - BALL_SIZE / 2;
        this.context.beginPath();
        context.rect(x, y, BALL_SIZE, BALL_SIZE);
        this.context.fill();
    }

    drawPaddle(player) {
        const x = player === PLAYER1 ? 0 : this.width - PADDLE_DEPTH;
        const y = this.paddles[player] - PADDLE_SIZE / 2;
        this.context.beginPath();
        this.context.rect(x, y, PADDLE_DEPTH, PADDLE_SIZE);
        this.context.fill();
    }

    drawDevider() {
        this.context.beginPath();
        this.context.setLineDash([10, 10]);
        this.context.lineWidth = PADDLE_DEPTH / 2;
        this.context.moveTo(this.width / 2, 0);
        this.context.lineTo(this.width / 2, this.height);
        this.context.stroke();
    }

    drawScore(player) {
        const y = 75;
        let x = player == PLAYER1 ? 60 : this.width - 60 - 55;
        if (this.score[player] > 99) {
            x -= 95;
        }
        this.context.beginPath();
        this.context.font = '90px monospace';
        this.context.fillText(this.score[player], x, y);
    }

    clearScreen() {
        this.context.beginPath();
        this.context.fillStyle='black';
        this.context.rect(0, 0, this.width, this.height);
        this.context.fill();
    }

    drawGame() {
        this.clearScreen();
        this.context.fillStyle = 'white';
        this.context.strokeStyle = 'white';
        this.drawBall();
        this.drawPaddle(PLAYER1);
        this.drawPaddle(PLAYER2);
        this.drawScore(PLAYER1);
        this.drawScore(PLAYER2);
        this.drawDevider();
    }
}

const context = initCanvas('main', W, H);
const pong = new PongGame(W, H, context);

let keysPressed = {};
const PLAYER1_ARROWUP_KEY_CODE = 87;
const PLAYER1_ARROWDOWN_KEY_CODE = 83;
const PLAYER2_ARROWUP_KEY_CODE = 38;
const PLAYER2_ARROWDOWN_KEY_CODE = 40;

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

    pong.tick();
    pong.drawGame(context);
    requestAnimationFrame(redraw);
}

document.addEventListener('keydown', (e) => {
    keysPressed[e.keyCode || e.which] = true;
});
document.addEventListener('keyup', (e) => {
    keysPressed[e.keyCode || e.which] = false;
});

redraw();
