import createDragspace from "./script-dragspace.js"
import {createTextureEditor, textureEditorAddImage} from "./texture-editor.js"
import {createSoundEditor} from "./sound-editor.js"
import global from "./global.js"
import {dropdownSprite} from "./dropdown.js"

const sprites = document.getElementById("sprites")
const new_char = document.getElementById("new-character")
function createSpriteSelection(name) {
    const template = document.createElement("div")
    let container = document.createElement("div")
    let img = document.createElement("img")
    container.appendChild(img)
    img.draggable = false
    template.appendChild(container)

    let n = document.createElement("p")
    n.innerHTML = name
    template.appendChild(n)
    template.id = "ss_" + name
    template.onclick = function(event) {
        selectPlayground(this.lastChild.innerHTML)
    }

    sprites.insertBefore(template, new_char)
    template.addEventListener('contextmenu', function(event) {
        dropdownSprite(this, event)
        event.preventDefault();
        event.stopPropagation()
    }, false);
    return img
}

function getNextName(name) {
    let id_list = []
    document.querySelectorAll("#script-dragspace > div").forEach((dom) => id_list.push(dom.id.slice(3)))
    if (!id_list.includes(name)) return name;
    let num = name.match(/\d*$/)[0]
    name = name.slice(0, name.length - num.length)
    if(num === "") num=0
    else num = parseInt(num) 
    num += 1
    let newname = name + num
    while(id_list.includes(newname)) {
        if(num > 200000000) num = 0
        num += 1
        newname = name + num
    }
    return newname
}

function selectPlayground(name) {
    if(name === undefined) {
        name = Object.keys(global.window.sprites)[0]
    }

    document.querySelector("#script-dragspace > .active")?.classList.remove("active");
    document.getElementById(`ds_${name}`).classList.add("active") // dragspace

    document.querySelector("#sprites > .selected")?.classList.remove("selected");
    document.getElementById(`ss_${name}`).classList.add("selected") // sprite selection

    document.querySelector("#editor-textures > .active")?.classList.remove("active");
    document.getElementById(`te_${name}`).classList.add("active") // textures editor

    document.querySelector("#editor-sounds > .active")?.classList.remove("active");
    document.getElementById(`se_${name}`).classList.add("active") // textures editor
    global.selected_sprite = name
}

function createSprite(name, exists, path) {
    let img = createSpriteSelection(name)
    createDragspace(name, exists)
    let editor = createTextureEditor(name, exists)
    createSoundEditor(name, exists)
    if (path) {
        textureEditorAddImage(editor, path, name, img)
    }
    else {
        img.src = editor.firstChild.firstChild.firstChild.src
    }
}

export {selectPlayground, getNextName, createSprite}