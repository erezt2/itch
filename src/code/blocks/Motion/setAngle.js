import BlockVoid from "../blockVoid.js";

export default class SetAngle extends BlockVoid {
    static input_types = [num => (Number(num) || 0)];
    static display = "set angle to |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        data.sprite.angle = (args[0] % 360)
        return await super.run(data);
    }
}