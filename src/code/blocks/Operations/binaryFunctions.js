import BlockInt from "../blockValue.js";

export default class BinaryFunctions extends BlockInt {
    static input_types = [{
        isList: true,
        default: ["min", "max"],
        variable: () => [],
     }, num => (Number(num) || 0), num => (Number(num) || 0)];
    static display = "| ( |, | )";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let arg1 = args[1]
        let arg2 = args[1]
        switch(args[0]) {
            case "max": return Math.max(arg1, arg2)
            case "min": return Math.min(arg1, arg2)
            default: return arg1
        }
    }
}