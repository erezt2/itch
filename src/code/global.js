const { ipcRenderer } = require("electron");

var my = {}
my.current_block_id = 0
my.current_input_id = 0
my.window = {width: 640, height: 480, app: null, sprites: {}}
my.keys = []
my.dragged = {};
my.mouse_pos = {x:0, y:0}

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
my.path = await ipcRenderer.invoke("homeDir") + "/saves/"


function getNextName(name_list, name) {
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

my.getNextName = getNextName

export default my;