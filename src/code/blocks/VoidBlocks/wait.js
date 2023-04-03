

const sleep = ms => new Promise(r => setTimeout(r, ms));

export default class Wait extends BlockVoid {
    static input_types = [Number];
    static display = "wait {0} secs";
    constructor() {

    }
    run() {
        sleep(this.getValue(0))
        super.run()
    }
}