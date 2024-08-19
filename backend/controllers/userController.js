import APIFeatures from "../utils/apiFeatures.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { getAll,getOne, createOne} from "./handlerFactory.js";
import User from'../models/userModel.js'


export const getUser = getOne(User)
