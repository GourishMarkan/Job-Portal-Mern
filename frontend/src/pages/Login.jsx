import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { clearAllUserErrors, login } from "../store/slices/userSlice";
const Login = () => {
  const [userDetails, setUserDetails] = useState({
    role: "",
    email: "",
    password: "",
  });

  const { loading, error, isAuthenticated, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserDetails({ ...userDetails, [name]: value });
  // };
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", userDetails.role);
    formData.append("email", userDetails.email);
    formData.append("password", userDetails.password);
    dispatch(login(formData));
  };

  useEffect(() => {
    console.log("error", error);
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (message) {
      toast.success(message);
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated]);
  return (
    <>
      <section className="flex mx-auto min-h-screen justify-center min-w-[1500px] max-w-[1500px]  sm:min-w-full">
        <div className="flex-1 flex flex-col  items-center justify-center bg-[#fff] py-5 px-5 max-w-md">
          <div className="flex gap-3 flex-col text-center mb-7">
            {error && <div className="text-red-500 text-lg">{error}</div>}
            <h3 className="text-2xl">Login to your account</h3>
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <div className="flex flex-col  gap-2 flex-1">
              <label htmlFor="role">Login As</label>
              <div className="flex items-center rounded-lg">
                <select
                  name="role"
                  className="bg-[#87878778] p-2 border-none w-full "
                  value={userDetails.role}
                  onChange={(e) => {
                    setUserDetails({ ...userDetails, role: e.target.value });
                  }}
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Register as an Employer</option>
                  <option value="Job Seeker">Register as a Job Seeker</option>
                </select>
                <FaRegUser className="w-2/12 text-xl bg-[#dfdf07] h-[37px] p-2 text-[#fff]" />
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="email">Email</label>
              <div className="flex items-center rounded-lg">
                <input
                  type="email"
                  name="email"
                  placeholder="ur email"
                  value={userDetails.email}
                  onChange={(e) => {
                    setUserDetails({ ...userDetails, email: e.target.value });
                  }}
                  className="bg-[#87878778] p-2 border-none w-full"
                />
                <MdOutlineMailOutline className="w-2/12 text-2xl bg-[#dfdf07] h-10 p-2 text-[#fff]" />
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="password">Password</label>
              <div className="flex items-center rounded-lg">
                <input
                  type="password"
                  name="password"
                  placeholder="ur password"
                  value={userDetails.password}
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      password: e.target.value,
                    });
                  }}
                  className="bg-[#87878778] p-2 border-none w-full"
                />
                <RiLock2Fill className="w-2/12 text-2xl bg-[#dfdf07] h-10 p-2 text-[#fff]" />
              </div>
            </div>
            <button
              className="p-3 text-center border-none mt-6 font-bold text-[#fff] bg-[#dfdf07] text-lg rounded-lg w-fit-content"
              type="submit"
              disabled={loading}
            >
              Login
            </button>
            <Link
              className="p-3 text-center border border-solid border-[#dfdf07] mt-6 font-bold text-[#dfdf07] text-lg rounded-lg underline"
              to="/register"
            >
              {" "}
              Register Now
            </Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
