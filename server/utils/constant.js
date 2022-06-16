class Constant {
  static PAGE_SIZE = 30

  //返回结果状态
  static CODE_SUCC			    = 200
  static CODE_PARAMS_ERR    = 255
  static CODE_REDIRECT      = 302
  static CODE_REFRESH_TOKEN = 400
  static CODE_NO_LOGIN      = 401
  static CODE_NOT_ALLOWED   = 403
  static CODE_NONE			    = 404
  // static CODE_FOLLOW		    = 405
  // static CODE_PAY			      = 406
  // static CODE_CAPTCHA	      = 407
  // static CODE_FINGERPRINT   = 408
  // static CODE_NEED_DESK     = 409
  static CODE_FAIL          = 500
  // static CODE_NO_SUBSCRIBE  = 999

  //返回结果消息
  static MSG_SUCC     		  = 'success' 
  static MSG_PARAMS_ERR     = '参数异常'
  static MSG_REDIRECT       = '重定向url'
  static MSG_REFRESH_TOKEN  = 'Token过期'
  static MSG_NO_LOGIN       = '请先登录'
  static NOT_ALLOWED    	  = '无权限'
  static MSG_NONE     		  = '无数据'
  // static MSG_FOLLOW         = '需要关注'
  // static MSG_PAY     		    = '书币不足'
  // static MSG_UNLOCK         = '需要解锁'
  // static MSG_CAPTCHA        = '请输入验证码'
  // static MSG_FINGERPRINT    = '需要联系管理员设置设备登录指纹'
  // static MSG_NEED_DESK      = '请先保存到桌面'
  static MSG_FAIL           = '失败，请稍后重试！'
  // static MSG_NO_SUBSCRIBE   = '您还没关注哦！'
}

module.exports = Constant
