// navbar
import createNavbar from "./code/navbar.js"
createNavbar()
// end

// script selection
/*
state -> state table
network -> sockets wrappers / web access
controls -> events + loops, if else, sprite signaling etc
texture, audio -> exactly like it looks/ sounds
motion -> position + oriantiation and such
sensor -> sprite sensing/ mouse pos/ info
data -> save local/ global variables (ints, strings, tables) and save them localy
operations -> common functions (addition, RNG, conditions)
functions -> create functions made up of different blocks. can have inputs/ outputs

*/


// import createBlocks from "./code/script-dragspace.js"
// createBlocks()



/////////////

import createResize from "./code/resize.js"
createResize()

import createSelection from "./code/script-selection.js"
await createSelection()





// TODO: 
// threading
// sprite rendering
// fix sprite selection
// left click menu + dropdown menu
// textures + sounds + states
// make some visual changes


import spriteListEvents from "./code/sprite-list-events.js"
spriteListEvents()

// selectPlayground("background")


import { saveState, loadState } from "./code/save-load.js"

window.addEventListener("keydown", function(event) {
  if (event.key == "s") {
    saveState("test1")
  }
  if (event.key == "l") {
    loadState("test1")
    
    
    // console.log("test")
    
  }
});

// SEPERATE
const PIXI = require("pixi.js")


let win = document.getElementById("window")



let app = new PIXI.Application({ width: 640, height: 480 });
app.view.style += {"position": "absolute"}
win.appendChild(app.view)

let sprite = PIXI.Sprite.from('../public/generic.png');
app.stage.addChild(sprite);

// Add a ticker callback to move the sprite back and forth
let elapsed = 0.0;
app.ticker.add((delta) => {
  elapsed += delta;
  sprite.x = 0;
});

win.addEventListener("click", (event) => {
  console.log("test")
})
win.addEventListener("resize", (event) => {
  console.log("1234")
  //this.height = this.width * 9 / 16;
}, true)
