import global from "../global.js"

var counter = 0
const block_playground = document.getElementById("script-dragspace")
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
            if(!(c.classList.contains("editable") ||
                c.classList.contains("selectable"))) continue;
            this.inputs.push(c)
        }
    }
    // getParent() {return null;}
    getParent() {
        let dom = this.elementHTML.parentNode
        if(dom.parentNode === block_playground) return null
        return dom["data-block"]
    }
    getAncestor() {
        let step = this;
        while(step.getParent() !== null) {
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
        if(data.selfObject !== undefined) {
            data = data.selfObject
            data = {
                local_variables: {}, sprite: data.sprite, 
                clone_id: data.clone_id, owner: data, user: data.user
            }
        }
        if (this.inputs.length !== input_types.length) throw "bad block build"
        let l = []
        for(let i=0; i<this.inputs.length; i++) {
            let dom = this.inputs[i]
            if(input_types[i].isList) {
                l.push(String(dom.firstChild.innerHTML))
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