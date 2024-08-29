import React from "react";

const TopNiches = () => {
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
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))]  ml-1 mr-1 gap-10">
        {services.map((element) => {
          return (
            <div
              className="bg-black text-white flex flex-col gap-3.5 p-8 px-4 mr-1  rounded-md transition duration-300 hover:bg-[#dfdf07] hover:text-[#111]"
              key={element.id}
            >
              <h4 className="font-semibold uppercase">{element.service}</h4>
              <p>{element.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopNiches;
