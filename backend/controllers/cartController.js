import Cart from "../models/cartModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
export const getCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.user.cart._id);

  res.status(200).json(cart);
});

export const updateCart = catchAsync(async (req, res, next) => {
  const { update, override, products, productId, quantity } = req.body;
  console.log(products)

  const cart = await Cart.findById(req.user.cart._id);

  if (override) {
    if (!Array.isArray(products) || products.length === 0) {
      return next(
        new AppError(
          "Products must be an array and cannot be empty when overriding.",
          400
        )
      );
    }

    cart.products = products.map((item) => ({
      product: item.productId,
      quantity: Math.max(1, Number(item.quantity)),
    }));
  } else {
    if (productId && quantity) {
      if (Number(quantity) <= 0) {
        return next(new AppError("Quantity has to be at least 1", 400));
      }

      const productIndex = cart.products.findIndex((prod) =>
        prod.product.equals(productId)
      );

      const parsedQuantity = Number(quantity);

      if (productIndex > -1) {
        if (update) {
          cart.products[productIndex].quantity = parsedQuantity;
        } else {
          cart.products[productIndex].quantity += parsedQuantity;
        }
      } else {
        cart.products.push({ product: productId, quantity: parsedQuantity });
      }
    } else {
      return next(
        new AppError("productId and quantity must be provided.", 400)
      );
    }
  }
  await cart.populate('products.product');
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
