let x;
let y;
let a = 0;
let dx = 0;
let dy = 0;
let xi;
let yi;
let flake;
let flakes = [];
// Stars generated as an array
let stars = [];
let paintLayer;
let pigeon; // Pigeon image
let colours = []; // Colour palette
let selectedColour;
let b1 = document.getElementById("button1");
let b2 = document.getElementById("button2");
let b3 = document.getElementById("button3");
let b4 = document.getElementById("button4");
let b5 = document.getElementById("button5");
b1.addEventListener("click", () => {
  window.location.href = "https://p5-demo-4wha.onrender.com#sketch1";
});
b2.addEventListener("click", () => {
  window.location.href = "https://p5-demo-4wha.onrender.com#sketch2";
});
b3.addEventListener("click", () => {
  window.location.href = "https://p5-demo-4wha.onrender.com#sketch3";
});
b4.addEventListener("click", () => {
  window.location.href = "https://p5-demo-4wha.onrender.com#sketch4";
});
b5.addEventListener("click", () => {
  window.location.href = "https://p5-demo-4wha.onrender.com#sketch5";
});
function sketchOne(p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.rectMode(p.CENTER);
    p.noLoop();
    x = p.width / 2;
    y = p.height / 2;
  };

  p.draw = function () {
    p.background(220);
    if (p.isLooping()) {
      p.push();
      p.stroke(0, 255, 0);
      p.text("running", p.width - 50, 10);
      p.pop();
    } else {
      p.push();
      p.stroke(255, 0, 0);
      p.text("not running", p.width - 70, 10);
      p.pop();
    }
    p.push();
    p.translate(x, y);
    p.rotate(p.atan2(p.mouseY - y, p.mouseX - x) + p.HALF_PI);
    a = a + 1;
    p.fill(255, 0, 0);
    p.beginShape();
    p.vertex(-25, p.sqrt(50 ** 2 - 25 ** 2) / 2);
    p.vertex(25, p.sqrt(50 ** 2 - 25 ** 2) / 2);
    p.vertex(0, -p.sqrt(50 ** 2 - 25 ** 2) / 2);
    p.vertex(-25, p.sqrt(50 ** 2 - 25 ** 2) / 2);
    p.endShape();
    p.fill("blue");
    p.beginShape();
    p.vertex(5, -p.sqrt(50 ** 2 - 25 ** 2) / 2 + p.sqrt(75));
    p.vertex(-5, -p.sqrt(50 ** 2 - 25 ** 2) / 2 + p.sqrt(75));
    p.vertex(0, -p.sqrt(50 ** 2 - 25 ** 2) / 2);
    p.endShape();
    p.fill("red");
    p.pop();
    if (x > p.mouseX) {
      x = x - 5;
    }
    if (x < p.mouseX) {
      x = x + 5;
    }
    if (y > p.mouseY) {
      y = y - 5;
    }
    if (y < p.mouseY) {
      y = y + 5;
    }
    x = p.constrain(x, 25, p.width - 25);
    y = p.constrain(y, 25, p.height - 25);
  };
  p.mousePressed = function () {
    if (p.mouseX > 0 && p.mouseX < p.width) {
      if (p.mouseY > 0 && p.mouseY < p.height) {
        if (p.isLooping()) {
          p.noLoop();
        } else {
          p.loop();
        }
      }
    }
  };
}
new p5(sketchOne, "sketch1");

function sketchTwo(p) {
  p.setup = function () {
    class snowflake {
      constructor(x, y, rad) {
        this.x = x;
        this.y = y;
        this.rad = rad;
      }
      show() {
        p.circle(this.x, this.y, this.rad, this.rad);
      }
      fall() {
        this.y = this.y + p.random(0, 5);
        if (this.y > p.height) {
          this.y = p.random(-p.height, -10);
        }
        this.x = this.x + p.random(-2, 2);
        if (this.x < -10 || this.x > p.width + 10) {
          this.x = p.random(0, p.width);
          this.y = p.random(-p.height, -10);
        }
      }
    }
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.rectMode(p.CENTER);
    p.noLoop();
    xi = p.width / 2;
    yi = p.height / 2;
    for (i = 0; i < 250; i++) {
      flake = new snowflake(
        p.random(0, p.width),
        p.random(-p.height, p.height - 10),
        p.random(2, 5)
      );
      flakes.push(flake);
    }
  };
  p.draw = function () {
    p.background(0);
    if (p.isLooping()) {
      p.push();
      p.stroke(0, 255, 0);
      p.text("running", p.width - 50, 10);
      p.pop();
    } else {
      p.push();
      p.stroke(255, 0, 0);
      p.text("not running", p.width - 70, 10);
      p.pop();
    }
    p.stroke(255);
    for (i = 0; i < flakes.length; i++) {
      flakes[i].show();
      flakes[i].fall();
    }
  };
  p.mousePressed = function () {
    if (p.mouseY > 0 && p.mouseY < p.height) {
      if (p.mouseX > 0 && p.mouseX < p.width) {
        if (p.isLooping()) {
          p.noLoop();
        } else {
          p.loop();
        }
      }
    }
  };
}
new p5(sketchTwo, "sketch2");

function sketchThree(p) {
  // A space effect

  // Stars generated as an array
  let stars = [];

  let frame = 0;
  let spaceship1, spaceship2, spaceship3;
  let spaceship = [];
  let spaceshipPosition;

  let bullets = [];

  // Image frames for the spaceship
  p.preload = function () {
    spaceship1 = p.loadImage("/images/spaceship1.png");
    spaceship2 = p.loadImage("/images/spaceship2.png");
    spaceship3 = p.loadImage("/images/spaceship3.png");
    spaceship = [spaceship1, spaceship2, spaceship3];
  };

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight); // Fullscreen

    p.frameRate(60);

    // Using HSB for the stars' random colour
    p.colorMode(p.HSB);

    for (let i = 0; i < 300; i++) {
      // At initialisation, make 200 stars and append them to the Stars array
      stars.push(new Star());
    }

    spaceshipPosition = 0;
  };

  p.draw = function () {
    p.background("black"); // The screen/background is black

    p.translate(p.width / 2, p.height / 2); // Starting at the middle of the screen
    for (let x of stars) {
      x.update(); // The star will be moving closer. Code below
      x.show(); // The star is drawn on the canvas. Code below
    }

    // Bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].update();
      bullets[i].show();

      if (bullets[i].offscreen()) {
        bullets.splice(i, 1); // Remove bullets from array when they go out of view
      }
    }

    if (p.keyIsDown(p.LEFT_ARROW)) {
      // Pressing the right or left arrows will make the spaceship move sideways by 15px x frame
      spaceshipPosition -= 25;
    }
    if (p.keyIsDown(p.RIGHT_ARROW)) {
      spaceshipPosition += 25;
    }

    p.image(spaceship[frame % spaceship.length], spaceshipPosition - 50, 200); // Run through array images as frames. Centre the spaceship at the bottom of the screen.
    frame++;
    spaceshipPosition = p.constrain(
      spaceshipPosition,
      -p.width / 2 + 50,
      p.width / 2 - 50
    );
  };

  class Star {
    constructor() {
      this.reset(); // Star appears. Code below
    }

    reset() {
      // Each star is first drawn at random values for x, y and z.
      this.x = p.random(-p.width, p.width);
      this.y = p.random(-p.height, p.height);
      this.z = p.random(p.width);

      this.hue = p.random(40, 60); // The stars' hue can be between white and yellow
      this.brightness = p.random(15, 50); // The stars' brightness can be between 15 and 50
      this.saturation = p.random(20, 100); // The stars' saturation can be between 20 and 100
    }

    update() {
      this.z -= 10; // For every tick, the star moves on the z (depth) axis by 10px
      if (this.z < 1) {
        this.reset(); // Once the star reaches the edge of the screen, it calls reset()
      }
    }

    show() {
      // Stars' colour determined by the random values decided in the code above
      p.fill(this.hue, this.brightness, this.saturation);
      p.noStroke(); // No border outline on the star objects

      // Perspective: as the z coordinate gets smaller by coming closer to the edge, x and y values get bigger relationally
      let starX = p.map(this.x / this.z, 0, 1, 0, p.width);
      let starY = p.map(this.y / this.z, 0, 1, 0, p.height);

      let size = p.map(this.z, 0, p.width, 10, 0); // The size of the star increases as the z value decreases (illusion of flying closer to the star so they appear bigger)

      p.ellipse(starX, starY, size, size); // The star is drawn as an ellipse at the determined coordinatess
    }
  }

  // Bullets class
  class Bullet {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.speed = 20;
    }

    update() {
      this.y -= this.speed;
    }

    show() {
      p.fill(0, 0, 100);
      p.noStroke();
      p.ellipse(this.x, this.y, 5, 10);
    }

    offscreen() {
      return this.y < -p.height / 2;
    }
  }

  // Fire bullets function
  p.keyPressed = function () {
    // Fired by pressing the spacebar
    if (p.key === "f") {
      bullets.push(new Bullet(spaceshipPosition, 200));
    }
  };
}

new p5(sketchThree, "sketch3");

function sketchFour(p) {
  p.preload = function () {
    pigeon = p.loadImage("/images/pigeon-colouring.png");
  };
  p.setup = function () {
    // Colouring mini-game
    p.createCanvas(p.windowWidth, p.windowHeight);
    // p.imageMode(p.CENTER);

    p.background("white");

    // Create a separate graphics layer for painting
    paintLayer = p.createGraphics(p.width, p.height);
    paintLayer.clear(); // Make sure it's transparent

    // Load colour palette
    colours = [
      p.color(50), // Dark grey
      p.color(200), // Light grey
      p.color(55, 175, 25), // Green
      p.color(245, 35, 151), // Purple
      p.color(245, 129, 35), // Orange
      p.color(245, 214, 35), // Yellow
      p.color(0, 0, 0), // Black
      p.color(255, 255, 255), // White
    ];

    selectedColour = colours[0];

    palette();
  };
  function palette() {
    // Show the palette
    let colourSpot = 50;
    for (let i = 0; i < colours.length; i++) {
      p.fill(colours[i]);
      p.strokeWeight(2);
      p.ellipse(40 + i * (colourSpot + 10), 40, colourSpot);
    }
  }
  function isSelected() {
    let colourSpot = 50;
    for (let i = 0; i < colours.length; i++) {
      let spotX = 40 + i * (colourSpot + 10); // Checks if a spot is selected by its distance
      let spotY = 40;
      let distance = p.dist(p.mouseX, p.mouseY, spotX, spotY);
      if (distance < colourSpot / 2) {
        selectedColour = colours[i];
        return;
      }
    }
  }
  function paint() {
    paintLayer.noStroke();
    paintLayer.fill(selectedColour);
    paintLayer.ellipse(p.mouseX, p.mouseY, 15); // Paint is in the shape of circles
  }
  p.draw = function () {
    p.image(paintLayer, 0, 0); // Show layer where the paint goes on first (underneath the transparent png)
    p.image(pigeon, p.width / 3, p.height / 6); // PNG on top
    if (p.mouseIsPressed) {
      paint();
    }
    // if (p.isLooping()) {
    //   p.push();
    //   p.stroke(0, 255, 0);
    //   p.text("running", p.width - 50, 10);
    //   p.pop();
    // } else {
    //   p.push();
    //   p.stroke(255, 0, 0);
    //   p.text("not running", p.width - 70, 10);
    //   p.pop();
    // }
  };

  p.mousePressed = function () {
    isSelected(); // Check if a colour spot was clicked
  };
}

new p5(sketchFour, "sketch4");

function sketchFive(p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.rectMode(p.CENTER);
  };

  p.draw = function () {
    p.background(220);
    p.orbitControl();
    p.push();
    p.translate(300, 0, 0);
    p.fill("red");
    p.box(200);
    p.pop();
    p.push();
    p.translate(-300, 0, 0);
    p.fill("green");
    p.box(200);
    p.pop();
    p.fill("blue");
    p.box(200);
  };
  p.mousePressed = function () {};
}
new p5(sketchFive, "sketch5");
