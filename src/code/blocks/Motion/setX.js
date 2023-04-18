import BlockVoid from "../blockVoid.js";

export default class SetX extends BlockVoid {
    static input_types = [num => (Number(num) || 0)];
    static display = "set X to |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        data.owner.x = args[0]
        return await super.run(data);
    }
}