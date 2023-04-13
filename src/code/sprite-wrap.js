import global from "./global.js"
const {Sprite} = require("pixi.js")

export default class SpriteWrap {
    name;
    sprite;

    constructor(name, texture) {
        this.name = name
        // console.log(texture.firstChild.firstChild.src)
        this.sprite = Sprite.from(texture.firstChild.firstChild.src)
        global.window.app.stage.addChild(this.sprite)
        this.sprite.anchor.set(0.5)

        this.x = 0
        this.y = 0
        
        global.window.sprites.push(this)
        console.log(global.window.app.stage)
    }

    set x(val) {
        this.sprite.x = val + 320
    }

    set y(val) {
        this.sprite.y = -val + 240
    }

    get x() {  // what the program sees
        return this.sprite.x - val
    }
    get y() {
        return 320 - this.sprite.y
    }
    
}