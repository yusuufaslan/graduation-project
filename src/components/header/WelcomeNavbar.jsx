// WelcomeNavbar.jsx
import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import ViteLogo from "../../../public/vite.svg";

export default function WelcomeNavbar() {
  return (
    <div className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0 items-center">
            <img className="h-8 w-auto" src={ViteLogo} alt="Your Company" />
          </div>
          <div>
            <Link
              to="/sign-in"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
