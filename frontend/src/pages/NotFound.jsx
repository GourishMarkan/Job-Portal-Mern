// import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="px-5 py-10 min-h-80 md:px-25 py-10 min-h-[800px]">
      <div className=" min-h-80 md:min-h-[780px] flex flex-col justify-center items-center gap-12">
        <h1 className="text-7xl font-medium">404 Not Found</h1>
        <p className="text-lg text-[#111]">
          Tour visited Page Not Found . You may go home page.
        </p>
        <Link to={"/"} className="w-fit no-underline">
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
