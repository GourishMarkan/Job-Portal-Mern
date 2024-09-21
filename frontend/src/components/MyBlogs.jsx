import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllBlogErrors,
  fetchMyBlogs,
  resetBlogSlice,
  deleteBlog,
} from "../store/slices/blogSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Pagination from "./Pagination";
const MyBlogs = () => {
  const { myBlogs, error, message, loading, limit, totalPages } = useSelector(
    (state) => state.blogs
  );
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(currentPage);
    dispatch(fetchMyBlogs(currentPage, limit));
  }, [currentPage, dispatch]);

  useEffect(() => {
    console.log(totalPages);
    if (error) {
      toast.error(error);
      dispatch(clearAllBlogErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetBlogSlice());
    }
  }, [error, message, dispatch, currentPage]);

  const handleDeleteBlog = (e, id) => {
    e.preventDefault();
    dispatch(deleteBlog(id));
    dispatch(fetchMyBlogs(currentPage, limit));
  };

  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container  mx-auto p-4">
          {myBlogs.length === 0 ? (
            <p className="text-center text-gray-500">No updates found</p>
          ) : (
            <div className="flex  flex-col mx-2 mt-5">
              {myBlogs.map((blog) => {
                return (
                  <div key={blog._id} className="w-full px-2 mb-4">
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
                          className="w-full h-fit object-cover"
                        />
                      </div>
                      <div className=" flex  flex-col md:w-2/3 p-4 ">
                        <h2 className="text-xl font-bold mb-2 my-3">
                          {blog.title}
                        </h2>
                        <h3 className="text-xl font-semibold mb-2 my-3">
                          {blog.heading}
                        </h3>
                        <p className="text-gray-700 mb-4 my-3">
                          {blog.description.slice(0, 100)}
                        </p>
                        {/* <div className="flex-grow"></div> */}
                        <div className="flex-grow"></div>
                        <small className="text-gray-500 my-3 self-end">
                          posted on:
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </small>
                        <div className="flex items-center">
                          <Link
                            to={`/blog/${blog._id}`}
                            className="bg-blue-500 text-white px-4 py-2 mt-8 ml-4 my-3 inline-block self-end  "
                          >
                            View
                          </Link>
                          <Link
                            to={`/edit-blog/${blog._id}`}
                            className="bg-blue-500 text-white px-4 py-2 mt-8 ml-4 my-3 inline-block self-end"
                          >
                            Edit
                          </Link>
                          <button
                            className=" border-none bg-[#111] text-[#fff] py-2 px-5 text-xl rounded-lg ml-40 hover:bg-yellow-400 transition-colors duration-300"
                            onClick={(e) => handleDeleteBlog(e, blog._id)}
                          >
                            Delete Blog
                          </button>
                        </div>
                      </div>
                    </div>
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

// const BlogCard = ({ blog }) => {
//   return (
//     <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden mb-4">
//       <div className="md:w-1/3">
//         <img
//           src={blog.image.url}
//           alt={blog.title}
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <div className=" flex  flex-col md:w-2/3 p-4 ">
//         <h2 className="text-xl font-bold mb-2 my-3">{blog.title}</h2>
//         <h3 className="text-xl font-semibold mb-2 my-3">{blog.heading}</h3>
//         <p className="text-gray-700 mb-4 my-3">
//           {blog.description.slice(0, 100)}
//         </p>
//         {/* <div className="flex-grow"></div> */}
//         <div className="flex-grow"></div>
//         <small className="text-gray-500 my-3 self-end">
//           posted on:
//           {new Date(blog.createdAt).toLocaleDateString()}
//         </small>
//         <Link
//           to={`/view-daily-update/${blog._id}`}
//           className="bg-blue-500 text-white px-4 py-2 mt-8 ml-4 my-3 inline-block self-end  "
//         >
//           View
//         </Link>
//         <Link
//           to={`/view-daily-update/${blog._id}`}
//           className="bg-blue-500 text-white px-4 py-2 mt-4 ml-4 inline-block"
//         >
//           Edit
//         </Link>
//         <button
//           className=" border-none bg-[#111] text-[#fff] py-2 px-5 text-xl rounded-lg ml-40 hover:bg-yellow-400 transition-colors duration-300"
//           onClick={handleDeleteBlog(blog._id)}
//         >
//           Delete Application
//         </button>
//       </div>
//     </div>
//   );
// };
export default MyBlogs;
