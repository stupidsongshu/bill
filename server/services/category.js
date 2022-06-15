const Service = require('./index')
const { CategoryModel } = require('../models')

class CategoryService extends Service {}

module.exports = new CategoryService(CategoryModel)
