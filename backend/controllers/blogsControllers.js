import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Blog } from "../models/blog.model.js";
import { v2 as cloudinary } from "cloudinary";

export const postBlog = catchAsyncErrors(async (req, res, next) => {
  const { title, description, content, category, image } = req.body;

  if (!title || !description || !content || !category) {
    return res.status(400).json({
      success: false,
      message: "Please provide full blog details",
    });
  }
  const blogData = {
    title,
    description,
    content,
    category,
    author: req.user._id,
    // createdAt,
  };
  if (req.files && req.files.image) {
    const { image } = req.files;
    if (image) {
      try {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          image.tempFilePath,
          {
            folder: "Blogs",
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
        blogData.image = {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        };
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload image ",
        });
      }
    }
  }
  const blog = await Blog.create(blogData);

  return res.status(200).json({
    success: true,
    message: "Blog created successfully",
    blog,
  });
});

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    const response = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        folder: "Blogs",
      }
    );
    blog.title = req.body.title || blog.title;
    blog.description = req.body.description || blog.description;
    blog.content = req.body.content || blog.content;
    blog.category = req.body.category || blog.category;
    blog.image = {
      public_id: response.public_id || blog.image.public_id,
      url: response.secure_url || blog.image.url,
    };
    const updatedBlog = await blog.save();
    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      updatedBlog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBlog = async (res, req) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndRemove(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
