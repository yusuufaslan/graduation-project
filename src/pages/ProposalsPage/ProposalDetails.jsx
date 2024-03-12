import React from 'react';

const ProposalDetails = ({ proposal }) => {
    return (
        <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">{proposal.projectName}</h2>
            <p className="mb-4">{proposal.proposalText}</p>
            {/* Render other details of the proposal */}
            {proposal.isAccepted === null && (
                <>
                    <textarea className="w-full h-24 p-2 mb-4 border rounded" placeholder="Enter reason for acceptance/rejection"></textarea>
                    <div className="flex justify-between">
                        <button className="px-4 py-2 bg-green-500 text-white rounded mr-2">Accept</button>
                        <button className="px-4 py-2 bg-red-500 text-white rounded">Reject</button>
                    </div>
                </>
            )}
            {proposal.isAccepted !== null && (
                <div className="mt-4">
                    <p><strong>Status:</strong> {proposal.isAccepted ? "Accepted" : "Rejected"}</p>
                    {proposal.proposalResponseText && <p><strong>Response:</strong> {proposal.proposalResponseText}</p>}
                </div>
            )}
        </div>
    );
};

export default ProposalDetails;
