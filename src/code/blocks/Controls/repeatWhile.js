import BlockContainer from "../blockContainer.js";

export default class Repeat extends BlockContainer {
    static input_types = [Boolean];
    static display = "repeat while |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let inside = this.getInside();

        while (args[0]) {
            if(inside !== null) data = await inside.run(data)
            args = await this.getValues(this.constructor.input_types, data)
            await this.reschedule()
        }
        return await super.run(data);
    }
}