import global from "./global.js"

function handle_dropped_parent(dom) {
    let p = dom.parentNode
    if(p.classList.contains("editable")) p.contentEditable = true;
}

function drop_in_block(event) {
    this.classList.remove("dropzone-dragenter")
    let my = Object.assign({}, global.dragged);
    if(my.target["data-type"] !== "void") return
    if(my.target.contains(this)) return;
    if(Object.keys(my).length === 0) return;
    global.dragged = {}
    
    event.preventDefault();
    
    let target = handle_duplicates(my.duplicate, my.target)
    handle_dropped_parent(my.target)
    this.parentNode.appendChild(target);
    target.style.left = "0px"
    target.style.top = "100%"
    event.stopPropagation();
}

function drop_in_input(event) {
    this.classList.remove("dropzone-dragenter")
    let my = Object.assign({}, global.dragged);
    if(my.target.contains(this)) return;
    if(my.target["data-type"] === "void") return
    if(Object.keys(my).length === 0) return;
    global.dragged = {}

    event.preventDefault();
    if(this.children.length > 0) return
    let target = handle_duplicates(my.duplicate, my.target)
    this.innerHTML = ""

    handle_dropped_parent(my.target)
    this.appendChild(target);
    this.contentEditable = false;
    target.style.left = "0px"
    target.style.top = "0px"
    event.stopPropagation();
}

export default function handle_duplicates(dup, dragged) { // duplication handle (first drag over)
    if(!dup) return dragged;
    let clone = dragged.cloneNode(true)

    clone.removeEventListener("dragstart", global.register_dragged_dup)
    clone.addEventListener("dragstart", global.register_dragged)

    // clone.classList.add("draggable")
    clone["data-type"] = dragged["data-type"]
    if(dragged["data-type"] === "void") {
        let area_low = document.createElement("div")
        clone.appendChild(area_low)
        
        area_low.classList.add("dropzone")
        area_low.addEventListener("drop", drop_in_block);
        area_low.addEventListener("dragenter", (event) => {
            area_low.classList.add("dropzone-dragenter")
        })
        area_low.addEventListener("dragleave", (event) => {
            area_low.classList.remove("dropzone-dragenter")
        })
    }

    clone["data-block"] = new dragged["data-class"](clone)
    clone.onclick = (event) => {
        event.stopPropagation()
        event.preventDefault()
        clone["data-block"].getAncestor().run()
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
    return clone
}