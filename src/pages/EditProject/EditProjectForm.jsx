import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/header/Navbar";
import Select from "react-select";

import DatasetPreview from "../../components/DatasetPreview/DatasetPreview";

const EditProjectForm = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [tagList, setTagList] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/sign-in");
        } else {
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

          const tagResponse = await axios.get(
            "http://localhost:3838/api/tag/get"
          );
          if (tagResponse.status === 200) {
            const formattedTags = tagResponse.data.map((tag) => ({
              value: tag._id,
              name: tag.name,
            }));
            setTagList(formattedTags);
          }

          setUserList(data.project.userIds);

          setSelectedTags(data.project.tagIds);

          const ownerResponse = await axios.get(
            `http://localhost:3838/api/user/name-from-id?userId=${data.project.ownerId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (ownerResponse.status === 200) {
            const ownerData = ownerResponse.data.userNameInfo;
            setProject((prevProject) => ({
              ...prevProject,
              ownerName: ownerData.name,
              ownerSurname: ownerData.surname,
            }));
          }

          // Fetching user details
          const userDetailsPromises = data.project.userIds.map(
            async (userId) => {
              const userResponse = await axios.get(
                `http://localhost:3838/api/user/name-from-id?userId=${userId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              if (userResponse.status === 200) {
                const userData = userResponse.data.userNameInfo;
                setUserDetails((prevUserDetails) => ({
                  ...prevUserDetails,
                  [userId]: userData,
                }));
              }
            }
          );
          await Promise.all(userDetailsPromises);
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchData();
  }, [projectId, navigate]);

  const handleAddDataset = () => {
    navigate(`/dataset/create/${projectId}`);
  };

  const handleDownloadDataset = async (datasetUrl, datasetName, datasetExtension) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        url: datasetUrl,
        method: 'GET',
        responseType: 'blob', // Important
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${datasetName}.${datasetExtension}`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading dataset:", error);
    }
  };

  const handleRemoveDataset = async (datasetId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3838/api/project/remove-dataset",
        { datasetId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // If dataset removed successfully, update the project state
        setProject((prevProject) => ({
          ...prevProject,
          datasetIds: prevProject.datasetIds.filter((dataset) => dataset._id !== datasetId),
        }));
      }
    } catch (error) {
      console.error("Error removing dataset:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Project: {project.name}
        </h1>
        <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border-2 mb-44">
          <div className="px-6 py-4">
            <p className="text-2xl font-bold mb-4">Project Information</p>
            <div className="mb-4">
              <span className="text-gray-700 font-bold">Name:</span>{" "}
              <p className="text-gray-700 font-normal">{project.name}</p>
            </div>
            <div className="mb-4">
              <span className="text-gray-700 font-bold">Description:</span>{" "}
              <p className="text-gray-700 font-normal">{project.description}</p>
            </div>
            <div className="mb-4">
              <span className="text-gray-700 font-bold">Abstract:</span>{" "}
              <p className="text-gray-700 font-normal">{project.abstract}</p>
            </div>
            <div className="mb-4">
              <span className="text-gray-700 font-bold">Owner:</span>{" "}
              <p className="text-gray-700 font-normal">
                {project.ownerName} {project.ownerSurname}
              </p>
            </div>
            <div className="mb-4">
              <span className="text-gray-700 font-bold">Is Public:</span>{" "}
              <p className="text-gray-700 font-normal">
                {project.isPublic ? "Yes" : "No"}
              </p>
            </div>
            <div className="mb-4">
              <span className="text-gray-700 font-bold">Last Update Date:</span>{" "}
              <p className="text-gray-700 font-normal">
                {formatDate(project.updated_at)}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700">
                <span className="font-bold">Tags:</span>{" "}
                <span className="flex flex-wrap mt-2">
                  {project.tagIds.map((tagId) => {
                    const tag = tagList.find((tag) => tag.value === tagId);
                    return (
                      <span
                        key={tagId}
                        className="bg-blue-200 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                      >
                        {tag ? tag.name : `Tag ${tagId}`}
                      </span>
                    );
                  })}
                </span>
              </p>
            </div>
            <div className="mb-4">
              <span className="text-gray-700 font-bold">
                Users that are currently working on the project:
              </span>{" "}
              {userList.length === 0 ? (
                <div>No users are currently working on this project.</div>
              ) : (
                <span className="flex flex-wrap mt-2">
                  {userList.map((userId) => {
                    const userDetail = userDetails[userId];
                    return (
                      <span
                        key={userId}
                        className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                      >
                        {userDetail
                          ? `${userDetail.name} ${userDetail.surname} (${userDetail.email})`
                          // : `User ${userId}`}
                          : "Loading..." }
                      </span>
                    );
                  })}
                </span>
              )}
            </div>
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <h1 className="text-2xl font-bold mb-4">Datasets</h1>
            {project.datasetIds.length === 0 ? (
              <p className="text-gray-700">
                No dataset has been added to this project yet.
              </p>
            ) : (
              project.datasetIds.map((dataset) => (
                <div
                  key={dataset._id}
                  className="border border-gray-300 shadow-md p-4 mb-10 rounded-md"
                >
                  <div>
                    <h3 className="text-2xl font-semibold mb-1">
                      
                      <span className="text-2xl font-normal"> {dataset.name}</span>
                    </h3>
                    <h3 className="text-md mb-2">
                      Description:
                      <span className="text-md font-normal text-gray-600"> {dataset.description}</span>
                    </h3>
                    <h3 className="text-md mb-2">
                      File Type:
                      <span className="text-md font-normal text-gray-600"> .{dataset.extension}</span>
                    </h3>
                  </div>
                  <DatasetPreview datasetId={dataset._id} />
                  <div className="flex justify-between items-center mt-10">
                    <button
                      onClick={() => handleRemoveDataset(dataset._id)}
                      className="text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
                    >
                      Remove Dataset
                    </button>
                    <button
                      onClick={() => handleDownloadDataset("http://localhost:3838/" + dataset.anonym_url, dataset.name, dataset.extension)}
                      className="text-sm bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
                    >
                      Download Dataset
                    </button>
                  </div>
                </div>
              ))
            )}
            <button
              onClick={handleAddDataset}
              className="text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              + Add New Dataset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProjectForm;
