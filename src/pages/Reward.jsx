import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FaCoins, FaGift } from "react-icons/fa";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { HiArrowTrendingDown } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { allTransaction } from "../redux/actions/transaction";

const Reward = () => {
  const { user } = useSelector((state) => state.user);
  const { transactions } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();
  const recentTransaction = transactions.slice(0, 8);

  useEffect(() => {
    dispatch(allTransaction());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <main className="ml-0 sm:ml-[20%] px-4 sm:px-8 pt-14 sm:pt-20 bg-gray-50 min-h-screen">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
          Rewards
        </h1>

        {/* Reward Balance */}
        <div className="flex flex-col gap-4 p-4 border-l-4 border-green-500 bg-white shadow-lg rounded-md">
          <h1 className="text-md font-bold">Reward Balance</h1>
          <div className="flex items-center gap-4">
            <FaCoins size={37} className="text-green-500" />
            <div>
              <p className="text-2xl font-bold text-green-500">
                {user ? user.point : 0}
              </p>
              <p className="text-sm text-gray-700">Available Points</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Recent Transactions */}
          <div className="flex-1">
            <h1 className="font-bold text-xl mb-5">Recent Transactions</h1>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {recentTransaction.length > 0 ? (
                recentTransaction.map((reward) => (
                  <div
                    key={reward.id}
                    className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="flex items-center gap-5">
                      {reward.type === "earned_report" ? (
                        <HiArrowTrendingUp
                          className="text-green-500"
                          size={22}
                        />
                      ) : reward.type === "earned_collect" ? (
                        <HiArrowTrendingUp
                          className="text-blue-500"
                          size={22}
                        />
                      ) : (
                        <HiArrowTrendingDown
                          className="text-red-500"
                          size={22}
                        />
                      )}
                      <div className="flex flex-col">
                        <p className="text-md text-gray-700">{reward.message}</p>
                        <p className="text-sm text-gray-500">
                          {reward.createdAt.split("T")[0]}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`font-semibold ${
                        reward.type.startsWith("earned")
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {reward.type.startsWith("earned") ? "+" : "-"}{" "}
                      {reward.points}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-4">
                  <h1 className="text-xl font-bold text-gray-800">
                    No Recent Transactions
                  </h1>
                </div>
              )}
            </div>
          </div>

          {/* Available Rewards */}
          <div className="flex-1">
            <h1 className="font-bold text-xl mb-5">Available Rewards</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between">
                <p className="text-lg font-bold">Your Points</p>
                <p className="text-2xl font-bold text-green-500">
                  {user ? user.point : 0}
                </p>
              </div>
              <p className="mt-3 text-md font-semibold text-gray-700">
                Redeem your earned points
              </p>
              <p className="mt-3 text-gray-500 text-sm">
                Points earned from reporting and collecting waste
              </p>
              <button className="flex gap-2 mt-3 items-center bg-green-500 text-white rounded-md w-full py-2.5 justify-center">
                <FaGift /> Redeem Reward
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reward;
