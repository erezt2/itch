
import {handle_duplicates, handle_dropped_parent} from "./handle-duplicates.js"
import global from "./global.js"

const playground_container = document.getElementById("script-dragspace")
export default function createDragspace(name, exists){
    let block_playground
    if(!exists) {
        block_playground = document.createElement("div") // (`#script-dragspace > div[name="${name}"]`)
        block_playground.id = "ds_" + name
        playground_container.appendChild(block_playground)
    }
    else {
        block_playground = document.getElementById("ds_" + name)
    }
    
    block_playground.addEventListener("dragenter", (event) => { // dragspace event listeners
        block_playground.classList.add("dragspace-dragenter")
    })
    block_playground.addEventListener("dragleave", (event) => {
    block_playground.classList.remove("dragspace-dragenter")
    })
    block_playground.addEventListener("dragover", (event)=> {
    event.preventDefault();
    }, false)


    block_playground.addEventListener("drop", async (event) => {
        let my = Object.assign({}, global.dragged);
        if(Object.keys(my).length === 0) return;
        global.dragged = {}

        block_playground.classList.remove("dragspace-dragenter")
        event.preventDefault();
        let target = await handle_duplicates(my.duplicate, my.target)
        
        handle_dropped_parent(my.target, true)
        block_playground.appendChild(target);
        

        let rect = block_playground.getBoundingClientRect()
        let x = event.clientX - rect.left
        let y = event.clientY - rect.top

        target.style.left = (block_playground.scrollLeft + x - my.self_x) + "px"
        target.style.top = (block_playground.scrollTop + y - my.self_y) + "px"
    });
}