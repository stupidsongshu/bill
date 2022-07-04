const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  return sequelize.define('bill', {
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '用户id，关联到t_user'
    },
    account_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '账户id，关联到t_account'
    },
    deal_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '交易id，关联到t_account'
    },
    category_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '账单分类，关联到t_category'
    },
    money: {
      type: DataTypes.DECIMAL(10, 2).UNSIGNED,
      allowNull: false,
      defaultValue: 0.00,
      comment: '金额'
    },
    type: {
      type: DataTypes.TINYINT(1).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '账单类型，0-不计入收支，1-支出，2-收入'
    },
    pay_type: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '付款方式，当type为0时有意义，1-储蓄卡，2-信用卡，3-微信，4-支付宝，5-现金'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comment: '标题'
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comment: '备注'
    },
    status: {
      type: DataTypes.TINYINT(1).UNSIGNED,
      allowNull: false,
      defaultValue: 1,
      comment: '状态，0-无效，1-交易成功，2-交易失败'
    }
  }, {
    sequelize,
    tableName: 't_bill',
  })
}