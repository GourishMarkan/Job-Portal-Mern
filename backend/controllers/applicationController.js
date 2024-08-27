import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/application.model.js";
import { Job } from "../models/jobs.model.js";
import { v2 as cloudinary } from "cloudinary";
export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phoneNumber, address, resume, coverLetter } = req.body;
  if ((!name, !email, !phoneNumber, !address, !coverLetter)) {
    return next(new ErrorHandler("Please provide all the details", 400));
  }

  const jobSeekerInfo = {
    id: req.user._id,
    name,
    email,
    phoneNumber,
    address,
    resume,
    coverLetter,
    role: "Job Seeker",
  };

  const jobDetails = await Job.findById(id);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found", 404));
  }

  const isAlreadyApplied = await Application.findOne({
    "jobInfo.jobId": id,
    "jobSeekerInfo.id": req.user._id,
  });

  if (isAlreadyApplied) {
    return next(new ErrorHandler("You have already applied for this job", 400));
  }

  if (req.files && req.files.resume) {
    const { resume } = req.files;
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath,
        {
          folder: "Job_Seekers_Resume",
        }
      );
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        return next(
          new ErrorHandler("Failed to upload resume to cloudinary.", 500)
        );
      }
      jobSeekerInfo.resume = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    } catch (error) {
      return next(
        new ErrorHandler(`Error in uploading resume ${error.message}`, 500)
      );
    }
  } else {
    if (req.user && !req.user.resume.url) {
      return next(new ErrorHandler("Please upload your resume", 400));
    }
    jobSeekerInfo.resume = {
      public_id: req.user.resume.public_id,
      url: req.user.resume.url,
    };
  }
  // employyer info
  const employerInfo = {
    id: jobDetails.postedBy,
    role: "Employer",
  };
  // job info
  const jobInfo = {
    jobId: id,
    jobTitle: jobDetails.title,
  };

  const application = await Application.create({
    jobSeekerInfo,
    employerInfo,
    jobInfo,
  });
  res.status(200).json({
    success: true,
    message: "Application submitted successfully",
    application,
  });
});
export const employerGetApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { _id } = req.user;
    const applications = await Application.find({
      "employerInfo.id": _id,
      "deletedBy.employer": false,
    });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);
export const jobSeekerGetApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { _id } = req.user;
    console.log(_id);

    const applications = await Application.find({
      "jobSeekerInfo.id": _id,
      "deletedBy.jobSeeker": false,
    });
    console.log(applications);
    if (!applications) {
      return next(new ErrorHandler("No applications found", 404));
    }
    res.status(200).json({
      success: true,
      applications,
    });
  }
);
export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const application = await Application.findById(id);
  if (!application) {
    return new ErrorHandler("Application not found", 404);
  }
  const role = req.user.role;
  switch (role) {
    case "Job Seeker":
      application.deletedBy.jobSeeker = true;
      await application.save();
      break;
    case "Employer":
      application.deletedBy.employer = true;
      await application.save();
      break;
  }
  if (
    application.deletedBy.jobSeeker === true &&
    application.deletedBy.employer === true
  ) {
    await application.deleteOne();
  }
  res.status(200).json({
    success: true,
    message: "Application deleted successfully",
  });
});
