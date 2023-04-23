import BlockVoid from "../blockVoid.js";

export default class IndexTexture extends BlockVoid {
    static input_types = [val => Number(val) || 0];
    static display = "set texture index |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let arg = args[0]
        let list = data.owner.textureDOMList
        if(arg < 0) arg = list.length + arg
        if(arg < 0) return await super.run(data);
        if(arg >= list.length) return await super.run(data);
        data.owner.textureBlock = list[arg]
        return await super.run(data);
    }
}