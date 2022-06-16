const Service = require('./index')
const { AccountModel } = require('../models') 

class AccountService extends Service {}

module.exports = new AccountService(AccountModel)
