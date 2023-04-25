import BlockStart from "../blockStart.js";


export default class OnJoin extends BlockStart {
    static input_types = [];
    static display = "on user join (new user = ID)";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return await super.run(data)
    }
    async checkStart(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return data.userConnection;
    }
}