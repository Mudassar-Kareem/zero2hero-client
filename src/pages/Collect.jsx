import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FaSearch } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlinePendingActions } from "react-icons/md";
import { VscVerifiedFilled } from "react-icons/vsc";
import { RiProgress6Line } from "react-icons/ri";
import { GiNuclearWaste } from "react-icons/gi";
import { TbWeight } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import { server } from "../server";
import toast from "react-hot-toast";

const Collect = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { reports } = useSelector((state) => state.report);

  const filtered = searchTerm
    ? reports.filter((item) =>
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : reports;

  const handleStatusChange = (id) => {
    axios
      .put(`${server}/report/updateReport/${id}`, {}, { withCredentials: true })
      .then((res) => {
        toast.success(res?.data?.message);
        window.location.reload();
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.message || "Something went wrong";
        toast.error(errorMessage);
      });
  };

  const handleStatusComplete = (id) => {
    axios
      .put(
        `${server}/report/completeReport/${id}`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res?.data?.message);
        window.location.reload();
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.message || "Something went wrong";
        toast.error(errorMessage);
      });
  };

  const buttonClass =
    "border text-gray-700 px-3 py-2 rounded-md mt-2 font-semibold hover:bg-gray-100";
  const statusClass = "flex items-center text-sm px-2 rounded-full";

  return (
    <div>
      <Navbar />
      <Sidebar />
      <main className=" ml-0 sm:ml-[20%]  px-4 sm:px-6 lg:px-8 pt-14 md:pt-20 min-h-screen mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Waste Collection Task
        </h1>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by area..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border py-2 px-3 border-gray-200 rounded-md outline-green-600"
            aria-label="Search by area"
          />
          <FaSearch
            size={20}
            className="text-gray-500 absolute right-4 top-[50%] transform -translate-y-1/2"
          />
        </div>

        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 p-4 mt-4 rounded-md shadow-md flex flex-col gap-4 md:gap-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <span className="flex items-center gap-2 font-semibold text-xl">
                  <CiLocationOn size={18} className="text-green-500" />
                  {item.location}
                </span>
                <span
                  className={`${
                    item.status === "pending"
                      ? "text-red-500 bg-red-100"
                      : item.status === "in_progress"
                      ? "text-green-500 bg-green-100"
                      : "text-blue-500 bg-blue-100"
                  } ${statusClass}`}
                >
                  {item.status === "pending" && <MdOutlinePendingActions />}
                  {item.status === "in_progress" && <RiProgress6Line />}
                  {item.status === "completed" && <VscVerifiedFilled />}
                  {item.status.split("_").join(" ")}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <span className="flex items-center gap-2 text-gray-700 text-lg">
                  <GiNuclearWaste size={22} /> {item.type}
                </span>
                <span className="flex items-center gap-2 text-gray-700 text-lg">
                  <TbWeight size={22} /> {item.weight}
                </span>
                <span className="flex items-center gap-2 text-gray-700 text-md">
                  <SlCalender size={20} />{" "}
                  {moment(item.createdAt).format("MM/DD/YYYY")}
                </span>
              </div>

              <div className="flex justify-end">
                {item.status === "pending" && (
                  <button
                    className={buttonClass}
                    onClick={() => handleStatusChange(item._id)}
                  >
                    Start Collection
                  </button>
                )}
                {item.status === "in_progress" && (
                  <button
                    className={buttonClass}
                    onClick={() => handleStatusComplete(item._id)}
                  >
                    Complete & Verify
                  </button>
                )}
                {item.status === "completed" && (
                  <span className="text-green-500 font-semibold mt-2">
                    Reward Earned
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-2xl text-red-500 mt-6">No data found</h1>
        )}
      </main>
    </div>
  );
};

export default Collect;
