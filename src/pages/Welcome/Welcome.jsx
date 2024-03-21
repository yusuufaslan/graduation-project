// Welcome.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeNavbar from "../../components/header/WelcomeNavbar";
import HomeContent from "./HomeContent";

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Redirect user to home page if signed in
    if (token) {
      navigate("/home");
    }
  }, []);

  return (
    <div>
        <WelcomeNavbar />
        <HomeContent />
    </div>
  );
}
