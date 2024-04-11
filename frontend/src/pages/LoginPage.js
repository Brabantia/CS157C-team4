import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [emailExists, setEmailExists] = useState(true);
  const [wrongCredentials, setwrongCredentials] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
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
          navigate("/home");
        } else if (userAccount.status == 201) {
          console.log(userAccount.message);
          setEmailExists(false);
        } else if (userAccount.status == 202) {
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
            {!emailExists && (
              <div
                className="flex items-center p-4 mb-3 text-red-900 rounded-lg bg-red-100 w-96"
                role="alert"
              >
                <div className="text-md">
                  <b>Login Failed - Email doesn't Exist!</b>
                </div>
              </div>
            )}
            {wrongCredentials && (
              <div
                className="flex items-center p-4 mb-3 text-red-900 rounded-lg bg-red-100 w-96"
                role="alert"
              >
                <div className="text-md">
                  <b>Login Failed - Invalid Password!</b>
                </div>
              </div>
            )}
            <Button className="mt-2 font-Montserrat text-2xl bg-[#000088] rounded-full w-96" onClick={handleSubmit}>
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
