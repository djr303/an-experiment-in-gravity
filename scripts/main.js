import Ball from './ball.js';

((window, document) => {
  const WIN = window
  const DOC = document
  const FPS_INTERVAL = 1000 / 60

  let context
  let canvas
  let then
  let now
  let elapsed

  let ballsArray

  const initalize = () => {
    canvas = DOC.querySelector('#canvas')
    context = canvas.getContext('2d')
    resizeCanvas()
    startAnimation()
  }

  const getRandomNumber = (max, min) => {
    const multipler = min ? max - min : max
    return Math.round(multipler * Math.random())
  }

  const getRandomColor = () => {
    let color = '#'
    for (let i = 0; i <= 6; i++) {
      color += Math.round(16 * Math.random()).toString(16)
    }
    return color
  }

  const generateBallArray = numOfBalls => {
    const arr = []
    let radius
    for (let x = 0; x < numOfBalls; x++) {
      radius = getRandomNumber(25)
      arr.push(
        new Ball(
          context,
          getRandomNumber(WIN.innerWidth),
          radius,
          getRandomColor(),
          getRandomNumber(WIN.innerHeight - radius),
          WIN.innerHeight - radius
        )
      )
    }
    return arr
  }

  const startAnimation = () => {
    then = Date.now()
    ballsArray = generateBallArray(1000)

    const ballsArrayLen = ballsArray.length

    let start = true

    const step = () => {
      now = Date.now()
      elapsed = now - then

      if (elapsed > FPS_INTERVAL || start) {
        start = false
        then = now - (elapsed % FPS_INTERVAL)
        clearCanvas()

        for (let i = 0; i < ballsArrayLen; i++) {
          ballsArray[i].animate()
        }
      }
      WIN.requestAnimationFrame(step)
    }
    WIN.requestAnimationFrame(step)
  }

  const clearCanvas = () => {
    context.clearRect(0, 0, WIN.innerWidth, WIN.innerHeight)
  }

  const resizeCanvas = () => {
    canvas.width = WIN.innerWidth
    canvas.height = WIN.innerHeight
  }

  DOC.addEventListener('DOMContentLoaded', () => {
    initalize()
  })

  WIN.addEventListener('resize', () => {
    clearCanvas()
    initalize()
  })
})(window, document)
