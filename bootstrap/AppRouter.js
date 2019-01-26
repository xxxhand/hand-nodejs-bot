const express = require('express')
const applicationIndex = require('./../applications/index')



function initMainRouter() {
    const mainRouter = express.Router()

    const lineApp = new applicationIndex.LineApplication()
    mainRouter.post('/linehook', lineApp.preHandle, lineApp.middleware(), lineApp.finalHandle)

    mainRouter.all('/', (req, res) => res.send('Hello world'))

    return mainRouter
}

function initApiRouter() {
    const apiRouter = express.Router()

    const parkingApiApp = applicationIndex.ParkingApiApplication;
    apiRouter.route('/parkings').post(parkingApiApp.findByRoadName);

    const helloApiApp = new applicationIndex.HelloApiApplication()
    apiRouter.get('/', helloApiApp.executeHello)

    return apiRouter
}

exports.mainRouter = initMainRouter()
exports.apiRouter = initApiRouter()