import BlockStart from "../blockStart.js";
import global from "../../global.js"

export default class Function extends BlockStart {
    static input_types = [];
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        await this.reschedule()
        if(this.elementHTML.dataset["re_switch"] === "true") {
            let owner = global.window.sprites[this.elementHTML.parentNode.id.slice(3)]
            data.owner = owner
            data.sprite = owner.sprite
            data.clone_id = owner.clone_id
            data.user = owner.user
        }
        data = await super.run(data)
        return data.return
    }
    async checkStart(data) {
        return false;
    }
}