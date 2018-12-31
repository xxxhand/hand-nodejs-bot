const Person = require('./../../domain/entities/Person');
const { WeatherRepository } = require('./../../domain/repositories');

module.exports = class HelloApiApplication {
    async executeHello(req, res) {
        try {
            // const p = new Person()
            // await p.checkLegality()
            // res.status(200).json({ result: p})
            const result = await WeatherRepository.GetAll();
            // console.log(JSON.stringify(result));
            res.status(200).json({ result: result });

        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }
}