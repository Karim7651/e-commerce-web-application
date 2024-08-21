import express from "express";
import Cart from "../models/cartModel.js";
import { protect, restrictTo } from "../controllers/authController.js";
import {
  updateCart,
  getCart,
  removeItemFromCart,
  clearCart
} from "../controllers/cartController.js";
const router = express.Router();
router.use(protect, restrictTo("customer"));
router.get("/", getCart);
//add or update items in cart, clear the entire cart
router.route("/products").patch(updateCart).delete(clearCart);
router.delete("/products/:productId",removeItemFromCart)

export default router;
