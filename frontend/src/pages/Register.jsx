import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register, clearAllUserErrors } from "../store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaAddressBook, FaPencilAlt, FaRegUser } from "react-icons/fa";
import { MdCategory, MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import { RiLock2Fill } from "react-icons/ri";

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    role: "",
    password: 0,
    phoneNumber: 0,
    address: "",
    firstNiche: "",
    secondNiche: "",
    thirdNiche: "",
    resume: "",
    coverLetter: "",
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
  // const[name,setName]=useState("");
  // const[email,setName]=useState("");
  // const[name,setName]=useState("");
  // const[name,setName]=useState("");
  // const[name,setName]=useState("");
  // const[name,setName]=useState("");
  // const[name,setName]=useState("");
  // const[name,setName]=useState("");
  // const[name,setName]=useState("");
  // const[name,setName]=useState("");
  // const[name,setName]=useState("");
  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setUserDetails({ ...userDetails, resume: file });
  };
  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", userDetails.role);
    formData.append("name", userDetails.name);
    formData.append("email", userDetails.email);
    formData.append("phoneNumber", userDetails.phoneNumber);
    formData.append("address", userDetails.address);
    formData.append("password", userDetails.password);
    if (userDetails.role === "Job Seeker") {
      formData.append("firstNiche", userDetails.firstNiche);
      formData.append("secondNiche", userDetails.secondNiche);
      formData.append("thirdNiche", userDetails.thirdNiche);
      formData.append("coverLetter", userDetails.coverLetter);
      formData.append("resume", userDetails.resume);
    }
    console.log(userDetails);

    dispatch(register(formData));
  };
  const handleUserDetails = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, isAuthenticated, loading, message]);

  return (
    <section className="flex mx-auto min-h-screen min-w-[1500px] max-w-[1500px]  sm:min-w-full">
      <div className="flex-1 flex flex-col justify-center bg-[#fff] py-5 px-5 m-w-[1500px]">
        <div className="flex gap-3 flex-col text-center mb-7">
          <h3 className="text-2xl">Create a new account</h3>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleRegister}>
          <div className="flex gap-5">
            <div className="flex flex-col  gap-2 flex-1">
              <label>Register As</label>
              <div className="flex items-center rounded-lg">
                <select
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
                <FaRegUser className="w-1/12 text-2xl bg-[#dfdf07] h-10 p-2 text-[#fff]" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="name" className="">
              Name
            </label>
            <div className="flex items-center rounded-lg">
              <input
                className="bg-[#87878778] p-2 border-none w-full"
                name="name"
                type="text"
                placeholder="Your Name"
                value={userDetails.name}
                onChange={handleUserDetails}
              />
              <FaPencilAlt className="w-1/12 text-2xl bg-[#dfdf07] h-10 p-2 text-[#fff]" />
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="email">Email Address</label>
              <div className="flex items-center rounded-lg">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  className="bg-[#87878778] p-2 border-none w-full"
                  value={userDetails.email}
                  onChange={handleUserDetails}
                />
                <MdOutlineMailOutline className="w-2/12 text-2xl bg-[#dfdf07] h-10 p-2 text-[#fff]" />
              </div>
            </div>

            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="phoneNumber">Phone Number</label>
              <div className="flex items-center rounded-lg">
                <input
                  type="number"
                  name="phoneNumber"
                  placeholder="98764-12345"
                  className="bg-[#87878778] p-2 border-none w-full"
                  value={userDetails.phoneNumber}
                  onChange={handleUserDetails}
                />
                <FaPhoneFlip className="w-2/12 text-2xl bg-[#dfdf07] h-10 p-2 text-[#fff]" />
              </div>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="address"> Address</label>
              <div className="flex items-center rounded-lg">
                <input
                  name="address"
                  type="text"
                  placeholder="Your Address"
                  className="bg-[#87878778] p-2 border-none w-full"
                  value={userDetails.address}
                  onChange={handleUserDetails}
                />
                <FaAddressBook className="w-2/12 text-2xl bg-[#dfdf07] h-10 p-2 text-[#fff]" />
              </div>
            </div>

            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="password">Password</label>
              <div className="flex items-center rounded-lg">
                <input
                  type="number"
                  name="password"
                  placeholder="98764-12345"
                  className="bg-[#87878778] p-2 border-none w-full"
                  value={userDetails.password}
                  onChange={handleUserDetails}
                />
                <RiLock2Fill className="w-2/12 text-2xl bg-[#dfdf07] h-10 p-2 text-[#fff]" />
              </div>
            </div>
          </div>
          {userDetails.role === "Job Seeker" && (
            <>
              <div className="flex gap-5">
                <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="firstNiche">First Niche</label>
                  <div className="flex items-center rounded-lg">
                    <select
                      name="firstNiche"
                      className="bg-[#87878778] p-2 border-none w-full"
                      value={userDetails.firstNiche}
                      onChange={handleUserDetails}
                    >
                      <option value="">Your Niche</option>
                      {nichesArray.map((niche, index) => (
                        <option value={niche} key={index}>
                          {niche}
                        </option>
                      ))}
                    </select>
                    <MdCategory className="w-2/12 text-2xl bg-[#dfdf07] h-10 p-2 text-[#fff]" />
                  </div>
                </div>
                <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="secondNiche">Second Niche</label>
                  <div className="flex items-center rounded-lg">
                    <select
                      name="secondNiche"
                      className="bg-[#87878778] p-2 border-none w-full"
                      value={userDetails.secondNiche}
                      onChange={handleUserDetails}
                    >
                      <option value="">Your Niche</option>
                      {nichesArray.map((niche, index) => (
                        <option value={niche} key={index}>
                          {niche}
                        </option>
                      ))}
                    </select>
                    <MdCategory className="w-2/12 text-2xl bg-[#dfdf07] h-10 p-2 text-[#fff]" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <label htmlFor="thirdNiche">Your Third Niche</label>
                  <div className="flex items-center rounded-lg">
                    <select
                      name="thirdNiche"
                      className="bg-[#87878778] p-2 border-none w-full"
                      value={userDetails.thirdNiche}
                      onChange={handleUserDetails}
                    >
                      <option value="">Your Niche</option>
                      {nichesArray.map((niche, index) => (
                        <option value={niche} key={index}>
                          {niche}
                        </option>
                      ))}
                    </select>
                    <MdCategory className="w-2/12 text-2xl bg-[#dfdf07] h-10 p-2 text-[#fff]" />
                  </div>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="coverLetter">Cover Letter</label>
                  <div className="flex items-center rounded-lg">
                    <textarea
                      // type="file"
                      name="coverLetter"
                      value={userDetails.coverLetter}
                      className="bg-[#87878778] p-2 border-none w-full"
                      onChange={handleUserDetails}
                      // style={{ border: "none" }}
                      rows={10}
                    />
                    {/* <MdCategory className="w-1/12 text-2xl bg-[#dfdf07] h-11 p-2 text-[#fff]" /> */}
                  </div>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="resume">Resume</label>
                  <div className="flex items-center rounded-lg">
                    <input
                      name="resume"
                      type="file"
                      className="bg-[#87878778] p-2 border-none w-full"
                      onChange={resumeHandler}
                      style={{ border: "none" }}
                    />
                    {/* <MdCategory className="w-1/12 text-2xl bg-[#dfdf07] h-11 p-2 text-[#fff]" /> */}
                  </div>
                </div>
              </div>
            </>
          )}
          <button
            className="p-3 text-center border-none mt-6 font-bold text-[#fff] bg-[#dfdf07] text-lg rounded-lg"
            type="submit"
            disabled={loading}
          >
            Register
          </button>
          <Link
            className="p-3 text-center border border-solid border-[#dfdf07] mt-6 font-bold text-[#dfdf07] text-lg rounded-lg underline"
            to="/login"
          >
            {" "}
            Login Now
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Register;
