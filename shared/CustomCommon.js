
exports.sleep = timeInMills => {
    return new Promise((res) => {
        setTimeout(() => {
            res()
        }, timeInMills)
    })
}