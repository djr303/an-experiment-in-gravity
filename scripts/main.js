import Ball from './ball.js';

((window, document) => {
  const WIN = window;
  const DOC = document;
  let context;
  let canvas;

  const initalize = () => {
    canvas = DOC.querySelector('#canvas');
    context = canvas.getContext('2d');
    resizeCanvas();
    startAnimation();
  };

  const getRandomNumber = (max, min) => {
    let multipler = min ? max - min : max;
    return Math.round(multipler * Math.random());
  };

  const getRandomColor = () => {
    let color = '#';
    for (let i = 0; i <= 6; i++) {
      color += Math.round(16 * Math.random()).toString(16);
    }
    return color;
  };

  const generateBallArray = numOfBalls => {
    const arr = [];
    let radius;
    for (let x = 0; x < numOfBalls; x++) {
      radius = getRandomNumber(25)
      arr.push(
        new Ball(
          context,
          getRandomNumber(WIN.innerWidth),
          radius,
          getRandomColor(),
          getRandomNumber(WIN.innerHeight - radius),
          WIN.innerHeight - radius,
        ),
      );
    }
    return arr;
  };

  const startAnimation = () => {
    const ballsArray = generateBallArray(1000);

    window.ball = ballsArray[0];
    const step = () => {
      clearCanvas();
      let ballsArrayLen = ballsArray.length;
      for (let i = 0; i < ballsArray.length; i++) {
        ballsArray[i].animate();
      }
      WIN.requestAnimationFrame(step);
    };
    WIN.requestAnimationFrame(step);
  };

  const clearCanvas = () => {
    context.clearRect(0, 0, WIN.innerWidth, WIN.innerHeight);
  };

  const resizeCanvas = () => {
    canvas.width = WIN.innerWidth;
    canvas.height = WIN.innerHeight;
  };

  DOC.addEventListener('DOMContentLoaded', () => {
    initalize();
  });
})(window, document);
