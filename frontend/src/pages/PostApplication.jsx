import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  postApplication,
  clearAllApplicationErrors,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import { getUser } from "../store/slices/userSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchSingleJob } from "../store/slices/jobSlice";
import { IoMdCash } from "react-icons/io";
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";

const PostApplication = () => {
  const { singleJob } = useSelector((state) => state.jobs);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector(
    (state) => state.applications
  );
  const { jobId } = useParams();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    coverLetter: "",
    resume: "",
    role: "",
  });
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handlePostApplication = (e) => {
    e.preventDefault();

    const formData = new FormData();
    // e.preventDefault();
    console.log(userDetails);
    formData.append("name", userDetails.name);
    formData.append("email", userDetails.email);
    formData.append("address", userDetails.address);
    formData.append("phoneNumber", userDetails.phoneNumber);
    formData.append("coverLetter", userDetails.coverLetter);
    if (userDetails.resume) {
      formData.append("resume", userDetails.resume);
    }
    // console.log(formData.name);
    dispatch(postApplication(formData, jobId));

    // if()
  };

  useEffect(() => {
    dispatch(getUser()); // Fetch user details when the component mounts
    // console.log(dispatch(getUser()));
    // if (user) {
    //   setUserDetails({
    //     name: user.name || "",
    //     email: user.email || "",
    //     phoneNumber: user.phoneNumber || "",
    //     address: user.address || "",
    //     coverLetter: user.coverLetter || "",
    //     role: user.role || "",
    //     resume: (user.resume && user.resume.url) || "",
    //   });
    // }
    // console.log(userDetails);
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      setUserDetails({
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        coverLetter: user.coverLetter || "",
        role: user.role || "",
        resume: (user.resume && user.resume.url) || "",
      });
      // console.log(user.resume.url);
      console.log(user);
    }
    // console.log(error);
    if (error) {
      console.log("error is ", error);
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    // if (user && user.role === "Employer") {
    //   navigateTo("/");
    // }
    console.log(message);
    if (message) {
      console.log("message is ", message);
      toast.success(message);
      navigateTo("/jobs");
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchSingleJob(jobId));
  }, [user, jobId, error, message, dispatch]);

  let qualifications = [];
  let responsibilities = [];
  let offering = [];

  if (singleJob.qualifications) {
    qualifications = singleJob.qualifications.split(". ");
  }
  if (singleJob.responsibilities) {
    responsibilities = singleJob.responsibilities.split(". ");
  }
  if (singleJob.offers) {
    offering = singleJob.offers.split(". ");
  }

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setUserDetails({ ...userDetails, resume: file });
  };

  const handleUserDetailsChange = (e) => {
    const { name, value } = e.target;
    console.log(userDetails);
    setUserDetails({ ...userDetails, [name]: value });
  };

  return (
    <>
      <article className="flex flex-col lg:flex-row gap-10 max-w-[1500px] mx-auto p-5">
        <form
          className="flex flex-col gap-5 flex-1 bg-white p-10 shadow-md rounded-lg"
          onSubmit={handlePostApplication}
        >
          <h3 className="text-2xl font-medium mb-5">Application Form</h3>

          <div className="flex flex-col gap-2">
            <label htmlFor="JobTitle" className="text-lg">
              Job Title
            </label>
            <input
              type="text"
              name="JobTitle"
              className="border border-gray-300 rounded-lg p-2"
              placeholder={singleJob.title}
              disabled
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-lg">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleUserDetailsChange}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg">
              Your Email
            </label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleUserDetailsChange}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phoneNumber" className="text-lg">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={userDetails.phoneNumber}
              onChange={handleUserDetailsChange}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="text-lg">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={userDetails.address}
              onChange={handleUserDetailsChange}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>

          {user && user.role === "Job Seeker" && (
            <>
              <div className="flex flex-col gap-2">
                <label htmlFor="coverLetter" className="text-lg">
                  Cover Letter
                </label>
                <input
                  type="text"
                  name="coverLetter"
                  value={userDetails.coverLetter}
                  className="border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="resume" className="text-lg">
                  Resume
                </label>
                <input
                  type="file"
                  name="resume"
                  // value={userDetails.resume}
                  onChange={resumeHandler}
                  className="border border-gray-300 rounded-lg p-2"
                />
              </div>
            </>
          )}

          {isAuthenticated && user.role === "Job Seeker" && (
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-5"
                onClick={handlePostApplication}
                disabled={loading}
              >
                Apply
              </button>
            </div>
          )}
        </form>

        <div className="flex-1 bg-white p-10 shadow-md rounded-lg">
          <header className="mb-5">
            <h3 className="text-2xl font-medium">{singleJob.title}</h3>
            {singleJob.personalWebsite && (
              <Link
                to={singleJob.personalWebsite.url}
                target="_blank"
                className="text-blue-500 underline"
              >
                {singleJob.personalWebsite.title}
              </Link>
            )}
            <p className="text-gray-600">{singleJob.location}</p>
            <p className="text-gray-600">Rs. {singleJob.salary} a month</p>
          </header>
          <hr />

          <section className="mt-5">
            <div className="flex flex-col gap-4 mb-5">
              <h4 className="text-xl font-semibold">Job Details</h4>
              <div className="flex items-center gap-2 text-gray-600">
                <IoMdCash />
                <span>{singleJob.salary} a month</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FaToolbox />
                <span>{singleJob.jobType}</span>
              </div>
            </div>
            <hr />
            <div className="flex flex-col gap-4 mt-5">
              <h4 className="text-xl font-semibold">Location</h4>
              <div className="flex items-center gap-2 text-gray-600">
                <FaLocationDot />
                <span>{singleJob.location}</span>
              </div>
            </div>
            <hr />

            <div className="mt-5">
              <h4 className="text-xl font-semibold">Full Job Description</h4>
              <p className="text-gray-600">{singleJob.introduction}</p>

              {singleJob.qualifications && (
                <div className="mt-5">
                  <h4 className="text-xl font-semibold">Qualifications</h4>
                  <ul className="list-disc list-inside">
                    {qualifications.map((element) => (
                      <li key={element}>{element}</li>
                    ))}
                  </ul>
                </div>
              )}

              {singleJob.responsibilities && (
                <div className="mt-5">
                  <h4 className="text-xl font-semibold">Responsibilities</h4>
                  <ul className="list-disc list-inside">
                    {responsibilities.map((element) => (
                      <li key={element}>{element}</li>
                    ))}
                  </ul>
                </div>
              )}

              {singleJob.offers && (
                <div className="mt-5">
                  <h4 className="text-xl font-semibold">Offering</h4>
                  <ul className="list-disc list-inside">
                    {offering.map((element) => (
                      <li key={element}>{element}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
          <hr />

          <footer className="mt-5">
            <h4 className="text-xl font-semibold">Job Niche</h4>
            <p className="text-gray-600">{singleJob.jobNiche}</p>
          </footer>
        </div>
      </article>
    </>
  );
};

export default PostApplication;
