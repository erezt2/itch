import {selectPlayground, createSprite} from "./create-character.js"
import {handle_duplicates} from "./handle-duplicates.js"
import global from "./global.js"
import {SpriteMain} from "./sprite-wrap.js"
import {dropdownTexture, dropdownSound} from "./dropdown.js"
import {register_dragged_texture} from "./texture-editor.js"
import {register_dragged_sound} from "./sound-editor.js"
import resetPlayground from "./buttons-handle.js"
import { createFunctionBlock } from "./script-selection.js"
const storage = require("electron-json-storage")
const dialog = require('dialogs')()

const license = `this is not a real license. this is just to make sure
you are not loading another json. i mean there is a chance that there
is a json out there that has the exact same text as this one, but if there is
its probably because you made one, so it will be your problem. bye loser`

const sd = document.getElementById("script-dragspace")
const te = document.getElementById("editor-textures")
const se = document.getElementById("editor-sounds")
const ss = document.getElementById("sprites")
const sbl = document.getElementById("script-block-list")
storage.setDataPath(global.path)

function resetState() {
  sd.innerHTML = ""
  te.innerHTML = ""
  se.innerHTML = ""
  global.data.variables = {}
  global.data.lists = {}
  while(ss.children.length > 1) {
    ss.firstChild.remove()
  }
  resetPlayground()
  for(let sp in global.window.sprites) {
    global.window.sprites[sp].remove()
    delete global.window.sprites[sp]
  }
  for(let fn of sbl.getElementsByClassName("create-function")) {
    fn.remove()
  }
  global.nextHashID = 1
}

function loadState(savefile) {
    storage.get(savefile, async (error, st) => {
        if (error) throw error;
        if(st.license !== license) {
          dialog.alert("you are loading an incorrect JSON file!")
          return
        }

        resetState()
        let data = st.sprites
        for(let k in data) {
          sd.insertAdjacentHTML("beforeend", data[k].script)
          te.insertAdjacentHTML("beforeend", data[k].textures)
          se.insertAdjacentHTML("beforeend", data[k].sounds)
          createSprite(k, true)
          let texture = document.getElementById(`te_${k}`).firstChild
          new SpriteMain(k ,texture)
        }

        let all_sounds = document.querySelectorAll("#editor-sounds > div > div")
        for(let snd of all_sounds) { 
          let od = snd.firstChild.firstChild.dataset["audio"]
          if (od === undefined) continue
          snd["data-sound"] = new Audio(od)
          snd.onclick = function(event) {
            this["data-sound"].play()
            event.preventDefault();
          }
          snd.addEventListener("dragstart", register_dragged_sound)
          snd.addEventListener('contextmenu', function(event) {
              dropdownSound(this, event)
              event.preventDefault();
              event.stopPropagation()
          }, false);
        }

        let all_draggable = sd.querySelectorAll(".draggable")
        for(let i of all_draggable) {
          handle_duplicates(true, i, true)
        }

        let function_heads = sd.getElementsByClassName("create-function-head")
        let f_list = document.getElementById("function-block-list")
        for(let fh of function_heads) {
          let f_response = fh.dataset["re_response"]
          let f_types = fh.dataset["re_types"]
          let f_fileName = fh.dataset["re_file"]
          let f_button = document.getElementById(fh.dataset["re_button"])
          await createFunctionBlock(f_list, f_button, f_fileName, f_response, f_types, fh.id)
        }

        let all_textures = document.querySelectorAll("#editor-textures > div > div")
        for(let txt of all_textures) {
          txt.addEventListener("dragstart", register_dragged_texture)
          txt.addEventListener('contextmenu', function(event) {
              dropdownTexture(this, event)
              event.preventDefault();
              event.stopPropagation()
          }, false);
        }
        
        global.data = st.data
        selectPlayground()
    })
}

function saveState(savefile) {
    let st = {}
    st.sprites = {}
    for(let ds of sd.children) {
      let name = ds.id.slice(3)
      st.sprites[name] = {}
      st.sprites[name].script = ds.outerHTML

      let te = document.getElementById("te_"+name)
      st.sprites[name].textures = te.outerHTML

      let se = document.getElementById("se_"+name)
      st.sprites[name].sounds = se.outerHTML
    }
    st.license = license
    st.data = global.data
    // console.log("test")
    storage.set(savefile, st, {}, (error) => {
      if(error) dialog.alert(error)
      else global.loaded_file = savefile
    })
}




export { saveState, loadState, resetState }