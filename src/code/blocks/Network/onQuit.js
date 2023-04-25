import BlockStart from "../blockStart.js";


export default class OnQuit extends BlockStart {
    static input_types = [];
    static display = "on quit server";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return await super.run(data)
    }
    async checkStart(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return data.stopConnection && data.selfObject.user === data.userStopped;
    }
}