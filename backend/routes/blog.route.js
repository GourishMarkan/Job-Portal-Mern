import { isAuthenticatedUser } from "../middlewares/auth.js";
import {
  postBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogsControllers.js";
import express from "express";

const router = express.Router();

router.post("/create", isAuthenticatedUser, postBlog);
router.get("/getall", getAllBlogs);
router.get("/get/:id", getBlogById);
router.put("/update/:id", isAuthenticatedUser, updateBlog);
router.delete("/delete/:id", isAuthenticatedUser, deleteBlog);
export default router;