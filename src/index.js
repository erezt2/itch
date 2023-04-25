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
let _app = start()
global.window.app = _app

import {User} from "./code/user.js"
global.mainUser = new User()

import { saveState, loadState, resetState } from "./code/save-load.js"

const body = document.getElementsByTagName("body")[0]
document.addEventListener("keydown", function(event) {
  if(document.activeElement !== body || 
    document.getElementsByClassName("dialog-widget").length > 0) 
    return;
  global.mainUser.key_down(event.key)
});

document.addEventListener("keyup", function(event) {
  global.mainUser.key_up(event.key)
});

document.addEventListener("mousedown", function(event) {
  if(event.button === 0) global.mainUser.mouse_down()
}) 

document.addEventListener("mouseup", function(event) {
  if(event.button === 0) global.mainUser.mouse_up()
}) 

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

import startServer from "./code/connection.js"
startServer()

// const {ExpressPeerServer}= require("peer")
// const app = rqeuire("express")()


// const server = require("http").createServer(app);
// const peerServer = ExpressPeerServer(server, {debug: true})

// app.use("/peerjs", peerServer)

// const PORT = 20022
// server.listen(PORT, ()=>console.log("server running!"))


// const video = document.createElement('video');
// document.getElementsByTagName("body")[0].appendChild(video)
// video.srcObject = stream;
// video.autoplay = true
// video.controls = true
// video.width = global.window.width
// video.height = global.window.height


