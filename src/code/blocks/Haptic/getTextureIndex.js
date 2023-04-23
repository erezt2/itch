import blockValue from "../blockValue.js";

export default class GetTextureIndex extends blockValue {
    static input_types = [];
    static display = "texture index";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let pos = -1;
        let textlist = data.owner.textureDOMList
        for(let dom of textlist){
            pos += 1
            if(data.owner.selected_texture === dom.lastChild.innerHTML) {
                return pos
            }
        }
        return undefined
    }
}