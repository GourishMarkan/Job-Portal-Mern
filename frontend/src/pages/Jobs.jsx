import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
const Jobs = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const handleCityChange = (city) => {
    setCity(city);
  };
  const handleNicheChange = (niche) => {
    setNiche(niche);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    dispatch(fetchJobs(city, niche, searchKeyword));
  });
  // const handleCityChange=(e)=>{
  //   setCity(e.target.value);
  // }
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
      {/* {loading ? (
        <Spinner />
      ) : ( */}
      <section className="py-10 px-25 m-h-[800px]">
        <div className="flex relative justify-center w-[750px] mx-auto m-b-7.5">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-11/12   text-sm rounded-lg py-3 pr-32 pl-2 border border-gray-500"
          />
          <button
            className="absolute right-7 top-[11px] bg-[#dfdf07] text-[#111] font-medium py-0.5 px-2.5 rounded-lg border-none"
            onClick={handleSearch}
          >
            Find Job
          </button>
          <FaSearch className="absolute top-4 right-6  text-[#111]   hidden" />
        </div>
        <div className="flex gap-12">
          <div className="w-1/4 flex flex-col gap-12">
            <div className=" flex flex-col gap-1.5 ">
              <h2 className=" text-base font-medium pb-5 border-b border-gray-500 mb-5">
                Filter Job By City
              </h2>
              {cities.map((city, index) => (
                <div className="flex items-center gap-4" key={index}>
                  <input
                    type="radio"
                    id={city}
                    name="city"
                    value={city}
                    checked={selectedCity === city}
                    onChange={() => {
                      handleCityChange(city);
                    }}
                  />
                  <label htmlFor={city}>{city}</label>
                </div>
              ))}
            </div>
            <div className=" flex flex-col gap-1.5 ">
              <h2 className=" text-base font-medium pb-5 border-b border-gray-500 mb-5">
                Filter Job By Niche
              </h2>
              {cities.map((niche, index) => (
                <div className="flex items-center gap-4" key={index}>
                  <input
                    type="radio"
                    id={niche}
                    name="niche"
                    value={niche}
                    checked={selectedNiche === niche}
                    onChange={() => {
                      handleNicheChange(niche);
                    }}
                  />
                  <label htmlFor={niche}>{niche}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="w-3/4">
            <div className="hidden"></div>
          </div>
        </div>
      </section>
      {/* )
      } */}
    </>
  );
};

export default Jobs;
