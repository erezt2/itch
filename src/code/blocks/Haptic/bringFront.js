import BlockVoid from "../blockVoid.js";

export default class BringToFront extends BlockVoid {
    static input_types = [];
    static display = "bring to front";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        
        let sprite = data.sprite
        let parent = sprite.parent
        if (parent.children) {   
            for (let keyIndex in sprite.parent.children) {  
                if (sprite.parent.children[keyIndex] === sprite) {   
                    sprite.parent.children.splice(keyIndex, 1); 
                    break;      
                }    
            }   
            parent.children.push(sprite);
        }

        return await super.run(data);
    }
}