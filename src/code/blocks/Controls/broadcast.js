import BlockVoid from "../blockVoid.js";
import global from "../../global.js"


export default class Broadcast extends BlockVoid {
    static input_types = [String];
    static display = "broadcast |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let dat = {broadcast: args[0]}
        for(let sp of Object.values(global.window.sprites)) {
            await sp.runAllBlocks(dat)
        }
        return await super.run(data)
    }
}