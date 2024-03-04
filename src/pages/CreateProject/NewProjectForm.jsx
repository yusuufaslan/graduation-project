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
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvData = event.target.result;
        const lines = csvData.split(/\r\n|\n/);
        const columns = lines[0].split(","); // Assuming first row contains column names
        const updatedDatasets = [...project.datasets];
        updatedDatasets[index] = {
          ...updatedDatasets[index],
          file: file,
          extension: fileExtension,
          columns: columns, // Store column names in the dataset object
          selectedColumns: [], // Initialize selectedColumns array
        };
        setProject({ ...project, datasets: updatedDatasets });
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a JSON or CSV file.");
    }
  };

  const handleColumnSelection = (index, selectedColumns) => {
    const updatedDatasets = [...project.datasets];
    updatedDatasets[index] = {
      ...updatedDatasets[index],
      selectedColumns: selectedColumns,
    };
    setProject({ ...project, datasets: updatedDatasets });
  };

  const handleAddDataset = () => {
    setProject({
      ...project,
      datasets: [
        ...project.datasets,
        {
          name: "",
          description: "",
          file: null,
          columns: [],
          selectedColumns: [],
        },
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
            {/* Column selection */}
            <div className="mb-4">
              <label className="block mb-1">
                Select Columns:
                <select
                  multiple
                  value={dataset.selectedColumns}
                  onChange={(e) =>
                    handleColumnSelection(
                      index,
                      Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      )
                    )
                  }
                  className="border border-gray-400 rounded-md p-2 w-full"
                >
                  {dataset.columns.map((column, columnIndex) => (
                    <option key={columnIndex} value={column}>
                      {column}
                    </option>
                  ))}
                </select>
              </label>
            </div>
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
