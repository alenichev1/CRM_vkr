const Router = require("express");
const router = new Router();
const RouteGroupController = require("../controllers/RouteGroupController");

router.post("/", RouteGroupController.create);
router.get("/", RouteGroupController.getAll);
router.delete("/:id", RouteGroupController.destroy);
router.get("/:id", RouteGroupController.getOne);

module.exports = router;
