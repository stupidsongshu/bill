const express = require('express')
const userCtrl = require('../controllers/user')

const router = express.Router()

// router.get('/', (req, res, next) => {
//   res.send('hello router')
// })

router.get('/user', userCtrl.list)
  .post('/user', userCtrl.create)
  .put('/user/:id', userCtrl.update)
  .delete('/user/:id', userCtrl.delete)

module.exports = router
