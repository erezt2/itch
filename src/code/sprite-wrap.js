import BlockStart from "./blocks/blockStart.js";
import global from "./global.js"
const {Sprite} = require("pixi.js")


class Key {
    canceled = false
    block;
    sprite;
    prevent_remove;
    constructor(sprite, block) {
        global.keys.push(this)
        sprite.keydict[global.hashDOM(block)] = this
        this.block = block
        this.sprite = sprite
        this.prevent_remove = false
    }
    
    cancel(data) {
        this.canceled = true
        delete this.sprite.keydict[global.hashDOM(this.block)]
        this.block.classList.remove()
        if(this.sprite.clone_id === 0) 
                this.block.classList.remove("running")
    }
}

class SpriteWrap {
    name;
    sprite;
    clone_id;
    keydict = {}

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
        this.clone_id = 0;
    }

    getKey(block) {
        let k = global.hashDOM(block)
        return this.keydict[k]
    }
    hasKey(block) {
        let k = global.hashDOM(block)
        return k in this.keydict
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

    stopSingular(block) {
        if (this.hasKey(block.elementHTML)) {
            let _key = this.getKey(block.elementHTML)
            _key.prevent_remove = true
            _key.cancel()
        }
    }

    runSingular(block) {
        this.stopSingular(block)
        if(this.clone_id === 0) block.elementHTML.classList.add("running")
        let key = new Key(this, block.elementHTML)
        
        let start_data = {
            local_variables: {}, else: false, sprite: this.sprite, 
            clone_id: this.clone_id, owner: this, key: key
        }
        new Promise((resolve, reject) => {
            let data = block.run(start_data)
            resolve(data)
        }).finally(data=> {if(!key.canceled)key.cancel()})/*.then(data => {
            if(!data.key.cancel && this.clone_id == 0)
                block.elementHTML.classList.remove("running")
        })*/
    }

    remove() {
        global.window.app.stage.remove(this.sprite)
        for(let k in this.keydict) {
            k.cancel()
        }
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
    parent;
    constructor(sprite_main) {
        this.parent = sprite_main
        this.clone_id = sprite_main.clode_next
        
        sprite_main.push(this)
        super(this.parent.name, this.parent.sprite.texture)
        this.clone_id = sprite_main.clode_next++
    }
    remove() {
        const index = this.parent.clone_list.indexOf(this)
        this.parent.clone_list.splice(index, 1)
        super.remove()
    }
}

class SpriteMain extends SpriteWrap {
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
    stopSingularAllClones(block) {
        this.stopSingular(block);
        for(let c of this.clone_list) c.stopSingular()
    }
}


export { SpriteWrap, SpriteCopy, SpriteMain, Key }