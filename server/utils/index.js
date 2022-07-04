const Constant = require('./constant')

module.exports = {
  deepMerge(target, ...args) {
    args.forEach(source => {
      for (let key in source) {
        // 值为 null 的不合并
        if (source[key] !== null) {
          target[key] = target[key] && source[key] && target[key].toString() === '[object Object]' && source[key].toString() === '[object Object]' ? deepMerge(target[key], source[key]) : target[key] = source[key]    
        }
      }
    })
    return target
  },
  getParam(data, key, def = null) {
    if (data.hasOwnProperty(key)) {
      let val = data[key]
      if (val !== undefined) {
        if (typeof def === 'string') {
          val = val.trim()
        } else if (typeof def === 'number') {
          val = +val
        }
      }
      return val
    }
    return def
  },
  paramErr(response, message = Constant.MSG_PARAMS_ERR) {
    response.status(Constant.CODE_PARAMS_ERR).json({
      errorCode: Constant.CODE_PARAMS_ERR,
      errorMessage: message
    })
  },
  success(response, data, message = Constant.MSG_SUCC) {
    response.status(Constant.CODE_SUCC).json({
      errorCode: Constant.CODE_SUCC,
      errorMessage: message,
      data
    })
  },
  fail(response, message = Constant.MSG_FAIL) {
    response.status(Constant.CODE_FAIL).json({
      errorCode: Constant.CODE_FAIL,
      errorMessage: message
    })
  },
  none(response, message = Constant.MSG_NONE) {
    response.status(Constant.CODE_NONE).json({
      errorCode: Constant.CODE_NONE,
      errorMessage: message
    })
  },
  handleApiError(error, response, next) {
    next(error)
    console.log(error.constructor)
    if (error.original && error.original.sqlState === '23000') {
      this.fail(response, '该记录已存在')
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

    this.fail(response, error.message)
  },
}
