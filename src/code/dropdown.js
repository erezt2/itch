import global from "./global.js"
import { getNextName, selectPlayground } from "./create-character.js";
import { handle_duplicates } from "./handle-duplicates.js";
import { createSprite } from "./create-character.js";
import { SpriteMain } from "./sprite-wrap.js";
const { ipcRenderer } = require("electron");

function handle_height(dom, event) {
    dom.style.left = event.clientX + "px"
    dom.style.top = event.clientY + "px"
    dom.style.left = Math.min(window.innerWidth - dom.offsetWidth - 10, event.clientX) + "px"
    dom.style.top =  Math.min(window.innerHeight - dom.offsetHeight - 10, event.clientY) + "px"
}

const sprite_dropdown = document.getElementById("sprite-dropdown-menu")
const sprites = document.getElementById("sprites")
function dropdownSprite(self, event) {
    global.handle_dropdown()
    global.open_dropdown = sprite_dropdown
    sprite_dropdown.style.display = "flex"
    global.dropdown_reference = self
    handle_height(sprite_dropdown, event)
}

sprite_dropdown.children[0].onclick = async function(event) {
    console.log(123)
    global.handle_dropdown()
    event.stopPropagation()
    event.preventDefault()
    let dom = global.dropdown_reference
    let bname = dom.lastChild.innerHTML
    

    let name = getNextName(await ipcRenderer.invoke("promptRename", bname))
    if(name === null || name.length === 0) return
    document.getElementById(`ds_${bname}`).id = `ds_${name}`
    document.getElementById(`ss_${bname}`).id = `ss_${name}`
    document.getElementById(`te_${bname}`).id = `te_${name}`
    document.getElementById(`se_${bname}`).id = `se_${name}`
    dom.lastChild.innerHTML = name
    global.window.sprites[name] = global.window.sprites[bname]
    delete global.window.sprites[bname]
}

sprite_dropdown.children[1].onclick = async function(event) {
    global.handle_dropdown()
    event.stopPropagation()
    event.preventDefault()

    let dom = global.dropdown_reference
    let bname = dom.lastChild.innerHTML
    let name = getNextName(bname)

    let ds = document.getElementById(`ds_${bname}`)
    let dsc = ds.cloneNode(true)
    dsc.id = `ds_${name}`
    ds.parentNode.appendChild(dsc)

    // let ss = document.getElementById(`ss_${bname}`)
    // let ssc = ss.cloneNode(true)
    // ssc.id = `ss_${name}`
    // ss.parentNode.appendChild(ssc)
    // ssc.lastChild.innerHTML = name

    let te = document.getElementById(`te_${bname}`)
    let tec = te.cloneNode(true)
    tec.id = `te_${name}`
    te.parentNode.appendChild(tec)

    let se = document.getElementById(`se_${bname}`)
    let sec = se.cloneNode(true)
    sec.id = `se_${name}`
    se.parentNode.appendChild(sec)


    createSprite(name, true)
    let texture = te.firstChild
    new SpriteMain(name ,texture)

    let all_sounds = sec.querySelectorAll("#editor-sounds > div > div")
    for(let snd of all_sounds) { 
        let od = snd.firstChild.firstChild.dataset["audio"]
        if (od === undefined) continue
        snd["data-sound"] = new Audio(od)
        snd.onclick = function(event) {
            this["data-sound"].play()
            event.preventDefault();
        }
    }

    let all_draggable = dsc.querySelectorAll(".draggable")
    console.log(all_draggable)
    for(let i of all_draggable) {
        global.resetHash(i)
        handle_duplicates(true, i, true)
    }
    
    selectPlayground(name)
}

sprite_dropdown.children[2].onclick = async function(event) {
    global.handle_dropdown()
    event.stopPropagation()
    event.preventDefault()

    if(sprites.children.length <= 2) return

    let dom = global.dropdown_reference
    let bname = dom.lastChild.innerHTML
    
    document.getElementById(`ds_${bname}`).remove()
    document.getElementById(`ss_${bname}`).remove()
    document.getElementById(`te_${bname}`).remove()
    document.getElementById(`se_${bname}`).remove()
    global.window.sprites[bname].remove()
    selectPlayground()
}




export { dropdownSprite }