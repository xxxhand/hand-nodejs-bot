const fs = require('fs')

module.exports = () => {
    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = 'local'
    }
    const configPath = `./appConfig.${process.env.NODE_ENV}.json`
    if (!fs.existsSync(configPath)) {
        throw new Error(`${configPath} does not exist`);
    }

    return JSON.parse(fs.readFileSync(configPath))
}
