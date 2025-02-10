// Project: "Rhythm of Urdu and Hindi" by Riyash Lughmani
// Urdu name: "اردو اور ہندی کی تال"
// Hindi name: "उर्दू और हिन्दी की ताल"

// Brief: Uniting the Desi community through a unique mutually intelligible language.

// How?
// 1. Type in Hindi and Urdu into the designated text boxes.
// 2. Hindi-Urdu words will appear.
// 3. Visual of Hindi-Urdu word can be modified with the sliders (hence rhythm)!

// Then?
// 1. Press the "S" key on your keyboard to save as a GIF!
// 2. Restart and try again with another Hindi-Urdu word!

// Link to Hindi font: https://fonts.google.com/noto/specimen/Noto+Sans+Devanagari
// Link to Urdu font: https://fonts.google.com/noto/specimen/Noto+Nastaliq+Urdu?query=urdu

// note: this was my backup plan in case my speech recognition could not work //


// START // START // START // START // START //


let hindiFont; // hindi typography
let urduFont; // urdu typography
let hindiText; // hindi text on screen // देसी example text // हिन्दी
let urduText; // urdu text on screen // دیسی example text // اردو

let pg; // graphics
let tX; // tile X
let tY; // tile Y
let sp; // speed
let dspx; // displacement X
let dspy; // displacement Y
let fct; // function control


function preload() {
// fonts
  hindiFont = loadFont('assets/NotoSansDevanagari-Regular.ttf'); // hindi typography
  urduFont = loadFont('assets/NotoNastaliqUrdu-Regular.ttf'); // urdu typography
}


function setup() {
// overview
  createCanvas(windowWidth, 600); // canvas size
  pg = createGraphics(windowWidth, 600); // graphics size
  createSliders(); // activating sliders

  // project title only
  projectTitle = createP('"rhythm of urdu and hindi"').position(width/2.3, height + 10);
  projectTitle = createP('by riyash lughmani').position(width/2.23, height + 35);
  projectTitle = createP('press "s" to save!').position(width/2.2, height + 340);

  // hindi text only
  hindiText = createInput('देसी'); // place hindi text within the '' on canvas
  hindiText.attribute('placeholder', 'hindi text (e.g. देसी)'); // where to place the hindi text
  hindiText.position(width/2.5, height + 100); // where the hindi text box will appear
  hindiText.size(125); // size of the hindi text box
  
  // urdu text only
  urduText = createInput('دیسی'); // place urdu text within the '' on canvas
  urduText.attribute('placeholder', 'urdu text (e.g. دیسی)'); // where to place urdu text
  urduText.position(width/2, height + 100); // here the urdu text box will appear
  urduText.size(125); // size of the urdu text box
}


function draw() {
  // overview
  background(255); // canvas colour // WHITE 255 // 220 test
  let hindiMsg = hindiText.value(); // variable for hindi message
  let urduMsg = urduText.value(); // variable for urdu message

  // hindi-urdu text
  pg.background(255); // graphics colour // WHITE 255 // 220 test
  pg.fill(0); // text colour
  pg.textSize(100); // text size
  pg.push(); // begins the pg for draw
  pg.translate(width/2, height/2);
  pg.textAlign(CENTER, CENTER); // text in centre
  pg.text(hindiMsg, 20, -75); // hindi message display
  pg.text(urduMsg, 20, 75); // urdu message display
  pg.pop(); // ends the pg for draw

  // slider
  let tilesX = tX.value(); // tiles X
  let tilesY = tY.value(); // tiles Y

  // slider
  let tileW = int(width/tilesX); // tiles X
  let tileH = int(height/tilesY); // tiles Y

  // nested loops
  for (let y = 0; y < tilesY; y++) { // tiles Y nested loop
    for (let x = 0; x < tilesX; x++) { // tiles X nested loop

      let waveX = int(sin(frameCount * sp.value() + ( x * y ) * dspx.value()) * fct.value()); // tiles X
      let waveY = int(sin(frameCount * sp.value() + ( x * y ) * dspy.value()) * fct.value()); // tiles Y

      if (dspx.value() === 0){ // displacement X
          waveX = 0; // displacement X
      }

      if (dspy.value() === 0){ // displacement Y
          waveY = 0; // displacement Y
      }
      
      // region to copy from the source image
      let sx = x*tileW + waveX;
      let sy = y*tileH + waveY;
      let sw = tileW;
      let sh = tileH;

      // region of the canvas to copy into
      let dx = x*tileW;
      let dy = y*tileH;
      let dw = tileW;
      let dh = tileH;

      // copies pixels from recent created variables alltogether
      copy(pg, sx, sy, sw, sh, dx, dy, dw, dh); // for the canvas
    } // slider adjustments
  } // slider adjustments
} // function draw


function createSliders() {
  // tile x slider
  tX = createSlider(1, 50, 5, 1); // (min scale, max scale, default, increment)
  tX.position(width/2.5, height + 170); // values moves slider ONLY
  createP('tiles x:').position(width/2.5, height + 130); // values moves slider text ONLY

  // tile y slider
  tY = createSlider(1, 50, 5, 1); // (min scale, max scale, default, increment)
  tY.position(width/2, height + 170); // values moves slider ONLY
  createP('tiles y:').position(width/2, height + 130); // values moves slider text ONLY

  // displacement x slider
  dspx = createSlider(0, 1, 0.05, 0.001); // (min scale, max scale, default, increment)
  dspx.position(width/2.5, height + 240); // values moves slider ONLY
  createP('displacement x:').position(width/2.5, height + 200); // values moves slider text ONLY

  // displacement y slider
  dspy = createSlider(0, 1, 0.05, 0.001); // (min scale, max scale, default, increment)
  dspy.position(width/2, height + 240); // values moves slider ONLY
  createP('displacement y:').position(width/2, height + 200); // values moves slider text ONLY
  
  // offset slider
  fct = createSlider(0, 200, 25, 1); // (min scale, max scale, default, increment)
  fct.position(width/2.5, height + 310); // values moves slider ONLY
  createP('offset:').position(width/2.5, height + 270); // values moves slider text ONLY

  // speed slider
  sp = createSlider(0, 1, 0.1, 0.01); // (min scale, max scale, default, increment)
  sp.position(width/2, height + 310); // values moves slider ONLY
  createP('speed:').position(width/2, height + 270); // values moves slider text ONLY
}


function keyPressed() {
  if (key == 's') { // "S" button on keyboard will save 
    saveGif('rhythm of urdu and hindi', 1);  // saved as "rhythm of urdu and hindi" for 5 seconds
  }
}


// END // END //  END //  END //  END //
