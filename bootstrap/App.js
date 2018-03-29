const express = require('express')
const bodyParser = require('body-parser')
const appConfig = require('./../shared/AppConfig')

global.Promise = require('bluebird')
global.AppConfig = appConfig()

const appRouter = require('./AppRouter')

module.exports = () => {
    
    

    const appInstance = express()
    appInstance.use(bodyParser.json({ limit: '50mb' }))
    appInstance.use(bodyParser.urlencoded({ extended: false }))
    appInstance.use('/', appRouter.mainRouter)
    appInstance.use('/api', appRouter.apiRouter)

    return appInstance
}
