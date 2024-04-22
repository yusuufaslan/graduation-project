import React, { useState, useEffect } from "react";
import Navbar from "../../components/header/Navbar";
import ProjectList from "../../components/ProjectList/ProjectList";
import axios from "axios";

const ParticipatedProjects = () => {
  const [participatedProjects, setParticipatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParticipatedProjects()
      .then((projects) => {
        setParticipatedProjects(projects);
      })
      .catch((error) => console.error("Error fetching participated projects:", error))
      .finally(() => setLoading(false));
  }, []);

  const fetchParticipatedProjects = async () => {
    try {
      const response = await axios.get("http://localhost:3838/api/user/shared-projects-to-user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        return response.data.projects;
      }
    } catch (error) {
      console.error("Error fetching participated projects:", error);
      throw error;
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-10 py-8 max-w-7xl">
        <h1 className="text-3xl font-semibold text-center mb-8">
          My Participated Projects
        </h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : participatedProjects.length > 0 ? (
          <ProjectList projects={participatedProjects} mode="detail"/>
        ) : (
          <p className="text-center text-gray-600 mt-8">
            You are not participating in any projects currently.
          </p>
        )}
      </div>
    </>
  );
};

export default ParticipatedProjects;
