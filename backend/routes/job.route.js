import express from "express";
import { isAuthenticatedUser, isAuthorized } from "../middlewares/auth.js";
import {
  postJob,
  getAllJobs,
  getASingleJob,
  getMyJobs,
  deleteJob,
} from "../controllers/jobsControllers.js";

const router = express.Router();
// router.post("/post", isAuthenticatedUser, isAuthorized("Employer"), postJob);
// router.get("/getall", getAllJobs);

router.post("/post", isAuthenticatedUser, isAuthorized("Employer"), postJob);
router.get("/getall", getAllJobs);
router.get(
  "/getmyjobs",
  isAuthenticatedUser,
  isAuthorized("Employer"),
  getMyJobs
);
router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  isAuthorized("Employer"),
  deleteJob
);
router.get("/get/:id", getASingleJob);
export default router;
