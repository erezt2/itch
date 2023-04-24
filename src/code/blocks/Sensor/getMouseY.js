import blockValue from "../blockValue.js";
import global from "../../global.js"

export default class GetMouseY extends blockValue {
    static input_types = [];
    static display = "mouse y";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let y = data.user.mouse_pos.y
        if (y < 0) y = 0
        if (y >= global.window.height) y = global.window.height
        return Math.round(global.window.height / 2) - y
    }
}