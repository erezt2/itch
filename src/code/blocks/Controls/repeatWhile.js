import BlockContainer from "../blockContainer.js";

export default class Repeat extends BlockContainer {
    static input_types = [Boolean];
    static display = "repeat while |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        
        while (args[0]) {
            data.continue = false
            let inside = this.getInside();
            if(inside !== null) data = await inside.run(data)
            if(data.key.canceled) break
            if(data.return !== undefined) return data
            if(data.break) break
            args = await this.getValues(this.constructor.input_types, data)
            await this.reschedule("loop")
        }
        data.continue = false
        data.break = false
        return await super.run(data);
    }
}