import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";

const tagList = [
  { id: 1, name: "Tag 1" },
  { id: 2, name: "Tag 2" },
  { id: 3, name: "Tag 3" },
];

const EditProjectForm = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [project, setProject] = useState({
    id: projectId,
    name: "",
    description: "",
    abstract: "",
    isPublic: true,
    emails: [],
    owner: "Yusuf Aslan",
    datasets: [],
    selectedTags: [],
  });

  useEffect(() => {
    // Fetch project data from backend using projectId
    // For demonstration, setting some dummy data
    setProject({
      id: projectId,
      name: "Sample Project",
      description: "This is a sample project description",
      abstract: "Abstract for the sample project",
      isPublic: true,
      emails: ["test1@example.com", "test2@example.com"],
      owner: "Yusuf Aslan",
      datasets: [
        {
          id: 456,
          projectId: projectId,
          name: "Example Dataset",
          description: "Example Dataset Description",
          file: {},
          fileType: "csv",
          columns: [
            { name: "name", action: "" },
            { name: "surname", action: "" },
            { name: "identity", action: "" },
            { name: "datavalue", action: "" },
            { name: "isTrue", action: "" },
          ],
        },
      ], // Dummy datasets, you may fetch them from the backend
      selectedTags: [1, 2], // Sample selected tags
    });
  }, [projectId]);

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

  const handleTagSelection = (tagId) => {
    const selectedTags = [...project.selectedTags];
    if (selectedTags.includes(tagId)) {
      const updatedTags = selectedTags.filter((id) => id !== tagId);
      setProject({ ...project, selectedTags: updatedTags });
    } else {
      setProject({ ...project, selectedTags: [...selectedTags, tagId] });
    }
  };

  const handleAddDataset = () => {
    // Navigate to the new dataset creation page with project ID as a parameter
    navigate(`/create-dataset/${project.id}`);
  };

  const handleRemoveDataset = (datasetId) => {
    // Remove dataset from project datasets
    const updatedDatasets = project.datasets.filter(
      (dataset) => dataset.id !== datasetId
    );
    setProject({ ...project, datasets: updatedDatasets });
  };

  const handleSubmit = () => {
    // Handle updating project data here (e.g., make a request to update project data on the backend)
    console.log("Updated Project:", project);
  };

  return (
    <div className="container mx-auto overflow-x-hidden">
      <h1 className="text-2xl font-bold my-4 text-center">
        Edit Project {projectId}
      </h1>
      <form className="max-w-4xl mx-auto border-2 p-5 rounded-md ">
        <div className="mb-4">
          <label className="block mb-1">
            Name:
            <input
              type="text"
              name="name"
              value={project.name}
              onChange={handleChange}
              className="border border-gray-400 rounded-md p-2 w-full"
              placeholder="Enter project name"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-1">
            Description:
            <textarea
              name="description"
              value={project.description}
              onChange={handleChange}
              className="border border-gray-400 rounded-md p-2 w-full"
              placeholder="Enter project description"
              rows="4"
            ></textarea>
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-1">
            Abstract:
            <textarea
              name="abstract"
              value={project.abstract}
              onChange={handleChange}
              className="border border-gray-400 rounded-md p-2 w-full"
              placeholder="Enter project abstract"
              rows="4"
            ></textarea>
          </label>
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
        {!project.isPublic && (
          <div className="mb-4">
            <label className="block mb-1">
              User Emails:
              <input
                type="text"
                name="emails"
                onKeyDown={handleEmailsChange}
                className="border border-gray-400 rounded-md p-2 w-full"
                placeholder="Provide user email and press enter"
              />
            </label>
            <div className="flex flex-wrap mt-2">
              {project.emails.map((email, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-full py-1 px-3 mr-2 mb-2 flex items-center"
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

        {/* Display list of tags */}
        <div className="mb-4">
          <label className="block mb-1">Tags:</label>
          <div className="flex flex-wrap">
            {tagList.map((tag) => (
              <div
                key={tag.id}
                className={`rounded-full py-1 px-3 mr-2 mb-2 flex items-center cursor-pointer border border-gray-400 ${
                  project.selectedTags.includes(tag.id)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleTagSelection(tag.id)}
              >
                <span className="mr-1">{tag.name}</span>
                {project.selectedTags.includes(tag.id) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 4.293a1 1 0 0 1 1.414 1.414l-11 11a1 1 0 0 1-1.414 0l-7-7a1 1 0 1 1 1.414-1.414L6 13.586l10.293-10.293a1 1 0 0 1 1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Display datasets */}
        <div className="max-w-4xl mx-auto mt-8">
          <h2 className="text-xl font-semibold mb-4">Datasets:</h2>
          {project.datasets.map((dataset) => (
            <div
              key={dataset.id} // Assigning dataset id as key
              className="border border-gray-300 p-4 mb-4 rounded-md"
            >
              <h3 className="text-lg font-semibold mb-2">{dataset.name}</h3>
              <p className="text-gray-600 mb-2">{dataset.description}</p>
              {/* Add more dataset information as needed */}
              <button
                type="button"
                onClick={() => handleRemoveDataset(dataset.id)}
                className="text-red-600 font-bold focus:outline-none"
              >
                Remove Dataset
              </button>
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

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded-md my-4"
        >
          Update Project
        </button>
      </form>
    </div>
  );
};

export default EditProjectForm;
