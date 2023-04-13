import BlockGeneric from "./blockGeneric.js"

export default class BlockStart extends BlockGeneric {
    // static input_types = [];
    // static display = "block";
    constructor(element) {
        super(element)
    }
    checkStart(data) {
        return false
    }
    getNext(){
        let dom = this.elementHTML.children[2]
        if(dom === undefined) return null
        return dom["data-block"]
    }
    getParent() {
        return null
    }
    async run(data) {
        if(this.constructor === BlockStart){
            console.log("WARNING: USING BASE CLASS | %s", this.elementHTML.children[0].innerHTML)
        }
        await this.reschedule()
        let p = this.getNext()
        if(p===null) return data
        return p.run(data)
    }
}

