import blockValue from "../blockValue.js";

export default class GetX extends blockValue {
    static input_types = [];
    static display = "X position";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return data.owner.x
    }
}