// EditProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { BsPersonCircle } from "react-icons/bs";

import Navbar from "../../components/header/Navbar";

function EditProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    role: "",
    institution: "",
    address: "",
  });

  useEffect(() => {
    // Fetch user details using the token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // If token does not exist, redirect to sign-in page
      navigate("/sign-in");
    } else {
      // Simulated user data - Replace this with actual API call
      const userData = {
        name: "John",
        surname: "Doe",
        email: "john@example.com",
        role: "student",
        institution: "University A",
        address: "123 Main St, City, Country",
      };
      setUser(userData);
      setFormData(userData); // Initialize form data with user details
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    // Logic to save edited profile
    // This is where you would send a request to your API to update the user profile
    e.preventDefault();
    console.log("Updated User Data:", formData);
    navigate("/user-profile"); // Redirect to user profile after saving
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col pb-12 pt-6 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-md sm:max-w-md flex flex-col items-center justify-center">
          <BsPersonCircle className="text-8xl ml-2 mb-3" />
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Edit Profile
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {/* Edit profile form */}
            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Surname
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="engineer">Engineer</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Institution
                </label>
                <select
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="University A">University A</option>
                  <option value="College B">College B</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-20"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
