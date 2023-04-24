import blockValue from "../blockValue.js";

export default class GetTint extends blockValue {
    static input_types = [{
        isList: true,
        default: ["hue", "saturation", "lightness"],
        variable: ()=>[],
     }];
    static display = "tint |%";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let index = 0;
        if(args[0] === "lightness") index = 2
        else if(args[0] === "saturation") index = 1
        return data.owner.tint[index]
    }
}