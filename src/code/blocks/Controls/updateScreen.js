import BlockVoid from "../blockVoid.js";

export default class UpdateScreen extends BlockVoid {
    static input_types = [];
    static display = "update screen";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        await new Promise(resolve => setTimeout(resolve, 0))
        return await super.run(data)
    }
}