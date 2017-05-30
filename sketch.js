/*

*/

var frame
var update = true
var clearScreen = false
var minHue, maxHue

function randomHue(){
  minHue = floor(random(0,31))*10
  maxHue = minHue + 10
}

function setup() {
  createCanvas(1280, 720)
  clear()
  background(51)
  frame = 0
  frameRate(30)

  randomHue()
}

function mouseClicked(){
  update = !update
}

function keyPressed() {
  if (key === ' '){
    clearScreen = true
  }
}

function keyTyped() {
  if (key === 'r'){
    randomHue()
    frame=0
  }
}

function draw() {
  frame=frame+1

  // this is a sigmoid-esque function to control how the circle centers
  // move to the edges of the canvas over time
  // values range from ~0.25 to 1. changing the constant to be larger will
  // make it take longer to scale out
  posScale = 1-1/(1+exp(1/50*frame-1))

  if (clearScreen){
    clear()
    background(51)
    clearScreen = false
    frame = 0
  }
  noStroke()
  ellipseMode(RADIUS)

  if(!update) return

  colorMode(HSB, 360, 100, 100, 100);

  var numCircles = random(5)
  for (var i = 0; i < numCircles; i++){
      var radius = random(10, 100)//random(5,(1-posScale)*250)
      var randX = width/2 + posScale * random(-width/2,width/2)
      var randY = height/2 + posScale * random(-height/2, height/2)
      strokeWeight(radius/20)
      stroke(minHue, 100, 60, 70)
      fill(random(minHue,maxHue), random(30, 100), random(50, 100), 60);
      ellipse(randX, randY, radius, radius)
  }
}
