module.exports = (sequelize, Sequelize) => {
  const feed = sequelize.define(
    'feed',
    {
      userId: {type: Sequelize.INTEGER, allowNull: false},
      link: {type: Sequelize.STRING, allowNull: false},
      title: {type: Sequelize.STRING, allowNull: false},
      description: Sequelize.STRING,
      tags: Sequelize.STRING,
      star: {type: Sequelize.BOOLEAN, defaultValue: false}
    },
    {
      classMethods: {
        associate: () => {
          feed.belongsTo(sequelize.model('user'), {foreignKey: 'userId', targetKey: 'id'})
        }
      }
    }
  )
  return feed
}

