import blockValue from "../blockValue.js";

export default class RotatedHeight extends blockValue {
    static input_types = [];
    static display = "rotated height";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return data.owner.h
    }
}