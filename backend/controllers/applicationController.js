import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/application.model.js";

export const postApplication = catchAsyncErrors(async (req, res, next) => {});
export const employerGetApplication = catchAsyncErrors(
  async (req, res, next) => {}
);
export const jobSeekerGetApplication = catchAsyncErrors(
  async (req, res, next) => {}
);
export const deleteApplication = catchAsyncErrors(async (req, res, next) => {});
