import express from "express";
import {
  signup,
  login,
  protect,
  restrictTo,
} from "../controllers/authController.js";
import {
  getUser,
} from "../controllers/userController.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
//protect all routes after this middleware
router.use(protect);
router.route("/:id").get(getUser);
//restrict those routes to admin


export default router;
