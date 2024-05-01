import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const Recipes = () => {
  const [cuisines, setCuisines] = useState([]);

  useEffect(() => {
    const mockCuisines = [
      { id: 1, title: "Recipe Name 1", image: "https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?q=80&w=1784&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 2, title: "Recipe Name 2", image: "https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?q=80&w=1784&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 3, title: "Recipe Name 3", image: "https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?q=80&w=1784&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 4, title: "Recipe Name 4", image: "https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?q=80&w=1784&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
    ];
    setCuisines(mockCuisines);
  }, []);

  const navigate = useNavigate();

  const handleReGenerate = () => {
      navigate('/generate');
  };

  const handleHome = () => {
      navigate('/recipes');
  };

  const handleLogout = () => {
    Cookies.remove("auth");
    navigate("/");
  };


  return (
    <div > 
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
              <Button onClick={handleLogout} className="text-xl py-2 px-4 ml-4 bg-white text-teal-500 rounded-md cursor-pointer hover:bg-teal-200 transition duration-150">
                  Log Out
              </Button>
            </div>
        </nav>   

    <div className="flex min-h-screen bg-teal-500 items-center justify-center p-10 ">
    <motion.div
      className="bg-teal-500 max-w-1xl min-h-[50vh] p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisines.map((recipe) => (
        <div key={recipe.id} className="bg-white rounded-xl overflow-hidden shadow-lg">
          <Link to={`/Instructions`}>
                   {/* add      /${recipe.id}     this to make the recipe.id link */}

            <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover"/>
            <h4 className="text-center text-lg font-semibold py-4">{recipe.title}</h4>
          </Link>
        </div>
      ))}
    </motion.div>
  </div>
  </div>
  );
};

export default Recipes;
