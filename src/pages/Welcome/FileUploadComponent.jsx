import React, { useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests

function FileUploadComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle file upload
  // Function to handle file upload
  const handleUpload = async () => {
    if (selectedFile) {
      try {
        setUploadStatus("Uploading...");
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("number", 2);

        // Log FormData content
        formData.forEach((value, key) => {
          console.log(key, value);
        });

        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Response from server:", response.data); // Log the response data
        setUploadStatus("File uploaded successfully");
      } catch (error) {
        // Handle error
        setUploadStatus("Error uploading file");
        console.error("Error uploading file:", error);
      }
    } else {
      // Handle case where no file is selected
      setUploadStatus("No file selected");
    }
  };

  return (
    <div className="h-screen">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>
    </div>
  );
}

export default FileUploadComponent;
