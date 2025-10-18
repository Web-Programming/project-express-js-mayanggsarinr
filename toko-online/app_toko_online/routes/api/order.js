const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/order");

// Buat pesanan baru
router.post("/", orderController.create);

// Ambil semua pesanan
router.get("/", orderController.all);

// Ambil detail pesanan berdasarkan ID
router.get("/:id", orderController.detailorder);

// Update status pesanan
router.put("/:id", orderController.update);

module.exports = router;
