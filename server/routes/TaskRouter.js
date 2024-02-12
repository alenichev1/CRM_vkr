const Router = require("express");
const router = new Router();
const TaskController = require("../controllers/TaskController");
//const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", TaskController.create);
router.get("/", TaskController.getAll);
router.delete("/:id", TaskController.destroy);

module.exports = router;
