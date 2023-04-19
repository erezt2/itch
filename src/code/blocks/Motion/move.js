import BlockVoid from "../blockVoid.js";

export default class Move extends BlockVoid {
    static input_types = [num => (Number(num) || 0)];
    static display = "move | units";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        data.owner.x += args[0] * Math.cos(data.owner.rotation)
        data.owner.y -= args[0] * Math.sin(data.owner.rotation)
        return await super.run(data);
    }
}