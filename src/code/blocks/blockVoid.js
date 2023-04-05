const block_playground = document.getElementById("script-dragspace")

export default class BlockVoid {
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
            c.onclick = (event) => {event.stopPropagation()}
            this.inputs.push(c)
        }
    }
    getNext(){
        let dom = this.elementHTML.children[2]
        if(dom === undefined) return null
        return dom["data-block"]
    }
    getParent() {
        let dom = this.elementHTML.parentNode
        if(dom == block_playground) return null
        return dom["data-block"]
    }
    getAncestor() {
        let step = this;
        while(step.getParent()) {
            step = step.getParent()
        }
        return step
    }

    run() {
        if(this.constructor === BlockVoid){
            console.log("WARNING: USING BASE CLASS | %s", this.elementHTML.children[0].innerHTML)
        }
        this.getNext()?.run()
    }
    getValues(input_types) {
        if (this.inputs.length !== input_types.length) throw "bad block build"
        let l = []
        for(let i=0; i<this.inputs.length; i++) l.push(input_types[i](this.inputs[i].innerHTML))
        return l;
    }
}

