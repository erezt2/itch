import blockValue from "../blockValue.js";

export default class GetTintSat extends blockValue {
    static input_types = [];
    static display = "tint saturation";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return data.owner.tint[1]
    }
}