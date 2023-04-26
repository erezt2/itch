import { saveState, loadState, resetState } from './save-load.js';
import { addFile} from "./sprite-list-events.js"
import global from "./global.js"
const dialog = require('dialogs')()
const fs = require('fs');

const file_dropdown = document.getElementById("file-dropdown")
const file_selector = document.getElementById("file-selector")
const file_selector_flex = document.getElementById("file-selector-flex")
document.getElementById("file_button").onclick = function(event) {
  event.preventDefault();
  event.stopPropagation()
  if(file_dropdown.style.display === "flex") {
    file_dropdown.style.display = "none"
    global.handle_dropdown()
  }
  else {
      global.handle_dropdown()
      global.open_dropdown = file_dropdown
      file_dropdown.style.display = "flex"
  }
}

file_dropdown.children[0].onclick = function(event) {
  resetState()
  addFile("./public/sprite.webp")
  global.loaded_file = null
}

file_dropdown.children[1].onclick = async function(event){
  let files = fs.readdirSync(global.path);
  files = files.map(val => val.split('.').slice(0, -1).join('.'))
  file_selector.style.display = "flex"
  let flex = file_selector_flex
  while(flex.firstChild)
    flex.removeChild(flex.firstChild)
  // file_selector.firstChild.innerHTML = ""
  for(let file of files) {
    let obj = document.createElement("div")
    obj.innerHTML = file
    flex.appendChild(obj)
    obj.onclick = function(event) {
        event.preventDefault()
        event.stopPropagation()
        loadState(this.innerHTML)
        file_selector.style.display = "none"
        global.loaded_file = this.innerHTML
    }
  }
}

file_selector.onclick = function(event) {
    file_selector.style.display = "none"
}

async function saveAs(event){
  let files = fs.readdirSync(global.path);

  dialog.prompt("Save as:", name => {
    if(!name) return
    if(files.includes(name+".json")) {
      dialog.confirm("File already exists! Overwrite?", overwrite =>{
        if(overwrite) saveState(name)
      })
    }
    else saveState(name)
  })
}
file_dropdown.children[3].onclick = saveAs

file_dropdown.children[2].onclick = async function(event){
  if(global.loaded_file !== null) saveState(global.loaded_file)
  else saveAs(event)
}

file_dropdown.children[4].onclick = function(event) {
  let id = global.serverID
  navigator.clipboard.writeText(id).then(
      () => dialog.alert("the current ID of the server is " + id + "\n(copied to clipboard)"),
      () => dialog.alert("the current ID of the server is " + id + "\ncould not be copied to clipboard (app wasnt focused)")
  )
}