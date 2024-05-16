import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const UserProfile = () => {
  const [user, setUser] = useState({
    fname: "John",
    lname: "Doe",
  });
  const [editMode, setEditMode] = useState(false);
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });
  const navigate = useNavigate();

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    // Reset password fields
    setPasswords({ oldPassword: "", newPassword: "" });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSave = () => {
    // Perform save operation
    console.log("User details saved:", user);
    console.log("Passwords:", passwords);
    setEditMode(false);
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
          <Button onClick={handleLogout} className="text-xl py-2 px-4 ml-4 bg-white text-teal-500 rounded-md cursor-pointer hover:bg-teal-200 transition duration-150">
            Log Out
          </Button>
        </div>
      </nav>
      <div className="flex min-h-screen bg-teal-500 items-center justify-center p-10">
        <div className="flex flex-wrap bg-white rounded-lg shadow-lg w-full max-w-1xl min-h-[100vh] p-8">
          <div className="w-full md:w-1/3 p-5"> {/* Image */}
            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" className="w-100 h-100 rectangle-full mx-auto md:mx-0 md:mr-6" />
          </div>
          <div className="w-full md:w-2/3 p-5"> {/* User Sec. */}
            <div className="flex justify-between mb-4">
              <h2 className="text-3xl font-bold">User Profile</h2>
              {!editMode && (
                <Button onClick={handleEdit} className="text-base py-2 px-4 bg-teal-500 text-white rounded-md cursor-pointer hover:bg-teal-600 transition duration-150">
                  Change Password
                </Button>
              )}
            </div>
            {!editMode ? (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-xl font-bold mb-2">First Name:</label>
                  <span>{user.fname}</span>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-xl font-bold mb-2">Last Name:</label>
                  <span>{user.lname}</span>
                </div>
              </div>
            ) : (
              <div>
              </div>
            )}
            {editMode && (
              <div className="mt-10">
                <h3 className="text-3xl font-bold mb-4">Change Password</h3>
                <div className="mb-5">
                  <label className="block text-gray-700 text-xl font-bold mb-5">Old Password:</label>
                  <input type="password" name="oldPassword" value={passwords.oldPassword} onChange={handlePasswordChange} className="border rounded-md p-2 w-full" />
                </div>
                <div className="mb-10">
                  <label className="block text-gray-700 text-xl font-bold mb-5">New Password:</label>
                  <input type="password" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} className="border rounded-md p-2 w-full" />
                </div>
              </div>
            )}
            {editMode && (
              <div className="flex justify-end mt-4">
                <Button onClick={handleCancel} className="text-base py-2 px-4 mr-2 bg-gray-300 text-gray-800 rounded-md cursor-pointer hover:bg-gray-400 transition duration-150">
                  Cancel
                </Button>
                <Button onClick={handleSave} className="text-base py-2 px-4 bg-teal-500 text-white rounded-md cursor-pointer hover:bg-teal-600 transition duration-150">
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