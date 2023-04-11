const fs = require("fs")
const path = require("path")
const { ipcRenderer } = require("electron")
import global from "./global.js"

function createAudioTemplate(name, src, ext) {
    const template = document.createElement("div")
    let container = document.createElement("div")
    let img = document.createElement("img")
    if(src === null) img.src = "../public/new.png"
    else {
        img.src = "../public/audio.png"
        img.dataset["audio"] = `data:audio/${ext.toLowerCase()};base64,` + src
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
        let texture = createAudioTemplate(name, data, prs.ext.slice(1))
        editor.insertBefore(texture, editor.lastChild)
    })
}


const sound_container = document.getElementById("editor-sounds")
export default function createSoundEditor(name, exists) {
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
        let path = await ipcRenderer.invoke("showDialog", { name: 'Audio file', extensions: ['mp3', 'wav', 'm4a']})
        if(path === null || path.canceled) return;
        soundEditorAddAudio(sound_editor, path.filePaths[0])
    }

    sound_editor.addEventListener('dragover', (event)=> {
        event.preventDefault();
        event.stopPropagation();
    })

    sound_editor.addEventListener('drop', (event) => {
        if(event.dataTransfer.files.length === 0) return
        event.preventDefault()
        event.stopPropagation()
        let _path = event.dataTransfer.files[0].path.toLowerCase()
        if(_path.endsWith(".mp3") || _path.endsWith(".wav") || _path.endsWith(".m4a")) 
            soundEditorAddAudio(sound_editor, event.dataTransfer.files[0].path)
        else alert("only MP3, WAV or M4a files are accepted.")
    })
}