const Koa = require("koa");
const { koaBody } = require("koa-body");
const handleError = require('./HandleError')
const app = new Koa();

const userRouter = require("../router/user.route");

app.use(koaBody());
app.use(userRouter.routes());

app.on('error', handleError)

module.exports = app;
