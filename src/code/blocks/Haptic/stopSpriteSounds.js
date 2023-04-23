import BlockVoid from "../blockVoid.js";

export default class StopSpriteSounds extends BlockVoid {
    static input_types = [];
    static display = "stop sprite sounds";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)

        for(let dom of data.owner.soundDOMList){
            data.owner.pauseBlock(dom)
        }

        return await super.run(data);
    }
}