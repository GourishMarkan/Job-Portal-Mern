import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllUpdateProfileErrors,
  updatePassword,
} from "../store/slices/updateProfileSlice";
import { FaEye, FaRegEyeSlash } from "react-icons/fa6";
// import { getUser } from "../store/slices/userSlice";
const UpdatePassword = () => {
  const [userUpdatePassword, setUserUpdatePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );

  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Password updated successfully");
      // dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());
      navigateTo("/dashboard");
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [dispatch, error, isUpdated]);

  const handleUpdatePassword = () => {
    const formData = new FormData();
    formData.append("oldPassword", userUpdatePassword.oldPassword);
    formData.append("newPassword", userUpdatePassword.newPassword);
    formData.append("confirmPassword", userUpdatePassword.confirmPassword);
    dispatch(updatePassword(formData));
  };
  return (
    <div className="flex flex-col gap-7 w-full min-h-96">
      <h3 className="text-3xl font-semibold text-yellow-200">
        Update Password
      </h3>
      <div className="flex flex-col gap-2 relative ">
        <label htmlFor="oldPassword" className="text-3xl font-medium">
          Current Password
        </label>

        <input
          type={showPassword ? "text" : "password"}
          name="oldPassword"
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]  "
          onChange={(e) =>
            setUserUpdatePassword({
              ...userUpdatePassword,
              oldPassword: e.target.value,
            })
          }
          value={userUpdatePassword.oldPassword}
        />
        {showPassword ? (
          <FaRegEyeSlash
            className="absolute bottom-1 right-2 text-2xl"
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <FaEye
            className="absolute bottom-1 right-2 text-2xl"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="newPassword" className="text-3xl font-medium">
          New Password
        </label>

        <input
          type={showPassword ? "text" : "password"}
          name="newPassword"
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
          onChange={(e) =>
            setUserUpdatePassword({
              ...userUpdatePassword,
              newPassword: e.target.value,
            })
          }
          value={userUpdatePassword.newPassword}
        />
        {showPassword ? (
          <FaRegEyeSlash
            className="absolute bottom-1 right-3 text-2xl"
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <FaEye
            className="absolute bottom-1 right-3 text-2xl"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="confirmPassword" className="text-3xl font-medium">
          Confirm Password
        </label>

        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
          onChange={(e) =>
            setUserUpdatePassword({
              ...userUpdatePassword,
              confirmPassword: e.target.value,
            })
          }
          value={userUpdatePassword.confirmPassword}
        />
        {showPassword ? (
          <FaRegEyeSlash
            className="absolute bottom-1 right-3 text-2xl"
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <FaEye
            className="absolute bottom-1 right-3 text-2xl"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>

      <div className="flex-row justify-self-end items-end">
        <button
          className="w-fit border-none bg-[#111] text-[#fff] py-2 px-5 text-xl rounded-lg ml-40 hover:bg-yellow-400 transition-colors duration-300"
          onClick={handleUpdatePassword}
          disabled={loading}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UpdatePassword;
