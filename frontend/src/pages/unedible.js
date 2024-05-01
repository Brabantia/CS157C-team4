import React from 'react';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const Unedible = () => {

    const navigate = useNavigate();

  
    const handleHome = () => {
        navigate('/recipes');
    };
  
    const handleLogout = () => {
        Cookies.remove("auth");
        navigate("/");
    };
  
    return (
        <div>
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
                    <Button onClick={handleLogout} className="text-xl py-2 px-4 ml-4 bg-white text-teal-500 rounded-md cursor-pointer hover:bg-teal-200 transition duration-150">
                        Log Out
                    </Button>
            </div>
            </nav>   
            <div className="min-h-screen  bg-teal-500 flex flex-col justify-center">
            <div className="bg-white p-12 rounded-lg shadow-lg mx-auto my-10 max-w-4xl w-full min-h-[600px]">
                <h2 className="text-3xl font-semibold mb-6 text-gray-800">Testing Model's Safety</h2>
                <form className="grid gap-6">
                    <div>
                        <label className="text-1xl font-bold text-gray-700">
                            Recipe Type:
                            <input 
                                type="text" 
                                placeholder="e.g., vegetarian, non-vegetarian" 
                                className="mt-1 block w-full p-5 border border-gray-300 rounded-md"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="text-1xl font-bold text-gray-700">
                            Ingredients:
                            <input 
                                type="text" 
                                placeholder="Testing area" 
                                className="mt-1 block w-full p-5 border border-gray-300 rounded-md"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="text-1xl font-bold text-gray-700">
                            Cuisine Type:
                            <input 
                                type="text" 
                                placeholder="e.g., Italian, Mexican" 
                                className="mt-1 block w-full p-5 border border-gray-300 rounded-md"
                            />
                        </label>
                    </div>
                    <Button type="submit" className="text-2xl w-full py-4 bg-teal-600 text-white rounded-md cursor-pointer hover:bg-[#000088] transition duration-100">
                        Test-Generated Recipe Model
                    </Button>
                </form>
            </div>
            </div>
        </div>
    );
}

export default Unedible;
