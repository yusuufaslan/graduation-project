import React from "react";

const ProposalDetails = ({ proposal }) => {
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
      statusColorClass = "text-green-600";
      statusText = "Waiting";
      break;
    default:
      statusText = "Unknown";
  }

  return (
    <div className="bg-gray-100 p-4 rounded">
      <h2 className="text-4xl font-semibold mb-5">Proposal Details</h2>
      <h2 className="text-lg font-semibold mb-5">
        Project Name: {proposal.projectId}
      </h2>
      <p>
        <strong>Applicant User Id:</strong> {proposal.applicatorId}
      </p>
      <div className="my-5">
        <p className="text-gray-700">
          <span className="font-bold">Other Applicant User Ids:</span>{" "}
          <span className="flex flex-wrap mt-2">
            {proposal.applicantUserIds.map((userId, index) => (
              <span
                key={index}
                className="bg-gray-300 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
              >
                {userId}
              </span>
            ))}
          </span>
        </p>
      </div>

      <p>
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
