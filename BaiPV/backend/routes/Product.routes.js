const middlewareController = require("../controllers/Middleware.controllers");
const product = require("../controllers/Product.controller");
const upload = require("../utils/multer");

const router = require("express").Router();

router.get("/", product.getAllProduct);
router.get("/:id", product.getProductById);
router.post("/", upload.single("image"), product.createProduct);
router.put("/:id", upload.single("image"), product.updateProduct);
router.delete(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  product.deleteProduct
);

module.exports = router;
