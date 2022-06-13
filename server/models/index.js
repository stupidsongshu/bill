const { Sequelize, DataTypes } = require('sequelize')
const { dialect, dbname, username, password, host, port } = require('../config/database')

// sequelize 学习之路(示例代码)：https://www.136.la/tech/show-380302.html

// const sequelize = new Sequelize(`${dialect}://${username}:${password}@${host}:${port}/${dbname}`)
const sequelize = new Sequelize(dbname, username, password, {
  dialect,
  host,
  port,
  storage: `${__dirname}/log/database.${dialect}`,
  logging: (err) => {
    console.log(err)
  },
  timezone: '+08:00',
  define: {
    /**
     * 时间戳：
     * 默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段.
     * 这些字段会自动进行管理 - 每当你使用Sequelize 创建或更新内容时,这些字段都会被自动设置. 
     * createdAt 字段将包含代表创建时刻的时间戳,而 updatedAt 字段将包含最新更新的时间戳.
     * 
     * 注意： 这是在 Sequelize 级别完成的(即未使用 SQL触发器 完成). 
     * 这意味着直接 SQL 查询(例如,通过任何其他方式在不使用 Sequelize 的情况下执行的查询)将不会导致这些字段自动更新.
     */
    timestamps: true,
    underscored: true, // 字段以下划线（_）来分割（默认是驼峰命名风格）
    // paranoid: true, // 设置 paranoid 为 true 后，destroy() 删除数据时不会进行物理删除(但通过 destroy({ force: true }) 仍然可以物理删除)，而是设置 deletedAt 为当前时间
    createdAt: 'create_time',
    updatedAt: 'update_time',
    deletedAt: false,
  }
})

// ;(async () => {
//   try {
//     // 使用 .authenticate() 函数测试连接是否正常
//     await sequelize.authenticate()
//     console.log('Connection has been established successfully.')
//   } catch (error) {
//     console.error('Unable to connect to the database:', error)
//   }
// })();

// sequelize.define(
//   'test',
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true
//     }
//   }
// )

/**
 * sync({ force: true }) 和 sync({ alter: true }) 可能是破坏性操作. 
 * 因此,不建议将它们用于生产级软件中. 
 * 相反,应该在 Sequelize CLI 的帮助下使用高级概念 Migrations(迁移) 进行同步.
 */
// sequelize.sync() // 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// sequelize.sync({ force: true }) // 将创建表,如果表已经存在,则将其首先删除
// sequelize.sync({ alter: true }) // 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.

module.exports = {
  // TestModel: require('./test')(sequelize, DataTypes),
  BillModel: require('./bill')(sequelize, DataTypes),
  UserModel: require('./user')(sequelize, DataTypes),
  AccountModel: require('./account')(sequelize, DataTypes),
  DealModel: require('./deal')(sequelize, DataTypes),
  CategoryModel: require('./category')(sequelize, DataTypes),
}

// module.exports = {
//   sequelize
// }
