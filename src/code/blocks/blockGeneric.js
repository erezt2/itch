import global from "../global.js"

export default class BlockGeneric {
    // static input_types = [];
    // static display = "block";
    elementHTML; // wrapper of the entire thing
    inputs;
    constructor(element) {
        this.elementHTML = "block_number_"+global.current_block_id;
        element.id = "block_number_"+global.current_block_id;
        global.current_block_id += 1
        let disp = element.children[0]
        this.inputs = []
        for(let c of disp.children) {
            if(!c.classList.contains("editable")) continue;
            c.id = "input_number_"+global.current_input_id;
            this.inputs.push(c.id)
            global.current_input_id += 1
        }
    }
    getSelf() {
        return document.getElementById(this.elementHTML)
    }
    getParent() {return null;}
    getAncestor() {
        let step = this;
        while(step.getParent()) {
            step = step.getParent()
        }
        return step
    }
    getValues(input_types, data) {
        if (this.inputs.length !== input_types.length) throw "bad block build"
        let l = []
        for(let i=0; i<this.inputs.length; i++) {
            let val;
            let dom =  document.getElementById(this.inputs[i])
            if(dom.children.length === 0) val = dom.innerHTML
            else val = dom.children[0]["data-block"].run(data)
            l.push(input_types[i](val))
        }
        return l;
    }
}