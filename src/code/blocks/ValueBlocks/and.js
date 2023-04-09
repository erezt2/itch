import BlockInt from "../blockValue.js";

export default class And extends BlockInt {
    static input_types = [Boolean, Boolean];
    static display = "| and |";
    constructor(element) {
        super(element)
    }
    run(data) {
        let args = this.getValues(this.constructor.input_types, data)
        return args[0] && args[1]
    }
}