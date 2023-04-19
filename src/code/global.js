const { ipcRenderer } = require("electron");

var my = {}
my.window = {width: 640, height: 480, app: null, sprites: {}}
my.keys = []
my.dragged = {};
my.mouse_pos = {x:0, y:0}
my.settings = require("./settings.json")
my.open_dropdown = null
my.dropdown_reference = null
my.loaded_file = null
my.handle_dropdown = function() {
    if(my.open_dropdown !== null) {
        my.open_dropdown.style.display = "none"
        my.open_dropdown = null
    }
}

// my.removeDropdown = function(dropdown) {
//     let index = my.open_dropdowns.indexOf(dropdown)
//     if (index !== -1) {
//         my.open_dropdowns.splice(index, 1)
//     }
// }

my.path = await ipcRenderer.invoke("homeDir") + "/saves/"


my.getNextName = function(name_list, name) {
    if (!name_list.includes(name)) return name;
    let num = name.match(/\d*$/)[0]
    name = name.slice(0, name.length - num.length)
    if(num === "") num=0
    else num = parseInt(num) 
    num += 1
    let newname = name + num
    while(name_list.includes(newname)) {
        num += 1
        newname = name + num
    }
    return newname
}

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

my.nextHashID = 1
my.resetHash = function(dom) {
    delete dom.dataset["hashID"]
}
my.hashDOM = function(dom) {
    if(dom.dataset.hashID >= my.nextHashID) {
        my.nextHashID = Number(dom.dataset.hashID) + 1
    }
    dom.dataset.hashID = dom.dataset.hashID || (my.nextHashID++)
    return dom.dataset.hashID
}

export default my;