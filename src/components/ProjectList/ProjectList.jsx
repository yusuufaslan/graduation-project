// ProjectList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const ProjectList = ({ projects, mode }) => {
  const [projectsWithUsers, setProjectsWithUsers] = useState([]);
  const [institutionOptions, setInstitutionOptions] = useState([]);

  function findInstitutionNameById(id) {
    const institution = institutionOptions.find(inst => inst._id === id);
    return institution ? institution.name : null;
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const projectsWithUsersData = await Promise.all(
        projects.map(async (project) => {
          try {
            const response = await axios.get(
              `http://localhost:3838/api/user/name-from-id?userId=${project.ownerId}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            if (response.status === 200) {
              return {
                ...project,
                ownerName: response.data.userNameInfo.name,
                ownerSurname: response.data.userNameInfo.surname,
                ownerInstitutionId: response.data.userNameInfo.institutionId
              };
            }
          } catch (error) {
            console.error("Error fetching user:", error);
            return { ...project, ownerName: "Unknown", ownerSurname: "User" };
          }
        })
      );
      setProjectsWithUsers(projectsWithUsersData);
    };

    const fetchInstitutions = async () => {
      try {
        const response = await axios.get("http://localhost:3838/api/institution/get");
        if (response.status === 200) {
          setInstitutionOptions(response.data);
          console.log(institutionOptions);
        } else {
          throw new Error("Failed to fetch institutions");
        }
      } catch (error) {
        console.error("Error fetching institutions:", error);
        // Handle error or display a message to the user
      }
    };

    fetchInstitutions();
    fetchUsers();
  }, [projects]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).replace(/ /g, ' '); // Replace space between date components with desired format
  };

  return (
    <div>
      {projectsWithUsers.map((project) => (
        <Link to={`/project/${mode}/${project._id}`} key={project._id}>
          <div className="border border-gray-300 p-2 rounded-md mb-4 hover:border-blue-500 transition duration-300">
            <h3 className="text-md font-semibold mb-0.5">
              {project.name.length > 300
                ? project.name.substring(0, 300) + "..."
                : project.name}
            </h3>
            <p className="text-sm text-gray-700 mb-0.5">
              {project.ownerName} {project.ownerSurname}{" "} {`(${findInstitutionNameById(project.ownerInstitutionId)}) `}
              <span className="text-sm text-gray-500 mb-3">
                | Last Updated: {formatDate(project.updated_at)}
              </span>
            </p>
            <p
              className="text-sm text-gray-700 mb-3"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {project.description}
            </p>
            <div className="flex flex-wrap">
              {project.tagIds.map((tag) => (
                <span
                  key={tag._id}
                  className="bg-gray-200 rounded-full py-1 px-2 mr-1 mb-1 flex items-center font-normal text-sm"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectList;
