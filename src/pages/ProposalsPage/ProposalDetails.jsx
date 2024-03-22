import React from "react";

const ProposalDetails = ({ proposal }) => {
  return (
    <div className="bg-gray-100 p-4 rounded">
      <h2 className="text-4xl font-semibold mb-6">Proposal Details</h2>
      <h2 className="text-lg font-semibold mb-2">{proposal.projectName}</h2>
      <p>
        <strong>Applicant User Id:</strong> {proposal.applicantId}
      </p>
      <p>
        <strong>Proposal Text:</strong>
      </p>
      <p className="mb-5">
          {proposal.proposalText}
      </p>
      <p>
        <strong>Potential Research Benefits:</strong>
      </p>
      <p className="mb-5">
          {proposal.potentialResearchBenefits}
      </p>
      <p>
        <strong>Status:</strong> {proposal.status}
      </p>
      <div>
        {proposal.proposalResponseText ? (
          <p>
            <strong>Response:</strong> {proposal.proposalResponseText}
          </p>
        ) : (
          <p>
            <strong>Response:</strong> No response yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProposalDetails;
