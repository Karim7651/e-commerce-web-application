import { mongoose } from "mongoose";
import { slugify } from "slugify";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      unique: true,
      trim: true, //remove starting trailing spaces
      maxlength: [40, "A product name must at most 40 characters"],
      minlength: [10, "A product name must at most 3 characters"],
    },
    slug: String,
    description: {
      type: String,
      required: [true, "A product must have a description"],
      trim: true, //remove starting trailing spaces
      maxlength: [200, "A product description must at most 200 characters"],
      minlength: [20, "A product name must at most 20 characters"],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: "Discount price ({VALUE}) should be below regular price",
      },
    },
    mainCategory: {
      type: String,
    },
    subCategories: [String],
    imageCover: {
      type: String,
      required: [true, "A product must have a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
productSchema.index({ price: 1, ratingsAverage: -1 });
productSchema.index({ slug: 1 });
productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});
productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const Product = mongoose.model("Product", productSchema);
export default Product;
