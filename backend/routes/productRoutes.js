import express from "express";
import reviewRouter from "./reviewRoutes.js";

import { protect, restrictTo } from "../controllers/authController.js";
import {
  resizeProductImages,
  uploadProductImages,
  createProduct,
  getAllProductsUser,
  getProduct,
  updateProduct,
  getRandomProductsFromSameCategory,
  convertDescriptionToArray,
} from "../controllers/productController.js";
import { createReview } from "../controllers/reviewController.js";

const router = express.Router();

router.use("/:productId/reviews", reviewRouter);
router.route("/from-category").get(getRandomProductsFromSameCategory);

router
  .route("/")
  .get(getAllProductsUser)
  .post(
    protect,
    restrictTo("admin", "seller"),
    uploadProductImages,
    convertDescriptionToArray,
    resizeProductImages,
    createProduct
  );
router.route("/:id").get(getProduct).patch(updateProduct);
router
  .route("/:productId/reviews")
  .post(protect, restrictTo("customer"), createReview);
export default router;
