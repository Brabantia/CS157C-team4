import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const Instructions = () => {
  const location = useLocation();
  console.log(location);

  const [details] = useState({ image: "https://via.placeholder.com/100" });
  const [activeTab, setActiveTab] = useState("instructions");
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("auth");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#229EA3">
      <nav className="bg-[#229EA3] p-6 flex justify-between items-center">
        <a href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="self-center text-3xl font-semibold ml-[25px] mt-20px text-white">
            Culinary Craft AI
          </span>
        </a>
        <div>
          <Button
            onClick={() => navigate("/home")}
            style={{ "font-family": "Montserrat, sans-serif" }}
            className="text-xl py-2 px-4 ml-4 bg-white text-[#229EA3] rounded-md cursor-pointer hover:bg-teal-50 transition duration-150"
          >
            Home
          </Button>
          <Button
            onClick={() => navigate("/generate")}
            style={{ "font-family": "Montserrat, sans-serif" }}
            className="text-xl py-2 px-4 ml-4 bg-white text-[#229EA3] rounded-md cursor-pointer hover:bg-teal-50 transition duration-150"
          >
            Generate Recipes
          </Button>
          <Button
            onClick={() => navigate(handleLogout)}
            style={{ "font-family": "Montserrat, sans-serif" }}
            className="text-xl py-2 px-4 ml-4 bg-white text-[#229EA3] rounded-md cursor-pointer hover:bg-teal-50  transition duration-150"
          >
            Log Out
          </Button>
        </div>
      </nav>

      <div className="flex min-h-screen bg-[#229EA3] items-center justify-center p-10">
        <div className="flex flex-wrap bg-white rounded-lg shadow-lg w-full max-w-1xl min-h-[100vh] p-8">
          <div className="w-full md:w-1/2 p-5">
            <h2 className="text-4xl font-bold mb-10">{location.state.title}</h2>
            <img
              src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt={details.title}
              className="max-w-full h-auto rounded-md"
            />
          </div>
          <div className="w-full md:w-1/2 p-5">
            <button
              className={`text-lg p-2 rounded ${
                activeTab === "instructions"
                  ? "bg-[#229EA3] font-bold text-white"
                  : "bg-white text-gray-700 border border-gray-400"
              }`}
              onClick={() => setActiveTab("instructions")}
            >
              Instructions
            </button>
            <button
              className={`text-lg p-2 rounded ml-4 ${
                activeTab === "ingredients"
                  ? "bg-[#229EA3] font-bold text-white"
                  : "bg-white text-gray-700 border border-gray-400"
              }`}
              onClick={() => setActiveTab("ingredients")}
            >
              Ingredients
            </button>
            {activeTab === "instructions" && (
              <div>
                <h2 className="text-3xl font-bold mt-10">Ingredients: </h2>
                <ol className="mt-3 ml-7 list-decimal text-xl">
                  {location.state.instructions
                    .split(".")
                    .map((instruction, index) => {
                      if (instruction.trim() !== "") {
                        return (
                          <li key={index} className="m-2">
                            {capitalizeFirstLetter(instruction.trim())}.
                          </li>
                        );
                      } else {
                        return null;
                      }
                    })}
                </ol>
              </div>
            )}
            {activeTab === "ingredients" && (
              <div>
                <h2 className="text-3xl font-bold mt-10">Ingredients: </h2>
                <ul className="mt-3 ml-7 list-disc text-xl">
                  {location.state.ingredients
                    .split(",")
                    .map((ingredient, index) => (
                      <li key={index} className="m-1">
                        {capitalizeFirstLetter(ingredient.trim())}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
