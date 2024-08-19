import { createOne, getAll, getOne, deleteOne } from "./handlerFactory.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Cart from "../models/cartModel.js"
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
export const getAllProductsAdmin = getAll(Product);
export const getProduct = getOne(Product);
export const deleteProduct = deleteOne(Product);
// Approve a product (set isApproved to true)
export const approveProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(
    id,
    { isApproved: true },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      approved: true,
    },
  });
});
export const createAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password,passwordConfirm,address,mobileNumber } = req.body;
  const role = "admin";
  const cart = await Cart.create({});
  const newUser = await User.create({
    name,
    email,
    password,
    role,
    passwordConfirm,
    address,
    mobileNumber,
    cart
  });

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

export const getAllUsers = getAll(User);
export const deleteUser = deleteOne(User);
