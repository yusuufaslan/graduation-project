import React, { useState, useEffect } from "react";
import Navbar from "../../components/header/Navbar";
import ProjectList from "../../components/ProjectList/ProjectList";
import axios from "axios";

import Pagination from "../../components/Pagination/Pagination";

const Explore = () => {
  const [projects, setProjects] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [noProjectsFound, setNoProjectsFound] = useState(true);

  useEffect(() => {
    fetchTags();
    fetchData();
  }, [page, sortBy, sortOrder, searchQuery, selectedTags]);

  const fetchTags = async () => {
    try {
      const response = await axios.get("http://localhost:3838/api/tag/get");
      if (response.status === 200) {
        setTags(response.data);
      }
    } catch (error) {
      console.error("Error fetching tag list:", error);
    }
  };

  const fetchData = async () => {
    console.log(`http://localhost:3838/api/project?page=${page}&limit=5&sortOrder=${sortOrder}&sortBy=${sortBy}&search=${searchQuery}`);

    try {
      const response = await axios.get(
        `http://localhost:3838/api/project?page=${page}&limit=5&sortOrder=${sortOrder}&sortBy=${sortBy}&search=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        // console.log(response.data);
        setProjects(response.data.projects);
        setNoProjectsFound(response.data.length === 0);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

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

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchData();
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
    setSortBy("name");
    setSortOrder("desc");
    setPage(1);
    setSearchQuery("");
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
            <select
              value={sortBy}
              onChange={handleSortByChange}
              className="border border-gray-400 rounded-md p-2 mt-2"
            >
              <option value="name">Name</option>
              <option value="description">Description</option>
              <option value="updated_at">Updated At</option>
              <option value="created_at">Created At</option>
            </select>

            <h2 className="text-xl font-semibold mb-2 mt-8">Sort Order</h2>
            <select
              value={sortOrder}
              onChange={handleSortOrderChange}
              className="border border-gray-400 rounded-md p-2 mt-2"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>

            <h2 className="text-xl font-semibold mb-2 mt-8">Filter by Tags</h2>
            <div className="flex flex-wrap mt-2 ml-1">
              {tags.map((tag) => (
                <label
                  key={tag._id}
                  className="inline-flex items-center mb-2 mr-2"
                >
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
              onClick={fetchData}
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
              {projects.length > 0 ? (
                <ProjectList projects={projects} mode="detail"/>
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
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(20 / 5)}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
