const block_playground = document.getElementById("script-dragspace")

export default class BlockVoid {
    static input_types = [];
    static display = "block";
    inputs;
    elementHTML; // wrapper of the entire thing
    constructor(element) {
        this.elementHTML = element;
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
        if(this.constructor == BlockVoid){
            console.log("WARNING: USING BASE CLASS | %s", this.elementHTML.children[0].innerHTML)
        }
        this.getNext()?.run()
    }
    getValue(index) {
        if(this.inputs[index] instanceof input_types[index]) return this.inputs[index];
        return input_types[index]();
    }
}

