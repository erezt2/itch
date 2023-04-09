import BlockVoid from "../blockVoid.js";

export default class Wait extends BlockVoid {
    static input_types = [Number];
    static display = "wait | secs";
    constructor(element) {
        super(element)
    }
    run(data) {
        let args = this.getValues(this.constructor.input_types, data)
        // console.log(this)
        setTimeout(()=>super.run(data), 1000*args[0])
    }
}