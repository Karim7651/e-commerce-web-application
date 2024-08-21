import Cart from "../models/cartModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
export const getCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.user.cart._id);

  res.status(200).json(cart);
});

export const updateCart = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const cart = await Cart.findById(req.user.cart._id);

  const productIndex = cart.products.findIndex(
    (item) => item.product.toString() === productId
  );

  if (productIndex > -1) {
    // Product exists in cart, update quantity
    cart.products[productIndex].quantity += quantity;
  } else {
    // Product does not exist, add to cart
    cart.products.push({ product: productId, quantity });
  }

  await cart.save();
  res.status(200).json(cart);
});
export const removeItemFromCart = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const cart = await Cart.findById(req.user.cart._id);


  // Remove the item from the cart
  cart.products = cart.products.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();
  res.status(200).json(cart);
});

export const clearCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.user.cart._id);

  cart.products = [];

  await cart.save();
  res.status(200).json(cart);
});
