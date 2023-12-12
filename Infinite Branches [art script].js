

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

var inverted = R.random_bool(0.5);
var hasDrums = R.random_bool(0.1);

var reharmNum = R.random_int(0,17); // Define chords 

// Make d0ppelganger melody 1/101 instead of 1/11 
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

var randomAttack = R.random_dec() + 0.008;
var randomDecay = (R.random_dec() * (2.0 - 0.2)) + 0.2;
var randomSustain = R.random_dec() * 0.75;
var randomRelease = R.random_dec() / 2;

var randomAttack2 = R.random_dec() / 2 + 0.008;
var randomDecay2 = (R.random_dec() * (2.0 - 0.2)) + 0.2;
var randomSustain2 = R.random_dec() * 0.75;
var randomRelease2 = R.random_dec() / 2;

var randomAttack3 = R.random_dec() / 2 + 0.008;
var randomDecay3 = (R.random_dec() * (2.0 - 0.2)) + 0.2;
var randomSustain3 = R.random_dec() * 0.75;
var randomRelease3 = R.random_dec() / 2;

var randomAttack4 = R.random_dec() + 0.008;
var randomDecay4 = (R.random_dec() * (2.0 - 0.2)) + 0.2;
var randomSustain4 = R.random_dec() * 0.75;
var randomRelease4 = R.random_dec() / 2;

// Set the BPM
var storeTempo = R.random_int(120, 180 - randomRelease * 30);
Tone.Transport.bpm.value = storeTempo;

var bassPalette = ["pluck", "sub", "womp", "infinite"];
var bassSound = bassPalette[R.random_int(0,3)];

var melPalette = ["pluck", "womp", "infinite"];
var melSound = melPalette[R.random_int(0,2)];

var src4 = 20 - map(storeTempo, 120, 180, 0, 20);//R.random_dec() * 20; //size
var src1 = R.random_dec() * 20; //structure a inverted
var src2 = R.random_dec() * 20; //structure b
var src3 = R.random_dec() * 20; //wobble

var chordPalette = ["infinite", "womp", "pluck"][R.random_int(0,2)];


// Fisher-Yates shuffle function to shuffle the array randomly
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(R.random_dec() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

var genNotes = ["B4", "C#4", "F#4", "D4", "E4", "A4"];

if (reharmNum === 4) {
    genNotes = ["A3", "E3", "E4", "D4", "A4", "D4"];
}

// rotate the array by 'interval' positions
shuffleArray(genNotes);

// then, you can simply pick the notes by their index
var genNote1 = genNotes[0];
var genNote2 = genNotes[1];
var genNote3 = genNotes[2];
var genNote4 = genNotes[3];
var genNote5 = genNotes[4];
var genNote6 = genNotes[5];


if (chordPalette === "infinite") {

    // Create the polyphonic synth for chords
    var synth = new Tone.PolySynth(Tone.Synth);

    // Set synth parameters
    synth.set({
        volume: -15,
        oscillator: { type: 'sawtooth' },
        detune: 0,
        voices: 4,
        envelope: {
            attack: randomAttack,
            decay: randomDecay,
            sustain: 0,//randomSustain,
            release: randomRelease
        }
    });
}

if (chordPalette === "womp") {

    // Create the polyphonic synth for chords
    var synth = new Tone.PolySynth(Tone.Synth);

    // Set synth parameters
    synth.set({
        volume: -15,
        oscillator: { type: 'sawtooth' },
        detune: 20,
        voices: 4,
        envelope: {
            attack: 0.1,
            decay: 0.5,
            sustain: 0,//randomSustain,
            release: 0.5
        }
    });
}

if (chordPalette === "pluck") {

    // Create the polyphonic synth for chords
    var synth = new Tone.PolySynth(Tone.Synth);

    // Set synth parameters
    synth.set({
        volume: -15,
        oscillator: { type: 'sawtooth' },
        detune: 20,
        voices: 4,
        envelope: {
            attack: 0.01,
            decay: 01,
            sustain: 0.3,//randomSustain,
            release: 1.5
        }
    });
}

var RandomCutoff = 500 + R.random_dec() * 1500; 

// Create a filter
var filter = new Tone.Filter({
    type: 'lowpass', // the type of the filter
    frequency: RandomCutoff, // the cutoff frequency
    rolloff: -48, // the rolloff rate
    Q: 1, // the Q value
    gain: 0 // the gain value (only valid for certain filter types)
});

// Create a reverb effect for polysynth
var reverb = new Tone.Reverb({
    decay: 1.5,  // Reverb decay time in seconds (can be randomized)
    preDelay: 0.1,  // Time before reverb is heard (can be randomized)
    wet: R.random_dec() / 1.5
});

// Create a reverb effect for lead
var reverb2 = new Tone.Reverb({
    decay: 3,  // Reverb decay time in seconds (can be randomized)
    preDelay: 0.1,  // Time before reverb is heard (can be randomized)
    wet: R.random_dec() / 1.5 + 0.2
})

// Make the reverb effect ready (optional but recommended)
reverb.generate();

// Connect the synth to the filter
synth.connect(filter);

// Connect the filter to the reverb
filter.connect(reverb);

// Then connect the reverb to the destination
reverb.toDestination();

// Create the bass

if (bassSound === "pluck") {

    var bassSynth = new Tone.MonoSynth({ // simple bass
        volume: -10,
        oscillator: {
            type: ['sine', 'square', 'triangle', 'sawtooth'][bassOSC]
        },
        envelope: {
            attack: 0.01,//randomAttack2,
            decay: 0,//randomDecay2,
            sustain: 1,//randomSustain2,
            release: 1//randomRelease2
        },
       filterEnvelope : {
            attack : 0.01,//randomAttack3, //0.06 ,
            decay : 2,//randomDecay3, //0.3 ,
            sustain : 0,//randomSustain3, //0.5 ,
            release : 2,//randomRelease3, //2 ,
            baseFrequency : 200 ,
            octaves : 3,
            exponent : 5
        }
    }).toDestination();
}

if (bassSound === "sub") {

    var bassSynth = new Tone.MonoSynth({ // long release
        volume: -10,
        oscillator: {
            type: ['sine', 'square', 'triangle', 'sawtooth'][bassOSC]
        },
        envelope: {
            attack: 0.01,//randomAttack2,
            decay: 0,//randomDecay2,
            sustain: 1,//randomSustain2,
            release: 7 + R.random_int(0,8)//randomRelease2
        },
        filterEnvelope : {
            attack : 0.001,//randomAttack3, //0.06 ,
            decay : 2,//randomDecay3, //0.3 ,
            sustain : 0,//randomSustain3, //0.5 ,
            release : 2,//randomRelease3, //2 ,
            baseFrequency : 200 ,
            octaves : 1,
            exponent : 9
        }
    }).toDestination();
}

if (bassSound === "womp") {

    var bassSynth = new Tone.MonoSynth({ // long release
        volume: -10,
        oscillator: {
            type: ['sine', 'square', 'triangle', 'sawtooth'][bassOSC]
        },
        envelope: {
            attack: .3,//randomAttack2,
            decay: 0,//randomDecay2,
            sustain: 1,//randomSustain2,
            release: .2//randomRelease2
        },
        filterEnvelope : {
            attack : .5,//randomAttack3, //0.06 ,
            decay : 1,//randomDecay3, //0.3 ,
            sustain : 1,//randomSustain3, //0.5 ,
            release : .2,//randomRelease3, //2 ,
            baseFrequency : 200 ,
            octaves : 1,
            exponent : 9
        }
    }).toDestination();
}

if (bassSound === "infinite") {

    var bassSynth = new Tone.MonoSynth({ // long release
        volume: -10,
        oscillator: {
            type: ['sine', 'square', 'triangle', 'sawtooth'][bassOSC]
        },
        envelope: {
            attack: randomAttack2,
            decay: randomDecay2,
            sustain: randomSustain2,
            release: randomRelease2
        },
        filterEnvelope : {
            attack : randomAttack3, //0.06 ,
            decay : randomDecay3, //0.3 ,
            sustain : randomSustain3, //0.5 ,
            release : randomRelease3, //2 ,
            baseFrequency : 200 ,
            octaves : 1,
            exponent : 9
        }
    }).toDestination();
}

//var leadEnv = []


// Create the Lead
if (melSound === "infinite") {
    var monoSynth = new Tone.MonoSynth({
        volume: -25,
        oscillator: { 
            type: ['sine', 'square', 'triangle', 'sawtooth'][melOSC] 
        },
        envelope: {
            attack: (R.random_dec() / 2) + 0.01,
            decay: (R.random_dec() * (2.0 - 0.2)) + 0.2,
            sustain: 1,//R.random_dec() * 0.75,
            release: R.random_dec()
        },
            filterEnvelope : {
            attack : randomAttack4, //0.06 ,
            decay : randomDecay4, //0.05 ,
            sustain : randomSustain4, //0.5 ,
            release : randomRelease4, //2 ,
            baseFrequency : R.random_int(300, 900),
            octaves : 3 ,
            exponent : R.random_int(1,5)
    }
    }).toDestination();
}

if (melSound === "pluck") {
    var monoSynth = new Tone.MonoSynth({
        volume: -25,
        oscillator: { 
            type: ['sine', 'square', 'triangle', 'sawtooth'][melOSC] 
        },
        envelope: {
            attack: 0.01,
            decay: (R.random_dec() * (2.0 - 0.2)) + 0.2,
            sustain: 1,//R.random_dec() * 0.75,
            release: R.random_dec() * 2
        },
            filterEnvelope : {
            attack : 0.01 ,
            decay : 0.1 + R.random_dec() * 0.4, //0.05 ,
            sustain : 0,//randomSustain4, //0.5 ,
            release : randomRelease4, //2 ,
            baseFrequency : R.random_int(400, 800),
            octaves : 3 ,
            exponent : R.random_int(1,5)
    }
    }).toDestination();
}

if (melSound === "womp") {
    var monoSynth = new Tone.MonoSynth({
        volume: -25,
        oscillator: { 
            type: ['sine', 'square', 'triangle', 'sawtooth'][melOSC] 
        },
        envelope: {
            attack: 0.5,
            decay: (R.random_dec() * (2.0 - 0.2)) + 0.2,
            sustain: 1,//R.random_dec() * 0.75,
            release: 2//R.random_dec() * 2
        },
            filterEnvelope : {
            attack : 0.2,
            decay : 0 + R.random_dec() * 0.4, //0.05 ,
            sustain : 1,//randomSustain4, //0.5 ,
            release : randomRelease4, //2 ,
            baseFrequency : 400,//R.random_int(300, 900),
            octaves : 3,
            exponent : R.random_int(1,5)
    }
    }).toDestination();
}

monoSynth.connect(reverb2);

reverb2.toDestination();

// Generate the random parameters for the FMSynth
var randomFmAttack = (R.random_dec() * 0.2) + 0.1;
var randomFmDecay = (R.random_dec() * (1.5 - 0.1)) + 0.1;
var randomFmSustain = R.random_dec() * 0.75;
var randomFmRelease = R.random_dec();

if (chordPalette === "infinite") {
    // Create an FMSynth
    var fmSynth = new Tone.PolySynth({
        synth: Tone.FMSynth,
        options: {
            volume: -15,
            envelope: {
                attack: randomFmAttack,
                decay: randomFmDecay,
                sustain: 1,//randomFmSustain,
                release: randomFmRelease
            },
            modulationIndex: 10,
            detune: -10,
            harmonicity: 3.0
        }
    }).toDestination(); // Connect directly to the speakers
}

if (chordPalette === "pluck") {
    // Create an FMSynth
    var fmSynth = new Tone.PolySynth({
        synth: Tone.FMSynth,
        options: {
            volume: -22,
            harmonicity : 3 ,
            modulationIndex : 10 ,
            detune : 0 ,
            oscillator : {
                type : ["triangle", "sine", "sawtooth"][1]//[R.random_int(0,1)]
            } ,
            envelope : {
            attack : 0.01 ,
            decay : 0.01 ,
            sustain : 1 ,
            release : 2.5
            } ,
            modulation : {
            type : ["square", "sine", "triangle", "sawtooth"][R.random_int(0,3)]
            } ,
            modulationEnvelope : {
            attack : 0.1 ,
            decay : 0.2 ,
            sustain : 1 ,
            release : 0.5
            }
        }
    }).toDestination(); // Connect directly to the speakers
}

if (chordPalette === "womp") {
    // Create an FMSynth
    var fmSynth = new Tone.PolySynth({
        synth: Tone.FMSynth,
        options: {
            volume: -18,
            harmonicity : 3 ,
            modulationIndex : 10 ,
            detune : 0 ,
            oscillator : {
                type : ["triangle", "sine", "sawtooth"][R.random_int(0,1)]
            } ,
            envelope : {
            attack : 0.2 ,
            decay : 0.01 ,
            sustain : 1 ,
            release : 0.5
            } ,
            modulation : {
            type : ["square", "sine", "triangle", "saw"][R.random_int(0,3)]
            } ,
            modulationEnvelope : {
            attack : 0.5 ,
            decay : 0 ,
                sustain : 1 ,
            release : 0.5
            }
        }
    }).toDestination(); // Connect directly to the speakers
}

// Define a sequence of bass notes
var bassLine1 = [
    { time: "0:0:0", note: "B1" },
    { time: "0:3:0", note: "D1" },
    { time: "2:0:0", note: "E1" },
    { time: "2:3:0", note: "F#1"},
    { time: "3:0:0", note: "D1" },
    { time: "3:3:0", note: "C#1" },
    { time: "3:0:0", note: "E1" },
    { time: "3:2:0", note: "F#1"},
    { time: "4:0:0", note: "B1" },
    { time: "4:3:0", note: "D1" },
    { time: "6:0:0", note: "E1" },
    { time: "6:3:0", note: "F#1"},
];

var bassLine2 = [
    { time: "0:0:0", note: "G1" },
    { time: "2:0:0", note: "D1" },
    { time: "3:0:0", note: "A1"},
    { time: "4:0:0", note: "G1" },
    { time: "6:0:0", note: "D1" },
    { time: "7:0:0", note: "A1"},
];

var bassLine3 = [
    { time: "0:0:0", note: "D1" },
    { time: "2:0:0", note: "F#1" },
    { time: "4:0:0", note: "E1"},
    { time: "6:0:0", note: "A1" },
];

var bassLine5 = [
    { time: "0:0:0", note: "D1" },
    { time: "0:3:0", note: "F1" },
    { time: "2:0:0", note: "C2"},
    { time: "2:3:0", note: "G1" },
    { time: "4:0:0", note: "D1" },
    { time: "4:3:0", note: "F1" },
    { time: "6:0:0", note: "C1"},
    { time: "6:3:0", note: "G2" },
];

var bassLine6 = [
    { time: "0:0:0", note: "B1" },
    { time: "0:3:0", note: "A1" },
    { time: "2:0:0", note: "G1"},
    { time: "2:3:0", note: "E2" },
    { time: "4:0:0", note: "B1" },
    { time: "4:3:0", note: "A1" },
    { time: "6:0:0", note: "G2"},
    { time: "6:3:0", note: "E2" },
];

var bassLine7 = [
    { time: "0:0:0", note: "G1" },
    { time: "2:0:0", note: "B1" },
    { time: "4:0:0", note: "F#1"},
    { time: "6:0:0", note: "E1" },
];

var bassLine8 = [
    { time: "0:0:0", note: "B1" },
    { time: "1:0:0", note: "E1" },
    { time: "2:0:0", note: "B1"},
    { time: "3:0:0", note: "E2" },
    { time: "4:0:0", note: "B1" },
    { time: "5:0:0", note: "E1" },
    { time: "6:0:0", note: "B1"},
    { time: "7:0:0", note: "E1" }
];

var bassLine9 = [
    { time: "0:0:0", note: "G1" },
    { time: "0:3:0", note: "E1" },
    { time: "2:0:0", note: "B1" },
    { time: "2:3:0", note: "A2"},
    { time: "4:0:0", note: "G1" },
    { time: "4:3:0", note: "E1" },
    { time: "6:0:0", note: "B1" },
    { time: "6:3:0", note: "A1"},
];

var bassLine10 = [
    { time: "0:0:0", note: "B1" },
    { time: "2:0:0", note: "D1" },
    { time: "4:0:0", note: "E1" },
    { time: "6:0:0", note: "F#1" },
];



var bassBranches = ["B1", "D1", "E1", "F#1", "G1", "A1"];

var bassProg = [];


var chordBranches = [
    ["B2", "D3", "A4", "C#4"],
    ["A2", "C#3", "F#4", "A4"],
    ["E2", "G3", "D4", "F#4"],
    ["F#2", "A3", "C#4", "E4"],
    ["G3", "D3", "B4", "F#4"],
    ["A3", "G3", "C#4", "E4"]
];

const chords = [
  [1,2,3,4,5],
  [0,2,3,4,5],
  [0,1,3,4,5],
  [0,2,4,5],
  [0,1,2,3,5],
  [0,1,2,4]
];

var startingChord = [0,1,2,4][R.random_int(0,3)];

function getRandomElement(arr) {
  return arr[Math.floor(R.random_dec() * arr.length)];
}

function generateProgression(startChord, length) {
    let progression = [chordBranches[startChord]];
    bassProg.push(bassBranches[startChord]);

    for (let i = 1; i < length; i++) {
        let lastChordIndex = chords[chordBranches.indexOf(progression[i - 1])];
        let nextChordIndex = getRandomElement(lastChordIndex);
        progression.push(chordBranches[nextChordIndex]);
        bassProg.push(bassBranches[nextChordIndex]);
    }

  return progression;
}

var branchingChordsProg = generateProgression(startingChord, 8);


var bassBranching1 = [
    { time: "0:0:0", note: bassProg[0]},
    { time: "2:0:0", note: bassProg[1]},
    { time: "4:0:0", note: bassProg[2]},
    { time: "6:0:0", note: bassProg[3]}
];

var bassBranching2 = [
    { time: "0:0:0", note: bassProg[0]},
    { time: "0:3:0", note: bassProg[1]},
    { time: "2:0:0", note: bassProg[2]},
    { time: "2:3:0", note: bassProg[3]},
    { time: "4:0:0", note: bassProg[0]},
    { time: "4:3:0", note: bassProg[1]},
    { time: "6:0:0", note: bassProg[2]},
    { time: "6:3:0", note: bassProg[3]},
];

var bassBranching3 = [
    { time: "0:0:0", note: bassProg[0]},
    { time: "1:2:0", note: bassProg[1]},
    { time: "2:0:0", note: bassProg[2]},
    { time: "3:2:0", note: bassProg[3]},
    { time: "4:0:0", note: bassProg[0]},
    { time: "5:2:0", note: bassProg[1]},
    { time: "6:0:0", note: bassProg[2]},
    { time: "7:0:0", note: bassProg[3]}
];


var bassBranching4 = [
    { time: "0:0:0", note: bassProg[0]},
    { time: "0:3:0", note: bassProg[1]}, 
    { time: "2:0:0", note: bassProg[2]},
    { time: "2:3:0", note: bassProg[3]},
    { time: "4:0:0", note: bassProg[4]}, 
    { time: "4:3:0", note: bassProg[5]}, 
    { time: "6:0:0", note: bassProg[6]}, 
    { time: "6:3:0", note: bassProg[7]} 
];

var bassBranching5 = [
    { time: "0:0:0", note: bassProg[0]},
    { time: "1:2:0", note: bassProg[1]}, 
    { time: "2:0:0", note: bassProg[2]},
    { time: "3:2:0", note: bassProg[3]},
    { time: "4:0:0", note: bassProg[4]}, 
    { time: "5:2:0", note: bassProg[5]}, 
    { time: "6:0:0", note: bassProg[6]}, 
    { time: "7:0:0", note: bassProg[7]} 
];

var bassBranching6 = [
    { time: "0:0:0", note: bassProg[0]},
    { time: "1:0:0", note: bassProg[1]},
    { time: "2:0:0", note: bassProg[2]},
    { time: "3:0:0", note: bassProg[3]},
    { time: "4:0:0", note: bassProg[0]},
    { time: "5:0:0", note: bassProg[1]}, 
    { time: "6:0:0", note: bassProg[2]},
    { time: "7:0:0", note: bassProg[3]}, 
];

var bassBranching7 = [
    { time: "0:0:0", note: bassProg[0]},
    { time: "1:0:0", note: bassProg[1]},
    { time: "2:0:0", note: bassProg[2]},
    { time: "3:0:0", note: bassProg[3]},
    { time: "4:0:0", note: bassProg[4]},
    { time: "5:0:0", note: bassProg[5]}, 
    { time: "6:0:0", note: bassProg[6]},
    { time: "7:0:0", note: bassProg[7]}
];

var bassBranching8 = [
    { time: "0:0:0", note: bassProg[0]},
    { time: "2:0:0", note: bassProg[1]},
    { time: "3:0:0", note: bassProg[2]},
    { time: "4:0:0", note: bassProg[0]},
    { time: "6:0:0", note: bassProg[1]},
    { time: "7:0:0", note: bassProg[2]},
];

// Define chords
var chords1 = [
    { time: "0:0:0", notes: ["B2", "D3", "A4", "C#4"] },
    { time: "0:3:0", notes: ["A2", "C#3", "F#4", "A4"] },
    { time: "2:0:0", notes: ["E2", "G3", "D4", "F#4"] },
    { time: "2:3:0", notes: ["F#2", "A3", "C#4", "E4"] },
    { time: "4:0:0", notes: ["B2", "D3", "A4", "C#4"] }, 
    { time: "4:3:0", notes: ["A2", "C#3", "F#4", "A4"] }, 
    { time: "6:0:0", notes: ["E2", "G3", "D4", "F#4"] }, 
    { time: "6:3:0", notes: ["F#2", "A3", "C#4", "E4"] }  
];

var chords2 = [
    { time: "0:0:0", notes: ["G2", "D3", "B4", "F#4"] }, 
    { time: "2:0:0", notes: ["D2", "A3", "C#4", "F#4"] }, 
    { time: "3:0:0", notes: ["A2", "E3", "C#4", "E4"] },  
    { time: "4:0:0", notes: ["G2", "D3", "B4", "F#4"] },
    { time: "6:0:0", notes: ["D2", "A3", "C#4", "F#4"] }, 
    { time: "7:0:0", notes: ["A2", "E3", "C#4", "E4"] }  
];

var chords3 = [
    { time: "0:0:0", notes: ["D2", "C#3", "A4", "F#4"] }, 
    { time: "2:0:0", notes: ["F#2", "A3", "C#4", "G4"] },
    { time: "4:0:0", notes: ["E2", "G3", "B4", "D4"] }, 
    { time: "6:0:0", notes: ["A2", "C#3", "E4", "G4"] }, 
];

var chords4 = [
    { time: "0:0:0", notes: ["B2", "D3", "F#4"] }, 
    { time: "0:3:0", notes: ["D2", "A3", "F#4"] },
    { time: "2:0:0", notes: ["E2", "G3", "B4"] },
    { time: "2:3:0", notes: ["F#2", "A3", "C#4"] },  
    { time: "4:0:0", notes: ["B2", "D3", "F#4"] }, 
    { time: "4:3:0", notes: ["A2", "D3", "F#4"] },
    { time: "6:0:0", notes: ["E2", "G3", "B4"] },
    { time: "6:3:0", notes: ["F#2", "A3", "C#4"] }  
];

var chords5 = [
    { time: "0:0:0", notes: ["D3", "F#3", "A4", "C#4"] }, 
    { time: "0:3:0", notes: ["F3", "C4", "A4", "E4"] }, 
    { time: "2:0:0", notes: ["C2", "G4", "B4", "E4"] }, 
    { time: "2:3:0", notes: ["G3", "D3", "B4", "F#4"] }, 
    { time: "4:0:0", notes: ["D3", "F#4", "A4", "C#4"] }, 
    { time: "4:3:0", notes: ["F3", "C4", "A4", "E4"]}, 
    { time: "6:0:0", notes: ["C2", "G3", "B4", "E4"]}, 
    { time: "6:3:0", notes: ["G3", "D3", "B4", "F#4"] } 
];

var chords6 = [
    { time: "0:0:0", notes: ["B3", "F#3", "A4", "D4"] }, 
    { time: "0:3:0", notes: ["A3", "G3", "C#4", "E4"] }, 
    { time: "2:0:0", notes: ["G3", "D3", "B4", "F#4"] }, 
    { time: "2:3:0", notes: ["E3", "D3", "B4", "F#4"] }, 
    { time: "4:0:0", notes: ["B3", "F#3", "A4", "D4"] }, 
    { time: "4:3:0", notes: ["A3", "G3", "C#4", "E4"]}, 
    { time: "6:0:0", notes: ["G3", "D3", "B4", "F#4"]}, 
    { time: "6:3:0", notes: ["E3", "D3", "B4", "F#4"] }  
];

var chords7 = [
    { time: "0:0:0", notes: ["G2", "B3", "F#4", "A4"] }, 
    { time: "2:0:0", notes: ["B2", "A3", "C#4", "F#4"] }, 
    { time: "4:0:0", notes: ["F#2", "A3", "C#4", "E4"] }, 
    { time: "6:0:0", notes: ["E2", "D3", "B4", "F#4"] }, 
];

var chords8 = [
    { time: "0:0:0", notes: ["B3", "F#3", "A4", "C#4"] },
    { time: "1:0:0", notes: ["E3", "D3", "B4", "F#4"] },
    { time: "2:0:0", notes: ["B3", "F#3", "A4", "D4"] },
    { time: "3:0:0", notes: ["E3", "D3", "B4", "G4"]},
    { time: "4:0:0", notes: ["B3", "F#3", "A4", "C#4"] },
    { time: "5:0:0", notes: ["E3", "D3", "B4", "F#4"] }, 
    { time: "6:0:0", notes: ["B3", "F#3", "A4", "D4"] },
    { time: "7:0:0", notes: ["E3", "D3", "B4", "G4"]}, 
];

var chords9 = [
    { time: "0:0:0", notes: ["G3", "D3", "B4", "F#4"] },
    { time: "0:3:0", notes: ["E3", "D3", "B4", "F#4"] }, 
    { time: "2:0:0", notes: ["B3", "D4", "A4", "F#4"] },
    { time: "2:3:0", notes: ["A3", "G3", "C#4", "E4"] },
    { time: "4:0:0", notes: ["G3", "D3", "B4", "F#4"] }, 
    { time: "4:3:0", notes: ["E3", "D3", "B4", "F#4"]}, 
    { time: "6:0:0", notes: ["B3", "D4", "A4", "F#4"]}, 
    { time: "6:3:0", notes: ["A3", "G3", "C#4", "E4"] } 
];

var chords10 = [
    { time: "0:0:0", notes: ["B3", "F#3", "A4", "C#4"] },
    { time: "2:0:0", notes: ["A2", "C#3", "F#4", "A4"] },
    { time: "4:0:0", notes: ["E2", "G3", "D4", "F#4"] },
    { time: "6:0:0", notes: ["F#2", "A3", "C#4", "E4"]}
];

var chordBranching1 = [
    { time: "0:0:0", notes: branchingChordsProg[0]},
    { time: "2:0:0", notes: branchingChordsProg[1]},
    { time: "4:0:0", notes: branchingChordsProg[2]},
    { time: "6:0:0", notes: branchingChordsProg[3]}
];

var chordBranching2 = [
    { time: "0:0:0", notes: branchingChordsProg[0]},
    { time: "0:3:0", notes: branchingChordsProg[1]}, 
    { time: "2:0:0", notes: branchingChordsProg[2]},
    { time: "2:3:0", notes: branchingChordsProg[3]},
    { time: "4:0:0", notes: branchingChordsProg[0]}, 
    { time: "4:3:0", notes: branchingChordsProg[1]}, 
    { time: "6:0:0", notes: branchingChordsProg[2]}, 
    { time: "6:3:0", notes: branchingChordsProg[3]} 
];

var chordBranching3 = [
    { time: "0:0:0", notes: branchingChordsProg[0]},
    { time: "1:2:0", notes: branchingChordsProg[1]}, 
    { time: "2:0:0", notes: branchingChordsProg[2]},
    { time: "3:2:0", notes: branchingChordsProg[3]},
    { time: "4:0:0", notes: branchingChordsProg[0]}, 
    { time: "5:2:0", notes: branchingChordsProg[1]}, 
    { time: "6:0:0", notes: branchingChordsProg[2]}, 
    { time: "7:0:0", notes: branchingChordsProg[3]} 
];

var chordBranching4 = [
    { time: "0:0:0", notes: branchingChordsProg[0]},
    { time: "0:3:0", notes: branchingChordsProg[1]}, 
    { time: "2:0:0", notes: branchingChordsProg[2]},
    { time: "2:3:0", notes: branchingChordsProg[3]},
    { time: "4:0:0", notes: branchingChordsProg[4]}, 
    { time: "4:3:0", notes: branchingChordsProg[5]}, 
    { time: "6:0:0", notes: branchingChordsProg[6]}, 
    { time: "6:3:0", notes: branchingChordsProg[7]} 
];

var chordBranching5 = [
    { time: "0:0:0", notes: branchingChordsProg[0]},
    { time: "1:2:0", notes: branchingChordsProg[1]}, 
    { time: "2:0:0", notes: branchingChordsProg[2]},
    { time: "3:2:0", notes: branchingChordsProg[3]},
    { time: "4:0:0", notes: branchingChordsProg[4]}, 
    { time: "5:2:0", notes: branchingChordsProg[5]}, 
    { time: "6:0:0", notes: branchingChordsProg[6]}, 
    { time: "7:0:0", notes: branchingChordsProg[7]} 
];

var chordBranching6 = [
    { time: "0:0:0", notes: branchingChordsProg[0]},
    { time: "1:0:0", notes: branchingChordsProg[1]},
    { time: "2:0:0", notes: branchingChordsProg[2]},
    { time: "3:0:0", notes: branchingChordsProg[3]},
    { time: "4:0:0", notes: branchingChordsProg[0]},
    { time: "5:0:0", notes: branchingChordsProg[1]}, 
    { time: "6:0:0", notes: branchingChordsProg[2]},
    { time: "7:0:0", notes: branchingChordsProg[3]}, 
];

var chordBranching7 = [
    { time: "0:0:0", notes: branchingChordsProg[0]},
    { time: "1:0:0", notes: branchingChordsProg[1]},
    { time: "2:0:0", notes: branchingChordsProg[2]},
    { time: "3:0:0", notes: branchingChordsProg[3]},
    { time: "4:0:0", notes: branchingChordsProg[4]},
    { time: "5:0:0", notes: branchingChordsProg[5]}, 
    { time: "6:0:0", notes: branchingChordsProg[6]},
    { time: "7:0:0", notes: branchingChordsProg[7]}
];

var chordBranching8 = [
    { time: "0:0:0", notes: branchingChordsProg[0]},
    { time: "2:0:0", notes: branchingChordsProg[1]},
    { time: "3:0:0", notes: branchingChordsProg[2]},
    { time: "4:0:0", notes: branchingChordsProg[0]},
    { time: "6:0:0", notes: branchingChordsProg[1]},
    { time: "7:0:0", notes: branchingChordsProg[2]},
];





// Define a melody sequence
var melody1 = [
    //{ time: "0:0:2", note: genNote1},//"C#4" },
    //{ time: "0:0:3", note: genNote2},//"D4" },
    { time: "0:2:0", note: genNote3},//"A4" },
    //{ time: "0:3:0", note: genNote4},//"B4" },
    { time: "1:0:2", note: genNote1},//"C#4" },
    //{ time: "1:0:3", note: genNote5},//"E4" },
    { time: "1:2:0", note: genNote3},//"A4" },
    { time: "1:3:0", note: genNote5},//"B4" },
    //{ time: "2:0:2", note: genNote1},//"C#4" },
    //{ time: "2:0:3", note: genNote2},//"D4" },
    { time: "2:2:0", note: genNote3},//"A4" },
    //{ time: "2:3:0", note: genNote4},//"B4" },
    { time: "3:0:2", note: genNote1},//"C#4" },
    //{ time: "3:0:3", note: genNote5},//"E4" },
    { time: "3:2:0", note: genNote3},//"A4" },
    { time: "3:3:0", note: genNote6},//"F#4" },    
    //{ time: "4:0:2", note: genNote1},//"C#4" },
    //{ time: "4:0:3", note: genNote2},//"D4" },
    { time: "4:2:0", note: genNote3},//"A4" },
    { time: "4:3:0", note: genNote4},//"B4" },
    { time: "5:0:2", note: genNote1},//"C#4" },
    //{ time: "5:0:3", note: genNote5},//"E4" },
    { time: "5:2:0", note: genNote3},//"A4" },
    { time: "5:3:0", note: genNote5},//"B4" },
    //{ time: "6:0:2", note: genNote1},//"C#4" },
    //{ time: "6:0:3", note: genNote2},//"D4" },
    { time: "6:2:0", note: genNote3},//"A4" },
    { time: "6:3:0", note: genNote4},//"B4" },
    { time: "7:0:2", note: genNote1},//"C#4" },
    //{ time: "7:0:3", note: genNote5},//"E4" },
    { time: "7:2:0", note: genNote3},//"A4" },
    { time: "7:3:0", note: genNote6},//"F#4" },
];

var melody2 = [
    { time: "0:0:2", note: genNote2},//"E4" },
    { time: "0:0:3", note: genNote3},//"F#4" },
    { time: "0:2:0", note: genNote1},//"C#4" },
    { time: "0:3:0", note: genNote2},//"E4" },
    { time: "1:0:2", note: genNote2},//"E4" },
    { time: "1:0:3", note: genNote3},//"F#4" },
    { time: "1:2:0", note: genNote1},//"C#4" },
    { time: "1:3:0", note: genNote4},//"B3" },
    { time: "2:0:2", note: genNote2},//"E4" },
    { time: "2:0:3", note: genNote1},//"F#4" },
    { time: "2:2:0", note: genNote1},//"C#4" },
    { time: "2:3:0", note: genNote4},//"D4" },
    { time: "3:0:2", note: genNote4},//"B4" },
    { time: "3:0:3", note: genNote3},//"F#4" },
    { time: "3:2:0", note: genNote1},//"C#4" },
    { time: "3:3:0", note: genNote5},//"D4" },    
    { time: "4:0:2", note: genNote6},//"E4" },
    { time: "4:0:3", note: genNote3},//"F#4" },
    { time: "4:2:0", note: genNote1},//"C#4" },
    { time: "4:3:0", note: genNote2},//"E4" },
    { time: "5:0:2", note: genNote2},//"E4" },
    { time: "5:0:3", note: genNote3},//"F#4" },
    { time: "5:2:0", note: genNote1},//"C#4" },
    { time: "5:3:0", note: genNote4},//"B3" },
    { time: "6:0:2", note: genNote2},//"E4" },
    { time: "6:0:3", note: genNote6},//"F#4" },
    { time: "6:2:0", note: genNote1},//"C#4" },
    { time: "6:3:0", note: genNote5},//"D4" },
    { time: "7:0:2", note: genNote5},//"D4" },
    { time: "7:0:3", note: genNote3},//"F#4" },
    { time: "7:2:0", note: genNote1},//"C#4" },
    { time: "7:3:0", note: genNote5},//"D4" },
];

var melody3 = [
    { time: "0:0:2", note: genNote1},//"E4" },
    { time: "0:2:0", note: genNote2},//"C#4" },
    { time: "1:0:2", note: genNote1},//"E4" },
    { time: "1:2:0", note: genNote2},//"C#4" },
    { time: "2:0:2", note: genNote1},//"E4" },
    { time: "2:2:0", note: genNote2},//"C#4" },
    { time: "3:0:2", note: genNote3},//"D4" },
    { time: "3:2:0", note: genNote6},//"C#4" },
    { time: "4:0:2", note: genNote1},//"E4" },
    { time: "4:2:0", note: genNote2},//"C#4" },
    { time: "5:0:2", note: genNote1},//"D4" },
    { time: "5:2:0", note: genNote2},//"C#4" },
    { time: "6:0:2", note: genNote1},//"E4" },
    { time: "6:2:0", note: genNote2},//"C#4" },
    { time: "7:0:2", note: genNote4},//"D4" },
    { time: "7:2:0", note: genNote5},//"C#4" },
];

var melody4 = [
    { time: "0:0:0", note: genNote1},//"F#4" },
    { time: "0:1:2", note: genNote2},//"C#4" },
    { time: "0:3:0", note: genNote3},//"E4" },
    { time: "1:0:2", note: genNote1},//"F#4" },
    { time: "1:2:0", note: genNote4},//"D4" },
    //{ time: "1:3:0", note: genNote2},//"C#4" },
    { time: "2:0:0", note: genNote4},//"E4" },
    { time: "2:1:2", note: genNote2},//"D4" },
    { time: "2:3:0", note: genNote3},//"E4" },
    { time: "3:0:2", note: genNote1},//"F#4" },
    { time: "3:2:0", note: genNote5},//"D4" },
    { time: "3:3:0", note: genNote2},//"C#4" },
    { time: "4:0:0", note: genNote1},//"F#4" },
    { time: "4:1:2", note: genNote2},//"C#4" },
    { time: "4:3:0", note: genNote3},//"E4" },
    { time: "5:0:2", note: genNote1},//"F#4" },
    { time: "5:2:0", note: genNote4},//"D4" },
    //{ time: "5:3:0", note: genNote2},//"C#4" },
    { time: "6:0:0", note: genNote4},//"D4" },
    { time: "6:1:2", note: genNote2},//"C#4" },
    { time: "6:3:0", note: genNote1},//"F#4" },
    { time: "7:0:2", note: genNote5},//"D4" },
    { time: "7:2:0", note: genNote2},//"C#4" },
    { time: "7:3:0", note: genNote3},//"E4" }
];

var melody5 = [
    { time: "0:2:0", note: genNote1},//"D4" },
    { time: "1:2:0", note: genNote1},//"D4" },
    { time: "2:2:0", note: genNote2},//"E4" },
    { time: "3:2:0", note: genNote1},//"D4" },
    { time: "4:2:0", note: genNote1},//"D4" },
    { time: "5:2:0", note: genNote1},//"D4" },
    { time: "6:2:0", note: genNote2},//"E4" },
    { time: "7:2:0", note: genNote2},//"E4" },
];

var melody6 = [
    { time: "0:1:0", note: genNote1},//"A4" },
    { time: "1:1:0", note: genNote1},//"A4" },
    { time: "2:1:0", note: genNote1},//"A4" }, ///////
    { time: "3:1:0", note: genNote2},//"G4" },
    { time: "4:1:0", note: genNote1},//"A4" },
    { time: "5:1:0", note: genNote1},//"A4" },
    { time: "6:1:0", note: genNote1},//"A4" },
    { time: "7:1:0", note: genNote3},//"E4" }
];

var melody7 = [
    { time: "0:2:0", note: genNote1},//"D4" },
    { time: "1:2:0", note: genNote2},//"B4" },
    { time: "2:2:0", note: genNote1},//"D4" }, //////
    { time: "3:2:0", note: genNote3},//"C#4" },
    { time: "4:2:0", note: genNote1},//"D4" },
    { time: "5:2:0", note: genNote2},//"B4" },
    { time: "6:2:0", note: genNote1},//"D4" },
    { time: "7:2:0", note: genNote3},//"C#4" }
];

var melody8 = [
    { time: "0:0:0", note: genNote1 },
    { time: "0:1:2", note: genNote2 },
    { time: "0:3:0", note: genNote1 },
    { time: "1:0:2", note: genNote2 },
    { time: "1:2:0", note: genNote1 },
    { time: "1:3:0", note: genNote2 },
    { time: "2:0:0", note: genNote3 },
    { time: "2:1:2", note: genNote5 },
    { time: "2:3:0", note: genNote3 },
    { time: "3:0:2", note: genNote5 },
    { time: "3:2:0", note: genNote3 },
    { time: "3:3:0", note: genNote5 },
    { time: "4:0:0", note: genNote1 },
    { time: "4:1:2", note: genNote2 },
    { time: "4:3:0", note: genNote1 },
    { time: "5:0:2", note: genNote2 },
    { time: "5:2:0", note: genNote1 },
    { time: "5:3:0", note: genNote2 },
    { time: "6:0:0", note: genNote3 },
    { time: "6:1:2", note: genNote5 },
    { time: "6:3:0", note: genNote3 },
    { time: "7:0:2", note: genNote5 },
    { time: "7:2:0", note: genNote3 },
    { time: "7:3:0", note: genNote5 }
];
 
var melody9 = [
    { time: "0:0:3", note: genNote1 },
    { time: "0:1:2", note: genNote2 },
    { time: "1:0:3", note: genNote1 },
    { time: "1:1:2", note: genNote2 },
    { time: "1:3:0", note: genNote3 },
    { time: "2:0:3", note: genNote1 },
    { time: "2:1:2", note: genNote2 },
    { time: "3:0:3", note: genNote1 },
    { time: "3:1:2", note: genNote2 },
    { time: "3:3:0", note: genNote4 },
    { time: "4:0:3", note: genNote1 },
    { time: "4:1:2", note: genNote2 },
    { time: "5:0:3", note: genNote1 },
    { time: "5:1:2", note: genNote2 },
    { time: "5:3:0", note: genNote3 },
    { time: "6:0:3", note: genNote1 },
    { time: "6:1:2", note: genNote2 },
    { time: "7:0:3", note: genNote1 },
    { time: "7:1:2", note: genNote2 },
    { time: "7:3:0", note: genNote5 }
];


var melody10 = [
    { time: "0:1:0", note: genNote1 },
    { time: "0:1:1", note: genNote2 },
    { time: "1:1:0", note: genNote1 },
    { time: "1:1:1", note: genNote2 },
    { time: "1:3:0", note: genNote3 },
    { time: "2:1:0", note: genNote1 },
    { time: "2:1:1", note: genNote2 },
    { time: "3:1:0", note: genNote1 },
    { time: "3:1:1", note: genNote2 },
    { time: "3:3:0", note: genNote4 },
    { time: "4:1:0", note: genNote1 },
    { time: "4:1:1", note: genNote2 },
    { time: "5:1:0", note: genNote1 },
    { time: "5:1:1", note: genNote3 },
    { time: "5:3:0", note: genNote2 },
    { time: "6:1:0", note: genNote3 },
    { time: "6:1:1", note: genNote5 },
    { time: "7:0:2", note: genNote5 },
    { time: "7:2:0", note: genNote3 },
    { time: "7:3:0", note: genNote4 }
];

var melody11 = [ // d0ppelganger melody
    { time: "0:1:0", note: genNote3 },//"D4" },
    { time: "0:2:0", note: genNote3 },//"D4" },
    { time: "0:3:0", note: genNote4 },//"E4" },
    { time: "1:0:0", note: genNote5 },//"F#4" },
    { time: "1:1:0", note: genNote2 },//"C#4" },
    { time: "2:1:0", note: genNote3 },//"D4" },
    { time: "2:2:0", note: genNote3 },//"D4" },
    { time: "2:3:0", note: genNote4 },//"E4" },
    { time: "3:0:0", note: genNote5 },//"F#4" },
    { time: "3:1:0", note: genNote1 },//"B3" },
    { time: "4:1:0", note: genNote3 },//"D4" },
    { time: "4:2:0", note: genNote3 },//"D4" },
    { time: "4:3:0", note: genNote4 },//"E4" },
    { time: "5:0:0", note: genNote5 },//"F#4" },
    { time: "5:1:0", note: genNote2 },//"C#4" },
    { time: "6:1:0", note: genNote3 },//"D4" },
    { time: "6:2:0", note: genNote3 },//"D4" },
    { time: "6:3:0", note: genNote4 },//"E4" },
    { time: "7:0:0", note: genNote5 },//"F#4" },
    { time: "7:1:0", note: genNote1 }//"B3" }
];

// Play bass
var bassSequence = new Tone.Part(function(time, event){
    bassSynth.triggerAttackRelease(event.note, "8n", time);
}, [bassLine1, bassLine2, bassLine3, bassLine1, bassLine5, bassLine6, bassLine7, bassLine8, bassLine9, bassLine10, bassBranching1, bassBranching2, bassBranching3, bassBranching4, bassBranching5, bassBranching6, bassBranching7, bassBranching8][reharmNum]).start(0);
bassSequence.loopEnd = '8m';

// Play chords on either Polysynth or FM
if (chordVoice === 1) {
    var polychSequence = new Tone.Part(function(time, event){
        synth.triggerAttackRelease(event.notes, "8n", time);
    }, [chords1, chords2, chords3, chords4, chords5, chords6, chords7, chords8, chords9, chords10, chordBranching1, chordBranching2, chordBranching3, chordBranching4, chordBranching5, chordBranching6, chordBranching7, chordBranching8][reharmNum]).start(0);
    //polychSequence.loopEnd = '8m';
}
else if (chordVoice === 0) {
    var fmSequence = new Tone.Part(function(time, event){
        fmSynth.triggerAttackRelease(event.notes, "8n", time);
    }, [chords1, chords2, chords3, chords4, chords5, chords6, chords7, chords8, chords9, chords10, chordBranching1, chordBranching2, chordBranching3, chordBranching4, chordBranching5, chordBranching6, chordBranching7, chordBranching8][reharmNum]).start(0);
}
else {
}

// Play melody
var melodyPlayer = [melody1, melody2, melody3, melody4, melody5, melody6, melody7, melody8, melody9, melody10, melody11][randMelody]
melodyPlayer.forEach(function(note){
    Tone.Transport.schedule(function(time){
        monoSynth.triggerAttackRelease(note.note, "8n", time);
    }, note.time);
});


Tone.Transport.schedule(function(time) {
    synth.triggerRelease(time);
    fmSynth.triggerRelease(time);
}, '3:2.5');



var isPlaying = false; // Track if the music is currently playing

        
document.addEventListener('click', function(event) {
  if (!isPlaying) {
    // Start the Tone.js audio context and then start the music
    Tone.start().then(() => {
      Tone.Transport.start();
      isPlaying = true;
    });
  } else {
    // Stop the music and reset the Transport position to start
    Tone.Transport.stop();
    Tone.Transport.position = 0;
    isPlaying = false;
  }
  event.preventDefault(); // Prevent default action (text selection) in some browsers
});



// Create a loop
let loop = new Tone.Loop(time => {
    // trigger your composition here
    // synth.triggerAttackRelease("C4", "8n");
}, "4n");

// Start and stop the loop
loop.start(0);
loop.stop('8m');

// Set the transport to loop and start it
Tone.Transport.loop = true;
Tone.Transport.loopEnd = '8m';

// Step 2: Add an event listener to the document to listen for keypress events
document.addEventListener('keydown', function(event) {
  if (event.key === 'm') { // Change 'm' to the desired key to mute/unmute the synth
    // Step 3: Toggle the volume of the synth when the key is pressed
    if (monoSynth.volume.value === -Infinity) {
      // Unmute the synth by setting the volume back to its original value
      monoSynth.volume.value = -25; // Adjust the volume level back to the original value
    } else {
      // Mute the synth by setting the volume to -Infinity
      monoSynth.volume.value = -Infinity;
    }
  }
})



//-------
//-------
//------- VISUALS
//-------
//-------


const dpr = window.devicePixelRatio || 1;

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth * dpr; // Scale by device pixel ratio and window size
canvas.height = window.innerHeight * dpr; // Scale by device pixel ratio and window size
canvas.style.width = '100%'; // Stretch to fill the width of the window
canvas.style.height = '100%'; // Stretch to fill the height of the window
canvas.style.objectFit = 'contain'; // Maintain aspect ratio
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
ctx.scale(dpr, dpr); // Scale context by device pixel ratio

        // Perlin noise implementation
        var permutation = [];
        var p = [];
        for (var i = 0; i < 256; i++) {
            permutation[i] = Math.floor(R.random_dec() * 256);
        }
        for(var i = 0; i < 512; i++) {
            p[i] = permutation[i & 255];
        }

        function fade(t) {
            return t * t * t * (t * (t * 6 - 15) + 10);
        }

        function lerp(t, a, b) {
            return a + t * (b - a);
        }

        function grad(hash, x, y, z) {
            var h = hash & 15;
            var u = h < 8 ? x : y,
            v = h < 4 ? y : h === 12 || h === 14 ? x : z;
            return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
        }

        function perlin(x, y, z) {
            var X = Math.floor(x) & 255 ,
                Y = Math.floor(y) & 255,
                Z = Math.floor(z) & 255;
            x -= Math.floor(x);
            y -= Math.floor(y);
            z -= Math.floor(z);
            var u = fade(x),
                v = fade(y),
                w = fade(z);
            var A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z,
                B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;

            return lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z),
                                          grad(p[BA], x - 1, y, z)),
                                 lerp(u, grad(p[AB], x, y - 1, z),
                                      grad(p[BB], x - 1, y - 1, z))),
                         lerp(v, lerp(u, grad(p[AA + 1], x, y, z - 1),
                                      grad(p[BA + 1], x - 1, y, z - 1)),
                              lerp(u, grad(p[AB + 1], x, y - 1, z - 1),
                                   grad(p[BB + 1], x - 1, y - 1, z - 1))));
        }

        function normalizedPerlin(x, y, z) {
            var nx = x / cols;
            var ny = y / cols;
            var nz = z / Math.max(cols, cols);  // Optional if you want to normalize z as well
            return perlin(nx, ny, nz);
        }

        function setup() {
            cols = canvas.width / dpr;
            rows = canvas.height / dpr;
        }

        //Create flow design
        function draw() {

            let rand1 = src1 / 5 + 1;
            let rand2 = src2 / 5 + 1;
            let rand3 = src3 + 5;
            let rand4 = src4 + 5;

            flowSize = map(src4, 0, 20, 1.5, 2.85);

            resolution = rand3 * 2 * cols / 400;

            //set inversion for bg
            if (inverted === true) {
                ctx.fillStyle = `rgb(${255 - (src1 * (rand1 - 1) + 30)}, ${255 - (src1 * (rand2 - 2) + 30)}, ${255 - (src1 * (rand2 - 2) + 30)})`;
            }
            else {
                ctx.fillStyle = `rgb(${src1 * (rand1 - 1) + 30}, ${src1 * (rand2 - 2) + 30}, ${src1 * (rand2 - 2) + 30})`;
            }
            ctx.fillRect(0, 0, cols, rows);

            /*for (i = 0; i < 10; i++) {
                if (inverted === true) {
                ctx.strokeStyle = `rgba(${rand2}, ${rand3}, ${rand4}, 70 * i)`;
                }
                else {
                ctx.strokeStyle = `rgba(${255 - rand2}, ${255 - rand3}, ${255 - rand4}, 70 * i)`;
                }
                ctx.strokeRect((150 + 25 * i) * (cols / 500), (150 + 25* i) * (cols / 500), cols - (200 + 50 * i * (cols / 500)), rows - (200 + 50 * i * (cols / 500)));
            }*/

            //set inversion for design
            if (inverted === true) {
                ctx.strokeStyle = `rgba(${255 - (rand4 + 40 * 4)},${255 - (rand4 + 38 * 4)},${255 - (rand4 + 42 * 4)}, 255)`;
            }
            else {
                ctx.strokeStyle = `rgba(${rand4 + 40 * 4},${rand4 + 38 * 4},${rand4 + 42 * 4}, 255)`;
            }
            

            let buffer = cols / 8; 
            let scaleFactor = 3;
            for (let y = flowSize * (cols / 8) ; y < (rows - buffer - flowSize * (cols / 8)); y+=(cols / 650)) {
                for (let x = flowSize * (cols / 8); x < (cols - buffer - flowSize * (cols / 8)); x+=(cols / 650)) {
                    let normalizedX = x / cols;
                    let normalizedY = y / rows;
                    let noiseValue = perlin(normalizedX * scaleFactor * rand1, normalizedY * scaleFactor * src2, 0);
                    let radius = map(noiseValue, 0, 1, 0, resolution);
                    if (radius > buffer) {
                        buffer = radius;
                    }
                    
                    ctx.lineWidth = cols / 1600;
                    ctx.beginPath();
                    ctx.moveTo(x + radius + buffer / 2, y + radius + buffer / 2);
                    ctx.lineTo(x + radius + cols / 650 + buffer / 2, y + radius + buffer / 2);
                    ctx.stroke();


                }
            }

            // borders
            if (inverted === true) {
                ctx.strokeStyle = `rgba(${rand1 * 4}, ${rand3 * 4}, ${rand2 * 4}, 200)`;
            }
            else {
                ctx.strokeStyle = `rgba(${255 - (rand1 * 4)}, ${255 - (rand3 * 4)}, ${255 - (rand2 * 4)}, 200)`;
            }
            ctx.lineWidth = cols / 2400;
            ctx.strokeRect(3 * (cols / 500), 3 * (cols / 500), cols - 6 * (cols / 500), rows - 6 * (cols / 500));

            // Rectangle 2
            if (inverted === true) {
                ctx.strokeStyle = `rgba(${rand4 * 3}, ${rand1 * 3}, ${rand2 * 3}, 130)`;
            }
            else {
                ctx.strokeStyle = `rgba(${255 - (rand4 * 3)}, ${255 - (rand1 * 3)}, ${255 - (rand2 * 3)}, 130)`;
            }
            ctx.strokeRect(6 * (cols / 500), 6 * (cols / 500), cols - 12 * (cols / 500), rows - 12 * (cols / 500));

            // Rectangle 3
            if (inverted === true) {
                ctx.strokeStyle = `rgba(${rand3 * 2}, ${rand4 * 2}, ${rand1 * 2}, 170)`;
            }
            else {
                ctx.strokeStyle = `rgba(${255 - rand3 * 2}, ${255 - rand4 * 2}, ${255 - rand1 * 2}, 170)`;
            } 
            ctx.strokeRect(20 * (cols / 500), 20 * (cols / 500), cols - 40 * (cols / 500), rows - 40 * (cols / 500));

            // Rectangle 4
            if (inverted === true) {
                ctx.strokeStyle = `rgba(${rand2}, ${rand3}, ${rand4}, 70)`;
            }
            else {
                ctx.strokeStyle = `rgba(${255 - rand2}, ${255 - rand3}, ${255 - rand4}, 70)`;
            }

            let scaleRECT = 500;
            let normX = 72 / scaleRECT;
            let normY = 72 / scaleRECT;

            let normWidth = (scaleRECT - 2 * 72) / scaleRECT;
            let normHeight = (scaleRECT - 2 * 72) / scaleRECT;

            ctx.strokeRect(normX * cols, normY * rows, normWidth * cols, normHeight * rows);

           


        }

        function map(n, start1, stop1, start2, stop2) {
            return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
        };

        setup();
        draw();

//-------
//-------        
//-------  DRUMS 
//-------
//-------

if (hasDrums === true) {

const kick = new Tone.MembraneSynth({
  pitchDecay: 0.2 + 0.4  * R.random_dec(),
  octaves: 0.5 + 1 * R.random_dec(),
  oscillator: {
    type: 'sine'
  },
  envelope: {
    attack: 0.001,
    decay: 0.4, 
    sustain: 0.01,
    release: 1.4,
    attackCurve: 'exponential'
  }
}).toDestination();

let snare = new Tone.MembraneSynth({
  pitchDecay: 0.02 + 0.1 * R.random_dec(),
  octaves: 10,
  oscillator: {
    type: 'sine'
  },
  envelope: {
    attack: 0.001,
    decay: 0.1 + 0.2  * R.random_dec(),
    sustain: 0.01,
    release: 0.4,
    attackCurve: 'exponential'
  }
}).toDestination();

const closedHiHat = new Tone.MetalSynth({
  frequency: 4000 + 2000 * R.random_dec(),
  envelope: {
    attack: 0.001,
    decay: 0.1 + 0.1 * R.random_dec(),
    release: 0.05
  },
  harmonicity: 8.1,
  modulationIndex: 32,
  resonance: 3000 + 2000 * R.random_dec(),
  octaves: 1.5,
  volume: -7
}).toDestination();

const openHiHat = new Tone.MetalSynth({
  frequency: 200 + 400 * R.random_dec(),
  envelope: {
    attack: 0.001,
    decay: 1,
    release: 1
  },
  harmonicity: 5.1,
  modulationIndex: 32,
  resonance: 3000 + 2000 * R.random_dec(),
  octaves: 1.5,
  volume: -12
}).toDestination();

const tom1 = new Tone.MembraneSynth({
  pitchDecay: 0.2 * R.random_dec(),
  octaves: 10 * R.random_dec(),
  oscillator: {
    type: 'sine'
  },
  envelope: {
    attack: 0.001,
    decay: 0.4 * R.random_dec(),
    sustain: 0.01,
    release: 1.4,
    attackCurve: 'exponential'
  }
}).toDestination();

// Configure the second tom
const tom2 = new Tone.MembraneSynth({
  pitchDecay: 0.2 * R.random_dec(),
  octaves: 10 * R.random_dec(),
  oscillator: {
    type: 'sine'
  },
  envelope: {
    attack: 0.001,
    decay: 0.4 * R.random_dec(),
    sustain: 0.01,
    release: 1.4,
    attackCurve: 'exponential'
  }
}).toDestination();

const keyMap = {
  'k': kick,
  'l': snare,
  'f': closedHiHat,
  'g': openHiHat,
  'h': tom1,
  'j': tom2
};

window.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();

  if (keyMap[key]) {
    keyMap[key].triggerAttackRelease('C2', '16n');
  }
});

}
