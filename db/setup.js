const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

fs.readdirSync(path.join(__dirname, 'models'))
  .map(file => path.join(__dirname, 'models', file))
  .map(require)
  .map(initModel => initModel(sequelize, Sequelize))
  .map(model => {
    model.sync({force: true})
    if (model.associate) model.associate()
  })

