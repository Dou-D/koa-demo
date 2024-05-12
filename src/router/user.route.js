const Router = require("koa-router");

const { VertifyUser, FindUser } = require("../middleware/user.middleware");

const router = new Router({
  prefix: "/users",
});

const { register, login } = require("../controller/user.controller");

router.post("/register", VertifyUser, FindUser, register);

router.post("/login", VertifyUser, login);

module.exports = router;
