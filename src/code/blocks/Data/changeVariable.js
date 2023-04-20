import global from "../../global.js"
import BlockVoid from "../blockVoid.js";

function get_variables() {
    return Object.keys(global.data.variables)
}

export default class ChangeVariable extends BlockVoid {
    static input_types = [{
        isList: true,
        default: [],
        variable: get_variables,
     }, val => val];
    static display = "change | by |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if(args[0] in global.data.variables) {
            global.data.variables[args[0]] += args[1]
        }
        return await super.run(data);
    }
}