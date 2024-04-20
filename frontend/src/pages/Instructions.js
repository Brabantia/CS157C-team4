import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

const Instructions = () => {

  const [details] = useState({
    title: "Same image Recipes",
    image: "https://via.placeholder.com/100",
    instructions: "<li>Step 1: Mix </li><li>Step 2: Bake</li>",
    extendedIngredients: [
      { id: 1, original: "1 ingredient, maybe add more" },
      { id: 2, original: "2 cups" },
      { id: 3, original: "1 chocolate" }
    ]
  });
  const [activeTab, setActiveTab] = useState("instructions");
  const navigate = useNavigate();

  const handleReGenerate = () => {
      console.log("Re-generating recipe...");
  };

  const handleHome = () => {
      navigate('/recipes');
  };

  const handleLogOut = () => {
      console.log("Logging out...");
      navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-teal-500">
      <nav className="bg-teal-500 p-6 flex justify-between items-center">
          <a href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="self-center text-3xl font-semibold ml-[200px] text-white">
                  Culinary Craft AI
              </span>
          </a>
          <div>
              <Button onClick={handleHome} className="text-xl py-2 px-4 bg-white text-teal-500 rounded-md cursor-pointer hover:bg-teal-200 transition duration-150">
                  Home
              </Button>
              <Button onClick={handleReGenerate} className="text-xl py-2 px-4 ml-4 bg-white text-teal-500 rounded-md cursor-pointer hover:bg-teal-200 transition duration-150">
                  Generate
              </Button>
              <Button onClick={handleLogOut} className="text-xl py-2 px-4 ml-4 bg-white text-teal-500 rounded-md cursor-pointer hover:bg-teal-200 transition duration-150">
                  Log Out
              </Button>
          </div>
      </nav>
    <div className="flex min-h-screen bg-teal-500 items-center justify-center p-10">
      <div className="flex flex-wrap bg-white rounded-lg shadow-lg w-full max-w-1xl min-h-[100vh] p-8">
        <div className="w-full md:w-1/2 p-5">
          <h2 className="text-2xl font-bold mb-4">{details.title}</h2>
          <img src='https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt={details.title} className="max-w-full h-auto rounded-md"/>
        </div>
        <div className="w-full md:w-1/2 p-5">
          <button
            className={`text-lg p-2 rounded ${activeTab === "instructions" ? "bg-teal-500 text-white" : "bg-white text-gray-700 border border-gray-400"}`}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </button>
          <button
            className={`text-lg p-2 rounded ml-4 ${activeTab === "ingredients" ? "bg-teal-500 text-white" : "bg-white text-gray-700 border border-gray-400"}`}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </button>
          {activeTab === "instructions" && (
            <div className="mt-5">
              <ol dangerouslySetInnerHTML={{ __html: details.instructions }} className="list-decimal pl-5"></ol>
            </div>
          )}
          {activeTab === "ingredients" && (
            <ol className="list-decimal pl-5 mt-5">
              {details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id} className="text-lg leading-loose">{ingredient.original}</li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
    </div>

  );
};

export default Instructions;
