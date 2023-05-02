const jwt = require("jsonwebtoken");

const code_secret = process.env.JWT_SECRET;
exports.signToken = (payload) => jwt.sign(payload, code_secret);
exports.verifyToken = (token) => jwt.verify(token, code_secret);
