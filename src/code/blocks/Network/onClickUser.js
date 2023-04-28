
import BlockStart from "../blockStart.js";


export default class OnStart extends BlockStart {
    static input_types = [];
    static display = "on sprite click (sets action ID)";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return await super.run(data)
    }
    async checkStart(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        return data.clickedOn && data.selfObject.sprite.getBounds().contains(...data.mousePosXY);
    }
}