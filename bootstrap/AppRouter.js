const path = require('path')
const fs = require('fs-extra')
const ejs = require('ejs')
const express = require('express')
const applicationIndex = require('./../applications/index')


const _VIEW_PATH = '../applications/views'

function initMainRouter() {
    const mainRouter = express.Router()

    const lineApp = new applicationIndex.LineApplication()
    mainRouter.post('/linehook', lineApp.preHandle, lineApp.middleware(), lineApp.finalHandle)

    mainRouter
        .get('/line-io/register', async (req, res) => {
            try {
                let q = {};
                if (req.query['liff.state'] !== void 0) {
                    const qryAry = req.query['liff.state'].replace('?', '').split('&');
                    qryAry.forEach(x => {
                        const k = x.split('=');
                        q[k[0]] = k[1] 
                    })
                } else {
                    q = req.query
                }
                
                console.log(q)
                const f = await ejs.renderFile(path.resolve(__dirname, `${_VIEW_PATH}/register.ejs`), { iam: q.iam })
                res.send(f.toString())
            } catch (ex) {
                console.log(ex)
                res.send(`I am fail`)
            }
        })
    mainRouter.all('/', (req, res) => res.send('Hello world'))

    return mainRouter
}

function initApiRouter() {
    const apiRouter = express.Router()

    const parkingApiApp = applicationIndex.ParkingApiApplication;
    apiRouter.route('/parkings').post(parkingApiApp.findByRoadName);

    const dialogFlowApiApp = applicationIndex.DialogFlowApiApplication;
    apiRouter.route('/fulfillments/parkings').post(dialogFlowApiApp.findByRoadName);

    const helloApiApp = new applicationIndex.HelloApiApplication()
    apiRouter.get('/', helloApiApp.executeHello)

    return apiRouter
}

exports.mainRouter = initMainRouter()
exports.apiRouter = initApiRouter()