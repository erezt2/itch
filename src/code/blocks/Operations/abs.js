import BlockInt from "../blockValue.js";

export default class Abs extends BlockInt {
    static input_types = [Number];
    static display = "abs( | )";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return Math.abs(args[0])
    }
}