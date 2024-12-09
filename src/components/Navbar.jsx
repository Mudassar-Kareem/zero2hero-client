import React, { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import { CiSearch, CiBellOn } from "react-icons/ci";
import { FaCoins } from "react-icons/fa";
import { RxAvatar, RxCross1 } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "../server";
import toast from "react-hot-toast";
import { userNotification } from "../redux/actions/notification";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { notifications } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleDismiss = (id) => {
    console.log(id);
    axios
      .put(`${server}/notification/${id}`, {}, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(userNotification());
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    dispatch(userNotification());
  }, [dispatch]);

  const handleLogout = () => {
    // create a logout functio
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <nav className="bg-white border border-gray-200 sticky z-50 top-0 shadow-md">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo and Menu */}
        <div className="flex items-center">
          <button
            onClick={() => setOpenMenu(true)}
            className="mr-2 md:mr-4 block sm:hidden"
          >
            <IoIosMenu className="text-3xl" />
          </button>
          {openMenu && (
            <div className="absolute top-0 right-0  w-full sm:hidden bg-black border border-gray-200 shadow-lg rounded-lg p-4 z-50">
              <p className=" flex justify-end text-white">
                <RxCross1 size={30} onClick={() => setOpenMenu(!openMenu)} />
              </p>
              <div className="">
                {/* Home Link */}
                <Link
                  to="/"
                  className={`${
                    location.pathname === "/"
                      ? "bg-green-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  } flex justify-center  items-center px-4 py-3  rounded-md transition-all duration-300`}
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  <p>Home</p>
                </Link>

                {/* Reports Link */}
                <Link
                  to="/reports"
                  className={`${
                    location.pathname === "/reports"
                      ? "bg-green-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  } flex justify-center  items-center px-4 py-3 rounded-md transition-all duration-300`}
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  <p>Reports</p>
                </Link>

                {/* Collect Waste Link */}
                <Link
                  to="/collect"
                  className={`${
                    location.pathname === "/collect"
                      ? "bg-green-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  } flex justify-center  items-center px-4 py-3  rounded-md transition-all duration-300`}
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  <p>Collect Waste</p>
                </Link>

                {/* Rewards Link */}
                <Link
                  to="/rewards"
                  className={`${
                    location.pathname === "/rewards"
                      ? "bg-green-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  } flex justify-center  items-center px-4 py-3  rounded-md transition-all duration-300`}
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  <p>Rewards</p>
                </Link>

                {/* Leaderboard Link */}
                <Link
                  to="/leaderboard"
                  className={`${
                    location.pathname === "/leaderboard"
                      ? "bg-green-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  } flex justify-center  items-center px-4 py-3  rounded-md transition-all duration-300`}
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  <p>Leaderboard</p>
                </Link>
              </div>
            </div>
          )}
          <Link to="/" className="flex items-center " aria-label="Home">
            <FaLeaf className="w-6 md:w-8 h-6 md:h-8 mr-1 md:mr-2 text-green-500" />
            <span className="font-bold text-base md:text-lg text-gray-800 hidden sm:block">
              Zero2Hero
            </span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-4 hidden md:block ">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              placeholder="Search"
              className="border border-gray-200 w-full px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <CiSearch
              className="text-2xl absolute top-2.5 right-2.5"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3 md:gap-7">
          {/* Notifications */}
          <div className="relative cursor-pointer">
            <CiBellOn className="text-2xl" onClick={() => setOpen(!open)} />
            {notifications.length > 0 && (
              <span className="absolute bg-red-500 text-white rounded-full top-[-8px] right-0 w-4 h-4 flex items-center justify-center text-xs">
                {notifications.length}
              </span>
            )}
            {open && (
              <div className="absolute right-[-10px] md:right-0 mt-2 w-60 md:w-64 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10">
                <div className="p-4 bg-gray-100 text-gray-800 font-semibold">
                  Notifications
                </div>
                <ul className="divide-y divide-gray-200">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <li
                        key={notif.id}
                        className="flex justify-between items-center px-4 py-3 hover:bg-gray-100"
                      >
                        <div>
                          <p className="text-sm text-gray-700">
                            {notif.message}
                          </p>
                          <p className="text-xs text-gray-500">{notif.time}</p>
                        </div>
                        <button
                          onClick={() => handleDismiss(notif._id)}
                          aria-label="Dismiss"
                        >
                          <AiOutlineClose className="text-gray-400 hover:text-red-500" />
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="p-4 text-gray-500 text-sm text-center">
                      No new notifications
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Balance */}
          <div className="flex gap-2 bg-slate-50 px-3 py-1 rounded-full cursor-pointer">
            <FaCoins className="text-2xl text-green-500" aria-hidden="true" />
            <span
              className="text-sm font-medium"
              aria-label={`Balance: ${user?.point}$`}
            >
              {user ? user?.point.toFixed(2) : 0.0}$
            </span>
          </div>

          {/* User Profile */}
          <div>
            {user ? (
              <div
                className="relative cursor-pointer"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <img
                  src={user.avatar.url}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />

                {/* Hover Box */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                    <div className="p-4 text-sm text-gray-800">
                      <p className="font-semibold mb-2">{user.name}</p>
                      <button
                        onClick={handleLogout}
                        className="w-full border  border-green-500 text-green-500  py-1 rounded-md hover:bg-green-500 hover:text-white"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="block" aria-label="Login">
                <RxAvatar className="text-2xl" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
