import BlockContainer from "../blockContainer.js";

export default class ElseIf extends BlockContainer {
    static input_types = [Boolean];
    static display = "else if |";
    constructor(element) {
        super(element)
    }
    run(data) {
        let args = this.getValues(this.constructor.input_types, data)
        if(data["else"]) {
            if(args[0]) {
                let inside = this.getInside();
                if(inside !== null) data = inside.run(data)
            }
            data["else"] = !args[0];
        }
        return super.run(data);
    }
}