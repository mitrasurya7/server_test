const router = require("express").Router();
const userRoutes = require("./user.routes");
const ebookRoutes = require("./ebook.routes");
const { authenticate } = require("../middlewares/authentication");

router.use("/users", userRoutes);
router.use(authenticate);
router.use("/ebooks", ebookRoutes);

module.exports = router;
