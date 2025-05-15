let posenet;
let video, eX = 0, eY = 0;
let img, baseImgW, baseImgH;
let smoothX = 0, smoothY = 0, smoothSize = 100;

function setup() {
  createCanvas(150, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  posenet = ml5.poseNet(video, modelReady);
  posenet.on('pose', gotPoses);
}

function preload() {
  img = loadImage('boardbx.png', () => {
    baseImgW = img.width * 0.75;
    baseImgH = img.height * 0.75;
  });
}

function modelReady() {
  console.log('The model is ready and is ready to use.');
}

function gotPoses(poses) {
  if (poses.length > 0) {
    let pose = poses[0].pose;

    let nose = pose.keypoints.find(k => k.part === 'nose').position;
    let leftEye = pose.keypoints.find(k => k.part === 'leftEye').position;
    let rightEye = pose.keypoints.find(k => k.part === 'rightEye').position;


    let eyeDist = dist(leftEye.x, leftEye.y, rightEye.x, rightEye.y);
    let scaleFactor = map(eyeDist, 20, 100, 0.4, 2, true);

    let targetX = nose.x;
    let targetY = nose.y;
    let targetSize = scaleFactor;

    smoothX = lerp(smoothX, targetX, 0.2);
    smoothY = lerp(smoothY, targetY, 0.2);
    smoothSize = lerp(smoothSize, targetSize, 0.2);
  }
}

function draw() {
  image(video, 0, 0);

  if (img) {
    let imgW = baseImgW * smoothSize;
    let imgH = baseImgH * smoothSize;
    image(img, smoothX - imgW / 2, smoothY - imgH / 2, imgW, imgH);
  }
}
