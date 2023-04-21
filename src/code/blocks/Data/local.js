import BlockValue from "../blockValue.js";

export default class LocalVariable extends BlockValue {
    static input_types = [String];
    static display = "local variable |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if(args[0] in data.local_variables) {
            return data.local_variables[args[0]];
        }
        return undefined
    }
}