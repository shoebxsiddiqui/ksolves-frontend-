const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const User = require("../Models/userModel");
const { sendToken, getId } = require("../utils/jwtToken");

// Register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, phone_no } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    phone_no,
  });
  sendToken(user, 201, res);
});

//Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //checking if user has given email and password both
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Enail or Password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Enail or Password", 401));
  }

  sendToken(user, 200, res);
});

//Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Get User Deatils
exports.loadUser = catchAsyncErrors(async (req, res, next) => {
  if (!req.cookies.token) return next();

  const id = getId(req.cookies.token);
  const user = await User.findById(id);

  res.status(200).json({
    success: true,
    user,
  });
});
