
const { parentPort, workerData } = require('worker_threads');
// import BlockGeneric from './blocks/blockGeneric.js';

console.log(workerData)
console.log(document.querySelector("p"))

function sayHello(data) {
    sleep(1000)
    for(let i=0; i<10; i++) {
        sleep(500)
        console.log(i+1)
    }
    return 12345
}

async function runBlock(data) {
    let {obj, input} = data

    return document.getElementById(obj)["data-block"].run(input)
}

const function_map = {
    "hello": sayHello,
    "run block": runBlock,
}

parentPort.onmessage = async function (event) {
    data = event.data

    let ret = await function_map[data["function"]](data["arguments"])

    parentPort.postMessage(ret)
    parentPort.close()
}
