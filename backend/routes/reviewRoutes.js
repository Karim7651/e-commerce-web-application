import express from "express";
import { protect, restrictTo,isAuthorizedToPatchOrDeleteReview } from "../controllers/authController.js";
import {
  createReview,
  getAllReviews,
  getReview,
  setProductUserIds,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

//allow to have access to ProductId here using merge params
const router = express.Router({ mergeParams: true });
//nested routes
//POST /product/productID/reviews
//GET /product/productID/reviews
//GET /product/productID/reviews/reviewID

router
  .route("/")
  .get(getAllReviews)
  .post(protect, restrictTo("customer"), setProductUserIds, createReview);
router
  .route("/:id")
  .get(getReview)
  .patch(protect, restrictTo("customer", "admin"),isAuthorizedToPatchOrDeleteReview, updateReview)
  .delete(protect, restrictTo("customer", "admin"),isAuthorizedToPatchOrDeleteReview, deleteReview);
export default router;
