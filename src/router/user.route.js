const Router = require("koa-router");

const { VertifyUser, FindUser, CrpytPassword, VertifyLogin } = require("../middleware/user.middleware");
const { Auth } = require('../middleware/auth.middleware')

const router = new Router({
  prefix: "/users",
});

const { register, login } = require("../controller/user.controller");
// 注册
router.post("/register", VertifyUser, FindUser, CrpytPassword, register);
// 登录
router.post("/login", VertifyUser, VertifyLogin, login);
// 修改密码
router.patch('/', Auth, async (ctx) => {
  ctx.body = {
    code: 200,
    msg: '修改密码成功'
  }
})
module.exports = router;
