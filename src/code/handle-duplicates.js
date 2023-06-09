import global from "./global.js"
import createListWrap from "./create-list-wrap.js"
import { dropdownBlock } from "./dropdown.js";

function handle_dropped_parent(dom, check_parent) {
    blockChangeStop(dom, check_parent)
    let p = dom.parentNode
    if(p.classList.contains("editable")) p.contentEditable = true;
    return true
}

function blockChangeStop(dom, check_parent) {
    if(!("data-block" in dom)) return
    if(check_parent && dom["data-block"].getParent() === null)return
    let first = dom["data-block"].getAncestor()
    let name = first.elementHTML.parentNode.id.slice(3)
    global.window.sprites[name].stopSingularAllClones(first)
}

async function drop_in_block(event) {
    this.classList.remove("dropzone-dragenter")
    let my = Object.assign({}, global.dragged);
    if(Object.keys(my).length === 0) return;
    if(my.target.dataset["type"] !== "void") return
    if(my.target.dataset["preventDrop"] === "true") return;
    if(my.target.contains(this)) return;

    global.dragged = {}
    event.stopPropagation();
    global.handle_dropdown()
    event.preventDefault();
    
    let target = await handle_duplicates(my.duplicate, my.target, false)
    handle_dropped_parent(my.target)
    blockChangeStop(this.parentNode)
    this.parentNode.appendChild(target);
    target.style.left = "0px"
    if(this.parentNode.classList.contains("draggable")) target.style.top = "100%"
    else target.style.top = "0px"
    
}

async function drop_in_input(event) {
    this.classList.remove("dropzone-dragenter")
    let my = Object.assign({}, global.dragged);
    if(Object.keys(my).length === 0) return;
    if(this.children.length > 0) return
    if(my.target.contains(this)) return;
    if(my.target.dataset["type"] === "void") return
    if(my.target.dataset["preventDrop"] === "true") return
    
    global.dragged = {}
    event.stopPropagation();
    global.handle_dropdown()
    event.preventDefault();
    let target = await handle_duplicates(my.duplicate, my.target, false)
    this.innerHTML = "" 

    handle_dropped_parent(my.target)
    blockChangeStop(this.parentNode)
    this.appendChild(target);
    this.contentEditable = false;
    target.style.left = "0px"
    target.style.top = "0px"
    
}

async function handle_duplicates(dup, dragged, exists) { // duplication handle (first drag over)
    if(!dup) return dragged;
    let clone
    if(!exists) {
        clone = dragged.cloneNode(true)

        clone.removeEventListener("dragstart", global.register_dragged_dup)
        clone.dataset["type"] = dragged.dataset["type"]
        clone.dataset["path"] = dragged.dataset["path"]
        clone.dataset["preventDrop"] = dragged.dataset["preventDrop"]
        if(dragged.dataset["func_inputs"] !== undefined)
            clone.dataset["func_inputs"] = dragged.dataset["func_inputs"];
        if(dragged.dataset["func_id"] !== undefined)
            clone.dataset["func_id"] = dragged.dataset["func_id"];
    }
    else {
        clone = dragged
        clone.classList.remove("running")
    }
    global.hashDOM(clone)
    clone.addEventListener("dragstart", global.register_dragged)
    clone.addEventListener("dragend", global.stop_drag)

    // clone.classList.add("draggable")
    
    let block_class = (await import(dragged.dataset["path"])).default
    if(dragged.dataset["func_id"] === undefined)
        clone["data-block"] = new block_class(clone)
    else {
        let inputs = clone.dataset["func_inputs"].split("|")
        let _inputs = []
        if(clone.dataset["func_inputs"])for(let _in of inputs) {
            let _func;
            if(_in === "[number]") {
                _func = val => Number(val) || 0
            }
            else if (_in === "[boolean]") {
                _func = Boolean
            }
            else if (_in === "[string]") {
                _func = String
            }
            else {
                _func = val=>val
            }
            _inputs.push(_func)
        }
        let function_block = document.getElementById(clone.dataset["func_id"])
        clone["data-block"] = new block_class(clone, function_block, _inputs)
    }

    let is_container = dragged.classList.contains("block-container")
    if(is_container) {
        let inside = clone.children[1] 
        inside["data-block"] = clone["data-block"]
        
        let area_in
        if (exists) {
            area_in = inside.children[0]
        }
        else {
            area_in = document.createElement("div")
            inside.appendChild(area_in)
        }
        
        area_in.classList.add("dropzone")
        area_in.addEventListener("drop", drop_in_block);
        area_in.addEventListener("dragenter", (event) => {
            area_in.classList.add("dropzone-dragenter")
        })
        area_in.addEventListener("dragleave", (event) => {
            area_in.classList.remove("dropzone-dragenter")
        })
    }

    if(dragged.dataset["type"] === "void") {
        let area_low
        if(exists) {
            if(is_container) {
                area_low = clone.children[2]
            }
            else {
                area_low = clone.children[1]
            }
        }
        else {
            area_low = document.createElement("div")
            clone.appendChild(area_low)
        }
        
        
        area_low.classList.add("dropzone")
        area_low.addEventListener("drop", drop_in_block);
        area_low.addEventListener("dragenter", (event) => {
            area_low.classList.add("dropzone-dragenter")
        })
        area_low.addEventListener("dragleave", (event) => {
            area_low.classList.remove("dropzone-dragenter")
        })
    }

    clone.firstChild.onclick = async function(event) {
        event.stopPropagation()
        global.handle_dropdown()
        event.preventDefault()
    
        let first = clone["data-block"].getAncestor()

        let name = first.elementHTML.parentNode.id.slice(3)

        if (first.elementHTML.classList.contains("running")) {
            global.window.sprites[name].stopSingular(first)
        }
        else{
            first.elementHTML.classList.add("running")
            global.window.sprites[name].runSingular(first)
        }
        // createThread("run block", {obj: .id, input: })
    }
    clone.firstChild.addEventListener('contextmenu', function(event) {
        dropdownBlock(this, event)
        event.preventDefault();
        event.stopPropagation()
    }, false);
    
    let i=-1;
    for(let box of clone["data-block"].inputs) {
        i += 1;
        if(box.classList.contains("selectable")) {
            createListWrap(block_class.input_types[i], box)
            continue
        }
        box.addEventListener("drop", drop_in_input);
        box.addEventListener("dragenter", (event) => {
            box.classList.add("dropzone-dragenter")
        })
        box.addEventListener("dragleave", (event) => {
            box.classList.remove("dropzone-dragenter")
        })
        box.onpaste = (event) => false
        box.addEventListener("keydown", (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        })
        box.onclick = (event) => {
            event.stopPropagation()
            global.handle_dropdown()
            if(box.children.length === 0) box.contentEditable = true;
        }
    }

    return clone
}

const dialog = require('dialogs')()
const sd = document.getElementById("script-dragspace")
const sbl = document.getElementById("script-block-list")
function handle_function_blocks(dom){
    if(dom.dataset["is_function"]) {
        if(sd.querySelectorAll(`.create-function[data-func_id="${dom.id}"]`).length > 0) {
            dialog.alert("You should delete all of the function's blocks before attempting to delete it!")
            return true
        }
        sbl.querySelector(`.create-function[data-func_id="${dom.id}"]`).remove()
    }
    return false
}

export {handle_duplicates, handle_dropped_parent, handle_function_blocks}