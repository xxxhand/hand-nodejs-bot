const line = require('@line/bot-sdk')
const lineConfig = {
    channelAccessToken: AppConfig.lineSettings.channelAccessToken,
    channelSecret: AppConfig.lineSettings.channelSecret
}
const lineClient = new line.Client(lineConfig)
const handleLineEvent = event => {
    if (event.type !== 'message' || event.message.type !== 'string') {
        return Promise.resolve(null)
    }

    return lineClient.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
    })
}
module.exports = class LineAppication {
    middleware(req, res, next) {
        console.log(req.body)
        return line.middleware(lineConfig)

        // return function(req, res, next) {
        //     console.log(req.body)
        //     next()
        // }
    }
    finalHandle(req, res) {
        Promise.all(req.body.events.map(handleLineEvent))
        .then(x => res.json(x))

        // res.json({tt:'rr'})
    }
}