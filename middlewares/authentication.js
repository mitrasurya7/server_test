const { verifyToken } = require("../helpers/jwt");

exports.authenticate = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      return res.status(401).send({ message: "Please login first" });
    }
    const decoded = verifyToken(access_token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
