import BlockInt from "../blockValue.js";

export default class ConvertNumber extends BlockInt {
    static input_types = [Number];
    static display = "number |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return args[0]
    }
}