const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByProperty, createNewUser } = require("./User");
const error = require("../utils/error");

const registerService = async ({
  name,
  email,
  password,
  roles,
  accountStatus,
}) => {
  let user = await findUserByProperty("email", email);
  if (user) throw error("User alredy exist", 400);

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return createNewUser({ name, email, password: hash, roles, accountStatus });
};

const loginService = async ({ email, password }) => {
  const user = await findUserByProperty("email", email);

  if (!user) throw error("Invalid Email or Password", 400);

  const isValidPass = await bcrypt.compare(password, user.password);

  if (!isValidPass) throw error("Invalid Email or Password", 400);

  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };

  return jwt.sign(payload, "secret-key", { expiresIn: "2h" });
};

module.exports = {
  registerService,
  loginService,
};
