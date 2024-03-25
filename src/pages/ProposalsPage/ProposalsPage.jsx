import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProposalDetails from "./ProposalDetails";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";

import axios from "axios";

const ProposalsPage = () => {
  const { type } = useParams(); // type will be either "sent" or "received"
  const [pageType, setPageType] = useState(type);
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [responseText, setResponseText] = useState("");

  const handleAction = async (verified) => {
    // Handle reject action for received proposals
    // Update backend with rejectionText and set proposal status to Rejected
    try {
      let data = JSON.stringify({
        proposalId: selectedProposal.id,
        verified: verified,
        proposalReviewText: responseText,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3838/api/proposal/evaluate",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: data,
      };

      const response = await axios.request(config);

      console.log(response.data);

      // Redirect to appropriate page after successful submission
      navigate(`/proposals/received}`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data.error);
      } else {
        console.log(error); // Log other errors
      }
    }
  };

  useEffect(() => {
    // Dummy data for demonstration
    const dummyProposalsSent = [
      {
        id: 1,
        projectName: "Health Research Project A",
        proposalText:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed...",
        potentialResearchBenefits:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed...",
        verified: "none",
        proposalResponseText: "",
        applicatorId: 123,
      },
      {
        id: 2,
        projectName: "Health Research Project C",
        proposalText:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
        potentialResearchBenefits:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed...",
        verified: "accept",
        proposalResponseText: "Accepted arbitrarily",
        applicatorId: 123,
      },
      {
        id: 5,
        projectName: "Health Research Project C",
        proposalText:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
        potentialResearchBenefits:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed...",
        verified: "accept",
        proposalResponseText: "Accepted arbitrarily",
        applicatorId: 123,
      },
      {
        id: 6,
        projectName: "Health Research Project C",
        proposalText:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
        potentialResearchBenefits:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed...",
        verified: "accept",
        proposalResponseText: "Accepted arbitrarily",
        applicatorId: 123,
      },
      {
        id: 7,
        projectName: "Health Research Project C",
        proposalText:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
        potentialResearchBenefits:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed...",
        verified: "accept",
        proposalResponseText: "Accepted arbitrarily",
        applicatorId: 123,
      },
      {
        id: 8,
        projectName: "Health Research Project C",
        proposalText:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
        potentialResearchBenefits:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed...",
        verified: "accept",
        proposalResponseText: "Accepted arbitrarily",
        applicatorId: 123,
      },
      {
        id: 9,
        projectName: "Health Research Project C",
        proposalText:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
        potentialResearchBenefits:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed...",
        verified: "accept",
        proposalResponseText: "Accepted arbitrarily",
        applicatorId: 123,
      },
      {
        id: 10,
        projectName: "Health Research Project C",
        proposalText:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
        potentialResearchBenefits:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed...",
        verified: "accept",
        proposalResponseText: "Accepted arbitrarily",
        applicatorId: 123,
      },
      {
        id: 11,
        projectName: "Health Research Project C",
        proposalText:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
        potentialResearchBenefits:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed...",
        verified: "reject",
        proposalResponseText: "Rejected arbitrarily",
        applicatorId: 123,
      },
      {
        id: 12,
        projectName: "Health Research Project C",
        proposalText:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
        potentialResearchBenefits:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed...",
        verified: "accept",
        proposalResponseText: "Accepted arbitrarily",
        applicatorId: 123,
      },
    ];

    const dummyProposalsReceived = [
      {
        id: 3,
        projectName: "Health Research Project B",
        proposalText:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...",
        potentialResearchBenefits:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed...",
        verified: "none",
        proposalResponseText: "",
        applicatorId: 123,
      },
      {
        id: 4,
        projectName: "Health Research Project D",
        proposalText:
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia...",
        potentialResearchBenefits:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed...",
        verified: "reject",
        proposalResponseText: "Unfortunately, your proposal has been Rejected.",
        applicatorId: 123,
      },
    ];

    setProposals(
      pageType === "sent" ? dummyProposalsSent : dummyProposalsReceived
    );
  }, [pageType]);

  const handleProposalClick = (proposal) => {
    console.log(proposal);
    setSelectedProposal(proposal);
    setResponseText("");
  };

  return (
    <>
      <Navbar />
      <div className="relative w-full mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-5 h-screen mb-20">
        {/* Section for toggling between sent and received proposals */}
        <div className="w-full flex justify-center items-center my-4">
          <button
            className={`mx-2 px-4 py-2 text-m rounded-md ${
              pageType === "sent"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => {
              navigate("/proposals/sent");
              setSelectedProposal(null);
              setPageType("sent");
            }}
          >
            Proposals Sent
          </button>
          <button
            className={`mx-2 px-4 py-2 text-m rounded-md ${
              pageType === "received"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => {
              navigate("/proposals/received");
              setSelectedProposal(null);
              setPageType("received");
            }}
          >
            Proposals Received
          </button>
        </div>

        {/* Main content */}
        <div className="flex h-screen">
          {/* Left section */}
          <div className="w-1/3 border-r border-gray-200 overflow-y-auto border-2 rounded-lg">
            <h2 className="text-lg font-bold py-4 px-6 bg-gray-100 border-b border-gray-200">
              {pageType === "sent" ? "Proposals Sent" : "Proposals Received"}
            </h2>
            <div className="divide-y divide-gray-200">
              {proposals.map((proposal) => (
                <div
                  key={proposal.id}
                  onClick={() => handleProposalClick(proposal)}
                  className="p-4 hover:bg-gray-50 cursor-pointer"
                >
                  <p className="text-lg font-bold text-gray-600">
                    Applicant User: {proposal.applicatorId}
                  </p>
                  <p className="text-m font-medium">{proposal.projectName}</p>
                  <p className="text-sm text-gray-600">
                    {proposal.proposalText.substring(0, 40)}...
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-2/3 pl-5">
            {selectedProposal ? (
              <div>
                <ProposalDetails proposal={selectedProposal} />
                {pageType === "received" &&
                  selectedProposal.verified === "none" && (
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
                          onClick={() => handleAction("accept")}
                          disabled={
                            selectedProposal.verified === "reject" ||
                            selectedProposal.verified === "accept"
                          }
                        >
                          Accept
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-md w-40"
                          onClick={() => handleAction("reject")}
                          disabled={
                            selectedProposal.verified === "reject" ||
                            selectedProposal.verified === "accept"
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
      {/* <Footer /> */}
    </>
  );
};

export default ProposalsPage;
