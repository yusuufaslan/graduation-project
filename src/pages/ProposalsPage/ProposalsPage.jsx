import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProposalDetails from './ProposalDetails';

const ProposalsPage = () => {
  const { type } = useParams(); // type will be either "sent" or "received"
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [acceptanceText, setAcceptanceText] = useState('');
  const [rejectionText, setRejectionText] = useState('');

  useEffect(() => {
    // Dummy data for demonstration
    const dummyProposalsSent = [
      {
        id: 1,
        projectName: 'Health Research Project A',
        proposalText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed...',
        isAccepted: null,
        proposalResponseText: '',
        isVerified: null,
        sent: true,
      },
      {
        id: 2,
        projectName: 'Health Research Project C',
        proposalText: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...',
        isAccepted: true,
        proposalResponseText: 'accepted arbitrarily',
        isVerified: 'accepted',
        sent: true,
      },
    ];

    const dummyProposalsReceived = [
      {
        id: 3,
        projectName: 'Health Research Project B',
        proposalText: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...',
        isAccepted: true,
        proposalResponseText: 'Your proposal has been accepted.',
        isVerified: 'accepted',
        sent: false,
      },
      {
        id: 4,
        projectName: 'Health Research Project D',
        proposalText: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia...',
        isAccepted: false,
        proposalResponseText: 'Unfortunately, your proposal has been rejected.',
        isVerified: 'rejected',
        sent: false,
      },
    ];

    setProposals(type === 'sent' ? dummyProposalsSent : dummyProposalsReceived);
  }, [type]);

  const handleProposalClick = (proposal) => {
    setSelectedProposal(proposal);
    setAcceptanceText('');
    setRejectionText('');
  };

  const handleAccept = () => {
    // Handle accept action for received proposals
    // Update backend with acceptanceText and set proposal status to accepted
  };

  const handleReject = () => {
    // Handle reject action for received proposals
    // Update backend with rejectionText and set proposal status to rejected
  };

  return (
    <div className="flex h-screen">
      {/* Left section */}
      <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
        <h2 className="text-lg font-bold py-4 px-6 bg-gray-100 border-b border-gray-200">
          {type === 'sent' ? 'Proposals Sent' : 'Proposals Received'}
        </h2>
        <div className="divide-y divide-gray-200">
          {proposals.map((proposal) => (
            <div
              key={proposal.id}
              onClick={() => handleProposalClick(proposal)}
              className="p-4 hover:bg-gray-50 cursor-pointer"
            >
              <p className="font-medium">{proposal.projectName}</p>
              <p className="text-sm text-gray-600">
                {proposal.proposalText.substring(0, 30)}...
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right section */}
      <div className="w-2/3 p-6">
        {selectedProposal ? (
          <div>
            <ProposalDetails proposal={selectedProposal} />
            {type === 'received' && !selectedProposal.isVerified && (
              <div className="mt-4">
                <textarea
                  className="w-full border rounded-md p-2"
                  placeholder="Enter acceptance/rejection explanation..."
                  value={selectedProposal.isVerified === 'rejected' ? rejectionText : acceptanceText}
                  onChange={(e) => {
                    if (selectedProposal.isVerified === 'rejected') {
                      setRejectionText(e.target.value);
                    } else {
                      setAcceptanceText(e.target.value);
                    }
                  }}
                  readOnly={selectedProposal.isVerified === 'rejected' || selectedProposal.isVerified === 'accepted'}
                />
                <div className="mt-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                    onClick={handleAccept}
                    disabled={selectedProposal.isVerified === 'rejected' || selectedProposal.isVerified === 'accepted'}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={handleReject}
                    disabled={selectedProposal.isVerified === 'rejected' || selectedProposal.isVerified === 'accepted'}
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
  );
};

export default ProposalsPage;
