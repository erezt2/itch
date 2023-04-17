import {selectPlayground, createSprite} from "./create-character.js"
import {handle_duplicates} from "./handle-duplicates.js"
import my from "./global.js"
import {SpriteMain} from "./sprite-wrap.js"
import createListWrap from "./create-list-wrap.js"
const storage = require("electron-json-storage")

const sd = document.getElementById("script-dragspace")
const te = document.getElementById("editor-textures")
const se = document.getElementById("editor-sounds")
storage.setDataPath(my.path)

function loadState(savefile) {
    storage.get(savefile, (error, data) => {
        if (error) throw error;
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
        }

        let all_draggable = document.querySelectorAll("#script-dragspace .draggable")
        for(let i of all_draggable) {
          handle_duplicates(true, i, true)
        }
        
        selectPlayground("background")
    })
}

function saveState(savefile) {
    let st = {}
    for(let ds of sd.children) {
      let name = ds.id.slice(3)
      st[name] = {}
      st[name].script = ds.outerHTML

      let te = document.getElementById("te_"+name)
      st[name].textures = te.outerHTML

      let se = document.getElementById("se_"+name)
      st[name].sounds = se.outerHTML
    }
    
    // console.log("test")
    storage.set(savefile, st)
}




export { saveState, loadState }