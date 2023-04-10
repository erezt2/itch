import BlockVoid from "../blockVoid.js";

export default class LocalVariable extends BlockVoid {
    static input_types = [String, val => val];
    static display = "local variable | = |";
    constructor(element) {
        super(element)
    }
    run(data) {
        let args = this.getValues(this.constructor.input_types, data)
        data.local_variables[args[0]] = args[1]
        return super.run(data)
    }
}