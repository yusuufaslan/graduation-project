import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/header/Navbar";

const dummyProjects = [
  {
    _id: "1",
    name: "Project 1",
    owner: "Owner 1",
    description: "Description 1",
    tags: [
      { _id: "1", name: "Tag 1" },
      { _id: "2", name: "Tag 2" },
    ],
  },
  {
    _id: "2",
    name: "Project 2",
    owner: "Owner 2",
    description: "Description 2",
    tags: [
      { _id: "3", name: "Tag 3" },
      { _id: "4", name: "Tag 4" },
    ],
  },
  {
    _id: "3",
    name: "Project 3",
    owner: "Owner 3",
    description: "Description 3",
    tags: [
      { _id: "1", name: "Tag 1" },
      { _id: "4", name: "Tag 4" },
    ],
  },
  {
    _id: "4",
    name: "Project 4",
    owner: "Owner 4",
    description: "Description 4",
    tags: [
      { _id: "1", name: "Tag 1" },
      { _id: "4", name: "Tag 4" },
    ],
  },
  {
    _id: "5",
    name: "Project 5",
    owner: "Owner 5",
    description: "Description 5",
    tags: [
      { _id: "1", name: "Tag 1" },
      { _id: "4", name: "Tag 4" },
    ],
  },
  {
    _id: "6",
    name: "Project 6",
    owner: "Owner 6",
    description: "Description 5",
    tags: [
      { _id: "1", name: "Tag 1" },
      { _id: "4", name: "Tag 4" },
    ],
  },
  // Add more dummy projects as needed
];

const dummyTags = [
  { _id: "1", name: "Tag 1" },
  { _id: "2", name: "Tag 2" },
  { _id: "3", name: "Tag 3" },
  { _id: "4", name: "Tag 4" },
];

const Explore = () => {
  const [projects, setProjects] = useState(dummyProjects);
  const [tags, setTags] = useState(dummyTags);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch projects based on selectedTags, sortBy, and page
  }, [selectedTags, sortBy, page, searchQuery]);

  const handleTagSelection = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = () => {
    // Logic to trigger search based on searchQuery
    // This can involve API calls or filtering of existing projects array
    console.log("Searching for:", searchQuery);
  };

  const handleSetFilter = () => {
    // Logic to apply selected filters
    console.log("Selected tags:", selectedTags);
    console.log("Sort by:", sortBy);
  };

  const projectsPerPage = 5;
  const startIndex = (page - 1) * projectsPerPage;
  const paginatedProjects = projects.slice(startIndex, startIndex + projectsPerPage);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-semibold">Explore Projects</h1>
          <div className="flex mt-16">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-400 rounded-l-md p-2 w-full"
              placeholder="Search projects..."
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
            >
              Search
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/4 pr-4">
            <h2 className="text-xl font-semibold mb-2">Filter by Tags</h2>
            <div className="flex flex-col ml-2">
              {tags.map((tag) => (
                <label key={tag._id} className="inline-flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag._id)}
                    onChange={() => handleTagSelection(tag._id)}
                    className="form-checkbox text-blue-500 h-5 w-5"
                  />
                  <span className="ml-2">{tag.name}</span>
                </label>
              ))}
            </div>

            <h2 className="text-xl font-semibold mt-8">Sort by</h2>
            <select
              value={sortBy}
              onChange={handleSortByChange}
              className="border border-gray-400 rounded-md p-2 mt-2"
            >
              <option value="latest">Latest</option>
              <option value="alphabetical">Alphabetical (A-Z)</option>
              <option value="alphabetical">Alphabetical (Z-A)</option>
            </select>
            <br />
            
            <button
              onClick={handleSetFilter}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-8"
            >
              Set Filters
            </button>

          </div>
          <div className="w-3/4">
            <div className="mt-1">
              {paginatedProjects.map((project) => (
                <Link to={`/project/detail/${project._id}`} key={project._id}>
                  <div className="border border-gray-200 p-4 rounded-md mb-4 hover:border-blue-500 transition duration-300">
                    <h3 className="text-lg font-semibold mb-2">
                      {project.name}
                    </h3>
                    <p className="text-gray-600 mb-2">{project.owner}</p>
                    <p className="text-gray-700 mb-2">{project.description}</p>
                    <div className="flex flex-wrap">
                      {project.tags.map((tag) => (
                        <span
                          key={tag._id}
                          className="bg-gray-200 rounded-full py-1 px-3 mr-2 mb-2 flex items-center font-normal"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="bg-gray-300 text-gray-600 px-4 py-2 rounded-l-md"
              >
                Prev
              </button>
              <button
                onClick={() => handlePageChange(page + 1)}
                className="bg-gray-300 text-gray-600 px-4 py-2 rounded-r-md"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
