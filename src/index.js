// navbar
let selected_editor = undefined;
let selected_editor_screen = undefined;
const navbar = document.getElementById("editor-navbar")
const wrapper = document.getElementById("editor-wrapper")
function selectNavbarWrapper(index) {
  return () => selectNavbar(index)
}

function selectNavbar(num) {
  selected_editor?.classList.remove("editor-selected")
  selected_editor_screen?.classList.remove("editor-selected")
  selected_editor = navbar.children[2+num]
  selected_editor_screen = wrapper.children[num]
  selected_editor.classList.add("editor-selected")
  selected_editor_screen.classList.add("editor-selected")
}

for(let i=0; i<4; i++) {
  navbar.children[2+i].onclick = selectNavbarWrapper(i)
}

selectNavbarWrapper(0)()
// end

// script selection
/*
state -> state table
network -> sockets wrappers / web access
controls -> events + loops, if else, sprite signaling etc
texture, audio -> exactly like it looks/ sounds
motion -> position + oriantiation and such
sensor -> sprite sensing/ mouse pos/ info
data -> save local/ global variables (ints, strings, tables) and save them localy
operations -> common functions (addition, RNG, conditions)
functions -> create functions made up of different blocks. can have inputs/ outputs

*/

const sst = document.getElementById("script-selector-table")
const sbl = document.getElementById("script-block-list")
sections = require("./sections.json")
section_names = Object.keys(sections)

selected_section = undefined
selected_list = undefined

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


const block_playground = document.getElementById("script-dragspace")

let dragged = {};
function register_dragged_dup(event) {
  dragged.duplicate = true;
  dragged.target = event.target;
  dragged.self_x = event.offsetX;
  dragged.self_y = event.offsetY;
}
function register_dragged(event) {
  dragged.duplicate = false;
  dragged.target = event.target;
  dragged.self_x = event.offsetX;
  dragged.self_y = event.offsetY;
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
    block.innerHTML = block_name
    block.classList.add("draggable")
    block.draggable = true
    block.addEventListener("dragstart", register_dragged_dup)
    block_list.appendChild(block)
  }

  sbl.appendChild(block_list)
}

function handle_duplicates(dup, dragged) {
  if(!dup) return dragged;
  let clone = dragged.cloneNode(true)
  clone.removeEventListener("dragstart", register_dragged_dup)
  clone.addEventListener("dragstart", register_dragged)
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
  return clone
}

function drop_in_block(event) {
  event.target.classList.remove("dropzone-dragenter")
  event.preventDefault();
  event.stopPropagation();
  console.log("block")
  let target = handle_duplicates(dragged.duplicate, dragged.target)
  event.target.parentNode.appendChild(target);
  target.style.position = "static"
  target.style.left = "0px"
  target.style.top = "0px"
}
block_playground.addEventListener("dragenter", (event) => {
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
  console.log("spread")
  let target = handle_duplicates(dragged.duplicate, dragged.target)
  target.style.position = "absolute"
  block_playground.appendChild(target);
  var offsetX = event.offsetX;
  var offsetY = event.offsetY;
  var element = event.target;
  if(element !== block_playground) {
    while (element !== block_playground) {
        offsetX += element.offsetLeft;
        offsetY += element.offsetTop;
        element = element.parentNode;
    }
    target.style.left = (offsetX - dragged.self_x) + "px"
    target.style.top = (offsetY - dragged.self_y) + "px"
    return
  }
  target.style.left = (block_playground.scrollLeft + offsetX - dragged.self_x) + "px"
  target.style.top = (block_playground.scrollTop + offsetY - dragged.self_y) + "px"
  console.log(event)
});
selectScriptSection(0)

/////////////

const block_list = document.getElementById("script-block-list")
const list_diff = 150
const playground_diff_y = 40
const playground_diff_x = 840
function resize() {
  block_list.style.height = (window.innerHeight - list_diff)+"px";
  block_playground.style.height = (window.innerHeight - playground_diff_y)+"px"
  block_playground.style.width = (window.innerWidth - playground_diff_x)+"px"
}
document.body.onresize = resize;
resize()

// SEPERATE
const PIXI = require("pixi.js")


let win = document.getElementById("window")



let app = new PIXI.Application({ width: 640, height: 480 });
app.view.style += {"position": "absolute"}
win.appendChild(app.view)

let sprite = PIXI.Sprite.from('../public/vertical.png');
app.stage.addChild(sprite);

// Add a ticker callback to move the sprite back and forth
let elapsed = 0.0;
app.ticker.add((delta) => {
  elapsed += delta;
  sprite.x = 0;
});

win.addEventListener("click", (event) => {
  console.log("test")
})
win.addEventListener("resize", (event) => {
  console.log("1234")
  //this.height = this.width * 9 / 16;
}, true)
