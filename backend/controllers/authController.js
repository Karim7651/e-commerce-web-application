import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AppError from "../utils/appError.js";

const signToken = (id) => {
  //payload is user id
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  //header is algorithm / typ
  //payload is user id, issued at and expiration time in sec
  //signature is the secret
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 //  day in ms * 90 in env
    ),
    //secure : true // we need https to use this
    httpOnly: true, // can't be modified by browser
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  console.log(token)
  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  //user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
export const signup = catchAsync(async (req, res, next) => {
  console.log(req.body);
  //only take fields that are required
  //never take role field -> security flaw otherwise
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    mobileNumber: req.body.mobileNumber,
    address: req.body.address,
  });
  createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1) check if email and password exist
  if (!email || !password) {
    //400 bad request
    return next(new AppError("Please provide email and password", 400));
  }
  //2) check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.isCorrectPassword(password, user.password))) {
    //make it vague don't specify which one is wrong
    return next(new AppError("Incorrect email or password", 401));
  }
  //3) if everything is okay send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});
