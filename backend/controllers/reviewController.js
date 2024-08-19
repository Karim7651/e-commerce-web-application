import Review from "../models/reviewModel.js";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "./handlerFactory.js";

export const setProductUserIds = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
export const getAllReviews = getAll(Review);
export const getReview = getOne(Review);
export const updateReview = updateOne(Review);
export const createReview = createOne(Review);
export const deleteReview = deleteOne(Review);
