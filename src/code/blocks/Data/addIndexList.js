import global from "../../global.js"
import BlockVoid from "../blockVoid.js";

function get_lists() {
    return Object.keys(global.data.lists)
}

export default class AddIndexList extends BlockVoid {
    static input_types = [val => val, {
        isList: true,
        default: [],
        variable: get_lists,
     }, num => (Number(num) || 0)];
    static display = "add | to | at index |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if(args[1] in global.data.lists) {
            global.data.lists[args[1]].splice(parseInt(args[2]), 0, args[0])
        }
        return await super.run(data);
    }
}