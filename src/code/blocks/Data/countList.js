import BlockValue from "../blockValue.js";
import global from "../../global.js"

function get_lists() {
    return Object.keys(global.data.lists)
}

export default class GetList extends BlockValue {
    static input_types = [val=>val, {
        isList: true,
        default: [],
        variable: get_lists,
     }];
    static display = "count of | in |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if(args[1] in global.data.lists) {
            return global.data.lists[args[1]].filter(x => x===args[0]).length
        }
        return null
    }
}