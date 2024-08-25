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
    <div>
      <NavBar />
      <Home />
      <div className="flex justify-center mt-8">
        <button
          onClick={handleSalesClick}
          className="bg-blue-500 text-white p-4 rounded"
        >
          Go to Sales
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
