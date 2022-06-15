module.exports = {
  getParam: (data, key, def = null) => {
    if (data.hasOwnProperty(key)) {
      let val = data[key]
      if (typeof val === 'string') {
        val = val.trim()
      }
      return val
    }
    return def
  },
  paramErr: (response, message) => {
    response.status(200).json({
      code: 255,
      message
    })
  },
  success: (response, data, message = 'success') => {
    response.status(200).json({
      code: 200,
      message,
      data
    })
  },
  fail: (response, message = 'fail') => {
    response.status(200).json({
      code: 500,
      message
    })
  },
  none: (response, message = '') => {
    response.status(200).json({
      code: 404,
      message
    })
  }
}
