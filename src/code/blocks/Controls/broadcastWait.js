import BlockVoid from "../blockVoid.js";
import global from "../../global.js"


export default class Broadcast extends BlockVoid {
    static input_types = [String];
    static display = "broadcast | and wait";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let dat = {broadcast: args[0]}
        let list = []
        for(let sp of Object.values(global.window.sprites)) {
            list = list.concat(await sp.runAllBlocks(dat))
        }
        await Promise.all(list)
        return await super.run(data)
    }
}