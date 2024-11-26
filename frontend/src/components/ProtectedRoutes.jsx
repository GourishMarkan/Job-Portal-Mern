import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    // if (!user) {
    //   navigate("/login");
    // }
    if (!isAuthenticated) {
      navigate("/");
      toast.error("You need to login first.");
    }
  }, [isAuthenticated, navigate]);
  return isAuthenticated ? children : null;
};

export default ProtectedRoutes;
