import BlockVoid from "../blockVoid.js";
import global from "../../global.js"


function getTextures() {
    return global.window.sprites[global.selected_sprite]?.textureDOMList.map(x=>x.lastChild.innerHTML) || []
}

export default class SwitchTexture extends BlockVoid {
    static input_types = [{
       isList: true,
       default: ["random\u200b"],
       variable: getTextures,
    }];
    static display = "set texture to |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)

        if(args[0] === "random\u200b") {
            let list = data.owner.textureDOMList
            data.owner.textureBlock = list[Math.floor(Math.random()*list.length)]
        }
        else {
            for(let dom of data.owner.textureDOMList){
                if(args[0] === dom.lastChild.innerHTML) {
                    data.owner.textureBlock = dom
                    break
                }
            }
        }

        return await super.run(data);
    }
}