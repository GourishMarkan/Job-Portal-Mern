import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  deleteJob,
  getMyJobs,
  resetJobSlice,
} from "../store/slices/jobSlice";
import Pagination from "./Pagination";

const MyJobs = () => {
  const { loading, message, error, myJobs, limit, totalPages } = useSelector(
    (state) => state.jobs
  );
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const handleDeleteJob = (e, id) => {
    e.preventDefault();
    dispatch(deleteJob(id));
  };
  useEffect(() => {
    dispatch(getMyJobs(currentPage, limit));
  }, [currentPage]);

  useEffect(() => {
    // dispatch(getMyJobs());
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
    // console.log(myJobs);
  }, [message, error, dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : myJobs && myJobs.length <= 0 ? (
        <h1 className="text-2xl font-semibold">You have not posted any job.</h1>
      ) : (
        <>
          <div className="flex flex-col gap-2 relative">
            <h3 className="text-3xl font-semibold text-[rgb(223,223,7)]">
              Your Posted Jobs
            </h3>
            <div className="flex flex-col gap-7 w-full min-h-96">
              {myJobs.map((element) => {
                return (
                  <div
                    className="mb-7 bg-[#8080803d] px-3 py-6 rounded-lg"
                    key={element._id}
                  >
                    <p className="flex flex-col gap-1 text-lg text-gray-600">
                      <span className="font-semibold text-xl text-[#111]">
                        Job Title:
                      </span>
                      {element.title}
                    </p>
                    <p className="flex flex-col gap-1 text-lg text-gray-600">
                      <span className="font-semibold text-xl text-[#111]">
                        Job Niche
                      </span>
                      {element.jobNiche}
                    </p>
                    <p className="flex flex-col gap-1 text-lg text-gray-600">
                      <span className="font-semibold text-xl text-[#111]">
                        Location
                      </span>
                      {element.location}
                    </p>
                    <p className="flex flex-col gap-1 text-lg text-gray-600">
                      <span className="font-semibold text-xl text-[#111]">
                        JobType
                      </span>
                      {element.jobType}
                    </p>
                    <p className="flex flex-col gap-1 text-lg text-gray-600">
                      <span className="font-semibold text-xl text-[#111]">
                        Company:
                      </span>
                      {element.companyName}
                    </p>
                    <p className="flex flex-col gap-1 text-lg text-gray-600">
                      <span className="font-semibold text-xl text-[#111]">
                        Introduction
                      </span>

                      {element.introduction}
                    </p>
                    <p className="flex flex-col gap-1 text-lg text-gray-600">
                      <span className="font-semibold text-xl text-[#111]">
                        Qualifications
                      </span>

                      {element.qualifications}
                    </p>
                    <p className="flex flex-col gap-1 text-lg text-gray-600">
                      <span className="font-semibold text-xl text-[#111]">
                        Responsibilities
                      </span>

                      {element.responsibilities}
                    </p>
                    {element.offers && (
                      <p className="flex flex-col gap-1 text-lg text-gray-600">
                        <span className="font-semibold text-xl text-[#111]">
                          Offers
                        </span>
                        {element.offers}
                      </p>
                    )}
                    <div className="flex-row justify-between items-center ">
                      <button
                        className=" border-none bg-[#111] text-[#fff] py-2 px-5 text-xl rounded-lg ml-40 hover:bg-yellow-400 transition-colors duration-300"
                        onClick={() => handleDeleteJob(element._id)}
                      >
                        Delete Job
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className="">
                <Pagination
                  onPageChange={handlePageChange}
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyJobs;
