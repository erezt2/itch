import BlockContainer from "../blockContainer.js";

export default class IfThen extends BlockContainer {
    static input_types = [Boolean];
    static display = "if | then";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if(args[0]) {
            let inside = this.getInside();
            if(inside !== null) data = await inside.run(data)
            if(data.return !== undefined) return data
            if(data.break) return data
            if(data.continue) return data
        }
        data["else"] = !args[0]
        return await super.run(data);
    }
}