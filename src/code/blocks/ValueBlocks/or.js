import BlockInt from "../blockValue.js";

export default class Or extends BlockInt {
    static input_types = [Boolean, Boolean];
    static display = "| or |";
    constructor(element) {
        super(element)
    }
    run() {
        let args = this.getValues(this.constructor.input_types)
        return args[0] || args[1]
    }
}