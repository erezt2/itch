

class Key {
    canceled = false
    reject = null
    setReject(reject) {
        this.reject = reject
    }
    cancel(data) {
        this.canceled = true
        this.reject(data)
    }
    isCanceled() {
        return this.canceled
    }
}





function createKey()