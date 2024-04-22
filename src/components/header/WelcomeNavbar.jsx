// WelcomeNavbar.js

import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import ViteLogo from "../../../public/vite.svg";

export default function WelcomeNavbar({signedIn}) {
  return (
    <div className="bg-gray-800 relative z-10"> {/* Add relative and z-10 classes */}
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0 items-center">
            <img className="h-8 w-auto" src={ViteLogo} alt="Your Company" />
          </div>
          <div>
            {!signedIn && (
              <a
              href="/sign-in"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
              Sign In
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
