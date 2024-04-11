import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <div>
      <nav className="bg-[#229EA3]">
          <a href="/" class="flex items-center space-x-2 rtl:space-x-reverse">
            <span class="self-center text-3xl font-semibold ml-[20px] mt-[25px] text-white">
              Culinary Craft AI
            </span>
          </a>
  
      </nav>
      <div className="flex items-center flex-col justify-center h-screen w-full bg-[#229EA3]">
        <div className="w-full bg-white rounded-lg shadow-md md:mt-0 max-w-fit xl:p-0">
          <div className="flex flex-col items-center justify-center border px-9 py-8 rounded-md">
            <form>
              <div className="flex flex-col">
                <h2 className="text-5xl text-center mb-8 mt-3">
                  <b>Login</b>
                </h2>
                <label for="email" className="block mb-1 text-md text-black">
                  Email:{" "}
                </label>
                <input
                  type="email"
                  id="email"
                  class="mb-5 bg-gray-50 border border-black text-black text-md focus:border-[#000088] focus:outline p-2.5 w-96"
                  placeholder="ex. john.smith@gmail.com"
                  required
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <label for="password" className="block mb-1 text-md text-black">
                  Password:{" "}
                </label>
                <input
                  type="password"
                  id="password"
                  class="mb-5 bg-gray-50 border border-black text-black text-md focus:border-[#000088] focus:outline p-2.5 w-96"
                  required
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
            </form>
            <Button className="mt-2 font-Montserrat text-2xl bg-[#000088] rounded-full w-96">
              LOGIN
            </Button>
          </div>
        </div>
        <p class="text-sm mt-3 font-light text-black-500 py-3">
          Don't have an Account?{" "}
          <a
            href="/signup"
            class="font-medium text-primary-600 hover:font-bold text-[#000088]"
          >
            Sign Up!
          </a>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;
