import express from "express";
import { protect, restrictTo } from "../controllers/authController.js";
import {
  getAllProductsAdmin,
  getProduct,
  approveProduct,
  deleteProduct,
  createAdmin,
  getAllUsers,
  deleteUser,
} from "../controllers/adminController.js";

const router = express.Router();
router.use(protect, restrictTo("admin"));

router.route("/users").get(getAllUsers).post(createAdmin);
router.route("/users/:id").delete(deleteUser);
router.route("/products").get(getAllProductsAdmin);
router
  .route("/products/:id")
  .get(getProduct)
  .patch(approveProduct)
  .delete(deleteProduct);
export default router;
