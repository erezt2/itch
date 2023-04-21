import BlockValue from "../blockValue.js";
import global from "../../global.js"

function get_variables() {
    return Object.keys(global.data.variables)
}

export default class GetVariable extends BlockValue {
    static input_types = [{
        isList: true,
        default: [],
        variable: get_variables,
     }];
    static display = "variable |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if(args[0] in global.data.variables) {
            return global.data.variables[args[0]];
        }
        return undefined
    }
}