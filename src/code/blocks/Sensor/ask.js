import BlockInt from "../blockValue.js";
const dialog = require("dialogs")()


export default class Sin extends BlockInt {
    static input_types = [String];
    static display = "ask | and wait";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        let answer 
        if (data.user.userID === 0) {
            answer = await new Promise(resolve => {
                dialog.prompt(args[0], answer => {
                    resolve(answer)
                })
            })
        }
        else {
            answer = await data.user.ask(args[0])
        }
        return answer || ""
    }
}