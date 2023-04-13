
const { Worker } = require('worker_threads');

export default function createThread(func, args) {
    let worker = new Worker('./worker-thread.mjs', { type: "module" })
    return {
        thread: worker,
        promise: new Promise((resolve, reject) => {
            worker.onmessage = function(event) {
                resolve(event.data)
            }
            worker.postMessage({function: func, arguments: args} )
        })
    }  
}