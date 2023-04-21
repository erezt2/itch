import BlockVoid from "../blockVoid.js";

export default class Return extends BlockVoid {
    static input_types = [];
    static display = "continue";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return data
    }
}