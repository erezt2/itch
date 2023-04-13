import BlockInt from "../blockValue.js";

export default class Sin extends BlockInt {
    static input_types = [Number];
    static display = "sin( | )";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return Math.sin(args[0])
    }
}