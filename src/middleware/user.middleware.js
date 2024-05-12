const bcrypt = require('bcryptjs')

const { getUserInfo } = require("../service/user.service");

const { UserAlreadyExited, UserFormateError, UserRegisterError, UserDoseNotExist, UserLoginError, InvalidPassword } = require('../constant/err.type')

const VertifyUser = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  // TODO: check user_name and password is correct
  if (!user_name || !password) {
    console.error("用户名或密码为空");
    ctx.app.emit('error', UserFormateError, ctx)
    return;
  }
  await next();
};

// TODO: 查找用户是否是否存在
const userIsExist = async (ctx) => {
  const { user_name } = ctx.request.body;
  // TODO: check if user is already registered
  const res = await getUserInfo({ user_name })
  if (res) {
    return true
  }
  return false
}
// TODO: 注册中间件：判断用户是否已经存在
const FindUser = async (ctx, next) => {
  // TODO: check if user is already registered
  try {
    const res = await userIsExist(ctx)
    if (res) {
      console.error("用户名已存在");
      ctx.app.emit('error', UserAlreadyExited, ctx)
      return;
    }
  } catch (err) {
    ctx.app.emit('error', UserRegisterError, ctx)
    return
  }

  await next();
};

// TODO: 加密
const CrpytPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10); // 加盐10次
  const hash = bcrypt.hashSync(password, salt);

  ctx.request.body.password = hash;

  await next();
}

const VertifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;

  try {
    const res = await getUserInfo({ user_name })
    if (!res) {
      console.error("用户不存在");
      ctx.app.emit('error', UserDoseNotExist, ctx)
      return;
    }
    if (!bcrypt.compareSync(password, res.password)) {
      console.error('密码错误');
      ctx.app.emit('error', InvalidPassword, ctx)
      return
    }
  } catch (err) {
    console.error(err);
    ctx.app.emit('error', UserLoginError, ctx)
    return
  }
  await next();
}

module.exports = {
  VertifyUser,
  FindUser,
  CrpytPassword,
  VertifyLogin
};
