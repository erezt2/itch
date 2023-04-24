import BlockVoid from "../blockVoid.js";
import global from "../../global.js"

function get_all_sprites() {
    return Object.keys(global.window.sprites)
}

export default class Goto extends BlockVoid {
    static input_types = [{
       isList: true,
       default: ["mouse\u200b", "random\u200b"],
       variable: get_all_sprites,
    }];
    static display = "go to |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if(args[0] === "mouse\u200b") {
            let x = data.user.mouse_pos.x
            if (x < 0) x = 0 
            if (x >= global.window.width) x = global.window.width
            x = x - Math.round(global.window.width / 2)
            let y = data.user.mouse_pos.y
            if (y < 0) y = 0
            if (y >= global.window.height) y = global.window.height
            y= Math.round(global.window.height / 2) - y
            data.owner.x = x
            data.owner.y = y
        }
        else if(args[0] === "random\u200b") {
            data.owner.x = Math.floor(Math.random() * 641 - 320)
            data.owner.y = Math.floor(Math.random() * 481 - 240)
        }
        else if(args[0] in global.window.sprites) {
            let other = global.window.sprites[args[0]]
            data.owner.x = other.x
            data.owner.y = other.y
        }
        return await super.run(data);
    }
}