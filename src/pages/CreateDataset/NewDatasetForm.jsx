// NewDatasetForm.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const NewDatasetForm = () => {
  const { projectId } = useParams();

  const [dataset, setDataset] = useState({
    projectId: projectId,
    name: "",
    description: "",
    file: null,
    columns: [], // Adding columns array to store column information
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataset({ ...dataset, [name]: value.trim() }); // Trim the value before setting
  };
  
  const handleFileUpload = (e) => {
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

        // Update dataset with column names
        setDataset({
          ...dataset,
          file,
          columns: columnNames.map((columnName) => ({
            name: columnName,
            action: "", // Initialize action for each column
          })),
        });
      };

      // Read file as text
      reader.readAsText(file);
    } else {
      alert("Please upload a JSON or CSV file.");
    }
  };

  const handleColumnActionChange = (e, columnIndex) => {
    const { value } = e.target;
    const updatedColumns = [...dataset.columns];
    updatedColumns[columnIndex].action = value;
    setDataset({ ...dataset, columns: updatedColumns });
  };

  const handleSubmit = () => {
    // Handle dataset submission here
    console.log("Dataset submitted:", dataset);
  };

  return (
    <div className="container mx-auto overflow-x-hidden">
      <h1 className="text-2xl font-bold my-4 text-center">
        Create New Dataset for Project {projectId}
      </h1>
      <form className="max-w-2xl mx-auto border-2 p-5 rounded-md border-gray-400">
        <div className="mb-4">
          <label className="block mb-1">
            Name:
            <input
              type="text"
              name="name"
              value={dataset.name}
              onChange={handleChange}
              className="border border-gray-400 rounded-md p-2 w-full"
              placeholder="Enter dataset name"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-1">
            Description:
            <textarea
              name="description"
              value={dataset.description}
              onChange={handleChange}
              className="border border-gray-400 rounded-md p-2 w-full"
              placeholder="Enter dataset description"
              rows="4"
            ></textarea>
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-1">
            File:
            <input
              type="file"
              accept=".json, .csv"
              onChange={handleFileUpload}
              className="border border-gray-400 rounded-md p-2 w-full"
            />
          </label>
        </div>
        {/* Display columns and select column actions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3">
          {dataset.columns.map((column, columnIndex) => (
            <div key={columnIndex} className="mb-4 text-center">
              <label className="block mb-1">{column.name}</label>
              <select
                value={column.action || ""}
                onChange={(e) => handleColumnActionChange(e, columnIndex)}
                className="border border-gray-400 rounded-md p-1 w-full"
              >
                <option value="">No Action</option>
                <option value="remove">Remove</option>
                <option value="encrypt">Encrypt</option>
                {/* Add more actions as needed */}
              </select>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded-md my-4"
        >
          Submit Dataset
        </button>
      </form>
    </div>
  );
};

export default NewDatasetForm;
