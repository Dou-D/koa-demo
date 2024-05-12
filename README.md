# koa-demo

koa教程：
1. https://blog.csdn.net/RollsRoycewk/article/details/117676806（热加载） 

## koa-body
```javascript
const { koaBody } = require("koa-body");
app.use(koaBody());// 在所有中间件之前注册
```