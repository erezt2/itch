import BlockInt from "../blockValue.js";

export default class ConvertBoolean extends BlockInt {
    static input_types = [Boolean];
    static display = "boolean |";
    constructor(element) {
        super(element)
    }
    run(data) {
        let args = this.getValues(this.constructor.input_types, data)
        return args[0]
    }
}