const fs = require('fs')
const path = require('path')
const sequelize = require('./sequelize')
const xtend = require('xtend')

const models = fs
  .readdirSync(path.join(__dirname, 'models'))
  .map(file => sequelize.import(path.join(__dirname, 'models', file)))
  .reduce((models, model) => xtend(models, {[model.name]: model}), {})

module.exports = models

