import global from "./global.js"

function resetPlayground() {
    for(let key of global.keys) {
        key.cancel()
    }
    global.keys = []
    let sprites = global.window.sprites
    for(let k in sprites) {
        let sm = sprites[k]
        for(let clone of sm.clone_list) {
        clone.remove()
        }
    }
}

let start_buttom = document.getElementById("start_button")
start_buttom.onclick = function(event) {
    resetPlayground()
    let sprites = global.window.sprites
    for(let k in sprites) {
        sprites[k].runBlocks({start: true})
    }
}

let stop_button = document.getElementById("stop_button")
    stop_button.onclick = function(event) {
    resetPlayground()
}

export default resetPlayground;