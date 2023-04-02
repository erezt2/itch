
class BlockVoid {
    static input_types = [];
    static display = "block";
    next;
    inputs;
    constructor() {

    }
    run() {
        this.next?.run()
    }
    getValue(index) {
        if(this.inputs[index] instanceof input_types[index]) return this.inputs[index];
        return input_types[index]();
    }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

class Wait extends BlockVoid {
    static input_types = [Number];
    static display = "wait {0} secs";
    constructor() {

    }
    run() {
        sleep(this.getValue(0))
        super.run()
    }
}