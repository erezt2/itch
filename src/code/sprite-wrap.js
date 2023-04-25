import BlockStart from "./blocks/blockStart.js";
import global from "./global.js"
const boundBox = global.settings.boundBox
const reboundOnRotate = global.settings.reboundOnRotate
const {Sprite, Texture} = require("pixi.js")
const pi = Math.PI

function HSLtoHEX(h, s, l) {
    l /= 100;
    h *= 3.6
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

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
        if(this.sprite.clone_id === 0) {
            this.block.classList.remove("running")
        }
    }
}

class SpriteWrap {
    name;
    selected_texture;
    sprite;
    clone_id=0;
    keydict = {}
    _rotation = 0
    _rotation_mode = 0 // 0-normal, 1-left+right, 2-none
    promises = []
    variables = {}
    _tint = [100, 100, 100]
    user

    constructor(name, texture, texture_name, user) {
        if(user === undefined) this.user = global.users[0]
        else this.user = user

        this.name = name
        // console.log(texture.firstChild.firstChild.src)
        this.sprite = Sprite.from(texture)
        this.selected_texture = texture_name
        this.sprite.eventMode = "static"
        this.sprite.on("click", async (event)=>{
            this.runBlocks({clickedOn: true})
        })
        global.window.app.stage.addChild(this.sprite)
        this.sprite.anchor.set(0.5)
        this.variables = {}

        this.x = 0
        this.y = 0
        
    }
    get textureDOMList() {
        return [...document.getElementById(`te_${this.name}`).children].slice(0,-1)
    }
    get soundDOMList() {
        return [...document.getElementById(`se_${this.name}`).children].slice(0,-1)
    }

    playBlock(val) {
        val["data-sound"].play()
    }

    pauseBlock(val) {
        val["data-sound"].pause();
        val["data-sound"].currentTime = 0;
    }

    set textureBlock(val) {
        this.sprite.texture = Texture.from(val.firstChild.firstChild.src)
        this.selected_texture = val.lastChild.innerHTML
    }

    resetTexture() {
        let block = document.getElementById(`te_${this.name}`).firstChild
        this.textureBlock = block
        this.sprite.texture = Texture.from(block.firstChild.firstChild.src)
        this.sprite.selected_texture = block.lastChild.innerHTML
    }

    getKey(block) {
        let k = global.hashDOM(block)
        return this.keydict[k]
    }
    hasKey(block) {
        let k = global.hashDOM(block)
        return k in this.keydict
    }

    async runBlocks(filter, args) {
        filter.selfObject = this
        let ds = document.getElementById("ds_"+this.name)
        let l = []
        for(let child of ds.children){
            let block = child["data-block"]
            if(block instanceof BlockStart &&
                await block.checkStart(filter)) {
                    l.push(this.runSingular(block, args))
                }
        }
        return l
    }

    stopSingular(block) {
        if (this.hasKey(block.elementHTML)) {
            let _key = this.getKey(block.elementHTML)
            _key.prevent_remove = true
            _key.cancel()
        }
    }

    stopSelf(mercy) {
        let l=Object.values(this.keydict)
        for(let k of l) {
            if(k===mercy) continue
            k.cancel()
        }
    }

    runSingular(block, args) {
        this.stopSingular(block)
        if(this.clone_id === 0) block.elementHTML.classList.add("running")
        let key = new Key(this, block.elementHTML)
        
        let start_data = {
            local_variables: {}, else: false, break:false, continue:false, sprite: this.sprite, 
            clone_id: this.clone_id, owner: this, user: this.user, key: key
        }
        if(args !== undefined) start_data = {
            ...args,
            ...start_data,
        }
        let pr = new Promise(async (resolve, reject) => {
            let data 
            try {
                data = await block.run(start_data)
            }
            catch(e) {
                reject(e)
                throw e
            }
            resolve(data)
        }).finally(data=> {
            if(!key.canceled)key.cancel()
            this.promises = this.promises.filter(prom => prom !== pr)
        })/*.then(data => {
            if(!data.key.cancel && this.clone_id == 0)
                block.elementHTML.classList.remove("running")
        })*/
        this.promises.push(pr)
        return pr
    }

    remove() {
        // console.log(global.window.app.stage)
        // const index = global.window.app.stage.indexOf(this.sprite)
        // if(index !== -1) global.window.app.stage.splice(index, 1)
        for(let k in this.keydict) {
            this.keydict[k].cancel()
        }
        Promise.all(this.promises).then(data => this.sprite.destroy()) 
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
        return this.sprite.getBounds().width
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
        return this.sprite.getBounds().height
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
    set tint(val) {
        this.sprite.tint = HSLtoHEX(...val)
        this._tint = val
    }
    get tint() {
        return this._tint
    }
}

class SpriteCopy extends SpriteWrap {
    parent;
    is_clone = true;
    clone_id;
    constructor(parent, user_id) {
        let user
        if(user_id) user = global.users[user_id]
        else user = undefined
        super(parent.name, parent.sprite.texture, parent.selected_texture, user)
        this.parent = parent
        parent.add_clone(this)

        this.rotation_mode = parent.rotation_mode
        this.rotation = parent.rotation
        this.x = parent.x
        this.y = parent.y
        this.sprite.scale.x = parent.sprite.scale.x
        this.sprite.scale.y = parent.sprite.scale.y
        this.tint = parent.tint
        
        this.runBlocks({cloned: true})
    }
    remove(fromparent) {
        super.remove()
        if(!fromparent) {
            const index = this.parent.clone_list.indexOf(this)
            if(index !== -1) this.parent.clone_list.splice(index, 1)
        }
    }
}

class SpriteMain extends SpriteWrap {
    clone_next = 1;
    clone_list = []
    is_clone = false;
    constructor(name, texture) {
        super(name, texture.firstChild.firstChild.src, texture.lastChild.innerHTML)
        global.window.sprites[name] = this
    }
    create_clone(user_id) {
        new SpriteCopy(this, user_id)
    }
    add_clone(instance) {
        this.clone_list.push(instance)
        instance.clone_id = this.clone_next
        this.clone_next += 1
    }
    remove() {
        delete global.window.sprites[this.name]
        for(let c of this.clone_list) {
            c.remove(true)
        }
        super.remove()
    }
    stopAll(mercy) {
        this.stopSelf(mercy)
        for(let cl of this.clone_list) cl.stopSelf(mercy)
    }
    async runAllBlocks(data) {
        let l = []
        l= l.concat(await this.runBlocks(data))
        for(let cl of this.clone_list) l=l.concat(await cl.runBlocks(data))
        return l
    }
    stopSingularAllClones(block) {
        this.stopSingular(block);
        for(let c of this.clone_list) c.stopSingular(block)
    }
}


export { SpriteWrap, SpriteCopy, SpriteMain, Key }