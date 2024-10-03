import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RiLock2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllUserErrors,
  reset,
  resetUserSlice,
} from "../store/slices/userSlice";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const { message, error, loading } = useSelector((state) => state.user);
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
  }, [message, error, dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(password, confirmPassword);
    const formData = new FormData();
    formData.append("password", password);

    dispatch(reset(token, formData));
  };
  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-slate-300">
        <div className="bg-white p-4 rounded-lg shadow-lg w-96">
          <h1 className="text-3xl text-center text-yellow-300 p-2">
            Reset Password
          </h1>

          <p className="text-xl text-center font-meduim text-slate-500 mx-4 p-2">
            Enter your new password
          </p>
          {/* <p className="text-xl font-meduim text-slate-500  p-2 text-center">
            to reset your password
          </p> */}
          <form action="" onSubmit={handleSubmit}>
            <div className="my-4 flex items-center border-b p-2 border-gray-400">
              <RiLock2Fill className="text-2xl text-gray-400" />
              <input
                type="password"
                placeholder="Enter your new  password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none px-2 py-1"
              />
            </div>
            <div className="my-4 flex items-center border-b p-2 border-gray-400">
              <RiLock2Fill className="text-2xl text-gray-400" />
              <input
                type="password"
                placeholder="confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full outline-none px-2 py-1"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-500 py-2 px-3 text-white font-semibold rounded-md hover:bg-slate-900"
            >
              {loading ? "Resting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
