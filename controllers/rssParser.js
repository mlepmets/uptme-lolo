const rssParser = require('rss-parser')
const fixify = require('fixify')

parser = new rssParser({
  customFields: {
    item: [
      ['media:content', 'mediaContent', { keepArray: true }],
      ['description', 'description']
    ]
  }
})
const fixifyOptions = {
  removeHTML: true,
  decodeURI: false,
  convertEntities: true,
  transcodingOptions: {
    transcodingPattern:
    {
      encode: 'utf8',
      decode: 'utf8'
    }
  }
}

async function parseRSS(url) {

  // rss-parser töötleb rssi ümber JS objektiks
  let feed = await parser.parseURL(url)

  let formattedFeed = {
    items: []
  }

  // Koostame objekti, millest andmeid kuvada
  for (i in feed.items) {

    item = {
      title: feed.items[i].title,
      // fixify.fix eemaldab() HTML tagid
      description: fixify.fix(feed.items[i].description, fixifyOptions),
      pubDate: feed.items[i].pubDate,
      isoDate: feed.items[i].isoDate,
      // encodeURIComponent() lingi edastamiseks mercury-parserile
      link: encodeURIComponent(feed.items[i].link)
    }

    // Kui kaasas on pilt, siis lisame selle objektile
    if (feed.items[i].mediaContent) {
      item.mediaContent = feed.items[i].mediaContent[0]["$"]["url"]
    }
    formattedFeed.items.push(item)
  }

  return formattedFeed
}
module.exports.parseRSS = parseRSS