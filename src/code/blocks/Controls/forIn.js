import BlockContainer from "../blockContainer.js";
import global from "../../global.js"

function get_lists() {
    return Object.keys(global.data.lists)
}

export default class RepeatTimes extends BlockContainer {
    static input_types = [String, {
        isList: true,
        default: [],
        variable: get_lists,
     }];
    static display = "for | in |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        
        if(args[1] in global.data.lists){
            let list = Array.from(global.data.lists[args[1]])
            for(let item of list){
                data.continue = false
                let inside = this.getInside();
                data.local_variables[args[0]] = item
                if(inside !== null) data = await inside.run(data)
                if(data.key.canceled) break
                if(data.return !== undefined) return data
                if(data.break) break
                await this.reschedule()
            }
        }
        data.continue = false
        data.break = false
        return await super.run(data);
    }
}