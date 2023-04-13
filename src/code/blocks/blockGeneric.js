import global from "../global.js"

export default class BlockGeneric {
    // static input_types = [];
    // static display = "block";
    elementHTML; // wrapper of the entire thing
    inputs;
    constructor(element) {
        this.elementHTML = element;
        let disp = element.children[0]
        this.inputs = []
        for(let c of disp.children) {
            if(!c.classList.contains("editable")) continue;
            this.inputs.push(c)
        }
    }
    getParent() {return null;}
    getAncestor() {
        let step = this;
        while(step.getParent()) {
            step = step.getParent()
        }
        return step
    } 
    reschedule() {
        return new Promise(resolve => setTimeout(resolve, 0))
    }
    async getValues(input_types, data) {
        if (this.inputs.length !== input_types.length) throw "bad block build"
        let l = []
        for(let i=0; i<this.inputs.length; i++) {
            let val;
            let dom = this.inputs[i]
            if(dom.children.length === 0) val = dom.innerHTML
            else val = await dom.children[0]["data-block"].run(data)
            l.push(input_types[i](val))
        }
        return l;
    }
}