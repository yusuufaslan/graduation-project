// ParticipatedProjects.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../../components/header/Navbar";
import ProjectList from "../../components/ProjectList/ProjectList";

const ParticipatedProjects = () => {
  const [participatedProjects, setParticipatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching working projects from an API
    fetchParticipatedProjects()
      .then((projects) => {
        setParticipatedProjects(projects);
      })
      .catch((error) => console.error("Error fetching working projects:", error))
      .finally(() => setLoading(false));
  }, []);

  const fetchParticipatedProjects = () => {
    // Simulated fetch function, replace with actual fetch logic
    return new Promise((resolve, reject) => {
      // Simulating delay
      setTimeout(() => {
        // Sample working projects, replace with actual data retrieval logic
        const sampleParticipatedProjects = [
          // Example working project objects
          {
            _id: "11",
            name: "Working Project 11",
            ownerId: "User 11",
            updated_at: "2024-04-02",
            description: "Description of Working Project 1",
            tagIds: [{ _id: "11", name: "Tag 11" }],
          },
          {
            _id: "12",
            name: "Working Project 2",
            ownerId: "User 2",
            updated_at: "2024-04-04",
            description: "Description of Working Project 2",
            tagIds: [{ _id: "2", name: "Tag 2" }],
          },
          {
            _id: "15",
            name: "Project 15",
            ownerId: "ownerId 15",
            updated_at: "2024-04-01",
            description:
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque consequuntur ad id iusto asperiores, laudantium nemo odit eligendi nesciunt sequi veritatis explicabo nam veniam, temporibus similique. Nulla, quas dolorem rem et eum voluptate amet at quisquam aperiam delectus quam exercitationem ex. Voluptatum libero beatae eveniet incidunt ea ipsa porro culpa enim, saepe minima. Molestiae, quibusdam fugit. Nesciunt nulla repudiandae doloribus ipsa facere odio architecto impedit sit nam nihil amet eum quis sint ea, quas voluptatibus numquam nisi. Optio, et. Maxime quos nihil hic, facere explicabo tenetur eius optio. Inventore nulla excepturi quod sint ipsa similique tenetur sunt corrupti a ipsum.",
            tagIds: [
              { _id: "1", name: "Tag 1" },
              { _id: "4", name: "Tag 4" },
            ],
          },
          {
            _id: "16",
            name: "Project 16",
            ownerId: "ownerId 16",
            updated_at: "2024-04-03",
            description:
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque consequuntur ad id iusto asperiores, laudantium nemo odit eligendi nesciunt sequi veritatis explicabo nam veniam, temporibus similique. Nulla, quas dolorem rem et eum voluptate amet at quisquam aperiam delectus quam exercitationem ex. Voluptatum libero beatae eveniet incidunt ea ipsa porro culpa enim, saepe minima. Molestiae, quibusdam fugit. Nesciunt nulla repudiandae doloribus ipsa facere odio architecto impedit sit nam nihil amet eum quis sint ea, quas voluptatibus numquam nisi. Optio, et. Maxime quos nihil hic, facere explicabo tenetur eius optio. Inventore nulla excepturi quod sint ipsa similique tenetur sunt corrupti a ipsum.",
            tagIds: [
              { _id: "3", name: "Tag 3" },
              { _id: "4", name: "Tag 4" },
              { _id: "2", name: "Tag 2" },
            ],
          },
        ];
        resolve(sampleParticipatedProjects);
      }, 100); // Simulating delay of 0.1 second
    });
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
            You are not working on any projects currently.
          </p>
        )}
      </div>
    </>
  );
};

export default ParticipatedProjects;
