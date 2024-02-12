const Router = require("express");
const router = new Router();
const DogovorInfoController = require("../controllers/DogovorInfoController");

router.post("/", DogovorInfoController.create);
router.get("/", DogovorInfoController.getAll);
router.delete("/:id", DogovorInfoController.destroy);

module.exports = router;
