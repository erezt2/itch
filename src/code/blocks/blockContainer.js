import BlockRunnable from "./blockRunnable.js";

const block_playground = document.getElementById("script-dragspace")

export default class BlockContainer extends BlockRunnable {
    constructor(element) {
        super(element)
    }
    getParent() {
        let dom = this.elementHTML.parentNode
        if(dom == block_playground) return null
        return dom["data-block"]
    }
    getInside() {
        let dom = this.elementHTML.children[1].children[1]
        if(dom === undefined) return null
        return dom["data-block"]
    }
    getNext() {
        let dom = this.elementHTML.children[3]
        if(dom === undefined) return null
        return dom["data-block"]
    }
}
