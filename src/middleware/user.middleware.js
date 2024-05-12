const { getUserInfo } = require("../service/user.service");

const { userAlreadyExited, userFormateError,userRegisterError } = require('../constant/err.type')

const VertifyUser = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  // TODO: check user_name and password is correct
  if (!user_name || !password) {
    console.error("用户名或密码为空");
    ctx.app.emit('error', userFormateError, ctx)
    return;
  }
  await next();
};

// TODO: 查找用户是否是否存在
const FindUser = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  // TODO: check if user is already registered
  try{
    const res = await getUserInfo({ user_name })
    if (res) {
      console.error("用户名已存在");
      ctx.app.emit('error',userAlreadyExited, ctx)
      return;
    }
  }catch(err) {
    ctx.app.emit('error', userRegisterError, ctx)
    return
  }
  
  await next();
};



module.exports = {
  VertifyUser,
  FindUser,
};
