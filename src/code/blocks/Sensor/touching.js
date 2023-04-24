import global from "../../global.js"
import BlockValue from "../blockValue.js";

function get_all_sprites() {
    return Object.keys(global.window.sprites)
}

export default class Touching extends BlockValue {
    static input_types = [{
       isList: true,
       default: ["mouse\u200b"],
       variable: get_all_sprites,
    }];
    static display = "touching |?";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let mp = data.user.mouse_pos
        if(args[0] === "mouse\u200b") {
            return data.sprite.getBounds().contains(mp.x, mp.y)
        }
        else if(args[0] in global.window.sprites) {
            let obj = global.window.sprites[args[0]]
            return obj.sprite.getBounds().intersects(data.sprite.getBounds())
        }
        else {
            return false
        }
    }
}