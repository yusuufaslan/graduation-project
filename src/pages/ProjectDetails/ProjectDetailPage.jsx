import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/header/Navbar";

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [hasAccess, setHasAccess] = useState(false); // State to track access permission

  useEffect(() => {
    // Fetch project data from backend using projectId
    // For demonstration, setting some dummy data
    const dummyProject = {
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
      ],
      selectedTags: [1, 2],
    };

    setProject(dummyProject);

    // Check if user's email is in the project's emails array
    const userEmail = "user@example.com"; // Replace this with actual user email
    if (dummyProject.emails.includes(userEmail)) {
      setHasAccess(true);
    }
  }, [projectId]);

  const handleCreateProposal = () => {
    // Navigate to the proposal page with the projectId
    navigate(`/proposal/create/${projectId}`);
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Project Detail - {project.id}
        </h1>
        <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border-2 mb-44">
          <div className="px-6 py-4">
            <p className="text-2xl font-bold mb-4">Project Information</p>
            <div className="mb-4">
              <p className="text-gray-700">
                <span className="font-bold">Name:</span>{" "}
                <span>{project.name}</span>
              </p>
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
              <p className="text-gray-700">
                <span className="font-bold">Owner:</span>{" "}
                <span className="font-normal">{project.owner}</span>
              </p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700">
                <span className="font-bold">Tags:</span>{" "}
                <span className="flex flex-wrap mt-2">
                  {project.selectedTags.map((tagId) => (
                    <span
                      key={tagId}
                      className="bg-blue-200 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                    >
                      Tag {tagId}
                    </span>
                  ))}
                </span>
              </p>
            </div>
            <div className="mb-4">
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
            </div>
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
                  Create Proposal to get access to download datasets.
                </button>
              )}
            </div>
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <p className="text-2xl font-bold mb-4">Datasets</p>
            {project.datasets.map((dataset) => (
              <div
                key={dataset.id}
                className="border-b border-gray-200 last:border-0 py-4"
              >
                <h3 className="text-xl font-semibold mb-2">{dataset.name}</h3>
                <p className="text-gray-700">{dataset.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailPage;
