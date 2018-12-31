const line = require('@line/bot-sdk')
const { WeatherRepository } = require('./../domain/repositories');

const lineConfig = {
    channelAccessToken: AppConfig.lineSettings.channelAccessToken,
    channelSecret: AppConfig.lineSettings.channelSecret
}
const lineClient = new line.Client(lineConfig)
const handleLineEvent = event => {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null)
    }

    console.log(`Query location: ${event.message.text}`);

    WeatherRepository.FindByLocation(event.message.text)
        .then(weatherObject => {
            const replyMessage = {
                type: 'text',
                text: ''
            }
            if (!weatherObject) {
                replyMessage.text = `Not found location ${event.message.text}`;
            } else {
                replyMessage.text = `${weatherObject.locationName}
                        ${weatherObject.description}
                        ${weatherObject.temperature}`;
            }

            return lineClient.replyMessage(event.replyToken, replyMessage);
        })
        .catch(err => {
            return Promise.reject(err);
        })
    // const weatherObject = await WeatherRepository.FindByLocation(event.message.text);
    // const replyMessage = {
    //     type: 'text',
    //     text: ''
    // }
    // if (!weatherObject) {
    //     replyMessage.text = `Not found location ${event.message.text}`;
    //     return lineClient.replyMessage(event.replyToken, replyMessage);
    // }

    // replyMessage.text = `${weatherObject.locationName}
    //                     ${weatherObject.description}
    //                     ${weatherObject.temperature}`;



    // return lineClient.replyMessage(event.replyToken, replyMessage)
}
module.exports = class LineAppication {

    preHandle(req, res, next) {
        req.body = JSON.stringify(req.body)
        next()
    }
    middleware() {
        return line.middleware(lineConfig)
    }
    finalHandle(req, res) {
        Promise
            .all(req.body.events.map(handleLineEvent))
            .then(x => res.json(x))
            .catch(e => {
                console.log(e);
                res.status(500).json({ message: 'Ops, exception' });
            })
    }
}