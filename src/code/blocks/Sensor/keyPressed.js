import BlockInt from "../blockValue.js";
import { key_list } from "../../user.js";

const keys = Object.keys(key_list)

export default class Sin extends BlockInt {
    static input_types = [{
        isList: true,
        default: keys,
        variable: ()=>[],
    }];
    static display = "key | pressed?";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let key = key_list[args[0]]
        return data.user.is_key_down(key)
    }
}