import BlockVoid from "../blockVoid.js";

export default class SetTintHue extends BlockVoid {
    static input_types = [{
        isList: true,
        default: ["hue", "saturation", "lightness"],
        variable: ()=>[],
     }, val=>Number(val)||0];
    static display = "tint | = |%";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let index = 0;
        if(args[0] === "lightness") index = 2
        else if(args[0] === "saturation") index = 1

        let tint = data.owner.tint
        let arg = args[1]
        if(arg>100)arg=100
        if(arg<0)arg=0
        tint[index] = arg
        data.owner.tint = tint
        return await super.run(data)
    }
}