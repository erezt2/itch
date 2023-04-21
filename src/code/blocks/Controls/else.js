import BlockContainer from "../blockContainer.js";

export default class Else extends BlockContainer {
    static input_types = [];
    static display = " else";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if(data["else"]) {
            let inside = this.getInside();
            if(inside !== null) data = await inside.run(data)
            if(data.return !== undefined) return data
            if(data.break) return data
            if(data.continue) return data
        }
        data["else"] = false;
        return await super.run(data);
    }
}