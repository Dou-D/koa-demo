const { createUser } = require('../service/user.service')


class UserController {
    async register(ctx, next) {
        const { user_name, password } = ctx.request.body
        const res = await createUser(user_name, password)
        ctx.body = {
            code: 200,
            result: {
                id: res.id,
                user_name: res.user_name
            },
            msg: '注册成功'
        }
    }
    async login(ctx, next) {
        ctx.body = '用户登录成功'
    }
}


module.exports = new UserController()