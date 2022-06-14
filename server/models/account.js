const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  return sequelize.define('account', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '用户名'
    },
    phone: {
      type: DataTypes.STRING(20),
      comment: '手机号'
    },
    email: {
      type: DataTypes.STRING(255),
      comment: '邮箱'
    },
    status: {
      type: DataTypes.TINYINT(1).UNSIGNED,
      defaultValue: 1,
      allowNull: false,
      comment: '状态，0-无效，1-正常'
    }
  }, {
    sequelize,
    tableName: 't_account',
    indexes: [
      { unique: true, fields: ['phone'] },
      { unique: true, fields: ['email'] },
    ]
  })
}