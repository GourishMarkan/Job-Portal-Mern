import { isAuthenticatedUser, isAuthorized } from "../middlewares/auth";
import {
  deleteApplication,
  employerGetApplication,
  jobSeekerGetApplication,
  postApplication,
} from "../controllers/applicationController";
import express from "express";

const router = express.Router();

router.post(
  "/post-application",
  isAuthenticatedUser,
  isAuthorized("Job Seeker"),
  postApplication
);
// for employeer to get all application
router.get(
  "/employer/getall",
  isAuthenticatedUser,
  isAuthorized("Employer"),
  employerGetApplication
);
// for job seeker to get all application
router.get(
  "/jobseeker/getall",
  isAuthenticatedUser,
  isAuthorized("Job Seeker"),
  jobSeekerGetApplication
);

router.delete("/delete/:id", isAuthenticatedUser, deleteApplication);

export default router;
