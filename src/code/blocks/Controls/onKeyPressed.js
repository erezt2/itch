import BlockStart from "../blockStart.js";
import { key_list } from "../../user.js";

const keys = Object.keys(key_list)

export default class OnStart extends BlockStart {
    static input_types = [{
        isList: true,
        default: keys,
        variable: ()=>[],
    }];
    static display = "on key | press";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return await super.run(data)
    }
    async checkStart(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if (data.keyDown === undefined) return;
        return data.keyDown.user === data.selfObject.user && data.keyDown.key === key_list[args[0]]
    }
}