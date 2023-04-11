import global from "./global.js"

function handle_dropped_parent(dom) {
    let p = dom.parentNode
    if(p.classList.contains("editable")) p.contentEditable = true;
}

async function drop_in_block(event) {
    this.classList.remove("dropzone-dragenter")
    let my = Object.assign({}, global.dragged);
    if(my.target.dataset["type"] !== "void") return
    if(my.target.contains(this)) return;
    if(Object.keys(my).length === 0) return;
    global.dragged = {}
    event.stopPropagation();
    event.preventDefault();
    
    let target = await handle_duplicates(my.duplicate, my.target, false)
    handle_dropped_parent(my.target)
    this.parentNode.appendChild(target);
    target.style.left = "0px"
    target.style.top = "100%"
    
}

async function drop_in_input(event) {
    this.classList.remove("dropzone-dragenter")
    let my = Object.assign({}, global.dragged);
    if(my.target.contains(this)) return;
    if(my.target.dataset["type"] === "void") return
    if(Object.keys(my).length === 0) return;
    if(this.children.length > 0) return
    global.dragged = {}
    event.stopPropagation();
    event.preventDefault();
    let target = await handle_duplicates(my.duplicate, my.target, false)
    this.innerHTML = "" 

    handle_dropped_parent(my.target)
    this.appendChild(target);
    this.contentEditable = false;
    target.style.left = "0px"
    target.style.top = "0px"
    
}

export default async function handle_duplicates(dup, dragged, exists) { // duplication handle (first drag over)
    if(!dup) return dragged;
    let clone
    if(!exists) {
        clone = dragged.cloneNode(true)

        clone.removeEventListener("dragstart", global.register_dragged_dup)
        clone.dataset["type"] = dragged.dataset["type"]
        clone.dataset["path"] = dragged.dataset["path"]
    }
    else {
        clone = dragged
    }
    
    clone.addEventListener("dragstart", global.register_dragged)

    // clone.classList.add("draggable")
    
    let block_class = (await import(dragged.dataset["path"])).default
    console.log(block_class)
    clone["data-block"] = new block_class(clone)

    let is_container = dragged.classList.contains("block-container")
    if(is_container) {
        let inside = clone.children[1] 
        inside.dataset["block"] = clone.dataset["block"]
        
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

    clone.onclick = (event) => {
        event.stopPropagation()
        event.preventDefault()
        clone["data-block"].getAncestor().run({local_variables: {}})
    }
    
    for(let box of clone["data-block"].inputs) {
        box.addEventListener("drop", drop_in_input);
        box.addEventListener("dragenter", (event) => {
            box.classList.add("dropzone-dragenter")
        })
        box.addEventListener("dragleave", (event) => {
            box.classList.remove("dropzone-dragenter")
        })
        box.onclick = (event) => {
            event.stopPropagation()
            if(box.children.length === 0) box.contentEditable = true;
        }
    }
    console.log(clone)
    return clone
}