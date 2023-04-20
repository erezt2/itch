import global from "../../global.js"
import BlockVoid from "../blockVoid.js";

function get_lists() {
    return Object.keys(global.data.lists)
}

export default class AppendList extends BlockVoid {
    static input_types = [val => val, {
        isList: true,
        default: [],
        variable: get_lists,
     }, {
        isList: true,
        default: ["start", "end", "random"],
        variable: ()=>[]
     }];
    static display = "add | to | at |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if(args[1] in global.data.lists) {
            let list = global.data.lists[args[1]]
            if(args[2] === "start") list.splice(0, 0, args[0])
            else if (args[2] === "end") list.push(args[0])
            else {
                let index = Math.floor((list.length+1)*Math.random())
                list.splice(index, 0, args[0])
            }
        }
        return await super.run(data);
    }
}