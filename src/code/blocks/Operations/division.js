import BlockInt from "../blockValue.js";

export default class Division extends BlockInt {
    static input_types = [num => (Number(num) || 0), num => (Number(num) || 0)];
    static display = "| / |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return args[0] / args[1]
    }
}