import { mongoose } from "mongoose";
import slugify from "slugify";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      unique: true,
      trim: true, //remove starting trailing spaces
      maxlength: [40, "A product name must at most 40 characters"],
      minlength: [3, "A product name must at least 3 characters"],
    },
    slug: String,
    description: {
      type: String,
      required: [true, "A product must have a description"],
      trim: true, //remove starting trailing spaces
      maxlength: [200, "A product description must at most 200 characters"],
      minlength: [5, "A product name must at least 5 characters"],
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
      required: [
        true,
        "A product must have a priceDiscount, you're allowed to set it to zero to sell at full value",
      ],
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
      required: [true, "A product must have a main category"],
    },
    subCategories: [String],
    imageCover: {
      type: String,
      required: [true, "A product must have a cover image"],
      select: false,
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
productSchema.virtual("finalPrice").get(function () {
  return this.price - (this.priceDiscount || 0);
});
// // Virtual for appending the full URL to imageCover
// productSchema.virtual("imageCoverURL").get(function () {
//   console.log(this.imageCover)
//   return `http://localhost:8000/productsMain/${this.imageCover}`;
// });

// // Virtual for appending the full URLs to images
// productSchema.virtual("imagesURLs").get(function () {
//   return this.images.map((image) => `http://localhost:8000/productsSub/${image}`);
// });
productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  //append static url to imageName
  this.imageCover = `${process.env.IMG_STATIC}/${this.imageCover}`;
  for (let i = 0; i < this.images.length; i++) {
    this.images[i] = `${process.env.IMG_STATIC}/${this.images[i]}`;
  }
  next();
});
const Product = mongoose.model("Product", productSchema);
export default Product;
