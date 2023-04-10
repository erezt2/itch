import BlockContainer from "../blockContainer.js";

export default class RepeatUntil extends BlockContainer {
    static input_types = [Boolean];
    static display = "repeat until |";
    constructor(element) {
        super(element)
    }
    run(data) {
        let args = this.getValues(this.constructor.input_types, data)
        let inside = this.getInside();

        while (!args[0]) {
            if(inside !== null) data = inside.run(data)
            args = this.getValues(this.constructor.input_types, data)
        }
        return super.run(data);
    }
}