const { Op } = require('sequelize')
const CategoryService = require('../services/category')
const Util = require('../utils')

exports.bulkCreate = async (req, res, next) => {
  const data = [
    // type: 账单类型，0-不计入收支，1-支出，2-收入
    { name: '餐饮', type: 1 },
    { name: '交通', type: 1 },
    { name: '买菜', type: 1 },
    { name: '话费', type: 1 },
    { name: '服饰', type: 1 },
    { name: '购物', type: 1 },
    { name: '日用品', type: 1 },
    { name: '化妆品', type: 1 },
    { name: '住房', type: 1 },
    { name: '教育', type: 1 },
    { name: '医疗', type: 1 },
    { name: '娱乐', type: 1 },
    { name: '运动', type: 1 },
    { name: '旅行', type: 1 },
    { name: '宠物', type: 1 },
    { name: '保险', type: 1 },
    { name: '公益', type: 1 },
    { name: '转账', type: 1 },
    { name: '发红包', type: 1 },
    { name: '其他人情', type: 1 },
    { name: '其他', type: 1 },
    
    { name: '工资', type: 2 },
    { name: '奖金', type: 2 },
    { name: '兼职', type: 2 },
    // { name: '理财', type: 2 },
    { name: '报销', type: 2 },
    { name: '退款', type: 2 },
    { name: '收红包', type: 2 },
    { name: '收转账', type: 2 },
    { name: '生活费', type: 2 },
    { name: '零花钱', type: 2 },
    { name: '其他人情', type: 2 },
    { name: '其他', type: 2 },

    { name: '理财', type: 0 },
    { name: '借还款', type: 0 },
    { name: '其他', type: 0 },
  ]

  try {
    const ret = await CategoryService.bulkCreate(data)
    return Util.success(res, ret)
  } catch (error) {
    // console.error('CategoryModel bulkCreate error:', error)
    // next(error)
    Util.handleApiError(error, res, next)
  }
}

exports.list = async (req, res, next) => {
  const { query: body } = req
  const id = Util.getParam(body, 'id', null)
  const name = Util.getParam(body, 'name', '')
  const type = Util.getParam(body, 'type', -1)
  const status = Util.getParam(body, 'status', -1)

  const where = {}
  if (id && id > 0) {
    where.id = { [Op.eq]: id }
  }
  if (name) {
    where.name = { [Op.like]: name }
  }
  if (type !== -1) {
    where.type = { [Op.eq]: type }
  }
  if (status !== -1) {
    where.status = { [Op.eq]: status }
  }

  try {
    const ret = await CategoryService.getList(where)
    // if (ret.length > 0) {
    //   return Util.success(res, ret)
    // }
    // return Util.none(res)
    return Util.success(res, ret)
  } catch (error) {
    Util.handleApiError(error, res, next)
  }
}
