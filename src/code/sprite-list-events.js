
import global from "./global.js"

const new_char = document.getElementById("new-character")
const sprites = document.getElementById("sprites")
const { ipcRenderer } = require("electron")
const fs = require("fs")
const path = require("path")
const dialog = require('dialogs')()

import {selectPlayground, getNextName, createSprite} from "./create-character.js"

function addFile(_path) {
    let name = getNextName(path.parse(_path).name)
    createSprite(name, false, _path)
    selectPlayground(name)
}

function spriteListEvents() {
    sprites.addEventListener('dragover', (event)=> {
        if(Object.keys(global.dragged).length !== 0) return
        event.preventDefault();
        event.stopPropagation();
    })
    

    sprites.addEventListener('drop', (event) => {
        if(event.dataTransfer.files.length === 0) return
        event.preventDefault()
        event.stopPropagation()
        global.handle_dropdown()

        
        let non_png = false
        for(let f of event.dataTransfer.files) {
            let path = f.path.toLowerCase()
            if(path.endsWith(".png") || path.endsWith(".jpg") || path.endsWith(".jpeg") || path.endsWith(".webp")) 
                addFile(f.path)
            else non_png = true
        }
        if(non_png) dialog.alert("only PNG, JPG, JPEG and WEBP files are accepted.")
    })

    new_char.onclick = async (event) => {
        let path = await ipcRenderer.invoke("showDialog", { name: 'PNG file', extensions: ['png']})
        if(path === null || path.canceled) return;
        addFile(path.filePaths[0])
    }
    
}

export {addFile,spriteListEvents}
