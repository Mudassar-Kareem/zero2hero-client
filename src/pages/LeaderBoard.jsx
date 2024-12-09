import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { TbTrophy } from "react-icons/tb";
import { SlBadge } from "react-icons/sl";
import { FaCrown } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { useSelector } from "react-redux";

const LeaderBoard = () => {
  const { users } = useSelector((state) => state.user);
  const sortedUsers = users.slice().sort((a, b) => b.point - a.point);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <main className=" ml-0 sm:ml-[20%] px-4 sm:px-10 pt-20 bg-gray-50 min-h-screen">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
          Leaderboard
        </h1>
        <div className="my-8 bg-white rounded-xl shadow-md overflow-hidden">
          {/* Top Performer Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between py-6 px-6 bg-green-500 text-white rounded-t-xl gap-4">
            <TbTrophy size={40} className=" hidden sm:block" />
            <h1 className="text-xl sm:text-2xl font-bold">Top Performer</h1>
            <SlBadge size={40} className=" hidden sm:block" />
          </div>

          {/* Leaderboard Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-100 transition-all duration-300"
                  >
                    {/* Rank */}
                    <td className="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {index < 3 ? (
                          <FaCrown
                            className={`h-6 w-6 ${
                              index === 0
                                ? "text-yellow-400"
                                : index === 1
                                ? "text-gray-400"
                                : "text-yellow-600"
                            }`}
                          />
                        ) : (
                          <span className="text-sm font-semibold text-gray-800">
                            {index + 1}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* User */}
                    <td className="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {user ? (
                          <>
                            <div className="w-9 h-9 rounded-full border border-green-500">
                              <img
                                src={user?.avatar?.url}
                                alt=""
                                className="w-8 h-8 rounded-full"
                              />
                            </div>
                            <span className="text-gray-900 font-semibold">
                              {user.name}
                            </span>
                          </>
                        ) : (
                          <div>
                            <RxAvatar size={20} />
                            <span className="text-gray-900 font-semibold">
                              {user.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Points */}
                    <td className="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <SlBadge size={15} />
                        <span className="font-semibold">{user.point}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeaderBoard;
