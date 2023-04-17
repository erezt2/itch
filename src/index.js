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
// left click menu + dropdown menu
// states
// add blocks
import global from "./code/global.js"


import spriteListEvents from "./code/sprite-list-events.js"
spriteListEvents()

// selectPlayground("background")


import { saveState, loadState } from "./code/save-load.js"

const PIXI = require("pixi.js")
window.addEventListener("keydown", function(event) {
  if (event.key == "s") {
    saveState("test1")
  }
  if (event.key == "l") {
    loadState("test1")
  }
  if (event.key == "p") {
    let a = document.querySelector("#editor-textures img")
    
    global.window.app.stage.addChild(PIXI.Sprite.from(a.src))
  }
});


// SEPERATE
import start from "./code/canvas.js"
let app = start()
global.window.app = app

import resetPlayground from "./code/buttons-handle.js"

window.addEventListener("click", (event) => {
  global.handle_dropdown()
})

window.addEventListener("drop", (event) => {
  global.handle_dropdown()
})




// import createThread from "./code/worker-create.js"


if (false){
var y_pos = 0

function createSprite() {
  let sprite = PIXI.Sprite.from('../public/test.png');
  app.stage.addChild(sprite);
  sprite.y = y_pos;
  y_pos += 50
  return sprite
}



async function busySleep(milliseconds) {
  const start = new Date().getTime();
  while (new Date().getTime() - start < milliseconds);
}
// function sleep(ms, callback) {
//   setTimeout(callback, ms);
// }

// function test() {
//   const {thread, promise} = createThread("hello", null)
//   promise.then((data) => {console.log(data)})
//   sleep(2000, ()=>thread.terminate())
  
// }

// test()


class Key {
  canceled = false
  cancel() {
      this.canceled = true
  }
  isCanceled() {
      return this.canceled
  }
}

function sleep(t) {
  return new Promise((resolve) =>
      setTimeout(() => resolve({ status: 'done' }), t)
  )
}

async function DoSin(off) {
  return 240 + 230 * Math.sin((new Date().getTime() - off) / 6248)
}

async function test(s, k) {
  let off = new Date().getTime()
  while (true) {
    if(k.canceled) {
      console.log("stopped")
      return
    }
    let pos = await DoSin(off)
    s.x = pos
  }

}



async function runFunc(s,k) {
  // simulate a long running operation
  await test(s,k)
  return "func completed";
}

let runningPromises = [];

let k = new Key()
document.addEventListener("keydown", event => {
  if (event.key === "k") {
    for(let i=0; i<5; i++) {
      let s = createSprite()
      const promise = runFunc(s, k);
      runningPromises.push(promise);
    }
    Promise.all(runningPromises).then(results => {
      console.log("All promises settled");
      console.log(results);
      // update the DOM here
    });
  }
  
  if (event.key === "j") {
    let s = createSprite()
    const promise = runFunc(s, k);
    runningPromises.push(promise);
  }
  if (event.key == "s") {
   k.cancel()
  }
});

}


// await ipcRenderer.invoke("runThread", "hello", "test")
