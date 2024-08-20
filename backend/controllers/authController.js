import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import bcrypt from "bcrypt";
import crypto from "crypto";
import AppError from "../utils/appError.js";
import APIFeatures from "../utils/apiFeatures.js";
import Review from "../models/reviewModel.js";
import { sendEmail } from "../utils/email.js";
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
  res.cookie("jwt", token, cookieOptions);

  //Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
export const signup = catchAsync(async (req, res, next) => {
  const newCart = await Cart.create({});
  //only take fields that are required
  //never take role field -> security flaw otherwise
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    mobileNumber: req.body.mobileNumber,
    address: req.body.address,
    cart: newCart,
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
  // 3) If everything is okay, send token to client

  createSendToken(user, 200, res);
});
//check if logged in
export const protect = catchAsync(async (req, res, next) => {
  //get token and check if its there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; //Bearer tokenHere
  }
  if (!token) {
    //401 unauthroized
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }
  //verify token
  //decoded payload(userID here)
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //check if user still exists
  const freshUser = await User.findById(decoded.id);
  //what if someone altered payload of the token (fake user id)
  if (!freshUser) {
    return next(
      new AppError(
        "The token belonging to this user doesn't exist anymore",
        401
      )
    );
  }
  //check if user changed password after the token was issued
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password ! Please log in again", 401)
    );
  }
  req.user = freshUser;
  if (req.user.role === "admin") {
    req.isAdmin = true;
  }
  //grant access to protected routes
  next();
});
//authorization
export const restrictTo = (...roles) => {
  //roles is an array ['admin','seller']
  return (req, res, next) => {
    //1)run protect middleware => now we have user on req.user
    //2)check if user role is in the array of allowed roles
    if (!roles.includes(req.user.role)) {
      //403 forbidden
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
export const isAuthorizedToPatchOrDeleteReview = catchAsync(
  async (req, res, next) => {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(new AppError("No review found with that ID", 404));
    }

    //authorize admins anyway
    if (req.isAdmin) {
      return next();
    }

    // Check if the user ID in the review matches the logged-in user's ID
    if (review.user.toString() !== req.user.id) {
      return next(
        new AppError("You are not authorized to update this review", 403)
      );
    }

    next();
  }
);
export const forgetPassword = catchAsync(async (req, res, next) => {
  //1) get user based on email
  const user = await User.findOne({ email: req.body.email });
  console.log(user)
  if (!user) {
    return next(new AppError("There is not user with that email address", 404));
  }
  if(user.role ==="admin"){
    return next(new AppError("Admins cannot reset their password", 403))
  }
  //2) generate the random reset token
  const resetToken = user.createPasswordResetToken();
  console.log(resetToken)
  //we're only modifying passwordResetToken and passwordResetExpires, so we can't run validators
  //save as we only modfied, but we didn't save
  await user.save({ validateBeforeSave: false });
  // 3) create reset url
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  // 4) set email options
  const mailOptions = {
    to: user.email,
    subject: "Password Reset Request",
    text: `You have requested a password reset. Please click the link below to reset your password:\n\n${resetURL}.\n If you think this happened by mistake, You can safely ignore this email`,
    html: `
      <h1>Password Reset Request</h1>
      <p>You have requested a password reset. Please click the link below to reset your password, If you think this happened by mistake, You can safely ignore this email:</p>
      <a href="${resetURL}">Reset Password</a>
    `,
  };
  try {
    await sendEmail(mailOptions);
    res.status(200).json({
      status: "success",
      message: "Password reset email sent!, make sure to check spam folder",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});
export const resetPassword = catchAsync(async (req, res, next) => {
  //1) get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  //if token expired no user would be returned
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  //2) if token has not expired, and there is a user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  //3) update changedPasswordAt property for the user => done in preSave middleware
  //4)log the user in (send JWT)
  createSendToken(user, 200, res);
});
