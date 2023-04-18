import BlockInt from "../blockValue.js";

export default class Convert extends BlockInt {
    static input_types = [num => (Number(num) || 0), {
        isList: true,
        default: ["boolean", "number", "string"],
        variable: () => [],
     }];
    static display = "convert | to |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let arg = args[0]
        switch(args[1]) {
            case "boolean": return Boolean(arg)
            case "number": return Number(arg) || 0
            case "string": return String(arg)
            default: return arg 
        }
    }
}