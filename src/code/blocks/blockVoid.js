
export default class BlockVoid {
    static input_types = [];
    static display = "block";
    inputs;
    elementHTML;
    constructor(element) {
        this.elementHTML = element;
    }
    getNext(){
        let dom = this.elementHTML.children[2]
        if(dom === undefined) return null
        return dom["data-block"]
    }
    run() {
        this.next?.run()
    }
    getValue(index) {
        if(this.inputs[index] instanceof input_types[index]) return this.inputs[index];
        return input_types[index]();
    }
}

