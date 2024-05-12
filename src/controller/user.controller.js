const { createUser, getUserInfo } = require("../service/user.service");

const { UserRegisterError, UserLoginError } = require("../constant/err.type");

class UserController {
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body;
    try {
      const res = await createUser(user_name, password);
      ctx.body = {
        code: 200,
        result: {
          id: res.id,
          user_name: res.user_name,
        },
        msg: "注册成功",
      };
    } catch (err) {
      ctx.app.emit("error", UserRegisterError, ctx);
    }
  }
  async login(ctx, next) {
    const { user_name, password } = ctx.request.body;
    try {
      const res = await getUserInfo({ user_name })
      ctx.body = {
        code: 200,
        result: {
          id: res.id,
          user_name: res.user_name,
        },
        msg: "登录成功",
      };
    }
    catch(err) {
      console.error(err);
      ctx.app.emit('error', UserLoginError, ctx)
      return
    }
  }
}

module.exports = new UserController();
