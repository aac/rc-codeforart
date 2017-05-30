/*

*/

var bars=[]

function setup() {
  createCanvas(1280, 720)
  clear()
  background(31)
}

function mouseClicked(){
  //make a new bar
  bars.push({x: mouseX, y: mouseY, fill: color(random(20,255),random(20,255),random(20,255))})
}

function draw() {
  clear()
  background(31)
  noStroke()

  bars.forEach(function(b){
    fill(b.fill)
    rect(b.x, b.y, 80, 5)
    b.y = b.y + 5
  })
}
