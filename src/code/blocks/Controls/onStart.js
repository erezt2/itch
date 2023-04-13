import BlockStart from "../blockStart.js";

export default class OnStart extends BlockStart {
    static input_types = [];
    static display = "on start";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return await super.run(data)
    }
    async checkStart(data) {
        if(data.start) await this.run(this.constructor.getDefaultData());
    }
}