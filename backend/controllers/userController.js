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
    return next(new ErrorHandler("Please provide all the niches", 400));
  }

  if (req.files && req.files.resume) {
    const { resume } = req.files;
    if (resume) {
      const currentResume = req.user.resume.public_id;
      if (currentResume) {
        try {
          await cloudinary.uploader.destroy(currentResume);
        } catch (e) {
          return next(new ErrorHandler("Failed to delete pre resume", 500));
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
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  const user = await User.findById(req.user.id).select("+password");

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (newPassword != confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
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
      return next(new ErrorHandler("Please upload a resume", 400));
    }
    const currentResumeId = req.user.resume.public_id;
    console.log("currentResume", currentResumeId);
    if (currentResumeId) {
      try {
        await cloudinary.uploader.destroy(currentResumeId);
      } catch (e) {
        return next(new ErrorHandler("Failed to delete pre resume", 500));
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
