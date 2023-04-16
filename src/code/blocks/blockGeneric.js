import global from "../global.js"

var counter = 0
export default class BlockGeneric {
    // static input_types = [];
    // static display = "block";
    elementHTML; // wrapper of the entire thing
    inputs;
    constructor(element) {
        this.elementHTML = element;
        let disp = element.children[0]
        this.inputs = []
        for(let c of disp.children) {
            if(!c.classList.contains("editable")) continue;
            this.inputs.push(c)
        }
    }
    getParent() {return null;}
    getAncestor() {
        let step = this;
        while(step.getParent()) {
            step = step.getParent()
        }
        return step
    } 
    reschedule(context) {
        if(context === "loop" && global.settings.reloadLoopAlways) {
            return new Promise(resolve => setTimeout(resolve, 0))
        }
        let l = global.settings.reloadCounter
        counter += 1
        if(counter < l) return (async ()=>{})();
        if(Math.random() >= global.settings.reloadChance) return (async ()=>{})();
        counter = 0
        return new Promise(resolve => setTimeout(resolve, 0))
    }
    async getValues(input_types, data) {
        if (this.inputs.length !== input_types.length) throw "bad block build"
        let l = []
        for(let i=0; i<this.inputs.length; i++) {
            let dom = this.inputs[i]
            if(input_types[i].isList) {
                l.push(String(input_types[i](dom.innerHTML)))
                continue
            }
            let val;
            if(dom.children.length === 0) val = dom.innerHTML
            else val = await dom.children[0]["data-block"].run(data)
            l.push(input_types[i](val))
        }
        return l;
    }
}