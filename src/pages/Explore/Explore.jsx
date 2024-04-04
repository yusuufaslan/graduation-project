import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/header/Navbar";

const dummyProjects = [
  {
    _id: "1",
    name: "Project 1",
    owner: "Owner 1",
    lastUpdated: "2024-03-01",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque consequuntur ad id iusto asperiores, laudantium nemo odit eligendi nesciunt sequi veritatis explicabo nam veniam, temporibus similique. Nulla, quas dolorem rem et eum voluptate amet at quisquam aperiam delectus quam exercitationem ex. Voluptatum libero beatae eveniet incidunt ea ipsa porro culpa enim, saepe minima. Molestiae, quibusdam fugit. Nesciunt nulla repudiandae doloribus ipsa facere odio architecto impedit sit nam nihil amet eum quis sint ea, quas voluptatibus numquam nisi. Optio, et. Maxime quos nihil hic, facere explicabo tenetur eius optio. Inventore nulla excepturi quod sint ipsa similique tenetur sunt corrupti a ipsum.",
    tags: [
      { _id: "1", name: "Tag 1" },
      { _id: "2", name: "Tag 2" },
    ],
  },
  {
    _id: "2",
    name: "A Project 2",
    owner: "Owner 2",
    lastUpdated: "2024-04-01",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque consequuntur ad id iusto asperiores, laudantium nemo odit eligendi nesciunt sequi veritatis explicabo nam veniam, temporibus similique. Nulla, quas dolorem rem et eum voluptate amet at quisquam aperiam delectus quam exercitationem ex. Voluptatum libero beatae eveniet incidunt ea ipsa porro culpa enim, saepe minima. Molestiae, quibusdam fugit. Nesciunt nulla repudiandae doloribus ipsa facere odio architecto impedit sit nam nihil amet eum quis sint ea, quas voluptatibus numquam nisi. Optio, et. Maxime quos nihil hic, facere explicabo tenetur eius optio. Inventore nulla excepturi quod sint ipsa similique tenetur sunt corrupti a ipsum.",
    tags: [
      { _id: "3", name: "Tag 3" },
      { _id: "4", name: "Tag 4" },
    ],
  },
  {
    _id: "3",
    name: "Project 3",
    owner: "Owner 3",
    lastUpdated: "2024-04-02",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque consequuntur ad id iusto asperiores, laudantium nemo odit eligendi nesciunt sequi veritatis explicabo nam veniam, temporibus similique. Nulla, quas dolorem rem et eum voluptate amet at quisquam aperiam delectus quam exercitationem ex. Voluptatum libero beatae eveniet incidunt ea ipsa porro culpa enim, saepe minima. Molestiae, quibusdam fugit. Nesciunt nulla repudiandae doloribus ipsa facere odio architecto impedit sit nam nihil amet eum quis sint ea, quas voluptatibus numquam nisi. Optio, et. Maxime quos nihil hic, facere explicabo tenetur eius optio. Inventore nulla excepturi quod sint ipsa similique tenetur sunt corrupti a ipsum.",
    tags: [
      { _id: "1", name: "Tag 1" },
      { _id: "4", name: "Tag 4" },
    ],
  },
  {
    _id: "4",
    name: "Project 4",
    owner: "Owner 4",
    lastUpdated: "2024-04-01",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque consequuntur ad id iusto asperiores, laudantium nemo odit eligendi nesciunt sequi veritatis explicabo nam veniam, temporibus similique. Nulla, quas dolorem rem et eum voluptate amet at quisquam aperiam delectus quam exercitationem ex. Voluptatum libero beatae eveniet incidunt ea ipsa porro culpa enim, saepe minima. Molestiae, quibusdam fugit. Nesciunt nulla repudiandae doloribus ipsa facere odio architecto impedit sit nam nihil amet eum quis sint ea, quas voluptatibus numquam nisi. Optio, et. Maxime quos nihil hic, facere explicabo tenetur eius optio. Inventore nulla excepturi quod sint ipsa similique tenetur sunt corrupti a ipsum.",
    tags: [
      { _id: "1", name: "Tag 1" },
      { _id: "4", name: "Tag 4" },
    ],
  },
  {
    _id: "5",
    name: "Project 5",
    owner: "Owner 5",
    lastUpdated: "2024-04-01",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque consequuntur ad id iusto asperiores, laudantium nemo odit eligendi nesciunt sequi veritatis explicabo nam veniam, temporibus similique. Nulla, quas dolorem rem et eum voluptate amet at quisquam aperiam delectus quam exercitationem ex. Voluptatum libero beatae eveniet incidunt ea ipsa porro culpa enim, saepe minima. Molestiae, quibusdam fugit. Nesciunt nulla repudiandae doloribus ipsa facere odio architecto impedit sit nam nihil amet eum quis sint ea, quas voluptatibus numquam nisi. Optio, et. Maxime quos nihil hic, facere explicabo tenetur eius optio. Inventore nulla excepturi quod sint ipsa similique tenetur sunt corrupti a ipsum.",
    tags: [
      { _id: "1", name: "Tag 1" },
      { _id: "4", name: "Tag 4" },
    ],
  },
  {
    _id: "6",
    name: "Project 6",
    owner: "Owner 6",
    lastUpdated: "2024-04-03",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque consequuntur ad id iusto asperiores, laudantium nemo odit eligendi nesciunt sequi veritatis explicabo nam veniam, temporibus similique. Nulla, quas dolorem rem et eum voluptate amet at quisquam aperiam delectus quam exercitationem ex. Voluptatum libero beatae eveniet incidunt ea ipsa porro culpa enim, saepe minima. Molestiae, quibusdam fugit. Nesciunt nulla repudiandae doloribus ipsa facere odio architecto impedit sit nam nihil amet eum quis sint ea, quas voluptatibus numquam nisi. Optio, et. Maxime quos nihil hic, facere explicabo tenetur eius optio. Inventore nulla excepturi quod sint ipsa similique tenetur sunt corrupti a ipsum.",
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
  { _id: "5", name: "Tag 5" },
];
const Explore = () => {
  const [projects, setProjects] = useState(dummyProjects);
  const [tags, setTags] = useState(dummyTags);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [noProjectsFound, setNoProjectsFound] = useState(true);

  useEffect(() => {
    // Load projects when the component mounts
    handleSetFilter();
  }, []); // Empty dependency array means this effect runs only once, equivalent to componentDidMount

  const handleTagSelection = (tagId) => {
    // Update selected tags
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleSortByChange = (e) => {
    // Update sort by criteria
    setSortBy(e.target.value);
  };

  const handlePageChange = (newPage) => {
    // Update page number
    setPage(newPage);
  };

  const handleSearch = () => {
    // Trigger search
    setPage(1); // Reset page number to 1 when a new search is initiated
    handleSetFilter();
  };

  const handleSetFilter = () => {
    // Filter projects based on selected tags, search query, and sorting criteria
    let filteredProjects = filterProjects(dummyProjects);

    switch (sortBy) {
      case "latest":
        filteredProjects.sort(
          (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
        );
        break;
      case "alphabetical":
        filteredProjects.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "reverseAlphabetical":
        filteredProjects.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setProjects(filteredProjects);
    setNoProjectsFound(filteredProjects.length === 0);
  };

  const filterProjects = (projectsToFilter) => {
    return projectsToFilter.filter((project) => {
      return (
        (selectedTags.length === 0 ||
          selectedTags.some((tagId) =>
            project.tags.some((tag) => tag._id === tagId)
          )) &&
        (project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  };

  const handleClearFilters = () => {
    // Clear all selected filters
    setSelectedTags([]);
    setSortBy("latest");
    setPage(1);
    handleSetFilter();
    window.location.reload();
  };

  const projectsPerPage = 5;
  const startIndex = (page - 1) * projectsPerPage;
  const endIndex = Math.min(startIndex + projectsPerPage, projects.length);
  const paginatedProjects = projects.slice(startIndex, endIndex);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-10 py-8 max-w-7xl">
        <div className="mb-8 max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-semibold">Explore Projects</h1>
          <div className="flex mt-8">
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
          <div className="w-full md:w-1/4 pr-4">
            <h2 className="text-xl font-semibold">Sort by</h2>
            <select
              value={sortBy}
              onChange={handleSortByChange}
              className="border border-gray-400 rounded-md p-2 mt-2"
            >
              <option value="latest">Latest</option>
              <option value="alphabetical">Alphabetical (A-Z)</option>
              <option value="reverseAlphabetical">Alphabetical (Z-A)</option>
            </select>

            <h2 className="text-xl font-semibold mb-2 mt-8">Filter by Tags</h2>
            <div className="flex flex-wrap mt-2 ml-1">
              {tags.map((tag) => (
                <label key={tag._id} className="inline-flex items-center mb-2 mr-2">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag._id)}
                    onChange={() => handleTagSelection(tag._id)}
                    className="form-checkbox text-blue-500 h-5 w-5"
                  />
                  <span className="ml-0.5">{tag.name}</span>
                </label>
              ))}
            </div>
            <br />

            <button
              onClick={handleSetFilter}
              className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm"
            >
              Set Filters
            </button>

            <button
              onClick={handleClearFilters}
              className="bg-red-500 text-white px-3 py-2 rounded-md text-sm ml-2"
            >
              Clear Filters
            </button>
          </div>
          <div className="w-full md:w-3/4">
            <div className="mt-1">
              {paginatedProjects.length > 0 ? (
                paginatedProjects.map((project) => (
                  <Link to={`/project/detail/${project._id}`} key={project._id}>
                    <div className="border border-gray-200 p-2 rounded-md mb-4 hover:border-blue-500 transition duration-300">
                      <h3 className="text-md font-semibold mb-0.5">
                        {project.name.length > 200
                          ? project.name.substring(0, 200) + "..."
                          : project.name}
                      </h3>
                      <p className="text-sm text-gray-700 mb-0.5">
                        {project.owner}{" "}
                        <span className="text-sm text-gray-500 mb-3">
                          | Last Updated: {project.lastUpdated}
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
                        {project.tags.map((tag) => (
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
                ))
              ) : (
                <div className="text-center text-gray-600">
                  {noProjectsFound ? (
                    <p className="mt-40">
                      No projects found matching the selected filters and search
                      query.
                    </p>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              )}
            </div>
            {projects.length > 0 && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className={`px-4 py-2 rounded-l-md bg-gray-300 ${
                    page === 1 ? "text-gray-400" : "text-gray-800"
                  }`}
                >
                  Prev
                </button>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={endIndex >= projects.length}
                  className={`px-4 py-2 rounded-r-md bg-gray-300 ${
                    endIndex >= projects.length
                      ? "text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
