import createDragspace from "./script-dragspace.js"
import createTextureEditor from "./texture-editor.js"
import createSoundEditor from "./sound-editor.js"

const sprites = document.getElementById("sprites")
const new_char = document.getElementById("new-character")
function createSpriteSelection(name, immutable) {
    const template = document.createElement("div")
    let container = document.createElement("div")
    container.appendChild(document.createElement("img"))
    template.appendChild(container)

    let n = document.createElement("p")
    n.innerHTML = name
    template.appendChild(n)
    template.id = "ss_" + name
    template.onclick = (event) => {
        selectPlayground(name)
    }

    sprites.insertBefore(template, new_char)
    document.addEventListener('contextmenu', function(event) {
        alert("You've tried to open context menu");
        event.preventDefault();
    }, false);

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
        num += 1
        newname = name + num
    }
    return newname
}

function selectPlayground(name) {
    console.log(name)

    document.querySelector("#script-dragspace > .active")?.classList.remove("active");
    document.getElementById(`ds_${name}`).classList.add("active") // dragspace

    document.querySelector("#sprites > .selected")?.classList.remove("selected");
    document.getElementById(`ss_${name}`).classList.add("selected") // sprite selection

    document.querySelector("#editor-textures > .active")?.classList.remove("active");
    document.getElementById(`te_${name}`).classList.add("active") // textures editor

    document.querySelector("#editor-sounds > .active")?.classList.remove("active");
    document.getElementById(`se_${name}`).classList.add("active") // textures editor
}

function createSprite(name, exists, immutable) {
    createSpriteSelection(name, immutable)
    createDragspace(name, exists)
    createTextureEditor(name, exists)
    createSoundEditor(name, exists)
}

export {selectPlayground, getNextName, createSprite}