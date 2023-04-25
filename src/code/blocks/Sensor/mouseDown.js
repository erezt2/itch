import BlockInt from "../blockValue.js";
import { key_list } from "../../user.js";


export default class Sin extends BlockInt {
    static input_types = [];
    static display = "mouse down?";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return data.user.mouseDown
    }
}