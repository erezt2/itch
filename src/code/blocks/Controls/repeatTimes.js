import BlockContainer from "../blockContainer.js";

export default class RepeatTimes extends BlockContainer {
    static input_types = [Number];
    static display = "repeat | times";
    constructor(element) {
        super(element)
    }
    run(data) {
        let args = this.getValues(this.constructor.input_types, data)
        let inside = this.getInside();
        for(let i=0; i<args[0]; i++){
            if(inside !== null) data = inside.run(data)
        }
        return super.run(data);
    }
}