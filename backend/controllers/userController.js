import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/user.model.js";
import ErrorHandler from "../middlewares/error.js";
import { v2 as cloudinary } from "cloudinary";
import { sendToken } from "../utils/jwtToken.js";
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      name,
      password,
      email,
      phoneNumber,
      address,
      firstNiche,
      secondNiche,
      thirdNiche,
      role,
      coverLetter,
    } = req.body;
    if (!name || !password || !email || !phoneNumber || !address || !role) {
      return next(new ErrorHandler("Please fill all the fields", 400));
    }
    if (role === "JobSeeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
      return next(new ErrorHandler("Please provide all the niches", 400));
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler("User already exists", 400));
    }
    const userData = {
      name,
      password,
      email,
      phoneNumber,
      address,
      role,
      niches: {
        firstNiche,
        secondNiche,
        thirdNiche,
      },
      coverLetter,
    };

    if (req.files && req.files.resume) {
      const { resume } = req.files;
      if (resume) {
        try {
          const cloudinaryResponse = await cloudinary.uploader.upload(
            resume.tempFilePath,
            {
              folder: "Job_Seekers_Resume",
            }
          );
          if (!cloudinaryResponse || cloudinaryResponse.error) {
            return next(
              new ErrorHandler("Failed to upload resume to cloud.", 500)
            );
          }

          userData.resume = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          };
        } catch (e) {
          return next(new ErrorHandler("failed to upload resume", 500));
        }
      }
    }
    const user = await User.create(userData);
    // const hashedPassword = await user.hashPassword(password);
    // user.password = hashedPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (e) {
    console.log("Error in registerUser", e.message);
  }
});

export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { role, email, password } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("role, email and password are required", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid  password", 400));
  }
  if (role != user.role) {
    return next(new ErrorHandler("Invalid role", 400));
  }

  sendToken(user, 200, res, "User logged in successfully");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  };

  res.status(200).clearCookie("token", options).json({
    success: true,
    message: "Logged out",
  });
});

export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});
