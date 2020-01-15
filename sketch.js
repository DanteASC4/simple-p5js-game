let ball;
let bag = [];
let gravity = 9;
let mass = 3;
let rectx;
let speed = 1;
let score = 0;
let isScore = false;
let time = 10;
let rect2x = 250;

function setup() {
    createCanvas(500, 500);
    rectx = 250;
    frameRate(60);
}
let myclicked;
let mxclicked;
let isball;

function draw() {
    background(51);
    stroke(255);
    strokeWeight(2);
    line(0, 75, 500, 75);
    if (isball) {
        ball.update(myclicked);
        ball.display();
    }
    fill('white')
    strokeWeight(0)
    if (frameCount < 120) {
        textAlign(CENTER);
        fill(255, 150)
        text('Click in this zone to drop a ball! \nTry to drop as many as you can in the goal before the time runs out!', 250, 50)
    }
    textAlign(LEFT)
    text(`Score: ${score}`, 20, 20);
    text(`Time remaining: ${time}`, 380, 20)

    drawGoal(rectx, speed);
    rectx += speed;
    if (rectx - 50 <= 0) speed = -speed;
    if (rectx + 50 >= 500) speed = -speed;

    frameCount % 60 === 0 ? time-- : null;
    if (time === 0) {
        complete(score);
        noLoop();
    }
    rect2x = lerp(rect2x, mouseX, .05);
    rect(rect2x, 50, 50, 25);
}

function mousePressed() {
    if (mouseY <= 75) {
        myclicked = mouseY;
        mxclicked = mouseX;
        ball = new Ball(rect2x, mouseY, mass, gravity);
        bag.push(ball);
        isball = true;
    }
}

function drawGoal(x) {
    rectMode(CENTER);
    fill('white');
    rect(x, 475, 100, 50);
}

function addscore(flag) {
    background(51);
    if (flag) {
        score += 1;
        speed += 5;
        flag = false;
    }
}

function complete(s) {
    textAlign(CENTER);
    fill('white');
    text(`Time's up! Your final score:\n${s}\n\nReload the page to try again!`, 250, 250)
}

class Ball {
    constructor(xpos, ypos, m, g) {
        this.x = xpos;
        this.y = ypos;
        this.vy = 0;
        this.mass = m;
        this.gravity = g;
        this.radius = 15;
        this.draw = true;
    }

    update(targY) {
        let forceY = (targY - this.y) * .2;
        let ay = (this.y + forceY) * .25;
        this.vy = forceY + ay;
        this.y += this.vy;
        this.checkBounds();
    }

    checkBounds() {
        if (this.x >= rectx - 50 && this.x <= rectx + 50 && this.y >= 450 && this.y <= 499) {
            isScore = true;
            addscore(isScore);
            this.draw = false;
            this.x = 1000;
            this.y = 1000;
        }
        if (this.y >= 500) {
            this.draw = false;
        } else {
            this.draw = true;
        }

    }

    display() {
        if (this.draw) {
            noStroke();
            fill(255, 126)
            ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
            stroke(255);
        }
    }
}
