// import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa6";
const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <footer className="bg-[#111] flex border-b-[#85858585] pt-10 px-5 pb-5 ">
        <div className="flex-1 flex  justify-center items center pr-5">
          <img src="/logo.png" alt="logo" className="w-52" />
        </div>
        <div className="flex-1 pr-5">
          <h4 className="text-white font-bold tracking-wide text-2xl mb-5">
            Support{" "}
          </h4>
          <ul className="flex flex-col gap-2 text-gray-300">
            <li>#417-d brs nagar Ludhiana,India</li>
            <li>job@gmail.com</li>
            <li>+91 6273711203</li>
          </ul>
        </div>
        <div className="flex-1 pr-5">
          <h4 className="text-white font-bold tracking-wide text-2xl mb-5">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2 text-gray-300">
            <li>
              <Link
                to={"/"}
                className="no-underline text-gray-300 flex items-center gap-2 transition duration-300 hover:text-yellow-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/jobs"}
                className="no-underline text-gray-300 flex items-center gap-2 transition duration-300 hover:text-yellow-300"
              >
                Jobs
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link
                  to={"/dashboard"}
                  className="no-underline text-gray-300 flex items-center gap-2 transition duration-300 hover:text-yellow-300"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="flex-1 pr-5">
          <h4 className="text-white font-bold tracking-wide text-2xl mb-5">
            Follow Us
          </h4>
          <ul className="flex flex-col gap-2 text-gray-300">
            <li>
              <Link
                to={"/"}
                className="no-underline text-gray-300 flex items-center gap-2 transition duration-300 hover:text-yellow-300"
              >
                <span>
                  <FaSquareXTwitter />
                </span>
                <span>Twitter (X)</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/"}
                className="no-underline text-gray-300 flex items-center gap-2 transition duration-300 hover:text-yellow-300"
              >
                <span>
                  <FaSquareInstagram />
                </span>
                <span>Instagram</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/"}
                className="no-underline text-gray-300 flex items-center gap-2 transition duration-300 hover:text-yellow-300"
              >
                <span>
                  <FaYoutube />
                </span>
                <span>Youtube</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/"}
                className="no-underline text-gray-300 flex items-center gap-2 transition duration-300 hover:text-yellow-300"
              >
                <span>
                  <FaLinkedin />
                </span>
                <span>LinkedIn</span>
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
