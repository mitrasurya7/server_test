const bcrypt = require("bcryptjs");
const saltRounds = 10;

// hashPassword and comparePassword are helper functions
exports.hashPassword = (password) => bcrypt.hashSync(password, saltRounds);
// comparePassword is used in user.controller.js
exports.comparePassword = (password, hash) =>
  bcrypt.compareSync(password, hash);
