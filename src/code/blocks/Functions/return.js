import BlockVoid from "../blockVoid.js";

export default class Return extends BlockVoid {
    static input_types = [val=>val];
    static display = "return |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        data.return = args[0]
        return data
    }
}