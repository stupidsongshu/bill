const { UserModel } = require('../models')
const CONST = require('../utils/constant')

// 查询所有数据
exports.getAll = (where, field = null, order = [], sort = 'asc') => {
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
    attributes: field,
  })
}

// 查询列表
exports.getList = (where, field = null, order = [], sort = 'asc') => {
  return UserModel.findAll({
    where,
    attributes: field,
    order
  })
}

/**
 * @description 查询分页列表 (findAndCountAll: findAll + count)
 * @param {*} where 
 * @param {*} field 
 * @param {*} pages 
 * @param {*} order 
 * @param {*} sort 
 * @returns 
 */
exports.getPageList = async (where, field = null, pages = {}, order = [], sort = 'asc') => {
  const { currentPage = 1, pageSize = CONST.PAGE_SIZE } = pages
  const { count, rows } = await UserModel.findAndCountAll({
    where,
    attributes: field,
    offset: (currentPage - 1) * pageSize,
    limit: pageSize,
    order
  })
  return {
    currentPage,
    pageSize,
    totalCount: count,
    totalPage: Math.ceil(count / pageSize),
    list: rows
  }
}

// 获取指定的一条记录
exports.getCur = (where, field = null, order = 'id', sort = 'asc') => {
  return UserModel.findOne({
    where,
    attributes: field
  })
}

// 获取指定的一条记录
exports.getByPk = (id, field = null) => {
  return UserModel.findByPk(id, {
    attributes: field
  })
}

// 添加数据
exports.add = (data) => {
  return UserModel.create(data)
}

// 修改数据
exports.update = (data, where) => {
  return UserModel.update(data, { where })
}

// 修改数据
exports.saveIdData = (data) => {
  const id = data.id
  delete data.id
  return this.update(data, { id })
}

// 修改数据
exports.save = (data) => {
  if (data.id) {
    return this.saveIdData(data)
  } else {
    return this.add(data)
  }
}

// 行数
exports.getCount = (where) => {
  return UserModel.count({ where })
}

// exports.save = async (where, data) => {
//   console.log('UserService save where:', JSON.stringify(where, null, 4))
//   if (!data) return
//   let ret = null
//   if (data.id) {
//     ret = await UserModel.findByPk(data.id)
//   } else if (Array.isArray(where) && where.length) {
//     // [
//     //   { key: 'id', val: 1 },
//     //   { key: 'phone', val: 2 },
//     // ]
//     // {
//     //   id: 1,
//     //   phone: 2
//     // }
//     const _where = where.reduce((prev, curr) => {
//       prev[curr.key] = curr.val
//       return prev
//     }, {})
//     // console.log('UserService save _where:', JSON.stringify(_where, null, 4))
//     ret = await UserModel.findOne({ where: _where })
//   }
//   console.log('UserService save ret:', JSON.stringify(ret, null, 4))

//   if (ret === null) {
//     return UserModel.create(data)
//   } else {
//     ret = Object.assign(ret, data)
//     return ret.update(data)
//   }
// }

