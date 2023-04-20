import BlockVoid from "../blockVoid.js";

export default class DeleteClone extends BlockVoid {
    static input_types = [];
    static display = "delete this clone";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if(data.owner.is_clone) data.owner.remove()
        return await super.run(data)
    }
}