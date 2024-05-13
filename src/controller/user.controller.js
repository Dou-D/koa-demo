const jwt = require('jsonwebtoken');

const { createUser, getUserInfo } = require("../service/user.service");

const { UserRegisterError, UserLoginError } = require("../constant/err.type");

const { JWT_SECRET } = require('../config/config.default')

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
    const { user_name } = ctx.request.body;
    try {
      const { password, ...res } = await getUserInfo({ user_name })
      ctx.body = {
        code: 0,
        msg: "登录成功",
        result: {
          token: jwt.sign(res,JWT_SECRET, {
            expiresIn: '1d'
          })
        }
      }
    } catch (error) {
      console.error('登录失败', err);
    }
  }
}

module.exports = new UserController();
