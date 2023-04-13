import BlockContainer from "../blockContainer.js";

export default class RepeatWhile extends BlockContainer {
    static input_types = [Boolean];
    static display = "repeat until |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let inside = this.getInside();

        while (!args[0]) {
            if(inside !== null) data = await inside.run(data)
            args = await this.getValues(this.constructor.input_types, data)
        }
        return await super.run(data);
    }
}