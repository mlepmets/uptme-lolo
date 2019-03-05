const express = require('express')
const router = express.Router()
// const rssParser = require('rss-parser')
const rssURL = 'https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss'
const rssParser = require('../controllers/rssParser')
const mercuryParser = require('../controllers/mercuryController')



router.get('/', function (req, res, next) {

  rssParser.parseRSS(rssURL).then(data => {
    res.render('index', { feed: data })
  })
})
router.get('/article/:link', function (req, res, next) {
  let contentURL = req.params.link
  mercuryParser.getLinkContent(contentURL).then(data => {
    res.render('article', { article: data })
  })
})

module.exports = router