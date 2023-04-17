const fs = require("fs")
const path = require("path")
const { ipcRenderer } = require("electron")
import global from "./global.js"
import {SpriteMain} from "./sprite-wrap.js"

function createTextureTemplate(name, src) {
    const template = document.createElement("div")
    let container = document.createElement("div")
    let img = document.createElement("img")
    if(src === null) img.src = "../public/new.png"
    else img.src = "data:image/png;base64," + src
    img.draggable = false;
    container.appendChild(img)
    template.appendChild(container)

    let n = document.createElement("p")
    n.innerHTML = name
    template.appendChild(n)
    return template
}

function textureEditorAddImage(editor, _path, _name) {
    fs.readFile(_path, (err, data) => {
        if(err) throw err;
        let id_list = []
        for(let dom of editor.children) {
            id_list.push(dom.lastChild.innerHTML)
        }

        data = data.toString('base64');
        let name = global.getNextName(id_list, path.parse(_path).name)
        let texture = createTextureTemplate(name, data)
        editor.insertBefore(texture, editor.lastChild)
        
        if(_name) new SpriteMain(_name, texture)
    })
}

const texture_container = document.getElementById("editor-textures")

function createTextureEditor(name, exists) {
    let texture_editor, add_new
    if(!exists) {
        texture_editor = document.createElement("div") // (`#script-dragspace > div[name="${name}"]`)
        texture_editor.id = "te_" + name
        texture_container.appendChild(texture_editor)
        texture_editor.classList.add("flexrow")

        add_new = createTextureTemplate("new texture", null)
        texture_editor.append(add_new)
    }
    else {
        texture_editor = document.getElementById("te_" + name)
        add_new = texture_editor.lastChild
    }

    add_new.onclick = async (event) => {
        let path = await ipcRenderer.invoke("showDialog", { name: 'PNG file', extensions: ['png']})
        if(path === null || path.canceled) return;
        textureEditorAddImage(texture_editor, path.filePaths[0])
    }

    texture_editor.addEventListener('dragover', (event)=> {
        event.preventDefault();
        event.stopPropagation();
    })

    texture_editor.addEventListener('drop', (event) => {
        if(event.dataTransfer.files.length === 0) return
        event.preventDefault()
        event.stopPropagation()
        global.handle_dropdown()
        if(event.dataTransfer.files[0].path.toLowerCase().endsWith(".png")) 
            textureEditorAddImage(texture_editor, event.dataTransfer.files[0].path)
        else alert("only PNG files are accepted.")
    })

    return texture_editor;
}

export {createTextureEditor, textureEditorAddImage} 