const  { Op } = require('sequelize')
const { UserModel } = require('../models')
const UserService = require('../services/userService')

exports.list = async (req, res, next) => {
  try {
    // const ret = await UserService.getAll({
    const ret = await UserModel.findAll({
      where: {
        status: 1
      },
      attributes: {
        exclude: ['password'] // 排除字段
      }
    })
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

    res.status(200).json(ret)
  } catch (error) {
    console.log('UserModel list error:', error)
    next(error)
  }
}

exports.save = async (req, res, next) =>{
  try {
    // let where = {}
    // if (req.body.id) {
    //   where.id = req.body.id
    // }
    // if (req.body.phone) {
    //   where.phone = req.body.phone
    // }

    const where = []
    const keys = ['id', 'phone']
    keys.forEach(key => {
      if (key in req.body) {
        where.push({ key, val: req.body[key] })
      }
    })

    const ret = await UserService.save(where, req.body)
    console.log('UserModel save:', JSON.stringify(ret, null, 4))
    res.status(200).json(ret)
  } catch (error) {
    console.log('UserModel save error:', error)
    next(error)
  }
}

exports.create = async (req, res, next) => {
  try {
    // Sequelize 提供了 create 方法,该方法将 build 方法和 save 方法合并为一个方法
    const ret = await UserModel.create(req.body)
    console.log('UserModel create:', ret)
    res.status(200).json(ret)
  } catch (error) {
    console.log('UserModel create error:', error)
    next(error)
  }
}

exports.update = async (req, res, next) => {
  try {
    // const ret = await UserModel.findByPk(req.params.id)
    const ret = await UserModel.findOne({
      where: { id: req.body.id }
    })

    if (ret === null) {
      console.log('UserModel update Not found:', req.params, req.body, ret)
      res.status(404).json(ret)
      return
    }

    // Object.assign(ret, req.body)
    // await ret.save()

    // 或者
    await ret.update(req.body)

    console.log('UserModel update:', ret)
    res.status(201).json(ret)
  } catch (error) {
    console.log('UserModel update error:', error)
    next(error)
  }
}

exports.delete = async (req, res, next) => {
  try {
    const ret = await UserModel.findOne({
      where: {
        id: {
          [Op.eq]: req.body.id
        }
      }
    })

    if (ret === null) {
      console.log('UserModel delete Not found:', req.params, req.body, ret)
      res.status(404).json(ret)
      return
    }

    // await ret.destroy() // 物理删除
    ret.status = 0 // 逻辑软删除
    await ret.save()

    console.log('UserModel delete:', ret)
    res.status(204).json(ret)
  } catch (error) {
    console.log('UserModel delete error:', error)
    next(error)
  }
}