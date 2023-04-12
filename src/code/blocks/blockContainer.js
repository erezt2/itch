import BlockGeneric from "./blockGeneric.js";

const block_playground = document.getElementById("script-dragspace")

export default class BlockContainer extends BlockGeneric {
    constructor(element) {
        super(element)
    }
    getParent() {
        let dom = this.getSelf().parentNode
        if(dom == block_playground) return null
        return dom["data-block"]
    }
    getInside() {
        let dom = this.getSelf().children[1].children[1]
        if(dom === undefined) return null
        return dom["data-block"]
    }
    getNext() {
        let dom = this.getSelf().children[3]
        if(dom === undefined) return null
        return dom["data-block"]
    }
    run(data) {
        if(this.constructor === BlockContainer){
            console.log("WARNING: USING BASE CLASS | %s", this.getSelf().children[0].innerHTML)
        }
        let p = this.getNext()
        if(p===null) return data
        return p.run(data)
    }
}
