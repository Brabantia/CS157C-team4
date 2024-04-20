import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [emailExists, setEmailExists] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    console.log(user);
    fetch("http://127.0.0.1:5000/newUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((newUser) => {
        console.log(newUser);
        if (newUser.status === 200) {
          console.log(newUser.message);
          navigate("/login");
        } else if (newUser.status === 201) {
          console.log(newUser.message);
          setEmailExists(true);
        } else {
          console.log(newUser.message);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <nav className="bg-teal-500">
        <a href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="self-center text-3xl font-semibold ml-[200px] mt-[25px] text-white">
            Culinary Craft AI
          </span>
        </a>
      </nav>
  
      <div className="flex items-center justify-center min-h-screen bg-teal-500">
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg max-w-4xl mx-auto overflow-hidden">
          {/* Left Side Panel */}
          <div className="flex flex-col justify-center p-8 md:p-12 md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-5">Sign Up</h2>
            <form className="space-y-5">
              <div>
                <label htmlFor="firstName" className="text-md font-medium text-gray-700 block mb-1">
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  placeholder="ex. John"
                  required
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="text-md font-medium text-gray-700 block mb-1">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  placeholder="ex. Smith"
                  required
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email" className="text-md font-medium text-gray-700 block mb-1">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  placeholder="ex. john.smith@example.com"
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="text-md font-medium text-gray-700 block mb-1">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              {emailExists && (
                <div className="flex items-center p-4 text-red-700 bg-red-200 rounded-md"
                role="alert">
                  <span className="text-md">
                    <b>Registration Failed - Email Already Exists!</b>
                  </span>
                </div>
              )}
              <button className="w-full bg-[#000088] text-white p-3 rounded-lg text-lg transition-colors duration-200 ease-in-out hover:bg-blue-600"
                onClick={handleSubmit}>
                Create New Account
              </button>
            </form>
            <p className="text-sm mt-6 text-center text-gray-700">
              Already have an Account?{" "}
              <a
                href="/login"
                className="font-bold text-[#000088] hover:underline"
              >
                Login!
              </a>
            </p>
          </div>
          {/* Right Side - Image Panel */}
          <div className="relative md:w-1/2">
            <img className="object-cover w-full h-full" src="https://images.unsplash.com/photo-1558985212-324add95595a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <div className="absolute bottom-8 right-4 p-5 bg-white bg-opacity-50 backdrop-blur-md rounded-lg shadow">
              <span className="text-lg font-medium text-gray-850">
                Rest assured, <br/>
                  All recipes generated on this site are carefully curated to ensure they are safe and edible for your enjoyment.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  export default SignUpPage;
  