const makePongGame = function(width, height, context) {
    const degToRad = (deg) => deg * (Math.PI / 180);
    const radToDeg = (rad) => rad * (180 / Math.PI);

    const PLAYER1 = 'player1';
    const PLAYER2 = 'player2';
    const UP = 'UP';
    const DOWN = 'DOWN';
    const BALL_SIZE = Math.round(15/500 * width);
    const BALL_SIZE_HALF = Math.round(15/500 * height / 2);
    const BALL_SPEED = Math.round(4/500 * width); // px/tick
    const PADDLE_SIZE = Math.round(60/500 * height);
    const PADDLE_SIZE_HALF = Math.round(60/500 * height / 2);
    const PADDLE_DEPTH = Math.round(5/500 * width);
    const PADDLE_SPEED = Math.floor(10/500 * width); // px/tick
    const PADDLE_MAX_REFLECT_ANGLE = degToRad(75);
    const DIGIT_WIDTH = Math.round(50/500 * width);
    const DIGIT_HEIGHT = Math.floor(100/500 * width);
    const DIGIT_HEIGHT_HALF = Math.floor(100/500 * width / 2);
    const DIGIT_LINE_THICKNESS = Math.round(10/500 * width);
    const DIGIT_INIT_GAP = Math.round(30/500 * width);
    const DIGIT_CONSEQ_GAP = Math.round(20/500 * width);
    const DIGIT_TOP_PADDING = Math.round(20/500 * width);
    const DIVIDER_LENGTH = Math.floor(10/500 * height);
    const DEG45 = degToRad(45);
    const DEG90 = degToRad(90);
    const DEG180 = degToRad(180);
    const DEG270 = degToRad(270);
    const DEG360 = degToRad(360);

    class PongGame {
        constructor() {
            this.context = context;
            this.width = width;
            this.height = height;
            this.heightHalf = Math.round(this.height / 2);
            this.widthHalf = Math.round(this.width / 2);
            // Y position of a paddle center
            this.paddles = {
                [PLAYER1]: this.heightHalf,
                [PLAYER2]: this.heightHalf
            }
            this.score = {
                [PLAYER1]: 0,
                [PLAYER2]: 0
            }
            this.ball = {
                x: this.widthHalf,
                y: this.heightHalf,
                speed: 0,
                angle: 0  // angle in Radians. Zero is to the right.
            };
            this.episodes = 0;
        }

        isPaddleAtTheTop(player) {
            return this.paddles[player] <= PADDLE_SIZE_HALF
        }

        isPaddleAtTheBottom(player) {
            return this.paddles[player] >= this.height - PADDLE_SIZE_HALF
        }

        get PLAYER1() {
            return PLAYER1;
        }

        get PLAYER2() {
            return PLAYER2;
        }

        get UP() {
            return UP;
        }

        get DOWN() {
            return DOWN;
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
            return this.paddles[player] - PADDLE_SIZE_HALF;
        }

        getPaddleBottom(player) {
            return this.paddles[player] + PADDLE_SIZE_HALF;
        }
        onScoreChange(cb) {
            this.onScoreChangeCb = cb;
        }
        resetState() {
            this.onScoreChangeCb && this.onScoreChangeCb(this.score, this.episodes);
            this.ball = {
                x: this.widthHalf,
                y: this.heightHalf,
                speed: 0,
                angle: 0
            };
            this.episodes = 0;
        }

        startGame() {
            const rightDirection = Math.random() > 0.5;
            if (rightDirection) {
                this.ball.angle = DEG45 + Math.random() * DEG90;
            } else {
                this.ball.angle = DEG180 + DEG45 + Math.random() * DEG90;
            }
            this.ball.speed = BALL_SPEED;
        }

        tick() {
            this.episodes += 1;
            if (this.ball.y - BALL_SIZE_HALF < 0) {
                // Reflect From Top
                this.ball.angle = DEG180 - this.ball.angle;
                this.ball.y = BALL_SIZE_HALF;
            } else if (this.ball.y + BALL_SIZE_HALF > this.height) {
                // Reflect From Bottom
                this.ball.angle = DEG180 - this.ball.angle;
                this.ball.y = this.height - BALL_SIZE_HALF;
            }

            // Behind Left side
            if (this.ball.x - BALL_SIZE_HALF < PADDLE_DEPTH) {
                const isPaddleCollision =
                    this.getPaddleTop(PLAYER1) < (this.ball.y - BALL_SIZE_HALF) &&
                    this.getPaddleBottom(PLAYER1) > (this.ball.y + BALL_SIZE_HALF);
                this.ball.x = PADDLE_DEPTH + BALL_SIZE_HALF;
                if (isPaddleCollision) {
                    const contactPoint = this.paddles[PLAYER1] - this.ball.y;
                    this.ball.angle = DEG90 - (contactPoint * 2 / PADDLE_SIZE) * PADDLE_MAX_REFLECT_ANGLE;
                } else {
                    this.score[PLAYER2] += 1;
                    return this.resetState();
                }
            }
            if (this.ball.x + BALL_SIZE_HALF > this.width - PADDLE_DEPTH) {
                const isPaddleCollision =
                    this.getPaddleTop(PLAYER2) < (this.ball.y - BALL_SIZE_HALF) &&
                    this.getPaddleBottom(PLAYER2) > (this.ball.y + BALL_SIZE_HALF);
                this.ball.x = this.width - PADDLE_DEPTH - BALL_SIZE_HALF;
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
            const t = DIGIT_LINE_THICKNESS;
            const h = DIGIT_HEIGHT;
            const h2 = DIGIT_HEIGHT_HALF;
            const w = DIGIT_WIDTH;
            const fullLeft = [x,y,t,h];
            const fullRight = [x + w-t, y, t, h];
            const top = [x,y,w,t];
            const middle = [x,y+h2-t,w,t];
            const bottom = [x,y+h-t, w, t];
            const topHalfRight = [x + w-t, y, t, h2];
            const topHalfLeft = [x, y, t, h2];
            const bottomHalfLeft = [x,y+h2-t,t,h2];
            const bottomHalfRight = [x+w-t,y+h2-t,t,h2];

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
                    0, this.paddles[PLAYER1] - PADDLE_SIZE_HALF,
                    PADDLE_DEPTH, PADDLE_SIZE
                ],
                [   // Paddle Player 2
                    this.width - PADDLE_DEPTH, this.paddles[PLAYER2] - PADDLE_SIZE_HALF,
                    PADDLE_DEPTH, PADDLE_SIZE
                ],
                [   // Ball
                    Math.round(this.ball.x - BALL_SIZE_HALF), Math.round(this.ball.y - BALL_SIZE_HALF),
                    BALL_SIZE, BALL_SIZE
                ]
            ];
            
            for(let i=0; i<this.height/(DIVIDER_LENGTH*2); i++) {
                whiteRects.push([
                    Math.round(this.width / 2 - PADDLE_DEPTH / 4), i * DIVIDER_LENGTH * 2,
                    Math.round(PADDLE_DEPTH / 2), DIVIDER_LENGTH
                ]);
            }
            
            const digitsPlayer1 = this.score[PLAYER1].toString().split('');
            digitsPlayer1.reverse();
            digitsPlayer1.forEach((s, i) => {
                const digitRects = this.generateDigit(s, this.width / 2 - DIGIT_INIT_GAP - (DIGIT_WIDTH + DIGIT_CONSEQ_GAP) * (i+1), DIGIT_TOP_PADDING);
                whiteRects.push(...digitRects);
            });
            const digitsPlayer2 = this.score[PLAYER2].toString().split('');
            digitsPlayer2.forEach((s, i) => {
                const digitRects = this.generateDigit(s, this.width / 2 + DIGIT_WIDTH + (DIGIT_WIDTH + DIGIT_CONSEQ_GAP) * i, DIGIT_TOP_PADDING);
                whiteRects.push(...digitRects);
            });
            
            const data = new Int8Array(this.width * this.height).fill(0);
            
            whiteRects.forEach(([xStart, yStart, width, height]) => {
                for (let y = yStart; y < yStart + height; y++) {
                    for (let x = xStart; x < xStart + width; x++) {
                        data[y * this.width + x] = 127;
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

    return new PongGame();
};