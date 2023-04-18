import BlockInt from "../blockValue.js";

export default class Constants extends BlockInt {
    static input_types = [{
        isList: true,
        default: ["π", "e", "ϕ", "inf"],
        variable: () => [],
     }];
    static display = "constant |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        switch(args[0]) {
            case "π": return Math.PI
            case "e": return Math.E
            case "ϕ": return 1.618033988749895
            case "inf": return 1/0
            default: return 0
        }
    }
}