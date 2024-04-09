import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import Navbar from "../../components/header/Navbar";
import Select from "react-select";

const EditProjectForm = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [tagList, setTagList] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // If token does not exist, redirect to sign-in page
          navigate("/sign-in");
        } else {
          // Fetch project detail
          const response = await axios.post(
            "http://localhost:3838/api/project/detail",
            { projectId },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = response.data;
          setProject(data.project);

          // Fetch tag list
          const tagResponse = await axios.get("http://localhost:3838/api/tag/get");
          if (tagResponse.status === 200) {
            const formattedTags = tagResponse.data.map((tag) => ({
              value: tag._id,
              label: tag.name,
            }));
            setTagList(formattedTags);
          }

          // Fetch user data
          const userResponse = await axios.get("http://localhost:3838/api/user/detail", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userData = userResponse.data.user;
          setUser(userData);

          // Set selected tags based on project's tagIds
          setSelectedTags(data.project.tagIds); // Update selectedTags state
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchData();
  }, [projectId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProject({ ...project, [name]: checked });
  };

  const handleTagSelection = (selectedOptions) => {
    const selectedTags = selectedOptions.map((option) => option.value);
    setSelectedTags(selectedTags);

    // Update project's tagIds in the project state
    setProject((prevProject) => ({
      ...prevProject,
      tagIds: selectedTags,
    }));
  };

  const handleAddDataset = () => {
    // Navigate to the new dataset creation page with project ID as a parameter
    navigate(`/dataset/create/${projectId}`);
  };

  const handleRemoveDataset = (datasetId) => {
    if (!project || !project.datasetIds) {
      // Project or project datasets are not properly set
      console.error('Project or project datasets are not properly set.');
      return;
    }

    // Remove dataset from project datasets
    const updatedDatasets = project.datasetIds.filter(
      (dataset) => dataset._id !== datasetId
    );
    setProject({ ...project, datasetIds: updatedDatasets });
  };

  const handleDownloadDataset = (datasetId) => {
    // Placeholder function for handling dataset download
    console.log("Downloading dataset with ID:", datasetId);
  };

  const handleSubmit = async () => {
    console.log(project);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3838/api/project/update",
        project,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Project updated successfully:", response.data);
      // Optionally, you can redirect the user to the project detail page
      navigate(`/project/detail/${projectId}`);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Edit Project - {project._id}
        </h1>
        <form className="max-w-7xl mx-auto bg-white shadow-md rounded-lg border-2 p-6">
          {/* Project Information */}
          <div className="mb-4">
            <label className="block font-bold mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={project.name}
              onChange={handleChange}
              className="border border-gray-400 rounded-md p-2 w-full font-normal mt-1"
              placeholder="Enter project name"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Description:</label>
            <textarea
              name="description"
              value={project.description}
              onChange={handleChange}
              className="border border-gray-400 rounded-md p-2 w-full font-normal mt-1"
              placeholder="Enter project description"
              rows="4"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Abstract:</label>
            <textarea
              name="abstract"
              value={project.abstract}
              onChange={handleChange}
              className="border border-gray-400 rounded-md p-2 w-full font-normal mt-1"
              placeholder="Enter project abstract"
              rows="4"
            ></textarea>
          </div>
          <div className="mb-4">
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
          {/* Tags */}
          <div className="mb-4 font-bold">
            <label className="block mb-2">Tags:</label>
            <Select
              isMulti
              options={tagList}
              value={tagList.filter(tag => selectedTags.includes(tag.value))}
              onChange={handleTagSelection}
            />
          </div>

          {/* Datasets */}
          <div className="max-w-7xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Datasets</h2>
            {project.datasetIds.map((dataset) => (
              <div
                key={dataset._id}
                className="border border-gray-300 p-4 mb-4 rounded-md"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-2">{dataset.name}</h3>
                  <p className="text-gray-600 mb-2">{dataset.description}</p>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveDataset(dataset._id)}
                    className="text-red-600 font-bold focus:outline-none"
                  >
                    Remove Dataset
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadDataset(dataset._id)}
                    className="text-green-600 font-bold focus:outline-none"
                  >
                    Download Dataset
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddDataset}
              className="bg-blue-500 text-white px-4 py-2 rounded-md my-4"
            >
              Add Dataset
            </button>
          </div>
          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-md my-4"
          >
            Update Project
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProjectForm;
