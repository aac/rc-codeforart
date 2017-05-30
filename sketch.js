/*

*/

var particles = []
var minDist = 5

function setup() {
  createCanvas(1280, 720)
  clear()
  background(51)
}

function makeParticle(c, m, x, y, vx, vy){
  particles.push({
      charge: c,
      mass: m,
      x: x,
      y: y,
      vx: vx,
      vy: vy,
      fx: 0,
      fy: 0
    })
}

function makeElectron(x,y){
  makeParticle(-1,1,x,y,1,0)
}
function makeProton(x,y){
  makeParticle(1,1000,x,y,2*random()-1,2*random()-1)
}

function mouseClicked() {
    // new proton
    makeProton(mouseX,mouseY)
}

function keyPressed() {
  if (key === ' '){
    makeElectron(5, height/2)
  }
}

function applyWallImpulses(p){
  if (p.x > width - minDist ){
    p.x = width - minDist
    if (p.vx > 0)
      p.vx *= -1
  }
  if (p.x < minDist ){
    p.x = minDist
    if (p.vx < 0)
      p.vx *= -1
  }
  if (p.y > height - minDist ){
    p.y = height - minDist
    if (p.vy > 0)
      p.vy *= -1
  }
  if (p.y < minDist ){
    p.y = minDist
    if (p.vy < 0)
      p.vy *= -1
  }
}

function step(n){
  var dt = 1.0 / n
  for (var i = 0; i < n; i++) {

    // integrating position
    particles.forEach(function(p){
      p.x += p.vx * dt
      p.y += p.vy * dt
    })

    // integrating velocity
    particles.forEach(function(p){
      p.vx += p.fx/p.mass * dt
      p.vy += p.fy/p.mass * dt
    })

    // computing the forces
    particles.forEach(function(p){
      p.fx = 0
      p.fy = 0

      var k = 20 // fake coulomb's constant

      // other particles
      particles.forEach(function(p2){
        if (p === p2) return;

        var f = k * p.charge * p2.charge / sq(max(1, dist(p.x,p.y,p2.x,p2.y)))
        var nx = p.x-p2.x
        var ny = p.y-p2.y

        var tmp = mag(nx, ny)
        nx = nx / tmp
        ny = ny / tmp

        p.fx += f * nx
        p.fy += f * ny
      })

      // walls
      applyWallImpulses(p)

      if (0){
        p.fy += (k * sq(p.charge) / sq(p.y)) //top
        p.fy += -(k * sq(p.charge) / sq(height - p.y)) //bottom
        p.fx += (k * sq(p.charge) / sq(p.x)) // left
        p.fx += -(k * sq(p.charge) / sq(width - p.x)) //right
      }
    })
  }
}

function drawParticles(){
  particles.forEach(function(p){
    if (p.charge > 0){
      fill(75,0,130)
      ellipse(p.x, p.y, 8, 8)
    }
    else if (p.charge < 0){
      fill(216,191,216)
      ellipse(p.x, p.y, 4, 4)
    }

//    text(""+p.fx+", "+p.fy, p.x+10, p.y-10)
    stroke(138,43,226)
    line(p.x, p.y, p.x+1000*p.fx, p.y+1000*p.fy)
    noStroke()
  })
}

function draw() {
  //clear()
  //background(51)

  noStroke()
  ellipseMode(RADIUS)

  step(100)
  drawParticles()
}
