const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user");

router.post("/", userController.create);
router.get("/", userController.all);
router.get("/:id", userController.detailuser);
router.post("/:id", userController.update);
router.post("/:id", userController.remove);

module.exports = router;