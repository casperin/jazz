module.exports = (sequelize, Sequelize) => {
  const item = sequelize.define(
    'item',
    {
      id: {type: Sequelize.STRING, primaryKey: true},
      feedId: {type: Sequelize.INTEGER, allowNull: false},
      read: {type: Sequelize.BOOLEAN, defaultValue: false},
      author: {type: Sequelize.STRING, allowNull: false},
      link: {type: Sequelize.STRING, allowNull: false},
      title: {type: Sequelize.STRING, allowNull: false},
      description: {type: Sequelize.STRING, allowNull: false},
      pubdate: {type: Sequelize.DATE, allowNull: false}
    },
    {
      classMethods: {
        associate: () => {
          item.belongsTo(sequelize.model('feed'), {foreignKey: 'feedId', targetKey: 'id'})
        }
      }
    }
  )
  return item
}

