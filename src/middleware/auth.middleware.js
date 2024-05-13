const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/config.default')

const { TokenExpiredError, TokenInvalidError } = require('../constant/err.type')

const Auth = async (ctx, next) => {
    const { authorization } = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    try {
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user
    } catch (error) {
        switch (error.name){
            case "TokenExpiredError":
                console.error('token已过期',error);
                ctx.app.emit('error', TokenExpiredError, ctx)
                return
            case "JsonWebTokenError":
                console.error('无效的token', error);
                ctx.app.emit('error', TokenInvalidError, ctx)
                return
            }
    }

    await next()
}

module.exports = {
    Auth
}