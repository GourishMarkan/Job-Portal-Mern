import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, clearAllUserErrors } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { LuMoveRight } from "react-icons/lu";
import MyProfile from "../components/MyProfile";
import UpdateProfile from "../components/UpdateProfile";
import UpdatePassword from "../components/UpdatePassword";
import JobPost from "../components/JobPost";
import Applications from "../components/Applications";
import MyApplications from "../components/MyApplications";
const Dashboard = () => {
  const { isAuthenticated, user, message, error, loading } = useSelector(
    (state) => state.user
  );
  const [show, setShow] = useState(false);
  const [component, setComponent] = useState("My profile");
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated]);
  return (
    <>
      <section className="px-10 py-16 min-h-[800px]">
        <div className="lex justify-between items-center mb-8">
          <p className="font-medium text-gray-900">Dashboard</p>
          <p className="font-medium">
            Welcome!{" "}
            <span className="text-yellow-400">{user && user.name}</span>
          </p>
        </div>
        <div className="flex">
          <div
            className={`${
              show
                ? "absolute left-0 top-0 h-full z-10 bg-gray-900 w-72 p-5"
                : "hidden"
            } md:block`}
          >
            <ul className="flex flex-col gap-6">
              <h4 className="font-semibold tracking-wide text-xl mb-5">
                Manage Account
              </h4>
              <li>
                <button
                  onClick={() => {
                    setComponent("My Profile");
                    setShow(!show);
                  }}
                  className="text-gray-500 hover:text-yellow-400 transition duration-300"
                >
                  My Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setComponent("Update Profile");
                    setShow(!show);
                  }}
                  className="text-gray-500 hover:text-yellow-400 transition duration-300"
                >
                  Update Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setComponent("Update Password");
                    setShow(!show);
                  }}
                  className="text-gray-500 hover:text-yellow-400 transition duration-300"
                >
                  Update Password
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setComponent("Update Password");
                    setShow(!show);
                  }}
                  className="text-gray-500 hover:text-yellow-400 transition duration-300"
                >
                  Update Password
                </button>
              </li>
              {user && user.role === "Employer" && (
                <li>
                  <button
                    onClick={() => {
                      setComponent("Job Post");
                      setShow(!show);
                    }}
                    className="text-gray-500 hover:text-yellow-400 transition duration-300"
                  >
                    Post New Job
                  </button>
                </li>
              )}
              {user && user.role === "Employer" && (
                <li>
                  <button
                    onClick={() => {
                      setComponent("My Jobs");
                      setShow(!show);
                    }}
                    className="text-gray-500 hover:text-yellow-400 transition duration-300"
                  >
                    My Jobs
                  </button>
                </li>
              )}
              {user && user.role === "Employer" && (
                <li>
                  <button
                    onClick={() => {
                      setComponent("Applications");
                      setShow(!show);
                    }}
                    className="text-gray-500 hover:text-yellow-400 transition duration-300"
                  >
                    Applications
                  </button>
                </li>
              )}
              {user && user.role === "Job Seeker" && (
                <li>
                  <button
                    onClick={() => {
                      setComponent("My Applications");
                      setShow(!show);
                    }}
                    className="text-gray-500 hover:text-yellow-400 transition duration-300"
                  >
                    My Applications
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-yellow-400 transition duration-300"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
          <div className="flex-grow max-w-4xl mx-auto relative">
            <div
              className={`${
                show ? "left-72 bg-white" : "left-0"
              } absolute transition-all duration-300`}
            >
              <LuMoveRight
                onClick={() => setShow(!show)}
                className={`${
                  show ? "left-72 bg-white" : "left-0"
                } absolute transition-all duration-300`}
              />
            </div>
            {() => {
              switch (component) {
                case "My Profile":
                  return <MyProfile />;

                case "Update Profile":
                  return <UpdateProfile />;

                case "Update Password":
                  return <UpdatePassword />;

                case "Job Post":
                  return <JobPost />;

                case "Applications":
                  return <Applications />;

                case "My Applications":
                  return <MyApplications />;

                default:
                  <MyProfile />;
                  break;
              }
            }}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
