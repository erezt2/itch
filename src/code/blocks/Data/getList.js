import BlockValue from "../blockValue.js";
import global from "../../global.js"

function get_lists() {
    return Object.keys(global.data.lists)
}

export default class GetList extends BlockValue {
    static input_types = [{
        isList: true,
        default: ["first", "last", "random"],
        variable: ()=>[],
     }, {
        isList: true,
        default: [],
        variable: get_lists,
     }];
    static display = "get | of |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if(args[1] in global.data.lists) {
            let list = global.data.lists[args[1]]
            let len = list.length
            if(args[0] == "first") return list[0]
            else if(args[0] == "last") return list[len-1]
            else return list[Math.floor(Math.random()*len)]
        }
        return undefined
    }
}