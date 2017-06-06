/*

*/
var capture

function setup() {
  createCanvas(1280, 720)

  capture = createCapture(VIDEO)
  capture.size(320, 240)
  // by default the capture object is displayed
  // below the canvas, use the following command
  // to hide the capture outside of the canvas
  capture.hide()

  frameRate(24)

  clear()
  background(51)
}

function draw() {
  ellipseMode(RADIUS)
  noStroke()
  //clear()

  capture.loadPixels()

  var numCircles = 500
  for (var i = 0; i < numCircles; i++){
    var randX = random()
    var randY = random()
    var radius = random(20, 30)
    //var radius = 30

    var pixX = floor(randX * capture.width)
    var pixY = floor(randY * capture.height)
    var offset = (pixY * capture.width + pixX) * 4

    fill(capture.pixels[offset], capture.pixels[offset+1],
      capture.pixels[offset+2], 50)

    ellipse(randX * width, randY*height, radius, radius)
  }

  image(capture,0,0,320,240)

}
