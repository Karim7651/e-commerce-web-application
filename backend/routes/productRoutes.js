import express from "express";
import { protect, restrictTo } from "../controllers/authController.js";
import { resizeProductImages,uploadProductImages,createProduct,getAllProducts } from "../controllers/productController.js";
const router = express.Router();

// router.use(protect);
// router.use(restrictTo("admin", "seller"));
router.route("/").post(uploadProductImages,resizeProductImages,createProduct).get(getAllProducts);
export default router;
