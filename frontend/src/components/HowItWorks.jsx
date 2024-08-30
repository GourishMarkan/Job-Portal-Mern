// import React from "react";
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";
const HowItWorks = () => {
  return (
    <section className="px-25 py-12 flex flex-col justify-center items-center mx-auto gap-5 bg-yellow-300 min-w-full  ">
      <h3 className="text-2xl font-semibold text-[#111] uppercase">
        How does it work?
      </h3>
      <div className="flex flex-col gap-5">
        <div className="mx-3 bg-[#fff] px-12.5 py-7.5 flex flex-col gap-3 rounded-md transition duration-300 hover: translate-y-2.5 hover:bg-[#111] hover:text-[#fff] ">
          <div className="  w-fit flex bg-[#111] p-2.5 rounded-[100%] justify-center items-center transition duration-300 hover:text-white">
            <LuUserPlus
              className="text-4xl text-[rgb(255,255,255)] transition duration-300 hover:text-[#fff] 
            "
            />
          </div>
          <h4 className="text-xl mx-2 font-medium ">Create An Account</h4>
          <p className="text-gray-500 mx-2">
            Sign up for a free account as a job seeker or employer. Set up your
            profile in minutes to start posting jobs or applying for jobs.
            Customize your profile to highlight your skills or requirements.
          </p>
        </div>
        <div className="mx-3 bg-[#fff] px-12.5 py-7.5 flex flex-col gap-4 rounded-md transition duration-300 hover: translate-y-2.5 hover:bg-[#111] hover:text-[#fff] ">
          <div className=" w-fit flex bg-[#111] p-2.5 rounded-[100%] justify-center items-center transition duration-300 hover:text-white ">
            <VscTasklist
              className="text-4xl text-[#fff] transition duration-300 hover:text-[#fff] 
            "
            />
          </div>
          <h4 className="text-xl mx-2 font-medium">Post or Browse Jobs</h4>
          <p className="text-gray-500 mx-2">
            Employers can post detailed job descriptions, and job seekers can
            browse a comprehensive list of available positions. Utilize filters
            to find jobs that match your skills and preferences.
          </p>
        </div>
        <div className="mx-3 bg-[#fff] px-12.5 py-7.5 flex flex-col gap-4 rounded-md transition duration-300 hover: translate-y-2.5 hover:bg-[#111] hover:text-[#fff] ">
          <div className=" w-fit flex bg-[#111] p-2.5 rounded-[100%] justify-center items-center transition duration-300 hover:text-white">
            <BiSolidLike
              className="text-4xl text-[#fff] transition duration-300 hover:text-[#fff] 
            "
            />
          </div>
          <h4 className="text-xl ml-2 font-medium">Hire or Get Hired</h4>
          <p className="text-gray-500 mx-2">
            Employers can shortlist candidates and extend job offers. Job
            seekers can review job offers and accept positions that align with
            their career goals.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
