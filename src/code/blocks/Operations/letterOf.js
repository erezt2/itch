import BlockInt from "../blockValue.js";

export default class LetterOf extends BlockInt {
    static input_types = [num => (Number(num) || 0), String];
    static display = "letter | of |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let s = args[1]
        let pos = parseInt(args[0] )
        if(pos <= 0 || pos > s.length) return ""
        return s[pos-1]
    }
}