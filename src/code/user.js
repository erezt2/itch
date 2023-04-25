import global from "./global.js"

const Key = Object.freeze({
    none: 0,
    down: 1,
});

const key_list = {
    "space":" ",
    "left arrow":"ArrowLeft",
    "up arrow":"ArrowUp",
    "right arrow":"ArrowRight",
    "down arrow": "ArrowDown",	
    "0":"0",
    "1":"1",
    "2":"2",
    "3":"3",
    "4":"4",
    "5":"5",
    "6":"6",
    "7":"7",	
    "8":"8",	
    "9":"9",
    "a":"a",
    "b":"b",	
    "c":"c",	
    "d":"d",
    "e":"e",	
    "f":"f",	
    "g":"g",
    "h":"h",	
    "i":"i",	
    "j":"j",	
    "k":"k",
    "l":"l",
    "m":"m",	
    "n":"n",	
    "o":"o",	
    "p":"p",	
    "q":"q",	
    "r":"r",	
    "s":"s",	
    "t":"t",
    "u":"u",	
    "v":"v",	
    "w":"w",
    "x":"x",
    "y":"y",
    "z":"z",
}

var user = 0

class User {
    static users = {}
    static peers = {}
    userID = 0
    mouse_pos
    keys
    mouseDown

    key_down(key) {
        if(this.keys[key]) return;
        this.keys[key] = Key.down

        let sprites = global.window.sprites
        for(let k in sprites) {
            sprites[k].runBlocks({keyDown: {user: this, key: key}})
        }
    }

    key_up(key) {
        this.keys[key] = Key.none
    }

    is_key_down(key) {
        return this.keys[key] === Key.down
    }

    mouse_down() {
        this.mouseDown = true
    }

    mouse_up() {
        this.mouseDown = false
    }

    promise_resolve

    answer(ans) {
        if(this.promise_resolve)
            this.promise_resolve(ans || "")
    }
    async ask(q) {
        this.connection.send({"ask": q})
        let p = new Promise(resolve => {
            this.promise_resolve = resolve
        })
        return await p
    }

    constructor(peer_id, connection) {
        this.connection = connection
        this.peerID = peer_id
        this.userID = user
        this.promise_resolve = null
        user += 1
        this.mouse_pos = {x: 0, y: 0}
        this.keys = {}
        for(let i of Object.keys(key_list)) this.keys[i] = Key.none
        this.mouseDown = false
        global.users[this.userID] = this
        global.peers[this.peerID] = this
    }
}

export {User, key_list}