const Service = require('./index')
const { AdminModel } = require('../models')

class AdminService extends Service {}

module.exports = new AdminService(AdminModel)
