import BlockVoid from "../blockVoid.js";

export default class ChangeScaleX extends BlockVoid {
    static input_types = [val => Number(val) || 0];
    static display = "change X scale by |%";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        data.sprite.scale.x += args[0] / 100
        return await super.run(data);
    }
}