const { UserModel } = require('../models')

// 查询所有数据
exports.getAll = ({ where, attributes = '*', order = 'id', sort = 'asc'} = {}) => {
  /**
   * attributes: ['foo', 'bar']
   * SELECT foo, bar FROM ...
   * 
   * attributes: ['foo', ['bar', 'baz'], 'qux']
   * SELECT foo, bar AS baz, qux FROM ...
   * 
   * attributes: ['foo', [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'], 'bar']
   * SELECT foo, COUNT(hats) AS n_hats, bar FROM ...
   */
  return UserModel.findAll({
    where,
    attributes,
  })
}

// 查询列表
exports.getList = (where, field = '*', order = 'id', sort = 'asc') => {}

// 查询分页列表
exports.getPageList = (where, field, pages, order = 'id', sort = 'asc') => {}

// 获取指定的一条记录
exports.getCur = (where, field = '*', order = 'id', sort = 'asc') => {
  return UserModel.findOne({
    where
  })
}

// 获取指定的一条记录
exports.getByPk = (id, field = '*') => {
  return UserModel.findByPk(id)
}

// 修改数据
exports.update = (where, data) => {}

exports.save = async (where, data) => {
  console.log('UserService save where:', JSON.stringify(where, null, 4))
  if (!data) return
  let ret = null
  if (data.id) {
    ret = await UserModel.findByPk(data.id)
  } else if (Array.isArray(where) && where.length) {
    // [
    //   { key: 'id', val: 1 },
    //   { key: 'phone', val: 2 },
    // ]
    // {
    //   id: 1,
    //   phone: 2
    // }
    const _where = where.reduce((prev, curr) => {
      prev[curr.key] = curr.val
      return prev
    }, {})
    // console.log('UserService save _where:', JSON.stringify(_where, null, 4))
    ret = await UserModel.findOne({ where: _where })
  }
  console.log('UserService save ret:', JSON.stringify(ret, null, 4))

  if (ret === null) {
    return UserModel.create(data)
  } else {
    ret = Object.assign(ret, data)
    return ret.update(data)
  }
}

