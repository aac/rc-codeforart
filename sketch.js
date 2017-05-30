/*
    All of these parameters and ranges should be data-driven and not hard coded.

    Done –  At a high level, the animation is just a linear interpolation between two
            angles. How can I restructure the code to reflect that?

    Things to try:
    - Uniform vs variable width arcs
    - Uniform vs variable animation speeds
    - Uniform vs variable starting points
    - After the arc is fully animated, rotate it around the origin

    Things to do:
    - Handle variable widths and buffer spacing, which means don't fudge it
      by hand
    - Try to fill the space – e.g., use the difference between the canvas
      dimensions and the current radius to determine the size and number of
      rings
    - Add a delay before starting some of the animations
    - Bucket the greys into bands

    - Dump out gifs? https://gist.github.com/antiboredom/129fd2311dec0046603e

    The buffer between rings isn't a property of the ring. That's just something
    that should be considered by the generator.

    Dump out variables to JSON in a big loop and run through them
*/

var arcs = [];

function generateArcs(num){
  var radius = random(10, 150)
  var width = 50
  var buffer = 10
  var startAngle = 0
  var extentAngle = HALF_PI
  var frames = 100
  var fill = 225

  var arcs = []

  for (var i = 0; i < num; i++) {
    width = max(5, floor(randomGaussian(40,20)))
    startAngle = random(0, TWO_PI)
    extentAngle = random(PI/8, 1.75 * PI)
    fill = max(100, min(255, random(235, 10)))
    frames = max(randomGaussian(60, 10), 1)

    arcs.push(makeArc(radius, width, startAngle, extentAngle, frames, fill))
    radius += width

    buffer = 10 + floor(randomGaussian(10,5))
    radius += buffer
  }

  return arcs
}

function initializeArcs(){
  var v0 = [makeArc(100, 50, 0, HALF_PI, 100, 225),
            makeArc(160, 50, 0, PI, 100, 225),
            makeArc(220, 50, 0, 1.25 * PI, 100, 225)]

  var v1 = [{radius: 100, width: 50 , startAngle: PI - 0.25 * PI, stopAngle: TWO_PI - 0.25 * PI, animationSteps: 100, currentStep: 0, fill: 225},
            {radius: 160, width: 50 , startAngle: PI+0.5*PI, stopAngle: TWO_PI+PI, animationSteps: 50, currentStep: 0, fill: 225},
            {radius: 220, width: 50 , startAngle: 0.75 * PI + HALF_PI/2, stopAngle: TWO_PI + HALF_PI/2, animationSteps: 75, currentStep: 0, fill: 225}]

  return generateArcs(4)
}

function makeArc(radius, width, startAngle, angleLength, animationLength, fill) {
  var a = {}
  a.radius = radius
  a.width = width
  a.startAngle =  TWO_PI - (startAngle + angleLength)
  a.stopAngle = TWO_PI - startAngle
  a.animationSteps = animationLength
  a.currentStep = 0
  a.fill = fill
  return a
}

function setup() {
  createCanvas(1280, 720)
  clear()
  background(51)

  arcs = initializeArcs()

  arcs.reverse()
}

function drawArc(a) {
  fill(a.fill)

  arc(width/2, height/2, a.radius + a.width, a.radius + a.width,
    lerp(a.stopAngle, a.startAngle, a.currentStep / a.animationSteps),
    a.stopAngle)

  fill(51)
  ellipse(width/2, height/2, a.radius, a.radius)
}

function drawArcs(){
  arcs.forEach(function(a) {
    drawArc(a)
  })
}

function step(){
  arcs.forEach(function(a) {
    if (a.currentStep < a.animationSteps)
      a.currentStep++
  })
}

function draw() {
  clear()
  background(51)

  noStroke()
  ellipseMode(RADIUS)

  // should I break up the drawing and the stepping?
  step()
  drawArcs()
}
