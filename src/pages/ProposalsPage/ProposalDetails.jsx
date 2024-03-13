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

      {/* Render other details of the proposal */}
      {/* {proposal.status != "waiting" && proposal.sent === false ? (
        <>
          <textarea
            className="w-full h-24 p-2 mb-4 border rounded"
            placeholder="Enter reason for acceptance/rejection"
          ></textarea>
          <div className="flex justify-between">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded mr-2"
              onClick={handleAccept}
              disabled={
                selectedProposal.status === "rejected" ||
                selectedProposal.status === "Accepted"
              }
            >
              Accept
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={handleReject}
              disabled={
                selectedProposal.status === "rejected" ||
                selectedProposal.status === "Accepted"
              }
            >
              Reject
            </button>
          </div>
        </>
      ) : (
        <div className="mt-4">
          {proposal.proposalResponseText && (
            <p>
              <strong>Response:</strong> {proposal.proposalResponseText}
            </p>
          )}
        </div>
      )} */}
    </div>
  );
};

export default ProposalDetails;
