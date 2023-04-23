import blockValue from "../blockValue.js";

export default class GetScaleY extends blockValue {
    static input_types = [];
    static display = "get scale Y %";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return data.sprite.scale.y * 100
    }
}