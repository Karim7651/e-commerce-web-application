import { mongoose } from "mongoose";
import Product from "./productModel.js";
const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Rating is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to a product"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
  },
  {
    //include virtual properties
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//unique product user review combination
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  }).populate({
    path: "product",
    select: "name imageCover",
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (productId) {
  //this in static method points to the model

  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: "$product",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingsQuantity: 0,
      //default when there's no reviews
      ratingsAverage: 0,
    });
  }
};
//query middleware
// findByIdAndUpdate
// findByIdAndDelete
reviewSchema.pre(/^findOneAnd/, async function (next) {
  //in pre middlewares this referes to query object
  //used this.r to pass data from pre middleware to post middleware
  this.r = await this.model.findOne(this.getFilter());
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  // await this.findOne(); does NOT work here, query has already executed
  await this.r.constructor.calcAverageRatings(this.r.product);
});

//post because current review isn't in collection yet we'd have to wait until it is saved
//post middlewares don't have next() => makes sense
reviewSchema.post("save", function () {
  //this point to document
  //this.constructor = model
  this.constructor.calcAverageRatings(this.product);
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
