import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSalesClick = () => {
    navigate("/main");
  };

  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden bg-gray-100">
      <NavBar />
      <Home />
      <div className="flex flex-col justify-center items-center mt-8 px-4 sm:px-6 lg:px-8">
        <button
          onClick={handleSalesClick}
          className="bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 w-full sm:w-auto"
        >
          Go to Sales
        </button>
      </div>
    </div>
  );
};

export default LandingPage;