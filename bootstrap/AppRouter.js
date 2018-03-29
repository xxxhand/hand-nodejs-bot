const express = require('express')
const line = require('@line/bot-sdk')
const applicationIndex = require('./../applications/index')



function initMainRouter() {
    const mainRouter = express.Router()
    const lineConfig = {
        channelAccessToken: AppConfig.lineSettings.channelAccessToken,
        channelSecret: AppConfig.lineSettings.channelSecret
    }
    const lineApp = new applicationIndex.LineApplication()
    mainRouter.post('/linehook', line.middleware(lineConfig), lineApp.finalHandle)

    mainRouter.all('/', (req, res) => {
        res.send('Hello world')
    })

    return mainRouter
}

function initApiRouter() {
    const apiRouter = express.Router()

    const helloApiApp = new applicationIndex.HelloApiApplication()
    apiRouter.get('/', helloApiApp.executeHello)

    return apiRouter
}

exports.mainRouter = initMainRouter()
exports.apiRouter = initApiRouter()