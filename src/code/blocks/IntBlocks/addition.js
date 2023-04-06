import BlockInt from "../blockValue.js";

export default class Addition extends BlockInt {
    static input_types = [Number, Number];
    static display = "| + |";
    constructor(element) {
        super(element)
    }
    run() {
        let args = this.getValues(this.constructor.input_types)
        console.log("RUN ADD")
        return args[0] + args[1]
    }
}