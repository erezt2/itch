const fs = require("fs")
const path = require("path")
const { ipcRenderer } = require("electron")
import global from "./global.js"
import {SpriteMain} from "./sprite-wrap.js"
import {dropdownTexture} from "./dropdown.js"
const dialog = require('dialogs')()

var dragged_texture = null
function register_dragged_texture(event) {
    dragged_texture = this
}

function createTextureTemplate(name, src) {
    const template = document.createElement("div")
    let container = document.createElement("div")
    let img = document.createElement("img")
    if(src === null) img.src = "../public/new.png"
    else img.src = src
    img.draggable = false;
    container.appendChild(img)
    template.appendChild(container)

    let n = document.createElement("p")
    n.innerHTML = name
    template.appendChild(n)
    template.draggable = true

    template.addEventListener("dragstart", register_dragged_texture)
    template.addEventListener('contextmenu', function(event) {
        dropdownTexture(this, event)
        event.preventDefault();
        event.stopPropagation()
    }, false);

    return template
}

function textureEditorAddImage(editor, _path, _name, img) {
    fs.readFile(_path, (err, data) => {
        if(err) throw err;
        let id_list = []
        for(let dom of editor.children) {
            id_list.push(dom.lastChild.innerHTML)
        }
        let prs = path.parse(_path)
        data = data.toString('base64');
        let name = global.getNextName(id_list, prs.name)
        
        let texture = createTextureTemplate(name,`data:image/${prs.ext.slice(1).toLowerCase()};base64,`+ data)
        editor.insertBefore(texture, editor.lastChild)
        
        if(_name) {
            img.src = texture.firstChild.firstChild.src
            new SpriteMain(_name, texture)
        }
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

    texture_editor.addEventListener('drop', function (event) {
        if(event.dataTransfer.files.length === 0) {
            if(this.children.length <= 1) return
            let rect = this.getBoundingClientRect()
            let x = this.scrollLeft + event.clientX - rect.left
            let y = this.scrollTop + event.clientY - rect.top
            let row = (this.clientWidth-5)/90
            row = Math.floor(row)
            x = (x + 47.5)/90
            x = Math.floor(x)
            if(x>=row) x=row
            else if(x<0) x=0

            y = (y-2.5)/90
            y = Math.floor(y)
            if(y<0) y=0
            let pos = y*row + x
            if(pos > this.children.length-1) pos= this.children.length-1;
            this.insertBefore(dragged_texture,this.children[pos])
            return
        }  
        event.preventDefault()
        event.stopPropagation()
        global.handle_dropdown()

        let non_png = false
        for(let f of event.dataTransfer.files) {
            let path = f.path.toLowerCase()
            if(path.endsWith(".png") || path.endsWith(".jpg") || path.endsWith(".jpeg") || path.endsWith(".webp")) 
                textureEditorAddImage(texture_editor, f.path)
            else non_png = true
        }
        if(non_png) dialog.alert("only PNG, JPG, JPEG and WEBP files are accepted.")
    })

    return texture_editor;
}

export {createTextureEditor, textureEditorAddImage, createTextureTemplate, register_dragged_texture} 