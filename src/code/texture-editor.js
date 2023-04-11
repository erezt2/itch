const fs = require("fs")
const path = require("path")
const { ipcRenderer } = require("electron")

function createTextureTemplate(name, src, path) {
    const template = document.createElement("div")
    let container = document.createElement("div")
    let img = document.createElement("img")
    if(path) img.src = src // "../public/new.png"
    else img.src = "data:image/png;base64," + src
    container.appendChild(img)
    template.appendChild(container)

    let n = document.createElement("p")
    n.innerHTML = name
    template.appendChild(n)
    return template
}

function getNextName(editor, name) {
    let id_list = []
    for(let dom of editor.children) {
        id_list.push(dom.lastChild.innerHTML)
    }
    console.log(id_list)
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

function textureEditorAddImage(editor, _path) {
    console.log("test")
    fs.readFile(_path, (err, data) => {
        if(err) throw err;
        data = data.toString('base64');
        let name = getNextName(editor, path.parse(_path).name)
        let texture = createTextureTemplate(name, data, false)
        editor.insertBefore(texture, editor.lastChild)
    })
}

const texture_container = document.getElementById("editor-textures")
export default function createTextureEditor(name, exists) {
    let texture_editor, add_new
    if(!exists) {
        texture_editor = document.createElement("div") // (`#script-dragspace > div[name="${name}"]`)
        texture_editor.id = "te_" + name
        texture_container.appendChild(texture_editor)
        texture_editor.classList.add("flexrow")

        add_new = createTextureTemplate("new texture", "../public/new.png", true)
        texture_editor.append(add_new)
    }
    else {
        texture_editor = document.getElementById("te_" + name)
        add_new = texture_editor.lastChild
    }

    add_new.onclick = async (event) => {
        let path = await ipcRenderer.invoke("showDialog")
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
        if(event.dataTransfer.files[0].path.endsWith(".png")) 
            textureEditorAddImage(texture_editor, event.dataTransfer.files[0].path)
        else alert("only PNG files are accepted.")
    })

    
}