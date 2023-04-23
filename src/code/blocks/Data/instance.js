import BlockValue from "../blockValue.js";

export default class InstanceVariable extends BlockValue {
    static input_types = [String];
    static display = "instance variable |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if(args[0] in data.owner.variables) {
            return data.owner.variables[args[0]];
        }
        return undefined
    }
}