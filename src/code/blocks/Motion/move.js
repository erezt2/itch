import BlockVoid from "../blockVoid.js";

export default class Move extends BlockVoid {
    static input_types = [Number];
    static display = "move | units";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        data.owner.x += args[0] * Math.cos(data.sprite.rotation)
        data.owner.y += args[0] * Math.sin(data.sprite.rotation)
        return await super.run(data);
    }
}