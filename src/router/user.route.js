const Router = require("koa-router");

const { VertifyUser, FindUser, CrpytPassword, VertifyLogin } = require("../middleware/user.middleware");

const router = new Router({
  prefix: "/users",
});

const { register, login } = require("../controller/user.controller");

router.post("/register", VertifyUser, FindUser, CrpytPassword, register);

router.post("/login", VertifyUser, VertifyLogin, login);

module.exports = router;
