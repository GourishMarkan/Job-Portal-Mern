import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Blog } from "../models/blog.model.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
export const postBlog = catchAsyncErrors(async (req, res, next) => {
  const { title, description, content, category, heading, image } = req.body;

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
    heading,
    author: req.user._id,
    // createdAt,
    // postedAt: createdAt,
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
  console.log(blog.createdAt);
  return res.status(200).json({
    success: true,
    message: "Blog created successfully",
    blog,
  });
});

export const getAllBlogs = async (req, res) => {
  const page = parseInt(req.query?.page) || 1;
  const limit = parseInt(req.query?.limit) || 10;
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const totalBlogs = await Blog.countDocuments();
    // console.log(Math.ceil(totalBlogs / limit));
    return res.status(200).json({
      success: true,
      blogs,
      page,
      totalPages: Math.ceil(totalBlogs / limit),
      totalBlogs,
      message: "All blogs fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getBlogsByUserId = async (req, res) => {
  const page = parseInt(req.query?.page) || 1;
  const limit = parseInt(req.query?.limit) || 10;
  try {
    const { id } = req.user;
    const blogs = await Blog.find({ author: id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit) // Skip blogs from previous pages
      .limit(limit);

    if (!blogs) {
      return res.status(404).json({
        success: false,
        message: "No blogs found",
      });
    }
    const totalBlogs = await Blog.countDocuments({ author: id });
    console.log(totalBlogs);
    console.log(Math.ceil(totalBlogs / limit));
    return res.status(200).json({
      success: true,
      blogs,
      page,
      totalPages: Math.ceil(totalBlogs / limit), // Calculate total pages
      totalBlogs,

      message: "All blogs fetched successfully",
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }
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
      message: "Blog found",
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
    // const response = await cloudinary.uploader.upload(
    //   req.files.image.tempFilePath,
    //   {
    //     folder: "Blogs",
    //   }
    // );
    blog.title = req.body.title || blog.title;
    blog.heading = req.body.heading || blog.heading;
    blog.description = req.body.description || blog.description;
    blog.content = req.body.content || blog.content;
    blog.category = req.body.category || blog.category;
    let updatedImage = {};
    // let response
    if (req.files && req.files.image) {
      const { image } = req.files;
      if (image) {
        try {
          // delete the previous image
          const cloudinaryResponse = await cloudinary.uploader.upload(
            image.tempFilePath,
            {
              folder: "Blogs",
            }
          );
          updatedImage = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          };
          // checking if the blog already has an image-
          if (blog.image.public_id) {
            const prev = await cloudinary.uploader.destroy(
              blog.image.public_id
            );
          }
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: error?.message || "Failed to update image",
          });
        }
      }
    }

    // console.log(blog.image);
    blog.image = updatedImage || blog.image;
    // console.log(blog.image);
    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
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
