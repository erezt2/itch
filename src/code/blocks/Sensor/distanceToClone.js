import global from "../../global.js"
import BlockValue from "../blockValue.js";

function get_all_sprites() {
    return Object.keys(global.window.sprites)
}

export default class DistanceToClone extends BlockValue {
    static input_types = [{
       isList: true,
       default: [],
       variable: get_all_sprites,
    }, val=>Number(val)||0];
    static display = "distance to |'s clone id = |";
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
            return 0
        }
        return ((y-data.sprite.y)**2+(x-data.sprite.x)**2)**0.5
    }
}