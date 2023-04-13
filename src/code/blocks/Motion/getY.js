import blockValue from "../blockValue.js";

export default class GetY extends blockValue {
    static input_types = [];
    static display = "Y position";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return data.owner.y
    }
}