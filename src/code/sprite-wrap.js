import BlockStart from "./blocks/blockStart.js";
import global from "./global.js"
const {Sprite} = require("pixi.js")


class SpriteWrap {
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
    }

    runBlocks(filter) {
        let ds = document.getElementById("ds_"+this.name)
        for(let child of ds.children){
            let block = child["data-block"]
            if(block instanceof BlockStart &&
                block.checkStart(filter)) this.runSingular(block)
        }
    }

    runSingular(block) {
        let start_data = {
            local_variables: {}, else: false, sprite: this.sprite, 
            clone_id: this.clone_id, owner: this
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
        this.sprite.x = val + 320
    }

    set y(val) {
        this.sprite.y = -val + 240
    }

    get x() {  // what the program sees
        return this.sprite.x - 320
    }
    get y() {
        return 240 - this.sprite.y
    }
    
}

class SpriteCopy extends SpriteWrap {

}

class SpriteMain extends SpriteWrap {
    clone_id = 0;
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