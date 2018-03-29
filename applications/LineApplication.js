const line = require('@line/bot-sdk')
const lineConfig = {
    channelAccessToken: AppConfig.lineSettings.channelAccessToken,
    channelSecret: AppConfig.lineSettings.channelSecret
}
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
module.exports = class LineAppication {

    bodyToString(req, res, next) {
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
    }
}