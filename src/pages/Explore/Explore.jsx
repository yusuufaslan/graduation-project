import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/header/Navbar';
import axios from 'axios';

const Explore = () => {
  const [projects, setProjects] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('latest');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProjects();
    fetchTags();
  }, [selectedTags, sortBy, page]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3838/api/projects', {
        params: {
          tags: selectedTags.join(','),
          sortBy: sortBy,
          page: page,
        },
      });
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get('http://localhost:3838/api/tags');
      setTags(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
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

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <div className="w-1/2">
            <h1 className="text-3xl font-semibold">Explore Projects</h1>
          </div>
          <div className="w-1/2 flex justify-end">
            <select
              value={sortBy}
              onChange={handleSortByChange}
              className="border border-gray-400 rounded-md p-2 mr-2"
            >
              <option value="latest">Latest</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Set Filter</button>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/4 pr-4">
            <h2 className="text-xl font-semibold mb-2">Filter by Tags</h2>
            <div className="flex flex-col">
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
          </div>
          <div className="w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <Link to={`/project/detail/${project._id}`} key={project._id}>
                  <div className="border border-gray-200 p-4 rounded-md hover:border-blue-500 transition duration-300">
                    <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
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
