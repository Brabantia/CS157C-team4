import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

const HomePage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState();
  const [userRecipes, setUserRecipes] = useState();

  const handleNavigate = (recipe) => {
    navigate("/instructions", {
      state: {
        title: recipe.title,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
      },
    });
  };

  useEffect(() => {
    const authCookie = Cookies.get("auth");
    if (Cookies.get("auth")) {
      const emailFromCookie = JSON.parse(authCookie).user_email;
      setUserEmail(emailFromCookie);
    } else if (!authCookie) {
      console.error("Authentication cookie is missing");
      return;
    }

    const emailFromCookie = JSON.parse(authCookie).user_email;

    fetch(`http://127.0.0.1:5000/get_user_recipes?userEmail=${emailFromCookie}`)
      .then((response) => response.json())
      .then((recipes) => {
        console.log("Fetched Recipes:", recipes);
        if (recipes && recipes.recipes) {
          setUserRecipes(recipes.recipes);
        } else {
          console.error("No recipes found!", recipes);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (index, title) => {
    const deleteUserRecipe = {
      index: index,
      email: userEmail,
      recipeTitle: title,
    };
    console.log(deleteUserRecipe);
    fetch("http://127.0.0.1:5000/delete_user_recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deleteUserRecipe),
    })
      .then((response) => response.json())
      .then((deleteRecipe) => {
        console.log(deleteRecipe)
        if (deleteRecipe.status === 200) {
          console.log(deleteRecipe.message);
          window.location.reload(); 
        } else {
          console.log(deleteRecipe.message);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleLogout = () => {
    Cookies.remove("auth");
    navigate("/");
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

      <div className="flex items-center flex-col w-full bg-[#229EA3]">
        <h1 className="text-6xl mt-20 text-white">
          <b>Your Recipes</b>
        </h1>

        <motion.div
          className=" max-w-1xl p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {userRecipes &&
            userRecipes.map((recipe, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
              >
                <button className="" onClick={() => handleNavigate(recipe)}>
                  <img
                    src={
                      "https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?q=80&w=1784&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt={recipe.title}
                    className="w-full h-64 object-cover"
                  />
                  <h4 className="text-center text-2xl font-semibold py-4">
                    {recipe.title}
                  </h4>
                </button>
                <Button
                  onClick={() => handleDelete(index, recipe.title)}
                  style={{ "font-family": "Montserrat, sans-serif" }}
                  className="text-sm mt-2 mb-3 py-2 px-4 bg-[#229EA3] rounded-md cursor-pointer mx-auto flex justify-center items-center hover:bg-teal-200 transition duration-150"
                >
                  Delete Recipe
                </Button>
              </div>
            ))}
        </motion.div>
      </div>
    </div>
  );
};
export default HomePage;
