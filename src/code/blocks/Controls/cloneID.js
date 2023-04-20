import BlockInt from "../blockValue.js";

export default class CloneID extends BlockInt {
    static input_types = [];
    static display = "clone ID";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return data.owner.clone_id
    }
}