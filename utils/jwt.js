const { sign, verify } = require("jsonwebtoken");
// const jwt = require("jsonwebtoken");
const createToken = user => {
  const token = sign({ id: user.id, email: user.email }, process.env.JWT);
  return token;
};
module.exports = {
  createToken,
};