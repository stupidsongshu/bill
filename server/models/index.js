const { Sequelize, DataTypes } = require('sequelize')
const { dialect, database, username, password, host, port } = require('../config/database')

// sequelize 学习之路(示例代码)：https://www.136.la/tech/show-380302.html
// https://github.com/sequelize/sequelize/blob/main/src/sequelize.js

// const sequelize = new Sequelize(`${dialect}://${username}:${password}@${host}:${port}/${database}`)
const sequelize = new Sequelize(database, username, password, {
  dialect, // the sql dialect of the database, currently supported: 'mysql', 'sqlite', 'postgres', 'mssql'

  host, // custom host; default: localhost

  port, // custom port; default: dialect default

  logging: (err) => console.log(err), // disable logging or provide a custom logging function; default: console.log

  /**
   * you can also pass any dialect options to the underlying dialect library
   * default is empty, currently supported: 'mysql', 'postgres', 'mssql'
   * 
   * https://www.npmjs.com/package/mysql#connection-options
   */
  // dialectOptions: {
  //   socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
  //   supportBigNumbers: true,
  //   bigNumberStrings: true
  // },

  // storage: `${__dirname}/log/database.${dialect}`, // the storage engine for sqlite, default ':memory:'

  /**
   * The timezone used when converting a date from the database into a JavaScript date.
   * The timezone is also used to SET TIMEZONE when connecting to the server, to ensure that the result of NOW, CURRENT_TIMESTAMP and other time related functions have in the right timezone.
   * For best cross platform performance use the format +/-HH:MM.
   * Will also accept string versions of timezones supported by Intl.Locale (e.g. 'America/Los_Angeles');
   * this is useful to capture daylight savings time changes.
   */
  timezone: '+08:00', // default: '+00:00'

  /**
   * Specify options, which are used when sequelize.define is called.
   * The following example:
   *   define: { timestamps: false }
   * is basically the same as:
   *   Model.init(attributes, { timestamps: false });
   *   sequelize.define(name, attributes, { timestamps: false });
   * so defining the timestamps for each model will be not necessary
   */
  define: {
    // dialectOptions: {
    //   collate: 'utf8_general_ci'
    // },

    // charset: 'utf8',

    underscored: true, // 字段以下划线（_）来分割（默认是驼峰命名风格）

    // 默认情况下,当未提供表名时,Sequelize 会自动将模型名复数并将其用作表名. 
    freezeTableName: true,

    /**
     * 时间戳：
     * 默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段.
     * 这些字段会自动进行管理 - 每当你使用Sequelize 创建或更新内容时,这些字段都会被自动设置. 
     * createdAt 字段将包含代表创建时刻的时间戳,而 updatedAt 字段将包含最新更新的时间戳.
     * 
     * 注意： 这是在 Sequelize 级别完成的(即未使用 SQL触发器 完成). 
     * 这意味着直接 SQL 查询(例如,通过任何其他方式在不使用 Sequelize 的情况下执行的查询)将不会导致这些字段自动更新.
     */
    timestamps: true, // 启用时间戳
    createdAt: 'create_time',
    updatedAt: 'update_time',
    deletedAt: false, // 禁用
    // paranoid: true, // 设置 paranoid 为 true 后，destroy() 删除数据时不会进行物理删除(但通过 destroy({ force: true }) 仍然可以物理删除)，而是设置 deletedAt 为当前时间
  },

  // pool configuration used to pool database connections
  // pool: {
  //   min: 0, // Minimum number of connection in pool
  //   max: 5, // Maximum number of connection in pool
  //   idle: 30000, // The maximum time, in milliseconds, that a connection can be idle before being released.
  //   acquire: 60000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
  // },

  // isolation level of each transaction, defaults to dialect default
  // isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
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

// require('./category')(sequelize).sync({ force: true })

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
