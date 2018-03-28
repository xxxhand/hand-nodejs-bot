const app = require('./../bootstrap/App')

const server = require('http').createServer(app()).listen(appConfig.port, appConfig.domain)
server.on('listening', () => console.log(`Server up on ${server.address().address}:${server.address().port}`))
server.on('error', err => {
    console.error(err)
    process.exit(1)
})