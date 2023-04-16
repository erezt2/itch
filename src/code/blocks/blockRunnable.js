import BlockGeneric from "./blockGeneric.js"

const block_playground = document.getElementById("script-dragspace")

export default class BlockRunnable extends BlockGeneric {
    // static input_types = [];
    // static display = "block";
    constructor(element) {
        super(element)
    }
    async run(data) {
        if(this.constructor === BlockRunnable){
            console.log("WARNING: USING BASE CLASS | %s", this.elementHTML.children[0].innerHTML)
        }
        
        if(data.key.canceled) return data
        await this.reschedule()
        let p = this.getNext()
        if(p===null) return data
        return p.run(data)
    }
}

