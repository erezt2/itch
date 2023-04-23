import BlockVoid from "../blockVoid.js";

export default class SetScaleY extends BlockVoid {
    static input_types = [val => Number(val) || 0];
    static display = "set Y scale to |%";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        data.sprite.scale.y = args[0] / 100
        return await super.run(data);
    }
}