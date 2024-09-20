import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleBlog,
  updateBlog,
  clearAllBlogErrors,
  resetBlogSlice,
} from "../store/slices/blogSlice";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const EditBlogs = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    heading: "",
    description: "",
    content: "",
    category: "",
    image: "",
  });

  const { singleBlog, loading, error, message } = useSelector(
    (state) => state.blogs
  );
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    setBlogData({ ...blogData, image: e.target.files[0] });
  };
  const navigateTo = useNavigate();
  const { id } = useParams();
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };
  useEffect(() => {
    dispatch(fetchSingleBlog(id));
  }, []);
  useEffect(() => {
    if (singleBlog) {
      setBlogData(singleBlog);
    }
    if (error) {
      toast.error(error);
      dispatch(clearAllBlogErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetBlogSlice());
      // navigateTo("/dashboard");
    }
  }, [error, message, dispatch, loading]);

  const EditBlog = (e) => {
    e.preventDefault();
    console.log(blogData);
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("heading", blogData.heading);
    formData.append("description", blogData.description);
    formData.append("content", blogData.content);
    formData.append("category", blogData.category);
    if (blogData.image) {
      formData.append("image", blogData.image);
    }
    // console.log(formData.title);
    dispatch(updateBlog(id, formData));
    setTimeout(() => {
      navigateTo("/dashboard");
    }, 6000);
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
    <div className="container h-screen mx-auto flex flex-col gap-2 overflow-auto mb-2">
      <h3 className="text-3xl font-semibold text-center text-yellow-200">
        Edit a Blog
      </h3>
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
      <div className=" flex flex-row justify-center items-center mb-2">
        <button
          className="w-fit border-none bg-[#111] text-[#fff] py-2 px-5 text-xl rounded-lg ml-40 hover:bg-yellow-400 transition-colors duration-300"
          onClick={EditBlog}
          disabled={loading}
        >
          Edit Blog
        </button>
      </div>
    </div>
  );
};

export default EditBlogs;
