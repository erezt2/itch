const { ipcRenderer } = require("electron");

var my = {}
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