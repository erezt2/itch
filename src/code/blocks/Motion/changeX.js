import BlockVoid from "../blockVoid.js";

export default class ChangeX extends BlockVoid {
    static input_types = [Number];
    static display = "change X by |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        data.owner.x += args[0]
        return await super.run(data);
    }
}