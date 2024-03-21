// Welcome.js
import React, {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import WelcomeNavbar from "../../components/header/WelcomeNavbar";

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
        <div className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Welcome to Our Website!
            </h2>
            <p className="mt-4 text-lg text-gray-500">
                We're excited to have you here. Feel free to explore and learn
                more about what we offer.
            </p>
            </div>
        </div>
        </div>
    </div>
    );
}
