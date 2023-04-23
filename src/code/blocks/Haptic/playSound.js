import BlockVoid from "../blockVoid.js";
import global from "../../global.js"


function getSounds() {
    return global.window.sprites[global.selected_sprite]?.soundDOMList.map(x=>x.lastChild.innerHTML) || []
}

export default class PlaySound extends BlockVoid {
    static input_types = [{
       isList: true,
       default: ["random\u200b"],
       variable: getSounds,
    }];
    static display = "play sound |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)

        if(args[0] === "random\u200b") {
            let list = data.owner.soundDOMList
            data.owner.playBlock(list[Math.floor(Math.random()*list.length)])
        }
        else {
            for(let dom of data.owner.soundDOMList){
                if(args[0] === dom.lastChild.innerHTML) {
                    data.owner.playBlock(dom)
                    break
                }
            }
        }

        return await super.run(data);
    }
}