let balls = [];

let numBalls = 1000;
let bodySegmentationModel;
let segmentation;
let video;

let options = {
  maskType: "person",
};

async function setup() {
  const canvas = createCanvas(600, 600);

  ///// Video Input
  video = createCapture(VIDEO);
  video.size(600, 800);
  video.hide();

  bodySegmentationModel = await ml5.bodySegmentation("BodyPix", options);
  //// start detecting the body
  bodySegmentationModel.detectStart(video, gotResults);

  for (let i = 0; i < numBalls; i++) {
    let ball = createRandomBall();
    balls.push(ball);
  }
}

function draw() {
  background(120);

  // Display the body segmentation mask

  if (segmentation) {
    image(segmentation.mask, 0, 0, width, height);
  }

  for (let ball of balls) {
    let byHowMuch = 1;

    let active = false;

    // Check whether the ball is on the detected body
    if (segmentation && segmentation.mask) {
      active = ball.isOnBody(segmentation.mask);
    }
    // Make the ball respond
    ball.respond(active);
    // Update the ball
    ball.update(byHowMuch);
  }
}

function mousePressed() {
  balls.forEach((ball) => {
    let active = ball.contains(mouseX, mouseY);
    ball.respond(active);
  });
}

function gotResults(result) {
  segmentation = result;
}
