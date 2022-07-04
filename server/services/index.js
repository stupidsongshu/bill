const Constant = require('../utils/constant')

class Service {
  constructor(model) {
    this.model = model
  }

  // 查询列表
  getList(where, field = null, order = [], sort = 'asc') {
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
    return this.model.findAll({
      where,
      attributes: field,
      order
    })
  }

  /**
   * @description 分页查询列表 (findAndCountAll: findAll + count)
   * @param {*} where 
   * @param {*} field 
   * @param {*} pages 
   * @param {*} order 
   * @param {*} sort 
   * @returns 
   */
   async getPageList(where, field = null, pages = {}, order = [], sort = 'asc') {
    const { currentPage = 1, pageSize = Constant.PAGE_SIZE } = pages
    const { count, rows } = await this.model.findAndCountAll({
      where,
      attributes: field,
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
      order
    })
    return {
      // currentPage,
      // totalPage: Math.ceil(count / pageSize),
      pageSize,
      total: count,
      data: rows,
      /**
       * ant-design-pro ProTable request
       * https://procomponents.ant.design/components/table#request
       * 
       * success 请返回 true，不然 table 会停止解析数据，即使有数据
       */
      status: true,
    }
  }

  // 获取指定的一条记录
  getCur(where, field = null, order = 'id', sort = 'asc') {
    return this.model.findOne({
      where,
      attributes: field
    })
  }

  // 获取指定的一条记录
  getByPk(id, field = null) {
    return this.model.findByPk(id, {
      attributes: field
    })
  }

  // 批量添加数据
  bulkCreate(data) {
    return this.model.bulkCreate(data)
  }

  // 添加数据
  add(data) {
    return this.model.create(data)
  }

  // 修改数据
  update(data, where) {
    return this.model.update(data, { where })
  }

  // 修改数据
  saveIdData(data) {
    const id = data.id
    delete data.id
    return this.update(data, { id })
  }

  // 添加/修改数据
  save(data) {
    if (data.id) {
      return this.saveIdData(data)
    } else {
      return this.add(data)
    }
  }

  // 行数
  getCount(where) {
    return this.model.count({ where })
  }
}

module.exports = Service
