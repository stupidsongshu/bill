const Constant = require('./constant')

module.exports = {
  getParam(data, key, def = null) {
    if (data.hasOwnProperty(key)) {
      let val = data[key]
      if (typeof val === 'string') {
        val = val.trim()
      }
      return val
    }
    return def
  },
  paramErr(response, message = Constant.MSG_PARAMS_ERR) {
    response.status(200).json({
      code: Constant.CODE_PARAMS_ERR,
      message
    })
  },
  success(response, data, message = Constant.MSG_SUCC) {
    response.status(200).json({
      code: Constant.CODE_SUCC,
      message,
      data
    })
  },
  fail(response, message = Constant.MSG_FAIL) {
    response.status(200).json({
      code: Constant.CODE_FAIL,
      message
    })
  },
  none(response, message = Constant.MSG_NONE) {
    response.status(200).json({
      code: Constant.CODE_NONE,
      message
    })
  },
  handleApiError(error, res, next) {
    next(error)
    console.log(error.constructor)
    if (error.original && error.original.sqlState === '23000') {
      this.fail(res, '该记录已存在')
      return
    }
    // console.error(`handleApiError:`, error)
    // console.error(`handleApiError【name】:`, error.name) // Error
    // console.error(`handleApiError【message】:`, error.message)
    // console.error(`handleApiError【stack】:`, error.stack)
    // console.error(`handleApiError【cause】:`, error.cause) // undefined
    // console.error(`handleApiError【fileName】:`, error.fileName) // undefined
    // console.error(`handleApiError【lineNumber】:`, error.lineNumber) // undefined
    try {
      if (error.stack && typeof error.stack === 'string') {
        let errorFn = ''
        let fileName = ''
        let lineNumber = -1
        let columnNumber = -1

        const stackList = error.stack.split('\n')
        const lastStack = stackList[stackList.length - 1]
        const index = lastStack.indexOf('at ')
        const stackStr = lastStack.substring(index + 3)
        // console.log(stackStr)
        const lastStackList = stackStr.match(/(^[a-zA-Z].*)(\(.*\))/)
        // console.log(lastStackList)
        // const tempList1 = /(^[a-zA-Z].*)(\(.*\))/.exec(stackStr)
        // console.log(tempList1)
        if (lastStackList !== null) {
          errorFn = lastStackList[1].trimRight()
          // const errorFile = lastStackList[2].slice(1, -1)
          const errorFileList = lastStackList[2].slice(1, -1).split(':')
          // console.log(errorFn)
          // console.log(errorFile)
          // console.log(errorFileList)
          ;[fileName, lineNumber, columnNumber] = errorFileList
        }

        console.log(`handleApiError:
        【errorMessage】: ${error.message}
        【errorFn】     : ${errorFn}
        【fileName】    : ${fileName}
        【lineNumber】  : ${lineNumber}
        【columnNumber】: ${columnNumber}`)
      }
    } catch (stackError) {
      // 解析失败后显示原始错误信息
      console.error(`handleApiError:`, error)
    }

    this.fail(res, error.message)
  }
}
