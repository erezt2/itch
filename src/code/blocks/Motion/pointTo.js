import BlockVoid from "../blockVoid.js";

function test() {
    return ["1","2"]
}

export default class Move extends BlockVoid {
    static input_types = [{
       isList: true,
       default: [],
       variable: test,
    }];
    static display = "point to |";
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