import BlockInt from "../blockValue.js";

export default class Or extends BlockInt {
    static input_types = [Boolean, Boolean];
    static display = "| or |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return args[0] || args[1]
    }
}