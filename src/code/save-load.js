import {selectPlayground, createSprite} from "./create-character.js"
import handle_duplicates from "./handle-duplicates.js"
import my from "./global.js"
const storage = require("electron-json-storage")

const sd = document.getElementById("script-dragspace")
const te = document.getElementById("editor-textures")

function loadState(savefile) {
    storage.setDataPath(my.path + savefile)
    storage.get("dragspaces", (error, data) => {
        if (error) throw error;
        for(let k in data) {
          sd.insertAdjacentHTML("beforeend", data[k].script)
          te.insertAdjacentHTML("beforeend", data[k].textures)
          createSprite(k, true, k=="background")
        }
        let all_draggable = document.querySelectorAll("#script-dragspace .draggable")
        for(let i of all_draggable) {
          handle_duplicates(true, i, true)
        }
        selectPlayground("background")
    })
}

function saveState(savefile) {
    storage.setDataPath(my.path + savefile)
    let st = {}
    for(let ds of sd.children) {
      let name = ds.id.slice(3)
      st[name] = {}
      st[name].script = ds.outerHTML

      let te = document.getElementById("te_"+name)
      st[name].textures = te.outerHTML
    }
    
    // console.log("test")
    storage.set("dragspaces", st)
}




export { saveState, loadState }