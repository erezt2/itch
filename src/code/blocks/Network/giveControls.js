import BlockVoid from "../blockVoid.js";
import global from "../../global.js"

export default class GiveControls extends BlockVoid {
    static input_types = [num => (Number(num) || 0)];
    static display = "give controls to user ID = |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if(args[0] in global.users) {
            let user = global.users[args[0]]
            data.user = user
            data.owner.user = user
        }
        return await super.run(data)
    }
}