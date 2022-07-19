const  { Op } = require('sequelize')
const UserService = require('../services/user')
const Util = require('../utils')
const Constant = require('../utils/constant')

// 批量添加 测试数据
exports.bulkCreate = async (req, res, next) => {
  const data = []
  let startNo = 100
  for (let i = 0; i < 100; i++) {
    data.push({
      phone: `13012345${startNo++}`,
      email: `google_${i}@gmail.com`,
      password: `pwd_${i}`,
      login_type: (i % 4) + 1,
      nickname: `user_${i}`,
    })
  }

  try {
    const ret = await UserService.bulkCreate(data)
    console.log('UserModel bulkCreate:',  JSON.stringify(ret, null, 4))
    Util.success(res, ret)
  } catch (error) {
    // console.error('UserModel bulkCreate error:', error)
    // next(error)
    Util.handleApiError(error, res, next)
  }
}

// 查询列表
exports.list = async (req, res, next) => {
  const { query: body = {} } = req
  const id = Util.getParam(body, 'id', null)
  const phone = Util.getParam(body, 'phone', null)
  const status = Util.getParam(body, 'status', -1)

  const order = Util.getParam(body, 'order', null)
  const sort = Util.getParam(body, 'sort', 'asc')

  const where = {}
  if (id && id > 0) {
    where.id = { [Op.eq]: id }
  }
  if (phone) {
    where.phone = { [Op.eq]: phone }
  }
  if (status !== -1) {
    where.status = { [Op.eq]: status }
  }

  const orderBy = []
  if (order) {
    orderBy.push([order, sort])
  }

  try {
    const ret = await UserService.getList(
      where,
      {
        exclude: ['password'] // 排除字段
      },
      orderBy, // [ ['id', 'desc'] ]
    )

    // console.log('UserModel list:', ret)
    // console.log('UserModel list:', ret.toJSON) // ❌
    // console.log(ret.get({ plain: true })) // ❌ 获取干净的 JSON 对象
    // console.log('UserModel list:',  JSON.stringify(ret, null, 4)) // ✅

    if (ret.length > 0) {
      // 手机号脱敏
      ret.forEach(item => {
        if (item.phone) {
          item.phone = item.phone.substr(0, 3) + '****' + item.phone.substr(7)
        }
      })
      return Util.success(res, ret)
    }
    return Util.none(res)
  } catch (error) {
    // console.error('UserModel list error:', error, JSON.stringify(error))
    // next(error)
    // return Util.fail(res, error.message)
    Util.handleApiError(error, res, next)
  }
}

// 分页查询
exports.pageList = async (req, res, next) => {
  try {
    const { query: body = {} } = req
    /**
     * ant-design-pro ProTable request
     * https://procomponents.ant.design/components/table#request
     * 
     * 第一个参数中一定会有 pageSize 和 current ，这两个参数是 antd 的规范
     */
    const currentPage = Util.getParam(body, 'current', 1)
    const pageSize = Util.getParam(body, 'pageSize', Constant.PAGE_SIZE)
    const id = Util.getParam(body, 'id', 0)
    const nickname = Util.getParam(body, 'nickname', '')
    // const password = Util.getParam(body, 'password', '')
    const phone = Util.getParam(body, 'phone', null)
    const email = Util.getParam(body, 'email', null)
    const status = Util.getParam(body, 'status', -1)
  
    const where = {}
    if (id && id > 0) {
      where.id = { [Op.eq]: id }
    }
    if (nickname) {
      where.nickname = { [Op.substring]: nickname }
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
    // const retCount = await UserService.getCount(where)
    // console.log('UserModel pageList count:', retCount)
    const ret = await UserService.getPageList(where, { exclude: ['password'] }, { currentPage, pageSize })
    // console.log('UserModel pageList:', JSON.stringify(ret, null, 4))

    if (ret.data.length > 0) {
      // 手机号脱敏
      ret.data.forEach(item => {
        if (item.phone) {
          item.phone = item.phone.substr(0, 3) + '****' + item.phone.substr(7)
        }
      })
      // return Util.success(res, ret)
    }
    // return Util.none(res)
    return res.status(200).json(ret)
  } catch (error) {
    // console.error('UserModel pageList error:', error)
    // next(error)
    Util.handleApiError(error, res, next)
  }
}

// 新增/修改
exports.save = async (req, res, next) => {
  const { body = {} } = req
  const id = Util.getParam(body, 'id', 0)
  const nickname = Util.getParam(body, 'nickname', '')
  // const password = Util.getParam(body, 'password', '')
  // const phone = Util.getParam(body, 'phone', null)
  const email = Util.getParam(body, 'email', null)
  const status = Util.getParam(body, 'status', 1)

  if (!nickname) {
    return Util.paramErr(res, '缺少参数：nickname')
  }
  // if (!password) {
  //   return Util.paramErr(res, '缺少参数：password')
  // }

  let data = {
    id,
    nickname,
    // password,
    // phone,
    email,
    status
  }

  if (id && id > 0) {
    const model = await UserService.getByPk(id)
    if (model === null) {
      return Util.paramErr('该记录不存在')
    }
    data = Util.deepMerge({}, model.dataValues, data)
  }

  try {
    const ret = await UserService.save(data)
    console.log('UserModel save:', JSON.stringify(ret, null, 4))
    Util.success(res, ret)
  } catch (error) {
    // console.error('UserModel save error sqlState:', error)
    // if (error.original && error.original.sqlState === '23000') {
    //   return Util.fail(res, '该记录已存在')
    // }
    // next(error)
    Util.handleApiError(error, res, next)
  }
}

// 修改密码
exports.updatePassword = async (req, res, next) => {
  const { body = {} } = req
  const id = Util.getParam(body, 'id', 0)
  const password = Util.getParam(body, 'password', null)

  if (!id) {
    return Util.paramErr(res, '缺少参数：id')
  }
  if (!password) {
    return Util.paramErr(res, '缺少参数：password')
  }

  let data = {
    id,
    password,
  }

  if (id && id > 0) {
    const model = await UserService.getByPk(id)
    if (model === null) {
      return Util.paramErr('该记录不存在')
    }
    data = Util.deepMerge({}, model.dataValues, data)
  }

  try {
    const ret = await UserService.save(data)
    Util.success(res, ret)
  } catch (error) {
    Util.handleApiError(error, res, next)
  }
}

// 修改手机号
exports.updatePhone = async (req, res, next) => {
  const { body = {} } = req
  const id = Util.getParam(body, 'id', 0)
  const phone = Util.getParam(body, 'phone', null)

  if (!id) {
    return Util.paramErr(res, '缺少参数：id')
  }
  if (!phone) {
    return Util.paramErr(res, '缺少参数：phone')
  }

  let data = {
    id,
    phone,
  }

  if (id && id > 0) {
    const model = await UserService.getByPk(id)
    if (model === null) {
      return Util.paramErr('该记录不存在')
    }
    data = Util.deepMerge({}, model.dataValues, data)
  }

  try {
    const ret = await UserService.save(data)
    Util.success(res, ret)
  } catch (error) {
    Util.handleApiError(error, res, next)
  }
}

// 删除/禁用
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
    status: 0 // 软删除
  }

  try {
    const ret = await UserService.save(data)
    console.log('UserModel delete:', JSON.stringify(ret, null, 4))
    Util.success(res)
  } catch (error) {
    // console.error('UserModel delete error:', error)
    // next(error)
    Util.handleApiError(error, res, next)
  }
}
