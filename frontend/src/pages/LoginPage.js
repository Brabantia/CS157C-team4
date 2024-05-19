import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [emptyFields, setEmptyFields] = useState(false);
  const [emailExists, setEmailExists] = useState(true);
  const [wrongCredentials, setwrongCredentials] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmptyFields(false);
    if (!email || !password) {
      setEmptyFields(true);
    }
    const user = {
      email: email,
      password: password,
    };
    console.log(user);
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((userAccount) => {
        setEmailExists(true);
        setwrongCredentials(false);
        if (userAccount.status === 200) {
          console.log(userAccount.message);
          const userInfo = {
            user_email: userAccount.email,
          };
          console.log(userInfo);
          const expirationTime = new Date(new Date().getTime() + 3600000);
          Cookies.set("auth", JSON.stringify(userInfo), {
            expires: expirationTime,
          });
          navigate("/home");
        } else if (userAccount.status === 201) {
          console.log(userAccount.message);
          setEmailExists(false);
        } else if (userAccount.status === 202) {
          console.log(userAccount.message);
          setwrongCredentials(true);
        } else {
          console.log(userAccount.message);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <nav className="bg-teal-500 p-6 flex justify-between items-center">
        <a href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="self-center text-3xl font-semibold ml-[25px] mt-20px text-white">
            Culinary Craft AI
          </span>
        </a>
      </nav>
  

      <div className="flex items-center justify-center min-h-screen bg-teal-500">
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg max-w-4xl mx-auto overflow-hidden">
          {/* Left Side - Form Panel */}
          <div className="flex flex-col justify-center p-8 md:p-12 md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-5">
              Welcome Back!
            </h2>
            <p className="font-light text-gray-550 mb-6">
              Please enter your details
            </p>
            <form className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="text-md font-medium text-gray-700 block mb-1"
                >
                  Email:{" "}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border border-gray-200 rounded-lg border-[#000088] focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g., john.smith@example.com"
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-md font-medium text-gray-700 block mb-1"
                >
                  Password:{" "}
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-3 border border-gray-200 rounded-lg border-[#000088] focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              {!emailExists && (
                <div
                  className="flex items-center p-4 text-red-700 bg-red-100 rounded-md"
                  role="alert"
                >
                  <span className="text-md">
                    <b>Login Failed - Email doesn't Exist!</b>
                  </span>
                </div>
              )}
              {wrongCredentials && (
                <div
                  className="flex items-center p-4 text-red-700 bg-red-100 rounded-md"
                  role="alert"
                >
                  <span className="text-md">
                    <b>Login Failed - Invalid Password!</b>
                  </span>
                </div>
              )}
              {emptyFields && (
                <div
                  className="flex items-center p-4 text-red-700 bg-red-100 rounded-md"
                  role="alert"
                >
                  <span className="text-md">
                    <b>Error - Please Complete All Fields!</b>
                  </span>
                </div>
              )}
              <Button
                className="w-full bg-[#000088] text-white p-3 rounded-lg  text-lg transition-colors duration-200 ease-in-out hover:bg-blue-600"
                onClick={handleSubmit}
              >
                LOGIN
              </Button>
            </form>
            <p className="text-sm mt-6 text-center text-gray-700">
              Don't have an Account?{" "}
              <a
                href="/signup"
                className="font-bold text-[#000088] hover:underline"
              >
                Sign Up!
              </a>
            </p>
          </div>
          {/* Right Side - Image Panel */}
          <div className="relative md:w-1/2">
            <img
              className="object-cover w-full h-full"
              src="https://plus.unsplash.com/premium_photo-1669833055160-e4ec2436a56c?q=80&w=2572&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <div className="absolute bottom-8 right-4 p-5 bg-white bg-opacity-50 backdrop-blur-md rounded-lg shadow">
              <span className="text-lg font-medium text-gray-850">
                “Experience the best culinary adventures with us.”
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
