class Ball extends Shape{
    constructor(x, y, velX, velY, color, size) {
        super(x, y, velX, velY)
        this.color = color;
        this.size = size;
        this.exists = true;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if (this.x + this.size >= width) {this.velX = -Math.abs(this.velX);}
        if (this.x - this.size <= 0) {this.velX = Math.abs(this.velX);}
        if (this.y + this.size >= height) {this.velY = -Math.abs(this.velY);}
        if (this.y - this.size <= 0) {this.velY = Math.abs(this.velY);}

        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        for (const ball of balls) {
            if (!(this === ball) && ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                }
            }
        }
    }
}

class EvilBall extends Shape {
    constructor(x, y){
        super(x, y, 20, 20);
        this.color = "rgb(255,255,255)";
        this.size = 10;

        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "a": this.x -= this.velX; break;
                case "d": this.x += this.velX; break;
                case "w": this.y -= this.velY; break;
                case "s": this.y += this.velY; break;
            }
        });
    }

    draw(){
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }

    checkBounds(){
        if (this.x + this.size >= width) {this.x = this.x - this.size;}
        if (this.x - this.size <= 0) {this.x = this.x + this.size;}
        if (this.y + this.size >= height) {this.y = this.y - this.size;}
        if (this.y - this.size <= 0) {this.y = this.y + this.size;}
    }

    collisionDetect(){
        for (const ball of balls) {
            if (ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.exists = false;
                    ballCount--;
                    ballCounter.innerText = "BallCount: " + ballCount
                }
            }
        }
    }
}