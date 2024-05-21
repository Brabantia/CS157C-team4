import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Generate = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("auth");
    navigate("/");
  };
  const [userEmail, setUserEmail] = useState();
  const [recipeType, setRecipeType] = useState();
  const [ingredients, setIngredients] = useState();
  const [cuisineType, setCuisineType] = useState();

  const [unsafe, setUnsafe] = useState(false);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    if (Cookies.get("auth")) {
      const authCookie = Cookies.get("auth");
      const emailFromCookie = JSON.parse(authCookie).user_email;
      setUserEmail(emailFromCookie);
    }
  }, []);

  const handleGenerate = (event) => {
    event.preventDefault();
    if (!recipeType || !ingredients || !cuisineType) {
      setEmpty(true);
    }
    const generateInfo = {
        recipeType: recipeType,
        ingredients: ingredients,
        cuisineType: cuisineType,
        userEmail: userEmail
    };
    console.log(generateInfo);
    fetch("http://127.0.0.1:5000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(generateInfo),
    })
      .then((response) => response.json())
      .then((generateRecipe) => {
        if (generateRecipe.status === 200) {
            console.log(generateRecipe.recipe);
            navigate("/home");
        } else if (generateRecipe.status === 201) {
            console.log(generateRecipe.message);
            setUnsafe(true)
        } else if (generateRecipe.status === 202) {
            console.log(generateRecipe.message);
        } else {
            console.log(generateRecipe);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
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
            onClick={() => navigate("/profile")}
            style={{ "font-family": "Montserrat, sans-serif" }}
            className="text-xl py-2 px-4 ml-4 bg-white text-[#229EA3] rounded-md cursor-pointer hover:bg-teal-50 transition duration-150"
          >
            Profile
          </Button>
          <Button
            onClick={handleLogout}
            style={{ "font-family": "Montserrat, sans-serif" }}
            className="text-xl py-2 px-4 ml-4 bg-white text-[#229EA3] rounded-md cursor-pointer hover:bg-teal-50  transition duration-150"
          >
            Log Out
          </Button>
        </div>
      </nav>

      <div
        className="h-screen  bg-[#229EA3] flex flex-col justify-center"
        style={{ "font-family": "Montserrat, sans-serif" }}
      >
        <div className="bg-white p-12 rounded-lg shadow-lg mx-auto my-10 max-w-4xl w-full ">
          <h2 className="text-4xl font-semibold mb-6 text-black">
            Create Your Custom Recipe
          </h2>
          <form className="grid gap-6">
            <div>
              <label className="text-lg">
                <b className="text-xl">Recipe Type:</b>
                <input
                  type="text"
                  placeholder="e.g., vegetarian, non-vegetarian"
                  className="bg-gray-50 mt-3 block w-full p-4 border-2 border-gray-300 rounded-md"
                  onChange={(event) => setRecipeType(event.target.value)}
                />
              </label>
            </div>
            <div>
              <label className="text-lg">
                <b className="text-xl">Ingredients:</b>
                <input
                  type="text"
                  placeholder="e.g., tomatoes, chicken, pasta"
                  className="bg-gray-50 mt-3 block w-full p-4 border-2 border-gray-300 rounded-md"
                  onChange={(event) => setIngredients(event.target.value)}
                />
              </label>
            </div>
            <div>
              <label className="text-lg">
                <b className="text-xl"> Cuisine Type:</b>
                <input
                  type="text"
                  placeholder="e.g., Italian, Mexican"
                  className="bg-gray-50 mt-3 block w-full p-4 border-2 border-gray-300 rounded-md"
                  onChange={(event) => setCuisineType(event.target.value)}
                />
              </label>
            </div>
            {unsafe && (
             <div className="flex items-center p-4 text-red-700 bg-red-100 rounded-md"
             role="alert">
               <span className="text-md">
                 <b>You Entered an UNSAFE Substance - Please Try Again!</b>
               </span>
             </div>
           )}
           {empty && (
             <div className="flex items-center p-4 text-red-700 bg-red-100 rounded-md"
             role="alert">
               <span className="text-md">
                 <b>Error - Please Complete All Fields!</b>
               </span>
             </div>
           )}
            <Button
              type="submit"
              style={{ "font-family": "Montserrat, sans-serif" }}
              className="text-2xl mt-5 w-full py-4 bg-[#000088] text-white rounded-md cursor-pointer"
              onClick={handleGenerate}
            >
              Generate Recipe
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Generate;
