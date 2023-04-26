import BlockInt from "../blockValue.js";

export default class NewUser extends BlockInt {
    static input_types =  [];
    static display = "action user ID";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return data.actionUserID
    }
}