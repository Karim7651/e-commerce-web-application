import express from "express";
import reviewRouter from "./reviewRoutes.js";

import { protect, restrictTo } from "../controllers/authController.js";
import {
  resizeProductImages,
  uploadProductImages,
  createProduct,
  getAllProducts,
  getProduct,
} from "../controllers/productController.js";
import { createReview } from "../controllers/reviewController.js";

const router = express.Router();
router.use("/:productId/reviews", reviewRouter);
// router.use(protect);
// router.use(restrictTo("admin", "seller"));
router
  .route("/")
  .get(getAllProducts)
  .post(
    protect,
    restrictTo("admin", "seller"),
    uploadProductImages,
    resizeProductImages,
    createProduct
  );
router.route("/:id").get(getProduct);
router
  .route("/:productId/reviews")
  .post(protect, restrictTo("customer"), createReview);
export default router;
