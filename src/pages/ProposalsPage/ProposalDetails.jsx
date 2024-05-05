import React, { useEffect, useState } from "react";
import axios from "axios";

const ProposalDetails = ({ proposal, projectName }) => {
  const [applicantName, setApplicantName] = useState("");
  const [otherApplicants, setOtherApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicantName = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3838/api/user/name-from-id?userId=${proposal.applicatorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setApplicantName(
            `${response.data.userNameInfo.name} ${response.data.userNameInfo.surname} (${response.data.userNameInfo.email})`
          );
        }
      } catch (error) {
        console.error("Error fetching applicant name:", error);
      }
    };

    const fetchOtherApplicants = async () => {
      try {
        const token = localStorage.getItem("token");
        const otherApplicantsData = await Promise.all(
          proposal.applicantUserIds.map(async (userId) => {
            const response = await axios.get(
              `http://localhost:3838/api/user/name-from-id?userId=${userId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            return response.data.userNameInfo;
          })
        );
        setOtherApplicants(otherApplicantsData);
      } catch (error) {
        console.error("Error fetching other applicants:", error);
      }
    };

    fetchApplicantName();
    fetchOtherApplicants();
  }, [proposal.applicatorId, proposal.applicantUserIds]);

  // Status variables
  let statusColorClass = "";
  let statusText = "";

  switch (proposal.verified) {
    case "accept":
      statusColorClass = "text-green-600";
      statusText = "Accepted";
      break;
    case "reject":
      statusColorClass = "text-red-600";
      statusText = "Rejected";
      break;
    case "none":
      statusColorClass = "text-blue-600";
      statusText = "Waiting";
      break;
    default:
      statusText = "Unknown";
  }

  return (
    <div className="bg-gray-100 p-4 rounded">
      <h2 className="text-4xl font-semibold mb-5">Proposal Details</h2>
      <p>
        <strong>Project Name:</strong> {projectName}
      </p>
      
      <p className="mt-5">
        <strong>Applicant:</strong> <span className="bg-gray-300 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 ">{applicantName}</span>
      </p>

      {/* <p className="mt-5">
        <strong>Applicant:</strong> {applicantName}
      </p> */}
    
      {otherApplicants.length > 0 && (
        <div className="mt-5">
          <p className="text-gray-800">
            <span className="font-bold">Other Applicants:</span>{" "}
            <span className="flex flex-wrap mt-2">
              {otherApplicants.map((applicant, index) => (
                <span
                  key={index}
                  className="bg-gray-300 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                >
                  {applicant.name} {applicant.surname} ({applicant.email})
                </span>
              ))}
            </span>
          </p>
        </div>
      )}

      <p className="mt-5">
        <strong>Proposal Text:</strong>
      </p>
      <p className="mb-5">{proposal.proposalText}</p>
      <p>
        <strong>Potential Research Benefits:</strong>
      </p>
      <p className="mb-5">{proposal.potentialResearchBenefits}</p>
      <p>
        <strong>Status:</strong>{" "}
        <span className={`font-bold ${statusColorClass}`}>{statusText}</span>
      </p>
      <div>
        {proposal.proposalReviewText ? (
          <p>
            <strong>Response:</strong> {proposal.proposalReviewText}
          </p>
        ) : (
          <p>
            <strong>Response:</strong> No response given.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProposalDetails;
