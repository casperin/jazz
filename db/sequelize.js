const path = require('path')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('jazz', 'jazz', 'jazz', {
  host: 'localhost',
  dialect: 'sqlite',
  pool: {max: 5, min: 0, idle: 10000},
  storage: path.join(__dirname, 'database.sqlite')
})

sequelize
  .authenticate()
  .then(() => console.log('Connection to db has been established successfully.'))
  .catch(err => console.log('Unable to connect to the database:', err))

module.exports = sequelize

