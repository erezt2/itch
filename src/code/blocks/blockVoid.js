import BlockGeneric from "./blockGeneric.js"

const block_playground = document.getElementById("script-dragspace")

export default class BlockVoid extends BlockGeneric {
    // static input_types = [];
    // static display = "block";
    constructor(element) {
        super(element)
    }
    getNext(){
        let dom = this.getSelf().children[2]
        if(dom === undefined) return null
        return dom["data-block"]
    }
    getParent() {
        let dom = this.getSelf().parentNode
        if(dom == block_playground) return null
        return dom["data-block"]
    }
    run(data) {
        if(this.constructor === BlockVoid){
            console.log("WARNING: USING BASE CLASS | %s", this.getSelf().children[0].innerHTML)
        }
        let p = this.getNext()
        if(p===null) return data
        return p.run(data)
    }
}

