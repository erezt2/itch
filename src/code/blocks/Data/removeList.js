import global from "../../global.js"
import BlockVoid from "../blockVoid.js";

function get_lists() {
    return Object.keys(global.data.lists)
}

export default class RemoveList extends BlockVoid {
    static input_types = [{
        isList: true,
        default: ["first", "last", "all","random"],
        variable: ()=>[]
     }, {
        isList: true,
        default: [],
        variable: get_lists,
     }];
    static display = "remove | of |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if(args[1] in global.data.lists) {
            let list = global.data.lists[args[1]]
            if(args[0] === "first") list.splice(0, 1)
            else if (args[0] === "last") list.splice(-1, 1)
            else if(args[0] === "all") list.splice(0, list.length)
            else {
                let index = Math.floor(list.length*Math.random())
                list.splice(index, 1)
            }
        }
        return await super.run(data);
    }
}