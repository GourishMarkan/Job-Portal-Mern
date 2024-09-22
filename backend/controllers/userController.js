import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/user.model.js";
import ErrorHandler from "../middlewares/error.js";
import { v2 as cloudinary } from "cloudinary";
import { sendToken } from "../utils/jwtToken.js";
import crypto from "crypto";
import {
  sendForgotPasswordEmail,
  sendPasswordResetEmail,
} from "../utils/sendEmail.js";
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
      // return next(new ErrorHandler("User already exists", 400));
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
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
            // return next(
            //   new ErrorHandler("Failed to upload resume to cloud.", 500)
            // );
            return res.status(500).json({
              success: false,
              message: "Failed to upload resume to cloudinary",
            });
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
      user: user,
    });
  } catch (e) {
    console.log("Error in registerUser", e.message);
    return res.status(400).json({
      success: false,
      message: " error is ${e.message}",
    });
  }
});

export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { role, email, password } = req.body;
  if (!email || !password || !role) {
    // return next(new ErrorHandler("role, email and password are required", 400));
    return res.status(400).json({
      success: false,
      message: "role, email and password are required",
    });
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    // return next(new ErrorHandler("Invalid email or password", 400));
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    // return next(new ErrorHandler("Invalid  password", 400));
    return res.status(400).json({
      success: false,
      message: "Invalid password",
    });
  }
  if (role != user.role) {
    // return next(new ErrorHandler("Invalid role", 400));
    return res.status(400).json({
      success: false,
      message: "Invalid role",
    });
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
    // return next(new ErrorHandler("User not found", 404));
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  res.status(200).json({
    success: true,
    user,
  });
});

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  // const {
  //   name,
  //   email,
  //   phoneNumber,
  //   address,
  //   firstNiche,
  //   secondNiche,
  //   thirdNiche,
  //   coverLetter,

  // } = req.body;
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    niches: {
      firstNiche: req.body.firstNiche,
      secondNiche: req.body.secondNiche,
      thirdNiche: req.body.thirdNiche,
    },
    coverLetter: req.body.coverLetter,
  };
  const { firstNiche, secondNiche, thirdNiche } = newUserData.niches;
  if (
    req.user.role === "JobSeeker" &&
    (!firstNiche || !secondNiche || !thirdNiche)
  ) {
    // return next(new ErrorHandler("Please provide all the niches", 400));
    return res.status(400).json({
      success: false,
      message: "Please provide all the niches",
    });
  }

  if (req.files && req.files.resume) {
    const { resume } = req.files;
    if (resume) {
      const currentResume = req.user.resume.public_id;
      if (currentResume) {
        try {
          await cloudinary.uploader.destroy(currentResume);
        } catch (e) {
          // return next(new ErrorHandler("Failed to delete pre resume", 500));
          return res.status(500).json({
            success: false,
            message: "Failed to delete pre resume",
          });
        }
      }
      const newResume = await cloudinary.uploader.upload(resume.tempFilePath, {
        folder: "Job_Seekers_Resume",
      });
      newUserData.resume = {
        public_id: newResume.public_id,
        url: newResume.secure_url,
      };
    }
  }
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
    message: "Profile updated successfully",
  });
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmPassword) {
    // return next(new ErrorHandler("Please fill all the fields", 400));
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  const user = await User.findById(req.user.id).select("+password");

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    // return next(new ErrorHandler("Old password is incorrect", 400));
    return res.status(400).json({
      success: false,
      message: "Old password is incorrect",
    });
  }

  if (newPassword != confirmPassword) {
    // return next(new ErrorHandler("Password does not match", 400));
    return res.status(400).json({
      success: false,
      message: "Password does not match",
    });
  }

  user.password = newPassword;
  await user.save();
  sendToken(user, 200, res, "Password updated successfully");
});

export const updateResume = catchAsyncErrors(async (req, res, next) => {
  if (req.files) {
    const { resume } = req.files;
    console.log("resume", resume);
    if (!resume) {
      // return next(new ErrorHandler("Please upload a resume", 400));
      return res.status(400).json({
        success: false,
        message: "Please upload a resume",
      });
    }
    const currentResumeId = req.user.resume.public_id;
    console.log("currentResume", currentResumeId);
    if (currentResumeId) {
      try {
        await cloudinary.uploader.destroy(currentResumeId);
      } catch (e) {
        // return next(new ErrorHandler("Failed to delete pre resume", 500));
        return res.status(500).json({
          success: false,
          message: "Failed to delete pre resume",
        });
      }
    }
    const newResume = await cloudinary.uploader.upload(resume.tempFilePath, {
      folder: "Job_Seekers_Resume",
    });
    console.log("temp file", resume.tempFilePath);
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        resume: {
          public_id: newResume.public_id,
          url: newResume.secure_url,
        },
      },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    res.status(200).json({
      success: true,
      user,
      message: "Resume updated successfully",
    });
  }
});

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found with this email",
      });
    }

    // generate reset password token---
    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    // resetPasswordToken: String;
    // resetPasswordExpire: Date;
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordTokenExpire = resetPasswordTokenExpiresAt;
    await user.save();

    await sendForgotPasswordEmail(
      user.email,
      `${process.env.FRONTEND_URL}/reset-password/${resetPasswordToken}`
    );
    return res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export const resetPassword = catchAsyncErrors(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  if (!token || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide password or  invalid token",
    });
  }
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordTokenExpire: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid token or token has been expired",
    });
  }
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiresAt = undefined;
  await user.save();

  await sendPasswordResetEmail(user.email);
  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});
