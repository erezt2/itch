
import global from "./global.js"

const new_char = document.getElementById("new-character")
const sprites = document.getElementById("sprites")
const { ipcRenderer } = require("electron")
const fs = require("fs")
const path = require("path")
import {selectPlayground, getNextName, createSprite} from "./create-character.js"


export default function spriteListEvents() {
    sprites.addEventListener('dragover', (event)=> {
        if(Object.keys(global.dragged).length !== 0) return
        event.preventDefault();
        event.stopPropagation();
    })

    function addFile(_path) {
        let name = getNextName(path.parse(_path).name)
        createSprite(name, false, false, _path)
        selectPlayground(name)
    }

    sprites.addEventListener('drop', (event) => {
        if(event.dataTransfer.files.length === 0) return
        event.preventDefault()
        event.stopPropagation()
        if(event.dataTransfer.files[0].path.endsWith(".png")) addFile(event.dataTransfer.files[0].path)
        else alert("only PNG files are accepted.")
    })

    new_char.onclick = async (event) => {
        let path = await ipcRenderer.invoke("showDialog", { name: 'PNG file', extensions: ['png']})
        if(path === null || path.canceled) return;
        addFile(path.filePaths[0])
    }
    
}
