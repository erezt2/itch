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
  }
});

// SEPERATE
import start from "./code/canvas.js"
start()

import createThread from "./code/worker-create.js"




function sleep(ms, callback) {
  setTimeout(callback, ms);
}




function test() {
  const {thread, promise} = createThread("hello", null)
  promise.then((data) => {console.log(data)})
  sleep(2000, ()=>thread.terminate())
  
}

test()


// await ipcRenderer.invoke("runThread", "hello", "test")
