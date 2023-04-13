import BlockGeneric from "./blockGeneric.js";

const block_playground = document.getElementById("script-dragspace")

export default class BlockValue extends BlockGeneric {
    constructor(element) {
        super(element)
    }
    getParent() {
        let dom = this.elementHTML.parentNode
        if(dom == block_playground) return null
        return dom.parentNode.parentNode["data-block"]
    }
}
