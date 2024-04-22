// ProjectList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProjectList = ({ projects, mode }) => {
  console.log(projects);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // You can customize this further based on your preference
  };

  return (
    <div>
      {projects.map((project) => (
        <Link to={`/project/${mode}/${project._id}`} key={project._id}>
          <div className="border border-gray-300 p-2 rounded-md mb-4 hover:border-blue-500 transition duration-300">
            <h3 className="text-md font-semibold mb-0.5">
              {project.name.length > 200
                ? project.name.substring(0, 200) + "..."
                : project.name}
            </h3>
            <p className="text-sm text-gray-700 mb-0.5">
              {project.ownerId}{" "}
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
