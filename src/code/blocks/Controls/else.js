import BlockContainer from "../blockContainer.js";

export default class Else extends BlockContainer {
    static input_types = [];
    static display = " else";
    constructor(element) {
        super(element)
    }
    run(data) {
        if(data["else"]) {
            let inside = this.getInside();
            if(inside !== null) data = inside.run(data)
        }
        data["else"] = false;
        return super.run(data);
    }
}