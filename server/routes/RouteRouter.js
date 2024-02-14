const Router = require("express");
const router = new Router();
const RouteController = require("../controllers/RouteController");

router.post("/", RouteController.create);
router.get("/", RouteController.getAll);
router.delete("/:id", RouteController.destroy);
router.get("/:id", RouteController.getOne);

module.exports = router;
