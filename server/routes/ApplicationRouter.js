const Router = require("express");
const router = new Router();
const ApplicationController = require("../controllers/ApplicationController");

router.post("/", ApplicationController.create);
router.get("/", ApplicationController.getAll);
router.get("/:id", ApplicationController.getOne);
router.delete("/:id", ApplicationController.destroy);

module.exports = router;
