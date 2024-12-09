import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FaCoins, FaLeaf, FaPeopleCarry, FaRecycle } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { useSelector } from "react-redux";

const Home = () => {
  const { reports } = useSelector((state) => state.report);
  const { user } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-0 sm:ml-[18%] p-4 sm:p-8 pt-10 sm:pt-20 bg-gray-50">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="relative w-20 sm:w-32 h-20 sm:h-32 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-green-400 opacity-40 animate-ping"></div>
              <div className="absolute inset-4 rounded-full bg-green-300 opacity-60 animate-spin"></div>
              <div className="absolute inset-6 rounded-full bg-green-200 opacity-80 animate-bounce"></div>
              <FaLeaf className="absolute inset-0 m-auto h-10 sm:h-16 w-10 sm:w-16 text-green-600 animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-5xl font-bold text-gray-800 mb-6">
              Zero-To-Hero <span className="text-green-600">Waste Management</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 mx-auto max-w-2xl">
              Join our community in making waste management more efficient and rewarding!
            </p>
            <button className="bg-green-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-green-600 transition duration-300">
              Get Started
            </button>
          </section>

          {/* Features Section */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: FaLeaf,
                title: "Eco-Friendly",
                description: "Contribute to a cleaner environment by reporting and collecting waste.",
              },
              {
                icon: FaCoins,
                title: "Earn Rewards",
                description: "Get tokens for your contributions to waste management efforts.",
              },
              {
                icon: FaPeopleCarry,
                title: "Community-Driven",
                description: "Be part of a growing community committed to sustainable practices.",
              },
            ].map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center bg-white p-6 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <Icon size={50} className="bg-green-200 rounded-full text-green-500 p-3" />
                <h2 className="font-bold text-lg sm:text-xl mt-4">{title}</h2>
                <p className="text-gray-700 text-sm sm:text-base mt-2">{description}</p>
              </div>
            ))}
          </section>

          {/* Impact Section */}
          <section className="bg-white p-6 sm:p-10 rounded-md shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">Our Impact</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: FaRecycle, value: `100kg`, label: "Waste Collected" },
                { icon: CiLocationOn, value: `${reports.length}`, label: "Reports Submitted" },
                { icon: FaCoins, value: "3", label: "Tokens Earned" },
                { icon: FaLeaf, value: "123 Kg", label: "CO2 Offset" },
              ].map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center bg-gray-100 p-6 rounded-md text-center"
                >
                  <Icon size={30} className="text-green-600 mb-2" />
                  <h3 className="text-lg font-semibold">{value}</h3>
                  <p className="text-gray-700 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
