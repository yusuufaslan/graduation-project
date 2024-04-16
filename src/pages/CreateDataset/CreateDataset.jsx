import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/header/Navbar";

import axios from "axios";

const CreateDataset = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // console.log(localStorage.getItem("token"));

  const [dataset, setDataset] = useState({
    projectId: projectId,
    name: "",
    description: "",
    file: null,
    extension: "", // Include extension to store the file extension name
    columnNames: [],
    columnActions: [], // Adding column actions array to store column actions
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataset({ ...dataset, [name]: value });
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
        let columnActions = [];

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

        // Initialize column actions with empty strings
        columnActions = new Array(columnNames.length).fill("none");

        // Update dataset with column names, actions, and extension
        setDataset({
          ...dataset,
          file,
          extension: fileExtension, // Store the file extension
          columnNames: columnNames,
          columnActions: columnActions,
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
    const updatedColumnActions = [...dataset.columnActions];
    updatedColumnActions[columnIndex] = value;
    setDataset({ ...dataset, columnActions: updatedColumnActions });
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('file', dataset.file);
    formData.append('name', dataset.name);
    formData.append('projectId', dataset.projectId);
    formData.append('columnNames', dataset.columnNames.join(','));
    formData.append('columnActions', dataset.columnActions.join(','));
    formData.append('description', dataset.description);

    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });

    // console.log(dataset.file);

    axios.post('http://localhost:3838/api/project/add-dataset', formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      console.log("Dataset submitted:", response.data);
      navigate(`/project/edit/${dataset.projectId}`);
    })
    .catch((error) => {
      console.error("Error submitting dataset:", error);
      // Handle error
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 h-screen">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Create New Dataset for Project {projectId}
        </h1>
        <form className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border-2 p-6">
          <p className="text-2xl font-bold mb-4">Dataset Information</p>
          <div className="mb-4 font-bold">
            <label className="block mb-1">
              Name:
              <input
                type="text"
                name="name"
                value={dataset.name}
                onChange={handleChange}
                className="border border-gray-400 rounded-md p-2 w-full font-normal mt-1"
                placeholder="Enter dataset name"
              />
            </label>
          </div>
          <div className="mb-4 font-bold">
            <label className="block mb-1">
              Description:
              <textarea
                name="description"
                value={dataset.description}
                onChange={handleChange}
                className="border border-gray-400 rounded-md p-2 w-full font-normal mt-1"
                placeholder="Enter dataset description"
                rows="4"
              ></textarea>
            </label>
          </div>
          <div className="mb-4 font-bold">
            <label className="block mb-1">
              File:
              <input
                type="file"
                accept=".json, .csv"
                onChange={handleFileUpload}
                className="border border-gray-400 rounded-md p-2 w-full font-normal mt-1"
              />
            </label>
            {dataset.file && (
              <p className="font-bold mt-3">
                Uploaded File Type:{" "}
                <span className="font-normal">{dataset.extension}</span>
              </p>
            )}
          </div>
          {/* Display columnNames and select column actions */}
          <div>
            {dataset.columnNames.length > 0 && (
              <h2 className="text-lg font-bold mb-2 mt-10">Column Actions:</h2>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3">
              {dataset.columnNames.map((columnName, columnIndex) => (
                <div key={columnName} className="mb-4">
                  <label className="block mb-1 ml-1 font-normal">
                    {columnName}
                  </label>
                  <select
                    value={dataset.columnActions[columnIndex] || "none"}
                    onChange={(e) => handleColumnActionChange(e, columnIndex)}
                    className="border border-gray-400 rounded-md p-1 w-full font-normal"
                  >
                    <option value="none">No Action</option>
                    <option value="remove">Remove</option>
                    <option value="hash">Anonymize</option>
                    {/* Add more actions as needed */}
                  </select>
                </div>
              ))}
            </div>
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
      {/* <Footer /> */}
    </>
  );
};

export default CreateDataset;
