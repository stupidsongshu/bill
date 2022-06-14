const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  return sequelize.define('deal', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '交易名称'
    },
    price: {
      type: DataTypes.DECIMAL(10, 2).UNSIGNED,
      allowNull: false,
      defaultValue: 0.00,
      comment: '单价'
    },
    amount: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '数量'
    },
    status: {
      type: DataTypes.TINYINT(1).UNSIGNED,
      defaultValue: 1,
      allowNull: false,
      comment: '状态，0-无效，1-正常'
    }
  }, {
    sequelize,
    tableName: 't_deal',
  })
}