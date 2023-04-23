import blockValue from "../blockValue.js";

export default class GetScaleX extends blockValue {
    static input_types = [];
    static display = "get scale X %";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return data.sprite.scale.x * 100
    }
}