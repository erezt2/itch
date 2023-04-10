import BlockVoid from "../blockVoid.js";

export default class ConsoleLog extends BlockVoid {
    static input_types = [val => val];
    static display = "console log |";
    constructor(element) {
        super(element)
    }
    run(data) {
        let args = this.getValues(this.constructor.input_types, data)
        console.log(args[0])
        return super.run(data)
    }
}