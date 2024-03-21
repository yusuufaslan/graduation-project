// ContactForm.js
import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic here to handle form submission (e.g., send email)
    console.log("Form submitted:", formData);
    // Reset form fields
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-lg mb-2" htmlFor="name">Name:</label>
        <input
          className="w-full px-4 py-2 border rounded-md"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2" htmlFor="email">Email:</label>
        <input
          className="w-full px-4 py-2 border rounded-md"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2" htmlFor="message">Message:</label>
        <textarea
          className="w-full px-4 py-2 border rounded-md"
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
