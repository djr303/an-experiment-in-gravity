class Ball {
  static secondsPerFrame = 1 / 60;
  static metersAsPixels = 1 * 9.8;
  static up = 'up';
  static down = 'down';

  time = 0;
  frame = 1;
  framesArray = [];
  currentFrameArrayIdx = 0;
  frameArrayComplete = false;
  cx;
  cy;
  fill;
  time;
  context;
  yTop;
  yBottom;
  direction;

  constructor(context, cx, r, fill, yTop, yBottom) {
    this.cx = cx;
    this.cy = yTop;
    this.r = r;
    this.fill = fill;
    this.context = context;
    this.yTop = yTop;
    this.yBottom = yBottom;
    this.direction = Ball.down;
  }

  animate() {
    this.setNextYPosition();
    this.draw();
    if (!this.frameArrayComplete) this.frame++;
  }

  draw() {
    this.context.fillStyle = this.fill;
    this.context.beginPath();
    this.context.arc(this.cx, this.cy, this.r, 0, 2 * Math.PI);
    this.context.closePath();
    this.context.fill();
  }

  setNextFrameTime(frame) {
    this.time = Ball.secondsPerFrame * this.frame;
  }

  getAccelaration() {
    return Ball.metersAsPixels * this.time;
  }

  getDirection() {
    if (
      (this.cy < this.yBottom && !this.frameArrayComplete) ||
      (this.frameArrayComplete && this.currentFrameArrayIdx === 0)
    ) {
      this.direction = Ball.down;
    } else if (
      (this.cy >= (this.yBottom - (this.r * 2)) && !this.frameArrayComplete) ||
      (this.frameArrayComplete &&
        this.currentFrameArrayIdx === this.framesArray.length - 1)
    ) {
      if (!this.frameArrayComplete) this.frameArrayComplete = true;
      this.direction = Ball.up;
    }
  }

  setNextYPosition() {
    this.getDirection();
    if (this.frameArrayComplete) {

      this.setNextYPositionFromFrameArray();
    } else {
      this.setNextFrameTime();
      this.setNextYPostionFromExpression();
    }
  }

  setNextYPostionFromExpression() {
    this.cy = this.cy + (this.getAccelaration() * this.time * this.time) / 2;
    this.cy = this.cy > this.yBottom ? this.yBottom : this.cy;
    this.framesArray.push(this.cy);
    this.currentFrameArrayIdx = this.framesArray.length - 1;
  }

  setNextYPositionFromFrameArray() {
    const idx =
      this.direction === Ball.down
        ? this.currentFrameArrayIdx + 1
        : this.currentFrameArrayIdx - 1;
    this.currentFrameArrayIdx = idx;
    this.cy = this.framesArray[idx];
  }
}

export default Ball;
