import BlockVoid from "../blockVoid.js";
import global from "../../global.js"

function get_all_sprites() {
    return Object.keys(global.window.sprites)
}

export default class CreateClone extends BlockVoid {
    static input_types = [{
        isList: true,
        default: ["myself\u200b"],
        variable: get_all_sprites,
     }];
    static display = "create clone of |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if(args[0] === "myself\u200b") {
            data.owner.create_clone()
        }
        else if (args[0] in global.window.sprites) {
            global.window.sprites[data[0]].owner.create_clone()
        }
        return await super.run(data)
    }
}