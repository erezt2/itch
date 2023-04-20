import BlockValue from "../blockValue.js";
import global from "../../global.js"

function get_lists() {
    return Object.keys(global.data.lists)
}

export default class GetListString extends BlockValue {
    static input_types = [{
        isList: true,
        default: [],
        variable: get_lists,
     }];
    static display = "| list string";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if(args[0] in global.data.lists) {
            return global.data.lists[args[0]].join(" ");
        }
        return null
    }
}