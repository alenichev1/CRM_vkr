const Router = require("express");
const router = new Router();
const KontragentController = require("../controllers/KontragentController");
//const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", KontragentController.create);
router.get("/", KontragentController.getAll);
router.delete("/:id", KontragentController.destroy);

module.exports = router;
