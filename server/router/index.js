const express = require('express')
const userCtrl = require('../controllers/user')

const router = express.Router()

// router.get('/', (req, res, next) => {
//   res.send('hello router')
// })

// router.get('/user', userCtrl.list)
//   .post('/user', userCtrl.create)
//   .put('/user/:id', userCtrl.update)
//   .delete('/user/:id', userCtrl.delete)

router
  .post('/user/all', userCtrl.all)
  .post('/user/list', userCtrl.list)
  .post('/user/save', userCtrl.save)
  .post('/user/detail', userCtrl.detail)
  // .post('/user', userCtrl.delete)

module.exports = router
