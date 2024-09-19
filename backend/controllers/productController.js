import { createOne, getAll, getOne } from "./handlerFactory.js";
import Product from "../models/productModel.js";
import multer from "multer";
import sharp from "sharp";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import APIFeatures from "../utils/apiFeatures.js";
import mongoose from "mongoose";
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/img/productsMain"); //cb => next
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

//first parameter of cb is error
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  //only allow image files
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    //400 bad request
    cb(new AppError("Not an image ! Please upload only images.", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
export const resizeProductImages = catchAsync(async (req, res, next) => {
  const name = req.body.name;
  console.log(name);
  if (!name) {
    return next(new AppError("A product must have title", 400));
  }
  const product = await Product.findOne({ name });
  if (product) {
    return next(new AppError("Product with this title already exists", 400));
  }
  if (!req.files.imageCover || !req.files.images) {
    return next(
      new AppError(
        "A product must have a cover image and at least one descriptive image",
        400
      )
    );
  }
  //1) cover image
  const imageCoverFileName = `user-${req.user.id}-${Date.now()}-cover.png`;
  await sharp(req.files.imageCover[0].buffer)
    .toFormat("png")
    .png({ quality: 90 })
    .toFile(`public/img/products/${imageCoverFileName}`);
  //make sure handlerFactory includes this image and also next routeHandler
  req.body.imageCover = imageCoverFileName;
  //2) images
  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const fileName = `user-${req.user.id}-${Date.now()}-${i + 1}.png`;

      await sharp(file.buffer)
        .toFormat("png")
        .png({ quality: 90 })
        .toFile(`public/img/products/${fileName}`);
      //make sure handlerFactory includes this image and also next routeHandler
      req.body.images.push(fileName);
    })
  );
  next();
});
export const uploadProductImages = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

export const convertDescriptionToArray = (req, res, next) => {
  if (req.body.description && typeof req.body.description === 'string') {
    // Convert the description into an array
    req.body.description = req.body.description.split(',').map(item => item.trim());
  }
  console.log(req.body)
  next();
};
export const createProduct = createOne(Product);

export const getAllProductsUser = catchAsync(async (req, res) => {
  let query = Product.find({ isHidden: false, isApproved: true });
  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .search()
    .limitFields()
    .paginate();
  const products = await features.query;
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      data: products,
    },
  });
});

//populate with virtual populate fields reviews
export const getProduct = getOne(Product, { path: "reviews" });

export const updateProduct = catchAsync(async (req, res, next) => {});

export const getRandomProductsFromSameCategory = async (req, res) => {
  try {
    const { subCategories, excludedProductId, limit } = req.query;

    if (!subCategories || !excludedProductId) {
      return res.status(400).json({
        status: "fail",
        message: "subCategories and excludedProductId are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(excludedProductId)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid excludedProductId",
      });
    }

    const categoriesArray = Array.isArray(subCategories)
      ? subCategories
      : subCategories.split(",");

    const validLimit = parseInt(limit, 10);
    const size = isNaN(validLimit) || validLimit <= 0 ? 3 : validLimit;

    const randomProducts = await Product.aggregate([
      {
        $match: {
          _id: { $ne: new mongoose.Types.ObjectId(excludedProductId) },
          subCategories: { $in: categoriesArray },
        },
      },
      {
        $sample: { size },
      },
    ]);

    // Manually apply `toObject` or `toJSON` to include virtuals
    const productsWithVirtuals = randomProducts.map(product =>
      new Product(product).toObject({ virtuals: true })
    );

    res.status(200).json({
      status: "success",
      results: productsWithVirtuals.length,
      data: {
        products: productsWithVirtuals,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
