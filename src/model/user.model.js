const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const User = seq.define(
  "zd_user",
  {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: "用户名",
    },
    password: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      comment: "密码",
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "是否是管理员,false: 不是",
    },
  },
);

// User.sync({ force: true })

module.exports = User;
