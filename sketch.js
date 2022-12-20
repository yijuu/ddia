let system;
let light

function setup() {
  createCanvas(600, 400);
  system = new ParticleSystem(createVector(width / 2, 50));
  light = new Light();
}

function draw() {
  background(42);
  system.addParticle();
  system.run();
  light.update();
  light.sub();
  light.display();
  
}

class Light{
  constructor() {
    this.pos = createVector(0, height);    
  }
  
  update() {
    this.pos.y -= 0.1; 
  }
  
  sub() {
    if(mouseIsPressed){
      this.pos.y = this.pos.y +10;

    }
  }
  
  display() {
    fill(150);
    ellipse(300, 450, 680,200);
    fill(255, 100);
    rect(this.pos.x, this.pos.y, width, height);
  }
  
}

class ParticleSystem {
  constructor(position) {
    this.origin = position.copy();
    this.particles = [];    
  }
  
  addParticle() {
    this.particles.push(new Particle(this.origin));
  }
  
  run() {
    for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
  }
}

class Particle {
  constructor(position) {
   this.acceleration = createVector(0, 0.05);
   this.velocity = createVector(0, random(-1, -0.5));
   this.position = createVector(random(0, width), random(0, height));
   this.lifespan = 255;
  }
  
  run() {
   this.update();
   this.display();
  }
  
  update() {
   this.velocity.add(this.acceleration);
   this.position.add(this.velocity);
   this.lifespan -= 2;
  }
  
  display() {
   stroke(155, this.lifespan);
   strokeWeight(2);
   fill(255, this.lifespan);
   ellipse(this.position.x, this.position.y, 6, 6); 
  }
  
  isDead() {
    return this.lifespan < 0;
  }
}