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

  clear()
  background(51)
}

function draw() {
  image(capture,0,0,320,240)
}
