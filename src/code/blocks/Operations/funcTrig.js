import BlockInt from "../blockValue.js";

export default class FuncTrig extends BlockInt {
    static input_types = [{
        isList: true,
        default: ["sin", "cos", "tan", "asin", "acos", "atan"],
        variable: () => [],
     } ,num => (Number(num) || 0)];
    static display = "| ( | )";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let arg = args[1]
        switch(args[0]) {
            case "sin": return Math.sin(arg)
            case "cos": return Math.cos(arg)
            case "tan": return Math.tan(arg)
            case "asin": return Math.asin(arg)
            case "acos": return Math.acos(arg)
            case "atan": return Math.atan(arg)
            default: return arg 
        }
    }
}