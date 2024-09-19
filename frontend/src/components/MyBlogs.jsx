import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllBlogErrors,
  fetchMyBlogs,
  resetBlogSlice,
  deleteBlog,
} from "../store/slices/blogSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const MyBlogs = () => {
  const [myBlogs, error, message, loading] = useSelector(
    (state) => state.blogs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMyBlogs());
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
  }, [error, message, dispatch]);
  const handleDeleteBlog = (e, id) => {
    e.preventDefault();
    dispatch(deleteBlog(id));
  };
  return <div>MyBlogs</div>;
};

export default MyBlogs;
