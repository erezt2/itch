import BlockGeneric from "./blockGeneric.js"

const block_playground = document.getElementById("script-dragspace")

export default class BlockVoid extends BlockGeneric {
    // static input_types = [];
    // static display = "block";
    constructor(element) {
        super(element)
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
}

