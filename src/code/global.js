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

export default my;