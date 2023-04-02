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
sections = [["Motion", "#3366FF"], ["Texture", "#CC99FF"], ["Sensor", "#33CCCC"], ["Audio", "#FF99CC"], ["State", "#00CC99"], 
            ["Network", "#FFCC99"], ["Controls", "#FF9900"], ["Operations", "#99CC00"], ["Functions", "#666699"], ["Data", "#FF6600"]]
selected_section = undefined

function selectScriptSectionWrapper(index) {
  return () => selectScriptSection(index)
}

function selectScriptSection(index) {
  if(selected_section !== undefined) selected_section.style.backgroundColor = "";
  selected_section?.classList.remove("editor-selected")
  selected_section = sst.children[index]
  selected_section.style.backgroundColor = sections[index][1]
  selected_section.classList.add("editor-selected")
}

for(let i=0; i<10; i++) {
  let item = document.createElement("a")

  let color = document.createElement("span")
  let name = document.createElement("span")
  color.style.backgroundColor = sections[i][1]
  name.innerHTML = sections[i][0];
  item.appendChild(color)
  item.appendChild(name)

  item.onclick = selectScriptSectionWrapper(i)
  sst.appendChild(item)
}

selectScriptSection(0)
// end

const Draggable = require("draggable")


let creator = document.getElementById("creator")
let body = document.getElementById("script-dragspace")
creator.onclick = create

function create() {
  let drag = document.createElement("div")
  drag.classList.add("draggable")
  body.appendChild(drag)
  new Draggable(drag, {})
}


const block_list = document.getElementById("script-block-list")
const list_diff = 150
function resize(event) {
  block_list.style.height = (event.target.innerHeight - list_diff)+"px";
}
document.body.onresize = resize;
block_list.style.height = (window.innerHeight - list_diff)+"px";

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
