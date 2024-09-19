import { createOne, getAll, getOne } from "./handlerFactory.js";
import Product from "../models/productModel.js";
import multer from "multer";
import sharp from "sharp";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import APIFeatures from "../utils/apiFeatures.js";

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
    const { mainCategory, excludedProductId } = req.body;

    // Validate if the required data is provided
    if (!mainCategory || !excludedProductId) {
      return res.status(400).json({
        status: 'fail',
        message: 'mainCategory and excludedProductId are required',
      });
    }

    // Use aggregation to match the category, exclude the current product, and get 3 random products
    const randomProducts = await Product.aggregate([
      {
        $match: {
          _id: { $ne: mongoose.Types.ObjectId(excludedProductId) }, // Exclude the product by its ID
          mainCategory: mainCategory, // Match the provided mainCategory
        },
      },
      {
        $sample: { size: 3 }, // Randomly sample 3 products
      },
    ]);

    res.status(200).json({
      status: 'success',
      results: randomProducts.length,
      data: {
        products: randomProducts,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};