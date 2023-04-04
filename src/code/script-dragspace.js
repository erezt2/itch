import my from "./srcipt-selection.js";
import BlockVoid from "./blocks/blockVoid.js"

export default function createBlocks(){
    function handle_duplicates(dup, dragged) {
        if(!dup) return dragged;
        let clone = dragged.cloneNode(true)
        clone.removeEventListener("dragstart", my.register_dragged_dup)
        clone.addEventListener("dragstart", my.register_dragged)
        clone.classList.add("draggable")
        let area_low = document.createElement("div")
        area_low.classList.add("dropzone")
        clone.appendChild(area_low)
        area_low.addEventListener("drop", drop_in_block);
        area_low.addEventListener("dragenter", (event) => {
            area_low.classList.add("dropzone-dragenter")
        })
        area_low.addEventListener("dragleave", (event) => {
            area_low.classList.remove("dropzone-dragenter")
        })
        clone["data-block"] = new BlockVoid(clone)
        clone.onclick = (event) => {
            event.stopPropagation()
            event.preventDefault()
            clone["data-block"].getAncestor().run()
        }
        return clone
    }
      
    function drop_in_block(event) {
        event.target.classList.remove("dropzone-dragenter")
        event.preventDefault();
        event.stopPropagation();
        let target = handle_duplicates(my.dragged.duplicate, my.dragged.target)
        event.target.parentNode.appendChild(target);
        target.style.position = "absolute"
        target.style.left = "0px"
        target.style.top = "100%"
    }


    my.block_playground.addEventListener("dragenter", (event) => {
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
        target.style.position = "absolute"
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