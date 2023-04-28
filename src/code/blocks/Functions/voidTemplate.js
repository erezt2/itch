import BlockVoid from "../blockVoid.js";

export default class VoidTemplate extends BlockVoid {
    input_types = [];
    function_block;
    constructor(element, function_block, input_types) {
        super(element)
        this.function_block = function_block
        this.input_types = input_types
    }
    async run(data) {
        let args = await this.getValues(this.input_types, data)
        let data_copy = Object.assign({}, data)
        data_copy.inputs = args
        await this.function_block["data-block"].run(data_copy)
        return await super.run(data)
    }
}