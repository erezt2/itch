import BlockInt from "../blockValue.js";

export default class Division extends BlockInt {
    static input_types = [Number, Number];
    static display = "| / |";
    constructor(element) {
        super(element)
    }
    run() {
        let args = this.getValues(this.constructor.input_types)
        return args[0] / args[1]
    }
}