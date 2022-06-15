const express = require('express')
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
  // .post('/user/all', userCtrl.all)
  .post('/user/bulkCreate', userCtrl.bulkCreate)
  .post('/user/list', userCtrl.list)
  .post('/user/pageList', userCtrl.pageList)
  .post('/user/save', userCtrl.save)
  .post('/user/delete', userCtrl.delete)
  // .post('/user/detail', userCtrl.detail)
  // .post('/user', userCtrl.delete)

  .post('/category/bulkCreate', categoryCtrl.bulkCreate)

module.exports = router
