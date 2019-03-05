const mercury = require('@postlight/mercury-parser')

async function getLinkContent(url) {

    let parseResult = await mercury.parse(url)
    return parseResult
  }

  module.exports.getLinkContent = getLinkContent