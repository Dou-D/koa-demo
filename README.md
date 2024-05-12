# koa-demo

koa教程：
1. https://blog.csdn.net/RollsRoycewk/article/details/117676806（热加载） 

## koa-body
```javascript
const { koaBody } = require("koa-body");
app.use(koaBody());// 在所有中间件之前注册
```
`module.exports`: 如果导出的时候是module.export = {}用{}包起来的，那么导入的时候就需要结构