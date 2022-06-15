const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  return sequelize.define('category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '分类名称'
    },
    type: {
      type: DataTypes.TINYINT(1).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '账单类型，0-不计入收支，1-支出，2-收入'
    },
    sort: {
      type: DataTypes.TINYINT(2).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '排序'
    },
    status: {
      type: DataTypes.TINYINT(1).UNSIGNED,
      defaultValue: 1,
      allowNull: false,
      comment: '状态，0-无效，1-正常'
    }
  }, {
    sequelize,
    tableName: 't_category',
  })
}