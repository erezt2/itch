import BlockInt from "../blockValue.js";

export default class Functions extends BlockInt {
    static input_types = [{
        isList: true,
        default: ["abs", "floor", "ceil", "round", "sqrt", "2^", "10^", "e^", "ln", "log"],
        variable: () => [],
     } ,num => (Number(num) || 0)];
    static display = "| of | ";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let arg = args[1]
        switch(args[0]) {
            case "abs": return Math.abs(arg)
            case "floor": return Math.floor(arg)
            case "ceil": return Math.ceil(arg)
            case "round": return Math.round(arg)
            case "sqrt": return Math.sqrt(arg)
            case "2^": return Math.pow(arg, 2)
            case "10^": return Math.pow(arg, 10)
            case "e^": return Math.pow(arg, Math.E)
            case "ln": return Math.log(arg)
            case "log": return Math.log10(arg)
            default: return arg 
        }
    }
}