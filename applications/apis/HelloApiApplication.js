
module.exports = class HelloApiApplication {
    executeHello(req, res) {
        res.status(200).json({ result: process.env.NODE_ENV })
    }
}