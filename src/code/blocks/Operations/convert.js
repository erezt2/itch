import BlockInt from "../blockValue.js";

export default class Convert extends BlockInt {
    static input_types = [{
        isList: true,
        default: ["boolean", "number", "string"],
        variable: () => [],
     }, val=>val];
    static display = "| |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let arg = args[1]
        switch(args[0]) {
            case "boolean": return Boolean(arg)
            case "number": return Number(arg) || 0
            case "string": return String(arg)
            default: return arg 
        }
    }
}