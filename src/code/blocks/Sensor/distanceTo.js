import global from "../../global.js"
import BlockValue from "../blockValue.js";

function get_all_sprites() {
    return Object.keys(global.window.sprites)
}

export default class Move extends BlockValue {
    static input_types = [{
       isList: true,
       default: ["mouse\u200b"],
       variable: get_all_sprites,
    }];
    static display = "distance to |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let x, y
        if(args[0] === "mouse\u200b") {
            x = data.user.mouse_pos.x
            y = data.user.mouse_pos.y
        }
        else if(args[0] in global.window.sprites) {
            let obj = global.window.sprites[args[0]]
            x = obj.sprite.x
            y = obj.sprite.y
        }
        else {
            return 0
        }
        return ((y-data.sprite.y)**2+(x-data.sprite.x)**2)**0.5
    }
}