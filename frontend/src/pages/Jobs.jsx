import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import {
  clearAllJobErrors,
  fetchJobs,
  resetJobSlice,
} from "../store/slices/jobSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Pagination from "../components/Pagination";
const Jobs = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { jobs, loading, error, totalPages, limit, message } = useSelector(
    (state) => state.jobs
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const handleCityChange = (city) => {
    setCity(city);
  };
  const handleNicheChange = (niche) => {
    setNiche(niche);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
    if (!isAuthenticated) {
      navigateTo("/");
      toast.error("You need to login first.");
    }
    dispatch(fetchJobs(city, niche, searchKeyword, currentPage, limit));
  }, [dispatch, city, niche, error, currentPage, limit]);
  // const handleCityChange=(e)=>{
  //   setCity(e.target.value);
  // }
  //  TODO add debouncing to search
  const handleSearch = () => {
    dispatch(fetchJobs(city, niche, searchKeyword));
  };

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
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className=" py-10 px-25 m-h-[800px]">
          <div className="flex flex-wrap relative justify-center w-[750px] mx-auto m-b-7.5">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-11/12   text-sm rounded-lg py-3 pr-32 pl-2 border border-gray-500  "
            />
            <button
              className="absolute right-10 top-[11px] bg-[#dfdf07] text-[#111] font-medium py-0.5 px-2.5 rounded-lg border-none"
              onClick={handleSearch}
            >
              Find Job
            </button>
            <FaSearch className="absolute top-4 right-6  text-[#111]   hidden" />
          </div>
          {/*  */}
          <div className="flex    mt-5  ">
            <div className=" hidden md:flex ml-4  flex-col gap-12">
              <div className=" flex  mt-3 flex-col gap-1.5 ">
                <h2 className=" text-base font-medium pb-5 border-b border-gray-500 mb-5">
                  Filter Job By City
                </h2>
                {cities.map((city, index) => (
                  <div className="flex items-center gap-4 " key={index}>
                    <input
                      type="radio"
                      id={city}
                      name="city"
                      value={city}
                      // checked={selectedCity === city}
                      onChange={() => {
                        handleCityChange(city);
                      }}
                    />
                    <label htmlFor={city}>{city}</label>
                  </div>
                ))}
              </div>
              <div className=" flex  flex-col gap-1.5 ">
                <h2 className=" text-base font-medium pb-5 border-b border-gray-500 mb-5">
                  Filter Job By Niche
                </h2>
                {nichesArray.map((niche, index) => (
                  <div className="flex items-center gap-4" key={index}>
                    <input
                      type="radio"
                      id={niche}
                      name="niche"
                      value={niche}
                      // checked={selectedNiche === niche}
                      onChange={() => {
                        handleNicheChange(niche);
                      }}
                    />
                    <label htmlFor={niche}>{niche}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-3/4 ml-2">
              {/* mobile filter */}
              <div className=" flex flex-wrap gap-5  mt-5 md:hidden ">
                <select
                  className="px-2 border py-1 md:p-0 "
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value={city}>Filter By City</option>
                  {cities.map((city, index) => (
                    <option value={city} key={index}>
                      {city}
                    </option>
                  ))}
                </select>
                <select
                  className="px-2 border py-1 md:p-0 "
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                >
                  <option value="">Filter By Niche</option>
                  {nichesArray.map((niche, index) => (
                    <option value={niche} key={index}>
                      {niche}
                    </option>
                  ))}
                </select>
              </div>
              {/* job-container */}
              {/* grid gap-10 py-12 w-full grid-cols-2 */}
              <div className="container grid gap-10 py-12 w-full grid-cols-2 ">
                {jobs &&
                  jobs.map((element) => {
                    return (
                      <div
                        className="transition duration-300 bg-[#f5f5f5] h-fit px-10 py-5 flex flex-col gap-1 rounded-md  no-underline hover:bg-slate-500 "
                        key={element._id}
                      >
                        {element.hiringMultipleCandidates === "Yes" ? (
                          <p className="text-[16px] text-[#008b00] bg-[#008b0033] px-1 py-0.5 rounded-md w-fit">
                            Hiring Multiple Candidates
                          </p>
                        ) : (
                          <p className="text-base text-[#0091ff] bg-[#0091ff56] py-0.5 px-1 rounded-md w-fit">
                            Hiring
                          </p>
                        )}
                        <p className="">{element.title}</p>
                        <p className="text-base text-gray-500">
                          {element.company}
                        </p>
                        <p className="text-base text-gray-500">
                          {element.location}
                        </p>
                        <p className="text-base text-gray-500">
                          <span className="font-semibold text-[#111] font-base">
                            Rs. {element.salary}
                          </span>
                        </p>
                        <p className="text-base text-gray-500">
                          <span className="font-semibold text-[#111] font-base">
                            Posted On:
                          </span>{" "}
                          {element.jobPostedOn.substring(0, 10)}
                        </p>
                        <div className="flex justify-end gap-4.5">
                          <Link
                            className=""
                            to={`/post/application/${element._id}`}
                          >
                            Apply Now
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                <div className="grid-flow-col-dense"></div>
                <div className="">
                  <Pagination
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;
