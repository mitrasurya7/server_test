const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const db = require("../models");
const User = db.users;

// Create and Save a new User
exports.register = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      role: req.body.role,
      password: hashPassword(req.body.password),
    });
    res.status(201).send({ message: "User was registered successfully!" });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the User.",
    });
  }
};

// user login
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      return res.status(401).send({ message: "Invalid username/password!" });
    }
    const passwordIsValid = comparePassword(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid username/password!",
      });
    }
    const token = signToken({ id: user._id, role: user.role });
    res.status(200).send({
      username: user.username,
      role: user.role,
      access_token: token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
