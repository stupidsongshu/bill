const AccountService = require('../services/account')
const Util = require('../utils')

/**
 * 当前用户的权限，如果为空代表没登录
 * current user access， if is '', user need login
 */
let access = ''

const getAccess = () => {
  return access
}

exports.login = async (req, res, next) => {
  const { body = {} } = req
  const type = Util.getParam(body, 'type', '')
  const autoLogin = Util.getParam(body, 'autoLogin', 0)
  const username = Util.getParam(body, 'username', '')
  const password = Util.getParam(body, 'password', '')

  // Util.success(res, {
  //   type,
  //   username
  // })

  if (password === '123456' && username === 'admin') {
    res.send({
      status: 'ok',
      type,
      currentAuthority: 'admin',
    });
    access = 'admin';
    return;
  }
  if (password === '123456' && username === 'user') {
    res.send({
      status: 'ok',
      type,
      currentAuthority: 'user',
    });
    access = 'user';
    return;
  }
  if (type === 'mobile') {
    res.send({
      status: 'ok',
      type,
      currentAuthority: 'admin',
    });
    access = 'admin';
    return;
  }

  res.send({
    status: 'error',
    type,
    currentAuthority: 'guest',
  });
  access = 'guest';
}

exports.currentUser = async (req, res, next) => {
  if (!getAccess()) {
    res.status(401).send({
      data: {
        isLogin: false,
      },
      errorCode: '401',
      errorMessage: '请先登录！',
      success: true,
    });
    return;
  }
  res.send({
    success: true,
    data: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      email: 'antdesign@alipay.com',
      signature: '海纳百川，有容乃大',
      title: '交互专家',
      group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
      tags: [
        {
          key: '0',
          label: '很有想法的',
        },
        {
          key: '1',
          label: '专注设计',
        },
        {
          key: '2',
          label: '辣~',
        },
        {
          key: '3',
          label: '大长腿',
        },
        {
          key: '4',
          label: '川妹子',
        },
        {
          key: '5',
          label: '海纳百川',
        },
      ],
      notifyCount: 12,
      unreadCount: 11,
      country: 'China',
      access: getAccess(),
      geographic: {
        province: {
          label: '浙江省',
          key: '330000',
        },
        city: {
          label: '杭州市',
          key: '330100',
        },
      },
      address: '西湖区工专路 77 号',
      phone: '0752-268888888',
    },
  });
}