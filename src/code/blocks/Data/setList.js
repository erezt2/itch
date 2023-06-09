import BlockVoid from "../blockVoid.js";
import global from "../../global.js"

function get_lists() {
    return Object.keys(global.data.lists)
}

export default class SetList extends BlockVoid {
    static input_types = [num => (Number(num) || 0), {
        isList: true,
        default: [],
        variable: get_lists,
     }, val=>val];
    static display = "set index | of | to |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if(args[1] in global.data.lists) {
            global.data.lists[args[1]][parseInt(args[0])] = args[2]
        }
        return await super.run(data);
    }
}