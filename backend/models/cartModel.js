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
        min: [1, "Quantity must be at least 1"], 
      },
    },
  ],
});

cartSchema.set("toObject", { virtuals: true });
cartSchema.set("toJSON", { virtuals: true });


cartSchema.virtual("totalPrice").get(function () {
  if (!this.populated("products.product")) {
    return 0;
  }
  // array.reduce(callback(accumulator, currentValue), initialValue);
  return this.products.reduce((total, item) => {
    return total +( item.product.price - item.product.priceDiscount) * item.quantity;
  }, 0);
});

// Virtual field for totalNumberOfItems calculated upon request
cartSchema.virtual("totalNumberOfItems").get(function () {
  return this.products.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
});


cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "products.product",
    select: "name price priceDiscount",
  });
  next();
});
cartSchema.pre('save', async function (next) {
  // Populate products.product to ensure prices are available
  await this.populate('products.product');
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
