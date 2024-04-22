import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Navbar from "../../components/header/Navbar";
import Select from "react-select"; // Import react-select

import axios from "axios";

const CreateProject = () => {
  const navigate = useNavigate();
  const [tagList, setTagList] = useState([]);
  const [project, setProject] = useState({
    name: "",
    description: "",
    abstract: "",
    isPublic: true,
    emails: [],
    datasets: [],
    selectedTags: [],
  });

  useEffect(() => {
    fetchTagList();
  }, []);

  const fetchTagList = async () => {
    try {
      const response = await axios.get("http://localhost:3838/api/tag/get");
      if (response.status === 200) {
        const formattedTags = response.data.map((tag) => ({
          value: tag._id,
          label: tag.name,
        }));
        setTagList(formattedTags);
      }
    } catch (error) {
      console.error("Error fetching tag list:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProject({ ...project, [name]: checked });
  };

  const handleEmailsChange = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const newEmail = e.target.value.trim();
      setProject({ ...project, emails: [...project.emails, newEmail] });
      e.target.value = "";
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    setProject({
      ...project,
      emails: project.emails.filter((email) => email !== emailToRemove),
    });
  };

  const handleTagSelection = (selectedOptions) => {
    const selectedTags = selectedOptions.map((option) => option.value);
    setProject({ ...project, selectedTags });
  };

  const handleSubmit = async () => {
    try {
      let emails = Array.isArray(project.emails) ? project.emails : [];
      
      // Extract tag names from selected tags
      const selectedTags = project.selectedTags.map(tagId => {
        const tag = tagList.find(tag => tag.value === tagId);
        return tag ? tag.label : "";
      });
  
      let data = JSON.stringify({
        name: project.name,
        description: project.description,
        abstract: project.abstract,
        isPublic: project.isPublic,
        userEmails: emails,
        tags: selectedTags,
      });
  
      // console.log(localStorage.getItem("token"));
      // console.log(data);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3838/api/project/create",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: data,
      };
  
      const response = await axios.request(config);
      navigate(`/project/edit/${response.data.projectId._id}`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data.error);
      } else {
        console.log(error);
      }
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="h-screen">
        <h1 className="text-3xl font-semibold mb-6 text-center mt-5">
          Create New Project
        </h1>
        <form className="max-w-7xl mx-auto bg-white shadow-md rounded-lg border-2 p-6 mb-40">
          <div className="mb-4 font-bold">
            <label className="block mb-1">
              Name:
              <input
                type="text"
                name="name"
                value={project.name}
                onChange={handleChange}
                className="border border-gray-400 rounded-md p-2 w-full font-normal mt-1"
                placeholder="Enter project name"
              />
            </label>
          </div>
          <div className="mb-4 font-bold">
            <label className="block mb-1">
              Description:
              <textarea
                name="description"
                value={project.description}
                onChange={handleChange}
                className="border border-gray-400 rounded-md p-2 w-full font-normal mt-1"
                placeholder="Enter project description"
                rows="4"
              ></textarea>
            </label>
          </div>
          <div className="mb-4 font-bold">
            <label className="block mb-1">
              Abstract:
              <textarea
                name="abstract"
                value={project.abstract}
                onChange={handleChange}
                className="border border-gray-400 rounded-md p-2 w-full font-normal mt-1"
                placeholder="Enter project abstract"
                rows="4"
              ></textarea>
            </label>
          </div>
          <div className="mb-4 font-bold">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isPublic"
                checked={project.isPublic}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <span>Is Public</span>
            </label>
          </div>
          {!project.isPublic && (
            <div className="mb-4 font-bold">
              <label className="block mb-1">
                User Emails:
                <input
                  type="text"
                  name="emails"
                  onKeyDown={handleEmailsChange}
                  className="border border-gray-400 rounded-md p-2 w-full font-normal mt-1"
                  placeholder="Provide user email and press enter"
                />
              </label>
              <div className="flex flex-wrap mt-2">
                {project.emails.map((email, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 rounded-full py-1 px-3 mr-2 mb-2 flex items-center font-normal"
                  >
                    <span className="mr-1">{email}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveEmail(email)}
                      className="text-red-600 font-bold focus:outline-none"
                    >
                      <AiOutlineCloseCircle className="ml-1" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-4 font-bold ">
            <label className="block mb-2">Tags:</label>
            <Select
              isMulti
              options={tagList}
              value={tagList.filter(tag => project.selectedTags.includes(tag.value))}
              onChange={handleTagSelection}
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-green-700 text-white px-4 py-2 rounded-md my-4"
          >
            Create Project
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateProject;
