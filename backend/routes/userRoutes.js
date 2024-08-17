import express from "express";
import {
  signup,
  login,
  protect,
  restrictTo,
} from "../controllers/authController.js";
import {
  getAllUsers,
  getUser,
  createUser,
} from "../controllers/userController.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
//protect all routes after this middleware
router.use(protect);
//restrict those routes to admin
router.use(restrictTo("admin"));
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser);
export default router;
