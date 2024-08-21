import express from "express";
import {
  signup,
  login,
  protect,
  restrictTo,
  forgetPassword,
  resetPassword,
  updatePassword
} from "../controllers/authController.js";
import { getUser,updateMe,deleteMe } from "../controllers/userController.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgetPassword", forgetPassword);
router.patch("/resetPassword/:token", resetPassword);
router.patch("/updateMyPassword", protect, updatePassword);
router.patch("/updateMe",protect,updateMe)
router.delete("/deleteMe",protect,deleteMe)
//protect all routes after this middleware
router.use(protect);
router.route("/:id").get(getUser);
//restrict those routes to admin

export default router;
