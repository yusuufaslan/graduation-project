import React, { useState, useEffect } from "react";
import Navbar from "../../components/header/Navbar";
import ProjectList from "../../components/ProjectList/ProjectList";
import axios from "axios";
import Select from "react-select"; // Import react-select

import Pagination from "../../components/Pagination/Pagination";

const Explore = () => {
  const [projects, setProjects] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState({ value: "name", label: "Name" });
  const [sortOrder, setSortOrder] = useState({ value: "desc", label: "Descending" });
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [noProjectsFound, setNoProjectsFound] = useState(true);
  const [clearFiltersPressed, setClearFiltersPressed] = useState(0);

  useEffect(() => {
    setProjects([]);
    fetchTags();
    fetchData();
  }, [page, clearFiltersPressed]);

  const fetchTags = async () => {
    try {
      const response = await axios.get("http://localhost:3838/api/tag/get");
      if (response.status === 200) {
        const formattedTags = response.data.map((tag) => ({
          value: tag._id,
          label: tag.name,
        }));
        setTags(formattedTags);
      }
    } catch (error) {
      console.error("Error fetching tag list:", error);
    }
  };

  const fetchData = async () => {
    // console.log(`http://localhost:3838/api/project?page=${page}&limit=5&sortOrder=${sortOrder.value}&sortBy=${sortBy.value}&search=${searchQuery}`);
    // console.log(selectedTags);
    try {
      const response = await axios.get(
        `http://localhost:3838/api/project?page=${page}&limit=5&sortOrder=${sortOrder.value}&sortBy=${sortBy.value}&search=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setProjects(response.data.projects);
        setNoProjectsFound(response.data.projects.length === 0);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleTagSelection = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  const handleSortByChange = (selectedOption) => {
    setSortBy(selectedOption);
  };

  const handleSortOrderChange = (selectedOption) => {
    setSortOrder(selectedOption);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchData();
  };

  const handleClearFilters = (e) => {
    setSelectedTags([]);
    setSortBy({ value: "name", label: "Name" });
    setSortOrder({ value: "desc", label: "Descending" });
    setSearchQuery("");
    setPage(1); // Reset page to 1 when clearing filters
    setClearFiltersPressed(clearFiltersPressed + 1);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-10 py-8 max-w-7xl">
        <div className="mb-8 max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-semibold">Explore Projects</h1>
          <form onSubmit={handleSearch}>
            <div className="flex mt-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-400 rounded-l-md p-2 w-full"
                placeholder="Search projects..."
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="flex">
          <div className="w-full md:w-1/4 pr-4">
            <h2 className="text-xl font-semibold">Sort by</h2>
            <Select
              value={sortBy}
              onChange={handleSortByChange}
              options={[
                { value: "name", label: "Name" },
                { value: "description", label: "Description" },
                { value: "ownerId", label: "Owner Id" },
                { value: "updated_at", label: "Updated At" },
                { value: "created_at", label: "Created At" },
              ]}
            />

            <h2 className="text-xl font-semibold mb-2 mt-4">Sort Order</h2>
            <Select
              value={sortOrder}
              onChange={handleSortOrderChange}
              options={[
                { value: "desc", label: "Descending" },
                { value: "asc", label: "Ascending" },
              ]}
            />

            <h2 className="text-xl font-semibold mb-2 mt-8">Filter by Tags</h2>
            {/* Tag selection component */}
            <Select
              isMulti
              options={tags}
              value={selectedTags}
              onChange={handleTagSelection}
            />
            <br />

            <button
              onClick={fetchData}
              className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm"
            >
              Set Filters
            </button>

            <button
              onClick={(e) => handleClearFilters(e)}
              className="bg-red-500 text-white px-3 py-2 rounded-md text-sm ml-2"
            >
              Clear Filters
            </button>
          </div>
          <div className="w-full md:w-3/4">
            <div className="mt-1">
              {projects.length > 0 ? (
                <ProjectList projects={projects} mode="detail" />
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

              <Pagination
                currentPage={page}
                totalPages={Math.ceil(20 / 5)}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
