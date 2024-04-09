import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import Navbar from "../../components/header/Navbar";

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tagList, setTagList] = useState([]);
  const [user, setUser] = useState(null);
  const [hasAccess, setHasAccess] = useState(false); // State to track access permission

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // If token does not exist, redirect to sign-in page
          navigate("/sign-in");
        } else {
          const response = await axios.get(
            "http://localhost:3838/api/user/detail",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const userData = response.data.user;
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchTagList = async () => {
      try {
        const response = await axios.get("http://localhost:3838/api/tag/get");
        if (response.status === 200) {
          setTagList(response.data);
        }
      } catch (error) {
        console.error("Error fetching tag list:", error);
      }
    };

    const fetchProjectDetail = async () => {
      try {
        if (user && user._id) {
          const response = await axios.post(
            "http://localhost:3838/api/project/detail",
            { projectId },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Include authorization token in headers
              },
            }
          );

          const data = response.data;
          setProject(data.project);

          if (data.project.userIds.includes(user._id)) {
            setHasAccess(true);
          }
        } else {
          // console.error("User data not available.");
        }
      } catch (error) {
        console.error("Error fetching project detail:", error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchUserData(), fetchTagList()]);
      fetchProjectDetail();
    };

    fetchData();
  }, [projectId, navigate, user]);

  const handleCreateProposal = () => {
    // Navigate to the proposal page with the projectId
    navigate(`/proposal/create/${projectId}`);
  };

  const handleDownloadDataset = (datasetId) => {
    // Placeholder function for handling dataset download
    console.log("Downloading dataset with ID:", datasetId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // You can customize this further based on your preference
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Project Detail - {project._id}
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
              <span className="text-gray-700 font-bold">Owner Id:</span>{" "}
              <p className="text-gray-700 font-normal">{project.ownerId}</p>
            </div>
            <div className="mb-4">
              <span className="text-gray-700 font-bold">Last Update Date:</span>{" "}
              <p className="text-gray-700 font-normal">{formatDate(project.updated_at)}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700">
                <span className="font-bold">Tags:</span>{" "}
                <span className="flex flex-wrap mt-2">
                  {project.tagIds.map((tagId) => {
                    const tag = tagList.find((tag) => tag._id === tagId);
                    return (
                      <span
                        key={tagId}
                        className="bg-blue-200 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                      >
                        {tag ? tag.name : `Tag ${tagId}`}{" "}
                        {/* Display tag name or fallback to tagId */}
                      </span>
                    );
                  })}
                </span>
              </p>
            </div>
            {/* <div className="mb-4">
              <p className="text-gray-700">
                <span className="font-bold">User Emails:</span>{" "}
                <span className="flex flex-wrap mt-2">
                  {project.emails.map((email, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                    >
                      {email}
                    </span>
                  ))}
                </span>
              </p>
            </div> */}
            <div className="py-4 border-t border-gray-200">
              {hasAccess ? (
                <p className="text-green-600 font-bold">
                  You have access to download datasets.
                </p>
              ) : (
                <button
                  onClick={handleCreateProposal}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Create proposal to get access to download datasets.
                </button>
              )}
            </div>
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <h1 className="text-2xl font-bold">Datasets</h1>
            {project.datasetIds.length === 0 ? (
              <p className="text-gray-700 mt-4">
                No dataset has been added to this project yet.
              </p>
            ) : (
              project.datasetIds.map((dataset) => (
                <div
                  key={dataset._id}
                  className="border-b border-gray-200 last:border-0 py-4"
                >
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {dataset.name}
                    </h3>
                    <p className="text-gray-700">{dataset.description}</p>
                  </div>
                  <div className="mt-2">
                    {hasAccess && (
                      <button
                        onClick={() => handleDownloadDataset(dataset._id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Download Dataset
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailPage;
