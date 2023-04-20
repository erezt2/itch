import BlockVoid from "../blockVoid.js";
import global from "../../global.js"
import resetPlayground from "../../buttons-handle.js";

export default class Move extends BlockVoid {
    static input_types = [{
       isList: true,
       default: ["totally", "all", "this sprite", "this instance", "this thread"],
       variable: ()=>[],
    }];
    static display = "stop |";
    constructor(element) {
        super(element)
    }
    async run(data) {
        let args = await this.getValues(this.constructor.input_types, data)
        if(args[0] === "totally") {
            resetPlayground()
        }
        else if(args[0] === "all") {
            for(let key of global.keys) {
                if(key === data.key) continue
                key.cancel()
            }
        }
        else if(args[0] === "this sprite") {
            if(data.owner.is_clone) this.owner.parent.stopAll(data.key)
            else data.owner.stopAll(data.key)
        }
        else if(args[0]==="this instance"){
            data.owner.stopSelf(data.key)
        }
        else {
            data.key.cancel()
        }

        return await super.run(data);
    }
}