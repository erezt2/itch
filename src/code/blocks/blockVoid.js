import BlockRunnable from "./blockRunnable.js"

const block_playground = document.getElementById("script-dragspace")

export default class BlockVoid extends BlockRunnable {
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
    // getParent() {
    //     let dom = this.elementHTML.parentNode
    //     if(dom == block_playground) return null
    //     return dom["data-block"] 
    // }
    async run(data) {
        if(this.constructor === BlockVoid){
            console.log("WARNING: USING BASE CLASS | %s", this.elementHTML.children[0].innerHTML)
        }
        
        if(data.key.canceled) return data
        await this.reschedule()
        let p = this.getNext()
        if(p===null) return data
        return p.run(data)
    }
}

