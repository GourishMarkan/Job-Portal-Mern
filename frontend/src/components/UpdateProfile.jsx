import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearAllUpdateProfileErrors,
  updateProfile,
} from "../store/slices/updateProfileSlice";
import { toast } from "react-toastify";
import { getUser } from "../store/slices/userSlice";
const UpdateProfile = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );
  const [userDetails, setuserDetails] = React.useState({
    name: user?.name || "",
    email: user?.email || "",
    firstNiche: user.niches?.firstNiche || "",
    secondNiche: user.niches?.secondNiche || "",
    thirdNiche: user.niches?.thirdNiche || "",
    coverLetter: user?.coverLetter || "",
    phoneNumber: user?.phoneNumber || 0,
    address: user?.address || "",
    role: user?.role || "",
    resume: (user && user?.resume?.url) || "",
    resumePreview: null,
  });
  const handleInputChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setuserDetails({ ...userDetails, [name]: value });
  };
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("name", userDetails.name);
    formData.append("email", userDetails.email);
    formData.append("phoneNumber", userDetails.phoneNumber);
    formData.append("address", userDetails.address);
    if (user && user.role === "Job Seeker") {
      formData.append("firstNiche", userDetails.firstNiche);
      formData.append("secondNiche", userDetails.secondNiche);
      formData.append("thirdNiche", userDetails.thirdNiche);
    }
    if (userDetails.resume) {
      formData.append("resume", userDetails.resume);
    }
    dispatch(updateProfile(formData));
  };
  const resumeHanlder = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setuserDetails({
        ...userDetails,
        resume: file,
        resumePreview: reader.result,
      });
    };
  };
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/");
    }
    if (isUpdated) {
      toast.success("Profile updated successfully");
      dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());
    }
  }, [dispatch, error, loading, isUpdated, user, isAuthenticated]);
  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];
  return (
    <div>
      <div className="flex flex-col gap-7 w-full min-h-96">
        <h3 className="text-3xl font-semibold text-yellow-200">
          Update Profile
        </h3>
        <div className="flex flex-col gap-2 relative">
          {/* <label htmlFor="" className="text-3xl font-medium">
          <input type="text" onChange={handleInputChange} value={userDetails.name} />
        </label> */}
          <label htmlFor="name" className="text-3xl font-medium">
            Name
          </label>

          <input
            type="text"
            name="name"
            className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
            onChange={handleInputChange}
            value={userDetails.name}
          />
        </div>
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="email" className="text-3xl font-medium">
            Email Address
          </label>

          <input
            type="text"
            name="email"
            className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
            onChange={handleInputChange}
            value={userDetails.email}
          />
        </div>
        {/* <div className="flex flex-col gap-2 relative">
        <p className=" text-3xl ">
          <span className="text-3xl font-medium">Email:</span> {userDetails.email}
        </p>
      </div> */}
        {userDetails && userDetails.role === "Job Seeker" && (
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="" className="text-3xl font-medium">
              My Preferred Job Niches
            </label>
            <div className="flex flex-col gap-3.5">
              <select
                name="firstNiche"
                className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
                value={userDetails.firstNiche}
                onChange={handleInputChange}
              >
                {nichesArray.map((niche, index) => (
                  <option value={niche} key={index}>
                    {niche}
                  </option>
                ))}
              </select>
              <select
                className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
                name="secondNiche"
                onChange={handleInputChange}
                value={userDetails.secondNiche}
              >
                {nichesArray.map((element, index) => {
                  return (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  );
                })}
              </select>
              <select
                className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
                name="thirdNiche"
                onChange={handleInputChange}
                value={userDetails.thirdNiche}
              >
                {nichesArray.map((element, index) => {
                  return (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="phoneNumber" className="text-3xl font-medium">
                Phone Number
              </label>

              <input
                type="number"
                name="phoneNumber"
                className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
                onChange={handleInputChange}
                value={userDetails.phoneNumber}
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="address" className="text-3xl font-medium">
                Address
              </label>

              <input
                type="text"
                name="address"
                className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
                onChange={handleInputChange}
                value={userDetails.address}
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="" className="text-3xl font-medium">
                Role
              </label>

              <input
                type="text"
                className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
                disabled
                onChange={handleInputChange}
                value={userDetails.role}
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="coverLetter" className="text-3xl font-medium">
                coverLetter
              </label>

              <textarea
                cols={10}
                name="coverLetter"
                type="text"
                className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
                onChange={handleInputChange}
                value={userDetails.coverLetter}
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="" className="text-3xl font-medium">
                Update Resume
              </label>

              <input
                type="file"
                className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
                onChange={resumeHanlder}
              />
              {user && user.resume && (
                <div className="flex flex-col gap-2">
                  <p className="text-3xl font-medium">Current Resume:</p>
                  <Link
                    to={user.resume && user.resume.url}
                    target="_blank"
                    className="bg-[#111] text-[#fff] py-2 px-5 text-xl w-fit no-underline rounded-lg hover:bg-yellow-400 transition-colors duration-300"
                  >
                    View Resume
                  </Link>
                </div>
              )}
              <div className="flex-row justify-self-end items-end">
                <button
                  className="w-fit border-none bg-[#111] text-[#fff] py-2 px-5 text-xl rounded-lg ml-40 hover:bg-yellow-400 transition-colors duration-300"
                  onClick={handleUpdateProfile}
                  disabled={loading}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
