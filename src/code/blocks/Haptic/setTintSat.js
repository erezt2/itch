import BlockVoid from "../blockVoid.js";

export default class SetTintSat extends BlockVoid {
    static input_types = [val=>Number(val)||0];
    static display = "tint saturation = |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let tint = data.owner.tint
        let arg = args[0]
        if(arg>100)arg=100
        if(arg<0)arg=0
        tint[1] = arg
        data.owner.tint = tint
        return await super.run(data)
    }
}