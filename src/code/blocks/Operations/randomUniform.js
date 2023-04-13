import BlockInt from "../blockValue.js";

export default class RandomUniform extends BlockInt {
    static input_types = [];
    static display = "random [0,1)";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return Math.random()
    }
}