import BlockVoid from "../blockVoid.js";

export default class SetRotationMode extends BlockVoid {
    static input_types = [{
       isList: true,
       default: ["normal", "left-right", "none"],
       variable: ()=>[],
    }];
    static display = "rotation mode |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let arg = args[0]
        if(arg === "normal") data.owner.rotation_mode = 0
        else if(arg === "left-right") data.owner.rotation_mode = 1
        else data.owner.rotation_mode = 2

        return await super.run(data);
    }
}