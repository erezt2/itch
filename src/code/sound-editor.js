const fs = require("fs")
const path = require("path")
const { ipcRenderer } = require("electron")
import global from "./global.js"
import {sound_click} from "./handle-sounds.js"
import {dropdownSound} from "./dropdown.js"
const dialog = require('dialogs')()

var dragged_sound = null
function register_dragged_sound(event) {
    dragged_sound = this
}

function createAudioTemplate(name, src) {
    const template = document.createElement("div")
    let container = document.createElement("div")
    let img = document.createElement("img")
    if(src === null) img.src = "../public/new.png"
    else {
        img.src = "../public/audio.png"
        img.dataset["audio"] = src
        template["data-sound"] = new Audio(img.dataset["audio"])
        template.onclick = function(event) {
            this["data-sound"].play()
            event.preventDefault();
        }
    } 
    img.draggable = false;
    container.appendChild(img)
    template.appendChild(container)

    let n = document.createElement("p")
    n.innerHTML = name
    template.appendChild(n)
    template.draggable = true

    template.addEventListener("dragstart", register_dragged_sound)
    template.addEventListener('contextmenu', function(event) {
        dropdownSound(this, event)
        event.preventDefault();
        event.stopPropagation()
    }, false);

    return template
}

function soundEditorAddAudio(editor, _path) {
    fs.readFile(_path, (err, data) => {
        if(err) throw err;
        let id_list = []
        for(let dom of editor.children) {
            id_list.push(dom.lastChild.innerHTML)
        }

        data = data.toString('base64');
        let prs = path.parse(_path)
        let name = global.getNextName(id_list, prs.name)
        let texture = createAudioTemplate(name, `data:audio/${prs.ext.slice(1).toLowerCase()};base64,` + data)
        editor.insertBefore(texture, editor.lastChild)
    })
}


const sound_container = document.getElementById("editor-sounds")
function createSoundEditor(name, exists) {
    let sound_editor, add_new
    if(!exists) {
        sound_editor = document.createElement("div") // (`#script-dragspace > div[name="${name}"]`)
        sound_editor.id = "se_" + name
        sound_container.appendChild(sound_editor)
        sound_editor.classList.add("flexrow")

        add_new = createAudioTemplate("new sound", null)
        sound_editor.append(add_new)
    }
    else {
        sound_editor = document.getElementById("se_" + name)
        add_new = sound_editor.lastChild
    }

    add_new.onclick = async (event) => {
        let path = await ipcRenderer.invoke("showDialog", { name: 'Audio file', extensions: ['mp3', 'wav']})
        if(path === null || path.canceled) return;
        soundEditorAddAudio(sound_editor, path.filePaths[0])
    }

    sound_editor.addEventListener('dragover', (event)=> {
        event.preventDefault();
        event.stopPropagation();
    })

    sound_editor.addEventListener('drop', function(event) {
        if(event.dataTransfer.files.length === 0) {
            if(this.children.length <= 1) return
            let rect = this.getBoundingClientRect()
            let x = this.scrollLeft + event.clientX - rect.left
            let y = this.scrollTop + event.clientY - rect.top
            let row = (this.clientWidth-5)/90
            row = Math.floor(row)
            x = (x + 47.5)/90
            x = Math.floor(x) // literally the same code word for word
            console.log(row)
            if(x>=row) x=row
            else if(x<0) x=0

            y = (y-2.5)/90
            y = Math.floor(y)
            if(y<0) y=0
            let pos = y*row + x
            if(pos > this.children.length-1) pos= this.children.length-1;
            this.insertBefore(dragged_sound,this.children[pos])
            return
        }
        event.preventDefault()
        event.stopPropagation()

        let non_png = false
        for(let f of event.dataTransfer.files) {
            let _path = f.path.toLowerCase()
            if(_path.endsWith(".mp3") || _path.endsWith(".wav")) 
                soundEditorAddAudio(sound_editor, f.path)
            else non_png = true
        }
        if(non_png) dialog.alert("only MP3 or WAV files are accepted.", ok => {})
    })
}

export {createAudioTemplate,createSoundEditor, register_dragged_sound}
// this entire file is just a duplicate im sorry i just couldnt bother making a generic function