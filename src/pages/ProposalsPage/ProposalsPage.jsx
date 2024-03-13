import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProposalDetails from "./ProposalDetails";

const ProposalsPage = () => {
  const { pagetype } = useParams(); // type will be either "sent" or "received"
  const [type, setType] = useState(pagetype)
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [responseText, setResponseText] = useState("");

  const handleAccept = () => {
    // Handle accept action for received proposals
    // Update backend with acceptanceText and set proposal status to Accepted
    console.log("Accepted");
  };

  const handleReject = () => {
    // Handle reject action for received proposals
    // Update backend with rejectionText and set proposal status to Rejected
    console.log("Rejected");
  };

  useEffect(() => {
    // Dummy data for demonstration
    const dummyProposalsSent = [
      {
        id: 1,
        projectName: "Health Research Project A",
        proposalText:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed...",
        status: "Waiting",
        proposalResponseText: "",
        applicantId: 123,
        sent: true,
      },
      {
        id: 2,
        projectName: "Health Research Project C",
        proposalText:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
        status: "Accepted",
        proposalResponseText: "Accepted arbitrarily",
        applicantId: 123,
        sent: true,
      },
      {
        id: 5,
        projectName: "Health Research Project C",
        proposalText:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
        status: "Accepted",
        proposalResponseText: "Accepted arbitrarily",
        applicantId: 123,
        sent: true,
      },
      {
        id: 6,
        projectName: "Health Research Project C",
        proposalText:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
        status: "Accepted",
        proposalResponseText: "Accepted arbitrarily",
        applicantId: 123,
        sent: true,
      },
      {
        id: 7,
        projectName: "Health Research Project C",
        proposalText:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
        status: "Accepted",
        proposalResponseText: "Accepted arbitrarily",
        applicantId: 123,
        sent: true,
      },
      {
        id: 8,
        projectName: "Health Research Project C",
        proposalText:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
        status: "Accepted",
        proposalResponseText: "Accepted arbitrarily",
        applicantId: 123,
        sent: true,
      },
      {
        id: 9,
        projectName: "Health Research Project C",
        proposalText:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
        status: "Accepted",
        proposalResponseText: "Accepted arbitrarily",
        applicantId: 123,
        sent: true,
      },
      {
        id: 10,
        projectName: "Health Research Project C",
        proposalText:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
        status: "Accepted",
        proposalResponseText: "Accepted arbitrarily",
        applicantId: 123,
        sent: true,
      },
      {
        id: 11,
        projectName: "Health Research Project C",
        proposalText:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
        status: "Accepted",
        proposalResponseText: "Accepted arbitrarily",
        applicantId: 123,
        sent: true,
      },
      {
        id: 12,
        projectName: "Health Research Project C",
        proposalText:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
        status: "Accepted",
        proposalResponseText: "Accepted arbitrarily",
        applicantId: 123,
        sent: true,
      },
    ];

    const dummyProposalsReceived = [
      {
        id: 3,
        projectName: "Health Research Project B",
        proposalText:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...",
        status: "Waiting",
        proposalResponseText: "",
        applicantId: 123,
        sent: false,
      },
      {
        id: 4,
        projectName: "Health Research Project D",
        proposalText:
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia...",
        status: "Accepted",
        proposalResponseText: "Unfortunately, your proposal has been Rejected.",
        applicantId: 123,
        sent: false,
      },
    ];

    setProposals(type === "sent" ? dummyProposalsSent : dummyProposalsReceived);
  }, [type]);

  const handleProposalClick = (proposal) => {
    setSelectedProposal(proposal);
    setResponseText("");
  };

  return (
    <div className="overflow-x-hidden">
      {/* Section for toggling between sent and received proposals */}
      <div className="w-full flex justify-center items-center my-4">
        <button
          className={`mx-2 px-4 py-2 text-m rounded-md ${
            type === "sent"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => {
            navigate("/proposals/sent")
            setSelectedProposal(null)
            setType("sent")
          }}
        >
          Proposals Sent
        </button>
        <button
          className={`mx-2 px-4 py-2 text-m rounded-md ${
            type === "received"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => {
            navigate("/proposals/received")
            setSelectedProposal(null)
            setType("received")
          }}
        >
          Proposals Received
        </button>
      </div>

      {/* Main content */}
      <div className="flex h-screen">
        {/* Left section */}
        <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
          <h2 className="text-lg font-bold py-4 px-6 bg-gray-100 border-b border-gray-200">
            {type === "sent" ? "Proposals Sent" : "Proposals Received"}
          </h2>
          <div className="divide-y divide-gray-200">
            {proposals.map((proposal) => (
              <div
                key={proposal.id}
                onClick={() => handleProposalClick(proposal)}
                className="p-4 hover:bg-gray-50 cursor-pointer"
              >
                <p className="text-lg font-bold text-gray-600">
                  Applicant User: {proposal.applicantId}
                </p>
                <p className="text-m font-medium">{proposal.projectName}</p>
                <p className="text-sm text-gray-600">
                  {proposal.proposalText.substring(0, 40)}...
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right section */}
        <div className="w-2/3 px-5">
          {selectedProposal ? (
            <div>
              <ProposalDetails proposal={selectedProposal} />
              {type === "received" && selectedProposal.status === "Waiting" && (
                <div className="mt-4">
                  <textarea
                    className="w-full h-40 p-2 mb-2 border rounded-lg"
                    placeholder="Enter acceptance/rejection explanation..."
                    onChange={(e) => {
                      setResponseText(e.target.value);
                    }}
                  />
                  <div className="space-x-5">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-md w-40"
                      onClick={handleAccept}
                      disabled={
                        selectedProposal.status === "Rejected" ||
                        selectedProposal.status === "Accepted"
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md w-40"
                      onClick={handleReject}
                      disabled={
                        selectedProposal.status === "Rejected" ||
                        selectedProposal.status === "Accepted"
                      }
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-600">
              Select a proposal to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProposalsPage;
