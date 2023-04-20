import BlockRunnable from "./blockRunnable.js";

export default class BlockStart extends BlockRunnable {
    // static input_types = [];
    // static display = "block";
    constructor(element) {
        super(element)
    }
    async checkStart(data) {
        return false
    }
    getNext(){
        let dom = this.elementHTML.children[2]
        if(dom === undefined) return null
        return dom["data-block"]
    }
    // getParent() {
    //     return null
    // }
}

