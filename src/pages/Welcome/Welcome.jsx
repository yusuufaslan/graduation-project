// Welcome.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeNavbar from "../../components/header/WelcomeNavbar";
import ContactForm from "../../components/ContactForm/ContactForm"; // Assuming you have a ContactForm component

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
      
      {/* Hero Section */}
      <section className="relative isolate px-6 pt-14 lg:px-8">
        {/* Background shape */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
        </div>
        {/* Content */}
        <div className="mx-auto max-w-7xl py-32 sm:py-48 lg:py-56 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Revolutionizing Medical Collaboration</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">In response to the growing demand for innovative healthcare solutions, our project endeavors to develop a comprehensive web-based platform, poised to redefine the landscape of medical collaboration.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a href="/sign-in" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign In</a>
            <a href="#about" className="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl py-12 sm:py-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">About Our Project</h2>
            <div className="text-lg leading-7 text-gray-800">
              <p>Your project summary goes here...</p>
              {/* Add more content as needed */}
            </div>
          </div>
        </div>
      </section>

      {/* Sign In to Use All Features Section */}
      <section className="py-20 bg-gray-200">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl py-12 sm:py-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Sign In to Use All Features</h2>
            <div className="text-lg leading-7 text-gray-800">
              <p>To access all features of our platform, please sign in to your account.</p>
              {/* Sign-in button can be added here */}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl py-12 sm:py-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Contact Us</h2>
            <div className="text-lg leading-7 text-gray-800">
              <p className="mb-8">Have questions or feedback? Reach out to us using the form below.</p>
              <ContactForm /> {/* Assuming you have a ContactForm component */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
