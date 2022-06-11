const { Model, DataTypes, Deferrable } = require("sequelize")
// const { sequelize } = require('./index')
// const { User } = require('./user')

// class Foo extends Model {}
// Foo.init({
//   // 实例化将自动将 flag 设置为 true (如果未设置)
//   flag: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },

//   // 日期的默认值 => 当前时间
//   myDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

//   // 将 allowNull 设置为 false 将为该列添加 NOT NULL,
//   // 这意味着如果该列为 null,则在执行查询时将从数据库引发错误.
//   // 如果要在查询数据库之前检查值是否不为 null,请查看下面的验证部分.
//   title: { type: DataTypes.STRING, allowNull: false },

//   // 创建两个具有相同值的对象将引发错误.
//   // unique 属性可以是布尔值或字符串.
//   // 如果为多个列提供相同的字符串,则它们将形成一个复合唯一键.
//   uniqueOne: { type: DataTypes.STRING,  unique: 'compositeIndex' },
//   uniqueTwo: { type: DataTypes.INTEGER, unique: 'compositeIndex' },

//   // unique 属性是创建唯一约束的简写.
//   someUnique: { type: DataTypes.STRING, unique: true },

//   // 继续阅读有关主键的更多信息
//   identifier: { type: DataTypes.STRING, primaryKey: true },

//   // autoIncrement 可用于创建 auto_incrementing 整数列
//   incrementMe: { type: DataTypes.INTEGER, autoIncrement: true },

//   // 你可以通过 'field' 属性指定自定义列名称：
//   fieldWithUnderscores: { type: DataTypes.STRING, field: 'field_with_underscores' },

//   // 可以创建外键：
//   user_id: {
//     type: DataTypes.INTEGER,

//     references: {
//       // 这是对另一个模型的参考
//       model: User,

//       // 这是引用模型的列名
//       key: 'id',

//       // 使用 PostgreSQL,可以通过 Deferrable 类型声明何时检查外键约束.
//       deferrable: Deferrable.INITIALLY_IMMEDIATE
//       // 参数:
//       // - `Deferrable.INITIALLY_IMMEDIATE` - 立即检查外键约束
//       // - `Deferrable.INITIALLY_DEFERRED` - 将所有外键约束检查推迟到事务结束
//       // - `Deferrable.NOT` - 完全不推迟检查(默认) - 这将不允许你动态更改事务中的规则
//     }
//   },

//   // 注释只能添加到 MySQL,MariaDB,PostgreSQL 和 MSSQL 的列中
//   commentMe: {
//     type: DataTypes.INTEGER,
//     comment: '这是带有注释的列'
//   }
// }, {
//   sequelize,
//   modelName: 'foo',

//   // 在上面的属性中使用 `unique: true` 与在模型的参数中创建索引完全相同：
//   indexes: [{ unique: true, fields: ['someUnique'] }]
// })

// module.exports = {
//   Foo: new Foo()
// }

module.exports = (sequelize) => {
  return sequelize.define('test',{
    // 实例化将自动将 flag 设置为 true (如果未设置)
    flag: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  
    // 日期的默认值 => 当前时间
    myDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  
    // 将 allowNull 设置为 false 将为该列添加 NOT NULL,
    // 这意味着如果该列为 null,则在执行查询时将从数据库引发错误.
    // 如果要在查询数据库之前检查值是否不为 null,请查看下面的验证部分.
    title: { type: DataTypes.STRING, allowNull: false },
  
    // 创建两个具有相同值的对象将引发错误.
    // unique 属性可以是布尔值或字符串.
    // 如果为多个列提供相同的字符串,则它们将形成一个复合唯一键.
    uniqueOne: { type: DataTypes.STRING,  unique: 'compositeIndex' },
    uniqueTwo: { type: DataTypes.INTEGER, unique: 'compositeIndex' },
  
    // unique 属性是创建唯一约束的简写.
    someUnique: { type: DataTypes.STRING, unique: true },
  
    // 继续阅读有关主键的更多信息
    identifier: { type: DataTypes.STRING, primaryKey: true },
  
    // autoIncrement 可用于创建 auto_incrementing 整数列
    incrementMe: { type: DataTypes.INTEGER, autoIncrement: false },
  
    // 你可以通过 'field' 属性指定自定义列名称：
    fieldWithUnderscores: { type: DataTypes.STRING, field: 'field_with_underscores' },
  
    // 可以创建外键：
    // user_id: {
    //   type: DataTypes.INTEGER,
  
    //   references: {
    //     // 这是对另一个模型的参考
    //     model: User,
  
    //     // 这是引用模型的列名
    //     key: 'id',
  
    //     // 使用 PostgreSQL,可以通过 Deferrable 类型声明何时检查外键约束.
    //     deferrable: Deferrable.INITIALLY_IMMEDIATE
    //     // 参数:
    //     // - `Deferrable.INITIALLY_IMMEDIATE` - 立即检查外键约束
    //     // - `Deferrable.INITIALLY_DEFERRED` - 将所有外键约束检查推迟到事务结束
    //     // - `Deferrable.NOT` - 完全不推迟检查(默认) - 这将不允许你动态更改事务中的规则
    //   }
    // },
  
    // 注释只能添加到 MySQL,MariaDB,PostgreSQL 和 MSSQL 的列中
    commentMe: {
      type: DataTypes.INTEGER,
      comment: '这是带有注释的列'
    }
  }, {
    sequelize,
    // modelName: 'test',

    // 在上面的属性中使用 `unique: true` 与在模型的参数中创建索引完全相同：
    indexes: [{ unique: true, fields: ['some_unique'] }]
  })
}