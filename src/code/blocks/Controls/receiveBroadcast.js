import BlockStart from "../blockStart.js";

export default class RecieveBoradcast extends BlockStart {
    static input_types = [String];
    static display = "on broadcast | recieved";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return await super.run(data)
    }
    async checkStart(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return data.broadcast === args[0]
    }
}