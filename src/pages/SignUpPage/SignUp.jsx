import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ViteLogo from "../../../public/vite.svg";

import { toast } from "react-toastify";

const roleOptions = [
  { value: "", label: "Select" },
  { value: "student", label: "Student" },
  { value: "teacher", label: "Academician" },
  { value: "teacher", label: "Researcher" },
  { value: "engineer", label: "Engineer" },
  { value: "doctor", label: "Doctor" },
  { value: "nurse", label: "Nurse" },
  { value: "pharmacist", label: "Pharmacist" },
  // Add more options as needed
];

function SignUp() {
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
  const [institutionOptions, setInstitutionOptions] = useState([]);

  const roleSelectRef = useRef(null);
  const institutionSelectRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch institution data from backend
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    try {
      const response = await fetch("http://localhost:3838/api/institution/get");
      if (response.ok) {
        const data = await response.json();
        setInstitutionOptions(data);
      } else {
        throw new Error("Failed to fetch institutions");
      }
    } catch (error) {
      console.error("Error fetching institutions:", error);
      // Handle error or display a message to the user
    }
  };

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

  const handleKeyDown = (e, selectRef) => {
    const key = e.key.toLowerCase();
    const options = selectRef.current.options;
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (option.text.toLowerCase().startsWith(key)) {
        option.selected = true;
        selectRef.current.scrollTop = option.offsetTop;
        break;
      }
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
    toast.success(
      "Welcome! We've sent you an email with a verification link. Please verify your email to complete the signup process."
    );
    navigate("/sign-in");
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  className="mt-1 pl-3 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10"
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
                  name="surname"
                  autoComplete="surname"
                  required
                  className="mt-1 pl-3 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10"
                  value={formData.surname}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                className={`mt-1 pl-3 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 ${
                  invalidEmail ? "border-red-500" : ""
                }`}
                value={formData.email}
                onChange={handleChange}
              />
              {invalidEmail && (
                <p className="mt-2 pl-3 text-sm text-red-500">
                  Invalid email format
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                required
                className="mt-1 pl-3 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                required
                className={`mt-1 pl-3 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 ${
                  !passwordsMatch ? "border-red-500" : ""
                }`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {passwordsMatchMessage && (
                <p
                  className={`mt-2 pl-3 text-sm ${
                    passwordsMatch && formData.password
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {passwordsMatchMessage}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  ref={roleSelectRef}
                  name="role"
                  autoComplete="role"
                  required
                  className="mt-1 pl-3 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10"
                  value={formData.role}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, roleSelectRef)}
                >
                  {roleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Institution
                </label>
                <select
                  ref={institutionSelectRef}
                  name="institution"
                  autoComplete="institution"
                  required
                  className="mt-1 pl-3 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10"
                  value={formData.institution}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, institutionSelectRef)}
                >
                  <option value="">Select</option>
                  {institutionOptions.map((option) => (
                    <option key={option._id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                name="address"
                autoComplete="address"
                required
                className="mt-2 p-2 pl-3 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10"
                style={{ minHeight: "6rem" }}
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
