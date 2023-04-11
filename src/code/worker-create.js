


export default function createThread(func, args) {
    let worker = new Worker('./code/worker-thread.js')
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