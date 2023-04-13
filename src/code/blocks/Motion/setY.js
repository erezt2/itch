import BlockVoid from "../blockVoid.js";

export default class SetX extends BlockVoid {
    static input_types = [Number];
    static display = "set Y position to |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        data.owner.y = Math.round(args[0])
        return await super.run(data);
    }
}