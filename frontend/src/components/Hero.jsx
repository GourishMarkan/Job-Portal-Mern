// import React from "react";

const Hero = () => {
  return (
    <section className="min-h-[800px] flex flex-col justify-center items-center min-w-full max-w-[1700px] gap-12 mx-auto sm:max-w-full md:min-w-full md:p-5 md:text-center ">
      <h1 className="text-5xl uppercase font-bold ml-2 md:text-2xl">
        Find Your Dream Job Today
      </h1>
      <h4 className="text-2xl font-medium text-gray-500 ml-2">
        Connecting Talent with opportunity Across the Nation for Every Skill
        Level
      </h4>
      <div className="ml-2 mr-2 max-w-[900px] text-center bg-[#dfdf07] text-[#111] px-18 py-12 rounded-[35px] font-medium  transition duration-300 hover:-translate-y-2.5 hover:bg-[#111] hover:text-white">
        Explore a vast array of job listings in diverse industries. Whether you
        are a seasoned professional or just starting out, find the perfect role
        to advance your career. Our platform makes job searching easy and
        efficient, bringing you closer to your next big opportunity.
      </div>
    </section>
  );
};

export default Hero;
