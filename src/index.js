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
// sprite rendering
// save button
// add video streaming abillities
// add blocks
import global from "./code/global.js"


import {spriteListEvents, addFile} from "./code/sprite-list-events.js"
spriteListEvents()

// selectPlayground("background")


import { saveState, loadState, resetState } from "./code/save-load.js"

// window.addEventListener("keydown", function(event) {
//   if (event.key == "s") {
//     saveState("test1")
//   }
//   if (event.key == "l") {
//     loadState("test1")
//   }
// });


// SEPERATE
import start from "./code/canvas.js"
let app = start()
global.window.app = app

import resetPlayground from "./code/buttons-handle.js"
resetPlayground()

import "./code/save-load-event.js"

window.addEventListener("click", (event) => {
  global.handle_dropdown()
})

window.addEventListener("drop", (event) => {
  global.handle_dropdown()
})

window.addEventListener("contextmenu", (event) => {
  global.handle_dropdown()
})

addFile("./public/sprite.webp")







