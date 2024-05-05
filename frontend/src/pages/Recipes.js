import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@material-tailwind/react';
import Cookies from "js-cookie";
import axios from 'axios'; // axios for HTTP requests

const Recipes = () => {
  const [cuisines, setCuisines] = useState([]);
  const navigate = useNavigate();

  // Array id 
  // useEffect(() => {
  //   const mockCuisines = [
  //     { id: 1, title: "Recipe Name 1", image: "https://images.unsplash.com/photo-1542010589005-d1eacc3918f2" },
  //     { id: 2, title: "Recipe Name 2", image: "https://images.unsplash.com/photo-1542010589005-d1eacc3918f2" },
  //     { id: 3, title: "Recipe Name 3", image: "https://images.unsplash.com/photo-1542010589005-d1eacc3918f2" },
  //     { id: 4, title: "Recipe Name 4", image: "https://images.unsplash.com/photo-1542010589005-d1eacc3918f2" }
  //   ];
  //   setCuisines(mockCuisines);
  // }, []);

  
 // // For backend retrieve recipe List with the same image
 //  useEffect(() => {
 //    fetch('http://127.0.0.1:5000/get_user_recipes?userEmail=<email>')
 //      .then(response => response.json())
 //      .then(data => {
 //        const updatedImagedRecipes = data.recipes.map(recipe => ({
 //          ...recipe, 
 //          image: "https://images.unsplash.com/photo-1542010589005-d1eacc3918f2"
 //        }));
 //        setCuisines(updatedImagedRecipes);
 //      })
 //      .catch(error => console.error('Error fetching recipes:', error));
 //  }, []);

  
  useEffect(() => {
  fetch('http://127.0.0.1:5000/get_user_recipes?userEmail=<email>')
    .then(response => response.json())
    .then(data => {
      const updatedImagedRecipes = data.recipes.map((recipe, index) => ({
        ...recipe,
        id: `recipe-${index}`,          // If Redis has no id for a different recipe then we create our own unique id++ or use delete using title only
        image: "https://images.unsplash.com/photo-1542010589005-d1eacc3918f2"  // image
      }));
      setCuisines(updatedImagedRecipes);
    })
    .catch(error => console.error('Error fetching recipes:', error));
}, []);
  
// example { "title": "Pasta Bolognese", "id": "recipe-0", "image": "https://images.unsplash.com/photo-1542010589005-d1eacc3918f2" }


  const handleDelete = async (recipeId) => {
   // console.log(`Attempting to delete recipe with ID: ${recipeId}`);  
    alert(`Attempting to delete recipe with ID: ${recipeId}`);

  
    try {
      const userEmail = Cookies.get('userEmail'); // its email specific
      const response = await axios.post('/delete_recipe', { userEmail, recipeNumber: recipeId });
      if (response.status === 200) {
        console.log(`Recipe with ID: ${recipeId} deleted successfully`); //  success
        
        // Update the page
        setCuisines(cuisines.filter(recipe => recipe.id !== recipeId));
      }
    } catch (error) {
      console.error(`Failed to delete recipe with ID: ${recipeId}:`, error); // errors
    }
  };
  

  const handleHome = () => {
    navigate('/recipes');
  };

  const handleReGenerate = () => {
    navigate('/generate');
  };

  const handleLogout = () => {
    Cookies.remove("auth");
    navigate("/");
  };

  return (
    <div> 
      <nav className="bg-teal-500 p-6 flex justify-between items-center">
        <span className="self-center text-3xl font-semibold ml-[200px] text-white">Culinary Craft AI</span>
        <div>
          <Button onClick={handleHome} className="text-xl py-2 px-4 bg-white text-teal-500 rounded-md cursor-pointer hover:bg-teal-200 transition duration-150">Home</Button>
          <Button onClick={handleReGenerate} className="text-xl py-2 px-4 ml-4 bg-white text-teal-500 rounded-md cursor-pointer hover:bg-teal-200 transition duration-150">Generate</Button>
          <Button onClick={handleLogout} className="text-xl py-2 px-4 ml-4 bg-white text-teal-500 rounded-md cursor-pointer hover:bg-teal-200 transition duration-150">Log Out</Button>
        </div>
      </nav>   
      <div className="flex min-h-screen bg-teal-500 items-center justify-center p-10">
        <motion.div className="bg-teal-500 max-w-1xl min-h-[50vh] p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
          {cuisines.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-xl overflow-hidden shadow-lg">
              <Link to={`/instructions/${recipe.id}`}>
                <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover"/>
                <h4 className="text-center text-lg font-semibold py-4">{recipe.title}</h4>
              </Link>
              <Button onClick={() => handleDelete(recipe.id)} className="block w-full text-center text-xl py-2 px-4 bg-blue-800 text-white rounded-b-md cursor-pointer hover:bg-red-700 transition duration-150">Delete</Button>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Recipes;
