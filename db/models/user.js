module.exports = (sequelize, Sequelize) =>
  sequelize.define(
    'user',
    {
      email: {type: Sequelize.STRING, allowNull: false, unique: true},
      password: {type: Sequelize.STRING, allowNull: false}
    }
  )
