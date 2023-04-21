import BlockStart from "../blockStart.js";

export default class Function extends BlockStart {
    static input_types = [];
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        data = await super.run(data)
        return data.return
    }
    async checkStart(data) {
        return false;
    }
}