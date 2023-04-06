import my from "./script-selection.js";

export default function createBlocks(){
    function hasChildren(dom) {
        return dom.children.length > 0
    }

    function handle_duplicates(dup, dragged) { // duplication handle (first drag over)
        if(!dup) return dragged;
        let clone = dragged.cloneNode(true)

        clone.removeEventListener("dragstart", my.register_dragged_dup)
        clone.addEventListener("dragstart", my.register_dragged)

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
                if(!hasChildren(box)) box.contentEditable = true;
            }
        }
        return clone
    }
    
    function handle_dropped_parent(dom) {
        let p = dom.parentNode
        if(p.classList.contains("editable")) p.contentEditable = true;
    }

    function drop_in_input(event) {
        this.classList.remove("dropzone-dragenter")
        event.preventDefault();
        event.stopPropagation();
        if(my.dragged.target["data-type"] === "void") return
        if(hasChildren(this)) return
        let target = handle_duplicates(my.dragged.duplicate, my.dragged.target)
        this.innerHTML = ""

        handle_dropped_parent(my.dragged.target)
        this.appendChild(target);
        this.contentEditable = false;
        target.style.left = "0px"
        target.style.top = "0px"
    }

    function drop_in_block(event) {
        this.classList.remove("dropzone-dragenter")
        event.preventDefault();
        event.stopPropagation();
        if(my.dragged.target["data-type"] !== "void") return
        let target = handle_duplicates(my.dragged.duplicate, my.dragged.target)

        handle_dropped_parent(my.dragged.target)
        this.parentNode.appendChild(target);
        target.style.left = "0px"
        target.style.top = "100%"
    }


    my.block_playground.addEventListener("dragenter", (event) => { // dragspace event listeners
        my.block_playground.classList.add("dragspace-dragenter")
    })
    my.block_playground.addEventListener("dragleave", (event) => {
    my.block_playground.classList.remove("dragspace-dragenter")
    })
    my.block_playground.addEventListener("dragover", (event)=> {
    event.preventDefault();
    }, false)


    my.block_playground.addEventListener("drop", (event) => {
        my.block_playground.classList.remove("dragspace-dragenter")
        event.preventDefault();
        let target = handle_duplicates(my.dragged.duplicate, my.dragged.target)

        handle_dropped_parent(my.dragged.target)
        my.block_playground.appendChild(target);
        var offsetX = event.offsetX;
        var offsetY = event.offsetY;
        var element = event.target;

        if(element !== my.block_playground) {
            while (element !== my.block_playground) {
                offsetX += element.offsetLeft;
                offsetY += element.offsetTop;
                element = element.parentNode;
            }
            target.style.left = (offsetX - my.dragged.self_x) + "px"
            target.style.top = (offsetY - my.dragged.self_y) + "px"
            return
        }

        target.style.left = (my.block_playground.scrollLeft + offsetX - my.dragged.self_x) + "px"
        target.style.top = (my.block_playground.scrollTop + offsetY - my.dragged.self_y) + "px"
        console.log(event)
    });
}