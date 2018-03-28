const app = require('./../bootstrap/App')

app().listen(8080, err => {
    if (err) {
        console.error(err)
        return process.exit(0)
    }
    console.log(`Server up on port 8080`)
})

// const server = require('http').createServer(app()).listen(appConfig.port)
// server.on('listening', () => console.log(`Server up on ${server.address().address}:${server.address().port}`))
// server.on('error', err => {
//     console.error(err)
//     process.exit(1)
// })