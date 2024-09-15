import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  deleteApplication,
  resetApplicationSlice,
  fetchEmployerApplications,
} from "../store/slices/applicationSlice";
// import { useNavigate } from "react-router-dom";

const Applications = () => {
  const { applications, loading, error, message } = useSelector(
    (state) => state.applications
  );
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const navigateTo = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }

    dispatch(fetchEmployerApplications());
  }, [dispatch, error, message]);
  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };
  return <div>Applications</div>;
};

export default Applications;
