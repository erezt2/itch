import BlockValue from "./blocks/blockValue.js"
import BlockVoid from "./blocks/blockVoid.js"
import BlockContainer from "./blocks/blockContainer.js"
import BlockStart from "./blocks/blockStart.js"
import global from "./global.js"
import {handle_dropped_parent, handle_duplicates, handle_function_blocks} from "./handle-duplicates.js"
import createListWrap from "./create-list-wrap.js"
const dialog = require('dialogs')()

function createWrapper(text) {
    let dom = document.createElement("span")
    dom.innerHTML = text
    return dom
}
function createTextBox() {
    let dom = document.createElement("span")
    dom.contentEditable = true;
    dom.classList.add("editable")
    dom.onpaste = (event) => false
    dom.addEventListener("keydown", (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    })
    return dom
}

async function createBlock(block, block_name, sn, display) {
    block.classList.add("draggable")
    block.draggable = true 
    block.addEventListener("dragstart", global.register_dragged_dup)
    
    let inside = document.createElement("div")
    let block_class = (await import(`./blocks/${sn}/${block_name}`)).default
    let block_text
    if(display===undefined)block_text = block_class.display.split("|")
    else block_text = display.split("|")
    inside.appendChild(createWrapper(block_text[0]))
    for(let i=1; i<block_text.length; i++) {
        if(display===undefined) {
            let convertor = block_class.input_types[i-1]
            if(convertor.isList) {
                inside.appendChild(createListWrap(convertor))
            }
            else {
                inside.appendChild(createTextBox())
            }
        }
        else {
            inside.appendChild(createTextBox())
        }
        
        inside.appendChild(createWrapper(block_text[i]))
        
    }
    inside.style.backgroundColor = sections[sn].color
    block.appendChild(inside)
    block.dataset["path"] = `./blocks/${sn}/${block_name}`
    let returnType = "-"
    block.dataset["preventDrop"] = false
    if(block_class.prototype instanceof BlockVoid) {
        block.classList.add("block-void")
        returnType = "void"
    }
    else if(block_class.prototype instanceof BlockValue) {
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
    else if (block_class.prototype instanceof BlockStart) {
        block.classList.add("block-start")
        returnType = "void"
        block.dataset["preventDrop"] = true
    }
    block.dataset["type"] = returnType
    return block
}

async function createFunctionBlock(block_list, button_block, fileName, response, types, id) {
    let block = document.createElement("div")
    block = await createBlock(block, fileName, "Functions", response)
    block.dataset["func_inputs"] = types
    block.classList.add("create-function")
    block.dataset["func_id"] = id
    block_list.insertBefore(block,button_block.nextSibling)
}

function createFunction(block_list, type) {
    block_list.id = "function-block-list"
    let fileName = "voidTemplate.js"
    if(type === "value") fileName = "valueTemplate.js"
    let button_block = createButton(type + " function")
    button_block.id = type+"-function-creator"
    block_list.appendChild(button_block)
    button_block.onclick = function(event) {
        dialog.prompt("Create new function:\nInsert inputs using [number]/[string]/[boolean]/[all].\n\nFunction name:", 
                      "new function [string] [number]",
                      async response =>{
            if(!response) return;
            if(response.includes("|")){
                dialog.alert("Function must not include '|' character")
                return
            }
            
            let types = [...response.matchAll(/\[.*?\]/g)]
            response = response.replaceAll(/\[.*?\]/g, "|")
            let id = "function_"+response
            
            types = types.map(val=>val[0].toLowerCase()).join("|")
            if(document.getElementById(id)) {
                dialog.alert("A function with this name already exists. ")
                return
            }

            let ds = document.getElementById(`ds_${global.selected_sprite}`)
            let func = document.createElement("div")

            let input_split = response.split("|")
            let input_text = input_split[0]
            let input_num = 1
            for(let i=1; i<input_split.length; i++) {
                input_text += `[input${input_num}]`
                input_num+=1
                input_text += input_split[i]
            }

            func = await createBlock(func, "function.js", "Functions", input_text)
            let target = await handle_duplicates(true, func)
            target.id = id
            target.classList.add("create-function-head")
            target.dataset["is_function"] = true
            target.dataset["re_response"] = response
            target.dataset["re_types"] = types
            target.dataset["re_file"] = fileName
            target.dataset["re_button"] = button_block.id
            ds.appendChild(target)
            target.style.top = "10px"
            target.style.left = "10px"
            
            await createFunctionBlock(block_list, button_block, fileName, response, types, id)
        })
    }
}

function createNewVar(block_list, type) {
    let block = createButton("create " + type)
    block_list.appendChild(block)
    block.onclick = function(event) {
        dialog.prompt(`Create new ${type}.\n${type} name:`, response=> {
            if(response) {
                if(type === "variable") {
                    if(response in global.data.variables) {
                        dialog.alert(type+" already exists!")
                        return 
                    }
                    global.data.variables[response] = 0
                }
                else  {
                    if(response in global.data.lists) {
                        dialog.alert(type+" already exists!")
                        return 
                    }
                    global.data.lists[response] = []
                }
            }
        })
    }
    block = createButton("delete "+type)
    block_list.appendChild(block)
    block.onclick = function(event) {
        dialog.prompt(`Delete existing ${type}.\n${type} name:`, response=> {
            if(response) {
                if(type === "variable") {
                    if(!(response in global.data.variables)) {
                        dialog.alert(type+" does not exists!")
                        return 
                    }
                    delete global.data.variables[response]
                }
                else  {
                    if(!(response in global.data.lists)) {
                        dialog.alert(type+" does not exists!")
                        return 
                    }
                    delete global.data.lists[response] 
                }
            }
        })
    }
}

function createButton(text) {
    let dom = document.createElement("div")
    dom.classList.add("button")
    dom.innerHTML = text
    return dom
}

function selectScriptSectionWrapper(index) {
    return () => selectScriptSection(index)
}

const sst = document.getElementById("script-selector-table")
const sbl = document.getElementById("script-block-list")
const sections = require("./code/blocks/sections.json")
const section_names = Object.keys(sections)

let selected_section = undefined
let selected_list = undefined
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

async function createSelection() {
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
        if(Object.keys(my).length === 0) return; //here
        
        if(handle_function_blocks(my.target)) return
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
            if(block_name.startsWith("-")) {
                if(block_name == "-gap") {
                    block.classList.add("selection-gap")
                    block_list.appendChild(block)
                }
                else if(block_name == "-variables") {
                    createNewVar(block_list, "variable")
                }
                else if(block_name == "-lists") {
                    createNewVar(block_list, "list")
                }
                else if(block_name == "-function-void") {
                    createFunction(block_list, "void")
                }
                else if(block_name == "-function-value") {
                    createFunction(block_list, "value")
                }
                continue
            }
            block = await createBlock(block, block_name, sn)

            block_list.appendChild(block)
        }

        sbl.appendChild(block_list)

    }
    selectScriptSection(0)
}

export {createSelection, createFunctionBlock}



