# koa-demo

koa教程：
1. https://blog.csdn.net/RollsRoycewk/article/details/117676806（热加载） 

## koa-body
```javascript
const { koaBody } = require("koa-body");
app.use(koaBody());// 在所有中间件之前注册
```
`module.exports`: 如果导出的时候是module.export = {}用{}包起来的，那么导入的时候就需要结构

## async
只要用async定义的函数，返回的都是`Promise`,所以在`FindUser`中调用`userIsExist`得加`await`

```javascript
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
```