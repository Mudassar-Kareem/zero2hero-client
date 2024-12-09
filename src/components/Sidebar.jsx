import React from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { FaHome, FaRegListAlt, FaUsers, FaTrophy, FaCoins } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed pt-32 top-0 left-0 h-full w-[18%] flex flex-col hidden sm:block bg-gray-800 text-white shadow-lg px-4 py-6 gap-5">
      {/* Home Link */}
      <Link
        to="/"
        className={`${
          location.pathname === "/"
            ? "bg-green-600 text-white"
            : "text-gray-300 hover:bg-gray-700"
        } flex gap-4 items-center justify-center lg:justify-start text-lg h-12 w-full px-4 py-3 rounded-md transition-all duration-300`}
      >
        <FaHome size={20} />
        <p className=' hidden lg:block'>Home</p>
      </Link>

      {/* Reports Link */}
      <Link
        to="/reports"
        className={`${
          location.pathname === "/reports"
            ? "bg-green-600 text-white"
            : "text-gray-300 hover:bg-gray-700"
        } flex gap-4 items-center justify-center lg:justify-start text-lg h-12 w-full px-4 py-3 rounded-md transition-all duration-300`}
      >
        <CiLocationOn size={22} />
        <p className=' hidden lg:block'>Reports</p>
      </Link>

      {/* Collect Waste Link */}
      <Link
        to="/collect"
        className={`${
          location.pathname === "/collect"
            ? "bg-green-600 text-white"
            : "text-gray-300 hover:bg-gray-700"
        } flex gap-4 items-center justify-center lg:justify-start text-lg h-12 w-full px-4 py-3 rounded-md transition-all duration-300`}
      >
        <FaRegListAlt size={22} />
        <p className=' hidden lg:block'>Collect Waste</p>
      </Link>

      {/* Rewards Link */}
      <Link
        to="/rewards"
        className={`${
          location.pathname === "/rewards"
            ? "bg-green-600 text-white"
            : "text-gray-300 hover:bg-gray-700"
        } flex gap-4 items-center justify-center lg:justify-start text-lg h-12 w-full px-4 py-3 rounded-md transition-all duration-300`}
      >
        <FaCoins size={22} />
        <p className=' hidden lg:block'>Rewards</p>
      </Link>

      {/* Leaderboard Link */}
      <Link
        to="/leaderboard"
        className={`${
          location.pathname === "/leaderboard"
            ? "bg-green-600 text-white"
            : "text-gray-300 hover:bg-gray-700"
        } flex gap-4 items-center justify-center lg:justify-start text-lg h-12 w-full px-4 py-3 rounded-md transition-all duration-300`}
      >
        <FaTrophy size={22} />
        <p className=' hidden lg:block'>Leaderboard</p>
      </Link>
    </div>
  );
};

export default Sidebar;
