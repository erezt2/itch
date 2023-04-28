import BlockVoid from "../blockVoid.js";
import global from "../../global.js"

function get_all_sprites() {
    return Object.keys(global.window.sprites)
}

export default class GotoClone extends BlockVoid {
    static input_types = [{
       isList: true,
       default: [],
       variable: get_all_sprites,
    }, val=>Number(val)||0];
    static display = "go to |'s clone id = |";
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
                data.owner.x = clone.x
                data.owner.y = clone.y
            }
        }
        return await super.run(data);
    }
}