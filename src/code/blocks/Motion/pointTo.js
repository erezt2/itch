import BlockVoid from "../blockVoid.js";
import global from "../../global.js"

function get_all_sprites(data) {
    return Object.keys(global.window.sprites)
}

export default class Move extends BlockVoid {
    static input_types = [{
       isList: true,
       default: ["mouse\u200b"],
       variable: get_all_sprites,
    }];
    static display = "point to |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let x, y
        if(args[0] === "mouse\u200b") {
            x = global.mouse_pos.x
            y = global.mouse_pos.y
        }
        else if(args[0] in global.window.sprites) {
            let obj = global.window.sprites[args[0]]
            x = obj.sprite.x
            y = obj.sprite.y
        }
        else {
            return await super.run(data);
        }
        data.owner.rotation = Math.atan2(y-data.sprite.y,x-data.sprite.x)
        return await super.run(data);
    }
}