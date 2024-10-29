// import React from "react";

import { Link } from "react-router-dom";
// import JobCard from "./jobCard";

const TopNiches = () => {
  const jobData = [
    {
      id: 1,
      title: "Software Developer",

      company: "Google",
      salary: "Rs. 100,000",
      location: "Remote",
      type: "Full-Time",
    },
    {
      id: 2,
      title: "Web Developer",

      company: "Google",
      salary: "Rs. 100,000",
      location: "Remote",
      type: "Full-Time",
    },
    {
      id: 3,
      title: "Web3 Developer",

      company: "Google",
      salary: "Rs. 100,000",
      location: "Remote",
      type: "Full-Time",
    },
    {
      id: 4,
      title: "AI ENGINEER",

      company: "Google",
      salary: "Rs. 100,000",
      location: "Remote",
      type: "Full-Time",
    },
    // {
    //   id: 5,
    //   title: "Web Developer",

    //   company: "Google",
    //   salary: "Rs. 100,000",
    //   location: "Remote",
    //   type: "Full-Time",
    // },
    // {
    //   id: 6,
    //   title: "Golang Developer",
    //   company: "Google",
    //   salary: "Rs. 100,000",
    //   location: "Remote",
    //   type: "Full-Time",
    // },
    // {
    //   id: 7,
    //   title: "React Developer",
    //   company: "Meta",
    //   salary: "Rs. 110,000",
    //   location: "Remote",
    //   type: "Full-Time",
    // },
    // {
    //   id: 8,
    //   title: "React Developer",
    //   company: "Meta",
    //   salary: "Rs. 110,000",
    //   location: "Remote",
    //   type: "Full-Time",
    // },
  ];
  const services = [
    {
      id: 1,
      service: "Software Development",
      description:
        "Innovative software development services to build, maintain, and upgrade applications, ensuring they meet the highest quality standards.",
    },
    {
      id: 2,
      service: "Web Development",
      description:
        "Comprehensive web development solutions from front-end design to back-end integration, delivering responsive and user-friendly websites.",
    },
    {
      id: 3,
      service: "Data Science",
      description:
        "Advanced data science services to analyze and interpret complex data, providing actionable insights and data-driven solutions.",
    },
    {
      id: 4,
      service: "Cloud Computing",
      description:
        "Reliable cloud computing services to manage, store, and process data efficiently, offering scalable and flexible cloud solutions.",
    },
    {
      id: 5,
      service: "DevOps",
      description:
        "DevOps services to streamline software development and operations, enhancing deployment efficiency and reducing time to market.",
    },
    {
      id: 6,
      service: "Mobile App Development",
      description:
        "Expert mobile app development for iOS and Android platforms, creating intuitive and engaging mobile experiences for your users.",
    },
  ];
  return (
    <section className="py-12 flex flex-col justify-center items-center min-w-full max-w-[1700px] ml-1 mr-1 gap-12">
      <h3 className=" text-2xl font-semibold uppercase ">Top Niches</h3>
      {/* <div className="grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))]  ml-1 mr-1 gap-10"> */}
      <div className="flex flex-wrap justify-evenly ml-1 mr-1 gap-10">
        {/* {services.map((element) => {
          return (
            <div
              className="bg-black text-white flex flex-col gap-3.5 p-8 px-4 mr-1  rounded-md transition duration-300 hover:bg-[#dfdf07] hover:text-[#111]"
              key={element.id}
            >
              <h4 className="font-semibold uppercase">{element.service}</h4>
              <p>{element.description}</p>
            </div>
          );
        })} */}
        {jobData.map((jobData) => {
          return (
            <div
              className="flex flex-col items-start justify-center border rounded-lg
        px-3 py-2 w-80 h-90 "
              key={jobData.id}
            >
              <h4 className="font-semibold text-xl">{jobData.title}</h4>

              <p className="font-meduim p-1">Company:{jobData.company}</p>
              <p className="border-b border-gray-100 w-full p-1"></p>
              <p className="font-meduim p-1">📍:{jobData.location}</p>
              <p className="font-meduim p-2">💰:{jobData.salary}</p>
              <p className="font-meduim p-2">Type:{jobData.type}</p>
              <Link className="bg-blue-500 text-white p-2 rounded-md self-end">
                {" "}
                View{" "}
              </Link>
            </div>
          );
        })}
      </div>
      {/* <JobCard jobData={jobData} />
       */}
      {/* hi */}
    </section>
  );
};

export default TopNiches;
