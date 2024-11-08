import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchAllBlogs,
  clearAllBlogErrors,
  resetBlogSlice,
} from "../store/slices/blogSlice";
import { useNavigate, Link } from "react-router-dom";
// import Blogs from "../components/Blogs";
import Spinner from "../components/Spinner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Pagination from "../components/Pagination";
const AllBlogs = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { blogs, loading, error, message, limit, totalPages } = useSelector(
    (state) => state.blogs
  );
  const [currentPage, setCurrentPage] = useState(1);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllBlogs(currentPage, limit));
  }, [currentPage]);
  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
      toast.error("You need to login first.");
    }
    if (error) {
      toast.error(error);
      dispatch(clearAllBlogErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetBlogSlice());
    }
    // console.log(blogs);
  }, [isAuthenticated, error, message, dispatch]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container h-screen mx-auto p-4 overflow-y-auto">
          <h3 className="text-3xl text-center text-yellow-300">
            Daily updated blogs on various technologies and topics
          </h3>
          {blogs.length === 0 ? (
            <p className="text-center text-gray-500">No updates found</p>
          ) : (
            <div className=" h-screen flex  flex-wrap mx-2 mt-5">
              {blogs.map((blog) => {
                return (
                  <div key={blog._id} className="w-full px-2 mb-4">
                    <BlogCard blog={blog} />
                    {/* <h1>working</h1> */}
                  </div>
                );
              })}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
const BlogCard = ({ blog }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden mb-4">
      <div className="md:w-1/3">
        {/* <img
          src={blog.image?.url}
          alt={blog.title}
          className="w-full h-full object-cover"
        /> */}
        <LazyLoadImage
          alt={blog.title}
          src={blog.image?.url}
          effect="blur"
          // width={500}
          className="w-full h-fit object-cover rounded-lg"
        />
      </div>
      <div className=" flex  flex-col md:w-2/3 p-4 ">
        <h2 className="text-xl font-bold mb-2 my-3">{blog.title}</h2>
        <h3 className="text-xl font-semibold mb-2 my-3">{blog.heading}</h3>
        <p className="text-gray-700 mb-4 my-3">
          {blog.description.slice(0, 100)}
        </p>
        {/* <div className="flex-grow"></div> */}
        <div className="flex-grow"></div>
        <small className="text-gray-500 my-3 self-end">
          posted on:
          {new Date(blog.createdAt).toLocaleDateString()}
        </small>
        <Link
          to={`/blog/${blog._id}`}
          className="bg-blue-500 text-white px-4 py-2 mt-8 ml-4 my-3 inline-block self-end hover:bg-orange-600  "
        >
          View
        </Link>
        {/* <Link
        to={`/view-daily-update/${blog._id}`}
        className="bg-blue-500 text-white px-4 py-2 mt-4 ml-4 inline-block"
      >
        Edit
      </Link> */}
      </div>
    </div>
  );
};
export default AllBlogs;
