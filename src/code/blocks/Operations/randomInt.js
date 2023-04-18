import BlockInt from "../blockValue.js";

export default class RandomInt extends BlockInt {
    static input_types = [num => (Number(num) || 0), num => (Number(num) || 0)];
    static display = "random integer | to |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let low = parseInt(args[0])
        let high = parseInt(args[1])
        if(low>high) {
            let temp = low
            low = high
            high = temp
        }
        return Math.floor(low + Math.random() * (high - low + 1))
    }
}