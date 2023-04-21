import BlockInt from "../blockValue.js";

export default class Input extends BlockInt {
    static input_types =  [val=>Number(val)||0];
    static display = "input |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return data.inputs[args[0]-1]
    }
}