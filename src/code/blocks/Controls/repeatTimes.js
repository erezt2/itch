import BlockContainer from "../blockContainer.js";

function _number(num) {
    let number
}

export default class RepeatTimes extends BlockContainer {
    static input_types = [num => (Number(num) || 0)];
    static display = "repeat | times";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        
        for(let i=0; i<args[0]; i++){
            data.continue = false
            let inside = this.getInside();
            if(inside !== null) data = await inside.run(data)
            if(data.key.canceled) break
            if(data.return !== undefined) return data
            if(data.break) break
            await this.reschedule("loop")
        }
        data.continue = false
        data.break = false
        return await super.run(data);
    }
}