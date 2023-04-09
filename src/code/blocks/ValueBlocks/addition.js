import BlockInt from "../blockValue.js";

export default class Addition extends BlockInt {
    static input_types = [Number, Number];
    static display = "| + |";
    constructor(element) {
        super(element)
    }
    run(data) {
        let args = this.getValues(this.constructor.input_types, data)
        return args[0] + args[1]
    }
}