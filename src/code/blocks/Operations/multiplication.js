import BlockInt from "../blockValue.js";

export default class Multiplication extends BlockInt {
    static input_types = [Number, Number];
    static display = "| * |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return args[0] * args[1]
    }
}