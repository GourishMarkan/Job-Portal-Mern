import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  postApplication,
  clearAllApplicationErrors,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";

import { toast } from "react-toastify";
const PostApplication = () => {
  const { singleJob } = useSelector((state) => state.jobs);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector(
    (state) => state.applications
  );
  return <div>PostApplication</div>;
};

export default PostApplication;
