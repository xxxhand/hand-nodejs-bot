const Person = require('./../../domain/entities/Person')

module.exports = class HelloApiApplication {
    async executeHello(req, res) {
        try {
            const p = new Person()
            await p.checkLegality()
            res.status(200).json({ result: p})
        } catch (e) {
            res.status(400).json({message: e.message})
        }
    }
}