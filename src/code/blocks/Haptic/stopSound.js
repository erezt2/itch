import BlockVoid from "../blockVoid.js";
import global from "../../global.js"


function getSounds() {
    return global.window.sprites[global.selected_sprite]?.soundDOMList.map(x=>x.lastChild.innerHTML) || []
}

export default class StopSound extends BlockVoid {
    static input_types = [{
       isList: true,
       default: [],
       variable: getSounds,
    }];
    static display = "stop sound |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)

        for(let dom of data.owner.soundDOMList){
            if(args[0] === dom.lastChild.innerHTML) {
                data.owner.pauseBlock(dom)
                break
            }
        }

        return await super.run(data);
    }
}