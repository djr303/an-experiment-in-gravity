(window => {
const WIN = window;

//Get canvas element and resize to window width and height
const canvas = getCanvas(WIN);
resizeCanvas(WIN, canvas);

})(window);

const getCanvas = WIN => {
  let canvas;
  const CANVAS_SELECTOR = '#canvas';
  return () => {
    if (!canvas) canvas = WIN.querySelector(CANVAS_SELECTOR);
    return canvas;
  };
};

const resizeCanvas = (WIN, canvas) => {
  canvas.width = WIN.innerWidth;
  canvas.height = WIN.innerHeight
}

