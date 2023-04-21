import global from "./global.js"
import { getNextName, selectPlayground } from "./create-character.js";
import { handle_duplicates } from "./handle-duplicates.js";
import { createSprite } from "./create-character.js";
import { SpriteMain } from "./sprite-wrap.js";
import { createTextureTemplate } from "./texture-editor.js"
import { createAudioTemplate } from "./sound-editor.js";
import { handle_dropped_parent, handle_function_blocks} from "./handle-duplicates.js"

const dialog = require('dialogs')()

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

const texture_dropdown = document.getElementById("texture-dropdown-menu")
function dropdownTexture(self, event) {
    global.handle_dropdown()
    global.open_dropdown = texture_dropdown
    texture_dropdown.style.display = "flex"
    global.dropdown_reference = self
    handle_height(texture_dropdown, event)
}

const sound_dropdown = document.getElementById("sound-dropdown-menu")
function dropdownSound(self, event) {
    global.handle_dropdown()
    global.open_dropdown = sound_dropdown
    sound_dropdown.style.display = "flex"
    global.dropdown_reference = self
    handle_height(sound_dropdown, event)
}

const block_dropdown = document.getElementById("block-dropdown-menu")
function dropdownBlock(self, event) {
    global.handle_dropdown()
    global.open_dropdown = block_dropdown
    block_dropdown.style.display = "flex"
    global.dropdown_reference = self
    handle_height(block_dropdown, event)
}


block_dropdown.children[0].onclick = function(event) {
    global.handle_dropdown()
    event.preventDefault()
    event.stopPropagation()
    
    let dom = global.dropdown_reference.parentNode
    if(dom.dataset["is_function"]) {
        dialog.alert("Can't duplicate functions!")
        return
    }
    let clone = dom.cloneNode(true)
    dom = dom["data-block"].getAncestor().elementHTML
    dom.parentNode.appendChild(clone)
    clone.style.left = (Number(dom.style.left.slice(0,-2)) + 15)+"px"
    clone.style.top = (Number(dom.style.top.slice(0,-2)) + 15)+"px"
    global.resetHash(clone)
    handle_duplicates(true, clone, true)
    let all_draggable = clone.querySelectorAll(".draggable")
    for(let i of all_draggable) {
        global.resetHash(i)
        handle_duplicates(true, i, true)
    }   
}

block_dropdown.children[1].onclick = function(event) {
    global.handle_dropdown()
    event.preventDefault()
    event.stopPropagation()
    
    let dom = global.dropdown_reference.parentNode
    if(handle_function_blocks(dom)) return
    handle_dropped_parent(dom)
    dom.remove()
}

function renameInner(event) {
    global.handle_dropdown()
    event.stopPropagation()
    event.preventDefault()
    let dom = global.dropdown_reference
    let bname = dom.lastChild.innerHTML

    dialog.prompt(`rename texture '${bname}' to:`, name => {
        if(!name) return
        let id_list = []
        for(let c of dom.parentNode.children) {
            id_list.push(c.lastChild.innerHTML)
        }
        name = global.getNextName(id_list, name)
        dom.lastChild.innerHTML = name
    })
}

texture_dropdown.children[0].onclick = renameInner
sound_dropdown.children[0].onclick = renameInner

function duplicateInner(event) {
    global.handle_dropdown()
    event.stopPropagation()
    event.preventDefault()

    let dom = global.dropdown_reference
    let bname = dom.lastChild.innerHTML
    let id_list = []
    for(let c of dom.parentNode.children) {
        id_list.push(c.lastChild.innerHTML)
    }
    let name = global.getNextName(id_list, bname)

    
    let src = dom.firstChild.firstChild.dataset["audio"]
    if(src === undefined) {
        src = dom.firstChild.firstChild.src
        dom.parentNode.insertBefore(createTextureTemplate(name, src), dom.nextSibling) 
    }
    else {
        dom.parentNode.insertBefore(createAudioTemplate(name, src), dom.nextSibling) 
    }
}

texture_dropdown.children[1].onclick = duplicateInner
sound_dropdown.children[1].onclick = duplicateInner

function removeInner(event) {
    global.handle_dropdown()
    event.stopPropagation()
    event.preventDefault()

    let dom = global.dropdown_reference
    
    let src = dom.firstChild.firstChild.dataset["audio"]
    if(dom.parentNode.children.length > 2 || src !== undefined) {
        dom.remove()
    }
}

texture_dropdown.children[2].onclick = removeInner
sound_dropdown.children[2].onclick = removeInner

sprite_dropdown.children[0].onclick = function(event) {
    global.handle_dropdown()
    event.stopPropagation()
    event.preventDefault()
    let dom = global.dropdown_reference
    let bname = dom.lastChild.innerHTML
    
    dialog.prompt(`rename sprite '${bname}' to:`, name => {
        if(!name) return
        name = getNextName(name)
        document.getElementById(`ds_${bname}`).id = `ds_${name}`
        document.getElementById(`ss_${bname}`).id = `ss_${name}`
        document.getElementById(`te_${bname}`).id = `te_${name}`
        document.getElementById(`se_${bname}`).id = `se_${name}`
        dom.lastChild.innerHTML = name
        global.window.sprites[name] = global.window.sprites[bname]
        delete global.window.sprites[bname]
    })
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




export { dropdownSprite, dropdownTexture, dropdownSound, dropdownBlock, handle_height }