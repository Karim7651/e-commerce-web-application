import { mongoose } from "mongoose";
const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
        min: [1, "Quantity must be at least 1"], // Validation to ensure quantity >= 1
      },
    },
  ],
});
cartSchema.set("toObject", { virtuals: true });
cartSchema.set("toJSON", { virtuals: true });
//virtual field for totalPrice calculated upon request
cartSchema.virtual("totalPrice").get(function () {
  if (!this.populated("products.product")) {
    return 0;
  }
  //array.reduce(callback(accumulator, currentValue), initialValue);
  return this.products.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
});

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "products.product",
    select: "name price",
  });
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
