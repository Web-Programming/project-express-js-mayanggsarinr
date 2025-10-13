const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product");

//url create - POST (/api/produk)
router.post("/", productController.create);
//url real all - GET (/api/produk)
router.get("/", productController.all);
//url read one - detail - GET (/api/produk/:api)
router.get("/:id", productController.detailproduk);
//url update - PUT (/api/produk/:id)
router.put("/:id", productController.update);
//url delete - DELETE (/api/produk/:id)
router.delete("/:id", productController.remove);

module.exports = router;

