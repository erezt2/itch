import blockValue from "../blockValue.js";
import global from "../../global.js"

export default class GetMouseX extends blockValue {
    static input_types = [];
    static display = "mouse x";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let x = global.mouse_pos.x
        if (x < 0) x = 0 
        if (x >= global.window.width) x = global.window.width
        return x - Math.round(global.window.width / 2)
    }
}