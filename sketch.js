const PADDLE_WIDTH = 200
const PADDLE_HEIGHT = 50
const BALL_DIAMETER = 50
const BALL_RADIUS = BALL_DIAMETER / 2
const PADDLE_SPEED = 20

let paddlePositionX = innerWidth / 2 - PADDLE_WIDTH / 2
let ballPositionX = BALL_DIAMETER + Math.floor(Math.random() * (innerWidth - 2 * BALL_DIAMETER))
let ballPositionY = BALL_DIAMETER

let isBallTravelingDown = true
let isBallTravelingRight = Math.random() > 0.5

let ballSpeed = 5
let score = 0
let isGameOver = false

let isBallTouchingWall = false
let isBallTouchingCeiling = false
let isBallTouchingPaddle = false

function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke()
}

function draw() {
  background(0)
  drawPaddle()
  drawBall()
  drawScore()
  if (isGameOver && keyIsDown(ENTER)) resetGame()
}

function drawPaddle() {
  fill(255)
  rect(paddlePositionX, height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT)
  if (keyIsDown(LEFT_ARROW) && paddlePositionX > 0)
    paddlePositionX -= min(PADDLE_SPEED, paddlePositionX)
  if (keyIsDown(RIGHT_ARROW) && paddlePositionX < width - PADDLE_WIDTH)
    paddlePositionX += min(PADDLE_SPEED, width - paddlePositionX - PADDLE_WIDTH)
}

function drawBall() {
  fill(255)
  ellipse(ballPositionX, ballPositionY, BALL_DIAMETER)
  _updateIsBallTouchingParams()
  _updateBallDirections()
  _updateScoreBallSpeedAndGameOver()
  _updateBallPositions()
}

function drawScore() {
  fill(255)
  textSize(width * 0.05)
  textAlign(CENTER, CENTER)
  text(isGameOver ? `Final score: ${score}` : score, width / 2, height * 0.1)
  if (isGameOver) text('Press ENTER Key to Play Again', width / 2, height * 0.2)
}

function _updateIsBallTouchingParams() {
  isBallTouchingWall = ballPositionX <= BALL_RADIUS || ballPositionX >= width - BALL_RADIUS
  isBallTouchingCeiling = ballPositionY <= BALL_RADIUS
  isBallTouchingPaddle =
    ballPositionX >= paddlePositionX &&
    ballPositionX <= paddlePositionX + PADDLE_WIDTH &&
    height - ballPositionY - BALL_RADIUS <= PADDLE_HEIGHT &&
    height - ballPositionY - BALL_RADIUS >= PADDLE_HEIGHT - PADDLE_HEIGHT * 0.1
}

function _updateBallDirections() {
  if (isBallTouchingWall) isBallTravelingRight = !isBallTravelingRight
  if (isBallTouchingCeiling || isBallTouchingPaddle) isBallTravelingDown = !isBallTravelingDown
}

function _updateScoreBallSpeedAndGameOver() {
  if (isBallTouchingPaddle) score++
  if (isBallTouchingPaddle && score % 3 === 0) ballSpeed++
  if (ballPositionY > height + BALL_RADIUS) isGameOver = true
}

function _updateBallPositions() {
  if (isGameOver) return
  ballPositionX += isBallTravelingRight ? ballSpeed : -ballSpeed
  ballPositionY += isBallTravelingDown ? ballSpeed : -ballSpeed
}

function resetGame() {
  paddlePositionX = width / 2 - PADDLE_WIDTH / 2
  ballPositionX = BALL_DIAMETER + Math.floor(Math.random() * (innerWidth - 2 * BALL_DIAMETER))
  ballPositionY = BALL_DIAMETER
  isBallTravelingDown = true
  isBallTravelingRight = Math.random() > 0.5
  ballSpeed = 5
  score = 0
  isGameOver = false
  isBallTouchingWall = false
  isBallTouchingCeiling = false
  isBallTouchingPaddle = false
}
