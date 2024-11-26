import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PostApplication from "./pages/PostApplication";
import Jobs from "./pages/Jobs";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./store/slices/userSlice";
import CreateBlog from "./components/CreateBlog";
import AllBlogs from "./pages/AllBlogs";
import ViewBlogs from "./pages/ViewBlogs";
import EditBlogs from "./components/EditBlogs";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoutes from "./components/ProtectedRoutes";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          {/* <Route element={<ProtectedRoutes />}> */}
          <Route
            path="/jobs"
            element={
              <ProtectedRoutes>
                <Jobs />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/post/application/:jobId"
            element={
              <ProtectedRoutes>
                <PostApplication />
              </ProtectedRoutes>
            }
          />
          <Route
            path="dashboard/create-blog"
            element={
              <ProtectedRoutes>
                <CreateBlog />
              </ProtectedRoutes>
            }
          />
          <Route
            path="blogs"
            element={
              <ProtectedRoutes>
                <AllBlogs />
              </ProtectedRoutes>
            }
          />
          <Route
            path="blog/:id"
            element={
              <ProtectedRoutes>
                <ViewBlogs />
              </ProtectedRoutes>
            }
          />
          <Route
            path="edit-blog/:id"
            element={
              <ProtectedRoutes>
                <EditBlogs />
              </ProtectedRoutes>
            }
          />
          {/* </Route> */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-right" theme="dark" />
      </Router>
    </>
  );
}

export default App;
