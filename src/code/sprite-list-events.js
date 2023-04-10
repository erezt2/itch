
import global from "./global.js"

export default function spriteListEvents() {
    const new_char = document.getElementById("new-character")
    const sprites = document.getElementById("sprites")
    const { ipcRenderer } = require("electron")
    const fs = require("fs")


    sprites.addEventListener('dragover', (event)=> {
        if(Object.keys(global.dragged).length !== 0) return
        event.preventDefault();
        event.stopPropagation();
    })

    function addFile(path) {
        console.log(path)
    }

    sprites.addEventListener('drop', (event) => {
        if(event.dataTransfer.files.length === 0) return
        event.preventDefault()
        event.stopPropagation()
        addFile(event.dataTransfer.files[0].path)
    })

    new_char.onclick = async (event) => {
        let path = await ipcRenderer.invoke("showDialog")
        if(path === null || path.canceled) return;
        addFile(path.filePaths[0])
    }
    
}
