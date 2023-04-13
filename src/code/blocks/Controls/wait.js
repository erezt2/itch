import BlockVoid from "../blockVoid.js";



export default class Wait extends BlockVoid {
    static input_types = [Number];
    static display = "wait | secs";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        await new Promise(r => setTimeout(r, args[0]*1000))
        return await super.run(data)
    }
}