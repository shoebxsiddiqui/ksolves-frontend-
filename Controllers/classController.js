const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const Class = require("../Models/classModel");
const { sendToken, getId } = require("../utils/jwtToken");

// Create Class
exports.createClass = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;
  const _class = await User.create({
    name,
  });
  sendToken(_class, 201, res);
});

// Get All Classes
exports.getClasses = catchAsyncErrors(async (req, res, next) => {
  let classes = await Class.find();

  res.status(200).json({
    success: true,
    classes,
  });
});

// Get class By Id
exports.getClass = catchAsyncErrors(async (req, res, next) => {
  let _class = await Class.findById(req.params.id);

  if (!_class) {
    return next(new ErrorHandler("Class Not Found", 404));
  }

  res.status(200).json({
    success: true,
    _class,
  });
});

// // Update Class
// exports.updateClass = catchAsyncErrors(async (req, res, next) => {
//   let _class = await Class.findById(req.params.id);

//   if (!_class) {
//     return next(new ErrorHandler("Class Not Found", 404));
//   }

//   res.status(200).json({
//     success: true,
//     _class,
//   });
// });

// Delete Class
