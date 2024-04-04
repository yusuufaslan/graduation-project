// MyProjects.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../../components/header/Navbar";
import ProjectList from "../../components/ProjectList/ProjectList";

const MyProjects = () => {
  const [sharedProjects, setSharedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching shared projects from an API
    fetchSharedProjects()
      .then((projects) => {
        setSharedProjects(projects);
      })
      .catch((error) => console.error("Error fetching shared projects:", error))
      .finally(() => setLoading(false));
  }, []);

  const fetchSharedProjects = () => {
    // Simulated fetch function, replace with actual fetch logic
    return new Promise((resolve, reject) => {
      // Simulating delay
      setTimeout(() => {
        // Sample shared projects, replace with actual data retrieval logic
        const sampleSharedProjects = [
          // Example shared project objects
          {
            _id: "7",
            name: "Shared Project 1",
            owner: "User 1",
            lastUpdated: "2024-04-03",
            description: "Description of Shared Project 1",
            tags: [{ _id: "1", name: "Tag 1" }],
          },
          {
            _id: "8",
            name: "Shared Project 2",
            owner: "User 2",
            lastUpdated: "2024-04-04",
            description: "Description of Shared Project 2",
            tags: [{ _id: "2", name: "Tag 2" }],
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
              { _id: "3", name: "Tag 3" },
              { _id: "4", name: "Tag 4" },
              { _id: "2", name: "Tag 2" },
            ],
          },
        ];
        resolve(sampleSharedProjects);
      }, 100); // Simulating delay of 0.1 second
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-10 py-8 max-w-7xl">
        <h1 className="text-3xl font-semibold text-center mb-8">
          My Shared Projects
        </h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : sharedProjects.length > 0 ? (
          <ProjectList projects={sharedProjects} mode="edit"/>
        ) : (
          <p className="text-center text-gray-600 mt-8">
            You have not shared any projects yet.
          </p>
        )}
      </div>
    </>
  );
};

export default MyProjects;
