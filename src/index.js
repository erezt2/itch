// navbar
import createNavbar from "./code/navbar.js"
createNavbar()
// end

// script selection
/*
[state -> state table] deprecated
network -> sockets wrappers / web access
controls -> events + loops, if else, sprite signaling etc
texture+ audio=hatpic -> exactly like it looks/ sounds
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

import {createSelection} from "./code/script-selection.js"
await createSelection()





// TODO:
// sprite rendering
// sensor + audio + textures + (last part of controls) + network
// add blocks
import global from "./code/global.js"


import {spriteListEvents, addFile} from "./code/sprite-list-events.js"
spriteListEvents()

// selectPlayground("background")

import start from "./code/canvas.js"
let app = start()
global.window.app = app

import User from "./code/user.js"
global.mainUser = new User()

import { saveState, loadState, resetState } from "./code/save-load.js"

const body = document.getElementsByTagName("body")[0]
document.addEventListener("keydown", function(event) {
  if(document.activeElement !== body || 
    document.getElementsByClassName("dialog-widget").length > 0) 
    return;
  console.log(event.key)
});

const can = document.querySelector("#window > canvas")
const rect = can.getBoundingClientRect()
window.addEventListener("mousemove", (event) => {
    global.mainUser.mouse_pos = { 
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
})


// SEPERATE


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







