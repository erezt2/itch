import global from "./global.js"
imp

Thread
class Sprite {
    name;
    _x = 0; // what the user sees
    _y = 0;

    constructor(name) {
        this.name = name
    }

    get x() {  // what the program sees
        return _x + global.window.width / 2
    }
    get y() {
        return _y + global.window.height / 2
    }
    
}