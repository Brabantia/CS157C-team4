import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const UserProfile = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [success, setSuccess] = useState();
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [invalidOldPassword, setInvalidOldPassword] = useState(false);
  const [tooShort, setTooShort] = useState(false);
  const [samePassword, setSamePassword] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const handleEdit = () => {
    setEditMode(true);
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

    fetch(`http://127.0.0.1:5000/get_user?userEmail=${emailFromCookie}`)
      .then((response) => response.json())
      .then((userInfo) => {
        console.log("User Data:", userInfo);
        if (userInfo) {
          setFirstName(userInfo.first_name);
          setLastName(userInfo.last_name);
        } else {
          console.error("User Data not found!");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleCancel = () => {
    setEditMode(false);
    setInvalidOldPassword(false);
    setSamePassword(false);
    setPasswords({ oldPassword: "", newPassword: "" });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSave = (event) => {
    event.preventDefault();
    setInvalidOldPassword(false);
    setSamePassword(false);
    setTooShort(false);

    if (passwords.newPassword.length != 8) {
      setTooShort(true);
      return;
    }

    const passwordInfo = {
      email: userEmail,
      password: passwords.oldPassword,
      new_password: passwords.newPassword,
    };
    console.log(passwordInfo);

    fetch("http://127.0.0.1:5000/update_password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passwordInfo),
    })
      .then((response) => response.json())
      .then((userUpdate) => {
        if (userUpdate.status === 200) {
          setSuccess(true);
          const timer = setTimeout(() => {
            navigate('/login');
          }, 5000);
        } else if (userUpdate.status === 201) {
          console.log(userUpdate.message);
        } else if (userUpdate.status === 202) {
          console.log(userUpdate.message);
          setInvalidOldPassword(true);
        } else if (userUpdate.status === 203) {
          console.log(userUpdate.message);
          setSamePassword(true);
        } else {
          console.log(userUpdate);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleLogout = () => {
    Cookies.remove("auth");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-teal-500">
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
      <div className="flex min-h-screen w-full bg-[#229EA3] items-center justify-center p-10">
        <div className="flex flex-col bg-white rounded-lg shadow-lg w-3/4 max-w-3xl min-h-[25vh] p-8">
          <div>
            <div className="text-center text-4xl mt-5">
              <b>User Profile</b>
              <div className="text-xl mt-10">
                <div className="mb-5">
                  <label className="font-bold">First Name: </label>
                  <span>{firstName}</span>
                </div>
                <div className="mb-5">
                  <label className="font-bold">Last Name: </label>
                  <span>{lastName}</span>
                </div>
                <div className="mb-10">
                  <label className="font-bold">Email: </label>
                  <span>{userEmail}</span>
                </div>
                {!editMode && (
                  <Button
                    style={{ "font-family": "Montserrat, sans-serif" }}
                    onClick={handleEdit}
                    className="text-base py-2 px-4 bg-teal-500 text-white rounded-md cursor-pointer hover:bg-teal-600 transition duration-150"
                  >
                    Change Password
                  </Button>
                )}
              </div>
            </div>

            {editMode && (
              <div className="mt-10">
                <h3 className="text-3xl font-bold mb-4">Change Password</h3>
                <div className="mb-5">
                  <label className="block text-xl font-bold mb-5">
                    Old Password:
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={passwords.oldPassword}
                    onChange={handlePasswordChange}
                    className="border rounded-md p-2 w-full"
                  />
                </div>
                <div className="mb-10">
                  <label className="block text-xl font-bold mb-5">
                    New Password:
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    className="border rounded-md p-2 w-full"
                  />
                </div>
              </div>
            )}
            {invalidOldPassword && (
              <div
                className="flex items-center p-4 text-red-700 bg-red-100 rounded-md"
                role="alert"
              >
                <span className="text-md">
                  <b>Your Password is Incorrect - Please Try Again!</b>
                </span>
              </div>
            )}
            {samePassword && (
              <div
                className="flex items-center p-4 text-red-700 bg-red-100 rounded-md"
                role="alert"
              >
                <span className="text-md">
                  <b>Error - New Password Must Be Different!</b>
                </span>
              </div>
            )}
            {tooShort && (
              <div
                className="flex items-center p-4 text-red-700 bg-red-100 rounded-md"
                role="alert"
              >
                <span className="text-md">
                  <b>Error - New Password Must Be At Least 8 Characters!</b>
                </span>
              </div>
            )}
            {success && (
              <div
                className="flex items-center p-4 text-green-700 bg-green-100 rounded-md"
                role="alert"
              >
                <span className="text-md">
                  <b>Success - Rerouting you to Login Page!</b>
                </span>
              </div>
            )}
            {editMode && (
              <div className="flex justify-end mt-4">
                <Button
                  onClick={handleCancel}
                  style={{ "font-family": "Montserrat, sans-serif" }}
                  className="text-base py-2 px-4 mr-2 bg-gray-300 text-gray-800 rounded-md cursor-pointer hover:bg-gray-400 transition duration-150"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  style={{ "font-family": "Montserrat, sans-serif" }}
                  className="text-base py-2 px-4 bg-teal-500 text-white rounded-md cursor-pointer hover:bg-teal-600 transition duration-150"
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
