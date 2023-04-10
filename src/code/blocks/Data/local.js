import BlockValue from "../blockValue.js";

export default class LocalVariable extends BlockValue {
    static input_types = [val => val];
    static display = "local variable |";
    constructor(element) {
        super(element)
    }
    run(data) {
        let args = this.getValues(this.constructor.input_types, data)
        return data.local_variables[args[0]]
    }
}