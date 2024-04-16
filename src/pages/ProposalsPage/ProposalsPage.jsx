import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProposalDetails from "./ProposalDetails";
import Navbar from "../../components/header/Navbar";
import axios from "axios";

const ProposalsPage = () => {
  const { type } = useParams(); // type will be either "sent" or "received"
  const [pageType, setPageType] = useState(type);
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [proposalReviewText, setProposalReviewText] = useState("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false); // State for indicating request processing
  const [projectDetails, setProjectDetails] = useState({}); // State for storing project details

  useEffect(() => {
    fetchProposals();
  }, [pageType]);

  const fetchProposals = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3838/api/proposal/list",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { sentProposals, receivedProposals } = response.data;
      let proposalsList;

      if (pageType === "sent") {
        proposalsList = sentProposals;
      } else {
        proposalsList = receivedProposals.flatMap(
          (project) => project.foundProposals
        );
      }

      // Fetch project details for each proposal
      const fetchAllProjectDetails = proposalsList.map(async (proposal) => {
        const projectId = proposal.projectId;
        // Fetch project details if not already in projectDetails state
        if (!projectDetails[projectId]) {
          const response = await axios.post(
            "http://localhost:3838/api/project/detail",
            { projectId },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const data = response.data;
          // Update projectDetails state with the new project data
          setProjectDetails((prevDetails) => ({
            ...prevDetails,
            [projectId]: data.project,
          }));
        }
      });

      // Wait for all project details to be fetched
      await Promise.all(fetchAllProjectDetails);

      setProposals(proposalsList);
      setLoading(false); // Set loading to false after fetching proposals
    } catch (error) {
      console.error("Error fetching proposals:", error);
      setLoading(false); // Ensure loading is set to false in case of an error
    }
  };

  const handleAction = async (verified) => {
    setProcessing(true); // Set processing state to true when request starts processing
    try {
      const data = JSON.stringify({
        proposalId: selectedProposal._id,
        verified: verified,
        proposalReviewText: proposalReviewText,
        applicantUserIds: selectedProposal.applicantUserIds,
      });

      const config = {
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

      // Redirect to appropriate page after successful submission
      navigate(`/proposals/received`);
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data.error);
      } else {
        console.log(error); // Log other errors
      }
    } finally {
      setProcessing(false); // Set processing state to false when request processing is complete
    }
  };

  const handleProposalClick = (proposal) => {
    setSelectedProposal(proposal);
    setProposalReviewText("");
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
            {loading ? (
              // Display loading message while proposals are being fetched
              <div className="text-center py-4">Proposals Loading...</div>
            ) : (
              <div className="divide-y divide-gray-200">
                {proposals.map((proposal) => {
                  const projectId = proposal.projectId;
                  const projectName =
                    projectDetails[projectId]?.name || "Unknown Project";
                  return (
                    <div
                      key={proposal._id}
                      onClick={() => handleProposalClick(proposal)}
                      className="p-4 hover:bg-gray-50 cursor-pointer"
                    >
                      <p className="text-1xl font-bold text-gray-600">
                        Applicant User: {proposal.applicatorId}
                      </p>
                      <p className="text-m font-medium">
                        Project Name: {projectName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {proposal.proposalText.substring(0, 50)}...
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="w-2/3 pl-5">
            {selectedProposal ? (
              <div>
                <ProposalDetails proposal={selectedProposal} projectName={projectDetails[selectedProposal.projectId]?.name}/>
                {pageType === "received" &&
                  selectedProposal.verified === "none" && (
                    <div className="mt-4">
                      <textarea
                        className="w-full h-40 p-2 mb-2 border rounded-lg"
                        placeholder="Enter acceptance/rejection explanation..."
                        onChange={(e) => setProposalReviewText(e.target.value)}
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
                          {processing ? "Processing..." : "Accept"}
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-md w-40"
                          onClick={() => handleAction("reject")}
                          disabled={
                            selectedProposal.verified === "reject" ||
                            selectedProposal.verified === "accept"
                          }
                        >
                          {processing ? "Processing..." : "Reject"}
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
    </>
  );
};

export default ProposalsPage;
