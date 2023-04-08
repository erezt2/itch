import BlockInt from "../blockValue.js";

export default class Equals extends BlockInt {
    static input_types = [val => val, val => val];
    static display = "| = |";
    constructor(element) {
        super(element)
    }
    run() {
        let args = this.getValues(this.constructor.input_types)
        return args[0] == args[1]
    }
}