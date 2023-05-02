exports.authorizations = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "admin") {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
