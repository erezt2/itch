import BlockInt from "../blockValue.js";

export default class Sin extends BlockInt {
    static input_types = [];
    static display = "get time (sec)";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return new Date().getTime() / 1000
    }
}