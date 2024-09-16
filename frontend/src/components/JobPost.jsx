import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllJobErrors, postJob } from "../store/slices/jobSlice";
import { toast } from "react-toastify";
import { CiCircleInfo } from "react-icons/ci";
const JobPost = () => {
  const [jobPostDetails, setJobPostDetails] = useState({
    title: "",

    location: "",
    companyName: "",
    introduction: "",
    responsibilities: "",
    qualifications: "",
    offers: "",
    salary: "",
    hiringMultipleCandidates: "",
    jobNiche: "",
    personalWebsiteTitle: "",
    personalWebsiteUrl: "",
  });
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

  const cities = [
    "Bangalore",
    "Nodia",
    "Gurugram",
    "Chandigarh",
    "Mumbai",
    "Pune",
    "Chennai",
    "Hyderabad",
    "Kolkata",
    "Jaipur",
    "Indore",
    "Ahmedabad",
    "Mohali",
    "Ludhiana",
    "Surat",
  ];

  // qualifications,
  // offers,
  // salary,
  // hiringMultipleCandidates,
  // personalWebsiteTitle,
  // personalWebsiteUrl,

  // const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.jobs);
  const handleInputChange = (e) => {
    console.log(jobPostDetails);
    const { name, value } = e.target;
    setJobPostDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handlePostJob = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", jobPostDetails.title);
    formData.append("jobType", jobPostDetails.jobType);
    formData.append("location", jobPostDetails.location);
    formData.append("companyName", jobPostDetails.companyName);
    formData.append("introduction", jobPostDetails.introduction);
    formData.append("responsibilities", jobPostDetails.responsibilities);
    formData.append("qualifications", jobPostDetails.qualifications);
    formData.append("jobNiche", jobPostDetails.jobNiche);
    jobPostDetails.offers && formData.append("offers", jobPostDetails.offers);
    formData.append("salary", jobPostDetails.salary);
    jobPostDetails.hiringMultipleCandidates &&
      formData.append(
        "hiringMultipleCandidates",
        jobPostDetails.hiringMultipleCandidates
      );
    jobPostDetails.personalWebsiteTitle &&
      formData.append(
        "personalWebsiteTitle",
        jobPostDetails.personalWebsiteTitle
      );
    jobPostDetails.personalWebsiteUrl &&
      formData.append("personalWebsiteUrl", jobPostDetails.personalWebsiteUrl);
    dispatch(postJob(formData));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
    }
  }, [error, dispatch, message, loading]);
  return (
    <div className="flex flex-col gap-2 relative">
      <h3 className="text-3xl font-semibold text-[rgb(223,223,7)]">
        Post a Job
      </h3>
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="title" className="text-3xl font-medium">
          Title
        </label>

        <input
          type="text"
          name="title"
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
          onChange={handleInputChange}
          value={jobPostDetails.title}
          placeholder="Job Title"
        />
      </div>
      {/* <div className="flex flex-col gap-2 relative">
        <label htmlFor="jobType" className="text-3xl font-medium">
          Job Type
        </label>

        <input
          type="text"
          name="jobType"
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
          onChange={handleInputChange}
          value={jobPostDetails.jobType}
          placeholder="Job Type"
        />
      </div> */}
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="location" className="text-3xl font-medium">
          Location (City)
        </label>

        <select
          name="location"
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
          onChange={handleInputChange}
          value={jobPostDetails.location}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="jobType" className="text-3xl font-medium">
          Job Type
        </label>

        <select
          type="text"
          name="jobType"
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
          onChange={handleInputChange}
          value={jobPostDetails.jobType}
          placeholder="Job Type"
        >
          <option value="">select jobType</option>
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
        </select>
      </div>
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="companyName" className="text-3xl font-medium">
          Company Name
        </label>

        <input
          type="text"
          name="companyName"
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
          onChange={handleInputChange}
          value={jobPostDetails.companyName}
          placeholder="Company Name"
        />
      </div>
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="introduction" className="text-3xl font-medium">
          Introduction
        </label>

        <textarea
          type="text"
          name="introduction"
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
          onChange={handleInputChange}
          value={jobPostDetails.introduction}
          placeholder="Introduction"
          rows={7}
        />
      </div>
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="responsibilities" className="text-3xl font-medium">
          Responsibilities
        </label>

        <textarea
          type="text"
          name="responsibilities"
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
          onChange={handleInputChange}
          value={jobPostDetails.responsibilities}
          placeholder="responibilities"
          rows={7}
        />
      </div>
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="qualifications" className="text-3xl font-medium">
          Qualifications
        </label>

        <textarea
          type="text"
          name="qualifications"
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
          onChange={handleInputChange}
          value={jobPostDetails.qualifications}
          placeholder="qualifications"
          rows={7}
        />
      </div>
      <div className="flex flex-col gap-2 relative">
        <div className="flex flex-row flex-wrap ">
          <label htmlFor="offers" className="text-3xl font-medium">
            What we offers
          </label>
          <span className="flex items-center gap-2 text-sm">
            <CiCircleInfo className="absolute bottom-1 right-3 text-2xl" />{" "}
          </span>
        </div>

        <textarea
          type="text"
          name="offers"
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
          onChange={handleInputChange}
          value={jobPostDetails.offers}
          placeholder="what we are offering in return "
          rows={7}
        />
      </div>

      <div className="flex flex-col gap-2 relative">
        <label htmlFor="jobNiche" className="text-3xl font-medium">
          JobNiche
        </label>

        <select
          name="jobNiche"
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
          onChange={handleInputChange}
          value={jobPostDetails.jobNiche}
          placeholder="jobNiche"
        >
          <option value="">Select Job Niche</option>
          {nichesArray.map((niche) => {
            return (
              <option value={niche} key={niche}>
                {niche}
              </option>
            );
          })}
        </select>
      </div>
      {/* hiring multiple candidates */}
      <div className="flex flex-col gap-2 relative">
        <div className="flex flex-row flex-wrap ">
          <label
            htmlFor="hiringMultipleCandidates"
            className="text-3xl font-medium"
          >
            Hiring Multiple Candidates
          </label>
          <span className="flex items-center gap-2 text-sm">
            <CiCircleInfo className="absolute bottom-1 right-3 text-2xl" />{" "}
          </span>
          <select
            name="hiringMultipleCandidates"
            id=""
            className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
            value={jobPostDetails.hiringMultipleCandidates}
            onChange={handleInputChange}
          >
            <option value="">Hiring Multiple Candidates?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="salary" className="text-3xl font-medium">
          salary
        </label>

        <input
          type="text"
          name="salary"
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
          onChange={handleInputChange}
          value={jobPostDetails.salary}
          placeholder="salary"
        />
      </div>
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="personalWebSiteUrl" className="text-3xl font-medium">
          PersonalWebSiteUrl
        </label>

        <input
          type="text"
          name="personalWebsiteUrl"
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
          onChange={handleInputChange}
          value={jobPostDetails.personalWebsiteUrl}
          placeholder="PersonalWebsiteUrl"
        />
      </div>
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="personalWebSiteTitle" className="text-3xl font-medium">
          PersonalWebSiteTitle
        </label>

        <input
          type="text"
          name="personalWebsiteTitle"
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
          onChange={handleInputChange}
          value={jobPostDetails.personalWebsiteTitle}
          placeholder="PersonalWebsiteTitle"
        />
      </div>
      <div className="flex-row justify-self-end items-end">
        <button
          className="w-fit border-none bg-[#111] text-[#fff] py-2 px-5 text-xl rounded-lg ml-40 hover:bg-yellow-400 transition-colors duration-300"
          onClick={handlePostJob}
          disabled={loading}
        >
          Post Job
        </button>
      </div>
    </div>
  );
};

export default JobPost;
