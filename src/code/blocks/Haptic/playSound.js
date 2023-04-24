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
        let list = data.owner.soundDOMList
        if(list.length === 0) return await super.run(data);
        if(args[0] === "random\u200b") {
            
            data.owner.playBlock(list[Math.floor(Math.random()*list.length)])
        }
        else {
            for(let dom of list){
                if(args[0] === dom.lastChild.innerHTML) {
                    data.owner.playBlock(dom)
                    break
                }
            }
        }

        return await super.run(data);
    }
}