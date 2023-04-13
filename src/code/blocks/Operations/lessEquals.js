import BlockInt from "../blockValue.js";

export default class LessEquals extends BlockInt {
    static input_types = [val => val, val => val];
    static display = "| ≤ |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return args[0] <= args[1]
    }
}