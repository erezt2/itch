
import handle_duplicates from "./handle-duplicates.js"
import my from "./global.js"

function handle_dropped_parent(dom) {
    let p = dom.parentNode
    if(p.classList.contains("editable")) p.contentEditable = true;
}

const playground_container = document.getElementById("script-dragspace")
export default function createDragspace(name){
    let block_playground = document.createElement("div") // (`#script-dragspace > div[name="${name}"]`)
    block_playground.id = "ds_" + name
    playground_container.appendChild(block_playground)

    block_playground.addEventListener("dragenter", (event) => { // dragspace event listeners
        block_playground.classList.add("dragspace-dragenter")
    })
    block_playground.addEventListener("dragleave", (event) => {
    block_playground.classList.remove("dragspace-dragenter")
    })
    block_playground.addEventListener("dragover", (event)=> {
    event.preventDefault();
    }, false)


    block_playground.addEventListener("drop", (event) => {
        block_playground.classList.remove("dragspace-dragenter")
        event.preventDefault();
        let target = handle_duplicates(my.dragged.duplicate, my.dragged.target)

        handle_dropped_parent(my.dragged.target)
        block_playground.appendChild(target);
        

        console.log(event)
        let rect = block_playground.getBoundingClientRect()
        let x = event.clientX - rect.left
        let y = event.clientY - rect.top

        target.style.left = (block_playground.scrollLeft + x - my.dragged.self_x) + "px"
        target.style.top = (block_playground.scrollTop + y - my.dragged.self_y) + "px"


        return 
        var offsetX = event.offsetX;
        var offsetY = event.offsetY;
        var element = event.target;
        if(element !== block_playground) {
            while (element !== block_playground) {
                offsetX += element.offsetLeft;
                offsetY += element.offsetTop;
                element = element.parentNode;
            }
            target.style.left = (offsetX - my.dragged.self_x) + "px"
            target.style.top = (offsetY - my.dragged.self_y) + "px"
            return
        }

        target.style.left = (block_playground.scrollLeft + offsetX - my.dragged.self_x) + "px"
        target.style.top = (block_playground.scrollTop + offsetY - my.dragged.self_y) + "px"
    });

}