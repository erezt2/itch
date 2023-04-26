import BlockVoid from "../blockVoid.js";
import global from "../../global.js"

export default class CreateClone extends BlockVoid {
    static input_types = [num => (Number(num) || 0)];
    static display = "create clone, action ID = |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if(args[0] in global.users) {
            data.owner.create_clone(args[0])
        }
        return await super.run(data)
    }
}