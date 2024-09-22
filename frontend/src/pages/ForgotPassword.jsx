import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearAllUserErrors,
  forgot,
  resetUserSlice,
} from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { MdOutlineMailOutline } from "react-icons/md";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { loading, error, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetUserSlice());
    }
  }, [error, message, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    dispatch(forgot(formData));
    // setTimeout(()=>{
    //    navigate
    // })
  };
  return (
    <div className=" ">
      <div className="flex flex-wrap justify-center items-center bg-slate-300 h-screen">
        <div className="bg-white p-4 rounded-lg shadow-lg w-96 ">
          <h1 className="text-3xl font-semibold text-center text-yellow-300 p-2">
            Forgot Password
          </h1>
          <p className="text-xl font-meduim text-slate-500 ml-4 p-2">
            Enter your Email to receive an link
          </p>
          <p className="text-xl font-meduim text-slate-500  p-2 text-center">
            to reset your password
          </p>

          <form onSubmit={handleSubmit}>
            <div className="my-4 flex items-center border-b p-2 border-gray-400">
              <MdOutlineMailOutline className="text-2xl text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none px-2 py-1"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-500 py-2 px-3 text-white font-semibold rounded-md hover:bg-slate-900"
            >
              {loading ? "Sending..." : "Send Email"}
            </button>
          </form>
          {/* {error && <p className="text-red-500 text-center">{error}</p>}
          {message && <p className="text-green-500 text-center">{message}</p>} */}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
