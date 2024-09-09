const catchAsyncError = require("./catchAsyncError");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const jwt =  require("jsonwebtoken")

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }
    const decreptedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decreptedData.id);
    next();
});


exports.roleAutherized = (...roles)=>{
    return (req, res, next)=>
        {
    if(!roles.includes(req.user.role)){
        return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to acess this resource`,403));
    }
    next();
}
}