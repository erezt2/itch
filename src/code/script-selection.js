import blockValue from "./blocks/blockValue.js"
import BlockVoid from "./blocks/blockVoid.js"
import BlockContainer from "./blocks/blockContainer.js"
import global from "./global.js"

function handle_dropped_parent(dom) {
    let p = dom.parentNode
    if(p.classList.contains("editable")) p.contentEditable = true;
}

export default async function createSelection() {
    function createWrapper(text) {
        let dom = document.createElement("span")
        dom.innerHTML = text
        return dom
    }
    function createTextBox() {
        let dom = document.createElement("span")
        dom.contentEditable = true;
        dom.classList.add("editable")
        return dom
    }

    const sst = document.getElementById("script-selector-table")
    const sbl = document.getElementById("script-block-list")
    const sections = require("./code/blocks/sections.json")
    const section_names = Object.keys(sections)

    let selected_section = undefined
    let selected_list = undefined

    function selectScriptSectionWrapper(index) {
        return () => selectScriptSection(index)
    }

    function selectScriptSection(index) {
        if(selected_section !== undefined) selected_section.style.backgroundColor = "";
        selected_section?.classList.remove("editor-selected")
        selected_list?.classList.remove("editor-selected")
        selected_section = sst.children[index]
        selected_list = sbl.children[index]
        selected_section.style.backgroundColor = sections[section_names[index]].color
        selected_section.classList.add("editor-selected")
        selected_list.classList.add("editor-selected")
    }

    sbl.addEventListener("dragenter", (event) => {
        event.preventDefault()
    })
    sbl.addEventListener("dragover", (event) => {
        event.preventDefault()
    })
    sbl.addEventListener("dragleave", (event) => {event.preventDefault()})
    sbl.addEventListener("drop", (event) => {
        let my = Object.assign({}, global.dragged);
        global.dragged = {}
        if(sbl.contains(my.target)) return;
        if(Object.keys(my).length === 0) return;
        
        handle_dropped_parent(my.target)
        event.preventDefault()
        my.target.remove()
    })


    for(let i=0; i<10; i++) {
        let sn = section_names[i]

        let item = document.createElement("a")

        let color = document.createElement("span")
        let name = document.createElement("span")
        color.style.backgroundColor = sections[sn].color
        name.innerHTML = sn;
        item.appendChild(color)
        item.appendChild(name)

        item.onclick = selectScriptSectionWrapper(i)
        sst.appendChild(item)

        let block_list = document.createElement("div")

        for(let block_name of sections[sn].blocks) {
            let block = document.createElement("div")
            block.style.cursor = "pointer"
            block.classList.add("draggable")
            block.draggable = true 
            block.addEventListener("dragstart", global.register_dragged_dup)
            
            let inside = document.createElement("div")
            let block_class = (await import(`./blocks/${sn}/${block_name}`)).default
            let block_text = block_class.display.split("|")
            inside.appendChild(createWrapper(block_text[0]))
            for(let i=1; i<block_text.length; i++) {
                inside.appendChild(createTextBox())

                inside.appendChild(createWrapper(block_text[i]))
            }
            inside.style.backgroundColor = sections[sn].color
            block.appendChild(inside)
            block.dataset["path"] = `./blocks/${sn}/${block_name}`
            let returnType = "-"
            if(block_class.prototype instanceof BlockVoid) {
                block.classList.add("block-void")
                returnType = "void"
            }
            else if(block_class.prototype instanceof blockValue) {
                block.classList.add("block-int")
                returnType = "int"
            }
            else if (block_class.prototype instanceof BlockContainer) {
                block.classList.add("block-container")
                returnType = "void"
                let inside2 = document.createElement("div")
                inside2.classList.add("inside-container")
                block.appendChild(inside2)
            }
            block.dataset["type"] = returnType

            block_list.appendChild(block)
        }

        sbl.appendChild(block_list)

    }
    selectScriptSection(0)
}



