import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllBlogErrors,
  fetchSingleBlog,
  resetBlogSlice,
} from "../store/slices/blogSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const ViewBlogs = () => {
  const { loading, error, message, singleBlog } = useSelector(
    (state) => state.blogs
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleBlog(id));
  }, []);

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

  return (
    <div className=" container flex flex-col max-w-screen max-h-full mt-1 h-screen mx-auto p-6 border border-gray-300 bg-white rounded-lg overflow-y-auto mb-2">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold mt-1">{singleBlog.title}</h1>
        <h2 className="text-xl font-semibold mt-2 p-2">{singleBlog.heading}</h2>
      </div>
      {/* <img
        src={singleBlog.image?.url}
        alt="blogImage"
        className="w-full h-[500px] mb-4"
      /> */}

      <LazyLoadImage
        src={singleBlog.image?.url}
        alt="blogImage"
        effect="blur"
        className=" w-screen h-fit mb-4 rounded-lg"
      />

      <p className="text-lg mb-4">{singleBlog.description}</p>
      <div className="text-base leading-relaxed">{singleBlog.content}</div>
    </div>
  );
};

export default ViewBlogs;
