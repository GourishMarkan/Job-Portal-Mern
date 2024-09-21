import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  deleteApplication,
  resetApplicationSlice,
  fetchEmployerApplications,
} from "../store/slices/applicationSlice";
// import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
const Applications = () => {
  const { applications, loading, error, message, totalPages, limit } =
    useSelector((state) => state.applications);
  // const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // const navigateTo = useNavigate();
  useEffect(() => {
    dispatch(fetchEmployerApplications(currentPage, limit));
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
  }, [dispatch, error, currentPage]);
  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : applications && applications.length <= 0 ? (
        <h1 className="text-2xl font-semibold">
          You have no applications from job seekers
        </h1>
      ) : (
        <>
          <div className="flex flex-col gap-2 relative">
            <h3 className="text-3xl font-semibold text-[rgb(223,223,7)]">
              Applications For Your Posted Jobs
            </h3>
            <div className="flex flex-col gap-7 w-full min-h-96">
              {applications.map((element) => {
                return (
                  <div
                    className="mb-7 bg-[#8080803d] px-3 py-6 rounded-lg"
                    key={element._id}
                  >
                    <p className="flex flex-col gap-1 text-lg text-gray-600">
                      <span className="font-semibold text-xl text-[#111]">
                        Job Title:
                      </span>
                      {element.jobInfo.jobTitle}
                    </p>
                    <p className="flex flex-col gap-1 text-lg text-gray-600">
                      <span className="font-semibold text-xl text-[#111]">
                        Applicant's Name
                      </span>

                      {element.jobSeekerInfo.name}
                    </p>
                    <p className="flex flex-col gap-1 text-lg text-gray-600">
                      <span className="font-semibold text-xl text-[#111]">
                        Applicant's Email
                      </span>
                      {element.jobSeekerInfo.email}
                    </p>
                    <p className="flex flex-col gap-1 text-lg text-gray-600">
                      <span className="font-semibold text-xl text-[#111]">
                        Applicant's Phone
                      </span>
                      {element.jobSeekerInfo.phoneNumber}
                    </p>
                    <p className="flex flex-col gap-1 text-lg text-gray-600">
                      <span className="font-semibold text-xl text-[#111]">
                        Applicant's Address:
                      </span>
                      {element.jobSeekerInfo.address}
                    </p>
                    <p className="flex flex-col gap-1 text-lg text-gray-600">
                      <span className="font-semibold text-xl text-[#111]">
                        Applicant's CoverLetter:
                      </span>
                      <textarea
                        value={element.jobSeekerInfo.coverLetter}
                        rows={5}
                        disabled
                        className="bg-transparent text-lg"
                      ></textarea>
                    </p>
                    <div className="flex-row justify-between ">
                      <button
                        className=" border-none bg-[#111] text-[#fff] py-2 px-5 text-xl rounded-lg ml-40 hover:bg-yellow-400 transition-colors duration-300"
                        onClick={() => handleDeleteApplication(element._id)}
                      >
                        Delete Application
                      </button>
                      <Link
                        to={
                          element.jobSeekerInfo &&
                          element.jobSeekerInfo.resume.url
                        }
                        target="_blank"
                        className=" border-none bg-[#111] text-[#fff] py-2.5 px-5 text-xl rounded-lg ml-40 hover:bg-yellow-400 transition-colors duration-300"
                      >
                        View Resume
                      </Link>
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

export default Applications;
