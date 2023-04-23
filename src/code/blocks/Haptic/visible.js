import BlockVoid from "../blockVoid.js";

export default class Visible extends BlockVoid {
    static input_types = [{
        isList: true,
        default: ["hide", "show"],
        variable: ()=>[],
     }];
    static display = "visibility: |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        data.sprite.visible = args[0] === "show"
        return await super.run(data)
    }
}