const models = require('./models')
const db = {}

const get = x => x.dataValues
const getAll = xs => xs.map(get)

/**
 * User
 */
db.createUser = user => models.user.create(user)
db.getUser = id => models.user.findById(id).then(get)
db.getUsers = () => models.user.findAll().then(getAll)
db.findUserWhere = (key, value) => models.user.findOne({where: {[key]: {$eq: value}}}).then(get)
db.findUsersWhere = (key, value) => models.user.findAll({where: {[key]: {$eq: value}}}).then(getAll)

/**
 * Feeds
 */
db.createFeed = models.feed.create
db.getFeeds = () => models.feed.findAll().then(get)

module.exports = db
