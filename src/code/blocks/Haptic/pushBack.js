import BlockVoid from "../blockVoid.js";

export default class PushBack extends BlockVoid {
    static input_types = [val => Number(val) || 0];
    static display = "push back | layers";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let arg = parseInt(args[0])
        let sprite = data.sprite
        let parent = sprite.parent
        if (parent.children) {   
            for (let keyIndex in sprite.parent.children) {  
                if (sprite.parent.children[keyIndex] === sprite) {   
                    sprite.parent.children.splice(keyIndex, 1);
                    let pos = keyIndex - arg
                    if(pos < 0) pos = 0
                    sprite.parent.children.splice(pos, 0, sprite);
                    break;      
                }    
            }   
        }
        return await super.run(data);
    }
}