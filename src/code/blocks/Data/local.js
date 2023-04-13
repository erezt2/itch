import BlockValue from "../blockValue.js";

export default class LocalVariable extends BlockValue {
    static input_types = [val => val];
    static display = "local variable |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if(data.local_variables.hasOwnProperty(args[0])) {
            return data.local_variables[args[0]];
        }
        console.log(data)
        throw Error(data)
    }
}