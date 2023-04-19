import BlockInt from "../blockValue.js";

export default class Addition extends BlockInt {
    static input_types = [num => (Number(num) || 0), num => (Number(num) || 0)];
    static display = "| % |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let y = args[1]
        return ((args[0] % y) + y) % y;
    }
}