import BlockValue from "../blockValue.js";
import global from "../../global.js"

function get_lists() {
    return Object.keys(global.data.lists)
}

export default class GetList extends BlockValue {
    static input_types = [num => (Number(num) || 0), {
        isList: true,
        default: [],
        variable: get_lists,
     }];
    static display = "index | of |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if(args[1] in global.data.lists) {
            return global.data.lists[args[1]][parseInt(args[0])]
        }
        return undefined
    }
}