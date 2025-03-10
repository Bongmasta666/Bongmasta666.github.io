const canvas = document.querySelector("canvas");
const ballCounter = document.getElementById("counter")
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const balls = [];

let evilBall = new EvilBall(width*0.5, height*0.5)
let ballCount = 0;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

while (balls.length < 25) {
    const size = random(10, 20);
    const ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size
    );
    balls.push(ball);
    ballCount++;
    ballCounter.innerText = "BallCount: " + ballCount
}


function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);
    for (const ball of balls) {
        if (ball.exists){
            ball.draw();
            ball.update();
            ball.collisionDetect();
        }
    } 
    evilBall.draw();
    evilBall.checkBounds();
    evilBall.collisionDetect();
    requestAnimationFrame(loop);
}

loop();