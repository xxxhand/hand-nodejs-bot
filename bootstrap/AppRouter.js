const express = require('express')
const applicationIndex = require('./../applications/index')

function initMainRouter() {
    const mainRouter = express.Router()

    const lineApp = new applicationIndex.LineApplication()
    mainRouter.post('/linehook', lineApp.middleware, lineApp.finalHandle)

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