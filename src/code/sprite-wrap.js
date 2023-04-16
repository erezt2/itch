import BlockStart from "./blocks/blockStart.js";
import global from "./global.js"
const {Sprite} = require("pixi.js")


class Key {
    canceled = false
    constructor() {
        global.keys.push(this)
    }
    cancel(data) {
        this.canceled = true
    }
}

class SpriteWrap {
    name;
    sprite;

    constructor(name, texture) {
        this.name = name
        // console.log(texture.firstChild.firstChild.src)
        this.sprite = Sprite.from(texture.firstChild.firstChild.src)
        this.sprite.eventMode = "static"
        this.sprite.on("click", (event)=>{
            console.log(event)
        })
        global.window.app.stage.addChild(this.sprite)
        this.sprite.anchor.set(0.5)

        this.x = 0
        this.y = 0
    }

    runBlocks(filter) {
        let ds = document.getElementById("ds_"+this.name)
        for(let child of ds.children){
            let block = child["data-block"]
            if(block instanceof BlockStart &&
                block.checkStart(filter)) {
                    this.runSingular(block)
                }
        }
    }

    runSingular(block) {
        let key = new Key()
        let start_data = {
            local_variables: {}, else: false, sprite: this.sprite, 
            clone_id: this.clone_id, owner: this, key: key
        }
        new Promise((resolve, reject) => {
            let r = block.run(start_data)
            resolve(r)
        })
    }

    remove() {
        global.window.app.stage.remove(this.sprite)
    }
 
    set x(val) {
        let halfW = Math.round(global.window.width / 2)
        this.sprite.x = val + halfW
    }

    set y(val) {
        let halfH = Math.round(global.window.height / 2)
        this.sprite.y = -val + halfH
    }

    get x() {  // what the program sees
        let halfW = Math.round(global.window.width / 2)
        return this.sprite.x - halfW
    }
    get y() {
        let halfH = Math.round(global.window.height / 2)
        return halfH - this.sprite.y
    }
    
}

class SpriteCopy extends SpriteWrap {
    clode_id;
    parent;
    constructor(sprite_main) {
        this.parent = sprite_main
        this.clone_id = sprite_main.clode_next
        sprite_main.clode_next += 1;
        sprite_main.push(this)
        super(this.parent.name, this.parent.sprite.texture)
    }
    remove() {
        const index = this.parent.clone_list.indexOf(this)
        this.parent.clone_list.remove(index)
        super.remove()
    }
}

class SpriteMain extends SpriteWrap {
    clone_id = 0;
    clone_next = 1;
    clone_list = []
    constructor(name, texture) {
        super(name, texture)
        
        global.window.sprites[name] = this
    }
    remove() {
        delete global.window.sprites[this.name]
        super.remove()
    }
}


export { SpriteWrap, SpriteCopy, SpriteMain }