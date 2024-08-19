import { mongoose } from "mongoose";
import crypto from "crypto";
import validator from "validator";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Please provide an address"],
    select: false,
    trim: true,
  },
  mobileNumber: {
    type: String,
    required: [true, "Please provide a phone number"],
    select: false,
    validate: [validator.isMobilePhone, "Please provide a valid mobile number"],
    trim: true,
  },
  role: {
    type: String,
    enum: ["customer", "seller", "admin"],
    default: "customer",
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minlength: 8,
    required: true,
    select: false,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      //this works on create and save only
      validator: function (confrimPassword) {
        return confrimPassword === this.password;
      },
      message: "Passwords do not match",
    },
  },
  //customer : cart
  //1 : 1
  cart: {
    type: mongoose.Schema.ObjectId,
    ref: "Cart",
    unique: true,
  },
  //seller : products
  //1      : few
  productsSold: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  ],
  //customer : orders
  //1        : m(few)
  orderHistory: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Order",
    },
  ],
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});
// Middleware to populate the cart field for find queries
userSchema.pre(/^find/, function (next) {
  // if(this.role === 'seller'){
  //   this.populate({
  //     path: 'productsSold',
  //     select: 'name description ratingsAverage price priceDiscount',
  //   })
  // }
  this.populate({
    path: "cart",
    select: "products", // Customize fields as needed
  }).populate({
    path: "productsSold",
    select: "name description ratingsAverage price priceDiscount",
  });
  next();
});
userSchema.pre("save", async function (next) {
  //only run this if password was modified
  if (!this.isModified("password")) return next();
  //number of rounds
  //don't block event loop (use async version)
  this.password = await bcrypt.hash(this.password, 12);
  //it is required input but not required in db, we just use required as backend validation
  this.passwordConfirm = undefined;
  next();
});

//instance method to confirm if login password is same as stored(encrypted) password
userSchema.methods.isCorrectPassword = async function (
  candidatePassword,
  userPassword
) {
  //this points at current document
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  //if user changed his password before
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    ); //convert to format, base 10
    //password changed after jwt changed don't authorize
    return JWTTimestamp < changedTimeStamp;
  }
  //password didn't change
  return false;
};
const User = mongoose.model("User", userSchema);
export default User;
