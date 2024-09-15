import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import { User } from "../models/user.model.js";

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  console.log("req.cookies", req.cookies);
  const { token } = req.cookies;
  console.log("token is", token);
  if (!token) {
    // return next(new ErrorHandler("Login first to access this resource", 401));
    return res.status(401).json({
      success: false,
      message: "Login first to access this resource",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decoded) {
    // return next(new ErrorHandler("Login first to access this resource", 401));
    return res.status(401).json({
      success: false,
      message: "Login first to access this resource",
    });
  }
  const user = await User.findById(decoded.id).select("-password");
  req.user = user;
  next();
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
