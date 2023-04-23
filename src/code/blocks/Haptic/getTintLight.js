import blockValue from "../blockValue.js";

export default class GetTintHue extends blockValue {
    static input_types = [];
    static display = "tint lightness";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return data.owner.tint[2]
    }
}