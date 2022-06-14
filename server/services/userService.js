import { UserModel } from '../models'

// 查询所有数据
exports.getAll = (field = '*', order = 'id', sort = 'asc') => {
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
    attributes: []
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

