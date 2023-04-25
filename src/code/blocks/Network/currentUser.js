import BlockInt from "../blockValue.js";

export default class CurrentUserID extends BlockInt {
    static input_types =  [];
    static display = "current user ID";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return data.user.userID
    }
}