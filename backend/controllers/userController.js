const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
// const { validationResult } = require("express-validator");
const bcrpyt = require("bcryptjs");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary =  require("cloudinary")



// Creating or we can say registering the user

// We have created sendToken in utilis so that we have to send only three arguments with sendToken we dont have to write the token and res and json again and again.

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

  // req.body.profile
  
  const myCloud = await cloudinary.v2.uploader.upload(req.body.profile ,{
    folder:"profiles",
    width:150,
    crop:"scale",
  });
  // req.body.user = req.user._id;
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    profile: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});


// Login User


exports.loginUser = async (req, res, next) => {

  let success = false;

  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success,
        message: "Please enter Email and Password",
      })
    }
    let user = await User.findOne({ email }).select("+password")
    if (!user) {
      res.status(401).json({
        success,
        message: "Invalid Email or Password"

      })
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      res.status(401).json({
        success,
        message: "Invalid Email or Password",
      })
    }
    // const token = user.getJWTToken();
    // res.status(200).json({
    //     success:true,
    //     message:"User Loggedin Successfully. ",
    //     token
    // });
    sendToken(user, 201, res);

  } catch (error) {
    console.log("Error while logging in: ", error)
  }
}

// LogOut User

exports.logOutUser = catchAsyncErrors(async (req, res, next) => {

  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    success: "true",
    message: "Logged Out Successfully",
    
  })
});

// Forget Password

exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();
  await user.updateOne({resetToken})
  await user.save({ validateBeforeSave: false });
  console.log('Reset Token:', resetToken);
  console.log('Hashed Reset Token:', user.resetPasswordToken);


  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/password/reset/${resetToken}`;
  
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    
  
  console.log("DDFDFDF", resetPasswordUrl)

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
      user,
    });
  } catch (error) {
    // user.resetPasswordToken = undefined;
    // user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});


// Reset Password

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  console.log('URL Token:', req.params.token);
  console.log('Hashed URL Token:', resetPasswordToken);

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler('Reset Password Token is invalid or has expired', 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Passwords do not match', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get user details

exports.getUserDetails = catchAsyncErrors(async(req, res, next) =>{
  const user = await User.findById(req.user.id)
  // console.log("userdetails",user);

  res.status(200).json({
    success:true,
    user
  })
})


// Update Password 

exports.updatePassword = catchAsyncErrors(async(req, res, next)=>{
  const user = await User.findById(req.user.id).select("+password")

  
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
      res.status(401).json({
        success:false,
        message: "Invalid Old Password",
      })
    }
    if(req.body.newPassword !== req.body.confirmPassword){
      res.status(400).json({
        suceess:false,
        message:"Password does not matched"
      })
    }

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200 ,res);
  
})

// update complete User Profile

exports.updateProfile = catchAsyncErrors(async(req, res, next) =>{
  const newUserData ={
    name:req.body.name,
    email:req.body.email
  }

//   if(req.body.profile !== ""){
//     const user = await User.findById(req.user.id);

//     const imageId = user.profile.public_id;

//     await cloudinary.v2.uploader.destroy(imageId);

 
//   const myCloud = await cloudinary.v2.uploader.upload(req.body.profile ,{
//     folder:"profiles",
//     width:150,
//     crop:"scale",
//   });

//   newUserData.profile ={
//     public_id: myCloud.public_id,
//       url: myCloud.secure_url,
//   }

// }

  const user = await User.findByIdAndUpdate(req.user.id , newUserData, {
    new:true,
    runvalidators:true,
    useFindAndModify:true,
  })

  res.status(200).json({
    success:true,
    user
  })
})


// Get all Users --admin 

exports.getAllUsers  =catchAsyncErrors(async(req, res, next) =>{
  const users = await User.find();

  res.status(200).json({
    success:true,
    messsage:"All users fetched successfully",
    users
  })
})


// Get single user --admin 

exports.getSingleUserDetails = catchAsyncErrors(async(req, res, next) =>{
  const user = await User.findById(req.params.id)
  // console.log("userdetails",user);

  if(!user){
    res.status(400).json({
      success:false,
      message:`User with the id: ${req.params.id} not found`
    })
  }

  res.status(200).json({
    success:true,
    user
  })
})

// Update role -- admin

exports.updateRole = catchAsyncErrors(async(req, res, next) =>{
  const updateData ={
    name:req.body.name,
    email:req.body.email,
    role:req.body.role
  }

  const user = await User.findByIdAndUpdate(req.params.id , updateData, {
    new:true,
    runvalidators:true,
    useFindAndModify:false,
  })
  if(!user){
    res.status(400).json({
      success:false,
      message:`User with id: ${req.params.id} is not present in the database.`
    })
  }

  res.status(200).json({
    success:true,
    user
  })
})


// Delete User -- admin 

exports.deleteUser = catchAsyncErrors(async (req, res, next) =>{
  const user = await User.findByIdAndDelete(req.params.id)

  if(!user){
    res.status(400).json({
      success:false,
      message:`User with id: ${req.params.id} is not present in the database.`
    })
  }
  const imageId = user.profile.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  res.status(200).json({
    success:true,
    message:`user with id: ${req.params.id} Deleted Successfully `
  })
})