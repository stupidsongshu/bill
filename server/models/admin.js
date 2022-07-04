const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  return sequelize.define('admin', {
    account: {
      type: DataTypes.STRING(50),
      allowNull: false, 
      comment: '账户名'
    },
    phone: {
      type: DataTypes.STRING(20),
      comment: '手机号'
    },
    email: {
      type: DataTypes.STRING(255),
      comment: '邮箱'
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: '密码'
    },
    login_type: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      comment: '登录方式，0-未知，1-账户+密码，2-手机号+验证码，3-手机号+密码，4-邮箱+验证码，5-邮箱+密码'
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: '昵称'
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '头像'
    },
    status: {
      type: DataTypes.TINYINT(1).UNSIGNED,
      defaultValue: 1,
      allowNull: false,
      comment: '状态，0-无效，1-正常'
    }
  }, {
    sequelize,
    tableName: 't_admin',
    indexes: [
      { unique: true, fields: ['account'] },
      { unique: true, fields: ['phone'] },
      { unique: true, fields: ['email'] },
    ]
  })
}