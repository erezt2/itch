export default class BlockGeneric {
    // static input_types = [];
    // static display = "block";
    elementHTML; // wrapper of the entire thing
    inputs;
    constructor(element) {
        this.elementHTML = element;
        let disp = this.elementHTML.children[0]
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

    run() {
        if(this.constructor === BlockGeneric){
            console.log("WARNING: USING BASE CLASS | %s", this.elementHTML.children[0].innerHTML)
        }
        this.getNext()?.run()
    }
    getValues(input_types) {
        if (this.inputs.length !== input_types.length) throw "bad block build"
        let l = []
        console.log("AA")
        for(let i=0; i<this.inputs.length; i++) {
            let val;
            if(this.inputs[i].children.length === 0) val = this.inputs[i].innerHTML
            else val = this.inputs[i].children[0]["data-block"].run()
            l.push(input_types[i](val))
        }
        return l;
    }
}