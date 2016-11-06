const request = require('request')
const FeedParser = require('feedparser')

exports.fromUrl = url => new Promise((resolve, reject) => {
  console.log('start', url);
  const items = []
  const feedparser = new FeedParser()

  feedparser.on('error', reject)

  feedparser.on('readable', () => {
    let item;
    while(item = feedparser.read()) items.push(item)
    return items;
  });

  request.get(url, {rejectUnauthorized: false})
    .on('error', () => {
      console.log('error', url);
      reject()
    })
    .pipe(feedparser)
    .on('end', () => {
      console.log('end', url)
      resolve(items)
    })
})
