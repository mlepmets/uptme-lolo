const express = require('express')
const router = express.Router()
// const rssParser = require('rss-parser')
const rssURL = 'https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss'
const rssParser = require('../controllers/rssParser')
const mercury = require('@postlight/mercury-parser')
// parser = new rssParser({
//   customFields: {
//     item: [
//       ['media:content', 'mediaContent', { keepArray: true }],
//       ['description', 'description']
//     ]
//   }
// })
// async function getRSS(url) {
//   let feed = await parser.parseURL(url)
//   return feed
// }
async function getLinkContent(url) {
  // await Mercury.parse(url).then(result => {
  //   return result
  // });
  let parseResult = await mercury.parse(url)
  return parseResult
}

// let rssData = getRSS(rssURL).then(data => {
//   return data
// })

router.get('/', function (req, res, next) {
  // res.render('index', { feed: rssData })

  rssParser.parseRSS(rssURL).then(data => {
    res.render('index', { feed: data })
  })
})
router.get('/article/:link', function (req, res, next) {
  let contentURL = req.params.link
  getLinkContent(contentURL).then(data => {
    res.render('article', { article: data })
  })
})

module.exports = router