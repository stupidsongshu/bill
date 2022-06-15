const  { Op } = require('sequelize')
const UserService = require('../services/user')
const Util = require('../utils')
const CONST = require('../utils/constant')

exports.list = async (req, res, next) => {
  try {
    // const ret = await UserModel.findAll({
    //   where: {
    //     status: 1
    //   },
    //   attributes: {
    //     exclude: ['password'] // 排除字段
    //   }
    // })

    const ret = await UserService.getList(
      {
        status: 1
      },
      {
        exclude: ['password'] // 排除字段
      },
      [
        ['id', 'desc']
      ]
    )

    // console.log('UserModel list:', ret)
    // console.log('UserModel list:', ret.toJSON)
    // console.log(ret.get({ plain: true })) // 获取干净的 JSON 对象
    console.log('UserModel list:',  JSON.stringify(ret, null, 4))

    // 手机号脱敏
    ret.forEach(item => {
      if (item.phone) {
        item.phone = item.phone.substr(0, 3) + '****' + item.phone.substr(7)
      }
    })

    if (ret.length > 0) {
      return Util.success(res, ret)
    }
    return Util.none(res)
  } catch (error) {
    console.error('UserModel list error:', error)
    next(error)
  }
}

exports.pageList = async (req, res, next) => {
  const { body = {} } = req
  const currentPage = Util.getParam(body, 'currentPage', 1)
  const pageSize = Util.getParam(body, 'pageSize', CONST.PAGE_SIZE)
  const id = Util.getParam(body, 'id', 0)
  const name = Util.getParam(body, 'name', '')
  // const password = Util.getParam(body, 'password', '')
  const phone = Util.getParam(body, 'phone', null)
  const email = Util.getParam(body, 'email', null)
  const status = Util.getParam(body, 'status', -1)

  const where = {}
  if (id && id > 0) {
    where.id = { [Op.eq]: id }
  }
  if (name) {
    where.name = { [Op.substring]: name }
  }
  if (phone) {
    where.phone = { [Op.substring]: phone }
  }
  if (email) {
    where.email = { [Op.substring]: email }
  }
  if (status !== -1) {
    where.status = { [Op.eq]: status }
  }

  try {
    const retCount = await UserService.getCount(where)
    console.log('UserModel pageList count:', retCount)
    const ret = await UserService.getPageList(where, { exclude: ['password'] }, { currentPage, pageSize })
    console.log('UserModel pageList:', JSON.stringify(ret, null, 4))
    Util.success(res, ret)
  } catch (error) {
    console.error('UserModel pageList error sqlState:', error)
    next(error)
  }
}

exports.save = async (req, res, next) => {
  const { body = {} } = req
  const id = Util.getParam(body, 'id', 0)
  const name = Util.getParam(body, 'name', '')
  const password = Util.getParam(body, 'password', '')
  const phone = Util.getParam(body, 'phone', null)
  const email = Util.getParam(body, 'email', null)
  const status = Util.getParam(body, 'status', 1)

  if (!name) {
    return Util.paramErr(res, '缺少参数：name')
  }
  if (!password) {
    return Util.paramErr(res, '缺少参数：password')
  }

  if (id && id > 0) {
    const model = await UserService.getByPk(id)
    if (model === null) {
      return Util.paramErr('该记录不存在')
    }
  }

  const data = {
    id,
    name,
    password,
    phone,
    email,
    status
  }

  try {
    const ret = await UserService.save(data)
    console.log('UserModel save:', JSON.stringify(ret, null, 4))
    Util.success(res, ret)
  } catch (error) {
    console.error('UserModel save error sqlState:', error)
    // console.error('UserModel delete error:', JSON.stringify(error))
    if (error.original && error.original.sqlState === '23000') {
      return Util.fail(res, '该记录已存在')
    }
    next(error)
  }
}

exports.delete = async (req, res, next) => {
  const { body = {} } = req
  const id = Util.getParam(body, 'id', 0)

  if (!id || id <= 0) {
    return Util.paramErr(res, '缺少参数：id')
  }

  const model = await UserService.getByPk(id)
  if (!model) {
    return Util.paramErr(res, '该记录不存在')
  }

  const data = {
    id,
    status: 0
  }

  try {
    const ret = await UserService.save(data)
    console.log('UserModel delete:', JSON.stringify(ret, null, 4))
    Util.success(res)
  } catch (error) {
    console.error('UserModel delete error:', error)
    next(error)
  }
}
