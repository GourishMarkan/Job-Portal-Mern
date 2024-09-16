import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <nav
      className={`${
        show ? "h-30" : "h-20"
      } flex justify-between border-b border-gray-500 px-8 py-4 items-center transition-height duration-300`}
    >
      <div className="flex items-center gap-8">
        <img
          src="/logo.png"
          alt="logo"
          className="w-28 lg:w-20 md:w-16 sm:w-10"
        />
      </div>
      <div
        className={`${
          show ? "flex flex-col" : "hidden sm:flex"
        } w-full sm:w-auto items-center sm:flex-row sm:justify-between sm:gap-12`}
      >
        <ul className="flex flex-col sm:flex-row sm:gap-12 items-center">
          <li className="list-none">
            <Link
              to={"/"}
              className="text-gray-700 hover:text-yellow-400 transition-colors duration-300"
              onClick={() => setShow(!show)}
            >
              HOME
            </Link>
          </li>
          <li className="list-none">
            <Link
              to={"/jobs"}
              className="text-gray-700 hover:text-yellow-400 transition-colors duration-300"
              onClick={() => setShow(!show)}
            >
              JOBS
            </Link>
          </li>
          {isAuthenticated ? (
            <li className="list-none">
              <Link
                to={"/dashboard"}
                className="text-gray-700 hover:text-yellow-400 transition-colors duration-300"
                onClick={() => setShow(!show)}
              >
                DASHBOARD
              </Link>
            </li>
          ) : (
            <li className="list-none">
              <Link
                to={"/login"}
                className="text-gray-700 hover:text-yellow-400 transition-colors duration-300"
                onClick={() => setShow(!show)}
              >
                LOGIN
              </Link>
            </li>
          )}
        </ul>
      </div>
      <GiHamburgerMenu
        className="block sm:hidden text-2xl cursor-pointer"
        onClick={() => setShow(!show)}
      />
    </nav>
  );
};

export default Navbar;
