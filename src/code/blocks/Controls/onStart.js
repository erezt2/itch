import BlockStart from "../blockStart.js";

export default class OnStart extends BlockStart {
    static input_types = [];
    static display = "on start";
    constructor(element) {
        super(element)
    }
    run(data) {
        let args = this.getValues(this.constructor.input_types, data)
        return super.run(data)
    }
    checkStart(data) {
        if(data.start) this.run(this.constructor.getDefaultData());
    }
}