

function sleep(ms) {
    const start = Date.now();
    while (Date.now() - start < ms);
}

function sayHello(data) {
    sleep(1000)
    for(let i=0; i<10; i++) {
        sleep(500)
        console.log(i+1)
    }
    return 12345
}

const function_map = {
    "hello": sayHello
}

self.onmessage = function (event) {
    data = event.data

    let ret = function_map[data["function"]](data["arguments"])

    self.postMessage(ret)
    self.close();
}
 