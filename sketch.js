let balls = [];

let numBalls = 500;

function setup() {
  const canvas = createCanvas(600, 600);

  for (let i = 0; i < numBalls; i++) {
    let ball = createRandomBall();
    balls.push(ball);
  }
}

function draw() {
  background(120);

  for (let ball of balls) {
    ball.update(2);
  }
}

function mousePressed() {
  balls.forEach((ball) => {
    if (ball.contains(mouseX, mouseY)) {
      ball.highlight();
    } else {
      ball.dehighlight();
    }
  });
}
