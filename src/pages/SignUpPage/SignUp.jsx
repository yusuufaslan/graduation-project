import React, { useState } from "react";
import { Link } from "react-router-dom";

import ViteLogo from "../../../public/vite.svg";

function SignUp() {
  const roleOptions = [
    { value: "", label: "Select" },
    { value: "student", label: "Student" },
    { value: "teacher", label: "Teacher" },
    { value: "engineer", label: "Engineer" },
    { value: "doctor", label: "Doctor" },
    { value: "nurse", label: "Nurse" },
    { value: "pharmacist", label: "Pharmacist" },
    // Add more options as needed
  ];

  const institutionOptions = [
    { value: "", label: "Select" },
    { value: "University A", label: "University A" },
    { value: "College B", label: "College B" },
    { value: "Hospital C", label: "Hospital C" },
    { value: "Company D", label: "Company D" },
    // Add more options as needed
  ];

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    institution: "",
    address: "",
  });
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordsMatchMessage, setPasswordsMatchMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "email") {
      setInvalidEmail(false);
    }

    if (name === "password") {
      const match = formData.confirmPassword === value;
      setPasswordsMatch(match);
      setPasswordsMatchMessage(
        match ? "Passwords match" : "Passwords do not match"
      );
    }

    if (name === "confirmPassword") {
      const match = formData.password === value;
      setPasswordsMatch(match);
      setPasswordsMatchMessage(
        match ? "Passwords match" : "Passwords do not match"
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setInvalidEmail(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      setPasswordsMatchMessage("Passwords do not match");
      return;
    }

    console.log("Form Data:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-md sm:max-w-md flex flex-col items-center justify-center">
        <img src={ViteLogo} className="h-20 w-20 mb-5" alt="Vite Logo" />
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Sign up for a new account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex gap-x-5">
              <div className="flex-grow">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="mt-1 pl-3 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  style={{ height: "2rem" }}
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-grow">
                <label
                  htmlFor="surname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Surname
                </label>
                <input
                  id="surname"
                  name="surname"
                  type="text"
                  autoComplete="surname"
                  required
                  className="mt-1 pl-3 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  style={{ height: "2rem" }}
                  value={formData.surname}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`mt-1 pl-3 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                  invalidEmail ? "border-red-500" : ""
                }`}
                style={{ height: "2rem" }}
                value={formData.email}
                onChange={handleChange}
              />
              {invalidEmail && (
                <p className="mt-2 text-sm text-red-500">
                  Invalid email format
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 pl-3 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                style={{ height: "2rem" }}
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className={`mt-1 pl-3 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                  !passwordsMatch ? "border-red-500" : ""
                }`}
                style={{ height: "2rem" }}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {passwordsMatchMessage && (
                <p
                  className={`mt-2 text-sm ${
                    passwordsMatch && formData.password
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {passwordsMatchMessage}
                </p>
              )}
            </div>

            <div className="flex gap-x-5">
              <div className="flex-grow">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  autoComplete="role"
                  required
                  className="mt-1 pl-3 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  style={{ height: "2rem" }}
                  value={formData.role}
                  onChange={handleChange}
                >
                  {roleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-grow">
                <label
                  htmlFor="institution"
                  className="block text-sm font-medium text-gray-700"
                >
                  Institution
                </label>
                <select
                  id="institution"
                  name="institution"
                  autoComplete="institution"
                  required
                  className="mt-1 pl-3 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  style={{ height: "2rem" }}
                  value={formData.institution}
                  onChange={handleChange}
                >
                  {institutionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                autoComplete="address"
                required
                className="mt-1 pl-3 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                style={{ minHeight: "6rem" }} // Set minHeight as needed
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Already a member? Sign in */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already a member?{" "}
              <Link
                to="/sign-in"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
