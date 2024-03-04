import React, { useState } from "react";

const NewProjectForm = () => {
  const [project, setProject] = useState({
    name: "",
    description: "",
    abstract: "",
    isPublic: false,
    tags: [],
    owner: "Yusuf Aslan",
    datasets: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProject({ ...project, [name]: checked });
  };

  const handleTagChange = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const newTag = e.target.value.trim();
      setProject({ ...project, tags: [...project.tags, newTag] });
      e.target.value = ""; // Clear the input field after adding the tag
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setProject({
      ...project,
      tags: project.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleDatasetChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDatasets = [...project.datasets];
    updatedDatasets[index] = { ...updatedDatasets[index], [name]: value };
    setProject({ ...project, datasets: updatedDatasets });
  };

  const handleFileUpload = (e, index) => {
    const file = e.target.files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (fileExtension === "json" || fileExtension === "csv") {
      // Read file content
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        let columnNames = [];

        if (fileExtension === "json") {
          // If JSON, assume array of objects and read keys of the first object
          const jsonArray = JSON.parse(content);
          if (jsonArray.length > 0) {
            columnNames = Object.keys(jsonArray[0]);
          }
        } else if (fileExtension === "csv") {
          // If CSV, assume first row contains column headers
          const csvArray = content.split("\n");
          if (csvArray.length > 0) {
            columnNames = csvArray[0].split(",");
          }
        }

        // Update datasets with column names
        const updatedDatasets = [...project.datasets];
        updatedDatasets[index] = {
          ...updatedDatasets[index],
          file: file,
          extension: fileExtension,
          columnNames: columnNames,
          columnActions: Array(columnNames.length).fill(null), // Initialize actions for each column
        };
        setProject({ ...project, datasets: updatedDatasets });
      };

      // Read file as text
      reader.readAsText(file);
    } else {
      alert("Please upload a JSON or CSV file.");
    }
  };

  const handleColumnActionChange = (e, datasetIndex, columnIndex) => {
    const { value } = e.target;
    const updatedDatasets = [...project.datasets];
    updatedDatasets[datasetIndex].columnActions[columnIndex] = value;
    setProject({ ...project, datasets: updatedDatasets });
  };

  const handleAddDataset = () => {
    setProject({
      ...project,
      datasets: [
        ...project.datasets,
        { name: "", description: "", file: null },
      ],
    });
  };

  const handleSubmit = () => {
    // Send project data to backend
    console.log(project);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4 text-center">
        Create New Project
      </h1>
      <form className="max-w-2xl mx-auto border-2 p-5 rounded-md border-gray-400">
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
        <div className="mb-4">
          <label className="block mb-1">
            Tags:
            <input
              type="text"
              name="tags"
              onKeyDown={handleTagChange}
              className="border border-gray-400 rounded-md p-2 w-full"
              placeholder="Enter tags and press Enter"
            />
          </label>
          <div className="flex flex-wrap mt-2">
            {project.tags.map((tag, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded-full py-1 px-3 mr-2 mb-2 flex items-center"
              >
                <span className="mr-1">{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-red-600 font-bold focus:outline-none"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        {project.datasets.map((dataset, index) => (
          <div
            key={index}
            className="border border-gray-400 p-4 my-4 rounded-md"
          >
            <h2 className="text-lg font-bold mb-2">Dataset {index + 1}</h2>
            {/* Name input */}
            <div className="mb-2">
              <label className="block mb-1">
                Name:
                <input
                  type="text"
                  name="name"
                  value={dataset.name}
                  onChange={(e) => handleDatasetChange(e, index)}
                  className="border border-gray-400 rounded-md p-2 w-full"
                  placeholder="Enter dataset name"
                />
              </label>
            </div>
            {/* File upload */}
            <div className="mb-2">
              <label className="block mb-1">
                File:
                <input
                  type="file"
                  accept=".json, .csv"
                  onChange={(e) => handleFileUpload(e, index)}
                  className="border border-gray-400 rounded-md p-2 w-full"
                />
              </label>
            </div>
            {/* Display file extension */}
            {dataset.file && (
              <p className="mb-2">
                File Extension:{" "}
                {dataset.file.name.split(".").pop().toLowerCase()}
              </p>
            )}
            {/* Display column names and actions */}
            {dataset.columnNames && (
              <div className="mb-2">
                <h3 className="font-semibold">Column Actions:</h3>
                {dataset.columnNames.map((columnName, columnIndex) => (
                  <div key={columnIndex} className="flex items-center mt-1">
                    <label className="mr-2">{columnName}</label>
                    <select
                      value={dataset.columnActions[columnIndex] || ""}
                      onChange={(e) =>
                        handleColumnActionChange(e, index, columnIndex)
                      }
                      className="border border-gray-400 rounded-md p-1"
                    >
                      <option value="">No Action</option>
                      <option value="remove">Remove</option>
                      <option value="encrypt">Encrypt</option>
                    </select>
                  </div>
                ))}
              </div>
            )}
            {/* Description textarea */}
            <div>
              <label className="block mb-1">
                Description:
                <textarea
                  name="description"
                  value={dataset.description}
                  onChange={(e) => handleDatasetChange(e, index)}
                  className="border border-gray-400 rounded-md p-2 w-full"
                  placeholder="Enter dataset description"
                  rows="3"
                ></textarea>
              </label>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddDataset}
          className="bg-blue-500 text-white px-4 py-2 rounded-md my-4 mr-4"
        >
          Add Dataset
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded-md my-4"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default NewProjectForm;