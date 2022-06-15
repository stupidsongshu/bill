const Service = require('./index')
const { UserModel } = require('../models')

class UserService extends Service {}

module.exports = new UserService(UserModel)
