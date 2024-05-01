import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const Results = () => {
    const [results, setResults] = useState({
        passed: "Did it pass?",
        errors: "What errors?"
    });

    const navigate = useNavigate();

    const handleReGenerate = () => {
        navigate('/generate');
    };

    const handleHome = () => {
        navigate('/');
    };

    const handleLogout = () => {
        Cookies.remove("auth");
        navigate("/");
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

                    <Button onClick={handleLogout} className="text-xl py-2 px-4 ml-4 bg-white text-teal-500 rounded-md cursor-pointer hover:bg-teal-200 transition duration-150">
                        Log Out
                    </Button>
                </div>
            </nav>
            <div className="flex grow items-center justify-center p-10">
                <div className="flex flex-wrap bg-white rounded-lg shadow-lg w-full max-w-1xl min-h-[50vh] p-8">
                    <ul>
                        <li>{results.passed}</li>
                        <li>{results.errors}</li>
                    </ul>
                </div>
            </div>
            <div className="flex grow items-center justify-center">
                <Button onClick={handleReGenerate} className="text-2xl py-4 bg-teal-600 text-white rounded-md cursor-pointer hover:bg-[#000088] transition duration-100 mb-4">
                    Re-Generate Recipe
                </Button>
            </div>
        </div>
    );
}

export default Results;
