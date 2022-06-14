const { DataTypes, Model } = require('sequelize')
// const { sequelize } = require('./index')

// class User extends Model {}
// User.init({
//   // 此处 id 可以不用写，sequelize 会自动增加 ID 并自增且设置为主键
//   id: {
//     type: DataTypes.INTEGER, // A string or a data type
//     autoIncrement: true,
//     primaryKey: true
//   },
//   name: {
//     type: DataTypes.STRING(255),
//     allowNull: false, // default: true. If false, the column will have a NOT NULL constraint, and a not null validation will be run before an instance is saved.
//     comment: '用户名' // Comment for this column
//   },
//   password: {
//     type: DataTypes.STRING(45),
//     allowNull: false,
//     comment: '密码'
//   },
//   phone: {
//     type: DataTypes.STRING(20),
//     unique: true, // default: false. If true, the column will get a unique constraint. If a string is provided, the column will be part of a composite unique index. If multiple columns have the same string, they will be part of the same unique index
//     comment: '手机号'
//   },
//   email: {
//     type: DataTypes.STRING(255),
//     unique: true,
//     comment: '邮箱'
//   },
//   // create_time: {
//   //   type: DataTypes.DATE,
//   //   allowNull: false,
//   //   defaultValue: DataTypes.NOW,
//   //   comment: '创建时间'
//   // },
//   // update_time: {
//   //   type: DataTypes.DATE,
//   //   allowNull: false,
//   //   defaultValue: DataTypes.NOW,
//   //   comment: '更新时间'
//   // },
//   status: {
//     // type: DataTypes.TINYINT(1),
//     // defaultValue: 1,
//     type: DataTypes.BOOLEAN, // TINYINT(1)
//     defaultValue: true,
//     allowNull: false,
//     comment: '状态，0-无效，1-正常'
//   }
// }, {
//   sequelize,
//   modelName: 'user',

//   // 自定义表名
//   freezeTableName: true, // default: false. If freezeTableName is true, sequelize will not try to alter the model name to get the table name. Otherwise, the model name will be pluralized
//   tableName: 't_user_test', // Defaults to pluralized model name, unless freezeTableName is true, in which case it uses model name verbatim

//   /**
//    * 时间戳：
//    * 默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段.
//    * 这些字段会自动进行管理 - 每当你使用Sequelize 创建或更新内容时,这些字段都会被自动设置. 
//    * createdAt 字段将包含代表创建时刻的时间戳,而 updatedAt 字段将包含最新更新的时间戳.
//    * 
//    * 注意： 这是在 Sequelize 级别完成的(即未使用 SQL触发器 完成). 
//    * 这意味着直接 SQL 查询(例如,通过任何其他方式在不使用 Sequelize 的情况下执行的查询)将不会导致这些字段自动更新.
//    */
//   timestamps: true, // default: true. Adds createdAt and updatedAt timestamps to the model.
//   paranoid: true, // 设置 paranoid 为 true 后，删除数据时不会进行物理删除，而是设置 deletedAt 为当前时间
//   createdAt: 'create_time',
//   updatedAt: 'update_time',
//   deletedAt: 'delete_time',
// })

// module.exports = {
//   User: new User()
// }

module.exports = (sequelize) => {
  // https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#instance-method-define
  return sequelize.define('user', {
    // 此处 id 可以不用写，sequelize 会自动增加 ID 并自增且设置为主键
    id: {
      type: DataTypes.INTEGER.UNSIGNED, // A string or a data type
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false, // default: true. If false, the column will have a NOT NULL constraint, and a not null validation will be run before an instance is saved.
      comment: '用户名' // Comment for this column
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: '密码'
    },
    phone: {
      type: DataTypes.STRING(20),
      // unique: true, // default: false. If true, the column will get a unique constraint. If a string is provided, the column will be part of a composite unique index. If multiple columns have the same string, they will be part of the same unique index
      comment: '手机号'
    },
    email: {
      type: DataTypes.STRING(255),
      // unique: true,
      comment: '邮箱'
    },
    // create_time: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    //   comment: '创建时间'
    // },
    // update_time: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    //   comment: '更新时间'
    // },
    status: {
      // type: DataTypes.BOOLEAN, // TINYINT(1)
      // defaultValue: true,
      type: DataTypes.TINYINT(1).UNSIGNED,
      defaultValue: 1,
      allowNull: false,
      comment: '状态，0-无效，1-正常'
    }
  }, {
    sequelize,

    // 自定义表名
    freezeTableName: true, // default: false. If freezeTableName is true, sequelize will not try to alter the model name to get the table name. Otherwise, the model name will be pluralized
    tableName: 't_user', // Defaults to pluralized model name, unless freezeTableName is true, in which case it uses model name verbatim

    /**
     * 时间戳：
     * 默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段.
     * 这些字段会自动进行管理 - 每当你使用Sequelize 创建或更新内容时,这些字段都会被自动设置. 
     * createdAt 字段将包含代表创建时刻的时间戳,而 updatedAt 字段将包含最新更新的时间戳.
     * 
     * 注意： 这是在 Sequelize 级别完成的(即未使用 SQL触发器 完成). 
     * 这意味着直接 SQL 查询(例如,通过任何其他方式在不使用 Sequelize 的情况下执行的查询)将不会导致这些字段自动更新.
     */
    // timestamps: true, // default: true. Adds createdAt and updatedAt timestamps to the model.
    // paranoid: true, // 设置 paranoid 为 true 后，destroy() 删除数据时不会进行物理删除(但通过 destroy({ force: true }) 仍然可以物理删除)，而是设置 deletedAt 为当前时间
    // createdAt: 'create_time',
    // updatedAt: 'update_time',
    // deletedAt: 'delete_time',

    indexes: [
      { unique: true, fields: ['phone'] },
      { unique: true, fields: ['email'] },
    ]
  })
}