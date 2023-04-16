import BlockContainer from "../blockContainer.js";

export default class RepeatWhile extends BlockContainer {
    static input_types = [Boolean];
    static display = "repeat until |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)

        while (!args[0]) {
            let inside = this.getInside();
            if(inside !== null) data = await inside.run(data)
            if(data.key.canceled) break
            args = await this.getValues(this.constructor.input_types, data)
            await this.reschedule("loop")
        }
        return await super.run(data);
    }
}