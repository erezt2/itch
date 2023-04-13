import BlockInt from "../blockValue.js";

export default class ConvertString extends BlockInt {
    static input_types = [String];
    static display = "string |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return args[0]
    }
}