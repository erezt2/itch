import BlockInt from "../blockValue.js";

export default class Not extends BlockInt {
    static input_types = [Boolean];
    static display = "not |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return !args[0]
    }
}