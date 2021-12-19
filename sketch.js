let button;
let playing;

let rWave = new p5.Oscillator('sine');
let gWave = new p5.Oscillator('sine');
let bWave = new p5.Oscillator('sine');
  
let waves = [rWave, gWave, bWave];
let notes = [440, 493.88, 261.63, 293.66, 329.63, 349.23];
let input = [];
let note;

let images = []; 

let t; // tint

let a, b, c; /// chosing images from array

function preload() {
  // Fill "images" array
  for (let i = 1; i < 11; i++) {
    images[i-1] = loadImage("image-" + i + ".jpeg");
    print("image-" + i + ".jpeg");
  }
}

function setup() {
  let cnv = createCanvas(700, 700);
  cnv.mousePressed(chooseImages)
  pixelDensity(1);
  button = createButton('&#9834');
  button.position(680, 684);
  button.mousePressed(buttonPress);
  
  // resize each image to canvas size
  for (let i = 1; i < 11; i++) {
    images[i-1].resize(width, height);
  }
  frameRate(8);
  chooseImages();
}

function draw() {
  
  background(255, 10);
  
  // choose a few images randomly from the array & generate opacity values
  t = lerp(0, random(10, 220), 0.3);
  tint(255, t);
  image(images[a], 0, 0);

  t = lerp(0, random(10, 220), 0.3);
  tint(255, t);
  image(images[b], 0, 0);

  t = lerp(0, random(10, 200), 0.3);
  tint(255, t);
  image(images[c], 0, 0);
  
  if (playing) {
    // smooth the transitions by 0.1 seconds
    for (let i = 0; i < 3; ++i) {
      waves[i].amp(0.3, 0.1);
      pixelRGB();
      playing = true;
    }
  }
  
}

function chooseImages() {
  
  a = int(random(10));
  b = int(random(10));
  c = int(random(10));

  if (a == b) { // if a and b are the same generate a new b
    b = int(random(10));
  }
  if((a==c)||(b==c)) { // if a and c are the same generate a new c
    c = int(random(10));
  }
  print("a:"+a);
  print("b:"+b);
  print("c:"+c);
  
}

function playOscillator() {
  for (let i = 0; i < 3; ++i) {
    waves[i].start();
    playing = true;
  }
}

function pixelRGB() {
  let c = get(mouseX, mouseY);
  console.log(c);
  
  for (let i = 0; i < 3; ++i) {
    if ((c[i] >= 0) && (c[i] <= 37.5)) {
      note = "C";
      // set frquency to 261.63
      waves[i].freq(notes[2])
    } else if ((c[i] >= 37.6) && (c[i] <= 75.1)) {
       note = "D";
      // set frequency to 293.66
      waves[i].freq(notes[3])
    } else if ((c[i] >= 75.2) && (c[i] <= 112.7)) {
      note = "E";
      // set frequency to 329.63
      waves[i].freq(notes[4])
    } else if ((c[i] >= 112.8) && (c[i] <= 150.3)){
      note = "F";
      // set frequency to 349.23
      waves[i].freq(notes[5])
    } else if ((c[i] >= 150.4) && (c[i] <= 187.9)) {
      note = "A";
      // set frquency to 440
      waves[i].freq(notes[0])
    } else if ((c[i] >= 188) && (c[i] <= 255)) {
      note = "B";
      // set frquency to 493.88
      waves[i].freq(notes[1])
    } 
  }
  input.push(note);
  console.log(note);
}

function buttonPress() {
  // ramp amplitude to 0 over 0.5 seconds
  if (!playing) {
    playOscillator();
    playing = true;
  } else {
    for (let i = 0; i < 3; ++i) {
      waves[i].amp(0, 0.5);
      playing = !playing;
    } 
  }
}