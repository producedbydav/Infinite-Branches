/**
 * Calculate features for the given token data.
 * @param {Object} tokenData
 * @param {string} tokenData.tokenId - Unique identifier of the token on its contract.
 * @param {string} tokenData.hash - Unique hash generated upon minting the token.
 * @returns {Object} - A set of features in the format of key-value pair notation.
 * @note - This function is called by the ArtBlocks metadata server to generate the
 *         features for a given token. For more information, visit
 *         https://docs.prohibition.art/how-to-setup-features
 */
function calculateFeatures(tokenData) {
  const hash = tokenData.hash;
  const invocation = Number(tokenData.tokenId) % 1_000_000;
  
 
class Random {
  constructor() {
    this.useA = false;
    let sfc32 = function (uint128Hex) {
      let a = parseInt(uint128Hex.substring(0, 8), 16);
      let b = parseInt(uint128Hex.substring(8, 16), 16);
      let c = parseInt(uint128Hex.substring(16, 24), 16);
      let d = parseInt(uint128Hex.substring(24, 32), 16);
      return function () {
        a |= 0;
        b |= 0;
        c |= 0;
        d |= 0;
        let t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
    };
    // seed prngA with first half of tokenData.hash
    this.prngA = new sfc32(tokenData.hash.substring(2, 34));
    // seed prngB with second half of tokenData.hash
    this.prngB = new sfc32(tokenData.hash.substring(34, 66));
    for (let i = 0; i < 1e6; i += 2) {
      this.prngA();
      this.prngB();
    }
  }
  // random number between 0 (inclusive) and 1 (exclusive)
  random_dec() {
    this.useA = !this.useA;
    return this.useA ? this.prngA() : this.prngB();
  }
  // random number between a (inclusive) and b (exclusive)
  random_num(a, b) {
    return a + (b - a) * this.random_dec();
  }
  // random integer between a (inclusive) and b (inclusive)
  // requires a < b for proper probability distribution
  random_int(a, b) {
    return Math.floor(this.random_num(a, b + 1));
  }
  // random boolean with p as percent liklihood of true
  random_bool(p) {
    return this.random_dec() < p;
  }
  // random value in an array of items
  random_choice(list) {
    return list[this.random_int(0, list.length - 1)];
  }
}

let R = new Random();
// synth.js

 
//traits up top

//special
var inverted = R.random_bool(0.5);
var hasDrums = R.random_bool(0.1);

//parts:
var reharmNum = R.random_int(0,17); // Define reharm chords 
let options = [];
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) { // Add each number 0-10, ten times
        options.push(i);
    }
}
options.push(10); // Add 11 only once

let randMelody = options[R.random_int(0, 100)];

//voices
var bassOSC = R.random_int(0, 3);
var chordVoice = R.random_int(0,1);
var melOSC = R.random_int(0, 3);



var randomAttack = R.random_dec() + 0.008; // Random float between 0.1 and 1.0
var randomDecay = (R.random_dec() * (2.0 - 0.2)) + 0.2;  // Random float between 0.1 and 1.0
var randomSustain = R.random_dec() * 0.75;                       // Random float between 0.0 and 1.0
var randomRelease = R.random_dec() / 2; // Random float between 1.0 and 2.0

var randomAttack2 = R.random_dec() / 2 + 0.008; // Random float between 0.1 and 1.0
var randomDecay2 = (R.random_dec() * (2.0 - 0.2)) + 0.2;  // Random float between 0.1 and 1.0
var randomSustain2 = R.random_dec() * 0.75;                       // Random float between 0.0 and 1.0
var randomRelease2 = R.random_dec() / 2; // Random float between 1.0 and 2.0

var randomAttack3 = R.random_dec() / 2 + 0.008; // Random float between 0.1 and 1.0
var randomDecay3 = (R.random_dec() * (2.0 - 0.2)) + 0.2;  // Random float between 0.1 and 1.0
var randomSustain3 = R.random_dec() * 0.75;                       // Random float between 0.0 and 1.0
var randomRelease3 = R.random_dec() / 2; // Random float between 1.0 and 2.0

var randomAttack4 = R.random_dec() + 0.008; // Random float between 0.1 and 1.0
var randomDecay4 = (R.random_dec() * (2.0 - 0.2)) + 0.2;  // Random float between 0.1 and 1.0
var randomSustain4 = R.random_dec() * 0.75;                       // Random float between 0.0 and 1.0
var randomRelease4 = R.random_dec() / 2; // Random float between 1.0 and 2.0

// Set the BPM
var storeTempo = R.random_int(120, 180 - randomRelease * 30);

var bassPalette = ["pluck", "sub", "womp", "infinite"];
var bassSound = bassPalette[R.random_int(0,3)];

var melPalette = ["pluck", "womp", "infinite"];
var melSound = melPalette[R.random_int(0,2)];

var src4 = 20 - map(storeTempo, 120, 180, 0, 20);//R.random_dec() * 20; //size
var src1 = R.random_dec() * 20; //structure a inverted
var src2 = R.random_dec() * 20; //structure b
var src3 = R.random_dec() * 20; //wobble

var chordPalette = ["infinite", "womp", "pluck"][R.random_int(0,2)];



function map(n, start1, stop1, start2, stop2) {
    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
};

var flowSize = ["large", "med", "small"][Math.floor(src4 / 6.666)];

var structureStr = ["Tiny", "Narrow", "Wide"][Math.floor(src3 / 6.666)];


var mode = "start";
if (inverted) {
    mode = "light";
}
else {
    mode = "dark";
}

var bassOSCstr = ["sine", "square", "tri", "saw"][bassOSC];
var melOSCstr = ["sine", "square", "tri", "saw"][melOSC];
var chordSynthstr = ["FM Synth", "PolySynth"][chordVoice];
var chordProgstr = ["Bmin9 / Dmaj7 / Emin9 / F#min7", "Gmaj7 / Dmaj7 / A", "Dmaj7 / F#min / Emin7 / A7", "Bmin / Dmaj / Emin / F#min", "Dmaj7 / Fmaj7 / Cmaj7 / Gmaj7", "Bmin7 / A7 / Gmaj7 / Emin9", "Gmaj9 / Bmin9 / F#min7 / Emin9", "Bmin9 / Emin9", "Gmaj7 / Emin9 / Bmin7 / A7", "Bmin9 / Dmaj7 / Emin9 / F#min7", "Branching 1", "Branching 2", "Branching 3", "Branching 4", "Branching 5", "Branching 6", "Branching 7", "Branching 8"][reharmNum];

var hasDrumsstr;
if (hasDrums) {
    hasDrumsstr = "Yes";
}
else {
    hasDrumsstr = "No";
}

var melodyStr = ["1" , "2", "3", "4", "5", "6", "7","8", "9", "10", "d0ppelgänger"][randMelody];

  return {
      "Mode": mode,
      "Chord Progression": chordProgstr,
      "Melody Pattern": melodyStr,
      "Bass Sound": bassSound + " " + bassOSCstr,      
      "Chord Sound": chordPalette + " " + chordSynthstr,
      "Melody Sound": melSound + " " + melOSCstr,
      "Drums": hasDrumsstr,
      "Tempo": storeTempo,
      "Size": flowSize,
  }
}




