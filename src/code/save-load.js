import createDragspace from "./script-dragspace.js"
import {createSpriteSelection, selectPlayground} from "./create-character.js"
import handle_duplicates from "./handle-duplicates.js"
const { ipcRenderer } = require("electron")
const storage = require("electron-json-storage")


const sd = document.getElementById("script-dragspace")
const path = await ipcRenderer.invoke("homeDir") + "/saves/"

function loadState(savefile) {
    storage.setDataPath(path + savefile)
    savefile = path + savefile
    console.log(savefile)
    storage.get("dragspaces", (error, data) => {
        if (error) throw error;
        console.log(data)
        for(let k in data) {
          sd.insertAdjacentHTML("beforeend", data[k])
          createDragspace(k, true)
          createSpriteSelection(k, k === "background")
        }
        let all_draggable = document.querySelectorAll("#script-dragspace .draggable")
        for(let i of all_draggable) {
          console.log(i)
          handle_duplicates(true, i, true)
        }
        selectPlayground("background")
    })
}

function saveState(savefile) {
    storage.setDataPath(path + savefile)
    let st = {}
    for(let ds of sd.children) {
      st[ds.id.slice(3)] = ds.outerHTML
    }
    
    // console.log("test")
    storage.set("dragspaces", st)
}




export { saveState, loadState }