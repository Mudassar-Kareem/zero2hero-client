import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { RxUpload } from "react-icons/rx";
import { DataGrid } from "@mui/x-data-grid";
import { MdLocationOn } from "react-icons/md";
import axios from "axios";
import { server } from "../server";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { GoogleGenerativeAI } from "@google/generative-ai";


const Reports = () => {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [weight, setWeight] = useState("");

  const { reports } = useSelector((state) => state.report);
  const [verificationStatus, setVerificationStatus] = useState("idle");
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerify = async () => {
    if (!image) return;

    setVerificationStatus("verifying");

    try {
      const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const based64Image = image.split(",")[1];

      const imageParts = [
        {
          inlineData: {
            data: based64Image,
            mimeType: "image/jpeg",
          },
        },
      ];

      const prompt = `You are an expert in waste management and recycling. Analyze this image and provide:
        1. The type of waste (e.g., plastic, paper, glass, metal, organic)
        2. An estimate of the quantity or amount (in kg or liters)
        3. Your confidence level in this assessment (as a percentage)
  
        Respond in JSON format like this:
        {
          "wasteType": "type of waste",
          "quantity": "estimated quantity with unit",
          "confidence": confidence level as a number between 0 and 1
        }`;

      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const text = await response.text(); // Ensure we await the text method

      const cleanedText = text.replace(/```json|\`\`\`/g, "").trim();

      try {
        const parsedResult = JSON.parse(cleanedText);

        if (
          parsedResult.wasteType &&
          parsedResult.quantity &&
          parsedResult.confidence
        ) {
          setType(parsedResult.wasteType);
          setWeight(parsedResult.quantity);
          toast.success("Waste verified successfully!");
          setVerificationStatus("success");
          setVerificationResult(parsedResult);
        } else {
          throw new Error("Invalid structure in verification result.");
        }
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        toast.error("Error parsing response: Invalid JSON format.");
        setVerificationStatus("failure");
      }
    } catch (error) {
      console.error("Error verifying waste:", error);
      toast.error(`Verification failed: ${error.message}`);
      setVerificationStatus("failure");
    }
  };

  const recentReports = reports.slice(0, 5);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    document.getElementById("image").click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!location || !type || !weight) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    axios
      .post(
        `${server}/report/createReport`,
        { image, location, type, weight },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setLocation("");
        setType("");
        setWeight("");
        setImage(null);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    {
      field: "date",
      headerName: "Date",
      minWidth: 170,
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "location",
      headerName: "Location",
      minWidth: 100,
      flex: 0.6,
      headerClassName: "custom-header",
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <MdLocationOn size={16} className="text-green-500" />
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: "type",
      headerName: "Type",
      minWidth: 130,
      flex: 0.6,
      headerClassName: "custom-header",
    },
  ];

  const rows =
    recentReports?.map((rep, index) => ({
      id: index + 1,
      date: rep.createdAt.split("T")[0],
      location: rep.location,
      type: rep.type,
    })) || [];

  return (
    <div>
      <Navbar />
      <Sidebar />
      <main className=" ml-0 sm:ml-[20%] px-4 sm:px-8 pt-10 sm:pt-20 bg-gray-50 min-h-screen">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
          Report Waste
        </h1>

        <form
          className="bg-white border border-gray-200 mt-6 mb-8 p-4 sm:p-8 shadow-lg rounded-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="font-semibold text-xl sm:text-2xl text-gray-700 mb-4">
            Upload Waste Image
          </h2>

          <div
            className={`flex flex-col gap-4 justify-center items-center mt-4 p-6 rounded-lg cursor-pointer 
                        ${
                          image
                            ? "border-2 border-solid border-green-500"
                            : "border-2 border-dashed border-green-400"
                        }`}
            onClick={triggerImageUpload}
          >
            {image ? (
              <img
                src={image}
                className="w-full h-auto max-h-[300px] sm:max-h-[400px] object-contain rounded-lg"
                alt="Uploaded Waste"
              />
            ) : (
              <>
                <RxUpload size={50} className="text-green-500" />
                <p className="text-green-600 font-semibold text-center">
                  Click to upload an image
                  <span className="block text-gray-500 text-sm font-normal">
                    or drag and drop here
                  </span>
                </p>
              </>
            )}
            <input
              type="file"
              id="image"
              name="image"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </div>

          <button
            type="button"
            onClick={handleVerify}
            className="w-full mb-8 mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg rounded-xl transition-colors duration-300"
            disabled={verificationStatus === "verifying"}
          >
            {verificationStatus === "verifying" ? "Verifying..." : "Verify Waste"}
          </button>

          {verificationStatus === "success" && verificationResult && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-8 rounded-r-xl">
              <div className="flex items-center">
                <div>
                  <h3 className="text-lg font-medium text-green-800">
                    Verification Successful
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Waste Type: {verificationResult.wasteType}</p>
                    <p>Quantity: {verificationResult.quantity}</p>
                    <p>
                      Confidence:{" "}
                      {(verificationResult.confidence * 100).toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-6 mt-6">
            <div className="w-full md:w-[48%] flex flex-col">
              <label
                htmlFor="location"
                className="font-medium text-gray-700 mb-2"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter Waste Location"
                className="border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring focus:ring-green-300 w-full"
              />
            </div>

            <div className="w-full md:w-[48%] flex flex-col">
              <label htmlFor="type" className="font-medium text-gray-700 mb-2">
                Waste Type
              </label>
              <input
                type="text"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Enter Waste Type"
                className="border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring focus:ring-green-300 w-full"
              />
            </div>

            <div className="w-full md:w-[48%] flex flex-col">
              <label
                htmlFor="weight"
                className="font-medium text-gray-700 mb-2"
              >
                Weight
              </label>
              <input
                type="text"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter Waste Weight"
                className="border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring focus:ring-green-300 w-full"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-xl transition-colors duration-300"
          >
            Submit Report
          </button>
        </form>

        <section>
          <h2 className="font-semibold text-xl sm:text-2xl text-gray-700 mb-4">
            Recent Reports
          </h2>
          <div className="h-[400px]">
            <DataGrid rows={rows} columns={columns} pageSize={5} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Reports;
