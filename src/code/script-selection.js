
var MODULE = await (async (my) => {
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


    my.block_playground = document.getElementById("script-dragspace")

    my.dragged = {};
    my.register_dragged_dup = (event) => {
        my.dragged.duplicate = true;
        my.dragged.target = event.target;
        my.dragged.self_x = event.offsetX;
        my.dragged.self_y = event.offsetY;
    }
    my.register_dragged = (event) => {
        my.dragged.duplicate = false;
        my.dragged.target = event.target;
        my.dragged.self_x = event.offsetX;
        my.dragged.self_y = event.offsetY;
    }
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
            block.style.backgroundColor = sections[sn].color
            block.style.cursor = "pointer"
            block.classList.add("draggable")
            block.draggable = true
            block.addEventListener("dragstart", my.register_dragged_dup)
            

            let inside = document.createElement("div")
            console.log("./code/blocks/" + block_name)
            let block_class = (await import("./blocks/" + block_name)).default
            let block_text = block_class.display.split("|")
            inside.appendChild(createWrapper(block_text[0]))
            for(let i=1; i<block_text.length; i++) {
                inside.appendChild(createTextBox())

                inside.appendChild(createWrapper(block_text[i]))
            }
            block.appendChild(inside)
            block["data-class"] = block_class

            block_list.appendChild(block)
        }

        sbl.appendChild(block_list)

    }
    selectScriptSection(0)
    return my
})(MODULE || {})

export default MODULE

