import BlockVoid from "../blockVoid.js";
import global from "../../global.js"

function get_all_sprites() {
    return Object.keys(global.window.sprites)
}

export default class PointToClone extends BlockVoid {
    static input_types = [{
       isList: true,
       default: [],
       variable: get_all_sprites,
    }, val=>Number(val)||0];
    static display = "point to |'s clone id = |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let x=0, y=0
        if(args[0] in global.window.sprites) {
            let obj = global.window.sprites[args[0]]
            let id = parseInt(args[1])
            for(let clone of obj.clone_list){
                if(clone.clone_id === id) {
                    x = clone.sprite.x
                    y = clone.sprite.y
                    break
                }
            }
        }
        else {
            return await super.run(data);
        }
        data.owner.rotation = Math.atan2(y-data.sprite.y,x-data.sprite.x)
        return await super.run(data);
    }
}