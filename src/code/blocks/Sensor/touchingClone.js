import global from "../../global.js"
import BlockValue from "../blockValue.js";

function get_all_sprites() {
    return Object.keys(global.window.sprites)
}

export default class Touching extends BlockValue {
    static input_types = [{
       isList: true,
       default: [],
       variable: get_all_sprites,
    }, val=>Number(val)||0];
    static display = "touching |'s clone id = |?";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if(args[0] in global.window.sprites) {
            let obj = global.window.sprites[args[0]]
            let id = parseInt(args[1])
            if(id === 0) {
                return obj.sprite.getBounds().intersects(data.sprite.getBounds())
            }
            else if(id in obj.clone_list) {
                let clone = obj.clone_list[id]
                return clone.sprite.getBounds().intersects(data.sprite.getBounds())
            }
        }
        return false
    }
}