import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  postApplication,
  clearAllApplicationErrors,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleJob } from "../store/slices/jobSlice";
import { toast } from "react-toastify";
const PostApplication = () => {
  const { singleJob } = useSelector((state) => state.jobs);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector(
    (state) => state.applications
  );
  const { jobId } = useParams();
  const { userDetails, setUserDetails } = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    coverLetter: "",
    resume: "",
  });
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handlePostApplication = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userDetails.name);
    formData.append("email", userDetails.email);
    formData.append("address", userDetails.address);
    formData.append("phoneNumber", userDetails.phoneNumber);
    formData.append("coverLetter", userDetails.coverLetter);
    if (userDetails.resume) {
      formData.append("resume", userDetails.resume);
    }
    dispatch(postApplication(formData, jobId));
  };
  useEffect(() => {
    if (user) {
      setUserDetails({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        coverLetter: user.coverLetter,
        resume: user.resume,
      });
    }
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchSingleJob(jobId));
  }, [user, jobId, error, loading, message, dispatch]);

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
    setUserDetails({ ...userDetails, [name]: value });
  };
  return (
    <>
      <article className="application_page">
        <form action="">
          <h3>Application Form</h3>
          <div>
            <label htmlFor="JobTitle">Job Title</label>
            <input
              type="text"
              name="JobTitle"
              placeholder={singleJob.Title}
              disabled
            />
          </div>
          <div>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleUserDetailsChange}
            />
          </div>
          <div>
            <label htmlFor="email">Your Email</label>
            <input
              type="text"
              name="email"
              value={userDetails.email}
              onChange={handleUserDetailsChange}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={userDetails.phoneNumber}
              onChange={handleUserDetailsChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              value={userDetails.address}
              onChange={handleUserDetailsChange}
            />
          </div>
          {user && user.role === "Job Seeker" && (
            <>
              <div>
                <label htmlFor="coverLetter">CoverLetter</label>
                <input
                  type="text"
                  name="coverLetter"
                  value={userDetails.coverLetter}
                  onChange={handleUserDetailsChange}
                />
              </div>
              <div>
                <label htmlFor="resume">resume</label>
                <input
                  type="file"
                  name="resume"
                  value={userDetails.resume}
                  onChange={resumeHandler}
                />
              </div>
            </>
          )}
          {isAuthenticated && user.role === "Job Seeker" && (
            <div style={{ alignItems: "flex-end" }}>
              <button
                className="btn"
                onClick={handlePostApplication}
                disabled={loading}
              >
                Apply
              </button>
            </div>
          )}
        </form>
      </article>
      PostApplication
    </>
  );
};

export default PostApplication;
