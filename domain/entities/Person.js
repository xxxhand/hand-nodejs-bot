module.exports = class Person {
    constructor() {
        this.name = ''
        this.age = 0,
        this.gender = ''
    }
    checkLegality() {
        return new Promise((res, rej) => {
            if (!this.name || this.name.length === 0) {
                return rej({ message: 'name must fill'})
            }

            res()
        })
    }
}