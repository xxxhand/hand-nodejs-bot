const express = require('express')
const line = require('@line/bot-sdk')
const applicationIndex = require('./../applications/index')


const lineClient = new line.Client(lineConfig)
const handleLineEvent = event => {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null)
    }

    return lineClient.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
    })
}



function initMainRouter() {
    const mainRouter = express.Router()
    const lineConfig = {
        channelAccessToken: AppConfig.lineSettings.channelAccessToken,
        channelSecret: AppConfig.lineSettings.channelSecret
    }
    const lineApp = new applicationIndex.LineApplication()
    mainRouter.post('/linehook', line.middleware(lineConfig), (req, res) => {
        Promise.all(req.body.events.map(handleLineEvent))
        .then(x => res.json(x))
    })

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