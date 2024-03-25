import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import ViteLogo from "../../../public/vite.svg";

function Verification() {
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [emailDisabled, setEmailDisabled] = useState(false); // Add emailDisabled state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch email from local storage and set it if available
    const storedEmail = localStorage.getItem("verifiedEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      setEmailDisabled(true); // Disable email input if email is fetched from local storage
    }
  }, []);

  const handleVerification = async (e) => {
    e.preventDefault();
    if (!emailValid) return;

    try {
      const response = await axios.post(
        "http://localhost:3838/api/user/verify-user",
        {
          email: email,
          verificationCode: verificationCode,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.message === "User verified successfully") {
        // Clear verification email from localStorage
        localStorage.removeItem("verifiedEmail");
        toast.success("User verified successfully");
        navigate("/sign-in");
      } else {
        toast.error("Verification failed");
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      toast.error("Failed to verify user");
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(newEmail));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-md sm:max-w-md flex flex-col items-center justify-center">
        <img src={ViteLogo} className="h-20 w-20 mb-5" alt="Vite Logo" />
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Verify Your Email
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleVerification}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                disabled={emailDisabled} // Use emailDisabled state to control the disabled attribute
                className={`mt-1 pl-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 ${
                  emailDisabled ? "bg-gray-200" : "" // Add background color if email is disabled
                } ${
                  !emailValid ? "border-red-500" : "" // Add border color if email is not valid
                }`}
                value={email}
                onChange={handleEmailChange}
              />
              {!emailValid && (
                <p className="mt-1 pl-3 text-sm text-red-500">
                  Please enter a valid email address
                </p>
              )}
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <input
                type="text"
                name="verificationCode"
                required
                className="mt-1 pl-3 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 border border-gray-300"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Verification;
