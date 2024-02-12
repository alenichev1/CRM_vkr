const Router = require("express");
const router = new Router();
const StatusController = require("../controllers/StatusController");

router.post("/", StatusController.create);
router.get("/", StatusController.getAll);
router.delete("/:id", StatusController.destroy);

module.exports = router;
