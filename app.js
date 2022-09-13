var fireworks = []
var gravity;
var red = 0;
var green = 10000;
var blue = 10000000;

class Particle{
    constructor(x,y,firework){
        this.x = x
        this.y = y
        this.firework = firework
        this.pos = createVector(this.x,this.y)
        if(this.firework){
            this.vel = createVector(0,random(-8,-16))
        }
        else{
            this.vel = p5.Vector.random2D()
            this.vel.mult(random(1,2))
        }
        this.acc = createVector(0,0)
        this.exploded = false
        this.particles = []
        this.bursted = false
        this.life = 255
    }

    applyForce(force){
        this.acc.add(force)
    }

    update(){
        if(!this.exploded){
            this.vel.add(this.acc)
            this.pos.add(this.vel)
            this.acc.mult(0)
            if(this.vel.y > 5 && this.firework){
                this.exploded = true
            }
        }
        else{
            if(this.firework && !this.bursted){
                for(let i = 0; i<50; i++){
                    this.particles.push(new Particle(this.pos.x,this.pos.y,false))
                }
                this.bursted = true
                // this.exploded = false
            }
        }
    }

    show(){
        stroke(this.life,this.pos.x,this.pos.y)
        if(this.bursted){
            stroke(0)
        }
        if(this.exploded || !this.firework){
            this.life -= 5
        }
        strokeWeight(2)
        point(this.pos.x,this.pos.y)
        if(this.exploded){
            this.particles.forEach(par => { 
                par.applyForce(createVector(0,0.01))
                par.update()
                par.show()
            });
            // this.particles = []
        }
        // this.life -= 1
    }
}

function setup(){
    createCanvas(1350,640)
    gravity  = createVector(0,0.2)
    background(0)
}

function draw(){
    red += 0.01
    green += 0.01
    blue += 0.01
    background(0,50)
    if(random(1) < 0.3){
        fireworks.push(new Particle(random(width),height,true))
    }
    fireworks.forEach((fir,i) => {
        fir.applyForce(gravity)
        fir.update()
        fir.show()
        if(fir.life < 0){
            fireworks.splice(i,1)
        }
        console.log(fireworks.length);
    });
    strokeWeight(1)
    stroke(150)
    noFill()
    textSize(96)
    textAlign(CENTER,CENTER)
    text('HAPPY BIRTHDAY ANNA !!',width/2,height/2)
}