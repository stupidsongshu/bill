const express = require('express')
const adminCtrl = require('../controllers/admin')
const userCtrl = require('../controllers/user')
const categoryCtrl = require('../controllers/category')

const router = express.Router()

// router.get('/', (req, res, next) => {
//   res.send('hello router')
// })

// router.get('/user', userCtrl.list)
//   .post('/user', userCtrl.create)
//   .put('/user/:id', userCtrl.update)
//   .delete('/user/:id', userCtrl.delete)

router
  .post('/login/account', adminCtrl.login)
  .get('/currentUser', adminCtrl.currentUser)
  .get('/notices', adminCtrl.getNotices)

  // .post('/user/all', userCtrl.all)
  .post('/user/bulkCreate', userCtrl.bulkCreate) // 批量添加 测试数据
  .get('/user/list', userCtrl.list) // 查询
  .get('/user/pageList', userCtrl.pageList) // 分页查询
  // .get('/user/detail', userCtrl.detail) // 查询
  .post('/user/save', userCtrl.save) // 新增
  .put('/user/save', userCtrl.save) // 更新
  .delete('/user/delete', userCtrl.delete) // 删除
  
  .post('/category/bulkCreate', categoryCtrl.bulkCreate)
  .get('/category/list', categoryCtrl.list)
  .post('/category/save', categoryCtrl.save)

module.exports = router
