const fs = require('fs')
const {pipe, pull} = require('generator-pull-stream')
const gpsUtil = require('generator-pull-stream/util')
const {fromUrl} = require('./util/feed')
const db = require('./db')

const feedOutput2Feed = (userId, tags = '') => output => {
  return {
    userId,
    tags,
    link: output[0].meta.link,
    title: output[0].meta.title,
    description: output[0].meta.description
  }
}

  /*
fs.readFile('./urls.txt', 'utf8', (err, urls) => {
  if (err) return console.log(err);
  const stream = pipe(
    urls.split('\n').filter(line => !!line),
    gpsUtil.map(line => ({
      url: line.split('"')[0],
      tags: line.split('"')[1] || ''
    })),
    gpsUtil.map(addFeed, {promise: true, ignoreError: true}),
    gpsUtil.tap()
  )

  pull(stream)
})
*/

const addFeed = ({url, tags}) => Promise.resolve(url)
  .then(fromUrl)
  .then(feedOutput2Feed(3, tags))
  .then(db.createFeed)
  .catch(err => console.log('ERROR', err))

