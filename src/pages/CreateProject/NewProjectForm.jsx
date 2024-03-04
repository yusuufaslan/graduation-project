import React, { useState } from "react";

const NewProjectForm = () => {
  const [project, setProject] = useState({
    name: "",
    description: "",
    abstract: "",
    isPublic: false,
    tags: [],
    owner: "",
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
    const { value } = e.target;
    setProject({ ...project, tags: [...project.tags, value] });
  };

  const handleDatasetChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDatasets = [...project.datasets];
    updatedDatasets[index] = { ...updatedDatasets[index], [name]: value };
    setProject({ ...project, datasets: updatedDatasets });
  };

  const handleAddDataset = () => {
    setProject({
      ...project,
      datasets: [...project.datasets, { name: "", description: "" }],
    });
  };

  const handleSubmit = () => {
    // Send project data to backend
    console.log(project);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Create New Project</h1>
      <form>
        <label className="block my-2">
          Name:
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
            className="border border-gray-400 rounded-md p-2 w-full"
          />
        </label>
        {/* Add other fields similarly */}
        {project.datasets.map((dataset, index) => (
          <div key={index} className="border border-gray-400 p-4 my-4">
            <h2 className="text-lg font-bold">Dataset {index + 1}</h2>
            <label className="block my-2">
              Name:
              <input
                type="text"
                name="name"
                value={dataset.name}
                onChange={(e) => handleDatasetChange(e, index)}
                className="border border-gray-400 rounded-md p-2 w-full"
              />
            </label>
            {/* Add other dataset fields similarly */}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddDataset}
          className="bg-blue-500 text-white px-4 py-2 rounded-md my-4 mr-10"
        >
          Add Dataset
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default NewProjectForm;
