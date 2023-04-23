import BlockVoid from "../blockVoid.js";

export default class NextTexture extends BlockVoid {
    static input_types = [];
    static display = "next texture";
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
                break
            }
        }
        data.owner.textureBlock = textlist[(pos+1) % textlist.length]

        return await super.run(data);
    }
}