const EbookRouter = require("express").Router();
const EbookController = require("../controllers/ebook.controller");
const upload = require("../helpers/multer");
const { authorizations } = require("../middlewares/authorization");

EbookRouter.get("/", EbookController.findAll);
EbookRouter.get("/:id", EbookController.findOne);
EbookRouter.use(authorizations);
EbookRouter.post("/", upload.single("ebook"), EbookController.create);
EbookRouter.get("/admin/list", EbookController.findAllByAdmin);
EbookRouter.patch("/:id", EbookController.patch);
EbookRouter.delete("/:id", EbookController.delete);

module.exports = EbookRouter;
