import global from "./global.js"

function resetPlayground() {
    for(let key of global.keys) {
        key.cancel()
    }
    global.keys = []
    let sprites = global.window.sprites
    for(let k in sprites) {
        let sm = sprites[k]
        let list = Object.values(sm.clone_list)
        for(let clone of list) {
            clone.remove()
        }
    }
    for(let usr of Object.values(global.users)) {
        usr.joined = false
        usr.allowedIn = false
    }
    
}

let start_button = document.getElementById("start_button")
start_button.onclick = async function(event) {
    resetPlayground()
    let sprites = global.window.sprites
    for(let usr of Object.values(global.users)) {
        usr.joined = false
        usr.allowedIn = true
    }
    for(let k in sprites) {
        // sprites[k].clone_list[0] = sprites[k]
        await sprites[k].runBlocks({start: true})
    }
}

let stop_button = document.getElementById("stop_button")
    stop_button.onclick = function(event) {
    resetPlayground()
}

export default resetPlayground;