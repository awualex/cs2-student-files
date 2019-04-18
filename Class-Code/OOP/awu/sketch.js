//Alex Wu
//Object, arrays, and classes 
//April 9th, 2019

/* A brief description of what the program is this project aims to use 
class and objects to animate the movement of bubbles in a canvass*/

let dead_number = 0;
let bubbles = [];
let dead_bubbles = [];
let radius = 0;
let zone_scale = 20;

function setup() {
    createCanvas(400, 400);
    colorMode(HSB);
    dead_bubbles.push(new Bubble(createVector(200, 200), 5, 0, [0, 255, 100]));
    for (i = 0; i < 100; i++) {
        let theta = random(0, 2 * PI);
        let rgb = [random(0, 250), random(0, 250), random(0, 250)];
        let Radius = radius + 50;
        bubbles.push(new Bubble(createVector(200 + Radius * cos(theta), 200 + Radius * sin(theta)), random(0, 5), random(1, 5), rgb));

    }
}

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

function unpad(d) {
    return (d[0] == '0') ? Number(d[1]) : Number(d);
}

class Bubble {
    constructor(TemPos, tempR, TempV, tempColor) {
        //let velocity_vector = p5.Vector.random2D();
        this.pos = TemPos;
        this.r = tempR;
        this.speed = TempV;
        this.color = tempColor;
        this.zone = [floor(this.pos.x / zone_scale), floor(this.pos.y / zone_scale)];
    }

    dead_collision(other) {
        if ((other.zone[0] - 2) < this.zone[0] < (other.zone[0] + 2) && (other.zone[1] - 2) < this.zone[1] < (other.zone[1] + 2)) {
                let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
                if (d <= this.r + other.r) {
                    let d2 = dist(this.pos.x, this.pos.y, 200, 200);
                    let Radius = radius + 50;
                    let theta = random(0, 2 * PI);
                    this.speed = 0;
                    let hue = map(d2, 0, width / 2, 0, 360);
                    this.color = [hue, 255, 100];
                    bubbles.push(new Bubble(createVector(200 + Radius * cos(theta), 200 + Radius * sin(theta)), random(0, 5), random(1, 5), [random(0, 250), random(0, 250), random(0, 250)]));

            }
        }
    }

    pos_check() {
        let d = dist(this.pos.x, this.pos.y, 200, 200);
        if (d >= radius + 100) {
            return true
        } else {
            return false
        }
    }


    rmove() {
        let bvelocity = p5.Vector.random2D().setMag(random(1, this.speed))
        this.pos.add(bvelocity);
    }

    show() {
        strokeWeight(4);
        fill(this.color);
        noStroke();
        ellipse(this.pos.x, this.pos.y, 2 * this.r);

    }

    large(scale) {
        this.r += scale;
    }

    update_radius() {
        let distance = dist(this.pos.x, this.pos.y, 200, 200);
        if (distance >= radius) {
            radius = distance;
        }
    }

    update_zone() {
        this.zone = [floor(this.pos.x / zone_scale), floor(this.pos.y / zone_scale)];
    }
}

function draw() {
    background(220);
    dead_bubbles[0].show();
    for (i = 0; i < bubbles.length; i++) {
        bubbles[i].show();

        if (bubbles[i].pos_check() == true) {
            let Radius = radius + 50;
            let theta = random(0, 2 * PI);
            let rgb = [random(0, 250), random(0, 250), random(0, 250)];
            bubbles[i] = new Bubble(createVector(200 + Radius * cos(theta), 200 + Radius * sin(theta)), random(0, 5), random(1, 5), rgb);
        }

        bubbles[i].rmove();

        for (let red_bubbles of dead_bubbles) {
            bubbles[i].dead_collision(red_bubbles);
            red_bubbles.update_radius();
        }
        if (bubbles[i].speed == 0) {
            dead_bubbles.push(bubbles[i]);
            dead_number += 1
        }

    }
    bubbles = bubbles.filter((bubble) => (bubble.speed != 0));
    //for(i=0;i<=dead_number;i++){
    //bubbles.push(new Bubble(random(0, 400), random(0, 400), random(0, 10), random(2, 4), rgb));
    //}
    dead_bubbles.forEach((b) => (b.show()));
    dead_number = 0;
}