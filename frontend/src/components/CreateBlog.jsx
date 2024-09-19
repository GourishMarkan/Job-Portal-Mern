import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createBlog,
  resetBlogSlice,
  clearAllBlogErrors,
} from "../store/slices/blogSlice";
const CreateBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    heading: "",
    description: "",
    content: "",
    category: "",
    image: "",
  });

  const { loading, error, message } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    setBlogData({ ...blogData, image: e.target.files[0] });
  };
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllBlogErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetBlogSlice());
    }
  }, [error, message, dispatch, loading]);

  const postBlog = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("heading", blogData.heading);
    formData.append("description", blogData.description);
    formData.append("content", blogData.content);
    formData.append("category", blogData.category);
    if (blogData.image) {
      formData.append("image", blogData.image);
    }
    dispatch(createBlog(formData));
  };

  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-3xl font-semibold text-yellow-200">Post a Blog</h3>
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-3xl font-medium ">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={blogData.title}
          onChange={handleInputChange}
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
          placeholder="Enter blog title"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="heading" className="text-3xl font-medium ">
          heading
        </label>
        <input
          type="text"
          name="heading"
          value={blogData.heading}
          onChange={handleInputChange}
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
          placeholder="Enter blog heading"
        />
      </div>
      <div className="flex flex-col gap-2 relative">
        <label htmlFor=" category" className="text-3xl font-medium">
          category
        </label>

        <select
          name="category"
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
          onChange={handleInputChange}
          value={blogData.category}
          placeholder="jobNiche"
        >
          <option value="">Select category</option>
          {nichesArray.map((niche) => {
            return (
              <option value={niche} key={niche}>
                {niche}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-3xl font-medium ">
          description
        </label>
        <textarea
          type="text"
          name="description"
          rows={10}
          value={blogData.description}
          onChange={handleInputChange}
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
          placeholder="Enter blog description"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="text-3xl font-medium ">
          Content
        </label>
        <textarea
          type="text"
          rows={20}
          name="content"
          value={blogData.content}
          onChange={handleInputChange}
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
          placeholder="Enter blog title"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="image" className="text-3xl font-medium ">
          image
        </label>
        <input
          type="file"
          // rows={20}
          name="image"
          // value={blogData.title}
          onChange={handleImageChange}
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
          // placeholder="Enter blog title"
        />
      </div>
      <div className="flex-row justify-self-end items-end">
        <button
          className="w-fit border-none bg-[#111] text-[#fff] py-2 px-5 text-xl rounded-lg ml-40 hover:bg-yellow-400 transition-colors duration-300"
          onClick={postBlog}
          disabled={loading}
        >
          Post Job
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
