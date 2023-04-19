import BlockStart from "./blocks/blockStart.js";
import global from "./global.js"
const boundBox = global.settings.boundBox
const reboundOnRotate = global.settings.reboundOnRotate
const {Sprite} = require("pixi.js")
const pi = Math.PI

function bound(lower, value, higher) {
    if(value < lower) return lower;
    if(value > higher) return higher
    return value
}

function mod(x, y) {
    return ((x % y) + y) % y;
}

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
    _rotation = 0
    _rotation_mode = 0 // 0-normal, 1-left+right, 2-none

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
        // console.log(global.window.app.stage)
        // const index = global.window.app.stage.indexOf(this.sprite)
        // if(index !== -1) global.window.app.stage.splice(index, 1)
        this.sprite.destroy()
        for(let k in this.keydict) {
            k.cancel()
        }
    }
 
    set x(val) {
        let width = this.w
        let halfW = Math.round(global.window.width / 2)
        let b = halfW - width * (1/2 - boundBox)
        this.sprite.x = bound(-b, val, b) + halfW
    }

    set y(val) {
        let height = this.h
        let halfH = Math.round(global.window.height / 2)
        let b = halfH - height * (1/2 - boundBox)
        this.sprite.y = bound(-b, -val, b) + halfH
    }

    get x() {  // what the program sees
        let halfW = Math.round(global.window.width / 2)
        return this.sprite.x - halfW
    }
    get y() {
        let halfH = Math.round(global.window.height / 2)
        return halfH - this.sprite.y
    }
    get w() { // width including rotation
        let w = this.sprite.width
        let h = this.sprite.height
        let rot = mod(this.sprite.rotation, (2*pi))
        if(rot > pi) rot = 2*pi - rot
        if(rot > pi/2) rot = pi - rot
        let deg = Math.atan(h/w)
        let diag = (w**2 + h**2)**0.5
        return  Math.cos(rot - deg) * diag
    }
    get h() {
        let w = this.sprite.width
        let h = this.sprite.height
        let rot = mod(this.sprite.rotation, (2*pi))
        if(rot > pi) rot = 2*pi - rot
        if(rot > pi/2) rot = pi - rot
        let deg = Math.atan(w/h)
        let diag = (w**2 + h**2)**0.5
        return  Math.cos(rot - deg) * diag
    }
    get angle() {
        return this._rotation * 180 / pi
    }
    set angle(val) {
        this.rotation = val / 180 * pi
    }

    bump_out() {
        this.x = this.x
        this.y = this.y
    }

    get rotation() {
        return this._rotation
    }
    set rotation(val) {
        this._rotation = val
        if(this.rotation_mode === 0) {
            this.sprite.rotation = val
            if(reboundOnRotate)this.bump_out()
        }
        else if(this.rotation_mode === 1) {
            if(Math.abs(mod(val, 2*pi)-pi) > pi/2) this.sprite.scale.x = Math.abs(this.sprite.scale.x)
            else this.sprite.scale.x = -Math.abs(this.sprite.scale.x)
        }
    }
    get rotation_mode() {
        return this._rotation_mode
    }

    set rotation_mode(val) {
        this._rotation_mode = val
        this.sprite.scale.x = Math.abs(this.sprite.scale.x)
        if(val === 0) this.sprite.rotation = this.rotation;
        else if(val === 1) {
            if(Math.abs(mod(this.rotation, 2*pi)-pi) > pi/2) this.sprite.scale.x = Math.abs(this.sprite.scale.x)
            else this.sprite.scale.x = -Math.abs(this.sprite.scale.x)
            this.sprite.rotation = 0
        }
        else this.sprite.rotation = 0
        if(reboundOnRotate)this.bump_out()
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
    remove(fromparent) {
        if(!fromparent) {
            const index = this.parent.clone_list.indexOf(this)
            if(index !== -1) this.parent.clone_list.splice(index, 1)
        }
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
        for(let c of this.clone_list) {
            c.remove(true)
        }
        super.remove()
    }
    stopSingularAllClones(block) {
        this.stopSingular(block);
        for(let c of this.clone_list) c.stopSingular()
    }
}


export { SpriteWrap, SpriteCopy, SpriteMain, Key }