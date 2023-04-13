import BlockInt from "../blockValue.js";

export default class RandomInt extends BlockInt {
    static input_types = [parseInt, parseInt];
    static display = "random integer | to |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return Math.floor(args[0] + Math.random() * (args[1] - args[0] + 1))
    }
}