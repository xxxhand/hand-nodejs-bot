const express = require('express')
const bodyParser = require('body-parser')
const appRouter = require('./AppRouter')
const fs = require('fs')

module.exports = () => {
    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = 'local'
    }
    const configPath = `./appConfig.${process.env.NODE_ENV}.json`
    if (!fs.existsSync(configPath)) {
        throw new Error(`${configPath} does not exist`);
    }
    global.appConfig = JSON.parse(fs.readFileSync(configPath))

    const appInstance = express()
    appInstance.use(bodyParser.json({ limit: '50mb' }))
    appInstance.use(bodyParser.urlencoded({ extended: false }))
    appInstance.use('/', appRouter.mainRouter)
    appInstance.use('/api', appRouter.apiRouter)

    appInstance.listen(8080)
    return appInstance
}