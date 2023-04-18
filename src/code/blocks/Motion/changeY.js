import BlockVoid from "../blockVoid.js";

export default class ChangeX extends BlockVoid {
    static input_types = [num => (Number(num) || 0)];
    static display = "change Y by |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        data.owner.y += args[0]
        return await super.run(data);
    }
}