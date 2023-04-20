import global from "../../global.js"
import BlockVoid from "../blockVoid.js";

function get_lists() {
    return Object.keys(global.data.lists)
}

export default class RemoveIndexList extends BlockVoid {
    static input_types = [{
        isList: true,
        default: [],
        variable: get_lists,
     }, num => (Number(num) || 0)];
    static display = "remove from | at index |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if(args[0] in global.data.lists) {
            global.data.lists[args[0]].splice(parseInt(args[1]), 1)
        }
        return await super.run(data);
    }
}